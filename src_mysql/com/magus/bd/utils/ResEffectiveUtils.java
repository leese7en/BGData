package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResEffective;

public class ResEffectiveUtils {
	/**
	 *格式化数据有效率
	 * 
	 * @param bean
	 * @return
	 */
	public static JSONObject formatEffectiveYear(List<ResEffective> beans) {
		JSONObject object = new JSONObject();
		Map<String, JSONArray> monthMap = formatMap(beans);
		List<String> xAxisData = new ArrayList<String>();
		for (ResEffective bean : beans) {
			if (bean.getCityName() == null || "".equals(bean.getCityName())) {
				continue;
			}
			if (xAxisData.contains(bean.getCityName())) {
				continue;
			}
			xAxisData.add(bean.getCityName());
		}
		JSONArray legend = new JSONArray();
		for (String name : monthMap.keySet()) {
			if (!"0".equals(name)) {
				legend.add(Integer.parseInt(name) + "月");
			}
			object.put("month" + name, monthMap.get(name));
		}
		/**
		 * 是否每年有12个数据
		 */
		for (String name : monthMap.keySet()) {
			if ("0".equals(name)) {
				legend.add("平均");
				break;
			}
		}
		object.put("xAxisData", xAxisData);
		object.put("legend", legend);
		return object;
	}

	/**
	 * 格式化 数据有效率数据
	 * 
	 * @param beans
	 * @return
	 */
	public static Map<String, JSONArray> formatMap(List<ResEffective> beans) {
		Map<String, JSONArray> monthMap = new LinkedHashMap<String, JSONArray>();
		for (ResEffective bean : beans) {
			if (bean.getCityName() == null || "".equals(bean.getCityName())) {
				continue;
			}
			JSONArray array = monthMap.get(bean.getMonth());
			if (array == null) {
				array = new JSONArray();
				monthMap.put(bean.getMonth(), array);
			}
			array.add(bean.getEffective());
		}
		return monthMap;
	}
}
