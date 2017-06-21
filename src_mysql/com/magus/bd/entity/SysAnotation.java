package com.magus.bd.entity;

public class SysAnotation {
	
	private String id;
	private int pollOrSulfur;
	private int groupOrCity;
	private String groupIdOrCityId;
	private String year;
	private String month;
	private String content;
	private String createDate;
	private int isDelete;
	private String name;
	private String beginTime;
	private String endTime;
	private String annotationUserId;
	private String userName;
	private String groupName;
	private String cityName;
	private String pollutant;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public int getPollOrSulfur() {
		return pollOrSulfur;
	}
	public void setPollOrSulfur(int pollOrSulfur) {
		this.pollOrSulfur = pollOrSulfur;
	}
	public int getGroupOrCity() {
		return groupOrCity;
	}
	public void setGroupOrCity(int groupOrCity) {
		this.groupOrCity = groupOrCity;
	}

	public String getGroupIdOrCityId() {
		return groupIdOrCityId;
	}
	public void setGroupIdOrCityId(String groupIdOrCityId) {
		this.groupIdOrCityId = groupIdOrCityId;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	
	public int getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
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
	public String getAnnotationUserId() {
		return annotationUserId;
	}
	public void setAnnotationUserId(String annotationUserId) {
		this.annotationUserId = annotationUserId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getPollutant() {
		return pollutant;
	}
	public void setPollutant(String pollutant) {
		this.pollutant = pollutant;
	}
	
}
