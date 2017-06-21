package com.magus.bd.entity;

public class ResConsume {

	private int id;
	private int cityId;
	private String cityName;
	private String psCode;
	private String date;
	private float SO2Strength;
	private float NOxStrength;
	private float dustStrength;
	private float SO2Per;
	private float NOxPer;
	private float dustPer;
	private float coalConsume;
	private float waterConsume;

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

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getPsCode() {
		return psCode;
	}

	public void setPsCode(String psCode) {
		this.psCode = psCode;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public float getSO2Strength() {
		return SO2Strength;
	}

	public void setSO2Strength(float sO2Strength) {
		SO2Strength = sO2Strength;
	}

	public float getNOxStrength() {
		return NOxStrength;
	}

	public void setNOxStrength(float nOxStrength) {
		NOxStrength = nOxStrength;
	}

	public float getDustStrength() {
		return dustStrength;
	}

	public void setDustStrength(float dustStrength) {
		this.dustStrength = dustStrength;
	}

	public float getSO2Per() {
		return SO2Per;
	}

	public void setSO2Per(float sO2Per) {
		SO2Per = sO2Per;
	}

	public float getNOxPer() {
		return NOxPer;
	}

	public void setNOxPer(float nOxPer) {
		NOxPer = nOxPer;
	}

	public float getDustPer() {
		return dustPer;
	}

	public void setDustPer(float dustPer) {
		this.dustPer = dustPer;
	}

	public float getCoalConsume() {
		return coalConsume;
	}

	public void setCoalConsume(float coalConsume) {
		this.coalConsume = coalConsume;
	}

	public float getWaterConsume() {
		return waterConsume;
	}

	public void setWaterConsume(float waterConsume) {
		this.waterConsume = waterConsume;
	}

}
