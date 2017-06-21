package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResFacHourData;

public interface ResFacHourDataService {

	/**
	 * 满足条件的信息
	 * @param bean
	 * @return
	 */
	public abstract List<ResFacHourData> getWaterFacHourDataInfoTable(ResFacHourData bean);

	/**
	 * 满足条件的个数
	 * @param bean
	 * @return
	 */
	public abstract int getWaterFacHourDataInfoTableCount(ResFacHourData bean);

	/**
	 * 满足条件信息 图表
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getWaterFacHourDataInfoChart(ResFacHourData bean);

	/**
	 * 满足条件的信息
	 * @param bean
	 * @return
	 */
	public abstract List<ResFacHourData> getGasFacHourDataInfoTable(ResFacHourData bean);

	/**
	 * 满足条件的个数
	 * @param bean
	 * @return
	 */
	public abstract int getGasFacHourDataInfoTableCount(ResFacHourData bean);

	/**
	 * 满足条件信息 图表
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getGasFacHourDataInfoChart(ResFacHourData bean);

}
