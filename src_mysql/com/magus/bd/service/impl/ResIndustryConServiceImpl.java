package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.ResIndustryConDao;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.SysAnotation;
import com.magus.bd.entity.SysUser;
import com.magus.bd.service.ResIndustryConService;
import com.magus.bd.utils.ResIndustryUtils;

@Service("industryService")
public class ResIndustryConServiceImpl implements ResIndustryConService {
	private ResIndustryConDao mapper;

	public ResIndustryConDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResIndustryConDao mapper) {
		this.mapper = mapper;
	}

	public JSONObject getIndustryPollByPoll(ResIndustryCon bean, String viewPoint, String pollType) {
		List<ResIndustryCon> beans = null;
		List<ResIndustryCon> beans2 = null;
		if ("city".equals(viewPoint)) {
			beans2 = mapper.getAnotationPositionByCity(bean);
			beans = mapper.getIndustryPollByCity(bean);
			
		} else {
			beans = mapper.getIndustryPollByGroup(bean);
			beans2 = mapper.getAnotationPositionByGroup(bean);
		}
		JSONObject object = ResIndustryUtils.formatIndustryInfo(beans, viewPoint, pollType,beans2);
		return object;
	}
	
//	public JSONObject getAnotationByPoll(ResIndustryCon bean, String viewPoint, String pollType) {
//		List<ResIndustryCon> beans = null;
//		if ("city".equals(viewPoint)) {
//			beans = mapper.getAnotationPositionByCity(bean);
//		} else {
//			beans = mapper.getAnotationPositionByGroup(bean);
//		}
//		JSONObject object = ResIndustryUtils.formatIndustryInfo(beans, viewPoint, pollType);
//		return object;
//	}

	public JSONObject getIndustrySulfurYear(ResIndustryCon bean) {
		List<ResIndustryCon> beans = mapper.getIndustrySulfurYear(bean);
		List<ResIndustryCon> beans2 = mapper.getIndustryPositionSulfurYear(bean);
		JSONObject object = ResIndustryUtils.formatIndustrySulfurYear(beans, Integer.parseInt(bean.getBeginTime()),
				Integer.parseInt(bean.getEndTime()),beans2);
		return object;
	}
	
	public List<SysAnotation> getAnnotationByYearAndMonth(SysAnotation bean) {
		List<SysAnotation> beans = mapper.getAnnotationByYearAndMonth(bean);
		return beans;
	}
/*	public JSONObject getIndustryPositionSulfurYear(ResIndustryCon bean) {
		List<ResIndustryCon> beans = mapper.getIndustryPositionSulfurYear(bean);
		JSONObject object = ResIndustryUtils.formatIndustrySulfurYear(beans, Integer.parseInt(bean.getBeginTime()),
				Integer.parseInt(bean.getEndTime()));
		return object;
	}*/

	public JSONObject getIndustrySulfurMonth(ResIndustryCon bean, String viewPoint) {
		List<ResIndustryCon> beans = null;
		if ("city".equals(viewPoint)) {
			beans = mapper.getIndustrySulfurByCity(bean);
		} else {
			beans = mapper.getIndustrySulfurByGroup(bean);
		}
		JSONObject object = ResIndustryUtils.formatIndustrySulfurMonth(beans, viewPoint, Integer.parseInt(bean
				.getBeginTime()), Integer.parseInt(bean.getEndTime()));
		return object;
	}

	public List<ResIndustryCon> getIndurutyConByEnterprise(ResIndustryCon bean) {
		List<ResIndustryCon> beans = ResIndustryUtils.formatIndurutyEnterprise(mapper.getIndurutyConByEnterprise(bean));
		return beans;
	}

	public List<SysAnotation> getGroupOrCityAnnotationById(SysAnotation bean) {
		List<SysAnotation> beans=null;
		beans = mapper.getGroupOrCityAnnotationById(bean);
		return beans;
	}
	
}
