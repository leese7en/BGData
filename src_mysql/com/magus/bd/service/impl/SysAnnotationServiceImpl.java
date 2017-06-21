package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.SysAnnotationDao;
import com.magus.bd.dao.SysCityDao;
import com.magus.bd.entity.IndustryGroup;
import com.magus.bd.entity.SysAnotation;
import com.magus.bd.entity.SysCity;
import com.magus.bd.entity.ZoneCity;
import com.magus.bd.service.SysAnnotationService;
import com.magus.bd.service.SysCityService;

@Service("annotationService")
public class SysAnnotationServiceImpl implements SysAnnotationService {
	private SysAnnotationDao mapper;

	public SysAnnotationDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(SysAnnotationDao mapper) {
		this.mapper = mapper;
	}

	public List<SysAnotation> getAnnotation(SysAnotation bean) {

		return mapper.getAnnotation(bean);
	}
	
	public int addAnotation(SysAnotation bean) {
		return mapper.addAnotation(bean);
	}
	
	public SysAnotation getAnnotationById(int id) {
		return mapper.getAnnotationById(id);
	}
	
	public boolean editAnnotation(SysAnotation bean) {
		if (mapper.editAnnotation(bean) > 0) {
			return true;
		} else {
			return false;
		}
	}

	public boolean removeAnotation(String id) {
		if(mapper.removeAnotation(id)>0){
			return true;
		}else{
			return false;
		}
	}

	public int getAnnotationCount(SysAnotation bean) {
		
		return mapper.getAnnotationCount(bean);
	}
}
