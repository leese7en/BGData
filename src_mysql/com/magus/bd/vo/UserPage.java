package com.magus.bd.vo;

public class UserPage {

	private int id;
	private int pId;
	private String name;
	private boolean open = false;
	private String icon;
	private String path;

	public UserPage(int id, int pId, String name, String icon, String path) {
		this.id = id;
		this.pId = pId;
		this.name = name;
		this.icon = icon;
		this.path = path;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getpId() {
		return pId;
	}

	public void setpId(int pId) {
		this.pId = pId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public boolean isOpen() {
		return open;
	}

	public void setOpen(boolean open) {
		this.open = open;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String toString() {
		return "名称:" + this.name + "  path:" + this.path + "  图标:" + this.icon;
	}
}
