package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.SysUserPage;
import com.magus.bd.vo.UserPage;

public interface SysUserPageService {

	/**
	 * 获取用户菜单
	 * 
	 * @param userId
	 * @return
	 */
	public List<UserPage> getMenus(int userId);

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
	 * 获取用户下面的菜单信息
	 * 
	 * @param bean
	 * @return
	 */
	public JSONObject getPageUsing(SysUserPage bean);

}
