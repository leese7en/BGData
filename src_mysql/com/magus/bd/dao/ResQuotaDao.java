package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResQuota;

public interface ResQuotaDao extends BaseDao {
	/**
	 * 获取指标
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> getQuotaBase();

	/**
	 * 获取 企业类型
	 * 
	 * @return
	 */
	public List<ResQuota> getPSType();

	/**
	 * 获取企业信息
	 * 
	 * @return
	 */
	public List<ResQuota> getEnterpriseInfo();

	/**
	 * 获取满足条件的 结果
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> blurryQuota(ResQuota bean);

	/**
	 * 获取满足条件的总条数
	 * 
	 * @param bean
	 * @return
	 */
	public int blurryCount(ResQuota bean);

	/**
	 * 获取 每月的所有数据
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> getEnterpriseByMonth(ResQuota bean);

	/**
	 * 获取 区间范围内的企业得分信息
	 * 
	 * @param bean
	 * @return
	 */

	public List<ResQuota> getEnterprise(ResQuota bean);

	/**
	 * 获取盟市得分
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> getCityQutoa(ResQuota bean);

	/**
	 * 统计盟市纬度的信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> getImproveCity(ResQuota bean);

	/**
	 * 获取统计信息
	 * 
	 * @param bean
	 * @return
	 */
	public ResQuota getImproveCityDetailSta(ResQuota bean);

	/**
	 * 获取 区间信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> getImproveCityDetailInterval(ResQuota bean);

	/**
	 * 统计行业纬度的信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> getImprovePSType(ResQuota bean);

	/**
	 * 获取行业 统计信息
	 * 
	 * @param bean
	 * @return
	 */
	public ResQuota getImprovePSTypeDetailSta(ResQuota bean);

	/**
	 * 获取行业区间信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> getImprovePSTypeDetailInterval(ResQuota bean);

	/**
	 * 统计企业纬度的信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResQuota> getImproveRes(ResQuota bean);

	/**
	 * 获取企业 统计信息
	 * 
	 * @param bean
	 * @return
	 */
	public ResQuota getImproveResDetailSta(ResQuota bean);

	/**
	 * 获取企业 区间信息
	 * 
	 * @param bean
	 * @return
	 */

	public List<ResQuota> getImproveResDetailInterval(ResQuota bean);

	/**
	 * 统计企业纬度的总数
	 * 
	 * @param bean
	 * @return
	 */
	public int getImproveResCount(ResQuota bean);

	/**
	 * 获取选取年份的指标得分
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getImproveYear(ResQuota bean);

	/**
	 * 获取企业可靠性区间信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResQuota> getReliability(List<String> psCodes);

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
	public abstract List<ResQuota> getEnterpriseBIInfo(ResQuota bean);

	/**
	 * 添加企业可靠性指标
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int addPSReliable(ResQuota bean);
}
