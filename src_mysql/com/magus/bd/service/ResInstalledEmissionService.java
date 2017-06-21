package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.ResInstalledEmission;

public interface ResInstalledEmissionService {
	/**
	 * 获取所有排放绩效范围 ，装机范围
	 * 
	 * @return
	 */
	public List<ResInstalledEmission> getResInstalledEmission(String pollutantCode, int operatorType);

	/**
	 * 添加污染物 排放绩效、 装机范围
	 * 
	 * @param bean
	 * @return
	 */
	public boolean addResInstalledEmission(ResInstalledEmission bean, int operatorType);

	/**
	 * 删除污染物 排放绩效、 装机范围
	 * 
	 * @param id
	 * @return
	 */
	public boolean deleteResInstalledEmission(int id, int operatorType);

	/**
	 * 更新 信息
	 * 
	 * @param bean
	 * @return
	 */
	public boolean updateResInstalledEmission(ResInstalledEmission bean, int operatorType);

	/**
	 * 获取类型数据的总数
	 * 
	 * @param pollutantCode
	 * @return
	 */
	public int getCount(String pollutantCode, int operatorType);

}
