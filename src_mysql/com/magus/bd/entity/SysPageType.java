package com.magus.bd.entity;

public class SysPageType extends Pagination {

	private int pageTypeId;
	private String typeName;
	private String description;
	private int isEnable;
	private int isDeleted;

	public int getPageTypeId() {
		return pageTypeId;
	}

	public void setPageTypeId(int pageTypeId) {
		this.pageTypeId = pageTypeId;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(int isEnable) {
		this.isEnable = isEnable;
	}

	public int getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(int isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String toString() {
		return "上级菜单:" + this.pageTypeId + "  名称:" + this.typeName;
	}
}
