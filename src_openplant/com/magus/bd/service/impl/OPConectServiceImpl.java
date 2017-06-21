package com.magus.bd.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.OPConnectInfoDao;
import com.magus.bd.entity.OPConnectInfo;
import com.magus.bd.service.OPConectService;

@Service("opConnectService")
public class OPConectServiceImpl implements OPConectService {

	private OPConnectInfoDao mapper;

	public OPConnectInfoDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(OPConnectInfoDao mapper) {
		this.mapper = mapper;
	}

	/**
	 * 获取配置信息
	 */
	public OPConnectInfo getOPConnectInfo() {

		return mapper.getOPConnectInfo();
	}

	/**
	 * 保存配置信息
	 */
	public Boolean setOPConnectInfo(OPConnectInfo opConnectInfo) {

		if (mapper.setOPConnectInfo(opConnectInfo) > 0) {
			return true;
		} else {
			return false;
		}
	}
}
