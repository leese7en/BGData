package com.magus.bd.utils;

import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResQuotaParameter;

public class ResQuotaParameterUtils {

	/**
	 * 格式化 指标数据
	 * 
	 * @param bean
	 * @return
	 */
	public static JSONObject formatQuotaParameter(List<ResQuotaParameter> beans) {
		JSONObject object = new JSONObject();
		JSONObject radarObject = new JSONObject();
		JSONObject chartValue = null;
		// 饼状图 图列 处理

		// 雷达图 处理
		JSONArray radarPolar = new JSONArray();
		JSONArray radarSeries = new JSONArray();

		float max = ResQuotaParameterUtils.formatQuotaMax(beans);
		JSONArray tempArray = new JSONArray();
		for (ResQuotaParameter bean : beans) {
			chartValue = new JSONObject();
			chartValue.put("max", max);
			chartValue.put("text", bean.getName());
			radarPolar.add(chartValue);
			tempArray.add(bean.getParameter());
		}

		chartValue = new JSONObject();
		radarObject.put("indicator", radarPolar);
		JSONObject tempObject = new JSONObject();
		tempObject.put("value", tempArray);
		tempObject.put("name", "指标权重分析");
		radarSeries.add(tempObject);
		radarObject.put("series", radarSeries);
		object.put("radar", radarObject);
		return object;
	}

	/**
	 * 获取权重最大值
	 * 
	 * @param bean
	 * @return
	 */
	public static float formatQuotaMax(List<ResQuotaParameter> beans) {
		float max = 0;
		for (ResQuotaParameter bean : beans) {
			if (max < bean.getParameter()) {
				max = bean.getParameter();
			}
		}
		return max + 0.1f;
	}
}
