package com.magus.bd.utils;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtils {
	public static final String dfFormat = "yyyy-MM-dd HH:mm:ss";
	public static final SimpleDateFormat format = new SimpleDateFormat(dfFormat);
	public static DateFormat df = new SimpleDateFormat("yyyy-MM");

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
