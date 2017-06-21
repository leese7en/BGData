package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.IndustryA;
import com.magus.bd.entity.ResHotword;

public interface IndustryAService {
	/**
	 * 查询工况信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<IndustryA> getIndustryAByAlarmLogId(IndustryA bean);
	
	/**
	 * 按条件查询工况信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<IndustryA> queryIndustryA(IndustryA bean);
	
	/**
	 * 满足条件的总个数
	 */
	public int queryIndustryACount(IndustryA bean);

}
