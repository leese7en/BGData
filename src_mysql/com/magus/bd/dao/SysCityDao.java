package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.IndustryGroup;
import com.magus.bd.entity.SysCity;
import com.magus.bd.entity.ZoneCity;

public interface SysCityDao extends BaseDao {

	/**
	 * 获取所有盟市信息
	 * 
	 * @return
	 */
	public List<SysCity> getCity();

	/**
	 * 获取工况对应的 盟市信息
	 * 
	 * @return
	 */
	public List<SysCity> getIndustryCity();

	/**
	 * 添加盟市
	 * 
	 * @param bean
	 * @return
	 */
	public int addCity(SysCity bean);

	/**
	 * 删除盟市
	 * 
	 * @param bean
	 * @return
	 */
	public int deleteCity(int id);

	/**
	 * 根据id获取盟市信息
	 * 
	 * @param id
	 * @return
	 */
	public SysCity getCityById(String id);

	/**
	 * 按条件查找盟市信息
	 * 
	 * @return
	 */
	public List<SysCity> queryCity(SysCity bean);

	/**
	 * 编辑盟市
	 * 
	 * @param bean
	 * @return
	 */
	public int editCity(SysCity bean);

	/**
	 * 获取集团信息
	 * 
	 * @return
	 */
	public List<IndustryGroup> getIndustryGroup();

	/**
	 * 获取t_code_zone_temp
	 * 
	 * @return
	 */
	public List<ZoneCity> getZoneCity();
}
