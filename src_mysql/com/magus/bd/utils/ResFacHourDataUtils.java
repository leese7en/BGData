package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResFacHourData;
import com.magus.bd.vo.FacHourData;

public class ResFacHourDataUtils {


	/**
	 * 格式化 热词出现的频次和 出现的时间信息
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatWaterFacHourDataLine(List<ResFacHourData> beans, ResFacHourData bean) {
		JSONObject object = new JSONObject();
		if (beans == null || beans.size() < 1) {
			return null;
		}
		Set pollutantNames = new HashSet<String>();
		Map<String, Map<String,Float>> dataMap = ResFacHourDataUtils.formatFacHourDatatoMap(beans,pollutantNames);
		List legend = new ArrayList<String>();
		List xAxis = new ArrayList<String>();
		Map<String, Float[]> data = new HashMap<String, Float[]>();
		int i =0;
		int length = dataMap.size();
		for (String key : dataMap.keySet()) {
			Map<String,Float> o = dataMap.get(key);
			xAxis.add(key);
			for(String code:o.keySet()){
				Float[] values = data.get(code); 				
				if(values==null||values.length<1){
					legend.add(code);
					values= new Float[length];
				}
				values[i]= o.get(code);
				data.put(code, values);
			}
			i++;
		}
		object.put("legend", legend);
		object.put("data", data);
		object.put("xAxis", xAxis);
		return object;
	}

	/**
	 * 格式化 热词出现的频次和 出现的时间信息
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatGasFacHourDataLine(List<ResFacHourData> beans, ResFacHourData bean) {
		JSONObject object = new JSONObject();
		if (beans == null || beans.size() < 1) {
			return null;
		}
		Set pollutantNames = new HashSet<String>();
		Map<String, Map<String,Float>> dataMap = ResFacHourDataUtils.formatFacHourDatatoMap(beans,pollutantNames);
		List legend = new ArrayList<String>();
		List xAxis = new ArrayList<String>();
		Map<String, Float[]> data = new HashMap<String, Float[]>();
		int i =0;
		int length = dataMap.size();
		for (String key : dataMap.keySet()) {
			Map<String,Float> o = dataMap.get(key);
			xAxis.add(key);
			for(String code:o.keySet()){
				Float[] values = data.get(code); 				
				if(values==null||values.length<1){
					legend.add(code);
					values= new Float[length];
				}
				values[i]= o.get(code);
				data.put(code, values);
			}
			i++;
		}
		object.put("legend", legend);
		object.put("data", data);
		object.put("xAxis", xAxis);
		return object;
	}

	/**
	 * 格式化数据 形成map
	 * @param beans
	 * @param pollutantNames
	 * @return
	 */
	public static Map<String, Map<String,Float>> formatFacHourDatatoMap(List<ResFacHourData> beans,Set pollutantNames) {
		Map<String, Map<String,Float>> dataMap = new LinkedHashMap<String, Map<String,Float>>();
		for (ResFacHourData bean : beans) {
			String polltantCode = bean.getPollutantCode();
			String time = bean.getMonitorTime();
			Map<String,Float> o = dataMap.get(time);
			if (o == null) {
				o = new HashMap<String,Float>();
			}
			String pollutantName = bean.getPollutantName();
			if(pollutantName==null||"".equals(pollutantName)){
				pollutantName = "流量";
				pollutantNames.add(pollutantName);
				o.put(pollutantName, bean.getRevisedFlow());
			}else{
				pollutantNames.add(pollutantName);
				o.put(pollutantName, bean.getRevisedStrength());
			}
			pollutantNames.add(pollutantName);
			dataMap.put(time, o);
		}
		return dataMap;
	}
}
