package com.magus.bd.entity;

public class ResInstalledEmission {

	private int id;
	private String pollutantCode;
	private String content;
	private float min;
	private float max;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPollutantCode() {
		return pollutantCode;
	}

	public void setPollutantCode(String pollutantCode) {
		this.pollutantCode = pollutantCode;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public float getMin() {
		return min;
	}

	public void setMin(float min) {
		this.min = min;
	}

	public float getMax() {
		return max;
	}

	public void setMax(float max) {
		this.max = max;
	}

	public String toString() {
		return "pollutantCode:" + this.pollutantCode + "content:" + this.content + "  min:" + this.min + "  max:"
				+ this.max;
	}

}
