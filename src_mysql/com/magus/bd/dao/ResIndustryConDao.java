package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.SysAnotation;
import com.magus.bd.entity.SysUser;

public interface ResIndustryConDao extends BaseDao {
	/**
	 * 根据选择的时间区间和纬度获取对应的 盟市数据信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndustryPollByCity(ResIndustryCon bean);

	/**
	 * 根据选择的时间区间和纬度获取对应集团纬度的 数据信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndustryPollByGroup(ResIndustryCon bean);
	/**
	 * 根据选择的时间区间和纬度获取对应有批注的盟市图表坐标
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getAnotationPositionByCity(ResIndustryCon bean);
	/**
	 * 根据选择的时间区间和纬度获取对应有批注的集团图表坐标
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getAnotationPositionByGroup(ResIndustryCon bean);
	/**
	 * 查询 推算硫分 每年数据
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndustrySulfurYear(ResIndustryCon bean);
	/**
	 * 按年份查有批注的图表坐标
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndustryPositionSulfurYear(ResIndustryCon bean);

	/**
	 * 查询 推算硫分 盟市 年度 的 月度
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndustrySulfurByCity(ResIndustryCon bean);

	/**
	 * 查询 推算硫分 行业 年度 的 月度
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndustrySulfurByGroup(ResIndustryCon bean);

	/**
	 * 获取盟市下属企业的 信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndurutyConByEnterprise(ResIndustryCon bean);
	/**
	 * 获取盟市下属企业的 信息  通过盟市名称
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResIndustryCon> getIndurutyConByEnterpriseByCityName(ResIndustryCon bean);
	
	
	/**
	 * 获取盟市或集团的批注信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<SysAnotation> getGroupOrCityAnnotationById(SysAnotation bean);
	/**
	 * 根据月份和年份查询批注信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<SysAnotation> getAnnotationByYearAndMonth(SysAnotation bean);

}
