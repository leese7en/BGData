package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.ResConsumeDao;
import com.magus.bd.entity.ResConsume;
import com.magus.bd.service.ResConsumeService;

@Service("resConsumeService")
public class ResConsumeServiceImpl implements ResConsumeService {
	private ResConsumeDao mapper;

	public ResConsumeDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResConsumeDao mapper) {
		this.mapper = mapper;
	}

	public List<ResConsume> getConsumeInfo(ResConsume bean) {
		return mapper.getConsumeInfo(bean);
	}

}
