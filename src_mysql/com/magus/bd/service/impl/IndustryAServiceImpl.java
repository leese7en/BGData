package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.IndustryADao;
import com.magus.bd.dao.ResHotwordDao;
import com.magus.bd.entity.IndustryA;
import com.magus.bd.entity.ResHotword;
import com.magus.bd.service.IndustryAService;
import com.magus.bd.service.ResHotwordService;
import com.magus.bd.utils.HotwordUtils;

@Service("IndustryAService")
public class IndustryAServiceImpl implements IndustryAService {
	private IndustryADao mapper;

	public IndustryADao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(IndustryADao mapper) {
		this.mapper = mapper;
	}

	public List<IndustryA> getIndustryAByAlarmLogId(IndustryA bean) {
		return mapper.getIndustryAByAlarmLogId(bean);
	}
	
	public List<IndustryA> queryIndustryA(IndustryA bean) {
		return mapper.queryIndustryA(bean);
	}
	
	public int queryIndustryACount(IndustryA bean) {
		return mapper.queryIndustryACount(bean);
	}
}
