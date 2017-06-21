package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.ResBaseInfo;
import com.magus.bd.entity.SysPage;

public interface ResBaseInfoService {

	/**
	 * 模糊查询 企业信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResBaseInfo> blurryBaseInfo(ResBaseInfo bean);

	/**
	 * 获取满足添加的总个数
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int blurryCount(ResBaseInfo bean);

	/**
	 * 添加企业
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int addBaseInfo(ResBaseInfo bean);

	/**
	 * 更新企业
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int updateBaseInfo(ResBaseInfo bean);

	/**
	 * 根据 id 获取企业信息
	 * 
	 * @param id
	 * @return
	 */
	public abstract ResBaseInfo getBaseInfoById(int id);

	/**
	 * 获取符合条件的十个
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResBaseInfo> getTopTen(ResBaseInfo bean);

}
