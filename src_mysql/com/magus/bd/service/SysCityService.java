package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.IndustryGroup;
import com.magus.bd.entity.SysCity;
import com.magus.bd.entity.ZoneCity;

public interface SysCityService {
	/**
	 * 获取盟市
	 * 
	 * @return
	 */
	public abstract List<SysCity> getCity();

	/**
	 * 获取工况对应的 盟市信息
	 * 
	 * @return
	 */
	public abstract List<SysCity> getIndustryCity();

	/**
	 * 添加盟市
	 * 
	 * @param SysCity
	 *            bean
	 * @return
	 */
	public abstract boolean addCity(SysCity bean);

	/**
	 * 删除盟市
	 * 
	 * @param bean
	 * @return
	 */
	public boolean deleteCity(int id);

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
	public boolean editCity(SysCity bean);

	/**
	 * 获取集团
	 * 
	 * @return
	 */
	public abstract List<IndustryGroup> getIndustryGroup();

	/**
	 * 获取t_code_zone_temp
	 * 
	 * @return
	 */
	public abstract List<ZoneCity> getZoneCity();
}
