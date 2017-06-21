package com.magus.bd.service.impl;

import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.Vector;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.service.TrendGetDataService;
import com.magus.bd.util.UtilTotle;
import com.magus.net.IOPConnect;
import com.magus.net.OPHisData;
import com.magus.net.OPNetConst;
import com.magus.net.OPPooledConnects;
import com.magus.net.OPStaticInfo;
import com.magus.net.common.DynamicData;
import com.magus.net.oo.OPException;

@Service
public class TrendGetDataServiceImpl implements TrendGetDataService {

	private static DecimalFormat formula = new DecimalFormat("0.##");
	private int breakPointInterval = 65; // 断点间隔（分钟）
	/** 设置时间切割间隔 */
	private int maxInterval = 30;
	/** 分割时间段 */
	private final long splitDuration = maxInterval * 24 * 60 * 60 * 1000L;

	/**
	 * 获取静态数据
	 */
	public String getPointsMessage(OPPooledConnects cons, String pn) {
		String[] names = getPointNames(pn);
		JSONArray ja = new JSONArray();
		IOPConnect conn = null;
		try {
			conn = cons.getConnect();
		} catch (Exception e) {
			System.err.println("***数据库连接异常！***");
		}
		for (int i = 0; i < names.length; i++) {
			JSONObject jo = new JSONObject();
			OPStaticInfo info = null;
			DynamicData dy = null;
			if (UtilTotle.pointIsExist(conn, names[i])) {
				try {
					info = conn.getPointStaticInfo(names[i].toUpperCase().trim());
					dy = conn.getPointDynamicData(names[i].toUpperCase().trim());

					jo.put("EU", info.getValue("EU"));
					jo.put("ED", info.getED());
					jo.put("TV", info.getValue("TV"));
					jo.put("BV", info.getValue("BV"));
					double fq = Double.parseDouble(info.getValue("FQ").toString());
					if (fq <= 0) {
						fq = (60 + 30) * 1000;
					} else {
						fq = (fq * 60 + 30) * 1000;
					}
					jo.put("FQ", fq);
					jo.put("pnType", info.getTypeString());
					if (dy == null) {
						jo.put("AV", "");
					} else {
						double av = new Double(formula.format(dy.getAV())).doubleValue();
						jo.put("AV", av);
					}
					jo.put("name", names[i]);
					ja.add(jo);
				} catch (Exception e) {
					e.getMessage();
				}
			} else {
				try {
					jo.put("EU", "N/A");
					jo.put("ED", "N/A");
					jo.put("TV", "N/A");
					jo.put("BV", "N/A");
					jo.put("FQ", "");
					jo.put("pnType", "");
					jo.put("AV", "N/A");
					jo.put("name", names[i]);
					ja.add(jo);
				} catch (JSONException e) {
					e.printStackTrace();
				}
			}
		}
		if (conn != null) {
			cons.freeConnect(conn);
		}
		String result = ja.toString();
		return result;
	}

	/**
	 * 获取历史数据
	 */
	public String getData(OPPooledConnects cons, String pn, Date from, Date to, short type, int interval,
			boolean isCanvas) {
		String[] names = getPointNames(pn);
		String result = null;
		// 将当前服务器时间加入到返回值中
		JSONArray ja = new JSONArray();
		IOPConnect conn = null;
		try {
			conn = cons.getConnect();
		} catch (Exception e) {
			System.err.println("***数据库连接异常！***");
		}
		Vector<OPHisData> hisData = new Vector<OPHisData>();
		for (int i = 0; i < names.length; i++) {
			JSONArray jaa = new JSONArray();
			try {
				if (UtilTotle.pointIsExist(conn, names[i])) {
					hisData = getHisData(names[i].toUpperCase().trim(), from, to, interval, type, conn, isCanvas);
					if (hisData == null || hisData.size() == 0) {
						dataIsNull(from, to, jaa, ja);
					} else {
						int temp = hisData.size();
						if (hisData.get(0).getTime() > from.getTime() && !isCanvas) {
							beforeFrom(hisData, from, to, jaa, interval);
						}
						putData2Json(hisData, from, to, jaa);
						if (hisData.get(temp - 1).getTime() < to.getTime() && !isCanvas) {
							afterTo(hisData, from, to, jaa, interval);
						}
						ja.add(jaa);
					}
				} else {
					dataIsNull(from, to, jaa, ja);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		JSONObject obj = new JSONObject();
		try {
			obj.put("from", from.getTime());
			obj.put("to", to.getTime());
			obj.put("value", ja);
		} catch (JSONException e1) {
			e1.printStackTrace();
		}

		result = obj.toString();
		if (conn != null) {
			cons.freeConnect(conn);
			ja = null;
		}
		return result;
	}

	private void putData2Json(Vector<OPHisData> hisData, Date from, Date to, JSONArray jaa) throws JSONException {
		for (int j = 0; j < hisData.size(); j++) {
			JSONObject jo = new JSONObject();
			jo.put("x", hisData.get(j).getTime());
			if (UtilTotle.isTimeOutNew(hisData.get(j).getAS())) {
				jo.put("y", null);
			} else {
				if (Double.isNaN(hisData.get(j).getAV()) || Double.isInfinite(hisData.get(j).getAV())) {
					jo.put("y", 0);
				} else {
					double pa1 = new Double(formula.format(hisData.get(j).getAV())).doubleValue();
					jo.put("y", pa1);
				}

			}
			jaa.add(jo);
		}
	}

	/**
	 * 在结束时间后加空数据集
	 * 
	 * @param hisData
	 * @param from
	 * @param to
	 * @param jaa
	 * @param interval
	 * @throws JSONException
	 */
	private void afterTo(Vector<OPHisData> hisData, Date from, Date to, JSONArray jaa, int interval)
			throws JSONException {
		int size = hisData.size();
		long tep = (to.getTime() - hisData.get(size - 1).getTime()) / 1000 / interval;
		long tt = hisData.get(size - 1).getTime();
		for (int k = 0; k < tep; k++) {
			JSONObject json = new JSONObject();
			json.put("x", tt);
			json.put("y", null);
			jaa.add(json);
			tt += interval * 1000;
		}
	}

	/**
	 * 在开始时间前加空数据集
	 * 
	 * @param hisData
	 * @param from
	 * @param to
	 * @param jaa
	 * @param interval
	 * @throws JSONException
	 */
	private void beforeFrom(Vector<OPHisData> hisData, Date from, Date to, JSONArray jaa, int interval)
			throws JSONException {
		long tep = (hisData.get(0).getTime() - from.getTime()) / 1000 / interval;
		long tt = from.getTime();
		for (int k = 0; k < tep; k++) {
			JSONObject j1 = new JSONObject();
			j1.put("x", tt);
			j1.put("y", null);
			jaa.add(j1);
			tt += interval * 1000;
		}
	}

	/**
	 * 添加空数据集
	 * 
	 * @param from
	 * @param to
	 * @param jaa
	 * @param ja
	 * @throws JSONException
	 */
	private void dataIsNull(Date from, Date to, JSONArray jaa, JSONArray ja) throws JSONException {
		long temp = (to.getTime() - from.getTime()) / 10;
		for (int j = 0; j < 10; j++) {
			JSONObject jo = new JSONObject();
			jo.put("x", from.getTime() + temp * j);
			jo.put("y", null);
			jaa.add(jo);
		}
		ja.add(jaa);
	}

	/**
	 * 获取动态数据
	 */
	public String getDyData(OPPooledConnects cons, String pn, String historyRedress) {
		String[] names = getPointNames(pn);
		JSONArray ja = new JSONArray();
		String result = null;
		IOPConnect conn = null;
		try {
			conn = cons.getConnect();
		} catch (Exception e) {
			System.err.println("***数据库连接异常！***");
		}
		for (int i = 0; i < names.length; i++) {
			DynamicData dy = null;
			JSONObject jo = new JSONObject();
			if (UtilTotle.pointIsExist(conn, names[i])) {
				try {
					dy = conn.getPointDynamicData(names[i].toUpperCase().trim());
					long serverTime = conn.getServerTime();
					if (historyRedress != null && "true".equals(historyRedress)) {
						long pointTime = dy.getTime();
						if (pointTime > serverTime) {
							OPHisData[] opHisData = conn.getPointHistory(names[i].toUpperCase().trim(), new Date(
									serverTime), new Date(serverTime), OPNetConst.HISTORY_DATA_SPAN, 1000);
							if (opHisData != null && opHisData.length > 0)
								dy = opHisData[0];
						}
					}
					int version = conn.getDataBaseMetaData().getSchemeVersion().getMajor();
					if (version > 3 ? UtilTotle.isTimeOutNew(dy.getAS()) : UtilTotle.isTimeOut(dy.getAS())) {
						jo.put("x", serverTime);
						jo.put("y", null);
					} else {
						double pa1 = new Double(formula.format(dy.getAV())).doubleValue();
						jo.put("x", dy.getTime());
						jo.put("y", pa1);
					}
				} catch (Exception e) {
					try {
						jo.put("x", new Date().getTime());
						jo.put("y", null);
					} catch (Exception e1) {
						e1.printStackTrace();
					}
				}
				ja.add(jo);
			} else {
				try {
					jo.put("x", new Date().getTime());
					jo.put("y", null);
					ja.add(jo);
					jo = null;
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		result = ja.toString();
		// 释放内存
		names = null;
		ja = null;

		if (conn != null) {
			cons.freeConnect(conn);
		}
		return result;
	}

	public String[] getPointNames(String pn) {
		String[] names = pn.split(",");
		return names;
	}

	/**
	 * 获取数据集(解决大数据取不出问题)
	 * 
	 * @param name
	 * @param from
	 * @param to
	 * @param interval
	 * @param type
	 * @param conn
	 * @return
	 * @throws OPException
	 */
	public Vector<OPHisData> getHisData(String name, Date from, Date to, int interval, int type, IOPConnect conn,
			boolean isCanvas) throws OPException {
		Date sperateTime = from;
		Date newTo = new Date(sperateTime.getTime() + splitDuration);
		Vector<OPHisData> opHisData = new Vector<OPHisData>();
		if (newTo.getTime() < to.getTime()) {
			while (newTo.getTime() < to.getTime()) {
				try {
					OPHisData[] ophs = conn.getPointHistory(name, sperateTime, newTo, type, interval);
					for (int i = 0; i < ophs.length; i++) {
						opHisData.add(ophs[i]);
					}
					if (isCanvas) {
						// 修复数据库断线问题
						opHisData = requestHistoryRecordsFIX(opHisData, sperateTime, newTo, interval, conn, to);
					}
				} catch (IOException e) {
					e.printStackTrace();
				}
				sperateTime = newTo;
				newTo = new Date(sperateTime.getTime() + splitDuration);
			}
		}
		try {
			newTo = to;
			OPHisData[] ophs = conn.getPointHistory(name, sperateTime, newTo, type, interval);
			for (int i = 0; i < ophs.length; i++) {
				opHisData.add(ophs[i]);
			}
			if (isCanvas) {
				// 修复数据库断线问题
				opHisData = requestHistoryRecordsFIX(opHisData, sperateTime, newTo, interval, conn, to);
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
		return opHisData;
	}

	/**
	 * 规避数据库取值超时问题
	 * 
	 * @param hrs
	 * @param beginTime
	 * @param endTime
	 * @param interval
	 * @param conn
	 * @return
	 * @throws IOException
	 */
	public Vector<OPHisData> requestHistoryRecordsFIX(Vector<OPHisData> hrs, Date beginTime, Date endTime,
			int interval, IOPConnect conn, Date overTime) throws IOException {
		// long now = conn.getServerTime();
		if (null != hrs && hrs.size() > 0) {
			// 数据集开始加断点
			OPHisData hr = hrs.get(0);
			int version = conn.getDataBaseMetaData().getSchemeVersion().getMajor();
			if ((version > 3 ? UtilTotle.isTimeOutNew(hr.getAS()) : UtilTotle.isTimeOut(hr.getAS()))) {
				OPHisData data = conn.createHisData(hr.getTypeString());
				data.putValue("AS", -32768);
				data.putValue("TM", hr.getTime() + interval);
				hrs.add(0, data);
			}
			if (hr.getTime() - beginTime.getTime() > interval) {
				OPHisData data = conn.createHisData(hr.getTypeString());
				data.putValue("AS", -32768);
				data.putValue("TM", hr.getTime() - interval);
				hrs.add(0, data);
			}
			// 数据集中段结果集判定及加断点（一小时来自数据库内部实现）
			for (int i = 1; i < hrs.size() - 1; i++) {
				OPHisData hrTemp = hrs.get(i - 1);
				hr = hrs.get(i);
				if ((hr.getTime() - hrTemp.getTime()) > 1000 * (breakPointInterval * 60)) {
					OPHisData data = conn.createHisData(hr.getTypeString());
					data.putValue("AS", -32768);
					data.putValue("TM", hr.getTime() - interval);
					hrs.add(i, data);
				}
			}
			// 数据集结尾加断点
			hr = hrs.get(hrs.size() - 1);
			if (hr.getTime() < endTime.getTime() - interval && endTime.getTime() != overTime.getTime()) {
				OPHisData data = conn.createHisData(hr.getTypeString());
				data.putValue("AS", -32768);
				data.putValue("TM", hr.getTime() + interval);
				hrs.add(data);
			}
		}
		return hrs;
	}
}
