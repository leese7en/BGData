package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Analysis;
import com.magus.bd.entity.Ranking;

public class RankingUtils {

	// 高耗能
	public static final int ENERGY = 1;
	// 高排放
	public static final int EMISSION = 2;
	// 既是高耗能又是高排放
	public static final int ENERGYANDEMISSION = 3;

	/**
	 * 格式化 污染物排放 和 资源消耗对比数据
	 * 
	 * @param beans
	 * @param allBeans
	 * @param o
	 * @return
	 */
	public static JSONObject formatAnalysis(List<Ranking> beans, String analysisType, String pollType) {
		JSONObject object = new JSONObject();
		List<String> legend = new ArrayList<String>();
		for (Ranking bean : beans) {

			if ("1".equals(analysisType)) {
				if ("SO2".equals(pollType)) {
				} else if ("NOx".equals(pollType)) {
				} else {
				}
			} else {
			}
		}

		return object;
	}

	/**
	 * 格式化 能耗 和污染物排放分析情况
	 * 
	 * @param beans
	 * @param cityBeans
	 * @param analysisType
	 * @param pollType
	 * @return
	 */
	public static JSONObject formatAnalysisPoll(List<Ranking> beans, String analysisType, String pollType) {
		JSONObject object = new JSONObject();
		List<String> legend = new ArrayList<String>();
		List<List> values = new ArrayList<List>();
		List<Object> value = null;
		for (Ranking bean : beans) {
			legend.add(bean.getpSName());
			if ("1".equals(analysisType)) {
				if ("SO2".equals(pollType)) {
					value = new ArrayList<Object>();
					value.add(bean.getSo2Effective());
					value.add(bean.getSo2Concentration());
					value.add(bean.getInstalledAmount());
					value.add(bean.getpSName());
					object.put("xAxis", "SO2排放绩效(g/kwh)");
					object.put("yAxis", "SO2排放强度(kg/万元)");
					values.add(value);
				} else if ("NOx".equals(pollType)) {
					value = new ArrayList<Object>();
					value.add(bean.getNoxEffective());
					value.add(bean.getNoxConcentration());
					value.add(bean.getInstalledAmount());
					value.add(bean.getpSName());
					object.put("xAxis", "NOx排放绩效(g/kwh)");
					object.put("yAxis", "NOx排放强度(kg/万元)");
					values.add(value);

				} else {
					value = new ArrayList<Object>();
					value.add(bean.getDustEffective());
					value.add(bean.getDustConcentration());
					value.add(bean.getInstalledAmount());
					value.add(bean.getpSName());
					object.put("xAxis", "烟尘排放绩效(g/kwh)");
					object.put("yAxis", "烟尘排放强度(kg/万元)");
					values.add(value);
				}
			} else {
				value = new ArrayList<Object>();
				value.add(bean.getCoalEffective());
				value.add(bean.getWaterEffective());
				value.add(bean.getInstalledAmount());
				value.add(bean.getpSName());
				object.put("xAxis", "煤消耗绩效(g/kwh)");
				object.put("yAxis", "新鲜水消耗绩效(kg/kwh)");
				values.add(value);
			}
		}
		object.put("data", values);
		object.put("legend", legend);
		return object;
	}

	/**
	 * 格式化盟市下属 企业的消耗情况和排放情况
	 * 
	 * @param beans
	 * @param cityBeans
	 * @return
	 */
	public static List<Ranking> formatAnalysisPoll(List<Ranking> beans, List<Ranking> cityBeans) {
		for (Ranking cityBean : cityBeans) {
			for (Ranking bean : beans) {
				if (bean.getCityId().equals(cityBean.getCityId())) {
					bean.setSo2Concentration(bean.getSo2Amount() / cityBean.getGDP() * 1000000);
					bean.setNoxConcentration(bean.getNoxAmount() / cityBean.getGDP() * 1000000);
					bean.setDustConcentration(bean.getDustAmount() / cityBean.getGDP() * 1000000);
				}
			}
		}
		return beans;
	}
}
