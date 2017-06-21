package com.magus.bd.entity;

import java.util.List;

public class SysDept {

	private int deptId;
	private int preDeptId;
	private String deptName;
	private String description;
	private int isDeleted;
	private List<SysDept> children;

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public int getPreDeptId() {
		return preDeptId;
	}

	public void setPreDeptId(int preDeptId) {
		this.preDeptId = preDeptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}

	public List<SysDept> getChildren() {
		return children;
	}

	public void setChildren(List<SysDept> children) {
		this.children = children;
	}
}
