package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResOutput;

public interface ResOutputDao {

	/**
	 * 根据企业编码获取排口信息
	 * @param bean
	 * @return
	 */
	public List<ResOutput> getResOutputByPSCode(ResOutput bean);
	/**
	 * 获取排口出口信息
	 * @param bean
	 * @return
	 */
	public List<ResOutput> getResOutputCodeByPSCode(ResOutput bean);
}
