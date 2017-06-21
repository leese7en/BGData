package com.magus.bd.dao;

import com.magus.bd.entity.OPConnectInfo;

public interface OPConnectInfoDao extends BaseDao {

	/**
	 * 获得配置信息
	 * 
	 * @return
	 */

	public OPConnectInfo getOPConnectInfo();

	/**
	 * 保存配置信息
	 * 
	 * @param opConnectInfo
	 * @return
	 */

	public int setOPConnectInfo(OPConnectInfo opConnectInfo);
}
