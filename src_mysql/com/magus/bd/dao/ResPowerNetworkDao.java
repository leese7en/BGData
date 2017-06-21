package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResPowerNetwork;

public interface ResPowerNetworkDao extends BaseDao {

	/**
	 * 获取变电站信息
	 * 
	 * @return
	 */
	public List<ResPowerNetwork> getPowerInfo();

	/**
	 * 获取变电站信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResPowerNetwork> blurryPowerInfo(ResPowerNetwork bean);

	/**
	 * 获取电网信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResPowerNetwork> blurryPowerNetworkInfo(ResPowerNetwork bean);

	/**
	 * 500kv年度信息
	 * 
	 * @return
	 */
	public List<ResPowerNetwork> getPowerNetWorkHigh();

	/**
	 * 220kv年度信息
	 * 
	 * @return
	 */

	public List<ResPowerNetwork> getPowerNetWorkLow();

	/**
	 * 添加变电站 信息
	 * 
	 * @return
	 */
	public int addPowerInfo(ResPowerNetwork bean);

	/**
	 * 添加电网信息
	 * 
	 * @return
	 */
	public int addPowerNetwork(ResPowerNetwork bean);

}
