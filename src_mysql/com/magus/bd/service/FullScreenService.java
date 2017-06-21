package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.FullScreen;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.ResYearInfo;

public interface FullScreenService {
	
	/**
	 * 获取机组类型分布
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getBoilerTypeInstallAmountCountByYear(FullScreen bean);
	/**
	 * 获取AQI数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getIndustryInfo(FullScreen bean);
	/**
	 * 获取超低排放是数据
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getSupwerLowInfo(FullScreen bean);
	/**
	 * 获取质量现状
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getDataQuality(FullScreen bean);
	/**
	 * 获取 热词相关信息
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getHotwordInfo(FullScreen bean);
	/**
	 * 质量现状和改善分析
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getDataQualityImprove(FullScreen bean);
	/**
	 * 500KV 电网
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getPowerNetWorkHigh();
	/**
	 * 220KV 电网
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getPowerNetWorkLow();

	/**
	 * 电厂位置
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getCountryPowerPoint();
	/**
	 * 煤矿位置
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getCountryCoalPoint();
	/**
	 * 区域信息
	 * @param bean
	 * @return
	 */
	public abstract List<ResYearInfo> getAreaYearInfo(ResYearInfo bean);
	
	/**
	 * 根据选择的时间区间和纬度获取对应的 盟市、集团纬度的数据信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getIndustryPollByPoll(ResIndustryCon bean, String viewPoint, String pollType);
	/**
	 * 获取排放绩效分布情况
	 * @return
	 */
	public abstract JSONObject queryAnalysisFullScreen();
	/**
	 * 查询 推算硫分 某一年的月度 数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getIndustrySulfurMonth(ResIndustryCon bean, String viewPoint);
	/**
	 * 获取盟市下属企业的 信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndurutyConByEnterprise(ResIndustryCon bean);
	/**
	 * 获取工况实时数据
	 * @param cityName
	 * @return
	 */
	public abstract JSONObject getIndurutyRealtime(String cityName);
	/**
	 * 获取盟市在线排放数据
	 * @param cityName
	 * @return
	 */
	public abstract JSONObject getOnlineEmission(String cityName);

}
