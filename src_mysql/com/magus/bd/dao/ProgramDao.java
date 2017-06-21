package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.Program;

public interface ProgramDao extends BaseDao {
	/**
	 * 或去当前名称是否已经有方案了
	 * 
	 * @param bean
	 * @return
	 */
	public int getCountByProgramHeading(Program bean);

	/**
	 * 获取用户名下的方案
	 * 
	 * @param bean
	 * @return
	 */
	public List<Program> getProgram(Program bean);

	/**
	 * 根据 方案编码获取方案 主表信息
	 * 
	 * @param bean
	 * @return
	 */
	public Program getProgramParent(Program bean);

	/**
	 * 获取 二级子表信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<Program> getProgramDetail(Program bean);

	/**
	 * 获取三级子表信息
	 * 
	 * @param programDetailIds
	 * @return
	 */
	public List<Program> getProgramDetails(List<Integer> programDetailIds);

	/**
	 * 删除方案明细
	 * 
	 * @param bean
	 * @return
	 */
	public int deleteProgramDetail(Program bean);

	/**
	 * 删除 方案 对应的 第三张表
	 * 
	 * @param programDetailIds
	 * @return
	 */
	public int deleteProgramDetails(List<Integer> programDetailIds);

	/**
	 * 或去当前名称是否已经有方案了
	 * 
	 * @param bean
	 * @return
	 */
	public int getCountByProgramBackHeading(Program bean);

	/**
	 * 获取用户名下的 逆推方案
	 * 
	 * @param bean
	 * @return
	 */

	public List<Program> getProgramBack(Program bean);

	/**
	 * 根据 逆推方案编码获取方案 主表信息
	 * 
	 * @param bean
	 * @return
	 */
	public Program getProgramBackParent(Program bean);

	/**
	 * 获取 逆推方案二级子表信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<Program> getProgramBackDetail(Program bean);

	/**
	 * 获取逆推方案三级子表信息
	 * 
	 * @param programDetailIds
	 * @return
	 */
	public List<Program> getProgramBackDetails(List<Integer> programDetailIds);

	/**
	 * 删除逆推方案明细
	 * 
	 * @param bean
	 * @return
	 */
	public int deleteProgramBackDetail(Program bean);

	/**
	 * 删除 逆推方案 对应的 第三张表
	 * 
	 * @param programDetailIds
	 * @return
	 */
	public int deleteProgramBackDetails(List<Integer> programDetailIds);

	/**
	 * 添加 方案
	 * 
	 * @param bean
	 * @return
	 */
	public int addProgram(Program bean);

	/**
	 * 添加 方案明细信息
	 * 
	 * @param beans
	 * @return
	 */
	public int addProgramDetail(Program bean);

	/**
	 * 添加方案 年度电厂信息
	 * 
	 * @param bean
	 * @return
	 */
	public int addProgramDetails(List<Program> bean);

	/**
	 * 添加 方案 逆推
	 * 
	 * @param bean
	 * @return
	 */
	public int addProgramBack(Program bean);

	/**
	 * 添加 方案明细信息 逆推
	 * 
	 * @param beans
	 * @return
	 */
	public int addProgramBackDetail(Program beans);

	/**
	 * 添加方案 年度电厂信息 逆推
	 * 
	 * @param bean
	 * @return
	 */
	public int addProgramBackDetails(List<Program> bean);

}
