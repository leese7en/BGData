package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.ResSuperLow;

public interface ResSuperLowService {
	/**
	 * 获取满足条件的电厂
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResSuperLow> getPowerUnit(ResSuperLow bean);

	/**
	 * 获取满足条件的电厂
	 * 
	 * @param bean
	 * @param aims
	 * @return
	 */
	public abstract List<ResSuperLow> getPowerUnitBreak(ResSuperLow bean, float aimsMin, float aimsMax);

}
