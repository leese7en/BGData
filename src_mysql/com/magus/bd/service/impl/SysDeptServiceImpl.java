package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.SysDeptDao;
import com.magus.bd.entity.SysDept;
import com.magus.bd.service.SysDeptService;

@Service("deptService")
public class SysDeptServiceImpl implements SysDeptService {
	private SysDeptDao mapper;

	public SysDeptDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(SysDeptDao mapper) {
		this.mapper = mapper;
	}

	public int addDept(SysDept dept) {
		return mapper.addDept(dept);
	}

	public List<SysDept> blurryDept(SysDept dept) {
		return mapper.blurryDept(dept);
	}

	public List<SysDept> getAllDept() {
		return mapper.getAllDept();
	}

	public SysDept getDeptById(SysDept bean) {
		return mapper.getDeptById(bean);
	}

	public int deleteDept(SysDept bean) {
		return mapper.deleteDept(bean);
	}

	public int updateUser(SysDept dept) {
		return mapper.updateDept(dept);
	}

	public int getDeptByName(SysDept dept) {
		return mapper.getDeptByName(dept);
	}

	public int getDeptChild(SysDept dept) {
		return mapper.getDeptChild(dept);
	}

	public int getDeptInUse(SysDept dept) {
		return mapper.getDeptInUse(dept);
	}

	public int updateDept(SysDept dept) {
		return mapper.updateDept(dept);
	}

}
