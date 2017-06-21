package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResYearInfo;

public class ResYearUtils {

	/**
	 * 格式化 盟市 装机容量 、 发电量
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatResYearInfo(List<ResYearInfo> beans) {
		JSONObject object = new JSONObject();
		JSONArray installedArray = null;
		JSONArray powerArray = null;
		JSONObject installdObject = new JSONObject();
		JSONObject powerObject = new JSONObject();
		for (ResYearInfo bean : beans) {
			installedArray = new JSONArray();
			powerArray = new JSONArray();
			installedArray.add(bean.getFireInstalled());
			installedArray.add(bean.getWindInstalled());
			installedArray.add(bean.getOtherInstalled());
			powerArray.add(bean.getFirePower());
			powerArray.add(bean.getWindPower());
			powerArray.add(bean.getOtherPower());
			installdObject.put(bean.getYear(), installedArray);
			powerObject.put(bean.getYear(), powerArray);
		}
		object.put("installed", installdObject);
		object.put("power", powerObject);
		return object;
	}
	/**
	 * 格式化 盟市 装机容量 、 发电量
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatResPowerCountByYear(List<ResYearInfo> beans) {
		JSONObject object = new JSONObject();
		for (ResYearInfo bean : beans) {
			object.put(bean.getYear(),bean.getPowerCount());
		}
		return object;
	}

	/**
	 * 格式化 盟市 装机容量 、 发电量
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatPowerPoint(List<ResYearInfo> beans) {
		JSONObject object = new JSONObject();
		Map<String, JSONObject> geoCoord = new HashMap<String, JSONObject>();
		Map<String, List> data = new HashMap<String, List>();
		JSONObject ooData = null;
		JSONObject oData = null;
		JSONArray array = null;
		JSONObject geoCoordData = null;
		List dataInfo = null;
		int length = beans.size();
		for (int i = 0; i < length; i++) {
			ResYearInfo bean = beans.get(i);
			geoCoordData = geoCoord.get(bean.getYear());
			if (geoCoordData == null) {
				geoCoordData = new JSONObject();
			}

			// 地理位置坐标信息
			array = new JSONArray();
			array.add(bean.getLongitude());
			array.add(bean.getLatitude());
			geoCoordData.put(bean.getPsName(), array);
			geoCoord.put(bean.getYear(), geoCoordData);

			dataInfo = data.get(bean.getYear());
			if (dataInfo == null) {
				dataInfo = new ArrayList();
			}

			// 图例信息
			oData = new JSONObject();
			oData.put("name", bean.getPsName());
			oData.put("value", i + 1);
			oData.put("installedAmount", bean.getInstalledAmount());
			oData.put("industryTypeName", bean.getIndustryTypeName());
			oData.put("powerAmount", bean.getPowerAmount());
			dataInfo.add(oData);
			data.put(bean.getYear(), dataInfo);
		}
		object.put("enterprise", data);
		object.put("geoCoord", geoCoord);
		return object;
	}

	/**
	 * 格式化 盟市 装机容量 、 发电量
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatCoalPoint(List<ResYearInfo> beans) {
		JSONObject object = new JSONObject();
		Map<String, JSONObject> geoCoord = new HashMap<String, JSONObject>();
		Map<String, List> data = new HashMap<String, List>();
		JSONObject ooData = null;
		JSONObject oData = null;
		JSONArray array = null;
		JSONObject geoCoordData = null;
		List dataInfo = null;
		int length = beans.size();
		for (int i = 0; i < length; i++) {
			ResYearInfo bean = beans.get(i);
			geoCoordData = geoCoord.get(bean.getYear());
			if (geoCoordData == null) {
				geoCoordData = new JSONObject();
			}

			// 地理位置坐标信息
			array = new JSONArray();
			array.add(bean.getLongitude());
			array.add(bean.getLatitude());
			geoCoordData.put(bean.getPsName(), array);
			geoCoord.put(bean.getYear(), geoCoordData);

			dataInfo = data.get(bean.getYear());
			if (dataInfo == null) {
				dataInfo = new ArrayList();
			}

			// 图例信息
			oData = new JSONObject();
			oData.put("name", bean.getPsName());
			oData.put("value", i + 1);
			oData.put("psType", bean.getPsType());
			oData.put("product", bean.getProduct());
			oData.put("annual", bean.getAnnual() + bean.getUnit());
			dataInfo.add(oData);
			data.put(bean.getYear(), dataInfo);
		}
		object.put("coal", data);
		object.put("geoCoord", geoCoord);
		return object;
	}
}
