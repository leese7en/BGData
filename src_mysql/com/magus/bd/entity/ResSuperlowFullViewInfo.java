package com.magus.bd.entity;

import com.magus.bd.util.DateUtils;

public class ResSuperlowFullViewInfo implements Comparable<ResSuperlowFullViewInfo> {

	private int id;
	private String date;
	private String time;
	private String content;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public int compareTo(ResSuperlowFullViewInfo o) {
		long rTime = DateUtils.dataFormatYm(this.getTime());
		long pTime = DateUtils.dataFormatYm(o.getTime());
		return rTime < pTime ? -1 : 1;
	}

}
