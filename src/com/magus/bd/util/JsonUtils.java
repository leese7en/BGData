package com.magus.bd.util;

import com.alibaba.fastjson.JSON;

public final class JsonUtils extends JSON {

	private JsonUtils() {
	}

	public static String toJson(Object obj) {
		return toJSONString(obj);
	}

}
