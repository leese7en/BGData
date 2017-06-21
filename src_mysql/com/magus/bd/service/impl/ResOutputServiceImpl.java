package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.ResOutputDao;
import com.magus.bd.entity.ResOutput;
import com.magus.bd.service.ResOutputService;

@Service
public class ResOutputServiceImpl implements ResOutputService{

	@Autowired
	private ResOutputDao mapper;
	
	public List<ResOutput> getResOutputByPSCode(ResOutput bean) {
		
		return mapper.getResOutputByPSCode(bean);
	}
	public List<ResOutput> getResOutputCodeByPSCode(ResOutput bean) {
		
		return mapper.getResOutputCodeByPSCode(bean);
	}
	
	

}
