package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.SysRole;
import com.magus.bd.entity.SysUserPage;

public interface SysUserPageDao extends BaseDao {

	/**
	 * 根据用户id 获取用户绑定的菜单信息
	 * 
	 * @param userId
	 * @return
	 */
	public List<SysUserPage> getUserMenus(int userId);

	/**
	 * 绑定用户菜单
	 * 
	 * @param bean
	 * @return
	 */
	public int addUserPage(SysUserPage bean);

	/**
	 * 解绑用户菜单
	 * 
	 * @param userPageId
	 * @return
	 */
	public int deleteUserPage(SysUserPage bean);

	/**
	 * 获取页面是否在用户中
	 * 
	 * @param bean
	 * @return
	 */
	public Integer getUserPage(SysUserPage bean);

	/**
	 * 删除页面
	 * 
	 * @param bean
	 * @return
	 */
	public int deletePage(SysUserPage bean);
	

}
