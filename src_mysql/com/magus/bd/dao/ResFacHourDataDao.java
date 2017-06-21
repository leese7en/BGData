package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResFacHourData;

public interface ResFacHourDataDao extends BaseDao {

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
	 * 满足条件的 图表数据
	 * @param bean
	 * @return
	 */
	public abstract List<ResFacHourData> getWaterFacHourDataInfoChart(ResFacHourData bean);
	
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
	 * 满足条件的 图表数据
	 * @param bean
	 * @return
	 */
	public abstract List<ResFacHourData> getGasFacHourDataInfoChart(ResFacHourData bean);
}
