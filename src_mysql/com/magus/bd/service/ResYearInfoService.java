package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResYearInfo;

public interface ResYearInfoService {
	/**
	 * 获取盟市 年度信息
	 * 
	 * @return
	 */
	public abstract List<ResYearInfo> getAreaYearInfo(ResYearInfo bean);
	/**
	 * 获取每年的电厂个数信息
	 * @param bean
	 * @return
	 */
	public abstract List<ResYearInfo> getPowerCountByYear(ResYearInfo bean);

	/**
	 * 添加区年度信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract boolean addAreaYearInfo(ResYearInfo bean);

	/**
	 * 添加 全国或全区年度信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract boolean addCountryPowerInfo(ResYearInfo bean);

	/**
	 * 获取盟市年度信息
	 * 
	 * @return
	 */
	public abstract List<ResYearInfo> getCityYearInfo();

	/**
	 * 获取 全国 、全区 年度信息
	 * 
	 * @return
	 */
	public abstract List<ResYearInfo> getCountryPower();

	/**
	 * 获取全区的电力企业信息
	 * 
	 * @return
	 */
	public abstract JSONObject getCountryPowerPoint();

	/**
	 * 获取全区的煤矿数据
	 * 
	 * @return
	 */
	public abstract JSONObject getCountryCoalPoint();

	/**
	 * 获取 全国 、全区 年度变化信息
	 * 
	 * @return
	 */
	public abstract JSONObject getCountryPowerInfo();
	/**
	 * 获取全区的污染物排放数据
	 * @return
	 */
	public abstract JSONObject getCountryContaminants();

	/**
	 * 添加盟市年度信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract boolean addCityYearInfo(ResYearInfo bean);

	/**
	 * 按年份、盟市获取数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getChildrenMapData(ResYearInfo bean);
}
