package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResSuperlowFullView;
import com.magus.bd.entity.ResSuperlowFullViewInfo;

public interface ResSuperlowFullViewDao extends BaseDao {
	/**
	 * 获取所有机组
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResSuperlowFullView> getPowerUnit(ResSuperlowFullView bean);

	/**
	 * 获取方案信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResSuperlowFullView> getProgramPowerUnit(ResSuperlowFullView bean);

	/**
	 * 获取周期内的大事
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResSuperlowFullViewInfo> getFullViewInfo(ResSuperlowFullViewInfo bean);

	/**
	 * 获取2015年以后的排放信息
	 * 
	 * @param pollType
	 * @return
	 */
	public List<ResSuperlowFullView> getPowerUnitEmissionInfo(String pollType);

	/**
	 * 插入方案信息
	 * 
	 * @param bean
	 * @return
	 */
	public int insertResSuperlowFullView(ResSuperlowFullView bean);

	/**
	 * 插入方案明细表信息
	 * 
	 * @param beans
	 * @return
	 */
	public int insertResSuperlowFullViewDetail(List<ResSuperlowFullView> beans);

	/**
	 * 根据方案名称 获取方案个数
	 * 
	 * @param beans
	 * @return
	 */
	public int getCountByName(ResSuperlowFullView bean);

	/**
	 * 获取满足查询条件的数据
	 * 
	 * @param bean
	 * @return
	 */

	public List<ResSuperlowFullView> queryProgramInfo(ResSuperlowFullView bean);

	/**
	 * 根据电厂编号和机组编码
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int getCountPowerInfo(ResSuperlowFullView bean);

	/**
	 * 添加机组
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int insertPowerInfo(ResSuperlowFullView bean);

	/**
	 * 删除全景方案
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int deleteProgramFullView(ResSuperlowFullView bean);

	/**
	 * 获取方案信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract ResSuperlowFullView getProgramFullViewInfo(ResSuperlowFullView bean);

	/**
	 * 删除方案下明细
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int deleteProgramFullViewDetail(ResSuperlowFullView bean);

	/**
	 * 更新方案信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int updateProgramFullView(ResSuperlowFullView bean);

	/**
	 * 获取机组信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResSuperlowFullView> queryPowerUnitInfo(ResSuperlowFullView bean);

	/**
	 * 根据Id 获取机组信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract ResSuperlowFullView queryPowerUnitInfoById(ResSuperlowFullView bean);

	/**
	 * 删除电厂机组
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int deletePowerUnitInfo(ResSuperlowFullView bean);

	/**
	 * 更新机组信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int updatePowerUnitInfo(ResSuperlowFullView bean);

}
