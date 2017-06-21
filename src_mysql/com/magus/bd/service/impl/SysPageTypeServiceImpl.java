package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.SysPageTypeDao;
import com.magus.bd.entity.SysPageType;
import com.magus.bd.global.GlobalPara;
import com.magus.bd.service.PageTypeService;

@Service("pageTypeService")
public class SysPageTypeServiceImpl implements PageTypeService {
	private SysPageTypeDao mapper;

	public SysPageTypeDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(SysPageTypeDao mapper) {
		this.mapper = mapper;
	}

	public int addPageType(SysPageType bean) {
		return mapper.addPageType(bean);
	}

	public JSONObject blurryPageType(SysPageType bean) {
		JSONObject obj = new JSONObject();
		List<SysPageType> beans = mapper.blurryPageType(bean);
		if (beans != null && beans.size() > 0) {
			int count = mapper.blurryPageTypeCount(bean);
			obj.put(GlobalPara.rows, beans);
			obj.put(GlobalPara.total, count);
		}else{
			obj.put(GlobalPara.rows, beans);
			obj.put(GlobalPara.total, 0);
		}
		return obj;
	}

	public int getPageTypeByName(SysPageType bean) {
		return mapper.getPageTypeByName(bean);
	}

	public List<SysPageType> getAllPageType() {
		return mapper.getAllPageType();
	}

	public SysPageType getPageTypeById(int id) {
		return mapper.getPageTypeById(id);
	}

	public boolean removePageType(int id) {
		if (mapper.removePageType(id) > 0) {
			return true;
		} else {
			return false;
		}
	}

	public int getPageTypeInUse(int id) {
		return mapper.getPageTypeInUse(id);
	}

	public int updatePageType(SysPageType bean) {
		return mapper.updatePageType(bean);
	}

}
