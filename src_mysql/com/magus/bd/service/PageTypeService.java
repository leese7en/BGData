package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.SysPageType;

public interface PageTypeService {

	/**
	 * 模糊查询 菜单类型信息
	 * 
	 * @param bean
	 * @return
	 */
	public JSONObject blurryPageType(SysPageType bean);

	/**
	 * 获取相同名称的数据
	 * 
	 * @param bean
	 * @return
	 */
	public int getPageTypeByName(SysPageType bean);

	/**
	 * 获取所有可用的菜单类型信息
	 * 
	 * @return
	 */
	public List<SysPageType> getAllPageType();

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	public int addPageType(SysPageType bean);

	/**
	 * 删除用户
	 * 
	 * @param id
	 * @return
	 */
	public boolean removePageType(int id);

	public int getPageTypeInUse(int id);

	/**
	 * 更新用户
	 * 
	 * @param user
	 * @return
	 */
	public int updatePageType(SysPageType bean);

	/**
	 * 根据id获取用户
	 * 
	 * @param id
	 * @return
	 */
	public SysPageType getPageTypeById(int id);

}
