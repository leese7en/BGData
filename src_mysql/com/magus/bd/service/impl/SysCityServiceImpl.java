package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.SysCityDao;
import com.magus.bd.entity.IndustryGroup;
import com.magus.bd.entity.SysCity;
import com.magus.bd.entity.ZoneCity;
import com.magus.bd.service.SysCityService;

@Service("cityService")
public class SysCityServiceImpl implements SysCityService {
	private SysCityDao mapper;

	public SysCityDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(SysCityDao mapper) {
		this.mapper = mapper;
	}

	public boolean addCity(SysCity bean) {
		if (mapper.addCity(bean) == 1) {
			return true;
		}
		return false;
	}

	public List<SysCity> getCity() {
		return mapper.getCity();
	}

	public List<SysCity> getIndustryCity() {
		return mapper.getIndustryCity();
	}

	public boolean deleteCity(int id) {

		if (mapper.deleteCity(id) > 0) {
			return true;
		} else {
			return false;
		}
	}

	public SysCity getCityById(String id) {

		return mapper.getCityById(id);
	}

	public List<SysCity> queryCity(SysCity bean) {

		return mapper.queryCity(bean);
	}

	public boolean editCity(SysCity bean) {

		if (mapper.editCity(bean) > 0) {
			return true;
		} else {
			return false;
		}
	}

	public List<IndustryGroup> getIndustryGroup() {
		return mapper.getIndustryGroup();
	}

	public List<ZoneCity> getZoneCity() {
		return mapper.getZoneCity();
	}

}
