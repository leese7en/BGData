package com.magus.bd.entity;

public class ResYearInfo {

	private int id;
	private String year;
	private String psCode;
	private String psName;
	private String psType;
	private String product;
	private float annual;
	private String unit;
	private float longitude;
	private float latitude;
	private String industryTypeName;
	private double fireInstalled;
	private double windInstalled;
	private double otherInstalled;
	private double firePower;
	private double windPower;
	private double otherPower;
	private double GDP;
	private int powerCount;

	// 盟市信息部分
	private String cityId;
	private String cityName;

	// 增长率 信息
	private int type;
	private double powerAmount;
	private double powerAmountIncrementRate;
	private double installedAmount;
	private float installedAmountIncrementRate;
	private double effectiveHour;
	private float effectiveHourIncrementRate;

	private String description;
	
	private float so2Amount;
	private float noxAmount;
	private float dustAmount;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
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

	public String getPsType() {
		return psType;
	}

	public void setPsType(String psType) {
		this.psType = psType;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public float getAnnual() {
		return annual;
	}

	public void setAnnual(float annual) {
		this.annual = annual;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public String getIndustryTypeName() {
		return industryTypeName;
	}

	public void setIndustryTypeName(String industryTypeName) {
		this.industryTypeName = industryTypeName;
	}

	public double getFireInstalled() {
		return fireInstalled;
	}

	public void setFireInstalled(double fireInstalled) {
		this.fireInstalled = fireInstalled;
	}

	public double getWindInstalled() {
		return windInstalled;
	}

	public void setWindInstalled(double windInstalled) {
		this.windInstalled = windInstalled;
	}

	public double getOtherInstalled() {
		return otherInstalled;
	}

	public void setOtherInstalled(double otherInstalled) {
		this.otherInstalled = otherInstalled;
	}

	public double getFirePower() {
		return firePower;
	}

	public void setFirePower(double firePower) {
		this.firePower = firePower;
	}

	public double getWindPower() {
		return windPower;
	}

	public void setWindPower(double windPower) {
		this.windPower = windPower;
	}

	public double getOtherPower() {
		return otherPower;
	}

	public void setOtherPower(double otherPower) {
		this.otherPower = otherPower;
	}

	public double getGDP() {
		return GDP;
	}

	public void setGDP(double gDP) {
		GDP = gDP;
	}

	public int getPowerCount() {
		return powerCount;
	}

	public void setPowerCount(int powerCount) {
		this.powerCount = powerCount;
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

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public double getPowerAmount() {
		return powerAmount;
	}

	public void setPowerAmount(double powerAmount) {
		this.powerAmount = powerAmount;
	}

	public double getPowerAmountIncrementRate() {
		return powerAmountIncrementRate;
	}

	public void setPowerAmountIncrementRate(double powerAmountIncrementRate) {
		this.powerAmountIncrementRate = powerAmountIncrementRate;
	}

	public double getInstalledAmount() {
		return installedAmount;
	}

	public void setInstalledAmount(double installedAmount) {
		this.installedAmount = installedAmount;
	}

	public float getInstalledAmountIncrementRate() {
		return installedAmountIncrementRate;
	}

	public void setInstalledAmountIncrementRate(float installedAmountIncrementRate) {
		this.installedAmountIncrementRate = installedAmountIncrementRate;
	}

	public double getEffectiveHour() {
		return effectiveHour;
	}

	public void setEffectiveHour(double effectiveHour) {
		this.effectiveHour = effectiveHour;
	}

	public float getEffectiveHourIncrementRate() {
		return effectiveHourIncrementRate;
	}

	public void setEffectiveHourIncrementRate(float effectiveHourIncrementRate) {
		this.effectiveHourIncrementRate = effectiveHourIncrementRate;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getSo2Amount() {
		return so2Amount;
	}

	public void setSo2Amount(float so2Amount) {
		this.so2Amount = so2Amount;
	}

	public float getNoxAmount() {
		return noxAmount;
	}

	public void setNoxAmount(float noxAmount) {
		this.noxAmount = noxAmount;
	}

	public float getDustAmount() {
		return dustAmount;
	}

	public void setDustAmount(float dustAmount) {
		this.dustAmount = dustAmount;
	}

}
