package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.ResOutput;

public interface ResOutputService {

	/**
	 * 根据企业编码获取排口信息
	 * @param bean
	 * @return
	 */
	public List<ResOutput> getResOutputByPSCode(ResOutput bean);
	/**
	 * 获取出口信息
	 * @param bean
	 * @return
	 */
	public List<ResOutput> getResOutputCodeByPSCode(ResOutput bean);
}
