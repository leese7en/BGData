package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResQuota;

public interface ResQuotaService {
	/**
	 * 获取指标
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getQuotaBase();

	/**
	 * 获取企业类型
	 * 
	 * @return
	 */
	public abstract List<ResQuota> getPSType();

	/**
	 * 获取企业名称
	 * 
	 * @return
	 */
	public abstract List<ResQuota> getEnterprise();

	/**
	 * 获取满足条件的 结果
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> blurryQuota(ResQuota bean);

	/**
	 * 获取满足条件的总条数
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int blurryCount(ResQuota bean);

	/**
	 * 获取 最差
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getQuotaTop(ResQuota bean);

	/**
	 * 获取行业在某个月的得分信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getQuotaPSType(ResQuota bean);

	/**
	 * 获取盟市得分
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getCityQutoa(ResQuota bean);

	/**
	 * 统计盟市纬度的信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImproveCity(ResQuota bean);

	/**
	 * 获取 区间内的统计信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract ResQuota getImproveCityDetailSta(ResQuota bean);

	/**
	 * 获取 区间信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImproveCityDetailInterval(ResQuota bean);

	/**
	 * 统计行业纬度的信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImprovePSType(ResQuota bean);

	/**
	 * 获取行业 统计信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract ResQuota getImprovePSTypeDetailSta(ResQuota bean);

	/**
	 * 获取行业区间信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImprovePSTypeDetailInterval(ResQuota bean);

	/**
	 * 统计企业纬度的信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImproveRes(ResQuota bean);

	/**
	 * 获取企业 统计信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract ResQuota getImproveResDetailSta(ResQuota bean);

	/**
	 * 获取企业 区间信息
	 * 
	 * @param bean
	 * @return
	 */

	public abstract List<ResQuota> getImproveResDetailInterval(ResQuota bean);

	/**
	 * 统计企业纬度的总数
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int getImproveResCount(ResQuota bean);

	/**
	 * 获取选取年份的指标得分
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImproveYear(ResQuota bean);

	/**
	 * 获取行业的得分信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImprovePSTypeYear(ResQuota bean);

	/**
	 * 盟市月份的得分数据
	 * 
	 * @param bean
	 * @return
	 */

	public abstract List<ResQuota> getImproveYearCity(ResQuota bean);

	/**
	 * 获取盟市的每年的月度数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImprovePSTypeMonth(ResQuota bean);

	/**
	 * 查询企业对应的信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImprovEnterpriseLine(ResQuota bean);

	/**
	 * 根据盟市 和 企业名称获取 企业信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getEnterpriseByInfo(ResQuota bean);

	/**
	 * 获取企业分析明细信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getEnterpriseBIInfo(ResQuota bean);

	/**
	 * 添加企业可靠性指标
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int addPSReliable(ResQuota bean);
}
