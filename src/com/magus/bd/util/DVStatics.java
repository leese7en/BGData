package com.magus.bd.util;

import com.magus.net.oo.DBPoint;

/**
 * 数据浏览常量类
 * 
 * @author lian
 * @date 2014-1-9
 * @time 上午10:48:07
 * @desp final表示该类不可以被继承
 */
public final class DVStatics {

	/** 方法名称 */
	public static final String PARAM_RUNCTION_NAME = "fn";

	/** 连接信息的描述 */
	public static final String PARAM_HOST = "host";
	public static final String PARAM_PORT = "port";
	public static final String PARAM_USER_NAME = "userName";
	public static final String PARAM_PASSWORD = "password";

	/** 根据KEY(过滤) */
	public static final String PARAM_GLOBAL_NAMES = "pn";

	public static final String PARAM_IDS = "id";

	/** 设定返回的数据结构 */
	public static final String PARAM_FIELDS = "fields";

	/** 根据关系(过滤) [报警\静态] */
	public static final String PARAM_PARENT = "parent";
	public static final String PARAM_CHILD_TYPE = "childType";

	/** 根据时间(过滤)[历史\报警] */
	public static final String PARAM_FROM = "from";
	public static final String PARAM_TO = "to";
	public static final String PARAM_INTERVAL = "interval";
	public static final String PARAM_DURATION = "duration";

	/** 对历史查询类型(过滤)[历史\统计] */
	public static final String PARAM_HISTORY_TYPE = "historyType";
	public static final String PARAM_HISTORY_STAT_TYPE = "historyStatType";
	public static final String PARAM_HISTORY_TYPE_FG = "historyTypeFG";
	public static final String HIS_TYPE_SAMPLE = "SAMPLE";
	public static final String HIS_TYPE_SPAN = "SPAN";
	public static final String HIS_TYPE_PLOT = "PLOT";

	/** 按照字段关键字(过滤)[静态] */
	public static final String PARAM_FILTER_PN = "filterPN";
	public static final String PARAM_FILTER_ED = "filterED";
	public static final String PARAM_FILTER_RT = "filterRT";
	public static final String PARAM_FILTER_KR = "filterKR";
	public static final String PARAM_FITLER_LV = "filterLV";

	/** 自定义点组操作关键字 */
	public static final String FUN_GETFAVORITEGROUP = "getFavoriteGroups";
	public static final String FUN_ADDFAVORITEGROUP = "addFavoriteGroup";
	public static final String FUN_RENAMEFAVORITEGROUP = "renameFavoriteGroup";
	public static final String FUN_REMOVEFAVORITEGROUP = "removeFavoriteGroup";
	public static final String FUN_GETFAVORITEPOINT = "getFavoritePoints";
	public static final String FUN_ADDFAVORITEPOINT = "addFavoritePoint";
	public static final String FUN_REMOVEFAVORITEPOINT = "removeFavoritePoint";
	public static final String FUN_REORDERFAVORITE = "reorderFavorite";
	public static final String FUN_CHECKPOINTVALID = "checkPointNameIsValid";

	/** 排序 */
	public static final String PARAM_ORDER = "sortorder";
	public static final String PARAM_ORDER_FIELD = "sortname";
	// String static final PARAM_ORDER = "order";
	// String static final PARAM_ORDER_FIELD = "orderField";

	/** 分页 */
	public static final String PARAM_SKIP = "skip";
	public static final String PARAM_ROWS = "rows";
	public static final String PARAM_FG_PAGE = "page";
	public static final String PARAM_FG_RP = "rp";
	public static final String PARAM_TOTAL = "total";

	/** 返回类型 csv , json */
	public static final String PARAM_RETURN_TYPE = "returnType";

	/** Table */
	public static final String FUN_DOWNLOAD = "download";
	public static final String GET_CONNECT_INFO = "getConnectInfo";
	public static final String GET_REALTIME = "getRealtime";
	public static final String GET_HISTORY = "getHistory";
	public static final String GET_HISTORY_STAT = "getHistoryStat";
	public static final String GET_HISTORY_STATS = "getHistoryStats";
	public static final String GET_STATIC = "getStatic";
	public static final String GET_STATIC_CHILD = "getStaticChild";
	public static final String GET_ALARM = "getAlarm";
	public static final String GET_SERVER_TIME = "getServerTime";

	public static final String GET_HISTORY_FG = "getHistoryFG";
	public static final String GET_HISTORY_STATS_FG = "getHistoryStatsFG";
	public static final String GET_STATIC_CHILD_FG = "getStaticChildFG";
	public static final String GET_ALARM_FG = "getAlarmFG";
	public static final String DOWNLOAD_COMPLISH = "Download complish";
	// csv文件名前缀
	public static final String CSV_DATAVIEW = "dataView";
	public static final String CSV_HISTORY = "historyData";
	public static final String CSV_STATISTICS = "Statistics";
	public static final String CSV_ALARM = "Alarm";

	/* 当测点的历史区间统计值为[]时, 为了不用默认的0.0, 给定一个特殊值, 然后在前台解析 */
	public static final double HISTORY_STAT_PARA = 1234567890;

	/***/
	public static final String ALARM_DOWNlOAD = "AlarmDownload";

	String PARAM_RECORD_TYPE = "recordType";

	String[] HISTORY_STAT_ALL_TYPES = { "MIN", "MAX", "AVG", "CAVG", "FLOW" };

	String ALARM_DEFAULT_PARENT = "W3";

	String STATIC_DEFAULT_RETURN_TYPE = "MAP";

	String[] STATIC_CHILD_ALL_TYPES = { DBPoint.FIELD_ID, DBPoint.FIELD_PN, DBPoint.FIELD_ED };

	String STATIC_CHILD_DEFUALT_PARENT = "W3";
	String STATIC_CHILD_TYPE_POINT = "POINT";
	String STATIC_CHILD_TYPE_NODE = "NODE";
	String STATIC_CHILD_ORDER_ASE = "ASC";
	String STATIC_CHILD_ORDER_DESC = "DESC";

	String KEY_OF_SESSION_USER = "user";
}