package com.magus.bd.dao;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResYearInfo;

public interface ResYearInfoDao extends BaseDao {

	/**
	 * 获取区年度信息
	 * 
	 * @return
	 */
	public List<ResYearInfo> getAreaYearInfo(ResYearInfo bean);
	/**
	 * 获取每年的电厂个数信息
	 * @param bean
	 * @return
	 */
	public List<ResYearInfo> getPowerCountByYear(ResYearInfo bean);

	/**
	 * 获取盟市发电量信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResYearInfo> getCityYear(ResYearInfo bean);

	/**
	 * 添加区年度信息
	 * 
	 * @param bean
	 * @return
	 */
	public int addAreaYearInfo(ResYearInfo bean);

	/**
	 * 添加 全国或全区年度信息
	 * 
	 * @param bean
	 * @return
	 */
	public int addCountryPowerInfo(ResYearInfo bean);

	/**
	 * 获取盟市年度信息
	 * 
	 * @return
	 */
	public List<ResYearInfo> getCityYearInfo();

	/**
	 * 获取全国 、 全区年度信息
	 * 
	 * @return
	 */
	public List<ResYearInfo> getCountryPower();
	/**
	 * 获取全区的污染物排放数据
	 * @return
	 */
	public List<ResYearInfo> getCountryContaminants();

	/**
	 * 获取全区的电力企业信息
	 * 
	 * @return
	 */
	public List<ResYearInfo> getCountryPowerPoint();

	/**
	 * 获取全区的煤矿数据信息
	 * 
	 * @return
	 */
	public List<ResYearInfo> getCountryCoalPoint();

	/**
	 * 获取盟市 对比数据
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResYearInfo> getCityPower(ResYearInfo bean);

	/**
	 * 获取盟市的 电厂的位置信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResYearInfo> getCityPowerPoint(ResYearInfo bean);

	/**
	 * 获取盟市煤矿信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResYearInfo> getCityCoalPoint(ResYearInfo bean);

	/**
	 * 添加盟市年度信息
	 * 
	 * @param bean
	 * @return
	 */
	public int addCityYearInfo(ResYearInfo bean);

	/**
	 * 按年份、盟市获取数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResYearInfo> getChildrenMapData(ResYearInfo bean);

}
