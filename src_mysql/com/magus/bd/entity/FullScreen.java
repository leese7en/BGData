package com.magus.bd.entity;

public class FullScreen {

	private String year;
	private float installedAmount;
	private float powerAmount;
	private String month;
	
	private String psCode;
	private String psName;
	private String unit;
	private String cityId;
	private String cityName;
	private String tagName;
	private String groupId;
	private String groupName;
	private int installed;
	private String rectificationDate;
	private String productionDate;
	private String polluteCode;
	private String polluteName;
	private float avgConcent;
	private float cumEmission;
	private float reductions;

	private String algorithmCode;
	private String algorithmName;
	private int count;
	private String beginDate;
	private String endDate;
	private String name ;
	private int allCount;
	private String boilerType;
	
	private float coalConsumeAmount;
	private String  products;
	private float so2Effective;
	private float so2Concentration;
	private float generateElectricityAmount;
	
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public float getInstalledAmount() {
		return installedAmount;
	}
	public void setInstalledAmount(float installedAmount) {
		this.installedAmount = installedAmount;
	}
	public float getPowerAmount() {
		return powerAmount;
	}
	public void setPowerAmount(float powerAmount) {
		this.powerAmount = powerAmount;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
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
	
	public String getTagName() {
		return tagName;
	}
	public void setTagName(String tagName) {
		this.tagName = tagName;
	}
	public String getGroupId() {
		return groupId;
	}
	public void setGroupId(String groupId) {
		this.groupId = groupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public int getInstalled() {
		return installed;
	}
	public void setInstalled(int installed) {
		this.installed = installed;
	}
	public String getRectificationDate() {
		return rectificationDate;
	}
	public void setRectificationDate(String rectificationDate) {
		this.rectificationDate = rectificationDate;
	}
	public String getProductionDate() {
		return productionDate;
	}
	public void setProductionDate(String productionDate) {
		this.productionDate = productionDate;
	}
	public String getPolluteCode() {
		return polluteCode;
	}
	public void setPolluteCode(String polluteCode) {
		this.polluteCode = polluteCode;
	}
	public String getPolluteName() {
		return polluteName;
	}
	public void setPolluteName(String polluteName) {
		this.polluteName = polluteName;
	}
	public float getAvgConcent() {
		return avgConcent;
	}
	public void setAvgConcent(float avgConcent) {
		this.avgConcent = avgConcent;
	}
	public float getCumEmission() {
		return cumEmission;
	}
	public void setCumEmission(float cumEmission) {
		this.cumEmission = cumEmission;
	}
	public float getReductions() {
		return reductions;
	}
	public void setReductions(float reductions) {
		this.reductions = reductions;
	}
	
	public String getAlgorithmCode() {
		return algorithmCode;
	}
	public void setAlgorithmCode(String algorithmCode) {
		this.algorithmCode = algorithmCode;
	}
	public String getAlgorithmName() {
		return algorithmName;
	}
	public void setAlgorithmName(String algorithmName) {
		this.algorithmName = algorithmName;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getBeginDate() {
		return beginDate;
	}
	public void setBeginDate(String beginDate) {
		this.beginDate = beginDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getAllCount() {
		return allCount;
	}
	public void setAllCount(int allCount) {
		this.allCount = allCount;
	}
	public String getBoilerType() {
		return boilerType;
	}
	public void setBoilerType(String boilerType) {
		this.boilerType = boilerType;
	}
	public float getCoalConsumeAmount() {
		return coalConsumeAmount;
	}
	public void setCoalConsumeAmount(float coalConsumeAmount) {
		this.coalConsumeAmount = coalConsumeAmount;
	}
	public String getProducts() {
		return products;
	}
	public void setProducts(String products) {
		this.products = products;
	}
	public float getSo2Effective() {
		return so2Effective;
	}
	public void setSo2Effective(float so2Effective) {
		this.so2Effective = so2Effective;
	}
	public float getSo2Concentration() {
		return so2Concentration;
	}
	public void setSo2Concentration(float so2Concentration) {
		this.so2Concentration = so2Concentration;
	}
	public float getGenerateElectricityAmount() {
		return generateElectricityAmount;
	}
	public void setGenerateElectricityAmount(float generateElectricityAmount) {
		this.generateElectricityAmount = generateElectricityAmount;
	}
	
	public int compareTo(Analysis o) {
		return this.so2Effective < o.getSo2Effective() ? -1 : 1;
	}
}
