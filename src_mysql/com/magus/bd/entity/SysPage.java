package com.magus.bd.entity;

import java.util.List;

public class SysPage {

	private int pageId;
	private int prePageId;
	private String levelCode;
	private String pageName;
	private String url;
	private String description;
	private int isDeleted;
	private String imgSrc;
	private String icon;
	private String orderCode;
	private int pageTypeId;
	private int isEnable;

	private int id;
	private String text;
	private List<SysPage> children;

	private int pageNumber;
	private int pageSize;

	private int isRecursion = 0;

	public int getPageId() {
		return pageId;
	}

	public void setPageId(int pageId) {
		this.pageId = pageId;
	}

	public int getPrePageId() {
		return prePageId;
	}

	public void setPrePageId(int prePageId) {
		this.prePageId = prePageId;
	}

	public String getLevelCode() {
		return levelCode;
	}

	public void setLevelCode(String levelCode) {
		this.levelCode = levelCode;
	}

	public String getPageName() {
		return pageName;
	}

	public void setPageName(String pageName) {
		this.pageName = pageName;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
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

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getOrderCode() {
		return orderCode;
	}

	public void setOrderCode(String orderCode) {
		this.orderCode = orderCode;
	}

	public String getImgSrc() {
		return imgSrc;
	}

	public void setImgSrc(String imgSrc) {
		this.imgSrc = imgSrc;
	}

	public int getPageTypeId() {
		return pageTypeId;
	}

	public void setPageTypeId(int pageTypeId) {
		this.pageTypeId = pageTypeId;
	}

	public int getIsEnable() {
		return isEnable;
	}

	public void setIsEnable(int isEnable) {
		this.isEnable = isEnable;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public List<SysPage> getChildren() {
		return children;
	}

	public void setChildren(List<SysPage> children) {
		this.children = children;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getIsRecursion() {
		return isRecursion;
	}

	public void setIsRecursion(int isRecursion) {
		this.isRecursion = isRecursion;
	}

	public String toString() {
		return "上级菜单:" + this.prePageId + "  url:" + this.url + "  名称:" + this.pageName;
	}
}
