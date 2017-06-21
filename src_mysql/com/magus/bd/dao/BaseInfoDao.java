package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResBaseInfo;

public interface BaseInfoDao extends BaseDao {

	/**
	 * 模糊查询 企业信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResBaseInfo> blurryBaseInfo(ResBaseInfo bean);

	/**
	 * 获取满足添加的总个数
	 * 
	 * @param bean
	 * @return
	 */
	public int blurryCount(ResBaseInfo bean);

	/**
	 * 添加企业
	 * 
	 * @param bean
	 * @return
	 */
	public int addBaseInfo(ResBaseInfo bean);

	/**
	 * 更新企业
	 * 
	 * @param bean
	 * @return
	 */
	public int updateBaseInfo(ResBaseInfo bean);

	/**
	 * 根据 id 获取企业信息
	 * 
	 * @param id
	 * @return
	 */
	public ResBaseInfo getBaseInfoById(int id);

	/**
	 * 获取符合条件的十个
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResBaseInfo> getTopTen(ResBaseInfo bean);
}
