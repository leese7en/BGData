package com.magus.bd.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {
	public final static String dataYMDHMS = "yyyy-MM-dd HH:mm:ss";
	public final static String dataYM = "yyyy-MM";
	public final static String dataYMD = "yyyy-MM-dd";
	public static final String dfFormat = "yyyy-MM-dd HH:mm:ss";
	public static final SimpleDateFormat format = new SimpleDateFormat(dfFormat);
	public static DateFormat df = new SimpleDateFormat("yyyy-MM");

	/**
	 * 格式化给定时间的 年月日信息
	 * 
	 * @param date
	 * @return
	 */
	public static String dataFormat(Date date) {
		String time = null;
		try {
			SimpleDateFormat format = new SimpleDateFormat(dataYMDHMS);
			time = format.format(date);
		} catch (Exception e) {
		}
		return time;
	}

	/**
	 * 获取当前的时间 年月信息
	 * 
	 * @param date
	 * @return
	 */
	public static String dataFormatYM(Date date) {
		String time = null;
		try {
			SimpleDateFormat format = new SimpleDateFormat(dataYM);
			time = format.format(date);
		} catch (Exception e) {
		}
		return time;
	}

	/**
	 * 获取当前的时间 年月日信息
	 * 
	 * @param date
	 * @return
	 */
	public static String dataFormatYMD(Date date) {
		String time = null;
		try {
			SimpleDateFormat format = new SimpleDateFormat(dataYMD);
			time = format.format(date);
		} catch (Exception e) {
		}
		return time;
	}

	/**
	 * 获取给定时间的时间值
	 * 
	 * @param date
	 * @return
	 */
	public static long dataFormatYm(String date) {
		long l = 0;
		try {
			Date time = null;
			SimpleDateFormat format = new SimpleDateFormat(dataYM);
			time = format.parse(date);
			l = time.getTime();
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return l;
	}

	
	

	public static String formatDate(Date date) {
		return format.format(date);
	}

	public static int formatDate(String begin, String end) {
		try {
			begin += "-00 00:00:00";
			end += "-00 00:00:00";
			Date dt1 = df.parse(begin);
			Date dt2 = df.parse(end);
			if (dt1.getTime() > dt2.getTime()) {
				return 1;
			} else if (dt1.getTime() < dt2.getTime()) {
				return -1;
			} else {
				return 0;
			}
		} catch (Exception exception) {
			exception.printStackTrace();
		}
		return 0;
	}
}
