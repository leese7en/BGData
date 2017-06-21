package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.ResEffectiveDao;
import com.magus.bd.entity.ResEffective;
import com.magus.bd.service.ResEffectiveService;

@Service("effectiveService")
public class ResEffectiveServiceImpl implements ResEffectiveService {
	private ResEffectiveDao mapper;

	public ResEffectiveDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResEffectiveDao mapper) {
		this.mapper = mapper;
	}

	public List<ResEffective> getEffectiveYear(ResEffective bean) {
		return mapper.getEffectiveYear(bean);
	}

}
