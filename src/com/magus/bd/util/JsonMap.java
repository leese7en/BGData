package com.magus.bd.util;

import com.alibaba.fastjson.JSONObject;

public class JsonMap extends JSONObject {

	private static final long serialVersionUID = 6753915745956837719L;

	public JsonMap() {
		super();
	}

	public JsonMap(int i) {
		super(i);
	}

	@Override
	public String toString() {
		return super.toJSONString();
	}

}
