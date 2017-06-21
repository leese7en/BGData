package com.magus.bd.entity;

import java.util.List;

import com.magus.bd.vo.Parameter;

public class Analysis implements Comparable<Analysis> {

	private int id;
	private String pSCode;
	private List<String> psCodes;
	private String pSName;
	private String psType;
	private List<Parameter> installed;
	private float installedMax;
	private String products;
	private String unit;
	private String isStrength;
	private String boilerType;
	private String units;
	private String cityName;
	private float longitude;
	private float latitude;
	private String year;
	private String statisticsTime;
	private double installedAmount;
	private double so2Amount;
	private float so2Effective;
	private float so2Concentration;
	private double noxAmount;
	private float noxEffective;
	private float noxConcentration;
	private double dustAmount;
	private float dustEffective;

	private float pollEffective;
	private float dustConcentration;
	private double generateElectricityAmount;
	private double sumElectricity;
	private double effectiveHour;
	private double coalConsumeAmount;
	private float coalEffective;
	private double waterAmount;
	private float waterEffective;
	private float consumeEffective;
	private String qualtityReport;
	private double plantPowerAmunt;
	private double GDP;
	private String pollType;

	private float quotaPara;

	// 是 高耗能 还是高排放 1 高耗能 2 高排放
	private int emission;

	// 高耗能 高排放 企业状态 1 高耗能 2 高排放 3 既是高耗能又是高排放
	private int energyAndEmission;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getpSCode() {
		return pSCode;
	}

	public void setpSCode(String pSCode) {
		this.pSCode = pSCode;
	}

	public List<String> getPsCodes() {
		return psCodes;
	}

	public void setPsCodes(List<String> psCodes) {
		this.psCodes = psCodes;
	}

	public String getpSName() {
		return pSName;
	}

	public void setpSName(String pSName) {
		this.pSName = pSName;
	}

	public String getPsType() {
		return psType;
	}

	public void setPsType(String psType) {
		this.psType = psType;
	}

	public List<Parameter> getInstalled() {
		return installed;
	}

	public void setInstalled(List<Parameter> installed) {
		this.installed = installed;
	}

	public String getProducts() {
		return products;
	}

	public void setProducts(String products) {
		this.products = products;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getIsStrength() {
		return isStrength;
	}

	public void setIsStrength(String isStrength) {
		this.isStrength = isStrength;
	}

	public String getBoilerType() {
		return boilerType;
	}

	public void setBoilerType(String boilerType) {
		this.boilerType = boilerType;
	}

	public String getUnits() {
		return units;
	}

	public void setUnits(String units) {
		this.units = units;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
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

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getStatisticsTime() {
		return statisticsTime;
	}

	public void setStatisticsTime(String statisticsTime) {
		this.statisticsTime = statisticsTime;
	}

	public double getInstalledAmount() {
		return installedAmount;
	}

	public void setInstalledAmount(double installedAmount) {
		this.installedAmount = installedAmount;
	}

	public float getInstalledMax() {
		return installedMax;
	}

	public void setInstalledMax(float installedMax) {
		this.installedMax = installedMax;
	}

	public double getSo2Amount() {
		return so2Amount;
	}

	public void setSo2Amount(double so2Amount) {
		this.so2Amount = so2Amount;
	}

	public float getSo2Effective() {
		return so2Effective;
	}

	public void setSo2Effective(float so2Effective) {
		this.so2Effective = so2Effective;
	}

	public float getPollEffective() {
		return pollEffective;
	}

	public void setPollEffective(float pollEffective) {
		this.pollEffective = pollEffective;
	}

	public float getSo2Concentration() {
		return so2Concentration;
	}

	public void setSo2Concentration(float so2Concentration) {
		this.so2Concentration = so2Concentration;
	}

	public double getNoxAmount() {
		return noxAmount;
	}

	public void setNoxAmount(double noxAmount) {
		this.noxAmount = noxAmount;
	}

	public float getNoxEffective() {
		return noxEffective;
	}

	public void setNoxEffective(float noxEffective) {
		this.noxEffective = noxEffective;
	}

	public float getNoxConcentration() {
		return noxConcentration;
	}

	public void setNoxConcentration(float noxConcentration) {
		this.noxConcentration = noxConcentration;
	}

	public double getDustAmount() {
		return dustAmount;
	}

	public void setDustAmount(double dustAmount) {
		this.dustAmount = dustAmount;
	}

	public float getDustEffective() {
		return dustEffective;
	}

	public void setDustEffective(float dustEffective) {
		this.dustEffective = dustEffective;
	}

	public float getDustConcentration() {
		return dustConcentration;
	}

	public void setDustConcentration(float dustConcentration) {
		this.dustConcentration = dustConcentration;
	}

	public double getGenerateElectricityAmount() {
		return generateElectricityAmount;
	}

	public void setGenerateElectricityAmount(double generateElectricityAmount) {
		this.generateElectricityAmount = generateElectricityAmount;
	}

	public double getSumElectricity() {
		return sumElectricity;
	}

	public void setSumElectricity(double sumElectricity) {
		this.sumElectricity = sumElectricity;
	}

	public double getEffectiveHour() {
		return effectiveHour;
	}

	public void setEffectiveHour(double effectiveHour) {
		this.effectiveHour = effectiveHour;
	}

	public double getCoalConsumeAmount() {
		return coalConsumeAmount;
	}

	public void setCoalConsumeAmount(double coalConsumeAmount) {
		this.coalConsumeAmount = coalConsumeAmount;
	}

	public float getCoalEffective() {
		return coalEffective;
	}

	public void setCoalEffective(float coalEffective) {
		this.coalEffective = coalEffective;
	}

	public double getWaterAmount() {
		return waterAmount;
	}

	public void setWaterAmount(double waterAmount) {
		this.waterAmount = waterAmount;
	}

	public float getWaterEffective() {
		return waterEffective;
	}

	public void setWaterEffective(float waterEffective) {
		this.waterEffective = waterEffective;
	}

	public float getConsumeEffective() {
		return consumeEffective;
	}

	public void setConsumeEffective(float consumeEffective) {
		this.consumeEffective = consumeEffective;
	}

	public String getQualtityReport() {
		return qualtityReport;
	}

	public void setQualtityReport(String qualtityReport) {
		this.qualtityReport = qualtityReport;
	}

	public double getPlantPowerAmunt() {
		return plantPowerAmunt;
	}

	public void setPlantPowerAmunt(double plantPowerAmunt) {
		this.plantPowerAmunt = plantPowerAmunt;
	}

	public double getGDP() {
		return GDP;
	}

	public void setGDP(double gDP) {
		GDP = gDP;
	}

	public String getPollType() {
		return pollType;
	}

	public void setPollType(String pollType) {
		this.pollType = pollType;
	}

	public float getQuotaPara() {
		return quotaPara;
	}

	public void setQuotaPara(float quotaPara) {
		this.quotaPara = quotaPara;
	}

	public int getEmission() {
		return emission;
	}

	public void setEmission(int emission) {
		this.emission = emission;
	}

	public int getEnergyAndEmission() {
		return energyAndEmission;
	}

	public void setEnergyAndEmission(int energyAndEmission) {
		this.energyAndEmission = energyAndEmission;
	}

	public int compareTo(Analysis o) {
		return this.quotaPara < o.getQuotaPara() ? -1 : 1;
	}
}
