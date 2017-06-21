package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResPowerNetwork;

public class ResPowerNetworkUtils {

	/**
	 * 格式化 盟市 装机容量 、 发电量
	 * 
	 * @param beans
	 * @return
	 */
	public static Map<String, JSONArray> formatNetwork(List<ResPowerNetwork> beans) {
		Map<String, JSONArray> data = new HashMap<String, JSONArray>();
		JSONArray jsonArray = null;
		List<JSONObject> networkList = null;
		for (ResPowerNetwork bean : beans) {
			jsonArray = data.get(bean.getYear());
			if (jsonArray == null) {
				jsonArray = new JSONArray();
			}
			networkList = new ArrayList<JSONObject>();
			JSONObject o1 = new JSONObject();
			o1.put("name", bean.getBname());
			JSONObject o2 = new JSONObject();
			o2.put("name", bean.getEname());
			networkList.add(o1);
			networkList.add(o2);
			jsonArray.add(networkList);
			data.put(bean.getYear(), jsonArray);
		}
		return data;
	}

}
