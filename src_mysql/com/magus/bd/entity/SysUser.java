package com.magus.bd.entity;

public class SysUser extends Pagination {

	private int userId;
	private String userName;
	private String jobNo;
	private String password;
	private String description;
	private int isSystem;
	private int idDeleted;
	private String email;
	private String emergencyPhone;
	private String phone;
	private String createDate;

	private String beginTime;
	private String endTime;

	private String unvileableDate;
	private int isUnvileable;
	private int deptId;
	private String deptName;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getJobNo() {
		return jobNo;
	}

	public void setJobNo(String jobNo) {
		this.jobNo = jobNo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getIsSystem() {
		return isSystem;
	}

	public void setIsSystem(int isSystem) {
		this.isSystem = isSystem;
	}

	public int getIdDeleted() {
		return idDeleted;
	}

	public void setIdDeleted(int idDeleted) {
		this.idDeleted = idDeleted;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmergencyPhone() {
		return emergencyPhone;
	}

	public void setEmergencyPhone(String emergencyPhone) {
		this.emergencyPhone = emergencyPhone;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}

	public String getUnvileableDate() {
		return unvileableDate;
	}

	public void setUnvileableDate(String unvileableDate) {
		this.unvileableDate = unvileableDate;
	}

	public int getIsUnvileable() {
		return isUnvileable;
	}

	public void setIsUnvileable(int isUnvileable) {
		this.isUnvileable = isUnvileable;
	}

	public int getDeptId() {
		return deptId;
	}

	public void setDeptId(int deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String toString() {
		return "用户名:" + this.userName + "  密码:" + this.password + " 创建日期：" + this.createDate;
	}
}
