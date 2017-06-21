package com.magus.bd.util;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.magus.net.IOPConnect;
import com.magus.net.OPStaticInfo;

public class UtilTotle
{

	public static String getDateTimeByMillisecond(String str)
	{
		String time = null;
		try
		{
			Date date = new Date(Long.parseLong(str));
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
			time = format.format(date);
		}
		catch (Exception e)
		{
		}
		return time;
	}

	public static Date dateFormate(String str)
	{
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date time = null;
		try
		{
			time = dateFormat.parse(str);
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		return time;
	}

	/**
	 * 根据AS状态判断测点是否已超时。
	 * 
	 * @param status
	 * @return 是否超时 true为超时，false为不超时
	 */
	public static boolean isTimeOut(short status)
	{
		return (status & 0x8000) != 0;
	}

	/**
	 * 根据AS状态判断测点是否已超时。
	 * 
	 * @param status
	 * @return 是否超时
	 */
	public static boolean isTimeOutNew(short status)
	{
		boolean result = false;
		try
		{
			int a14 = (status & (0x1 << 14)) >> 14;
			int a15 = (status & (0x1 << 15)) >> 15;
			if (a14 == 0 && a15 == 0)
			{
				result = false;
			}
			else
			{
				result = true;
			}
		}
		catch (Exception e)
		{
			result = false;
		}
		return result;
	}

	public static boolean pointIsExist(IOPConnect conn, String pn)
	{
		boolean result = true;

		try
		{
			if (pn != null && !"".equals(pn))
			{
				OPStaticInfo info = conn.getPointStaticInfo(pn);
				if (info == null)
				{
					result = false;
				}
				else
				{
					return true;
				}
				
				info = null;
			}
			result = false;
		}
		catch (Exception e)
		{
			result = false;
		}
		return result;
	}
}
