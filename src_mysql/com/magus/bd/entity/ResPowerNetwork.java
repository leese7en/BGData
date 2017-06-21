package com.magus.bd.entity;

public class ResPowerNetwork {

	private int id;
	private String year;
	private int bId;
	private String bname;
	private float blongitude;
	private float blatitude;
	private int eId;
	private String ename;
	private float elongitude;
	private float elatitude;
	private String description;
	private int usable;

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

	public int getbId() {
		return bId;
	}

	public void setbId(int bId) {
		this.bId = bId;
	}

	public String getBname() {
		return bname;
	}

	public void setBname(String bname) {
		this.bname = bname;
	}

	public float getBlongitude() {
		return blongitude;
	}

	public void setBlongitude(float blongitude) {
		this.blongitude = blongitude;
	}

	public float getBlatitude() {
		return blatitude;
	}

	public void setBlatitude(float blatitude) {
		this.blatitude = blatitude;
	}

	public int geteId() {
		return eId;
	}

	public void seteId(int eId) {
		this.eId = eId;
	}

	public String getEname() {
		return ename;
	}

	public void setEname(String ename) {
		this.ename = ename;
	}

	public float getElongitude() {
		return elongitude;
	}

	public void setElongitude(float elongitude) {
		this.elongitude = elongitude;
	}

	public float getElatitude() {
		return elatitude;
	}

	public void setElatitude(float elatitude) {
		this.elatitude = elatitude;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getUsable() {
		return usable;
	}

	public void setUsable(int usable) {
		this.usable = usable;
	}

	public String toString() {
		return "year:" + this.year + "	bname:" + this.bname + "	ename:" + this.ename;
	}

}
