package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.AQIDayInfo;

public interface AQIDayInfoDao extends BaseDao {

	/**
	 * 获取区年度信息
	 * 
	 * @return
	 */
	public List<AQIDayInfo> getAQIDayInfo(AQIDayInfo bean);

	/**
	 * 污染物排放浓度和 排放量对比信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<AQIDayInfo> getPollDayInfo(AQIDayInfo bean);

	/**
	 * 获取污染物排放量
	 * 
	 * @param bean
	 * @return
	 */
	public List<AQIDayInfo> getPollAmountInfo(AQIDayInfo bean);

	/**
	 * 获取火电企业的污染物排放力量信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<AQIDayInfo> getPowerPollAmountInfo(AQIDayInfo bean);

}
