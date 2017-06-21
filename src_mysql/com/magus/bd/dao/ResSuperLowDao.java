package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResSuperLow;

public interface ResSuperLowDao extends BaseDao {
	/**
	 * 获取满足条件的机组
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResSuperLow> getPowerUnit(ResSuperLow bean);

	/**
	 * 获取 对应方案的数据信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResSuperLow> getProgramInfo(ResSuperLow bean);

	/**
	 * 根据电厂机组编码 获取 机组信息
	 * 
	 * @param unitIds
	 * @return
	 */
	public List<ResSuperLow> getPowerUnitByIds(ResSuperLow bean);

	/**
	 * 根据年份年统计每年的装机容量总和
	 * 
	 * @param year
	 * @return
	 */
	public ResSuperLow getPowerYearInfo(ResSuperLow bean);

}
