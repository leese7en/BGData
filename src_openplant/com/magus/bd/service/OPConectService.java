package com.magus.bd.service;

import com.magus.bd.entity.OPConnectInfo;

public interface OPConectService {
	/**
	 * 得到连接信息
	 * @return
	 */
	
	public OPConnectInfo getOPConnectInfo();
	
	/**
	 * 设置连接
	 * @param opConnectInfo
	 * @return
	 */
	public Boolean setOPConnectInfo(OPConnectInfo opConnectInfo);
}
