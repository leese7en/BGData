package com.magus.bd.util;

import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;

/**
 * 解析参数(字符串,字符串数组,整型数组,日期,长整型,整型)
 * 
 * @author lian
 * @date 2014-1-10
 * @time 上午9:17:01
 */
public class ParseParameter
{
	public static final String ENCODE = "UTF-8";
	public static final String ISO = "ISO-8859-1";
	private static ParseParameter pp;

	public static ParseParameter getParser()
	{
		if (pp == null)
			pp = new ParseParameter();
		return pp;
	}

	/**
	 * 字符串解析, 转换字符串格式为UTF-8
	 * 
	 * @param fieldName
	 * @param request
	 * @return
	 * @throws UnsupportedEncodingException
	 */
	public String parseString(String fieldName, HttpServletRequest request)
	{
		String result = request.getParameter(fieldName);
		try
		{
			/**
			 * 将前台 encodeURI 编码的字母解码
			 */
			if (result != null && !"".equals(result.trim()))
			{
				result = java.net.URLDecoder.decode(result, "UTF-8");
				result = converURICode(result);
				result = result.trim();
			}
		}
		catch (UnsupportedEncodingException e)
		{
		}
		return result;
	}

	private String converURICode(String result)
	{
		// 添加URL特殊符号转码支持
		if (result.indexOf("%20") != -1)
		{
			result = result.replaceAll("%20", "+");
		}

		if (result.indexOf("%2F") != -1)
		{
			result = result.replaceAll("%2F", "/");
		}
		if (result.indexOf("%3F") != -1)
		{
			result = result.replaceAll("%3F", "?");
		}

		if (result.indexOf("%23") != -1)
		{
			result = result.replaceAll("%23", "#");
		}

		if (result.indexOf("%25") != -1)
		{
			result = result.replaceAll("%25", "%");
		}
		if (result.indexOf("%26") != -1)
		{
			result = result.replaceAll("%26", "&");
		}
		return result;
	}

	/**
	 * 字符串数组解析, 转换格式为UTF-8
	 * 
	 * @param fieldName
	 * @param request
	 * @return
	 */
	public String[] parseStringArray(String fieldName, HttpServletRequest request)
	{
		Object obj = request.getParameter(fieldName);
		if (obj != null)
		{
			String value = (String) obj;

			value = converURICode(value);

			// try {
			// byte[] bytes = value.getBytes(ISO);
			// value = new String(bytes, ENCODE);
			// value = value.trim().toUpperCase();
			// } catch (UnsupportedEncodingException e1) {
			// e1.printStackTrace();
			// }
			String[] result = value.split(",");
			return result;
		}
		else
		{
			return null;
		}
	}

	/**
	 * 整型数组解析, 将字符串格式的数组转换为整型数组 例如["1","2","3"]转换为[1,2,3]
	 * 
	 * @param fieldName
	 * @param request
	 * @return
	 */
	public int[] parseIntegerArray(String fieldName, HttpServletRequest request)
	{
		String[] idString = parseStringArray(fieldName, request);
		if (idString != null)
		{
			int[] ids = new int[idString.length];
			int idx = 0;
			for (String str : idString)
			{
				if (str != null && (str = str.trim()) != "")
				{
					ids[idx++] = Integer.parseInt(str);
				}
			}
			return ids;
		}
		else
		{
			return null;
		}
	}

	/**
	 * 日期格式解析, 将long型转换为Date型
	 * 
	 * @param paramName
	 * @param request
	 * @return
	 */
	public Date parseDate(String paramName, HttpServletRequest request)
	{
		Long value = parseLong(paramName, request);
		if (value != null)
		{
			Date dateFrom = new Date(value);
			return dateFrom;
		}
		else
		{
			return null;
		}
	}

	/**
	 * 长整型解析, 将字符串转换为Long型
	 * 
	 * @param paramName
	 * @param request
	 * @return
	 */
	public Long parseLong(String paramName, HttpServletRequest request)
	{
		Object objLong = request.getParameter(paramName);
		if (objLong != null && !objLong.equals(""))
		{
			String strLong = (String) objLong;
			Long value = Long.parseLong(strLong);
			return value;
		}
		else
		{
			return null;
		}
	}

	/**
	 * 整型解析, 将字符串转换为Integer型
	 * 
	 * @param paramName
	 * @param request
	 * @return
	 */
	public Integer parseInteger(String paramName, HttpServletRequest request)
	{
		Object objInteger = request.getParameter(paramName);
		if (objInteger != null)
		{
			String strInteger = (String) objInteger;
			Integer value = Integer.parseInt(strInteger);
			return value;
		}
		else
		{
			return null;
		}
	}

	/**
	 * 得到SuccessJson
	 * 
	 * @param msg
	 * @return
	 */
	public JSONObject getSuccessJSON(String msg)
	{
		JSONObject result = new JSONObject();
		try
		{
			result.put("success", msg);
		}
		catch (JSONException e)
		{
			e.printStackTrace();
		}
		return result;
	}

	/**
	 * 得到FailJson
	 * 
	 * @param msg
	 * @return
	 */
	public JSONObject getFailJSON(String msg)
	{
		JSONObject result = new JSONObject();
		try
		{
			result.put("error", msg);
		}
		catch (JSONException e)
		{
			e.printStackTrace();
		}
		return result;
	}

}
