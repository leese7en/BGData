package com.magus.bd.entity;

public class AQIDayInfo {

	private int id;
	private int cityId;
	private String stationsId;
	private float aqi;
	private float SO2;
	private float NOx;
	private float CO;
	private float O3;
	private float PMS;
	private float PMB;
	private String firstPoll;
	private String beginTime;
	private String endTime;
	private String date;

	private String pollType;
	private float amount;
	private float so2Amount;
	private float noxAmount;
	private float dustAmount;

	private float strength;
	private float so2Strenth;
	private float noxStrength;
	private float dustStrength;

	private float so2CityAmount;
	private float noxCityAmount;
	private float dustCityAmount;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public String getStationsId() {
		return stationsId;
	}

	public void setStationsId(String stationsId) {
		this.stationsId = stationsId;
	}

	public float getAqi() {
		return aqi;
	}

	public void setAqi(float aqi) {
		this.aqi = aqi;
	}

	public float getSO2() {
		return SO2;
	}

	public void setSO2(float sO2) {
		SO2 = sO2;
	}

	public float getNOx() {
		return NOx;
	}

	public void setNOx(float nOx) {
		NOx = nOx;
	}

	public float getCO() {
		return CO;
	}

	public void setCO(float cO) {
		CO = cO;
	}

	public float getO3() {
		return O3;
	}

	public void setO3(float o3) {
		O3 = o3;
	}

	public float getPMS() {
		return PMS;
	}

	public void setPMS(float pMS) {
		PMS = pMS;
	}

	public float getPMB() {
		return PMB;
	}

	public void setPMB(float pMB) {
		PMB = pMB;
	}

	public String getFirstPoll() {
		return firstPoll;
	}

	public void setFirstPoll(String firstPoll) {
		this.firstPoll = firstPoll;
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

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getPollType() {
		return pollType;
	}

	public void setPollType(String pollType) {
		this.pollType = pollType;
	}

	public float getAmount() {
		return amount;
	}

	public void setAmount(float amount) {
		this.amount = amount;
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

	public float getStrength() {
		return strength;
	}

	public void setStrength(float strength) {
		this.strength = strength;
	}

	public float getSo2Strenth() {
		return so2Strenth;
	}

	public void setSo2Strenth(float so2Strenth) {
		this.so2Strenth = so2Strenth;
	}

	public float getNoxStrength() {
		return noxStrength;
	}

	public void setNoxStrength(float noxStrength) {
		this.noxStrength = noxStrength;
	}

	public float getDustStrength() {
		return dustStrength;
	}

	public void setDustStrength(float dustStrength) {
		this.dustStrength = dustStrength;
	}

	public float getSo2CityAmount() {
		return so2CityAmount;
	}

	public void setSo2CityAmount(float so2CityAmount) {
		this.so2CityAmount = so2CityAmount;
	}

	public float getNoxCityAmount() {
		return noxCityAmount;
	}

	public void setNoxCityAmount(float noxCityAmount) {
		this.noxCityAmount = noxCityAmount;
	}

	public float getDustCityAmount() {
		return dustCityAmount;
	}

	public void setDustCityAmount(float dustCityAmount) {
		this.dustCityAmount = dustCityAmount;
	}

	public String toString() {
		return "cityId:" + this.cityId + "	AQI:" + this.aqi + "	firstPoll:" + this.firstPoll;
	}
}
