package com.magus.bd.entity;

import java.util.List;

import com.magus.bd.vo.Parameter;

public class ResSuperLow {

	private int id;
	private String psCode;
	private List<String> psCodes;
	private List<Integer> ids;
	private String psName;
	private String cityId;
	private String cityName;
	private List<String> cityIds;
	private String year;
	private String unit;
	private String poll;
	private List<Parameter> installed;
	//
	private float installedMax;
	private float so2Amount;
	private List<Parameter> so2Effective;
	private float so2EffectiveMax;
	private List<Parameter> noxEffective;
	private float noxAmount;
	private float noxEffectiveMax;
	private List<Parameter> dustEffective;
	private float dustEffectiveMax;
	private float dustAmount;
	private float gasFlow;
	private float genElecAmount;
	private float closeLessAmount;
	private float changeLessAmount;
	private float pollEffective;

	private int operatorType;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPsCode() {
		return psCode;
	}

	public void setPsCode(String psCode) {
		this.psCode = psCode;
	}

	public List<String> getPsCodes() {
		return psCodes;
	}

	public void setPsCodes(List<String> psCodes) {
		this.psCodes = psCodes;
	}

	public List<Integer> getIds() {
		return ids;
	}

	public void setIds(List<Integer> ids) {
		this.ids = ids;
	}

	public String getPsName() {
		return psName;
	}

	public void setPsName(String psName) {
		this.psName = psName;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getCityId() {
		return cityId;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	public List<String> getCityIds() {
		return cityIds;
	}

	public void setCityIds(List<String> cityIds) {
		this.cityIds = cityIds;
	}

	public String getYear() {
		return year;
	}

	public void setYear(String year) {
		this.year = year;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getPoll() {
		return poll;
	}

	public void setPoll(String poll) {
		this.poll = poll;
	}

	public List<Parameter> getInstalled() {
		return installed;
	}

	public void setInstalled(List<Parameter> installed) {
		this.installed = installed;
	}

	public float getInstalledMax() {
		return installedMax;
	}

	public void setInstalledMax(float installedMax) {
		this.installedMax = installedMax;
	}

	public float getSo2Amount() {
		return so2Amount;
	}

	public void setSo2Amount(float so2Amount) {
		this.so2Amount = so2Amount;
	}

	public List<Parameter> getSo2Effective() {
		return so2Effective;
	}

	public void setSo2Effective(List<Parameter> so2Effective) {
		this.so2Effective = so2Effective;
	}

	public float getSo2EffectiveMax() {
		return so2EffectiveMax;
	}

	public void setSo2EffectiveMax(float so2EffectiveMax) {
		this.so2EffectiveMax = so2EffectiveMax;
	}

	public float getNoxAmount() {
		return noxAmount;
	}

	public void setNoxAmount(float noxAmount) {
		this.noxAmount = noxAmount;
	}

	public List<Parameter> getNoxEffective() {
		return noxEffective;
	}

	public void setNoxEffective(List<Parameter> noxEffective) {
		this.noxEffective = noxEffective;
	}

	public float getNoxEffectiveMax() {
		return noxEffectiveMax;
	}

	public void setNoxEffectiveMax(float noxEffectiveMax) {
		this.noxEffectiveMax = noxEffectiveMax;
	}

	public List<Parameter> getDustEffective() {
		return dustEffective;
	}

	public void setDustEffective(List<Parameter> dustEffective) {
		this.dustEffective = dustEffective;
	}

	public float getDustEffectiveMax() {
		return dustEffectiveMax;
	}

	public void setDustEffectiveMax(float dustEffectiveMax) {
		this.dustEffectiveMax = dustEffectiveMax;
	}

	public float getDustAmount() {
		return dustAmount;
	}

	public void setDustAmount(float dustAmount) {
		this.dustAmount = dustAmount;
	}

	public float getGasFlow() {
		return gasFlow;
	}

	public void setGasFlow(float gasFlow) {
		this.gasFlow = gasFlow;
	}

	public float getGenElecAmount() {
		return genElecAmount;
	}

	public void setGenElecAmount(float genElecAmount) {
		this.genElecAmount = genElecAmount;
	}

	public float getCloseLessAmount() {
		return closeLessAmount;
	}

	public void setCloseLessAmount(float closeLessAmount) {
		this.closeLessAmount = closeLessAmount;
	}

	public float getChangeLessAmount() {
		return changeLessAmount;
	}

	public void setChangeLessAmount(float changeLessAmount) {
		this.changeLessAmount = changeLessAmount;
	}

	public float getPollEffective() {
		return pollEffective;
	}

	public void setPollEffective(float pollEffective) {
		this.pollEffective = pollEffective;
	}

	public int getOperatorType() {
		return operatorType;
	}

	public void setOperatorType(int operatorType) {
		this.operatorType = operatorType;
	}

}
