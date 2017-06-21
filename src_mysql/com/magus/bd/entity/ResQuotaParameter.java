package com.magus.bd.entity;

public class ResQuotaParameter {

	private String id;
	private String name;
	private String ename;
	private String description;
	private float parameter;

	private float mutation;
	private float handicapping;
	private float constant;
	private float fluctuation;
	private float screenJump;
	private float effective;
	private float complete;
	private float reliable;
	private float refparameter;
	private int maxNum;
	private int maxTime;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public float getParameter() {
		return parameter;
	}

	public void setParameter(float parameter) {
		this.parameter = parameter;
	}

	public float getRefparameter() {
		return refparameter;
	}

	public float getMutation() {
		return mutation;
	}

	public void setMutation(float mutation) {
		this.mutation = mutation;
	}

	public float getHandicapping() {
		return handicapping;
	}

	public void setHandicapping(float handicapping) {
		this.handicapping = handicapping;
	}

	public float getConstant() {
		return constant;
	}

	public void setConstant(float constant) {
		this.constant = constant;
	}

	public float getFluctuation() {
		return fluctuation;
	}

	public void setFluctuation(float fluctuation) {
		this.fluctuation = fluctuation;
	}

	public float getScreenJump() {
		return screenJump;
	}

	public void setScreenJump(float screenJump) {
		this.screenJump = screenJump;
	}

	public float getEffective() {
		return effective;
	}

	public void setEffective(float effective) {
		this.effective = effective;
	}

	public float getComplete() {
		return complete;
	}

	public void setComplete(float complete) {
		this.complete = complete;
	}

	public float getReliable() {
		return reliable;
	}

	public void setReliable(float reliable) {
		this.reliable = reliable;
	}

	public void setRefparameter(float refparameter) {
		this.refparameter = refparameter;
	}

	public int getMaxNum() {
		return maxNum;
	}

	public void setMaxNum(int maxNum) {
		this.maxNum = maxNum;
	}

	public int getMaxTime() {
		return maxTime;
	}

	public void setMaxTime(int maxTime) {
		this.maxTime = maxTime;
	}

}
