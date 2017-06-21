package com.magus.bd.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.ResQuotaParameterDao;
import com.magus.bd.entity.ResQuotaParameter;
import com.magus.bd.service.ResQuotaParameterService;

@Service("quotaParameterService")
public class ResQuotaParameterServiceImpl implements ResQuotaParameterService {
	private ResQuotaParameterDao mapper;

	public ResQuotaParameterDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResQuotaParameterDao mapper) {
		this.mapper = mapper;
	}

	public List<ResQuotaParameter> getQuotaParameter() {
		return mapper.getQuotaParameter();
	}

	public int updateQuotaParameter(Map<String, Float> maps) {
		List<ResQuotaParameter> beans = mapper.getQuotaParameter();
		for (ResQuotaParameter bean : beans) {
			bean.setParameter(maps.get(bean.getEname()));
			int flag = mapper.updateQuotaParameter(bean);
			if (flag != 1) {
				return -1;
			}
		}
		return 0;
	}

	public boolean setQuotaParameter(ResQuotaParameter bean) {
		
		if(mapper.setQuotaParameter(bean)>0){
			return true;
		}else{
			return false;
		}
	}

	public ResQuotaParameter getQuotaParameterById(String id) {
		return mapper.getQuotaParameterById(id);
	}
}
