package com.magus.bd.utils;

public class ResConst {

	public static final String resetPassword = "123456";
	public static final String superYear = "2014";
	/**
	 * 装机容量
	 */
	public static final int INSTALLED = 1;
	/**
	 * 排放绩效
	 */
	public static final int EMISSION = 2;
	public static final String NORMAL = "正常";
	public static final int UNNORMALVALUE = -1;
	public static final String UNNORMAL = "操作失败";
	public static final int MAXMINVALUE = -2;
	public static final String MAXMIN = "最大值不能比最小值小";

	public static final String CONSTANT = "constant";
	public static final String FLUCTUATION = "fluctuation";
	public static final String HANDICAPPING = "handicapping";
	public static final String MUTATION = "mutation";
	public static final String SCREENJUMP = "screenjump";
	public static final String RELIABLE = "reliable";
	public static final String COMPLETE = "complete";
	public static final String EFFECTIVE = "effective";

	public static final String CCONSTANT = "恒定值";
	public static final String CFLUCTUATION = "波动异常";
	public static final String CHANDICAPPING = "设限值";
	public static final String CMUTATION = "陡升陡降";
	public static final String CSCREENJUMP = "满屏跳";
	public static final String CRELIABLE = "可靠性";
	public static final String CCOMPLETE = "完整性";
	public static final String CEFFECTIVE = "有效性";
	public static final String CTOTAL = "总得分";

	/**
	 * 超低排放参数设置
	 */
	public static final float so2Super = 35;
	public static final float noxSuper = 50;
	public static final float dustSuper = 10;

	// 新建
	public static final int NEW = 0;
	// 关停
	public static final int CLOSE = 1;
	// 整改
	public static final int CHANGE = 2;
	// 整改
	public static final int FCHANGE = 0;
	// 关停
	public static final int FCLOSE = 1;
	// 新建
	public static final int FNEW = 2;

	// 超低排放开始年份
	public static final int SUPERBEGINYEAR = 2016;
	// 超低排放结束年份
	public static final int SUPERENDYEAR = 2020;

	// 超低排放基础时间
	public static final String BEGINYEAR = "2015";
	// 月份
	public static final int monthBegin = 1;
	public static final int monthEnd = 12;

	// 每月的在线数据同步时间 默认是10号，向后推迟一天
	public static final int statisticsTime = 11;

	/**
	 * 污染物减排偏差
	 */
	public static final float deviation = 0.05f;

	public final static String SO2CODE = "A21026";
	public final static String NOXCODE = "A21002";
	public final static String DUSTCODE = "A34013";

	// 导出文件路径
	public final static String exportPath = "power";
	public final static String filePath = "files";

	public final static String complete = "complete";
	public final static String processing = "processing";
	public final static String plan = "plan";
	public final static String planning = "planning";

	/**
	 * 导出方案格式化设置
	 */

	// 字体大小
	public static final int titleFontSize = 40;
	public static final int contentFontSize = 24;
	public static final int tableFontSize = 16;
	// 空格控制
	public static final float tabSpace = 25f;
	public static final float tableSpace = 10f;

	public static final String titleFont = "";
	public static final String titleContent = "全区装机容量 30 万千瓦以上机组\n超低排放实施减排效果预测\n研究报告";
	public static final String firstTtile = "一、 编制说明";
	public static final String firstContentOne = "为贯彻落实环境保护部、国家发展改革委、国家能源局《关于印发〈全面实施燃煤电厂超低排放和节能改造工作方案〉的通知》（环发〔 2015〕 164 号）要求，加快自治区燃煤电厂超低排放改造进程，有序推进改造工作，自治区环境保护厅组织制定了《内蒙古自治区实施燃煤电厂超低排放改造工作方案》。";
	public static final String firstContentTwo = "为预测全区 30 万千瓦以上机组执行超低排放后，全区三项大气污染物排放总量减排的效果，预测因此置换出相应的环境容量空间， 为新建项目总量核定提供决策支持，特编制本研究报告。";
	public static final String firstContentThree = "编制人:";
	public static final String firstContentFour = "编制日期:";
	public static final String firstContentFive = "方案描述:";
	public static final String secondTitle = "二、 超低排放实施进度";
	public static final String secondContentOne = "1、 已完成改造的机组";
	public static final String secondContentTwo = "截至 nowTime， 已完成超低排放改造的机组共 unitNumber台， 总装机容量为installedNumberMW，列表如下:";
	public static final String secondContentThree = "2、 改造中的机组";
	public static final String secondContentFour = "截至 nowTime，正在改造中的机组共unitNumber台， 总装机容量为installedNumberMW，列表如下:";
	public static final String secondContentFive = "3、 计划改造的机组";
	public static final String secondContentSix = "已经制定了改造计划的机组共unitNumber台， 总装机容量为installedNumberMW，列表如下:";
	public static final String secondContentSeven = "4、 规划新建的机组";
	public static final String secondContentEight = "规划新建的机组共unitNumber台， 总装机容量为installedNumberMW，列表如下:";
	public static final String thridTitle = "三、 预测结果";
	public static final String thridContentOne = "预测结果如下表所示：";
	public static final String fourthTitle = "四、 预计减排量明细";
	public static final String fourthContentOne = "见附表1。";
	public static final String appendixContent = "附表1";
	public static final String scheduleTitle = "火电厂污染物预计减排量明细表";
	public static final String scheduleYear = "预测年份:";
	public static final String schedulePoll = "预测污染物:";
	public static final String scheduleDate = "编制日期:";
	public static final String emissionConcen = "排放浓度(mg/m³)";
	public static final String emissionAmount = "排放量(t)";
	/**
	 * 高耗能 高排放
	 */
	public static final int so2Effective = 0;
	public static final int noxEffective = 1;
	public static final int dustEffective = 2;
	public static final int so2Concen = 3;
	public static final int noxConcen = 4;
	public static final int dustConcen = 5;
	public static final int coalConcen = 6;
	/**
	 * 指标数据
	 */
	public static final String emissionEffectiveSO2 = "SO2排放绩效(g/kWh)";
	public static final String emissionEffectiveNOx = "NOx排放绩效(g/kWh)";
	public static final String emissionEffectiveDust = "烟尘排放绩效(g/kWh)";
	public static final String emissionStrengthSO2 = "SO2排放强度(kg/万元)";
	public static final String emissionStrengthNOx = "NOx排放强度(kg/万元)";
	public static final String emissionStrengthDust = "烟尘排放强度(kg/万元)";
	public static final String consumeEffectiveCoal = "媒消耗绩效(g/kWh)";
	
	public static final String so2Code = "001";
	public static final String noxCode = "002";
	public static final String dustCode = "003";
	public static final String waterFlowCode = "B01";
	public static final String gasFlowCode = "B02";
	public static final String phCode = "001";
	public static final String nh3Code = "060";
	public static final String codCode = "011";

}
