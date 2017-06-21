package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.ResBaseInfoDao;
import com.magus.bd.entity.ResBaseInfo;
import com.magus.bd.service.ResBaseInfoService;

@Service("baseInfoService")
public class ResBaseInfoServiceImpl implements ResBaseInfoService {
	private ResBaseInfoDao mapper;

	public ResBaseInfoDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResBaseInfoDao mapper) {
		this.mapper = mapper;
	}

	public int addBaseInfo(ResBaseInfo bean) {
		return 0;
	}

	public List<ResBaseInfo> blurryBaseInfo(ResBaseInfo bean) {
		List<ResBaseInfo> beans = new ArrayList<ResBaseInfo>();
		List<ResBaseInfo> baseInfos = mapper.blurryBaseInfo(bean);
		//格式化时间
		for(ResBaseInfo baseInfo : baseInfos){
			baseInfo.setRunDate(baseInfo.getRunDate().substring(0,19));
			baseInfo.setUpdateTime(baseInfo.getUpdateTime().substring(0, 19));
			beans.add(baseInfo);
		}
		return beans;
	}

	public int blurryCount(ResBaseInfo bean) {
		return mapper.blurryCount(bean);
	}

	public ResBaseInfo getBaseInfoById(int id) {
		return null;
	}

	public int updateBaseInfo(ResBaseInfo bean) {
		return 0;
	}

	public List<ResBaseInfo> getTopTen(ResBaseInfo bean) {
		return mapper.getTopTen(bean);
	}

}
