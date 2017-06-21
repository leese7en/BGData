package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.SysPageType;

public interface SysPageTypeDao extends BaseDao {

	/**
	 * 模糊查询 菜单信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<SysPageType> blurryPageType(SysPageType bean);

	/**
	 * 获取满足条条件的总个数
	 * 
	 * @param bean
	 * @return
	 */
	public int blurryPageTypeCount(SysPageType bean);

	/**
	 * 获取同名称的
	 * 
	 * @param bean
	 * @return
	 */
	public int getPageTypeByName(SysPageType bean);

	/**
	 * 获取所有的菜单信息
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
	public int removePageType(int id);

	public int getPageTypeInUse(int id);

	/**
	 * 更新用户
	 * 
	 * @param user
	 * @return
	 */
	public int updatePageType(SysPageType page);

	/**
	 * 根据id获取用户
	 * 
	 * @param id
	 * @return
	 */
	public SysPageType getPageTypeById(int id);
}
