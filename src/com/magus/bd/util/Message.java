package com.magus.bd.util;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.utils.ResConst;

public class Message {

	private int flag = 0;
	private String message = ResConst.NORMAL;
	private Object data;

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object object) {
		this.data = object;
	}

	public String toString() {
		return "flag:" + this.flag + "   message:" + this.message;
	}

}
