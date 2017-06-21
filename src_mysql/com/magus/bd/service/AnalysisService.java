package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Analysis;

public interface AnalysisService {

	public abstract List<Analysis> getAnalysis();

	/**
	 * 高能耗、高排放 企业信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getAnalysisForAnalysis(Analysis bean);

	/**
	 * 获取全区对应年份的 发电量总和
	 * 
	 * @param year
	 * @return
	 */
	public abstract double getElectricitySum(String year);

	/**
	 * 获取行业信息 电厂
	 * 
	 * @return
	 */
	public abstract List<Analysis> getInduestryPower();

	/**
	 * 获取所有锅炉类型
	 * 
	 * @return
	 */
	public abstract List<Analysis> getBoilerType();

	/**
	 * 获取每年的数据
	 * 
	 * @return
	 */
	public abstract JSONObject queryAnalysis(Analysis bean);

}
