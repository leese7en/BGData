package com.magus.bd.action;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.cache.OPConnsCache;
import com.magus.bd.service.TrendGetDataService;
import com.magus.bd.util.ParseParameter;
import com.magus.bd.util.UtilTotle;
import com.magus.net.IOPConnect;
import com.magus.net.OPNetConst;
import com.magus.net.OPPooledConnects;

@Controller
public class TrendAction extends BaseAction {

	private static final long serialVersionUID = -7865551424503441115L;

	@Autowired
	public TrendGetDataService trendService;
	private static short type = OPNetConst.HISTORY_DATA_SPAN;
	private static int RESOLUTION = 600;
	private static int maxSize = 8;

	/**
	 * 趋势调用的时候进行数据加载和动态调用
	 * 
	 * @return
	 * @parm
	 * @exception
	 */
	@RequestMapping("/trend_getData")
	public String getData(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("application/x-json");
		response.setCharacterEncoding("utf-8");
		String flag = request.getParameter("flag");

		String result = null, fromString = null, toString = null, pn = null;
		try {
			ParseParameter pp = ParseParameter.getParser();
			pn = pp.parseString("pn", request);
			pn = URLDecoder.decode(pn, "UTF-8").toUpperCase();
		} catch (Exception e) {
			System.err.println("Names are null!");
		}
		OPPooledConnects cons = OPConnsCache.getConns();
		try {
			Thread.sleep(1050 - System.currentTimeMillis() % 1000);
			if ("getData".equalsIgnoreCase(flag)) {
				boolean isCanvas = Boolean.parseBoolean(request.getParameter("isCanvas"));
				toString = request.getParameter("end");
				if ("null".equalsIgnoreCase(toString) || null == toString || "".equalsIgnoreCase(toString)) {
					toString = request.getParameter("to");
				}
				fromString = request.getParameter("from");

				int interval = getInterval(getFromTime(fromString), getEndTime(toString));
				result = trendService.getData(cons, pn, getFromTime(fromString), getEndTime(toString), type, interval,
						isCanvas);
			} else if ("getDyData".equalsIgnoreCase(flag)) {
				String historyRedress = request.getParameter("historyRedress");
				result = trendService.getDyData(cons, pn, historyRedress);
			} else if ("getPointsMessage".equalsIgnoreCase(flag)) {
				// 设定点数和类型
				RESOLUTION = Integer.parseInt(request.getParameter("pointCount").trim());
				String pointType = request.getParameter("pointType");
				setPointType(pointType);
				result = trendService.getPointsMessage(cons, pn);
			}
		} catch (Exception e) {
			JSONArray ja = new JSONArray();
			JSONObject jo = new JSONObject();
			try {
				jo.put("x", new Date().getTime());
				jo.put("y", null);
				ja.add(jo);
				result = ja.toString();
				jo = null;
				ja = null;
			} catch (JSONException e1) {
				e1.printStackTrace();
			}
		}
		try {
			response.getWriter().print(result);
			result = null;
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}

	private void setPointType(String t) {
		if ("span".equalsIgnoreCase(t)) {
			type = OPNetConst.HISTORY_DATA_SPAN;
		} else if ("plot".equalsIgnoreCase(t)) {
			type = OPNetConst.HISTORY_DATA_PLOT;
		}
	}

	private Date getEndTime(String toString) {
		IOPConnect conn = OPConnsCache.getConns().getConnect();
		Date to = null;
		String toMill = null;
		if (isNull(toString)) {
			try {
				toString = conn.getServerTime() + "";
				toMill = UtilTotle.getDateTimeByMillisecond(toString);
				to = UtilTotle.dateFormate(toMill);
			} catch (IOException e) {
				e.printStackTrace();
			}
		} else {
			try {
				to = UtilTotle.dateFormate(toString);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		if (conn != null) {
			OPConnsCache.getConns().freeConnect(conn);
		}
		return to;
	}

	private Date getFromTime(String fromString) {
		IOPConnect conn = OPConnsCache.getConns().getConnect();
		String fromMill = null;
		Date from = null;
		long tempMins = 1000 * 60 * 10;
		if (isNull(fromString)) {
			try {
				fromString = (conn.getServerTime() - tempMins) + "";
			} catch (IOException e) {
				e.printStackTrace();
			}
			fromMill = UtilTotle.getDateTimeByMillisecond(fromString);
			from = UtilTotle.dateFormate(fromMill);
		} else {
			try {
				from = UtilTotle.dateFormate(fromString);
			} catch (Exception e) {
			}
		}
		if (conn != null) {
			OPConnsCache.getConns().freeConnect(conn);
		}
		return from;
	}

	private int getInterval(Date from, Date to) {
		int interval = 1;
		try {
			interval = (int) (((to.getTime() - from.getTime()) / 1000L) / RESOLUTION);
		} catch (Exception e) {
			interval = 1;
		}

		if (interval < 1) {
			interval = 1;
		}
		return interval;
	}

	private boolean isNull(String t) {
		if (t == null) {
			return true;
		} else if ("".equalsIgnoreCase(t)) {
			return true;
		} else if ("undefined".equalsIgnoreCase(t)) {
			return true;
		} else if ("null".equalsIgnoreCase(t)) {
			return true;
		} else {
			return false;
		}
	}
}
