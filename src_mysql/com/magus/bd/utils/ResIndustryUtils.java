package com.magus.bd.utils;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.SysAnotation;

public class ResIndustryUtils {

	/**
	 * 格式化 指标数据
	 * 
	 * @param bean
	 * @return
	 */
	public static JSONObject formatIndustryInfo(List<ResIndustryCon> beans, String viewPoint, String pollType,
			List<ResIndustryCon> beans2) {
		JSONObject object = new JSONObject();
		List<String> xAxis = new ArrayList<String>();
		List<Integer> xAxisId = new ArrayList<Integer>();
		String[] legend = new String[3];
		legend[1] = "发电量(百万kwh)";
		JSONObject data = new JSONObject();
		List<Float> pollData = new ArrayList<Float>();
		List<Float> powerData = new ArrayList<Float>();
		List<Float> emissionData = new ArrayList<Float>();
		List<Map<String, Object>> markers = new ArrayList<Map<String, Object>>();
		// 如果是盟市信息
		if ("city".equals(viewPoint)) {
			for (ResIndustryCon bean : beans) {
				xAxis.add(bean.getCityName());
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
			for (ResIndustryCon bean : beans2) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("groupIdOrCityId", bean.getGroupIdOrCityId());
				map.put("xAxis", bean.getCityName());
				if ("SO2".equals(pollType)) {
					map.put("yAxis", bean.getSo2Amount() / 1000 / bean.getSo2GenCapacity());
				} else if ("NOx".equals(pollType)) {
					map.put("yAxis", bean.getNoxAmount() / 1000 / bean.getNoxGenCapacity());
				} else {
					map.put("yAxis", bean.getDustAmount() / 1000 / bean.getDustGenCapacity());
				}
				markers.add(map);
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
			for (ResIndustryCon bean : beans2) {
				Map<String, Object> map = new HashMap<String, Object>();
				map.put("groupIdOrCityId", bean.getGroupIdOrCityId());
				map.put("xAxis", bean.getGroupName());
				if ("SO2".equals(pollType)) {
					map.put("yAxis", bean.getSo2Amount() / 1000 / bean.getSo2GenCapacity());
				} else if ("NOx".equals(pollType)) {
					map.put("yAxis", bean.getNoxAmount() / 1000 / bean.getNoxGenCapacity());
				} else {
					map.put("yAxis", bean.getDustAmount() / 1000 / bean.getDustGenCapacity());
				}
				markers.add(map);
			}
		}

		// 构建返回的 json 对象
		data.put("pollData", pollData);
		data.put("powerData", powerData);
		data.put("emissionData", emissionData);
		data.put("markers", markers);
		object.put("data", data);
		object.put("xAxisId", xAxisId);
		object.put("xAxis", xAxis);
		object.put("legend", legend);
		return object;
	}

	/**
	 * 格式化 指标数据
	 * 
	 * @param bean
	 * @return
	 */
	public static JSONObject formatIndustrySulfurYear(List<ResIndustryCon> beans, int beginYear, int endYear,
			List<ResIndustryCon> beans2) {
		JSONObject object = new JSONObject();
		List<String> xAxis = new ArrayList<String>();

		xAxis.add("1月");
		xAxis.add("2月");
		xAxis.add("3月");
		xAxis.add("4月");
		xAxis.add("5月");
		xAxis.add("6月");
		xAxis.add("7月");
		xAxis.add("8月");
		xAxis.add("9月");
		xAxis.add("10月");
		xAxis.add("11月");
		xAxis.add("12月");
		Map<String, String[]> data = new HashMap<String, String[]>();
		List<String> legend = new ArrayList<String>();
		for (int i = beginYear; i <= endYear; i++) {
			data.put("year" + i, new String[] { "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-" });
			legend.add(i + "");
		}
		for (ResIndustryCon bean : beans) {
			String[] values = data.get("year" + bean.getYear());
			float value = 0.0f;
			if ((int) bean.getCoalAmount() == 0) {
				value = (float) 0.0;
			} else {
				value = bean.getSo2Produce() / 1000000 / bean.getCoalAmount() * 5 / 8;
				if (value > 0.04) {
					value = 0.04f;
				}
			}
			values[Integer.parseInt(bean.getMonth()) - 1] = (value * 100) + "";
			data.put("year" + bean.getYear(), values);
		}
		JSONArray dataArr = new JSONArray();
		// for (int i = beginYear; i <= endYear; i++) {
		// List<Map<String, Object>> markers = new ArrayList<Map<String,
		// Object>>();
		// JSONObject dataObj = new JSONObject();
		// // 按年来取
		// for (ResIndustryCon bean2 : beans2) {
		// JSONObject markObject = new JSONObject();
		// if ((i + "").trim().equals(bean2.getYear())) {// 判断该年份是否存在气泡，若存在
		// double value = 0.0f;
		// if ((int) bean2.getCoalAmount() == 0) {
		// value = (float) 0.0;
		// } else {
		// value = bean2.getSo2Produce() / 1000000 / bean2.getCoalAmount() * 5 /
		// 8;
		// BigDecimal b = new BigDecimal(value);
		// value = b.setScale(4, BigDecimal.ROUND_HALF_UP).doubleValue();
		// if (value > 0.04) {
		// value = 0.04f;
		// }
		// }
		// markObject.put("xAxis", bean2.getMonth().substring(1, 2) + "月");
		// markObject.put("yAxis", value * 100);
		// markObject.put("symbolSize", 66);
		// markers.add(markObject);
		// dataObj.put("data", markers);
		// dataObj.put("symbol", "pin");
		// }
		// }
		//
		// dataArr.add(dataObj);
		//
		// }

		// 构建返回的 json 对象
		object.put("xAxis", xAxis);
		object.put("data", data);
		object.put("markers", dataArr);
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
	public static JSONObject formatIndustrySulfurMonth(List<ResIndustryCon> beans, String viewPoint, int beginMonth,
			int endMonth) {
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
	public static List<ArrayList<Float>> formamtAllMonthValues(Map<String, List<ArrayList<Float>>> valuesGroups,
			int beginMonth, int endMonth) {
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
	 * 格式化 企业的排放信息
	 * 
	 * @param beans
	 * @return
	 */
	public static List<ResIndustryCon> formatIndurutyEnterprise(List<ResIndustryCon> beans) {

		for (ResIndustryCon bean : beans) {
			// 格式化 数据单位 工况采集过来的 数据 电量 单位 是 千kwh
			// 流量是千立方米
			// 浓度单位是 mg 每立方米
			if (bean.getSo2GenCapacity() == 0) {
				bean.setSo2Performance(0f);
			} else {
				bean.setSo2Performance(bean.getSo2Amount() / 1000 / bean.getSo2GenCapacity());
			}
			if (bean.getNoxGenCapacity() == 0) {
				bean.setNoxPerformance(0f);
			} else {
				bean.setNoxPerformance(bean.getNoxAmount() / 1000 / bean.getNoxGenCapacity());
			}
			if (bean.getDustGenCapacity() == 0) {
				bean.setDustPerformance(0f);
			} else {
				bean.setDustPerformance(bean.getDustAmount() / 1000 / bean.getDustGenCapacity());
			}
			float value = 0.0f;
			if ((int) bean.getCoalAmount() == 0) {
				value = (float) 0.0;
			} else {
				value = bean.getSo2Produce() / 1000000 / bean.getCoalAmount() * 5 / 8;
			}
			bean.setSulfur(value * 100);
			bean.setGenCapacity(bean.getGenCapacity() / 1000);
			bean.setSo2Amount(bean.getSo2Amount() / 1000000);
			bean.setNoxAmount(bean.getNoxAmount() / 1000000);
			bean.setDustAmount(bean.getDustAmount() / 1000000);
		}
		return beans;
	}
}
