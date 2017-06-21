package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResInstalledEmission;

public interface ResInstalledEmissionDao extends BaseDao {

	/**
	 * 获取所有排放绩效范围 ，装机范围
	 * 
	 * @return
	 */
	public List<ResInstalledEmission> getResEmission(String pollutantCode);

	/**
	 * 获取所有装机范围
	 * 
	 * @return
	 */
	public List<ResInstalledEmission> getResInstalled(String pollutantCode);

	/**
	 * 添加污染物 排放绩效、 装机范围
	 * 
	 * @param bean
	 * @return
	 */
	public int addResEmission(ResInstalledEmission bean);

	/**
	 * 添加 装机范围
	 * 
	 * @param bean
	 * @return
	 */
	public int addResInstalled(ResInstalledEmission bean);

	/**
	 * 删除污染物 排放绩效、 装机范围
	 * 
	 * @param id
	 * @return
	 */
	public int deleteResEmission(int id);

	/**
	 * 删除 装机范围
	 * 
	 * @param id
	 * @return
	 */
	public int deleteResInstalled(int id);

	/**
	 * 更新 信息
	 * 
	 * @param bean
	 * @return
	 */
	public int updateResEmission(ResInstalledEmission bean);

	/**
	 * 更新 信息
	 * 
	 * @param bean
	 * @return
	 */
	public int updateResInstalled(ResInstalledEmission bean);

	/**
	 * 获取类型数据的总数
	 * 
	 * @param pollutantCode
	 * @return
	 */
	public int getCountEmission(String pollutantCode);

	/**
	 * 获取类型数据的总数
	 * 
	 * @return
	 */
	public int getCountInstalled();
}
