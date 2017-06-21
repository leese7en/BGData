package com.magus.bd.service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.SysUser;

public interface SysUserService {
	/**
	 * 
	 * @param phone
	 * @return
	 */
	public abstract SysUser getUser(String name);

	/**
	 * 获取全部用户信息
	 * 
	 * @return
	 */
	public JSONObject blurryUser(SysUser user);

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	public int addUser(SysUser user);

	/**
	 * 删除用户
	 * 
	 * @param id
	 * @return
	 */
	public int deleteUser(int userId);

	/**
	 * 根据用户名和登录名获取 用户
	 * 
	 * @param user
	 * @return
	 */
	public int getUserByNameOrJobNo(SysUser user);

	/**
	 * 重置密码
	 * 
	 * @param user
	 * @return
	 */
	public int resetUserPassword(SysUser user);

	/**
	 * 更新用户
	 * 
	 * @param user
	 * @return
	 */
	public int updateUser(SysUser user);

	/**
	 * 根据id获取用户
	 * 
	 * @param id
	 * @return
	 */
	public SysUser getUserById(int id);

}
