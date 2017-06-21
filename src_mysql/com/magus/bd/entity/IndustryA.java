package com.magus.bd.entity;

public class IndustryA {
	private String alarmLogId;
	private String cityId;
	private String cityName;
	private String psName;
	private String beginTime;
	private String endTime;
	private String hourLong;
	private String alarmCause;
	private String alarmExplain;
	private String PSCode;
	private int pageNumber;
	private int pageSize;
	private int count;
	public String getAlarmLogId() {
		return alarmLogId;
	}
	public void setAlarmLogId(String alarmLogId) {
		this.alarmLogId = alarmLogId;
	}
	
	public String getCityId() {
		return cityId;
	}
	public void setCityId(String cityId) {
		this.cityId = cityId;
	}
	public String getCityName() {
		return cityName;
	}
	public void setCityName(String cityName) {
		this.cityName = cityName;
	}
	public String getPsName() {
		return psName;
	}
	public void setPsName(String psName) {
		this.psName = psName;
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
	public String getHourLong() {
		return hourLong;
	}
	public void setHourLong(String hourLong) {
		this.hourLong = hourLong;
	}
	public String getAlarmCause() {
		return alarmCause;
	}
	public void setAlarmCause(String alarmCause) {
		this.alarmCause = alarmCause;
	}
	public String getAlarmExplain() {
		return alarmExplain;
	}
	public void setAlarmExplain(String alarmExplain) {
		this.alarmExplain = alarmExplain;
	}
	public String getPSCode() {
		return PSCode;
	}
	public void setPSCode(String pSCode) {
		PSCode = pSCode;
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
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	
}
