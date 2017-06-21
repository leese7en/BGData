package com.magus.bd;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Map;

public class WordDeal {
	/**
	 * @param args
	 * @throws UnsupportedEncodingException
	 */
	public static void main(String[] args) throws UnsupportedEncodingException {

		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put("dateTime", "试卷");
		dataMap.put("createUser", "李洪灯");
		dataMap.put("createTime", "2016-07-29");
		DocumentHandler mdoc = new DocumentHandler();
		mdoc.createDoc(dataMap, "E:/outFile.doc");
	}
}