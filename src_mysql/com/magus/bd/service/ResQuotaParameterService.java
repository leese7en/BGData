package com.magus.bd.service;

import java.util.List;
import java.util.Map;

import com.magus.bd.entity.ResQuotaParameter;

public interface ResQuotaParameterService {
	/**
	 * 获取 结果
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuotaParameter> getQuotaParameter();

	/**
	 * 更新数据
	 * 
	 * @param bean
	 * @return
	 */
	public int updateQuotaParameter(Map<String, Float> maps);
	
	public boolean setQuotaParameter(ResQuotaParameter bean);
	
	public ResQuotaParameter getQuotaParameterById(String id);

}
