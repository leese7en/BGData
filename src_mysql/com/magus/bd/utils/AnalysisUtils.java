package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.AQIDayInfo;
import com.magus.bd.entity.Analysis;
import com.magus.bd.entity.ResQuota;

public class AnalysisUtils {

	// 高耗能
	public static final int ENERGY = 1;
	// 高排放
	public static final int EMISSION = 2;
	// 既是高耗能又是高排放
	public static final int ENERGYANDEMISSION = 3;

	/**
	 * 将高能耗、高排放企业 对比
	 * 
	 * 组合高能耗 、 高排放、既是高能耗高排放企业
	 * 
	 * @param beans
	 * @return
	 */
	public static List<Analysis> formatAnalysisEnergyAndEmission(List<Analysis> energy, List<Analysis> emission) {
		List<Analysis> beans = new ArrayList<Analysis>();
		// 加入单是高耗能 、既是高耗能又是高排放
		for (Analysis o : energy) {
			for (Analysis oo : emission) {
				if (o.getpSCode().equals(oo.getpSCode())) {
					o.setEnergyAndEmission(AnalysisUtils.ENERGYANDEMISSION);
					break;
				}
			}
			beans.add(o);
		}
		// 加入单是高排放的数据

		// 当前时候已经包含
		boolean flag = true;
		for (Analysis o : emission) {
			for (Analysis oo : beans) {
				if (o.getpSCode().equals(oo.getpSCode())) {
					flag = false;
					break;
				}
			}
			if (!flag) {
				flag = true;
				continue;
			}
			beans.add(o);
		}
		return beans;
	}

	/**
	 * 格式化展示方式
	 * 
	 * @param energy
	 * @param emission
	 * @return
	 */
	public static JSONObject formatAnalysis(List<Analysis> beansEnergy, List<Analysis> beansEmission, List<Analysis> allBeans, Analysis o) {
		JSONObject object = null;
		if (beansEnergy == null || beansEnergy.size() < 1 || beansEmission == null || beansEmission.size() < 1 || allBeans == null || allBeans.size() < 1) {
			return object;
		} else {
			object = new JSONObject();
		}
		object.put("dataConsume", beansEnergy);
		object.put("dataEmission", beansEmission);
		JSONObject energyGeoCoord = new JSONObject();
		List<JSONObject> energyData = new ArrayList<JSONObject>();
		JSONObject emissionGeoCoord = new JSONObject();
		List<JSONObject> emissionData = new ArrayList<JSONObject>();
		JSONObject energyEGeoCoord = new JSONObject();
		List<JSONObject> energyEData = new ArrayList<JSONObject>();
		JSONObject ooData = null;
		JSONArray array = null;
		int value1 = 1;
		int value2 = 1;
		int value3 = 1;
		for (Analysis bean : allBeans) {
			switch (bean.getEnergyAndEmission()) {
			// 单纯 高能耗
			case AnalysisUtils.ENERGY:
				ooData = new JSONObject();
				array = new JSONArray();
				array.add(bean.getLongitude());
				array.add(bean.getLatitude());
				energyGeoCoord.put(bean.getpSName(), array);
				ooData.put("name", bean.getpSName());
				ooData.put("value", value1++);
				ooData.put("cityName", bean.getCityName());
				if ("SO2".equals(o.getPollType())) {
					ooData.put("strength", bean.getSo2Concentration());
					ooData.put("proformance", bean.getSo2Effective());
				} else if ("NOx".equals(o.getPollType())) {
					ooData.put("strength", bean.getNoxConcentration());
					ooData.put("proformance", bean.getNoxEffective());
				} else {
					ooData.put("strength", bean.getDustConcentration());
					ooData.put("proformance", bean.getDustEffective());
				}
				ooData.put("waterConsume", bean.getWaterEffective());
				ooData.put("coalConsume", bean.getCoalEffective());
				energyData.add(ooData);
				break;
			// 单纯高排放
			case AnalysisUtils.EMISSION:
				ooData = new JSONObject();
				array = new JSONArray();
				array.add(bean.getLongitude());
				array.add(bean.getLatitude());
				emissionGeoCoord.put(bean.getpSName(), array);
				ooData.put("name", bean.getpSName());
				ooData.put("value", value2++);
				ooData.put("cityName", bean.getCityName());
				if ("SO2".equals(o.getPollType())) {
					ooData.put("strength", bean.getSo2Concentration());
					ooData.put("proformance", bean.getSo2Effective());
				} else if ("NOx".equals(o.getPollType())) {
					ooData.put("strength", bean.getNoxConcentration());
					ooData.put("proformance", bean.getNoxEffective());
				} else {
					ooData.put("strength", bean.getDustConcentration());
					ooData.put("proformance", bean.getDustEffective());
				}
				ooData.put("waterConsume", bean.getWaterEffective());
				ooData.put("coalConsume", bean.getCoalEffective());
				emissionData.add(ooData);
				break;
			// 既是高能耗 又是高排放
			case AnalysisUtils.ENERGYANDEMISSION:
				ooData = new JSONObject();
				array = new JSONArray();
				array.add(bean.getLongitude());
				array.add(bean.getLatitude());
				energyEGeoCoord.put(bean.getpSName(), array);
				ooData.put("name", bean.getpSName());
				ooData.put("value", value3++);
				ooData.put("cityName", bean.getCityName());
				if ("SO2".equals(o.getPollType())) {
					ooData.put("strength", bean.getSo2Concentration());
					ooData.put("proformance", bean.getSo2Effective());
				} else if ("NOx".equals(o.getPollType())) {
					ooData.put("strength", bean.getNoxConcentration());
					ooData.put("proformance", bean.getNoxEffective());
				} else {
					ooData.put("strength", bean.getDustConcentration());
					ooData.put("proformance", bean.getDustEffective());
				}
				ooData.put("waterConsume", bean.getWaterEffective());
				ooData.put("coalConsume", bean.getCoalEffective());
				energyEData.add(ooData);
				break;
			default:
				break;
			}
		}
		object.put("energyGeoCoord", energyGeoCoord);
		object.put("energyData", energyData);
		object.put("emissionGeoCoord", emissionGeoCoord);
		object.put("emissionData", emissionData);
		object.put("energyEGeoCoord", energyEGeoCoord);
		object.put("energyEData", energyEData);
		return object;
	}

	/**
	 * 对 每年的数据按着需求进行格式化
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatAnalysis(List<Analysis> beans, Analysis bean) {
		JSONObject object = null;
		if (beans == null || beans.size() < 1) {
			return object;
		}
		object = new JSONObject();
		int type = bean.getEmission();
		String title = ResConst.emissionEffectiveSO2;
		for (Analysis o : beans) {
			switch (type) {
			case ResConst.so2Effective:
				o.setQuotaPara(o.getSo2Effective());
				title = ResConst.emissionEffectiveSO2;
				break;
			case ResConst.noxEffective:
				o.setQuotaPara(o.getNoxEffective());
				title = ResConst.emissionEffectiveNOx;
				break;
			case ResConst.dustEffective:
				o.setQuotaPara(o.getDustEffective());
				title = ResConst.emissionEffectiveDust;
				break;
			case ResConst.so2Concen:
				o.setQuotaPara(o.getSo2Concentration());
				title = ResConst.emissionStrengthSO2;
				break;
			case ResConst.noxConcen:
				o.setQuotaPara(o.getNoxConcentration());
				title = ResConst.emissionStrengthNOx;
				break;
			case ResConst.dustConcen:
				o.setQuotaPara(o.getDustConcentration());
				title = ResConst.emissionStrengthDust;
				break;
			case ResConst.coalConcen:
				o.setQuotaPara(o.getCoalEffective());
				title = ResConst.consumeEffectiveCoal;
				break;
			default:
				break;
			}
		}

		Collections.sort(beans, new Comparator<Analysis>() {
			public int compare(Analysis data1, Analysis data2) {
				Float d1 = data1.getQuotaPara();
				Float d2 = data2.getQuotaPara();
				return d2.compareTo(d1);
			}
		});

		JSONArray o1 = new JSONArray();
		JSONArray xAxis = new JSONArray();
		JSONObject oo = null;
		List<Analysis> beansInfo = null;
		if (beans != null && beans.size() > 0) {
			beansInfo = new ArrayList<Analysis>();
			for (Analysis tt : beans) {
				if (tt.getQuotaPara() > 0) {
					beansInfo.add(tt);
				}
			}
		} else {
			beansInfo = beans;
		}
		for (Analysis o : beansInfo) {
			oo = new JSONObject();
			oo.put("value", o.getQuotaPara());
			oo.put("name", o.getpSName());
			oo.put("title", title);
			oo.put("products", o.getProducts());
			oo.put("unit", o.getUnit());
			xAxis.add(o.getpSName());
			o1.add(oo);
		}
		JSONObject oo1 = new JSONObject();
		oo1.put("data", o1);
		oo1.put("xAxis", xAxis);
		object.put("allInfo", oo1);
		List<Analysis> beansHigh = null;
		List<Analysis> beansLow = null;
		if (beansInfo != null && beansInfo.size() > 9) {
			beansHigh = beansInfo.subList(0, 10);
			beansLow = beansInfo.subList(beansInfo.size() - 10, beansInfo.size());
		} else {
			beansHigh = beansInfo;
			beansLow = beansInfo;
		}
		JSONArray o2 = new JSONArray();
		int size = 0;
		if (beansHigh != null) {
			size = beansHigh.size();
			for (int i = size - 1; i >= 0; i--) {
				Analysis ooo = beansHigh.get(i);
				oo = new JSONObject();
				oo.put("value", ooo.getQuotaPara());
				oo.put("name", ooo.getpSName());
				oo.put("title", title);
				oo.put("products", ooo.getProducts());
				oo.put("unit", ooo.getUnit());
				oo.put("index", i);
				o2.add(oo);
			}
		}
		object.put("highInfo", o2);
		JSONArray o3 = new JSONArray();
		size = 0;
		if (beansLow != null) {
			size = beansLow.size();
			for (int i = size - 1; i >= 0; i--) {
				Analysis ooo = beansLow.get(i);
				oo = new JSONObject();
				oo.put("value", ooo.getQuotaPara());
				oo.put("name", ooo.getpSName());
				oo.put("title", title);
				oo.put("products", ooo.getProducts());
				oo.put("unit", ooo.getUnit());
				oo.put("index", i);
				o3.add(oo);
			}
		}
		object.put("lowInfo", o3);
		oo.put("title", title);
		return object;
	}
}
