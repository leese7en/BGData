package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Program;
import com.magus.bd.vo.UserProgram;

public interface ProgramService {
	/**
	 * 或去当前名称是否已经有方案了
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int getCountByProgramHeading(Program bean);

	/**
	 * 获取用户名下的方案
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<Program> getProgram(Program bean);

	/**
	 * 获取 对应方案的明细信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getProgramInfo(Program bean);

	/**
	 * 或去当前名称是否已经有方案了
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int getCountByProgramBackHeading(Program bean);

	/**
	 * 获取用户 名下的逆推方案
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<Program> getProgramBack(Program bean);

	/**
	 * 获取 超低排放 逆推信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getProgramBackInfo(Program bean);

	/**
	 * 添加 方案
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int addProgram(UserProgram bean, String[] years);

	/**
	 * 更新方案
	 * 
	 * @param bean
	 * @param years
	 * @return
	 */
	public abstract int updateProgram(UserProgram bean, String[] years);

	/**
	 * 方案 导出
	 * 
	 * @param bean
	 * @param years
	 * @return
	 */
	public abstract String exportProgram(UserProgram bean, String[] years);

	/**
	 * 获取预览的数据
	 * 
	 * @param object
	 * @return
	 */
	public abstract JSONObject previewProgram(JSONObject changePowerUnit, JSONObject closePowerUnit,
			JSONObject newPowerUnit, String pollType, String[] years);

	/**
	 * 获取超低排放的预览数据
	 * 
	 * @param object
	 * @return
	 */
	public abstract JSONObject previewProgramBack(JSONObject changePowerUnit, JSONObject closePowerUnit,
			String pollType, String[] years);

	/**
	 * 超低排放方案 添加
	 * 
	 * @param object
	 * @return
	 */
	public abstract int addProgramBack(UserProgram bean, String[] years);

	/**
	 * 更新逆推方案
	 * 
	 * @param bean
	 * @param years
	 * @return
	 */
	public abstract int updateProgramBack(UserProgram bean, String[] years);

	/**
	 * 超低排放方案 导出
	 * 
	 * @param object
	 * @return
	 */
	public abstract String exportProgramBack(UserProgram bean, String[] years);

}
