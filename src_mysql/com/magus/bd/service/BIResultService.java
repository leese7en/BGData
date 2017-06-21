package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.BIResult;

public interface BIResultService {
	/**
	 * 获取AQI数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<BIResult> blurryBIResult(BIResult bean);

	/**
	 * 获取总条数
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int blurryCount(BIResult bean);

	/**
	 * 获取分析结果的明细信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<BIResult> getDetail(BIResult bean);

	/**
	 * 获取算法信息
	 * 
	 * @return
	 */
	public abstract List<BIResult> getAlgorithm();
	
	/**
	 * 获取AQI数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<BIResult> blurryBIWaterResult(BIResult bean);

	/**
	 * 获取总条数
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int blurryWaterCount(BIResult bean);

	/**
	 * 获取分析结果的明细信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<BIResult> getWaterDetail(BIResult bean);

	/**
	 * 获取算法信息
	 * 
	 * @return
	 */
	public abstract List<BIResult> getWaterAlgorithm();

}
