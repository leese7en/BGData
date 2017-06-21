package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.dao.BaseDao;
import com.magus.bd.entity.SysPage;

public interface MenuDao extends BaseDao {

	
	/**
	 * 获取所有可用的菜单信息 ，不是父节点
	 * 
	 * @return
	 */
	public List<SysPage> getChildMenu();

	/**
	 * 根据 菜单名称获取 菜单资源信息
	 * 
	 * @param names
	 * @return
	 */


	/**
	 * 获取菜单列表
	 * 
	 * @param names
	 * @return
	 */
	public List<SysPage> getMenuByNames(List<String> names);

}
