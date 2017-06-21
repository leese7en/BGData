package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.BIResult;

public interface BIResultDao extends BaseDao {

	/**
	 * 获取满足条件的 结果
	 * 
	 * @param bean
	 * @return
	 */
	public List<BIResult> blurryBIResult(BIResult bean);

	/**
	 * 获取满足条件的总条数
	 * 
	 * @param bean
	 * @return
	 */
	public int blurryCount(BIResult bean);

	/**
	 * 获取 分析结果的明细信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<BIResult> getDetail(BIResult bean);

	/**
	 * 获取算法信息
	 * 
	 * @return
	 */
	public List<BIResult> getAlgorithm();
	
	/**
	 * 获取满足条件的 结果
	 * 
	 * @param bean
	 * @return
	 */
	public List<BIResult> blurryBIWaterResult(BIResult bean);

	/**
	 * 获取满足条件的总条数
	 * 
	 * @param bean
	 * @return
	 */
	public int blurryWaterCount(BIResult bean);

	/**
	 * 获取 分析结果的明细信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<BIResult> getWaterDetail(BIResult bean);

	/**
	 * 获取算法信息
	 * 
	 * @return
	 */
	public List<BIResult> getWaterAlgorithm();

}
