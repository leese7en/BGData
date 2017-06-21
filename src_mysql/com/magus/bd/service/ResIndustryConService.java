package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.SysAnotation;

public interface ResIndustryConService {
	/**
	 * 根据选择的时间区间和纬度获取对应的 盟市、集团纬度的数据信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getIndustryPollByPoll(ResIndustryCon bean, String viewPoint, String pollType);
	/**
	 * 根据月份和年份查询批注信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<SysAnotation> getAnnotationByYearAndMonth(SysAnotation bean);

	/**
	 * 查询 推算硫分 每年数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getIndustrySulfurYear(ResIndustryCon bean);

	/**
	 * 查询 推算硫分 某一年的月度 数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getIndustrySulfurMonth(ResIndustryCon bean, String viewPoint);

	/**
	 * 获取盟市下属企业的 信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndurutyConByEnterprise(ResIndustryCon bean);
	/**
	 * 获取盟市或集团的批注信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<SysAnotation> getGroupOrCityAnnotationById(SysAnotation bean);
	

}
