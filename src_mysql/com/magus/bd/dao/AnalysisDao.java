package com.magus.bd.dao;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Analysis;

public interface AnalysisDao {

	public List<Analysis> getAnalysis();

	/**
	 * 高能耗、高排放 企业信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<Analysis> getAnalysisForAnalysis(Analysis bean);

	/**
	 * 获取全区对应年份的 发电量总和
	 * 
	 * @param year
	 * @return
	 */
	public Double getElectricitySum(String year);

	/**
	 * 获取电厂行业 信息
	 * 
	 * @param year
	 * @return
	 */
	public List<Analysis> getInduestryPower();

	/**
	 * 获取所有的锅炉类型
	 * 
	 * @return
	 */
	public List<Analysis> getBoilerType();

	/**
	 * 获取每年的数据
	 * 
	 * @return
	 */
	public List<Analysis> queryAnalysis(Analysis bean);

}
