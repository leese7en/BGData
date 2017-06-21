package com.magus.bd.utils;

import java.text.DecimalFormat;

public class Utils {

	/**
	 * 小数点后两位
	 */
	public final static String numberTwo = "#.00";
	/**
	 * 小数点后三位
	 */
	public final static String numberThree = "#.000";

	/**
	 * 格式化 数据小数点
	 * 
	 * @param obj
	 * @param parameter
	 * @return
	 */
	public static Object numberFormat(Object obj, String parameter) {
		DecimalFormat df = new DecimalFormat(parameter);
		return df.format(obj);
	}
}
