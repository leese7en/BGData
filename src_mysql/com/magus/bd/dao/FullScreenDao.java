package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.FullScreen;

public interface FullScreenDao extends BaseDao {

	/**
	 * 获取月度发电信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<FullScreen> getIndustryPowerAmountMonth(FullScreen bean);
	/**
	 * 获取机组类型分布
	 * @param bean
	 * @return
	 */
	public List<FullScreen> getBoilerTypeCountByYear(FullScreen bean);
	/**
	 * 获取装机容量 分布情况
	 * @param bean
	 * @return
	 */
	public List<FullScreen> getInstallAmountByYear(FullScreen bean);

	/**
	 * 获取全区的数据
	 * 
	 * @param bean
	 * @return
	 */
	public List<FullScreen> getDataQualityTotal(FullScreen bean);

	/**
	 * 获取各盟市统计数据
	 * 
	 * @param bean
	 * @return
	 */
	public List<FullScreen> getDataQualityCity(FullScreen bean);
	/**
	 * 查询所有数据
	 * @param bean
	 * @return
	 */
	public List<FullScreen> getHotWordAll(FullScreen bean);
	/**
	 * 查询 分企业数据
	 * @param bean
	 * @return
	 */
	public List<FullScreen> getHotWordEnterprise(FullScreen bean);
	/**
	 * 获取SO2 排放绩效
	 * @return
	 */
	public List<FullScreen> queryAnalysisFullScreen();
	/**
	 * 获取在线污染物排放数据
	 * @param cityName
	 * @return
	 */
	public List<FullScreen> getOnlineEmission(String cityName);

}
