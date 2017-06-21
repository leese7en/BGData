package com.magus.bd.entity;

public class UserLoginLog {

	private int logId;
	private int serialnumberId;
	private int userId;
	private String ipAddress;
	private String loginTime;

	public int getLogId() {
		return logId;
	}

	public void setLogId(int logId) {
		this.logId = logId;
	}

	public int getSerialnumberId() {
		return serialnumberId;
	}

	public void setSerialnumberId(int serialnumberId) {
		this.serialnumberId = serialnumberId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getIpAddress() {
		return ipAddress;
	}

	public void setIpAddress(String ipAddress) {
		this.ipAddress = ipAddress;
	}

	public String getLoginTime() {
		return loginTime;
	}

	public void setLoginTime(String loginTime) {
		this.loginTime = loginTime;
	}

	public String toString() {
		return "ID:" + this.serialnumberId + "  UserID:" + this.userId
				+ "  IP：" + this.ipAddress;
	}
}
