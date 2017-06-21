package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.SysRole;

public interface SysRoleService {

	/**
	 * 根据用户名获得用户信息
	 * 
	 * @param phone
	 * @return
	 */
	public JSONObject blurryRole(SysRole bean);

	/**
	 * 获取所有可用菜单
	 * 
	 * @return
	 */
	public List<SysRole> getAllRole();

	/**
	 * 获取可以绑定给用户的菜单
	 * 
	 * @return
	 */
	public List<SysRole> getUserRole();

	/**
	 * 添加角色
	 * 
	 * @param user
	 * @return
	 */
	public int addRole(SysRole bean);

	/**
	 * 删除角色
	 * 
	 * @param roleId
	 * @return
	 */
	public int deleteRole(int roleId);

	/**
	 * 添加角色 页面 信息
	 * 
	 * @param user
	 * @return
	 */
	public int addRolePage(SysRole bean);

	/**
	 * 获取角色信息 通过Id
	 * 
	 * @param roleId
	 * @return
	 */
	public SysRole getRoleInfoById(int roleId);

	/**
	 * 获取角色信息 通过 name
	 * 
	 * @param roleName
	 * @return
	 */
	public SysRole getRoleInfoByName(String roleName);

	/**
	 * 更新角色信息
	 * 
	 * @param role
	 * @return
	 */
	public int updateRoleInfo(SysRole role);

	/**
	 * 删除角色 页面 信息
	 * 
	 * @param roleId
	 * @return
	 */
	public int deleteRolePage(SysRole bean);

	/**
	 * 获取角色菜单信息
	 * 
	 * @param role
	 * @return
	 */
	public JSONObject getRoleMenus(SysRole role);
}
