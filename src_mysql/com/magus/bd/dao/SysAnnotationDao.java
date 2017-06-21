package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.SysAnotation;

public interface SysAnnotationDao {
	/**
	 * 按条件获取批注信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<SysAnotation> getAnnotation(SysAnotation bean);
	
	public int getAnnotationCount(SysAnotation bean);
	/**
	 * 添加批注信息
	 * 
	 * @param user
	 * @return
	 */
	public int addAnotation(SysAnotation bean);
	/**
	 * 根据id查批注信息
	 */
	public SysAnotation getAnnotationById(int id);
	/**
	 * 更新批注信息
	 */
	public int editAnnotation(SysAnotation bean);
	
	public int removeAnotation(String id);
	
	
}
