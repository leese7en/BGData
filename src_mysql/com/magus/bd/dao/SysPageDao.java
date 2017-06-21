package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.SysPage;

public interface SysPageDao extends BaseDao {

	/**
	 * 根据用户名获得用户信息
	 * 
	 * @param phone
	 * @return
	 */
	public List<SysPage> blurryPage(SysPage page);

	public int blurryPageCount(SysPage page);

	/**
	 * 获取所有父级菜单
	 * 
	 * @return
	 */
	public List<SysPage> getAllPrePage();

	/**
	 * 获取所有可用菜单
	 * 
	 * @return
	 */
	public List<SysPage> getAllPage();

	/**
	 * 获取可以绑定给用户的菜单
	 * 
	 * @return
	 */
	public List<SysPage> getUserPage();

	/**
	 * 根据 ids 查询菜单信息
	 * 
	 * @param ids
	 * @return
	 */
	public List<SysPage> getUserPageByIds(List<Integer> ids);

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	public int addPage(SysPage page);

	/**
	 * 删除用户
	 * 
	 * @param id
	 * @return
	 */
	public int removePage(int id);

	/**
	 * 更新用户
	 * 
	 * @param user
	 * @return
	 */
	public int editPage(SysPage page);

	/**
	 * 根据id获取
	 * 
	 * @param id
	 * @return
	 */
	public SysPage getPageById(SysPage bean);

	/**
	 * 获取同一级目录下是否有相同的名称
	 * 
	 * @param bean
	 * @return
	 */
	public Integer getPageByName(SysPage bean);

}
