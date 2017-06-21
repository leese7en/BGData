package com.magus.bd.util;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.magus.net.OPNetConst;
import com.magus.net.oo.DBPoint;

/**
 * PointMessage的工具类
 * 
 * @author lian
 * @date 2014-1-8
 * @time 下午2:37:15
 */
public class DVUtil {

	/**
	 * 获取请求参数, 参数解析
	 * 
	 * @param request
	 * @return Map
	 * @throws Exception
	 */
	public static Map<String, Object> parseParam(HttpServletRequest request) {
		ParseParameter pp = new ParseParameter();
		Map<String, Object> result = new HashMap<String, Object>();

		// 解析参数fn
		String fn = pp.parseString(DVStatics.PARAM_RUNCTION_NAME, request);
		result.put(DVStatics.PARAM_RUNCTION_NAME, fn);

		// 解析参数PN
		String[] arryPN = pp.parseStringArray(DVStatics.PARAM_GLOBAL_NAMES, request);
		result.put(DVStatics.PARAM_GLOBAL_NAMES, arryPN);

		// 解析参数userName
		String userName = pp.parseString(DVStatics.PARAM_USER_NAME, request);
		result.put(DVStatics.PARAM_USER_NAME, userName);

		// 解析参数password
		String password = pp.parseString(DVStatics.PARAM_PASSWORD, request);
		result.put(DVStatics.PARAM_PASSWORD, password);

		// 解析参数Fields
		String[] arryFields = pp.parseStringArray(DVStatics.PARAM_FIELDS, request);
		result.put(DVStatics.PARAM_FIELDS, arryFields);

		// 解析父对象
		String parent = pp.parseString(DVStatics.PARAM_PARENT, request);
		result.put(DVStatics.PARAM_PARENT, parent);

		// 解析子对象类别
		String childType = pp.parseString(DVStatics.PARAM_CHILD_TYPE, request);
		result.put(DVStatics.PARAM_CHILD_TYPE, childType);

		// 解析点名过滤条件
		String filterPN = pp.parseString(DVStatics.PARAM_FILTER_PN, request);

		result.put(DVStatics.PARAM_FILTER_PN, filterPN);

		// 解析描述过滤条件
		String filterED = pp.parseString(DVStatics.PARAM_FILTER_ED, request);
		// String filterED = request.getParameter(DVStatics.PARAM_FILTER_ED);
		result.put(DVStatics.PARAM_FILTER_ED, filterED);

		// 解析特征字过滤条件
		String filterKR = pp.parseString(DVStatics.PARAM_FILTER_KR, request);
		result.put(DVStatics.PARAM_FILTER_KR, filterKR);

		// 解析记录类型过滤条件
		Integer filterRT = parseRecordType(request);
		result.put(DVStatics.PARAM_FILTER_RT, filterRT);

		// 解析排序
		String order = pp.parseString(DVStatics.PARAM_ORDER, request);
		result.put(DVStatics.PARAM_ORDER, order);

		// 解析排序字段
		String orderField = pp.parseString(DVStatics.PARAM_ORDER_FIELD, request);
		result.put(DVStatics.PARAM_ORDER_FIELD, orderField);

		// 解析分页起始
		Integer skip = pp.parseInteger(DVStatics.PARAM_SKIP, request);
		result.put(DVStatics.PARAM_SKIP, skip);

		// 解析分页结束
		Integer rows = pp.parseInteger(DVStatics.PARAM_ROWS, request);
		result.put(DVStatics.PARAM_ROWS, rows);

		// 解析起始时间
		Date dateFrom = pp.parseDate(DVStatics.PARAM_FROM, request);
		result.put(DVStatics.PARAM_FROM, dateFrom);

		// 解析结束时间
		Date dateTo = pp.parseDate(DVStatics.PARAM_TO, request);
		result.put(DVStatics.PARAM_TO, dateTo);

		// 解析间隔时间
		Long interval = pp.parseLong(DVStatics.PARAM_INTERVAL, request);
		result.put(DVStatics.PARAM_INTERVAL, interval);

		// 解析历史类型
		Integer historyType = parseHistoryType(DVStatics.PARAM_HISTORY_TYPE, request);
		result.put(DVStatics.PARAM_HISTORY_TYPE, historyType);

		// 解析历史统计类型
		Integer historyStatType = parseHistoryStatType(DVStatics.PARAM_HISTORY_STAT_TYPE, request);
		result.put(DVStatics.PARAM_HISTORY_STAT_TYPE, historyStatType);

		// 解析历史FG类型
		Integer historyTypeFG = parseHistoryTypeFG(DVStatics.PARAM_HISTORY_TYPE_FG, request);
		result.put(DVStatics.PARAM_HISTORY_TYPE_FG, historyTypeFG);

		// 解析FlexiGrid的page参数
		Integer pageFG = pp.parseInteger(DVStatics.PARAM_FG_PAGE, request);
		result.put(DVStatics.PARAM_FG_PAGE, pageFG);

		// 解析FlexiGrid的rp参数
		Integer rpFG = pp.parseInteger(DVStatics.PARAM_FG_RP, request);
		result.put(DVStatics.PARAM_FG_RP, rpFG);

		// 解析报警的级别
		String[] filterLV = parseAlarmFGLevel(DVStatics.PARAM_FITLER_LV, request);
		result.put(DVStatics.PARAM_FITLER_LV, filterLV);

		// 解析字段返回类型
		String returnType = pp.parseString(DVStatics.PARAM_RETURN_TYPE, request);
		result.put(DVStatics.PARAM_RETURN_TYPE, returnType);

		// 解析ID列表
		int[] ids = pp.parseIntegerArray(DVStatics.PARAM_IDS, request);
		result.put(DVStatics.PARAM_IDS, ids);

		// 解析下载
		String download = pp.parseString(DVStatics.FUN_DOWNLOAD, request);
		result.put(DVStatics.FUN_DOWNLOAD, download);

		// 趋势用PARAM_DURATION
		Long duration = pp.parseLong(DVStatics.PARAM_DURATION, request);
		result.put(DVStatics.PARAM_DURATION, duration);

		return result;
	}

	private static String[] parseAlarmFGLevel(String paramName, HttpServletRequest request) {
		Map<String, String[]> paramMap = request.getParameterMap();
		String[] result = paramMap.get(paramName);
		if (result != null) {
			return result;
		} else {
			return null;
		}
	}

	/**
	 * 当参数解析错误时, 返回的提示信息
	 * 
	 * @param e
	 * @return
	 */
	public static String resultOfParseParamException(Exception e) {
		return "{\"error\":\"Parse HTTP request parameter:" + e.getClass().getName() + ":" + e.getMessage() + "\"}";
	}

	/**
	 * 返回参数说明
	 * 
	 * @param parameterName
	 * @return
	 */
	public static String needParameterDesc(String parameterName) {
		return "{\"error\":\"HTTP request need parameter '" + parameterName + "'.\"}";
	}

	/**
	 * 解析记录类型过滤条件
	 * 
	 * @param request
	 * @return
	 */
	private static Integer parseRecordType(HttpServletRequest request) {
		Integer result = null;
		Object objString = request.getParameter(DVStatics.PARAM_FILTER_RT);
		if (objString != null) {
			String str = (String) objString;
			if (str.equalsIgnoreCase("ALL")) {
				return null;
			} else if (str.equalsIgnoreCase("DX")) {
				return DBPoint.RECORD_TYPE_DX;
			} else if (str.equalsIgnoreCase("I2")) {
				return DBPoint.RECORD_TYPE_I2;
			} else if (str.equalsIgnoreCase("I4")) {
				return DBPoint.RECORD_TYPE_I4;
			} else if (str.equalsIgnoreCase("R8")) {
				return DBPoint.RECORD_TYPE_R8;
			} else {
				return DBPoint.RECORD_TYPE_AX;
			}
		}
		return result;
	}

	/**
	 * 解析历史类型
	 * 
	 * @param paramName
	 * @param request
	 * @return
	 */
	private static Integer parseHistoryType(String paramName, HttpServletRequest request) {
		Integer result = OPNetConst.HISTORY_DATA_SPAN;
		Object objString = request.getParameter(paramName);
		if (objString != null) {
			String str = (String) objString;
			if (str.equalsIgnoreCase("SAMPLE")) {
				result = OPNetConst.HISTORY_DATA_SAMPLE;
			} else if (str.equalsIgnoreCase("PLOT")) {
				result = OPNetConst.HISTORY_DATA_PLOT;
			}
		}
		return result;
	}

	/**
	 * 解析历史统计类型
	 * 
	 * @param paramName
	 * @param request
	 * @return
	 */
	private static Integer parseHistoryStatType(String paramName, HttpServletRequest request) {
		Integer result = OPNetConst.STAT_DATA_AVG;
		Object objString = request.getParameter(paramName);
		if (objString != null) {
			String str = (String) objString;
			if (str.equalsIgnoreCase("CAVG")) {
				result = OPNetConst.STAT_DATA_CAVG;
			} else if (str.equalsIgnoreCase("MIN")) {
				result = OPNetConst.STAT_DATA_MIN;
			} else if (str.equalsIgnoreCase("MAX")) {
				result = OPNetConst.STAT_DATA_MAX;
			} else if (str.equalsIgnoreCase("FLOW")) {
				result = OPNetConst.STAT_DATA_FLOW;
			}
		}
		return result;
	}

	/**
	 * 解析历史FG类型
	 * 
	 * @param paramName
	 * @param request
	 * @return
	 */
	private static Integer parseHistoryTypeFG(String paramName, HttpServletRequest request) {
		Integer result = OPNetConst.HISTORY_DATA_SPAN;
		Object objString = request.getParameter(paramName);
		if (objString != null) {
			String str = (String) objString;
			if (str.equalsIgnoreCase("CAVG")) {
				result = OPNetConst.STAT_DATA_CAVG;
			} else if (str.equalsIgnoreCase("MIN")) {
				result = OPNetConst.STAT_DATA_MIN;
			} else if (str.equalsIgnoreCase("MAX")) {
				result = OPNetConst.STAT_DATA_MAX;
			} else if (str.equalsIgnoreCase("FLOW")) {
				result = OPNetConst.STAT_DATA_FLOW;
			} else if (str.equalsIgnoreCase("AVG")) {
				result = OPNetConst.STAT_DATA_AVG;
			} else if (str.equalsIgnoreCase("SAMPLE")) {
				result = OPNetConst.HISTORY_DATA_SAMPLE;
			} else if (str.equalsIgnoreCase("PLOT")) {
				result = OPNetConst.HISTORY_DATA_PLOT;
			}
		}
		return result;
	}

	/**
	 * 日期转换成字符串
	 * 
	 * @param date
	 * @return
	 */
	public static String dateToString(Date date) {
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		return formatter.format(date);
	}

	public static String getMethodName(String fieldName) {
		String camelName = "set" + fieldName.substring(0, 1).toUpperCase() + fieldName.substring(1).toLowerCase();
		return camelName;
	}

}
