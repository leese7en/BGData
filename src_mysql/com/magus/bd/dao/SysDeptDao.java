package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.SysDept;

public interface SysDeptDao extends BaseDao {

	/**
	 * 根据用户名获得用户信息
	 * 
	 * @param phone
	 * @return
	 */
	public List<SysDept> blurryDept(SysDept dept);

	/**
	 * 获取所有可用的dept
	 * 
	 * @return
	 */
	public List<SysDept> getAllDept();

	/**
	 * 添加用户
	 * 
	 * @param user
	 * @return
	 */
	public int addDept(SysDept dept);

	/**
	 * 删除用户
	 * 
	 * @param id
	 * @return
	 */
	public int deleteDept(SysDept dept);

	/**
	 * 更新用户
	 * 
	 * @param user
	 * @return
	 */
	public int updateDept(SysDept dept);

	/**
	 * 根据id获取用户
	 * 
	 * @param id
	 * @return
	 */
	public SysDept getDeptById(SysDept dept);

	/**
	 * 获取相同名称的数据
	 * 
	 * @param dept
	 * @return
	 */
	public int getDeptByName(SysDept dept);

	/**
	 * 获取孩子个数
	 * 
	 * @param dept
	 * @return
	 */
	public int getDeptChild(SysDept dept);

	/**
	 * 当前部门是否在使用中
	 * 
	 * @param dept
	 * @return
	 */
	public int getDeptInUse(SysDept dept);
}
