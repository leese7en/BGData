package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResSuperlowFullView;

public interface ResSuperlowFullViewService {
	/**
	 * 在展示的时候获取机组信息的分布信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getPowerUnitInfo(ResSuperlowFullView bean);

	/**
	 * 超低排放全景图 之概况
	 * 
	 * @param change
	 * @param close
	 * @param news
	 * @param pollCode
	 * @param cityInfo
	 * @return
	 */
	public abstract JSONObject previewSuperlowFullView(JSONArray change, JSONArray close, JSONArray news, String pollCode, String cityInfo);

	/**
	 * 超低排放全景图之明细信息
	 * 
	 * @param change
	 * @param close
	 * @param news
	 * @param pollCode
	 * @param cityInfo
	 * @return
	 */
	public abstract JSONObject previewSuperlowFullViewDetail(JSONArray change, JSONArray close, JSONArray news, String pollCode, String cityInfo);

	/**
	 * 导出全景方案
	 * 
	 * @param change
	 * @param close
	 * @param news
	 * @param pollCode
	 * @return
	 */
	public abstract JSONObject exportSuperlowFullView(ResSuperlowFullView bean, JSONArray change, JSONArray close, JSONArray news, String cityInfo);

	/**
	 * 保存方案信息
	 * 
	 * @param bean
	 * @param change
	 * @param close
	 * @param news
	 * @return
	 */
	public abstract int saveSuperlowFullView(ResSuperlowFullView bean, JSONArray change, JSONArray close, JSONArray news);

	/**
	 * 根据方案名称获取 方案个数
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int getCountByName(ResSuperlowFullView bean);

	/**
	 * 获取满足条件的数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResSuperlowFullView> queryProgramInfo(ResSuperlowFullView bean);

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
