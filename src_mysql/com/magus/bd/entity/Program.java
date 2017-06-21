package com.magus.bd.entity;

public class Program extends Pagination {

	/**
	 * 方案主表
	 */
	private int programId;
	private int userId;
	private String heading;
	private String beginYear;
	private String endYear;
	private String poll;
	private String description;
	private String createDate;
	private String updateDate;
	private int isdelete;

	/**
	 * 方案明细
	 */

	private int programDetailId;
	private String cityId;
	private String cityName;
	private String year;
	private String installeds;
	private String effectives;
	private float effective;

	private float aims;
	private float actual;

	/**
	 * 每年的 电厂信息
	 */

	private int programDetailsId;
	private String psCode;
	private String psName;
	private String unit;
	private int operatorType;
	private float installed;
	private float genElecAmount;
	private float amountBefore;
	private float amountAfter;
	private float lessAmount;

	public int getProgramId() {
		return programId;
	}

	public void setProgramId(int programId) {
		this.programId = programId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getHeading() {
		return heading;
	}

	public void setHeading(String heading) {
		this.heading = heading;
	}

	public String getBeginYear() {
		return beginYear;
	}

	public void setBeginYear(String beginYear) {
		this.beginYear = beginYear;
	}

	public String getEndYear() {
		return endYear;
	}

	public void setEndYear(String endYear) {
		this.endYear = endYear;
	}

	public String getPoll() {
		return poll;
	}

	public void setPoll(String poll) {
		this.poll = poll;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public int getIsdelete() {
		return isdelete;
	}

	public void setIsdelete(int isdelete) {
		this.isdelete = isdelete;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public int getProgramDetailId() {
		return programDetailId;
	}

	public void setProgramDetailId(int programDetailId) {
		this.programDetailId = programDetailId;
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

	public String getInstalleds() {
		return installeds;
	}

	public void setInstalleds(String installeds) {
		this.installeds = installeds;
	}

	public String getEffectives() {
		return effectives;
	}

	public void setEffectives(String effectives) {
		this.effectives = effectives;
	}

	public float getEffective() {
		return effective;
	}

	public void setEffective(float effective) {
		this.effective = effective;
	}

	public float getAims() {
		return aims;
	}

	public void setAims(float aims) {
		this.aims = aims;
	}

	public float getActual() {
		return actual;
	}

	public void setActual(float actual) {
		this.actual = actual;
	}

	public int getProgramDetailsId() {
		return programDetailsId;
	}

	public void setProgramDetailsId(int programDetailsId) {
		this.programDetailsId = programDetailsId;
	}

	public String getPsCode() {
		return psCode;
	}

	public void setPsCode(String psCode) {
		this.psCode = psCode;
	}

	public String getPsName() {
		return psName;
	}

	public void setPsName(String psName) {
		this.psName = psName;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public int getOperatorType() {
		return operatorType;
	}

	public void setOperatorType(int operatorType) {
		this.operatorType = operatorType;
	}

	public float getInstalled() {
		return installed;
	}

	public void setInstalled(float installed) {
		this.installed = installed;
	}

	public float getGenElecAmount() {
		return genElecAmount;
	}

	public void setGenElecAmount(float genElecAmount) {
		this.genElecAmount = genElecAmount;
	}

	public float getAmountBefore() {
		return amountBefore;
	}

	public void setAmountBefore(float amountBefore) {
		this.amountBefore = amountBefore;
	}

	public float getAmountAfter() {
		return amountAfter;
	}

	public void setAmountAfter(float amountAfter) {
		this.amountAfter = amountAfter;
	}

	public float getLessAmount() {
		return lessAmount;
	}

	public void setLessAmount(float lessAmount) {
		this.lessAmount = lessAmount;
	}

}
