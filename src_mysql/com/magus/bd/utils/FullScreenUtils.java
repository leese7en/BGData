package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.FullScreen;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.ResQuota;
import com.magus.bd.entity.ResQuotaParameter;
import com.magus.bd.entity.ResSuperlowFullView;
import com.magus.bd.util.DateUtils;
import com.magus.net.OPDynamicData;

public class FullScreenUtils {

	static Map<String, String> cityKeys = new HashMap<String, String>();
	static Map<String, Integer> cityEnterNums = new HashMap<String, Integer>();
	static Map<String, Integer> cityInstalled = new HashMap<String, Integer>();

       static  {
		cityKeys.put("呼和浩特市", "HS");
		cityKeys.put("包头市", "BT");
		cityKeys.put("乌海市", "WH");
		cityKeys.put("赤峰市", "CF");
		cityKeys.put("通辽市", "TL");
		cityKeys.put("鄂尔多斯市", "EE");
		cityKeys.put("呼伦贝尔市", "HM");
		cityKeys.put("巴彦淖尔市", "BY");
		cityKeys.put("乌兰察布市", "WL");
		cityKeys.put("兴安盟", "XAM");
		cityKeys.put("锡林郭勒盟", "XM");
		cityKeys.put("阿拉善盟", "AM");
		
		cityEnterNums.put("呼和浩特市", 6);
		cityEnterNums.put("包头市", 8);
		cityEnterNums.put("乌海市", 5);
		cityEnterNums.put("赤峰市", 3);
		cityEnterNums.put("通辽市", 4);
		cityEnterNums.put("鄂尔多斯市", 15);
		cityEnterNums.put("呼伦贝尔市", 5);
		cityEnterNums.put("巴彦淖尔市", 3);
		cityEnterNums.put("乌兰察布市", 6);
		cityEnterNums.put("兴安盟", 1);
		cityEnterNums.put("锡林郭勒盟", 4);
		cityEnterNums.put("阿拉善盟", 1);
		
		cityInstalled.put("呼和浩特市", 805);
		cityInstalled.put("包头市", 683);
		cityInstalled.put("乌海市", 282);
		cityInstalled.put("赤峰市", 327);
		cityInstalled.put("通辽市", 350);
		cityInstalled.put("鄂尔多斯市", 1356);
		cityInstalled.put("呼伦贝尔市", 660);
		cityInstalled.put("巴彦淖尔市", 180);
		cityInstalled.put("乌兰察布市", 610);
		cityInstalled.put("兴安盟", 33);
		cityInstalled.put("锡林郭勒盟", 582);
		cityInstalled.put("阿拉善盟", 60);
	}

	/**
	 * 格式化工况装机发电量
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatIndustryInstalledAmountMonth(List<FullScreen> beans) {
		JSONObject object = new JSONObject();
		Map<String, List> values = new HashMap<String, List>();
		List<String> legend = new ArrayList<String>();
		List<String> xAxis = new ArrayList<String>();
		xAxis.add("2015年");
		xAxis.add("2016年");
		legend.add("工况装机容量(万千瓦)");
		legend.add("全区装机容量(万千瓦)");
		List valueIn = new ArrayList();
		valueIn.add(5853);
		valueIn.add(5900);
		List valueOut = new ArrayList();
		valueOut.add(7268);
		valueOut.add(7400);
		values.put("工况装机容量(万千瓦)", valueIn);
		values.put("全区装机容量(万千瓦)", valueOut);
		object.put("series", values);
		object.put("legend", legend);
		object.put("xAxis", xAxis);
		return object;
	}

	/**
	 * 格式化工况装机发电量
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatIndustryPowerAmountMonth(List<FullScreen> beans) {
		JSONObject object = new JSONObject();
		Map<String, List> values = new HashMap<String, List>();
		List<String> legend = new ArrayList<String>();
		List<String> xAxis = new ArrayList<String>();

		for (FullScreen bean : beans) {
			String year = bean.getYear();
			int month = Integer.parseInt(bean.getMonth());
			List value = values.get(year + "年");
			if (value == null || value.size() < 1) {
				value = new ArrayList();
			}
			value.add(bean.getPowerAmount() / 1000);
			values.put(year + "年", value);
			// 年份是否已经包含
			if (!legend.contains(year + "年")) {
				legend.add(year + "年");
			}
			// 月份是否已经包含
			if (!xAxis.contains(month + "月")) {
				xAxis.add(month + "月");
			}
		}
		object.put("series", values);
		object.put("legend", legend);
		object.put("xAxis", xAxis);
		return object;
	}

	/**
	 * 机组类型 和装机容量
	 * 
	 * @param boilerTypeBeans
	 * @param installAmountBeans
	 * @return
	 */
	public static JSONObject formatBoilerCountInstallAmount(List<FullScreen> boilerTypeBeans, List<FullScreen> installAmountBeans) {
		// 装机类型
		List<String> boilerLegend = new ArrayList<String>();
		List<String> boilerXAxis = new ArrayList<String>();
		Map<String, Integer[]> boilerValues = new HashMap<String, Integer[]>();
		for (FullScreen bean : boilerTypeBeans) {
			String year = bean.getYear();
			if (!boilerXAxis.contains(year)) {
				boilerXAxis.add(year);
			}
			String boilerType = bean.getBoilerType();
			if (!boilerLegend.contains(boilerType)) {
				boilerLegend.add(boilerType);
			}
		}
		for (FullScreen bean : boilerTypeBeans) {
			String boilerType = bean.getBoilerType();
			String year = bean.getYear();
			Integer[] value = boilerValues.get(boilerType);
			if (value == null) {
				value = new Integer[boilerXAxis.size()];
			}
			value[boilerXAxis.indexOf(year)] = bean.getCount();
			boilerValues.put(boilerType, value);
		}
		JSONObject object = new JSONObject();
		object.put("boilerLegend", boilerLegend);
		object.put("xAxis", boilerXAxis);
		object.put("boilerValues", boilerValues);

		// 装机容量
		List<String> amountLegend = new ArrayList<String>();
		Map<String, Float[]> amountValues = new HashMap<String, Float[]>();

		amountLegend.add("0-10万千瓦");
		amountLegend.add("10-30万千瓦");
		amountLegend.add("30-60万千瓦");
		amountLegend.add(">60万千瓦");
		for (FullScreen bean : installAmountBeans) {
			String year = bean.getYear();
			float amount = bean.getInstalledAmount();
			String msg = FullScreenUtils.getUnitInstalled(amount);
			Float[] value = amountValues.get(msg);
			if (value == null) {
				value = new Float[boilerXAxis.size()];
				for (int i = 0; i < boilerXAxis.size(); i++) {
					value[i] = 0.0f;
				}
			}
			value[boilerXAxis.indexOf(year)] += amount;
			amountValues.put(msg, value);
		}
		object.put("amountLegend", amountLegend);
		object.put("amountValues", amountValues);
		return object;
	}

	/**
	 * 获取装机范围
	 * 
	 * @param amount
	 * @return
	 */
	public static String getUnitInstalled(float amount) {
		String msg = "0-10万千瓦";
		if (amount >= 0 && amount <= 10) {
			msg = "0-10万千瓦";
		} else if (amount > 10 && amount <= 30) {
			msg = "10-30万千瓦";
		} else if (amount > 30 && amount <= 60) {
			msg = "30-60万千瓦";
		} else {
			msg = ">60万千瓦";
		}
		return msg;

	}

	/**
	 * 格式化 需要操作的机组信息
	 * 
	 * @param change
	 * @param close
	 * @param news
	 * @return
	 */
	public static Map formatSuperlowFullViewOPerator(List<ResSuperlowFullView> change, List<ResSuperlowFullView> close, List<ResSuperlowFullView> news,
			String cityInfo) {
		Map<String, List<ResSuperlowFullView>> map = new HashMap<String, List<ResSuperlowFullView>>();
		List<ResSuperlowFullView> changeArray = new ArrayList<ResSuperlowFullView>();
		for (ResSuperlowFullView o : change) {
			if (cityInfo == null || "-1".equals(cityInfo)) {
				changeArray.add(o);
			} else {
				if (cityInfo.equals(o.getCityId())) {
					changeArray.add(o);
				}
			}
		}
		map.put("change", changeArray);
		List<ResSuperlowFullView> closeArray = new ArrayList<ResSuperlowFullView>();
		for (ResSuperlowFullView o : close) {
			if (cityInfo == null || "-1".equals(cityInfo)) {
				closeArray.add(o);
			} else {
				if (cityInfo.equals(o.getCityId())) {
					closeArray.add(o);
				}
			}
		}

		map.put("close", closeArray);
		List<ResSuperlowFullView> newsArray = new ArrayList<ResSuperlowFullView>();
		for (ResSuperlowFullView o : news) {
			if (cityInfo == null || "-1".equals(cityInfo)) {
				newsArray.add(o);
			} else {
				if (cityInfo.equals(o.getCityId())) {
					newsArray.add(o);
				}
			}
		}
		map.put("news", newsArray);
		return map;
	}

	/**
	 * 预览图形展示的信息
	 * 
	 * @param oo
	 * @return
	 */
	public static JSONObject previewSuperlowFullView(List<ResSuperlowFullView> beans, Map<String, List<ResSuperlowFullView>> operatorBeans, String pollCode,
			String cityInfo) {
		JSONObject object = new JSONObject();
		Map<String, ResSuperlowFullView> beansMap = FullScreenUtils.formatSuperlowFullViewDatail(beans);
		/**
		 * 每年的操作机组信息
		 */
		Map<String, List<ResSuperlowFullView>> beansYearMap = FullScreenUtils.formatSuperlowFullViewDatail(operatorBeans);
		/**
		 * 基础信息
		 */
		Map<String, ResSuperlowFullView> currentYearEmissions = FullScreenUtils.getCurrentYearEmissions(beansMap, beans, beansYearMap);
		// 排放量
		float[] emissionsYear = new float[5];
		// 减排量
		float[] reductionsYear = new float[5];
		// 装机容量
		float[] installedYear = new float[5];
		// 基础排放量
		float emissions = 0;
		// 基础装机容量
		float installed = 0;
		for (String key : currentYearEmissions.keySet()) {
			ResSuperlowFullView bean = currentYearEmissions.get(key);
			emissions += Float.parseFloat(bean.getEmissionMonth()[12]);
			if (bean.getFlag() != 2) {
				if (cityInfo == null || "-1".equals(cityInfo)) {
					installed += bean.getInstalled();
				} else {
					if (cityInfo.equals(bean.getCityId())) {
						installed += bean.getInstalled();
					}
				}
			}
		}
		String nowDate = DateUtils.dataFormatYM(new Date());
		int nowYear = Integer.parseInt(nowDate.split("-")[0]);

		for (int year = ResConst.SUPERBEGINYEAR; year < nowYear; year++) {
			float[] values = FullScreenUtils.getGivenYearEmissions(beansMap, beans, operatorBeans, year + "");
			int index = year - ResConst.SUPERBEGINYEAR;
			emissionsYear[index] = values[0];
			reductionsYear[index] = values[1];
			installedYear[index] = values[2];
		}

		JSONObject oo = FullScreenUtils.previewSuperlowFullViewInfo(beansMap, beansYearMap, pollCode);

		for (int year = nowYear; year <= ResConst.SUPERENDYEAR; year++) {

			List<ResSuperlowFullView> yearBeans = (List<ResSuperlowFullView>) oo.get(year + "");
			int index = year - ResConst.SUPERBEGINYEAR;
			float reductionsTemp = 0;
			float installedTemp = 0;
			if (yearBeans == null || yearBeans.size() < 1) {
				emissions -= reductionsTemp;
				installed += installedTemp;
				emissionsYear[index] = emissions;
				reductionsYear[index] = reductionsTemp;
				installedYear[index] = installed;
				continue;
			}
			for (ResSuperlowFullView bean : yearBeans) {
				int flag = bean.getFlag();
				if (flag == ResConst.FCHANGE) {
					reductionsTemp += bean.getReductions();
				} else if (flag == ResConst.FCLOSE) {
					reductionsTemp += bean.getReductions();
					installedTemp -= bean.getInstalled();
				} else if (flag == ResConst.FNEW) {
					installedTemp += bean.getInstalled();
					reductionsTemp += bean.getReductions();
				}
			}
			emissions -= reductionsTemp;
			installed += installedTemp;
			emissionsYear[index] = emissions;
			reductionsYear[index] = reductionsTemp;
			installedYear[index] = installed;
		}
		// 注册信息
		object.put("emissions", emissionsYear);
		object.put("reductions", reductionsYear);
		object.put("installed", installedYear);
		return object;
	}

	/**
	 * 将数据格式化 ，方便快速查找
	 * 
	 * @param beans
	 * @return
	 */
	public static Map formatSuperlowFullViewDatail(List<ResSuperlowFullView> beans) {
		Map detailMap = new HashMap();
		for (ResSuperlowFullView bean : beans) {
			String key = bean.getPsCode() + "-" + bean.getUnit() + "-" + bean.getYear() + "-" + bean.getMonth();
			detailMap.put(key, bean);
		}
		return detailMap;
	}

	/**
	 * 将机组信息按着年份区分
	 * 
	 * @param operatorBeans
	 * @return
	 */
	public static Map formatSuperlowFullViewDatail(Map operatorBeans) {
		Map<String, List<ResSuperlowFullView>> detailMap = new HashMap<String, List<ResSuperlowFullView>>();
		List<ResSuperlowFullView> change = (List<ResSuperlowFullView>) operatorBeans.get("change");
		List<ResSuperlowFullView> beans = null;
		for (ResSuperlowFullView bean : change) {
			int rYear = Integer.parseInt((bean.getRectificationDate().substring(0, 4)));
			int pYear = Integer.parseInt((bean.getRectificationDate().substring(0, 4)));
			for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
				if (year >= rYear && year <= pYear) {
					beans = detailMap.get(year + "");
					if (beans == null) {
						beans = new ArrayList<ResSuperlowFullView>();
					}
					beans.add(bean);
					detailMap.put(year + "", beans);
				}
			}
		}
		List<ResSuperlowFullView> close = (List<ResSuperlowFullView>) operatorBeans.get("close");
		for (ResSuperlowFullView bean : close) {
			int rYear = Integer.parseInt((bean.getRectificationDate().substring(0, 4)));
			int pYear = Integer.parseInt((bean.getRectificationDate().substring(0, 4)));
			for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
				if (year >= rYear && year <= pYear) {
					beans = detailMap.get(year + "");
					if (beans == null) {
						beans = new ArrayList<ResSuperlowFullView>();
					}
					beans.add(bean);
					detailMap.put(year + "", beans);
				}
			}
		}
		List<ResSuperlowFullView> news = (List<ResSuperlowFullView>) operatorBeans.get("news");
		for (ResSuperlowFullView bean : news) {
			int rYear = Integer.parseInt((bean.getRectificationDate().substring(0, 4)));
			int pYear = Integer.parseInt((bean.getRectificationDate().substring(0, 4)));
			for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
				if (year >= rYear && year <= pYear) {
					beans = detailMap.get(year + "");
					if (beans == null) {
						beans = new ArrayList<ResSuperlowFullView>();
					}
					beans.add(bean);
					detailMap.put(year + "", beans);
				}
			}
		}
		return detailMap;
	}

	/**
	 * 获取当前每个机组 的对应的每月的排放量 和 总排放量
	 * 
	 * @param beansMap
	 * @param beans
	 * @param operatorBeans
	 * @return
	 */
	public static Map<String, ResSuperlowFullView> getCurrentYearEmissions(Map<String, ResSuperlowFullView> beansMap, List<ResSuperlowFullView> beans,
			Map<String, List<ResSuperlowFullView>> beansYearMap) {
		Map<String, ResSuperlowFullView> currentMap = new HashMap<String, ResSuperlowFullView>();
		String nowDate = DateUtils.dataFormatYM(new Date());
		String nowYear = nowDate.split("-")[0];

		for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
			List<ResSuperlowFullView> yearBeans = beansYearMap.get(year + "");
			if (yearBeans == null) {
				continue;
			}
			for (ResSuperlowFullView bean : yearBeans) {
				// 浓度
				String[] concentration = new String[13];
				// 排放量
				String[] emission = new String[13];
				// 平均浓度
				float concentrationAvg = 0;
				// 累计排放量
				float emissionSum = 0;
				for (int month = ResConst.monthBegin; month <= ResConst.monthEnd; month++) {
					String key = FullScreenUtils.getLastKey(beansMap, bean, nowYear + "", month);
					ResSuperlowFullView oo = beansMap.get(key);
					// 浓度
					float concenTemp = 0;
					// 排放量
					float emissionTemp = 0;
					// 获取最近的排放数据 月份的排放数据
					if (oo != null) {
						concenTemp += oo.getAvgConcent();
						emissionTemp += oo.getCumEmission();
					}
					concentrationAvg += concenTemp;
					emissionSum += emissionTemp;
					concentration[month - 1] = concenTemp + "";
					emission[month - 1] = emissionTemp + "";
				}
				concentration[12] = concentrationAvg / 12 + "";
				emission[12] = emissionSum + "";
				bean.setAvgConcentMonth(concentration);
				bean.setEmissionMonth(emission);
				currentMap.put(bean.getPsCode() + "-" + bean.getUnit(), bean);
			}
		}
		return currentMap;
	}

	/**
	 * 获取给定年份的 机组信息
	 * 
	 * @param beansMap
	 * @param beans
	 * @param operatorBeans
	 * @return
	 */
	public static float[] getGivenYearEmissions(Map<String, ResSuperlowFullView> beansMap, List<ResSuperlowFullView> beans,
			Map<String, List<ResSuperlowFullView>> operatorBeans, String givenYear) {
		Map<String, ResSuperlowFullView> gvienMap = new HashMap<String, ResSuperlowFullView>();

		for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
			List<ResSuperlowFullView> yearBeans = operatorBeans.get(year + "");
			if (yearBeans == null || yearBeans.size() < 1) {
				continue;
			}
			for (ResSuperlowFullView bean : yearBeans) {
				// 浓度
				String[] concentration = new String[13];
				// 排放量
				String[] emission = new String[13];
				// 平均浓度
				float concentrationAvg = 0;
				// 累计排放量
				float emissionSum = 0;
				for (int month = ResConst.monthBegin; month <= ResConst.monthEnd; month++) {
					String key = bean.getPsCode() + "-" + bean.getUnit() + "-" + year + "-" + month;
					ResSuperlowFullView oo = beansMap.get(key);
					float concenTemp = 0;
					float emissionTemp = 0;
					// 获取最近的排放数据 月份的排放数据
					if (oo != null) {
						concenTemp += oo.getAvgConcent();
						emissionTemp += oo.getCumEmission();
					}
					concentrationAvg += concenTemp;
					emissionSum += emissionTemp;
					concentration[month - 1] = concenTemp + "";
					emission[month - 1] = emissionTemp + "";
				}
				concentration[12] = concentrationAvg / 12 + "";
				emission[12] = emissionSum + "";
				bean.setAvgConcentMonth(concentration);
				bean.setEmissionMonth(emission);
				gvienMap.put(bean.getPsCode() + "-" + bean.getUnit(), bean);
			}
		}
		// 基础排放量
		float emissions = 0;
		// 基础装机容量
		float installed = 0;
		for (String key : gvienMap.keySet()) {
			ResSuperlowFullView bean = gvienMap.get(key);
			emissions += Float.parseFloat(bean.getEmissionMonth()[12]);
			installed += bean.getInstalled();
		}
		float[] values = new float[3];
		values[0] = emissions;
		values[1] = 0;
		values[2] = installed;
		return values;
	}

	/**
	 * 格式化每年的 机组操作信息
	 * 
	 * @param beansMap
	 * @param beansYearMap
	 * @param pollCode
	 * @return
	 */
	public static JSONObject previewSuperlowFullViewInfo(Map<String, ResSuperlowFullView> beansMap, Map<String, List<ResSuperlowFullView>> beansYearMap,
			String pollCode) {
		JSONObject object = new JSONObject();
		/**
		 * 存储每年的 操作信息
		 */
		List<ResSuperlowFullView> yearList = null;
		String nowDate = DateUtils.dataFormatYM(new Date());
		String nowDates = DateUtils.dataFormatYMD(new Date());
		object.put("nowTime", nowDates);
		String nowDay = nowDates.split("-")[2];
		int nowMonth = Integer.parseInt(nowDate.split("-")[1]);
		long nowTime = DateUtils.dataFormatYm(nowDate);
		if (Integer.parseInt(nowDay) <= ResConst.statisticsTime) {
			nowMonth -= 1;
			if (nowMonth < 1) {
				nowMonth = 1;
			}
		}
		for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
			List<ResSuperlowFullView> yearBeans = (List<ResSuperlowFullView>) beansYearMap.get(year + "");
			if (yearBeans == null) {
				continue;
			}
			yearList = new ArrayList<ResSuperlowFullView>();
			for (ResSuperlowFullView bean : yearBeans) {
				long rTime = DateUtils.dataFormatYm(bean.getRectificationDate());
				long pTime = DateUtils.dataFormatYm(bean.getProductionDate());
				String[] concentration = new String[13];
				String[] emission = new String[13];
				float concentrationAvg = 0;
				float emissionSum = 0;
				float emissions = 0;
				/**
				 * 当前月份以前使用在线数据
				 */
				for (int month = ResConst.monthBegin; month < nowMonth; month++) {
					String key = FullScreenUtils.getLastKey(beansMap, bean, year + "", month);
					ResSuperlowFullView oo = beansMap.get(key);
					float concenTemp = 0;
					float emissionTemp = 0;
					if (oo != null) {
						concenTemp = oo.getAvgConcent();
						concentrationAvg += concenTemp;
						emissionTemp = oo.getCumEmission();
						emissionSum += emissionTemp;
						emissions += emissionTemp;
					}
					concentration[month - 1] = concenTemp + "";
					emission[month - 1] = emissionTemp + "";
				}
				/**
				 * 在当前时间之前投产了
				 */
				if (nowTime >= pTime) {
					/**
					 * 当月之后的数据使用预测数据、分析数据来源于上一年的数据、按着超低排放的标准来
					 */
					for (int month = nowMonth; month <= ResConst.monthEnd; month++) {
						String key = FullScreenUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						/**
						 * 如果不是关停
						 */
						if (bean.getFlag() != 1) {
							concenTemp = FullScreenUtils.getPollConcentration(pollCode);
							concentrationAvg += concenTemp;
						}
						/**
						 * 如果是新建
						 */
						if (bean.getFlag() == 2 && oo == null) {
							emissionTemp = FullScreenUtils.getPollSuperLow(bean.getInstalled(), pollCode);
							emissions += emissionTemp;
						}
						// 当前是否有值
						if (oo != null) {
							emissionTemp = FullScreenUtils.getPollEmission(oo, concenTemp);
							emissions += oo.getCumEmission();
						}
						emissionSum += emissionTemp;
						concentration[month - 1] = concenTemp + "";
						emission[month - 1] = emissionTemp + "";
					}
				}
				/**
				 * 在当月之后开始整改的
				 */
				else if (nowTime < rTime) {
					/**
					 * 当月之后的数据使用预测数据、分析数据来源于上一年的数据
					 */
					int rMonth = Integer.parseInt(bean.getRectificationDate().split("-")[1]);
					int pMonth = Integer.parseInt(bean.getRectificationDate().split("-")[1]);

					for (int month = nowMonth; month < rMonth; month++) {
						String key = FullScreenUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						// 当前是否有值
						if (oo != null) {
							emissions += oo.getCumEmission();
							concenTemp = oo.getAvgConcent();
							concentrationAvg += concenTemp;
							emissionTemp = FullScreenUtils.getPollEmission(oo, concenTemp);
						}
						emissionSum += emissionTemp;
						concentration[month - 1] = concenTemp + "";
						emission[month - 1] = emissionTemp + "";
					}
					/**
					 * 整改期间浓度为 0 ，排放量为 0
					 */
					for (int month = rMonth; month < pMonth; month++) {
						String key = FullScreenUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						// 当前是否有值
						if (oo != null) {
							emissions += oo.getCumEmission();
							concenTemp = oo.getAvgConcent();
						}
						concentrationAvg += concenTemp;
						emissionSum += emissionTemp;
						concentration[month - 1] = concenTemp + "";
						emission[month - 1] = emissionTemp + "";
					}
					/**
					 * 投产后按着 上一年的对应月份的排放数据计算当年对应月份的排放数据
					 */
					for (int month = pMonth; month <= ResConst.monthEnd; month++) {
						String key = FullScreenUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						/**
						 * 如果不是关停
						 */
						if (bean.getFlag() != 1) {
							concenTemp = FullScreenUtils.getPollConcentration(pollCode);
							concentrationAvg += concenTemp;
						}
						/**
						 * 如果是新建
						 */
						if (bean.getFlag() == 2 && oo == null) {
							emissionTemp = FullScreenUtils.getPollSuperLow(bean.getInstalled(), pollCode);
							emissions += emissionTemp;
						}
						// 当前是否有值
						if (oo != null) {
							emissionTemp = FullScreenUtils.getPollEmission(oo, concenTemp);
							emissions += oo.getCumEmission();
						}
						emissionSum += emissionTemp;
						concentration[month - 1] = concenTemp + "";
						emission[month - 1] = emissionTemp + "";
					}
				}
				/**
				 * 当月处于整改时间段内
				 */
				else if (nowTime >= rTime && nowTime < pTime) {
					/**
					 * 当月之后的数据使用预测数据、分析数据来源于上一年的数据
					 */
					int rMonth = Integer.parseInt(bean.getRectificationDate().split("-")[1]);
					int pMonth = Integer.parseInt(bean.getRectificationDate().split("-")[1]);
					/**
					 * 整改期间浓度为 0 ，排放量为 0
					 */
					for (int month = nowMonth; month < pMonth; month++) {
						String key = FullScreenUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						// 当前是否有值
						if (oo != null) {
							emissionTemp = oo.getCumEmission();
							emissions += oo.getCumEmission();
							concenTemp = oo.getAvgConcent();
						}
						concentrationAvg += concenTemp;
						emissionSum += emissionTemp;
						concentration[month - 1] = concenTemp + "";
						emission[month - 1] = emissionTemp + "";
					}
					/**
					 * 投产后按着 上一年的对应月份的排放数据计算当年对应月份的排放数据
					 */
					for (int month = pMonth; month < ResConst.monthEnd; month++) {
						String key = FullScreenUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						/**
						 * 如果不是关停
						 */
						if (bean.getFlag() != 1) {
							concenTemp = FullScreenUtils.getPollConcentration(pollCode);
							concentrationAvg += concenTemp;
						}
						/**
						 * 如果是新建
						 */
						if (bean.getFlag() == 2 && oo == null) {
							emissionTemp = FullScreenUtils.getPollSuperLow(bean.getInstalled(), pollCode);
							emissions += emissionTemp;
						}
						// 当前是否有值
						if (oo != null) {
							emissionTemp = FullScreenUtils.getPollEmission(oo, concenTemp);
							emissions += oo.getCumEmission();
						}
						emissionSum += emissionTemp;
						concentration[month - 1] = concenTemp + "";
						emission[month - 1] = emissionTemp + "";
					}
				}
				concentration[12] = concentrationAvg / 12 + "";
				emission[12] = emissionSum + "";
				bean.setAvgConcentMonth(concentration);
				bean.setEmissionMonth(emission);
				bean.setReductions(emissions - emissionSum);
				yearList.add(bean);
			}
			object.put(year + "", yearList);
		}
		return object;
	}

	/**
	 * 获取最后可用的key
	 * 
	 * @param bean
	 * @param month
	 * @param nowMonth
	 * @return
	 */
	public static String getLastKey(Map<String, ResSuperlowFullView> beansMap, ResSuperlowFullView bean, String year, int month) {
		String key = bean.getPsCode() + "-" + bean.getUnit() + "-" + year + "-" + month;

		/**
		 * 如果已经到了 2015年
		 */
		if (ResConst.BEGINYEAR.equals(year)) {
			return key;
		}
		/**
		 * 判断当前的对象是否为空
		 */
		if (beansMap.get(key) != null) {
			return key;
		} else {
			/**
			 * 递归找到最新有值的一个
			 */
			String y = (Integer.parseInt(year) - 1) + "";
			key = bean.getPsCode() + "-" + bean.getUnit() + "-" + y + "-" + month;
			return FullScreenUtils.getLastKey(beansMap, bean, y, month);
		}
	}

	/**
	 * 获取对应污染物的浓度信息
	 * 
	 * @param pollCode
	 * @return
	 */
	public static float getPollConcentration(String pollCode) {
		if (pollCode.equals(ResConst.SO2CODE)) {
			return ResConst.so2Super;
		} else if (pollCode.equals(ResConst.NOXCODE)) {
			return ResConst.noxSuper;
		} else if (pollCode.equals(ResConst.DUSTCODE)) {
			return ResConst.dustSuper;
		}
		return 0f;
	}

	/**
	 * 计算超低排放的信息 污染物排放量
	 * 
	 * @param installed
	 * @param pollType
	 * @return
	 */
	public static float getPollSuperLow(float installed, String pollType) {
		float num = 0;
		float emission = 0;
		if (ResConst.SO2CODE.equals(pollType)) {
			emission = ResConst.so2Super;
		} else if (ResConst.NOXCODE.equals(pollType)) {
			emission = ResConst.noxSuper;
		} else if (ResConst.DUSTCODE.equals(pollType)) {
			emission = ResConst.dustSuper;
		} else {
			emission = ResConst.so2Super;
		}
		num = installed * 2600f * 4979f * emission / 0.56f / 1000000000 / 12;
		return num;
	}

	/**
	 * 获取对应机组的 污染物预测排放信息
	 * 
	 * @param bean
	 * @param concentration
	 * @return
	 */
	public static float getPollEmission(ResSuperlowFullView bean, float concentration) {
		float concen = bean.getAvgConcent();
		float emission = bean.getCumEmission();
		float result = 0f;
		// 如果浓度小于等于 0
		if (concen > 0.0) {
			result = emission / concen * concentration;
		}
		result = result <= emission ? result : emission;
		return result;
	}

	/**
	 * 将全区和各盟市的数据格式化
	 * 
	 * @param citySuperlowMap
	 * @return
	 */

	public static JSONObject formatFullScreenView(Map<String, JSONObject> objMap, String pollType) {
		JSONObject object = new JSONObject();
		List<String> xAxis = new ArrayList<String>();
		JSONObject obj = null;
		// 排放量
		JSONArray emissionsYear = null;
		// 减排量
		JSONArray reductionsYear = null;

		Float[] emissionsCity = null;
		Float[] reductionCity = null;
		Float[] installedCity = null;
		Map<String, Float[]> yearCityEmissionsValue = new HashMap<String, Float[]>();
		Map<String, Float[]> yearCityReductionsValue = new HashMap<String, Float[]>();
		Map<String, Float[]> yearCityInstalledValue = new HashMap<String, Float[]>();

		Float[] emissionsAll = new Float[5];
		Float[] reductionAll = new Float[5];
		Float[] installedAll = new Float[5];

		Map<String, Float[]> yearAllEmissionsValue = new HashMap<String, Float[]>();
		Map<String, Float[]> yearAllReductionsValue = new HashMap<String, Float[]>();
		Map<String, Float[]> yearAllInstalledValue = new HashMap<String, Float[]>();
		// 装机容量
		int i = 0;
		for (String key : objMap.keySet()) {
			obj = objMap.get(key);
			if (!"全区".equals(key)) {
				emissionsYear = obj.getJSONArray("emissions");
				reductionsYear = obj.getJSONArray("reductions");
				for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
					int index = year - ResConst.SUPERBEGINYEAR;
					emissionsCity = yearCityEmissionsValue.get(year + "");
					reductionCity = yearCityReductionsValue.get(year + "");
					installedCity = yearCityInstalledValue.get(year + "");
					if (emissionsCity == null) {
						emissionsCity = new Float[12];
					}
					if (reductionCity == null) {
						reductionCity = new Float[12];
					}
					if (installedCity == null) {
						installedCity = new Float[12];
					}
					emissionsCity[i] = emissionsYear.getFloat(index);
					reductionCity[i] = reductionsYear.getFloat(index);
					installedCity[i] = FullScreenUtils.getInstalledAmount(reductionsYear.getFloat(index), pollType);
					yearCityEmissionsValue.put(year + "", emissionsCity);
					yearCityReductionsValue.put(year + "", reductionCity);
					yearCityInstalledValue.put(year + "", installedCity);
				}
				i++;
				xAxis.add(key);
			} else {
				emissionsYear = obj.getJSONArray("emissions");
				reductionsYear = obj.getJSONArray("reductions");
				for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
					int index = year - ResConst.SUPERBEGINYEAR;
					emissionsAll[index] = emissionsYear.getFloat(index);
					reductionAll[index] = reductionsYear.getFloat(index);
					installedAll[index] = FullScreenUtils.getInstalledAmount(reductionsYear.getFloat(index), pollType);
					yearAllEmissionsValue.put(year + "", emissionsAll);
					yearAllReductionsValue.put(year + "", reductionAll);
					yearAllInstalledValue.put(year + "", installedAll);
				}

			}
		}
		object.put("xAxis", xAxis);
		object.put("emissionsAll", emissionsAll);
		object.put("reductionsAll", reductionAll);
		object.put("installedAll", installedAll);
		object.put("emissionsCity", yearCityEmissionsValue);
		object.put("reductionsCity", yearCityReductionsValue);
		object.put("installedCity", yearCityInstalledValue);
		return object;
	}

	/**
	 * 计算减排量可以用来新建的机组
	 * 
	 * @param reductions
	 * @return
	 */
	public static float getInstalledAmount(float reductions, String pollType) {
		float num = 0;
		float emission = 0;
		if (ResConst.SO2CODE.equals(pollType)) {
			emission = 0.16f;
		} else if (ResConst.NOXCODE.equals(pollType)) {
			emission = 0.23f;
		} else if (ResConst.DUSTCODE.equals(pollType)) {
			emission = 0.05f;
		} else {
			emission = 0.16f;
		}
		num = reductions / emission * 250 / 10000;
		return num;
	}

	/**
	 * 格式化显示 数据质量统计情况
	 * 
	 * @param allBeans
	 * @param cityBeans
	 * @return
	 */
	public static JSONObject formatDataQuality(List<FullScreen> allBeans, List<FullScreen> cityBeans) {

		List<String> legend = new ArrayList<String>();
		List<String> xAxis = new ArrayList<String>();
		List<JSONObject> allValue = new ArrayList<JSONObject>();
		List<String> cityNames = new ArrayList<String>();
		Map<String, Integer[]> cityValue = new HashMap<String, Integer[]>();
		JSONObject obj = null;
		for (FullScreen bean : allBeans) {
			legend.add(bean.getAlgorithmName());
			obj = new JSONObject();
			obj.put("name", bean.getAlgorithmName());
			obj.put("value", bean.getCount());
			allValue.add(obj);
		}

		for (FullScreen bean : cityBeans) {
			String cityName = bean.getCityName();
			if (!cityNames.contains(cityName)) {
				cityNames.add(cityName);
				xAxis.add(cityName);
			}
		}

		for (FullScreen bean : cityBeans) {
			String algoName = bean.getAlgorithmName();
			String cityName = bean.getCityName();
			Integer[] value = cityValue.get(algoName);
			if (value == null) {
				value = new Integer[cityNames.size()];
			}
			value[cityNames.indexOf(cityName)] = bean.getCount();
			cityValue.put(algoName, value);
		}
		JSONObject object = new JSONObject();
		object.put("legend", legend);
		object.put("xAxis", xAxis);
		object.put("allValue", allValue);
		object.put("cityValue", cityValue);

		return object;
	}

	/**
	 * 显示热词相关信息
	 * 
	 * @param allBeans
	 * @param cityBeans
	 * @return
	 */
	public static JSONObject formatHotWord(List<FullScreen> allBeans, List<FullScreen> psBeans) {

		List<String> legend = new ArrayList<String>();
		List<String> xAxis = new ArrayList<String>();
		List<JSONObject> allValue = new ArrayList<JSONObject>();
		List<Integer> psValue = new ArrayList<Integer>();
		Map<String, List> psInfo = new HashMap<String, List>();
		JSONObject obj = null;
		for (FullScreen bean : allBeans) {
			legend.add(bean.getName());
			obj = new JSONObject();
			obj.put("name", bean.getName());
			obj.put("value", bean.getCount());
			allValue.add(obj);
		}
		for (FullScreen bean : psBeans) {
			String name = bean.getPsName();
			if (!xAxis.contains(name)) {
				xAxis.add(name);
				psValue.add(bean.getAllCount());
			}
			List values = psInfo.get(name);
			if (values == null) {
				values = new ArrayList();
			}
			obj = new JSONObject();
			obj.put("name", bean.getName());
			obj.put("count", bean.getCount());
			values.add(obj);
			psInfo.put(name, values);
		}

		JSONObject object = new JSONObject();
		object.put("legend", legend);
		object.put("xAxis", xAxis);
		object.put("allValue", allValue);
		object.put("psValue", psValue);
		object.put("psInfo", psInfo);
		return object;
	}

	/**
	 * 查看某一具体盟市在某段时间内的各项指标明细的明细
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static List<ResQuota> formatCityQuotaLine(List<ResQuota> beans, List<ResQuota> reliablitity, ResQuotaParameter weight) {
		List<ResQuota> monthBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> monthMap = new LinkedHashMap<String, ResQuota>();
		Map<String, Integer> monthNumber = new LinkedHashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			FullScreenUtils.formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation() + bean.getHandicapping()
					* weight.getHandicapping() + bean.getMutation() * weight.getMutation() + bean.getScreenJump() * weight.getScreenJump() + bean.getComplete()
					* weight.getComplete() + bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota monthBean = monthMap.get(bean.getCityId() + "-" + bean.getDate());
			if (monthBean == null) {
				monthBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			monthBean.setDate(bean.getDate());
			monthBean.setCityId(bean.getCityId());
			monthBean.setCityName(bean.getCityName());
			monthBean.setConstant(bean.getConstant() + monthBean.getConstant());
			monthBean.setFluctuation(bean.getFluctuation() + monthBean.getFluctuation());
			monthBean.setHandicapping(bean.getHandicapping() + monthBean.getHandicapping());
			monthBean.setMutation(bean.getMutation() + monthBean.getMutation());
			monthBean.setScreenJump(bean.getScreenJump() + monthBean.getScreenJump());
			monthBean.setComplete(bean.getComplete() + monthBean.getComplete());
			monthBean.setEffective(bean.getEffective() + monthBean.getEffective());
			monthBean.setReliable(bean.getReliable() + monthBean.getReliable());

			monthBean.setConstantWeights(bean.getConstant() * weight.getConstant() + monthBean.getConstantWeights());
			monthBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation() + monthBean.getFluctuationWeights());
			monthBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping() + monthBean.getHandicappingWeights());
			monthBean.setMutationWeights(bean.getMutation() * weight.getMutation() + monthBean.getMutationWeights());
			monthBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump() + monthBean.getScreenJumpWeights());
			monthBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + monthBean.getCompleteWeights());
			monthBean.setEffectiveWeights(bean.getEffective() * weight.getEffective() + monthBean.getEffectiveWeights());
			monthBean.setReliableWeights(bean.getReliable() * weight.getReliable() + monthBean.getReliableWeights());

			monthBean.setTotal(bean.getTotal() + monthBean.getTotal());
			monthMap.put(bean.getCityId() + "-" + bean.getDate(), monthBean);
			// 计算当前盟市个数
			Integer num = monthNumber.get(bean.getCityId() + "-" + bean.getDate());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			monthNumber.put(bean.getCityId() + "-" + bean.getDate(), num);
		}
		// 设置盟市得分情况
		for (String key : monthMap.keySet()) {
			ResQuota monthBean = monthMap.get(key);
			int number = monthNumber.get(key);
			monthBean.setConstant(monthBean.getConstant() / number);
			monthBean.setFluctuation(monthBean.getFluctuation() / number);
			monthBean.setHandicapping(monthBean.getHandicapping() / number);
			monthBean.setMutation(monthBean.getMutation() / number);
			monthBean.setScreenJump(monthBean.getScreenJump() / number);
			monthBean.setComplete(monthBean.getComplete() / number);
			monthBean.setEffective(monthBean.getEffective() / number);
			monthBean.setReliable(monthBean.getReliable() / number);

			monthBean.setConstantWeights(monthBean.getConstantWeights() / number);
			monthBean.setFluctuationWeights(monthBean.getFluctuationWeights() / number);
			monthBean.setHandicappingWeights(monthBean.getHandicappingWeights() / number);
			monthBean.setMutationWeights(monthBean.getMutationWeights() / number);
			monthBean.setScreenJumpWeights(monthBean.getScreenJumpWeights() / number);
			monthBean.setCompleteWeights(monthBean.getCompleteWeights() / number);
			monthBean.setEffectiveWeights(monthBean.getEffectiveWeights() / number);
			monthBean.setReliableWeights(monthBean.getReliableWeights() / number);

			monthBean.setTotal(monthBean.getTotal() / number);
			monthBeans.add(monthBean);
		}
		return monthBeans;
	}

	/**
	 * 格式化盟市信息 指标得分信息
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static void formatQuotaTotal(ResQuota bean, List<ResQuota> reliablitity) {
		for (ResQuota o : reliablitity) {
			if (o.getPsCode().equals(bean.getPsCode())) {
				if ((DateUtils.formatDate(bean.getDate(), o.getBeginTime()) >= 0) && (DateUtils.formatDate(bean.getDate(), o.getEndTime()) <= 0)) {
					bean.setReliable(0);
					bean.setTotal(0);
					return;
				}
			}
		}

	}

	/**
	 * 数据质量改善分析 数据格式化
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatQuotaYear(List<ResQuota> beans) {

		JSONObject object = new JSONObject();
		List<String> legend = new ArrayList<String>();
		List<String> xAxis = new ArrayList<String>();
		Map<String, List> cityData = new HashMap<String, List>();
		Map<String, ResQuota> cityValueMap = new HashMap<String, ResQuota>();
		// 初始化数值
		for (int i = 0; i < 12; i++) {
			xAxis.add(i + 1 + "月");
		}
		List cityValue = null;
		String cityName = beans.get(0).getCityName();
		for (ResQuota bean : beans) {
			cityValue = cityData.get(bean.getCityName());
			if (cityValue == null) {
				cityValue = new ArrayList();
				for (int i = 0; i < 12; i++) {
					cityValue.add("-");
				}
			}
			if (!legend.contains(bean.getCityName())) {
				legend.add(bean.getCityName());
			}
			cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getTotal());
			cityData.put(bean.getCityName(), cityValue);
			String name = bean.getCityName();
			int mon = Integer.parseInt(bean.getDate()) - 1;
			ResQuota oo = cityValueMap.get(name);
			if (oo == null) {
				cityValueMap.put(name, bean);
			} else {
				int month = Integer.parseInt(oo.getDate()) - 1;
				if (mon > month) {
					cityValueMap.put(name, bean);
				}
			}
		}

		Map cityQuotaPara = new HashMap();
		for (String key : cityValueMap.keySet()) {
			ResQuota bean = cityValueMap.get(key);
			List values = new ArrayList();
			values.add(bean.getEffectiveWeights());
			values.add(bean.getCompleteWeights());
			values.add(bean.getReliableWeights());
			values.add(bean.getScreenJumpWeights());
			values.add(bean.getMutationWeights());
			values.add(bean.getHandicappingWeights());
			values.add(bean.getFluctuationWeights());
			values.add(bean.getConstantWeights());
			cityQuotaPara.put(key, values);
		}
		List indicator = new ArrayList();
		JSONObject obj = null;
		obj = new JSONObject();
		obj.put("name", ResConst.CEFFECTIVE);
		obj.put("max", 1.5);
		indicator.add(obj);
		obj = new JSONObject();
		obj.put("name", ResConst.CCOMPLETE);
		obj.put("max", 1.5);
		indicator.add(obj);
		obj = new JSONObject();
		obj.put("name", ResConst.CRELIABLE);
		obj.put("max", 1.5);
		indicator.add(obj);
		obj = new JSONObject();
		obj.put("name", ResConst.CSCREENJUMP);
		obj.put("max", 1.5);
		indicator.add(obj);
		obj = new JSONObject();
		obj.put("name", ResConst.CMUTATION);
		obj.put("max", 1.5);
		indicator.add(obj);
		obj = new JSONObject();
		obj.put("name", ResConst.CHANDICAPPING);
		obj.put("max", 1.5);
		indicator.add(obj);
		obj = new JSONObject();
		obj.put("name", ResConst.CFLUCTUATION);
		obj.put("max", 1.5);
		indicator.add(obj);
		obj = new JSONObject();
		obj.put("name", ResConst.CCONSTANT);
		obj.put("max", 1.5);
		indicator.add(obj);
		object.put("xAxis", xAxis);
		object.put("indicator", indicator);
		object.put("cityData", cityData);
		object.put("legend", legend);
		object.put("cityPara", cityQuotaPara);
		return object;
	}

	/**
	 * 格式化 指标数据
	 * 
	 * @param bean
	 * @return
	 */
	public static JSONObject formatIndustryInfo(List<ResIndustryCon> beans, String viewPoint, String pollType) {
		JSONObject object = new JSONObject();
		List<String> xAxis = new ArrayList<String>();
		List<Integer> xAxisId = new ArrayList<Integer>();
		String[] legend = new String[3];
		legend[1] = "发电量(百万kwh)";
		JSONObject data = new JSONObject();
		List<Float> pollData = new ArrayList<Float>();
		List<Float> powerData = new ArrayList<Float>();
		List<Float> emissionData = new ArrayList<Float>();
		// 如果是盟市信息
		if ("city".equals(viewPoint)) {
			for (ResIndustryCon bean : beans) {
				xAxis.add(bean.getTagName());
				xAxisId.add(bean.getCityId());
				powerData.add(bean.getGenCapacity() / 1000);
				if ("SO2".equals(pollType)) {
					legend[0] = "SO2排放量(t)";
					legend[2] = "SO2排放绩效(g/kwh)";
					pollData.add(bean.getSo2Amount() / 1000000);
					if ((int) bean.getSo2GenCapacity() == 0) {
						emissionData.add(0f);
					} else {
						emissionData.add(bean.getSo2Amount() / 1000 / bean.getSo2GenCapacity());
					}
				} else if ("NOx".equals(pollType)) {
					legend[0] = "NOx排放量(t)";
					legend[2] = "NOx排放绩效(g/kwh)";
					pollData.add(bean.getNoxAmount() / 1000000);
					if ((int) bean.getNoxGenCapacity() == 0) {
						emissionData.add(0f);
					} else {
						emissionData.add(bean.getNoxAmount() / 1000 / bean.getNoxGenCapacity());
					}
				} else {
					legend[0] = "烟尘排放量(t)";
					legend[2] = "烟尘排放绩效(g/kwh)";
					pollData.add(bean.getDustAmount() / 1000000);
					if ((int) bean.getDustGenCapacity() == 0) {
						emissionData.add(0f);
					} else {
						emissionData.add(bean.getDustAmount() / 1000 / bean.getDustGenCapacity());
					}
				}
			}
		} else {
			for (ResIndustryCon bean : beans) {
				xAxis.add(bean.getGroupName());
				xAxisId.add(bean.getGroupId());
				powerData.add(bean.getGenCapacity() / 1000);
				if ("SO2".equals(pollType)) {
					legend[0] = "SO2排放量(t)";
					legend[2] = "SO2排放绩效";
					pollData.add(bean.getSo2Amount() / 1000000);
					if ((int) bean.getSo2GenCapacity() == 0) {
						emissionData.add(0f);
					} else {
						emissionData.add(bean.getSo2Amount() / 1000 / bean.getSo2GenCapacity());
					}
				} else if ("NOx".equals(pollType)) {
					legend[0] = "NOx排放量(t)";
					legend[2] = "NOx排放绩效";
					pollData.add(bean.getNoxAmount() / 1000000);
					if ((int) bean.getNoxGenCapacity() == 0) {
						emissionData.add(0f);
					} else {
						emissionData.add(bean.getNoxAmount() / 1000 / bean.getNoxGenCapacity());
					}
				} else {
					legend[0] = "烟尘排放量(t)";
					legend[2] = "烟尘排放绩效";
					pollData.add(bean.getDustAmount() / 1000000);
					if ((int) bean.getDustGenCapacity() == 0) {
						emissionData.add(0f);
					} else {
						emissionData.add(bean.getDustAmount() / 1000 / bean.getDustGenCapacity());
					}
				}
			}
		}
		// 构建返回的 json 对象
		data.put("pollData", pollData);
		data.put("powerData", powerData);
		data.put("emissionData", emissionData);
		object.put("data", data);
		object.put("xAxisId", xAxisId);
		object.put("xAxis", xAxis);
		object.put("legend", legend);
		return object;
	}

	/**
	 * 格式化 获取 盟市或行业的硫分数据
	 * 
	 * @param beans
	 * @param viewPoint
	 * @param beginMonth
	 * @param endMonth
	 * @return
	 */
	public static JSONObject formatIndustrySulfurMonth(List<ResIndustryCon> beans, String viewPoint, int beginMonth, int endMonth) {
		JSONObject object = new JSONObject();
		List<String> xAxis = new ArrayList<String>();
		List<String> yAxis = new ArrayList<String>();
		yAxis.add("1月");
		yAxis.add("2月");
		yAxis.add("3月");
		yAxis.add("4月");
		yAxis.add("5月");
		yAxis.add("6月");
		yAxis.add("7月");
		yAxis.add("8月");
		yAxis.add("9月");
		yAxis.add("10月");
		yAxis.add("11月");
		yAxis.add("12月");
		List<ArrayList<Float>> data = new ArrayList<ArrayList<Float>>();
		Map<String, Integer> position = new HashMap<String, Integer>();
		Map<String, List<ArrayList<Float>>> valuesGroups = new HashMap<String, List<ArrayList<Float>>>();
		if ("city".equals(viewPoint)) {
			int length = beans.size();
			for (int i = 0; i < length; i++) {
				ResIndustryCon bean = beans.get(i);
				int pos = 0;
				if (!position.containsKey(bean.getCityName())) {
					position.put(bean.getCityName(), position.size());
				}
				pos = position.get(bean.getCityName());
				if (!xAxis.contains(bean.getCityName())) {
					xAxis.add(bean.getCityName());
				}
				List<ArrayList<Float>> valuesGroup = valuesGroups.get(bean.getCityName());
				if (valuesGroup == null) {
					valuesGroup = new ArrayList<ArrayList<Float>>();
				}
				List<Float> values = new ArrayList<Float>();
				float value = 0.0f;
				if ((int) bean.getCoalAmount() == 0) {
					value = (float) 0.0;
				} else {
					value = bean.getSo2Produce() / 1000000 / bean.getCoalAmount() * 5 / 8;
					if (value > 0.04) {
						value = 0.04f;
					}
				}
				// 添加 x轴、y轴 以及数值
				values.add((float) pos);
				values.add((float) Integer.parseInt(bean.getMonth()) - 1);
				values.add(value * 100);
				valuesGroup.add((ArrayList<Float>) values);
				valuesGroups.put(bean.getCityName(), valuesGroup);
			}
		} else {
			int length = beans.size();
			for (int i = 0; i < length; i++) {
				ResIndustryCon bean = beans.get(i);
				int pos = 0;
				if (!position.containsKey(bean.getGroupName())) {
					position.put(bean.getGroupName(), position.size());
				}
				pos = position.get(bean.getGroupName());
				if (!xAxis.contains(bean.getGroupName())) {
					xAxis.add(bean.getGroupName());
				}
				List<ArrayList<Float>> valuesGroup = valuesGroups.get(bean.getGroupName());
				if (valuesGroup == null) {
					valuesGroup = new ArrayList<ArrayList<Float>>();

				}
				List<Float> values = new ArrayList<Float>();
				float value = 0.0f;
				if ((int) bean.getCoalAmount() == 0) {
					value = (float) 0.0;
				} else {
					value = bean.getSo2Produce() / 1000000 / bean.getCoalAmount() * 5 / 8;
					if (value > 0.04) {
						value = 0.04f;
					}
				}
				// 添加 x轴、y轴 以及数值
				values.add((float) pos);
				values.add((float) Integer.parseInt(bean.getMonth()) - 1);
				values.add(value * 100);
				valuesGroup.add((ArrayList<Float>) values);
				valuesGroups.put(bean.getGroupName(), valuesGroup);
			}
		}
		data = formamtAllMonthValues(valuesGroups, beginMonth, endMonth);
		object.put("data", data);
		object.put("xAxis", xAxis);
		object.put("yAxis", yAxis);
		return object;
	}

	/**
	 * 当计算的月份不足12一个月时，将对应的数据补齐
	 * 
	 * @param valuesGroup
	 * @return
	 */
	public static List<ArrayList<Float>> formamtAllMonthValues(Map<String, List<ArrayList<Float>>> valuesGroups, int beginMonth, int endMonth) {
		List<ArrayList<Float>> data = new ArrayList<ArrayList<Float>>();
		for (String key : valuesGroups.keySet()) {
			List<ArrayList<Float>> valuesGroup = valuesGroups.get(key);
			int length = valuesGroup.size();
			// 判断当前是否有数据
			if (length > 0) {
				List<Float> values = valuesGroup.get(0);
				List value = null;
				for (int month = length; month < 12; month++) {
					// 加入没有达到的月份数据，并且置为 0
					value = new ArrayList<Float>();
					value.add(values.get(0));
					value.add((float) month);
					value.add("-");
					// 加入没有数据月份
					valuesGroup.add((ArrayList) value);
				}
			}
			data.addAll(valuesGroup);
		}
		return data;
	}

	/**
	 * 对 每年的数据按着需求进行格式化
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatAnalysisFullScreenOld(List<FullScreen> beans) {
		JSONObject object = null;
		if (beans == null || beans.size() < 1) {
			return object;
		}
		object = new JSONObject();
		Map<String, List<FullScreen>> yearEffective = new HashMap<String, List<FullScreen>>();
		List xAxis = new ArrayList();
		for (FullScreen o : beans) {
			if (!xAxis.contains(o.getYear())) {
				xAxis.add(o.getYear());
			}
			List<FullScreen> os = yearEffective.get(o.getYear());
			if (os == null) {
				os = new ArrayList<FullScreen>();
			}
			os.add(o);
			yearEffective.put(o.getYear(), os);
		}

		List<Float[]> boxPlotValues = new LinkedList();
		Map<String, JSONArray> yearLowEffective = new HashMap<String, JSONArray>();
		List yearAbnormal = new ArrayList();
		for (String key : yearEffective.keySet()) {
			List<FullScreen> os = yearEffective.get(key);
			Collections.sort(os, new Comparator<FullScreen>() {
				public int compare(FullScreen data1, FullScreen data2) {
					Float d1 = data1.getSo2Effective();
					Float d2 = data2.getSo2Effective();
					return d1.compareTo(d2);
				}
			});
			List<FullScreen> oss = new ArrayList<FullScreen>();
			for (FullScreen o : os) {
				if (o.getSo2Effective() == 0.0) {
					continue;
				}
				oss.add(o);
			}
			Float[] quarterValue = FullScreenUtils.getQuarterback(oss);
			boxPlotValues.add(quarterValue);
			List<Float[]> abnormalValue = FullScreenUtils.getQuarterback(oss, quarterValue);
			yearAbnormal.addAll(abnormalValue);
			List<FullScreen> beansLow = oss.subList(0, oss.size() > 10 ? 10 : oss.size());
			JSONArray oArray = new JSONArray();
			JSONObject oo = null;
			if (beansLow != null) {
				int size = beansLow.size();
				for (int i = size - 1; i >= 0; i--) {
					FullScreen ooo = beansLow.get(i);
					oo = new JSONObject();
					oo.put("value", ooo.getSo2Effective());
					oo.put("name", ooo.getPsName());
					oo.put("products", ooo.getProducts());
					oo.put("unit", ooo.getUnit());
					oo.put("index", i);
					oArray.add(oo);
				}
			}
			yearLowEffective.put(key, oArray);
		}
		object.put("xAxis", xAxis);
		object.put("boxplot", boxPlotValues);
		object.put("funnel", yearLowEffective);
		object.put("abnormal", yearAbnormal);
		return object;
	}

	/**
	 * 对 每年的数据按着需求进行格式化
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatAnalysisFullScreen(List<FullScreen> beans) {
		JSONObject object = null;
		if (beans == null || beans.size() < 1) {
			return object;
		}
		object = new JSONObject();
		Map<String, List<FullScreen>> yearEffective = new LinkedHashMap<String, List<FullScreen>>();
		List xAxis = new ArrayList();
		for (FullScreen o : beans) {
			if (!xAxis.contains(o.getYear())) {
				xAxis.add(o.getYear());
			}
			List<FullScreen> os = yearEffective.get(o.getYear());
			if (os == null) {
				os = new ArrayList<FullScreen>();
				yearEffective.put(o.getYear(), os);
			}
			os.add(o);
		}

		List<Float[]> boxPlotValues = new LinkedList();
		List yearAbnormal = new ArrayList();
		for (String key : yearEffective.keySet()) {
			List<FullScreen> os = yearEffective.get(key);
			Collections.sort(os, new Comparator<FullScreen>() {
				public int compare(FullScreen data1, FullScreen data2) {
					Float d1 = data1.getSo2Effective();
					Float d2 = data2.getSo2Effective();
					return d1.compareTo(d2);
				}
			});
			List<FullScreen> oss = new ArrayList<FullScreen>();
			for (FullScreen o : os) {
				if (o.getSo2Effective() == 0.0) {
					continue;
				}
				oss.add(o);
			}
			Float[] quarterValue = FullScreenUtils.getQuarterback(oss);
			boxPlotValues.add(quarterValue);
			List<Float[]> abnormalValue = FullScreenUtils.getQuarterback(oss, quarterValue);
			yearAbnormal.addAll(abnormalValue);
		}

		object.put("xAxis", xAxis);
		object.put("boxplot", boxPlotValues);
		object.put("abnormal", yearAbnormal);

		int year = 0;
		for (String key : yearEffective.keySet()) {
			int tt = Integer.parseInt(key);
			if (tt > year) {
				year = tt;
			}
		}
		List<FullScreen> recentYear = yearEffective.get(year + "");
		Collections.sort(recentYear, new Comparator<FullScreen>() {
			public int compare(FullScreen data1, FullScreen data2) {
				Float d1 = data1.getSo2Effective();
				Float d2 = data2.getSo2Effective();
				return d1.compareTo(d2);
			}
		});
		List<FullScreen> oss = new ArrayList<FullScreen>();
		for (FullScreen o : recentYear) {
			if (o.getSo2Effective() == 0.0) {
				continue;
			}
			oss.add(o);
		}
		Map<String, JSONArray> recentYearEffective = new HashMap<String, JSONArray>();
		List<FullScreen> beansLow = oss.subList(0, oss.size() > 5 ? 5 : oss.size());
		JSONArray oArray = new JSONArray();
		JSONObject oo = null;
		if (beansLow != null) {
			int size = beansLow.size();
			for (int i = size - 1; i >= 0; i--) {
				FullScreen ooo = beansLow.get(i);
				oo = new JSONObject();
				oo.put("value", ooo.getSo2Effective());
				oo.put("name", ooo.getPsName());
				oo.put("products", ooo.getProducts());
				oo.put("unit", ooo.getUnit());
				oo.put("index", i);
				oArray.add(oo);
			}
		}
		recentYearEffective.put("low", oArray);
		List<FullScreen> beansHeight = null;
		if (oss.size() < 5) {
			beansHeight = oss.subList(0, oss.size() > 5 ? 5 : oss.size());
		} else {
			beansHeight = oss.subList(oss.size() - 6, oss.size() - 1);
		}
		oArray = new JSONArray();
		if (beansLow != null) {
			int size = beansHeight.size();
			for (int i = size - 1; i >= 0; i--) {
				FullScreen ooo = beansHeight.get(i);
				oo = new JSONObject();
				oo.put("value", ooo.getSo2Effective());
				oo.put("name", ooo.getPsName());
				oo.put("products", ooo.getProducts());
				oo.put("unit", ooo.getUnit());
				oo.put("index", i);
				oArray.add(oo);
			}
		}
		recentYearEffective.put("high", oArray);
		object.put("recentFunnel", recentYearEffective);
		Map<String, List<FullScreen>> cityEffective = new LinkedHashMap<String, List<FullScreen>>();
		List<String> funnelXAxis = new ArrayList<String>();
		Map<String, Integer> abnormalIndex = new HashMap<String, Integer>();
		int index = 0;
		for (FullScreen o : recentYear) {
			if (!funnelXAxis.contains(o.getTagName())) {
				funnelXAxis.add(o.getTagName());
				abnormalIndex.put(o.getTagName(), index++);
			}
			List<FullScreen> os = cityEffective.get(o.getTagName());
			if (os == null) {
				os = new ArrayList<FullScreen>();
				cityEffective.put(o.getTagName(), os);
			}
			os.add(o);
		}
		List<Float[]> cityBoxPlotValues = new LinkedList();
		List cityAbnormal = new ArrayList();
		for (String key : cityEffective.keySet()) {
			List<FullScreen> os = cityEffective.get(key);
			Collections.sort(os, new Comparator<FullScreen>() {
				public int compare(FullScreen data1, FullScreen data2) {
					Float d1 = data1.getSo2Effective();
					Float d2 = data2.getSo2Effective();
					return d1.compareTo(d2);
				}
			});
			oss = new ArrayList<FullScreen>();
			for (FullScreen o : os) {
				if (o.getSo2Effective() == 0.0) {
					continue;
				}
				oss.add(o);
			}
			Float[] quarterValue = FullScreenUtils.getQuarterback(oss);
			cityBoxPlotValues.add(quarterValue);
			List<Float[]> abnormalValue = FullScreenUtils.getQuarterback(oss, quarterValue, (float) abnormalIndex.get(key));
			cityAbnormal.addAll(abnormalValue);
		}
		object.put("funnelXAxis", funnelXAxis);
		object.put("cityBoxplot", cityBoxPlotValues);
		object.put("cityAbnormal", cityAbnormal);
		return object;
	}

	/**
	 * 获取给定数据中的四分卫值
	 * 
	 * @param beans
	 * @return
	 */
	public static Float[] getQuarterback(List<FullScreen> beans) {
		Float[] values = new Float[5];
		if (beans == null || beans.size() < 1) {
			return values;
		}

		int size = beans.size();
		float q1 = (float) ((size + 1) / 4.0);

		int q11 = (int) (q1) - 1;
		if (q1 - q11 == 1) {
			values[1] = beans.get(q11).getSo2Effective() * (q1 - q11);
		} else {
			values[1] = beans.get(q11).getSo2Effective() * (q1 - q11) + beans.get(q11 + 1).getSo2Effective() * (2 - (q1 - q11));
		}
		float q2 = (float) ((size + 1) / 2.0);
		int q21 = (int) (q2) - 1;
		if (q2 - q21 == 1) {
			values[2] = beans.get(q21).getSo2Effective() * (q2 - q21);
		} else {
			values[2] = beans.get(q21).getSo2Effective() * (q2 - q21) + beans.get(q21 + 1).getSo2Effective() * (2 - (q2 - q21));

		}
		float q3 = (float) (3 * (size + 1) / 4.0);
		int q31 = (int) (q3) - 1;
		if (q3 - q31 == 1) {
			values[3] = beans.get(q31).getSo2Effective() * (q3 - q31);
		} else {
			values[3] = beans.get(q31).getSo2Effective() * (q3 - q31) + beans.get(q31 + 1).getSo2Effective() * (2 - (q3 - q31));
		}
		float temp = values[3] - values[1];
		values[0] = (float) (values[1] - temp * 1.5);
		values[4] = (float) (values[3] + temp * 1.5);

		return values;
	}

	/**
	 * 获取四分卫值 中的异常值
	 * 
	 * @param beans
	 * @param values
	 * @return
	 */
	public static List<Float[]> getQuarterback(List<FullScreen> beans, Float[] values) {
		List<Float[]> data = new ArrayList<Float[]>();
		float min = values[0];
		float max = values[4];
		for (FullScreen o : beans) {
			float value = o.getSo2Effective();
			if (value < min || value > max) {
				Float[] v = new Float[2];
				v[0] = Float.parseFloat(o.getYear()) - 2011;
				v[1] = value;
				data.add(v);
			}
		}
		return data;
	}

	/**
	 * 获取四分卫值 中的异常值
	 * 
	 * @param beans
	 * @param values
	 * @return
	 */
	public static List<Float[]> getQuarterback(List<FullScreen> beans, Float[] values, Float index) {
		List<Float[]> data = new ArrayList<Float[]>();
		float min = values[0];
		float max = values[4];

		for (FullScreen o : beans) {
			float value = o.getSo2Effective();
			if (value < min || value > max) {
				Float[] v = new Float[2];
				v[0] = index;
				v[1] = value;
				data.add(v);
			}
		}
		return data;
	}

	public static String nodeName = "NMG_JZ_JSD";
	public static String unitRun = "YXPD";
	public static String unitInterruption = "ZDPD";
	public static String unitStop = "TYPD";
	public static String totalLoad = "ZFH";
	public static String averageLoad = "";
	public static String coalBurning = "ZML";
	public static String so2Concentration = "PJ_ND";
	public static String so2Produce = "PRODUCING";
	public static String so2Emission = "EMISSION";
	public static String desulfurizationEffectiveness = "PJ_XL";
	/**
	 * 获取每个盟市的数据情况
	 * @param cityName
	 * @return
	 */
	public static List<String> getIndustryPointsName(String cityName) {
		List<String> pointsName = new ArrayList<String>();
		String cityKey = cityKeys.get(cityName);
		pointsName.add("W3." + nodeName + "." + cityKey + "_" + unitRun);
		pointsName.add("W3." + nodeName + "." + cityKey + "_" + unitInterruption);
		pointsName.add("W3." + nodeName + "." + cityKey + "_" + unitStop);
		pointsName.add("W3." + nodeName + "." + cityKey + "_" + totalLoad);
		if(cityName.equals("巴彦淖尔市")){
			pointsName.add("W3." + nodeName + ".BM_" + so2Concentration);
		}else{
		   pointsName.add("W3." + nodeName + "." + cityKey + "_" + so2Concentration);
		}
		pointsName.add("W3." + nodeName + "." + cityKey + "_" + desulfurizationEffectiveness);
		if (cityName.equals("呼和浩特市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_ML");
			pointsName.add("W3." + nodeName + "." + cityKey + "_CSL");
			pointsName.add("W3." + nodeName + "." + cityKey + "_SO2_PFL3");
		} else if (cityName.equals("包头市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_YX_ML02");
			pointsName.add("W3." + nodeName + "." + cityKey + "_CSL");
			pointsName.add("W3." + nodeName + "." + cityKey + "_PFL");
		} else if (cityName.equals("乌海市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_CSL");
			pointsName.add("W3." + nodeName + "." + cityKey + "_PFL");
		} else if (cityName.equals("赤峰市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Produce);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Emission);
		} else if (cityName.equals("通辽市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Produce);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Emission);
		} else if (cityName.equals("鄂尔多斯市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_YX_ ML");
			pointsName.add("W3." + nodeName + "." + cityKey + "_CSL");
			pointsName.add("W3." + nodeName + "." + cityKey + "_PFL");
		} else if (cityName.equals("呼伦贝尔市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Produce);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Emission);
		} else if (cityName.equals("巴彦淖尔市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_CSL");
			pointsName.add("W3." + nodeName + "." + cityKey + "_PFL");
		} else if (cityName.equals("乌兰察布市")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Produce);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Emission);
		} else if (cityName.equals("兴安盟")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Produce);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Emission);
		} else if (cityName.equals("锡林郭勒盟")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Produce);
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+so2Emission);
		} else if (cityName.equals("阿拉善盟")) {
			pointsName.add("W3." + nodeName + "." + cityKey + "_"+coalBurning);
			pointsName.add("W3." + nodeName + "." + cityKey + "_CSL");
			pointsName.add("W3." + nodeName + "." + cityKey + "_PFL");
		}
		return pointsName;
	}
	/**
	 * 
	 * @return
	 */
	public static JSONObject formatIndustryRealTime(Map<String, OPDynamicData> dys,String cityName) {
		JSONObject obj = new JSONObject();
		String cityKey = cityKeys.get(cityName);
		int cityEnterNum = cityEnterNums.get(cityName);
		int installed = cityInstalled.get(cityName);
		obj.put("unitRun", dys.get("W3." + nodeName + "." + cityKey + "_" + unitRun).getAV());
		obj.put("unitInterruption", dys.get("W3." + nodeName + "." + cityKey + "_" + unitInterruption).getAV());
		obj.put("unitStop", dys.get("W3." + nodeName + "." + cityKey + "_" + unitInterruption).getAV());
		obj.put("enterNum", cityEnterNum);
		obj.put("installed", installed);
		obj.put("totalLoad", dys.get("W3." + nodeName + "." + cityKey + "_" + totalLoad).getAV());
		if(cityName.equals("巴彦淖尔市")){
			obj.put("so2Concentration", dys.get("W3." + nodeName + ".BM_" + so2Concentration).getAV());
		}else{
			obj.put("so2Concentration", dys.get("W3." + nodeName + "." + cityKey + "_" + so2Concentration).getAV());
		}
		obj.put("desulfurizationEffectiveness", dys.get("W3." + nodeName + "." + cityKey + "_" + desulfurizationEffectiveness).getAV());
		if (cityName.equals("呼和浩特市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_ML" ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_CSL" ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_SO2_PFL3" ).getAV());
		} else if (cityName.equals("包头市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_YX_ML02" ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_CSL" ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_PFL" ).getAV());
		} else if (cityName.equals("乌海市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+coalBurning ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_CSL" ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_PFL" ).getAV());
		} else if (cityName.equals("赤峰市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+coalBurning ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_"+so2Produce ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_"+ so2Emission).getAV());
		} else if (cityName.equals("通辽市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+coalBurning ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_"+so2Produce ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_"+ so2Emission).getAV());
		} else if (cityName.equals("鄂尔多斯市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_YX_ ML" ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_CSL" ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_PFL").getAV());
		} else if (cityName.equals("呼伦贝尔市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+coalBurning ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_"+so2Produce ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_"+ so2Emission).getAV());
		} else if (cityName.equals("巴彦淖尔市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+ coalBurning).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_CSL" ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_PFL" ).getAV());
		} else if (cityName.equals("乌兰察布市")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+coalBurning ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_"+so2Produce ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_"+ so2Emission).getAV());
		} else if (cityName.equals("兴安盟")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+coalBurning ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_"+so2Produce ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_"+ so2Emission).getAV());
		} else if (cityName.equals("锡林郭勒盟")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+coalBurning ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_"+so2Produce ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_"+ so2Emission).getAV());
		} else if (cityName.equals("阿拉善盟")) {
			obj.put("ZML", dys.get("W3." + nodeName + "." + cityKey + "_"+coalBurning ).getAV());
			obj.put("CSL", dys.get("W3." + nodeName + "." + cityKey + "_CSL" ).getAV());
			obj.put("PFL", dys.get("W3." + nodeName + "." + cityKey + "_PFL").getAV());
		}
		return obj;
	}
	/**
	 * 格式化在线排放数据
	 * @param beans
	 * @return
	 */
	public static JSONObject formatOnlineEmission(List<FullScreen> beans){
		JSONObject obj = new JSONObject();
		Float[] so2Value = new Float[12];
		Float[] noxValue = new Float[12];
		Float[] dustValue = new Float[12];
		for(FullScreen bean:beans){
			String pollCode = bean.getPolluteCode();
			int month = Integer.parseInt(bean.getMonth());
			if(pollCode.equals("A21026")){
				so2Value[month-1] = bean.getCumEmission();
			}else if(pollCode.equals("A21002")){
				noxValue[month-1] = bean.getCumEmission();
			}else {
				dustValue[month-1] = bean.getCumEmission();
			}
		}
		obj.put("so2", so2Value);
		obj.put("nox", noxValue);
		obj.put("dust", dustValue);
		return obj;
	} 

}
