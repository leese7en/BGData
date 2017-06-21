package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.SysPage;

public interface PageService {

	/**
	 * 获取全部用户信息
	 * 
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
	 * 添加
	 * 
	 * @param user
	 * @return
	 */
	public int addPage(SysPage page);

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	public boolean removePage(int id);

	/**
	 * 更新
	 * 
	 * @param
	 * @return
	 */
	public JSONObject editPage(SysPage page);

	/**
	 * 根据id获取用户
	 * 
	 * @param id
	 * @return
	 */
	public SysPage getPageById(SysPage bean);

	/**
	 * 根据id获取用户
	 * 
	 * @param id
	 * @return
	 */
	public Integer getPageByName(SysPage bean);

}
