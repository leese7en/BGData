package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.SysRole;

public interface SysRoleDao extends BaseDao {

	/**
	 * 获取 满足条件的总个数
	 * 
	 * @param bean
	 * @return
	 */
	public Integer getBlurryCount(SysRole bean);

	/**
	 * 根据用户名获得用户信息
	 * 
	 * @param phone
	 * @return
	 */
	public List<SysRole> blurryRole(SysRole bean);

	/**
	 * 获取所有可用菜单
	 * 
	 * @return
	 */
	public List<SysRole> getAllRole();

	/**
	 * 通过 角色ID 获取对应的菜单信息
	 * 
	 * @param roleIds
	 * @return
	 */
	public List<SysRole> getRolesPage(List<Integer> roleIds);

	/**
	 * 获取对应角色绑定的页面信息
	 * 
	 * @param roleId
	 * @return
	 */

	public List<SysRole> getPagesById(SysRole role);

	/**
	 * 添加角色
	 * 
	 * @param user
	 * @return
	 */
	public int addRole(SysRole bean);

	/**
	 * 获取角色信息 通过 Id
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
	 * 删除角色 页面信息
	 * 
	 * @param roleId
	 * @return
	 */
	public int deleteRolePage(SysRole bean);

	/**
	 * 获取页面是否在角色中
	 * 
	 * @param bean
	 * @return
	 */
	public Integer getRolePage(SysRole bean);

}
