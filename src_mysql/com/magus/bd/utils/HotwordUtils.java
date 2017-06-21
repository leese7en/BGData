package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResHotword;

public class HotwordUtils {

	/**
	 * 格式化 热词出现的频次和 出现的时间信息
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatHotwordFreQuency(List<ResHotword> yearBeans, List<ResHotword> monthBeans) {
		JSONObject object = new JSONObject();
		List<String> xAxis = new ArrayList<String>();
		List<String> yAxis = new ArrayList<String>();
		Map<String, Integer> valueIndex = new HashMap<String, Integer>();
		int length = yearBeans.size();
		for (int i = length - 1; i > -1; i--) {
			ResHotword bean = yearBeans.get(i);
			yAxis.add(bean.getName());
			valueIndex.put(bean.getName(), length - i - 1);
		}
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
		List<Integer[]> values = new ArrayList<Integer[]>();
		Integer[] value = null;
		for (ResHotword bean : monthBeans) {
			value = new Integer[3];
			value[0] = Integer.parseInt(bean.getDate()) - 1;
			value[1] = valueIndex.get(bean.getName());
			value[2] = bean.getTimes();
			values.add(value);
		}
		object.put("xAxis", xAxis);
		object.put("yAxis", yAxis);
		object.put("data", values);
		return object;
	}

	/**
	 * 统计字符云信息
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatHotwordCloud(List<ResHotword> beans) {
		JSONObject object = new JSONObject();
		List series = new ArrayList();
		Map value = null;
		for (ResHotword bean : beans) {
			value = new HashMap();
			value.put("name", bean.getName());
			value.put("value", bean.getTimes());
			value.put("id", bean.getId());
			value.put("typeId", bean.getTypeId());
			series.add(value);
		}
		object.put("series", series);
		return object;
	}

	/**
	 * 统计每类问题出现的次数
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatHotwordByType(List<ResHotword> beansParent, List<ResHotword> beansChild) {
		JSONObject object = new JSONObject();
		JSONObject objectParent = new JSONObject();
		List series = new ArrayList();
		List legend = new ArrayList();
		Map value = null;
		for (ResHotword bean : beansParent) {
			value = new HashMap();
			value.put("name", bean.getName());
			value.put("value", bean.getTimes());
			value.put("id", bean.getId());
			// 主类
			value.put("flag", 0);
			legend.add(bean.getName());
			series.add(value);
		}
		objectParent.put("series", series);
		objectParent.put("legend", legend);
		object.put("parent", objectParent);
		if (beansChild != null && beansChild.size() > 0) {
			JSONObject objectChild = new JSONObject();
			List seriesChild = new ArrayList();
			List legendChild = new ArrayList();
			value = null;
			for (ResHotword bean : beansChild) {
				value = new HashMap();
				value.put("name", bean.getName());
				value.put("value", bean.getTimes());
				value.put("id", bean.getId());
				// 明细
				value.put("flag", 1);
				legendChild.add(bean.getName());
				seriesChild.add(value);
			}
			objectChild.put("series", seriesChild);
			objectChild.put("legend", legendChild);
			object.put("child", objectChild);
		}
		return object;
	}

	/**
	 * 统计每类问题出现的次数
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatHotwordCityInfoByType(List<ResHotword> beansDetail,List<ResHotword> beans, List<ResHotword> beansPs) {
		JSONObject object = new JSONObject();
		JSONObject objectCity = new JSONObject();
		List series = new ArrayList();
		List legend = new ArrayList();
		Map value = null;
		for (ResHotword bean : beans) {
			value = new HashMap();
			value.put("name", bean.getCityName());
			value.put("value", bean.getTimes());
			value.put("id", bean.getCityId());
			legend.add(bean.getCityName());
			series.add(value);
		}
		objectCity.put("series", series);
		objectCity.put("legend", legend);
		object.put("city", objectCity);
		JSONObject objectPScode = new JSONObject();
		series = new ArrayList();
		legend = new ArrayList();
		value = null;
		for (ResHotword bean : beansPs) {
			value = new HashMap();
			value.put("name", bean.getPsName());
			value.put("value", bean.getTimes());
			value.put("id", bean.getPsCode());
			series.add(value);
		}
		objectPScode.put("series", series);
		objectPScode.put("legend", legend);
		objectPScode.put("cityName", beans.get(0).getCityName());
		object.put("enterprise", objectPScode);
		
		if (beansDetail != null && beansDetail.size() > 0) {
			JSONObject objectDetail = new JSONObject();
			List seriesChild = new ArrayList();
			List legendChild = new ArrayList();
			value = null;
			for (ResHotword bean : beansDetail) {
				value = new HashMap();
				value.put("name", bean.getName());
				value.put("value", bean.getTimes());
				value.put("id", bean.getId());
				// 明细
				value.put("flag", 1);
				legendChild.add(bean.getName());
				seriesChild.add(value);
			}
			objectDetail.put("series", seriesChild);
			objectDetail.put("legend", legendChild);
			object.put("detail", objectDetail);
		}
		return object;
	}

	/**
	 * 格式化 盟市下面企业信息
	 * 
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatHotwordPSCodeInfoByTypeDetail(List<ResHotword> beans) {
		JSONObject object = new JSONObject();
		List series = new ArrayList();
		List legend = new ArrayList();
		Map value = null;
		for (ResHotword bean : beans) {
			value = new HashMap();
			value.put("name", bean.getPsName());
			value.put("value", bean.getTimes());
			value.put("id", bean.getPsCode());
			series.add(value);
		}
		object.put("series", series);
		return object;
	}

	/**
	 * 统计每类问题出现的次数
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatHotwordCityInfoByTypeDetail(List<ResHotword> beans, List<ResHotword> beansDetail) {
		JSONObject object = new JSONObject();
		JSONObject objectCity = new JSONObject();
		List series = new ArrayList();
		List legend = new ArrayList();
		Map value = null;
		for (ResHotword bean : beans) {
			value = new HashMap();
			value.put("name", bean.getCityName());
			value.put("value", bean.getTimes());
			value.put("id", bean.getCityId());
			legend.add(bean.getCityName());
			series.add(value);
		}
		objectCity.put("series", series);
		objectCity.put("legend", legend);
		object.put("city", objectCity);
		if (beansDetail != null && beansDetail.size() > 0) {
			JSONObject objectDetail = new JSONObject();
			List seriesChild = new ArrayList();
			List legendChild = new ArrayList();
			value = null;
			for (ResHotword bean : beansDetail) {
				value = new HashMap();
				value.put("name", bean.getName());
				value.put("value", bean.getTimes());
				value.put("id", bean.getPsCode());
				// 明细
				value.put("flag", 1);
				legendChild.add(bean.getName());
				seriesChild.add(value);
			}
			objectDetail.put("series", seriesChild);
			objectDetail.put("legend", legendChild);
			object.put("detail", objectDetail);
		}
		return object;
	}
}
