package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResPowerNetwork;

public interface ResPowerNetworkService {
	/**
	 * 获取变电站信息
	 * 
	 * @return
	 */
	public abstract List<ResPowerNetwork> getPowerInfo();

	/**
	 * 获取变电站信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResPowerNetwork> blurryPowerInfo(ResPowerNetwork bean);

	/**
	 * 获取电网信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResPowerNetwork> blurryPowerNetworkInfo(ResPowerNetwork bean);

	/**
	 * 获取电网信息 布局信息 500kv
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getPowerNetWorkHigh();

	/**
	 * 获取电网信息 布局信息 220kv
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getPowerNetWorkLow();

	/**
	 * 添加变电站 信息
	 * 
	 * @return
	 */
	public abstract boolean addPowerInfo(ResPowerNetwork bean);

	/**
	 * 添加电网信息
	 * 
	 * @return
	 */
	public abstract boolean addPowerNetwork(ResPowerNetwork bean);

}
