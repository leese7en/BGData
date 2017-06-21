package com.magus.bd.utils;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.Element;
import com.itextpdf.text.Font;
import com.itextpdf.text.PageSize;
import com.itextpdf.text.Paragraph;
import com.itextpdf.text.Phrase;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import com.magus.bd.entity.ResSuperlowFullView;
import com.magus.bd.entity.ResSuperlowFullViewInfo;
import com.magus.bd.util.DateUtils;

public class ResSuperlowFullViewUtils {

	/**
	 * 将给定JSONArray 转为可用的机组编码数组
	 * 
	 * @param array
	 * @return
	 */
	public static JSONObject formatArrayOperator(List<ResSuperlowFullView> beans, List<ResSuperlowFullViewInfo> beansInfo) {
		JSONObject object = new JSONObject();
		List<ResSuperlowFullView> complete = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> processing = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> plan = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> planning = new ArrayList<ResSuperlowFullView>();
		String nowDate = DateUtils.dataFormatYM(new Date());
		long now = DateUtils.dataFormatYm(nowDate);
		ResSuperlowFullViewInfo info = null;
		for (ResSuperlowFullView bean : beans) {
			long rTime = DateUtils.dataFormatYm(bean.getRectificationDate());
			long pTime = DateUtils.dataFormatYm(bean.getProductionDate());
			// 当前处于已经完成的状态
			if (now >= pTime) {
				info = new ResSuperlowFullViewInfo();
				String date = bean.getProductionDate();
				info.setDate(date.replace("-", "年") + "月");
				info.setTime(date);
				info.setContent(bean.getPsName() + bean.getUnit() + "号机组完成改造，投入生产");
				beansInfo.add(info);
				complete.add(bean);
			}
			// 当前处于整改中的状态
			else if (now < pTime && now >= rTime) {
				info = new ResSuperlowFullViewInfo();
				info.setDate(nowDate.replace("-", "年") + "月");
				info.setTime(nowDate);
				info.setContent(bean.getPsName() + bean.getUnit() + "号机组正在改造中");
				beansInfo.add(info);
				processing.add(bean);
			}
			// 当前处于计划中的状态
			else if (now < rTime && bean.getFlag() != 2) {
				plan.add(bean);
			}
			// 当前处于规划状态
			else {
				planning.add(bean);
			}
		}
		object.put(ResConst.complete, complete);
		object.put(ResConst.processing, processing);
		object.put(ResConst.plan, plan);
		object.put(ResConst.planning, planning);
		return object;
	}

	/**
	 * 将给定JSONArray 自定义
	 * 
	 * @param array
	 * @return
	 */
	public static JSONObject formatArrayOperator(List<ResSuperlowFullView> beans) {
		JSONObject object = new JSONObject();
		List<ResSuperlowFullView> complete = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> processing = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> plan = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> planning = new ArrayList<ResSuperlowFullView>();
		String nowDate = DateUtils.dataFormatYM(new Date());
		long now = DateUtils.dataFormatYm(nowDate);
		for (ResSuperlowFullView bean : beans) {
			long rTime = DateUtils.dataFormatYm(bean.getRectificationDate());
			long pTime = DateUtils.dataFormatYm(bean.getProductionDate());
			// 当前处于已经完成的状态
			if (now >= pTime) {
				complete.add(bean);
			}
			// 当前处于整改中的状态
			else if (now < pTime && now >= rTime) {
				processing.add(bean);
			}
			// 当前处于计划中的状态
			else if (now < rTime && bean.getFlag() != 2) {
				plan.add(bean);
			}
			// 当前处于规划状态
			else {
				planning.add(bean);
			}
		}
		object.put(ResConst.complete, complete);
		object.put(ResConst.processing, processing);
		object.put(ResConst.plan, plan);
		object.put(ResConst.planning, planning);
		return object;
	}

	/**
	 * 格式化 需要操作的机组信息
	 * 
	 * @param change
	 * @param close
	 * @param news
	 * @return
	 */
	public static Map formatSuperlowFullViewOPerator(JSONArray change, JSONArray close, JSONArray news, String cityInfo) {
		Map<String, List<ResSuperlowFullView>> map = new HashMap<String, List<ResSuperlowFullView>>();
		List<ResSuperlowFullView> changeArray = new ArrayList<ResSuperlowFullView>();
		ResSuperlowFullView bean = null;
		for (Object o : change) {
			bean = new ResSuperlowFullView();
			JSONObject oo = (JSONObject) o;
			bean.setId(oo.getIntValue("id"));
			bean.setPsCode(oo.getString("psCode"));
			bean.setPsName(oo.getString("psName"));
			bean.setCityId(oo.getString("cityId"));
			bean.setCityName(oo.getString("cityName"));
			bean.setUnit(oo.getString("unit"));
			bean.setInstalled(oo.getIntValue("installed"));
			bean.setRectificationDate(oo.getString("rectificationDate"));
			bean.setProductionDate(oo.getString("productionDate"));
			bean.setFlag(ResConst.FCHANGE);
			if (cityInfo == null || "-1".equals(cityInfo)) {
				changeArray.add(bean);
			} else {
				if (cityInfo.equals(bean.getCityId())) {
					changeArray.add(bean);
				}
			}
		}
		map.put("change", changeArray);
		List<ResSuperlowFullView> closeArray = new ArrayList<ResSuperlowFullView>();
		for (Object o : close) {
			bean = new ResSuperlowFullView();
			JSONObject oo = (JSONObject) o;
			bean.setId(oo.getIntValue("id"));
			bean.setPsCode(oo.getString("psCode"));
			bean.setPsName(oo.getString("psName"));
			bean.setCityId(oo.getString("cityId"));
			bean.setCityName(oo.getString("cityName"));
			bean.setUnit(oo.getString("unit"));
			bean.setInstalled(oo.getIntValue("installed"));
			bean.setRectificationDate(oo.getString("rectificationDate"));
			bean.setProductionDate(oo.getString("productionDate"));
			bean.setFlag(ResConst.FCLOSE);
			if (cityInfo == null || "-1".equals(cityInfo)) {
				closeArray.add(bean);
			} else {
				if (cityInfo.equals(bean.getCityId())) {
					closeArray.add(bean);
				}
			}
		}

		map.put("close", closeArray);
		List<ResSuperlowFullView> newsArray = new ArrayList<ResSuperlowFullView>();
		for (Object o : news) {
			bean = new ResSuperlowFullView();
			JSONObject oo = (JSONObject) o;
			bean.setId(oo.getIntValue("id"));
			bean.setPsCode(oo.getString("psCode"));
			bean.setPsName(oo.getString("psName"));
			bean.setCityId(oo.getString("cityId"));
			bean.setCityName(oo.getString("cityName"));
			bean.setUnit(oo.getString("unit"));
			bean.setInstalled(oo.getIntValue("installed"));
			bean.setRectificationDate(oo.getString("rectificationDate"));
			bean.setProductionDate(oo.getString("productionDate"));
			bean.setFlag(ResConst.FNEW);
			if (cityInfo == null || "-1".equals(cityInfo)) {
				newsArray.add(bean);
			} else {
				if (cityInfo.equals(bean.getCityId())) {
					newsArray.add(bean);
				}
			}
		}
		map.put("news", newsArray);
		return map;
	}

	/**
	 * 格式化 需要操作的机组信息
	 * 
	 * @param change
	 * @param close
	 * @param news
	 * @return
	 */
	public static List<ResSuperlowFullView> formatSuperlowFullViewSave(JSONArray change, JSONArray close, JSONArray news) {
		List<ResSuperlowFullView> list = new ArrayList<ResSuperlowFullView>();
		ResSuperlowFullView bean = null;
		for (Object o : change) {
			bean = new ResSuperlowFullView();
			JSONObject oo = (JSONObject) o;
			bean.setPsCode(oo.getString("psCode"));
			bean.setPsName(oo.getString("psName"));
			bean.setCityId(oo.getString("cityId"));
			bean.setCityName(oo.getString("cityName"));
			bean.setUnit(oo.getString("unit"));
			bean.setInstalled(oo.getIntValue("installed"));
			bean.setRectificationDate(oo.getString("rectificationDate"));
			bean.setProductionDate(oo.getString("productionDate"));
			bean.setFlag(ResConst.FCHANGE);
			list.add(bean);
		}
		for (Object o : close) {
			bean = new ResSuperlowFullView();
			JSONObject oo = (JSONObject) o;
			bean.setPsCode(oo.getString("psCode"));
			bean.setPsName(oo.getString("psName"));
			bean.setCityId(oo.getString("cityId"));
			bean.setCityName(oo.getString("cityName"));
			bean.setUnit(oo.getString("unit"));
			bean.setInstalled(oo.getIntValue("installed"));
			bean.setRectificationDate(oo.getString("rectificationDate"));
			bean.setProductionDate(oo.getString("productionDate"));
			bean.setFlag(ResConst.FCLOSE);
			list.add(bean);
		}

		for (Object o : news) {
			bean = new ResSuperlowFullView();
			JSONObject oo = (JSONObject) o;
			bean.setPsCode(oo.getString("psCode"));
			bean.setPsName(oo.getString("psName"));
			bean.setCityId(oo.getString("cityId"));
			bean.setCityName(oo.getString("cityName"));
			bean.setUnit(oo.getString("unit"));
			bean.setInstalled(oo.getIntValue("installed"));
			bean.setRectificationDate(oo.getString("rectificationDate"));
			bean.setProductionDate(oo.getString("productionDate"));
			bean.setFlag(ResConst.FNEW);
			list.add(bean);
		}
		return list;
	}

	/**
	 * 格式化 预览明细信息
	 * 
	 * @param beans
	 * @param operatorBeans
	 * @return
	 */
	public static JSONObject previewSuperlowFullViewDetail(List<ResSuperlowFullView> beans, Map operatorBeans, String pollCode) {
		JSONObject object = null;
		/**
		 * 将list转为可以方便读取的 map
		 */
		Map<String, ResSuperlowFullView> beansMap = ResSuperlowFullViewUtils.formatSuperlowFullViewDatail(beans);
		/**
		 * 每年的操作机组信息
		 */
		Map<String, List<ResSuperlowFullView>> beansYearMap = ResSuperlowFullViewUtils.formatSuperlowFullViewDatail(operatorBeans);
		object = ResSuperlowFullViewUtils.previewSuperlowFullViewInfo(beansMap, beansYearMap, pollCode);
		return object;
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
					String key = ResSuperlowFullViewUtils.getLastKey(beansMap, bean, year + "", month);
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
						String key = ResSuperlowFullViewUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						/**
						 * 如果不是关停
						 */
						if (bean.getFlag() != 1) {
							concenTemp = ResSuperlowFullViewUtils.getPollConcentration(pollCode);
							concentrationAvg += concenTemp;
						}
						/**
						 * 如果是新建
						 */
						if (bean.getFlag() == 2 && oo == null) {
							emissionTemp = ResSuperlowFullViewUtils.getPollSuperLow(bean.getInstalled(), pollCode);
							emissions += emissionTemp;
						}
						// 当前是否有值
						if (oo != null) {
							emissionTemp = ResSuperlowFullViewUtils.getPollEmission(oo, concenTemp);
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
						String key = ResSuperlowFullViewUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						// 当前是否有值
						if (oo != null) {
							emissions += oo.getCumEmission();
							concenTemp = oo.getAvgConcent();
							concentrationAvg += concenTemp;
							emissionTemp = ResSuperlowFullViewUtils.getPollEmission(oo, concenTemp);
						}
						emissionSum += emissionTemp;
						concentration[month - 1] = concenTemp + "";
						emission[month - 1] = emissionTemp + "";
					}
					/**
					 * 整改期间浓度为 0 ，排放量为 0
					 */
					for (int month = rMonth; month < pMonth; month++) {
						String key = ResSuperlowFullViewUtils.getLastKey(beansMap, bean, year + "", month);
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
						String key = ResSuperlowFullViewUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						/**
						 * 如果不是关停
						 */
						if (bean.getFlag() != 1) {
							concenTemp = ResSuperlowFullViewUtils.getPollConcentration(pollCode);
							concentrationAvg += concenTemp;
						}
						/**
						 * 如果是新建
						 */
						if (bean.getFlag() == 2 && oo == null) {
							emissionTemp = ResSuperlowFullViewUtils.getPollSuperLow(bean.getInstalled(), pollCode);
							emissions += emissionTemp;
						}
						// 当前是否有值
						if (oo != null) {
							emissionTemp = ResSuperlowFullViewUtils.getPollEmission(oo, concenTemp);
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
						String key = ResSuperlowFullViewUtils.getLastKey(beansMap, bean, year + "", month);
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
						String key = ResSuperlowFullViewUtils.getLastKey(beansMap, bean, year + "", month);
						ResSuperlowFullView oo = beansMap.get(key);
						float concenTemp = 0;
						float emissionTemp = 0;
						/**
						 * 如果不是关停
						 */
						if (bean.getFlag() != 1) {
							concenTemp = ResSuperlowFullViewUtils.getPollConcentration(pollCode);
							concentrationAvg += concenTemp;
						}
						/**
						 * 如果是新建
						 */
						if (bean.getFlag() == 2 && oo == null) {
							emissionTemp = ResSuperlowFullViewUtils.getPollSuperLow(bean.getInstalled(), pollCode);
							emissions += emissionTemp;
						}
						// 当前是否有值
						if (oo != null) {
							emissionTemp = ResSuperlowFullViewUtils.getPollEmission(oo, concenTemp);
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
			return ResSuperlowFullViewUtils.getLastKey(beansMap, bean, y, month);
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
	 * 预览图形展示的信息
	 * 
	 * @param oo
	 * @return
	 */
	public static JSONObject previewSuperlowFullView(List<ResSuperlowFullView> beans, Map<String, List<ResSuperlowFullView>> operatorBeans, String pollCode,
			String cityInfo) {
		JSONObject object = new JSONObject();
		Map<String, ResSuperlowFullView> beansMap = ResSuperlowFullViewUtils.formatSuperlowFullViewDatail(beans);
		/**
		 * 每年的操作机组信息
		 */
		Map<String, List<ResSuperlowFullView>> beansYearMap = ResSuperlowFullViewUtils.formatSuperlowFullViewDatail(operatorBeans);
		/**
		 * 基础信息
		 */
		Map<String, ResSuperlowFullView> currentYearEmissions = ResSuperlowFullViewUtils.getCurrentYearEmissions(beansMap, beans, beansYearMap);
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
			float[] values = ResSuperlowFullViewUtils.getGivenYearEmissions(beansMap, beans, operatorBeans, year + "");
			int index = year - ResConst.SUPERBEGINYEAR;
			emissionsYear[index] = values[0];
			reductionsYear[index] = values[1];
			installedYear[index] = values[2];
		}

		JSONObject oo = ResSuperlowFullViewUtils.previewSuperlowFullViewInfo(beansMap, beansYearMap, pollCode);

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
					String key = ResSuperlowFullViewUtils.getLastKey(beansMap, bean, nowYear + "", month);
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
	 * 预览图形展示的信息
	 * 
	 * @param oo
	 * @return
	 */
	public static JSONObject exportSuperlowFullView(ResSuperlowFullView beanInfo, List<ResSuperlowFullView> beans,
			Map<String, List<ResSuperlowFullView>> operatorBeans) {

		Map<String, ResSuperlowFullView> beansMap = ResSuperlowFullViewUtils.formatSuperlowFullViewDatail(beans);
		/**
		 * 每年的操作机组信息
		 */
		Map<String, List<ResSuperlowFullView>> beansYearMap = ResSuperlowFullViewUtils.formatSuperlowFullViewDatail(operatorBeans);
		/**
		 * 基础信息
		 */
		Map<String, ResSuperlowFullView> currentYearEmissions = ResSuperlowFullViewUtils.getCurrentYearEmissions(beansMap, beans, beansYearMap);

		JSONObject powerUnitInfo = ResSuperlowFullViewUtils.formatExportPowerUnitInfo(operatorBeans);

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
			installed += bean.getInstalled();
		}
		String nowDate = DateUtils.dataFormatYM(new Date());
		int nowYear = Integer.parseInt(nowDate.split("-")[0]);

		for (int year = ResConst.SUPERBEGINYEAR; year < nowYear; year++) {
			float[] values = ResSuperlowFullViewUtils.getGivenYearEmissions(beansMap, beans, operatorBeans, year + "");
			int index = year - ResConst.SUPERBEGINYEAR;
			emissionsYear[index] = values[0];
			reductionsYear[index] = values[1];
			installedYear[index] = values[2];
		}

		JSONObject oo = ResSuperlowFullViewUtils.previewSuperlowFullViewInfo(beansMap, beansYearMap, beanInfo.getPolluteCode());
		for (int year = nowYear; year <= ResConst.SUPERENDYEAR; year++) {
			List<ResSuperlowFullView> yearBeans = (List<ResSuperlowFullView>) oo.get(year + "");
			if (yearBeans == null || yearBeans.size() < 1) {
				continue;
			}
			int index = year - ResConst.SUPERBEGINYEAR;
			float emissionsTemp = 0;
			float reductionsTemp = 0;
			float installedTemp = 0;
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
		JSONObject object = ResSuperlowFullViewUtils.operatorExportSuperlowFullView(emissionsYear, reductionsYear, installedYear, oo, beanInfo, powerUnitInfo);
		return object;
	}

	/**
	 * 导出文件到指定路径
	 * 
	 * @param emissionsYear
	 * @param reductionsYear
	 * @param installedYear
	 * @param oo
	 * @param beanInfo
	 * @return
	 */
	public static JSONObject operatorExportSuperlowFullView(float[] emissionsYear, float[] reductionsYear, float[] installedYear, JSONObject oo,
			ResSuperlowFullView beanInfo, JSONObject powerUnitInfo) {
		JSONObject object = new JSONObject();

		String fileNamep = ResConst.filePath + "/" + "reportP.pdf";
		String filePathp = beanInfo.getPath() + "/" + ResConst.exportPath + "/" + fileNamep;
		String fileNames = ResConst.filePath + "/" + "reportS.pdf";
		String filePaths = beanInfo.getPath() + "/" + ResConst.exportPath + "/" + fileNames;

		String fileName = ResConst.filePath + "/" + "report.pdf";
		String filePath = beanInfo.getPath() + "/" + ResConst.exportPath + "/" + fileName;
		try {
			BaseFont baseFont = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
			Font font = new Font(baseFont, 12, Font.NORMAL);
			Font fontTable = new Font(baseFont, 10, Font.NORMAL);
			ResSuperlowFullViewUtils.getProgramPrimaryTable(emissionsYear, reductionsYear, installedYear, oo, beanInfo, powerUnitInfo, filePathp);
			ResSuperlowFullViewUtils.getProgramSchedule(oo, font, fontTable, filePaths, beanInfo);
		} catch (DocumentException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		String[] files = new String[] { filePathp, filePaths };
		FileUtils.mergePdfFiles(files, filePath);
		object.put("url", fileName);
		return object;
	}

	/**
	 * 生成 电厂 机组操作信息table
	 * 
	 * @param beans
	 * @param font
	 * @return
	 * @throws DocumentException
	 */
	public static void getProgramPrimaryTable(float[] emissionsYear, float[] reductionsYear, float[] installedYear, JSONObject oo,
			ResSuperlowFullView beanInfo, JSONObject powerUnitInfo, String filePath) throws DocumentException {
		String nowDate = DateUtils.dataFormatYMD(new Date());
		// step 1
		Document document = new Document(PageSize.A4);
		// step 2
		try {
			PdfWriter.getInstance(document, new FileOutputStream(filePath));
			document.addTitle(beanInfo.getProgramName());
			document.addAuthor(beanInfo.getProgramUser());
			document.addSubject(beanInfo.getProgramName());
			document.addKeywords(beanInfo.getProgramDesc());
			// step 3
			document.open();
			// step 4
			BaseFont baseFont = BaseFont.createFont("STSong-Light", "UniGB-UCS2-H", BaseFont.NOT_EMBEDDED);
			Font font = new Font(baseFont, 24, Font.NORMAL);
			Font fontTable = new Font(baseFont, 10, Font.NORMAL);
			Paragraph paraGraph = new Paragraph("\n\n" + ResConst.titleContent, font);
			paraGraph.setAlignment(1);
			document.add(paraGraph);
			font = new Font(baseFont, 16, Font.NORMAL);
			paraGraph = new Paragraph("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n" + nowDate, font);
			paraGraph.setAlignment(1);
			document.add(paraGraph);
			document.newPage();
			font = new Font(baseFont, 12, Font.NORMAL);
			paraGraph = new Paragraph(ResConst.firstTtile, font);
			document.add(paraGraph);
			paraGraph = new Paragraph(ResConst.firstContentOne, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			paraGraph = new Paragraph(ResConst.firstContentTwo, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			paraGraph = new Paragraph(ResConst.firstContentThree + beanInfo.getProgramUser(), font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			paraGraph = new Paragraph(ResConst.firstContentFour + nowDate, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			paraGraph = new Paragraph(ResConst.firstContentFive + beanInfo.getProgramDesc(), font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);

			paraGraph = new Paragraph(ResConst.secondTitle, font);
			document.add(paraGraph);
			List<ResSuperlowFullView> complete = (List<ResSuperlowFullView>) powerUnitInfo.get(ResConst.complete);

			int installedNumber = 0;
			int unitNumber = 0;

			String content = ResConst.secondContentTwo;

			if (complete != null && complete.size() > 0) {
				unitNumber = complete.size();
				for (ResSuperlowFullView ooo : complete) {
					installedNumber += ooo.getInstalled();
				}
			}
			content = content.replace("nowTime", nowDate);
			content = content.replace("unitNumber", unitNumber + "");
			content = content.replace("installedNumber", installedNumber + "");
			paraGraph = new Paragraph(ResConst.secondContentOne, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			paraGraph = new Paragraph(content, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);

			PdfPTable completeTable = ResSuperlowFullViewUtils.getPowerUnitTableInfo(complete, fontTable);
			document.add(completeTable);
			List<ResSuperlowFullView> processing = (List<ResSuperlowFullView>) powerUnitInfo.get(ResConst.processing);
			installedNumber = 0;
			unitNumber = 0;
			content = ResConst.secondContentFour;
			if (processing != null && processing.size() > 0) {
				unitNumber = processing.size();
				for (ResSuperlowFullView ooo : processing) {
					installedNumber += ooo.getInstalled();
				}
			}
			content = content.replace("nowTime", nowDate);
			content = content.replace("unitNumber", unitNumber + "");
			content = content.replace("installedNumber", installedNumber + "");
			paraGraph = new Paragraph(ResConst.secondContentThree, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			paraGraph = new Paragraph(content, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			PdfPTable processingTable = ResSuperlowFullViewUtils.getPowerUnitTableInfo(processing, fontTable);
			document.add(processingTable);

			List<ResSuperlowFullView> plan = (List<ResSuperlowFullView>) powerUnitInfo.get(ResConst.plan);
			installedNumber = 0;

			unitNumber = 0;
			content = ResConst.secondContentSix;
			if (plan != null && plan.size() > 0) {
				unitNumber = plan.size();
				for (ResSuperlowFullView ooo : plan) {
					installedNumber += ooo.getInstalled();
				}
			}
			content = content.replace("nowTime", nowDate);
			content = content.replace("unitNumber", unitNumber + "");
			content = content.replace("installedNumber", installedNumber + "");
			paraGraph = new Paragraph(ResConst.secondContentFive, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			paraGraph = new Paragraph(content, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			PdfPTable plannTable = ResSuperlowFullViewUtils.getPowerUnitTableInfo(plan, fontTable);
			document.add(plannTable);
			List<ResSuperlowFullView> planning = (List<ResSuperlowFullView>) powerUnitInfo.get(ResConst.planning);
			installedNumber = 0;
			unitNumber = 0;
			content = ResConst.secondContentEight;
			if (planning != null && planning.size() > 0) {
				unitNumber = planning.size();
				for (ResSuperlowFullView ooo : planning) {
					installedNumber += ooo.getInstalled();
				}
			}
			content = content.replace("nowTime", nowDate);
			content = content.replace("unitNumber", unitNumber + "");
			content = content.replace("installedNumber", installedNumber + "");
			paraGraph = new Paragraph(ResConst.secondContentSeven, font);
			paraGraph.setFirstLineIndent(ResConst.tableSpace);
			document.add(paraGraph);
			paraGraph = new Paragraph(content, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			PdfPTable planningTable = ResSuperlowFullViewUtils.getPowerUnitTableInfo(planning, fontTable);
			document.add(planningTable);

			paraGraph = new Paragraph(ResConst.thridTitle, font);
			document.add(paraGraph);
			paraGraph = new Paragraph(ResConst.thridContentOne, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
			PdfPTable staisticsTable = ResSuperlowFullViewUtils.getStatisticsTableInfo(emissionsYear, reductionsYear, installedYear, font);
			document.add(staisticsTable);
			paraGraph = new Paragraph(ResConst.fourthTitle, font);
			document.add(paraGraph);
			paraGraph = new Paragraph(ResConst.fourthContentOne, font);
			paraGraph.setFirstLineIndent(ResConst.tabSpace);
			document.add(paraGraph);
		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		} finally {
			// step 5
			document.close();
		}
	}

	/**
	 * 生成 电厂 机组操作信息table
	 * 
	 * @param beans
	 * @param font
	 * @return
	 * @throws DocumentException
	 */
	public static void getProgramSchedule(JSONObject oo, Font font, Font fontTable, String fileName, ResSuperlowFullView beanInfo) throws DocumentException {
		// step 1
		Document document = new Document(PageSize.A4.rotate());
		String nowDate = DateUtils.dataFormatYMD(new Date());
		// step 2
		try {
			PdfWriter writer = PdfWriter.getInstance(document, new FileOutputStream(fileName));
			document.open();
			// 表头
			Paragraph paraGraph = new Paragraph(ResConst.appendixContent, font);
			document.add(paraGraph);
			paraGraph = new Paragraph(ResConst.scheduleTitle, font);
			paraGraph.setAlignment(1);
			document.add(paraGraph);
			PdfPTable table = null;
			String pollName = beanInfo.getPolluteName().trim();
			for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
				paraGraph = new Paragraph(ResConst.scheduleYear + year + "年                                  " + ResConst.schedulePoll + pollName
						+ "                             " + ResConst.scheduleDate + nowDate, font);
				paraGraph.setFirstLineIndent(ResConst.tabSpace);
				document.add(paraGraph);
				List<ResSuperlowFullView> ooo = (List<ResSuperlowFullView>) oo.get(year + "");
				table = ResSuperlowFullViewUtils.getPowerInfoDetailTableInfo(ooo, fontTable);
				document.add(table);
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (DocumentException e) {
			e.printStackTrace();
		} finally {
			// step 5
			document.close();
		}
	}

	/**
	 * ho 格式化 电厂机组信息
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatExportPowerUnitInfo(Map<String, List<ResSuperlowFullView>> beansMap) {
		JSONObject object = new JSONObject();
		List<ResSuperlowFullView> complete = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> processing = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> plan = new ArrayList<ResSuperlowFullView>();
		List<ResSuperlowFullView> planning = new ArrayList<ResSuperlowFullView>();
		String nowDate = DateUtils.dataFormatYM(new Date());
		long now = DateUtils.dataFormatYm(nowDate);
		for (String key : beansMap.keySet()) {
			List<ResSuperlowFullView> beans = beansMap.get(key);
			if (beans == null || beans.size() < 1) {
				continue;
			}
			for (ResSuperlowFullView bean : beans) {
				long rTime = DateUtils.dataFormatYm(bean.getRectificationDate());
				long pTime = DateUtils.dataFormatYm(bean.getProductionDate());
				// 当前处于已经完成的状态
				if (now >= pTime) {
					complete.add(bean);
				}
				// 当前处于整改中的状态
				else if (now < pTime && now >= rTime) {
					processing.add(bean);
				}
				// 当前处于计划中的状态
				else if (now < rTime && bean.getFlag() != 2) {
					plan.add(bean);
				}
				// 当前处于规划状态
				else {
					planning.add(bean);
				}
			}
		}
		object.put(ResConst.complete, complete);
		object.put(ResConst.processing, processing);
		object.put(ResConst.plan, plan);
		object.put(ResConst.planning, planning);
		return object;
	}

	/**
	 * 生成 电厂 机组操作信息table
	 * 
	 * @param beans
	 * @param font
	 * @return
	 * @throws DocumentException
	 */
	public static PdfPTable getPowerUnitTableInfo(List<ResSuperlowFullView> beans, Font font) throws DocumentException {
		PdfPTable table = new PdfPTable(7);
		table.setWidthPercentage(288 / 3);
		table.setWidths(new int[] { 3, 3, 6, 3, 4, 4, 4 });
		table.setSpacingBefore(ResConst.tableSpace);
		table.setSpacingAfter(ResConst.tableSpace);
		PdfPCell cell = new PdfPCell();
		table = new PdfPTable(7);
		table.setWidthPercentage(288 / 3);
		table.setSpacingBefore(ResConst.tableSpace);
		table.setSpacingAfter(ResConst.tableSpace);
		cell = new PdfPCell();
		cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
		cell.setPhrase(new Phrase("盟市", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("集团", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("企业名称", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("机组", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("装机容量(MW)", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("改造开始时间", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("改造结束时间", font));
		table.addCell(cell);
		for (ResSuperlowFullView ooo : beans) {
			cell.setPhrase(new Phrase(ooo.getCityName(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(ooo.getGroupName(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(ooo.getPsName(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(ooo.getUnit(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(ooo.getInstalled() + "", font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(ooo.getRectificationDate(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(ooo.getProductionDate(), font));
			table.addCell(cell);
		}
		return table;
	}

	/**
	 * 生成 电厂 机组操作信息table
	 * 
	 * @param beans
	 * @param font
	 * @return
	 * @throws DocumentException
	 */
	public static PdfPTable getStatisticsTableInfo(float[] emissionsYear, float[] reductionsYear, float[] installedYear, Font font) throws DocumentException {
		PdfPTable table = new PdfPTable(4);
		PdfPCell cell = new PdfPCell();
		table.setWidthPercentage(288 / 3);
		table.setSpacingBefore(ResConst.tableSpace);
		table.setSpacingAfter(ResConst.tableSpace);
		table = new PdfPTable(4);
		table.setWidthPercentage(288 / 3);
		table.setSpacingBefore(10f);
		table.setSpacingAfter(10f);
		cell = new PdfPCell();
		cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
		cell.setPhrase(new Phrase("年份", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("预测排放量(t)", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("预计消减量(t)", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("装机容量(MW)", font));
		table.addCell(cell);
		for (int year = ResConst.SUPERBEGINYEAR; year <= ResConst.SUPERENDYEAR; year++) {
			int index = year - ResConst.SUPERBEGINYEAR;
			cell.setPhrase(new Phrase(year + "", font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(emissionsYear[index] + "", font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(reductionsYear[index] + "", font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(installedYear[index] + "", font));
			table.addCell(cell);
		}
		return table;
	}

	/**
	 * 生成 电厂 机组操作信息table
	 * 
	 * @param beans
	 * @param font
	 * @return
	 * @throws DocumentException
	 */
	public static PdfPTable getPowerInfoDetailTableInfo(List<ResSuperlowFullView> beans, Font font) throws DocumentException {
		PdfPTable table = new PdfPTable(22);
		PdfPCell cell = null;
		table = new PdfPTable(22);
		table.setWidthPercentage(288 / 3);
		table.setSpacingBefore(10f);
		table.setSpacingAfter(10f);
		cell = new PdfPCell();
		cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
		cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
		cell.setPhrase(new Phrase("盟市", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("集团", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("企业名称", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("机组", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("装机容量(MW)", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("改造时间", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("完成时间", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("指标", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("1月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("2月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("3月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("4月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("5月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("6月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("7月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("8月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("9月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("10月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("11月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("12月", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("合计/平均", font));
		table.addCell(cell);
		cell.setPhrase(new Phrase("预计消减量", font));
		table.addCell(cell);
		if (beans == null || beans.size() < 1) {
			return table;
		}
		for (ResSuperlowFullView bean : beans) {
			cell = new PdfPCell();
			cell.setRowspan(2);
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase(bean.getCityName(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(bean.getGroupName(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(bean.getPsName(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(bean.getUnit(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(bean.getInstalled() + "", font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(bean.getRectificationDate(), font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(bean.getProductionDate(), font));
			table.addCell(cell);
			cell = new PdfPCell();
			cell.setHorizontalAlignment(Element.ALIGN_CENTER); // 水平居中
			cell.setVerticalAlignment(Element.ALIGN_MIDDLE); // 垂直居中
			cell.setPhrase(new Phrase(ResConst.emissionConcen, font));
			table.addCell(cell);
			String[] concen = bean.getAvgConcentMonth();
			for (String value : concen) {
				cell.setPhrase(new Phrase(value, font));
				table.addCell(cell);
			}
			cell.setPhrase(new Phrase("-", font));
			table.addCell(cell);
			cell.setPhrase(new Phrase(ResConst.emissionAmount, font));
			table.addCell(cell);
			String[] amount = bean.getEmissionMonth();
			for (String value : amount) {
				cell.setPhrase(new Phrase(value, font));
				table.addCell(cell);
			}
			cell.setPhrase(new Phrase(bean.getReductions() + "", font));
			table.addCell(cell);
		}

		return table;
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

}
