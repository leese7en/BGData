package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResQuotaParameter;

public interface ResQuotaParameterDao extends BaseDao {

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
	public int updateQuotaParameter(ResQuotaParameter bean);
	
	
	public int setQuotaParameter(ResQuotaParameter bean);
	
	
	public ResQuotaParameter getQuotaParameterById(String id);

}
