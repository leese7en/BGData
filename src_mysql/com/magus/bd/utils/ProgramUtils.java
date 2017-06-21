package com.magus.bd.utils;

import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.Region;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Program;
import com.magus.bd.entity.ResSuperLow;
import com.magus.bd.vo.ProgramTotal;

public class ProgramUtils {

	/**
	 * 将给定JSONArray 转为可用的机组编码数组
	 * 
	 * @param array
	 * @return
	 */
	public static List<Integer> formatJSONArrayToArray(JSONObject object, String[] years) {
		List<Integer> unitIds = new ArrayList<Integer>();
		for (String year : years) {
			JSONArray array = (JSONArray) object.get(year);
			if (array == null) {
				continue;
			}
			int length = array.size();
			for (int i = 0; i < length; i++) {
				Object id = array.get(i);
				if (id == null || "".equals(id)) {
					continue;
				}
				unitIds.add(Integer.parseInt(id.toString()));
			}
		}
		return unitIds;
	}

	/**
	 * 将 JSONArray 转为 ArrayList
	 * 
	 * @param array
	 * @return
	 */
	public static List<Integer> formatJSONArrayToArrayNew(JSONArray array) {
		List<Integer> unitIds = new ArrayList<Integer>();
		if (array == null || array.size() == 0) {
			return unitIds;
		}
		int length = array.size();
		for (int i = 0; i < length; i++) {
			String str = array.getString(i);
			unitIds.add(Integer.parseInt(((JSONObject) (JSONObject.parse(str))).getString("psCode")));

		}
		return unitIds;
	}

	/**
	 * 将 JSONArray 转为 ArrayList
	 * 
	 * @param array
	 * @return
	 */
	public static List<Integer> formatJSONArrayToArray(JSONArray array) {
		List<Integer> unitIds = new ArrayList<Integer>();
		if (array == null || array.size() == 0) {
			return unitIds;
		}
		int length = array.size();
		for (int i = 0; i < length; i++) {
			unitIds.add(Integer.parseInt(array.getString(i)));
		}
		return unitIds;
	}

	/**
	 * 将 JSONArray 转为 ArrayList
	 * 
	 * @param array
	 * @return
	 */
	public static List<Integer> formatJSONArrayToList(JSONArray array) {
		List<Integer> unitIds = new ArrayList<Integer>();
		if (array == null || array.size() == 0) {
			return unitIds;
		}
		int length = array.size();
		for (int i = 0; i < length; i++) {
			JSONObject obj = (JSONObject) JSONObject.parse(array.getString(i));
			unitIds.add(Integer.parseInt(obj.getString("unit")));
		}
		return unitIds;
	}

	/**
	 * 将 获取每年的操作集合
	 * 
	 * @param array
	 * @return
	 */
	public static List<Integer> formatMapArrayToArray(List<Integer> newMap, List<Integer> changeMap, List<Integer> closeMap) {
		List<Integer> ids = new ArrayList<Integer>();
		if (newMap != null) {
			ids.addAll(newMap);
		}
		ids.addAll(changeMap);
		ids.addAll(closeMap);
		return ids;
	}

	/**
	 * 格式化新建电厂 的格式
	 * 
	 * @param object
	 * @return
	 */
	public static List<ResSuperLow> formatProgramDetails(JSONObject object, String[] years) {
		List<ResSuperLow> beans = new ArrayList<ResSuperLow>();
		ResSuperLow bean = null;
		for (String year : years) {
			JSONArray array = object.getJSONArray(year);
			if (array == null || array.size() == 0) {
				continue;
			}
			int length = array.size();
			for (int i = 0; i < length; i++) {
				JSONObject oo = array.getJSONObject(i);
				bean = new ResSuperLow();
				bean.setCityId(oo.getString("cityId"));
				bean.setCityName(oo.getString("cityName"));
				bean.setYear(year);
				bean.setPsCode(oo.getString("psCode"));
				bean.setPsName(oo.getString("psName"));
				bean.setUnit(oo.getString("unit"));
				String installed = oo.getString("installed");
				if (installed != null && !"".equals(installed)) {
					bean.setInstalledMax(Float.parseFloat(installed));
				} else {
					bean.setInstalledMax(0.0f);
				}
				bean.setGasFlow(ProgramUtils.getPollSuperLow(bean.getInstalledMax()));
				bean.setGenElecAmount(ProgramUtils.getGenElecAmount(bean.getInstalledMax()));
				beans.add(bean);
			}
		}
		return beans;
	}

	/**
	 * 预览 超低排放
	 * 
	 * @param bean
	 * @param powerUnitInfo
	 * @return
	 */
	public static JSONObject formatProgram(Map<String, Float[]> changePowerUnit, Map<String, Float[]> closePowerUnit, Map<String, Float[]> newPowerUnit,
			String[] years, ResSuperLow powerInfo, String pollType) {
		JSONObject object = new JSONObject();
		List<Float> before = new ArrayList<Float>();
		List<Float> after = new ArrayList<Float>();
		List<Float> less = new ArrayList<Float>();
		List<Float> installed = new ArrayList<Float>();
		List<String> xAxis = new ArrayList<String>();
		float beforeO = 0;
		float afterO = 0;
		float lessO = 0;

		if ("SO2".equals(pollType)) {
			beforeO = powerInfo.getSo2Amount();
			afterO = powerInfo.getSo2Amount();
		} else if ("NOx".equals(pollType)) {
			beforeO = powerInfo.getNoxAmount();
			afterO = powerInfo.getNoxAmount();
		} else {
			beforeO = powerInfo.getDustAmount();
			afterO = powerInfo.getDustAmount();
		}

		float installedO = powerInfo.getInstalledMax();
		for (String year : years) {
			// 每年的减排量之和当年的操作整改和关停的机组有关，和以前的操作的机组没有任何关系
			lessO = 0;
			Float[] changeValue = changePowerUnit.get(year);
			if (changeValue != null) {
				afterO -= changeValue[2];
				lessO += changeValue[2];
			}
			Float[] closeValue = closePowerUnit.get(year);
			if (closeValue != null) {
				afterO -= closeValue[2];
				lessO += closeValue[2];
				installedO -= closeValue[3];
			}
			if (newPowerUnit != null) {
				Float[] newValue = newPowerUnit.get(year);
				if (newValue != null) {
					beforeO += newValue[1];
					afterO += newValue[1];
					installedO += newValue[3];
				}
			}
			before.add(beforeO);
			after.add(afterO);
			less.add(lessO);
			installed.add(installedO);
			xAxis.add(year);
			beforeO = afterO;
		}
		object.put("xAxis", xAxis);
		object.put("before", before);
		object.put("after", after);
		object.put("less", less);
		object.put("installed", installed);
		return object;
	}

	/**
	 * 处理方案明信息
	 * 
	 * @param beans
	 * @return
	 */
	public static List<Program> formatProgramDetails(List<ResSuperLow> beans, String pollType) {
		List<Program> array = new ArrayList<Program>();
		Program programDetails = null;
		for (ResSuperLow bean : beans) {
			programDetails = new Program();
			programDetails.setProgramDetailsId(bean.getId());
			programDetails.setPsCode(bean.getPsCode());
			programDetails.setUnit(bean.getUnit());
			programDetails.setInstalled(bean.getInstalledMax());
			programDetails.setCreateDate(DateUtils.formatDate(new Date()));
			if (pollType.equals("SO2")) {
				programDetails.setAmountBefore(bean.getSo2Amount());
				programDetails.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.so2Super));
				programDetails.setLessAmount(formatPollValue(bean.getSo2Amount(), bean.getGasFlow(), ResConst.so2Super));
			} else if (pollType.equals("NOx")) {
				programDetails.setAmountBefore(bean.getNoxAmount());
				programDetails.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.noxSuper));
				programDetails.setLessAmount(formatPollValue(bean.getNoxAmount(), bean.getGasFlow(), ResConst.noxSuper));
			} else {
				programDetails.setAmountBefore(bean.getDustAmount());
				programDetails.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.dustSuper));
				programDetails.setLessAmount(formatPollValue(bean.getDustAmount(), bean.getGasFlow(), ResConst.dustSuper));
			}
			array.add(programDetails);
		}
		return array;
	}

	/**
	 * 根据浓度和污染物排放量计算 超低排放侯的排放量
	 * 
	 * @param pollAmount
	 * @param gasFlow
	 * @param con
	 * @return
	 */
	public static float formatPollValue(float pollAmount, float gasFlow, float con) {
		float value = 0;
		float conTemp = 100000 * pollAmount / gasFlow;
		if (conTemp <= con) {
			return pollAmount;
		}
		value = (conTemp - con) * gasFlow / 100000;
		return value;
	}

	/**
	 * 超低排放后的量
	 * 
	 * @param gasAmount
	 * @param con
	 * @return
	 */
	public static float formatPollValue(float gasAmount, float con) {
		float value = 0;
		/**
		 * 烟气 流量 万立方米 浓度 mg/立方米
		 */
		value = gasAmount * con / 100000;
		return value;
	}

	/**
	 * 超低排放后的量
	 * 
	 * @param gasAmount
	 * @param con
	 * @return
	 */
	public static float formatPollEffective(float pollAmount, float genElecAmount) {
		float value = 0;
		/**
		 * 烟气 流量 万立方米 浓度 mg/立方米
		 */
		if (genElecAmount == 0) {
			return value;
		}
		value = pollAmount / genElecAmount * 10;
		return value;
	}

	public static float[] getPowerUnitInfoSuper(List<Program> program, Map<String, List> yearInfo) {
		float[] values = {};
		float before = 0;
		float after = 0;
		float less = 0;
		float installed = 0;

		for (String key : yearInfo.keySet()) {
			List<Integer> unitId = yearInfo.get(key);
			if ("new".equals(key)) {
				float newValue[] = powerUnitNew(program, unitId);
				after += newValue[1];
				installed += newValue[3];
			} else if ("rect".equals(key)) {
				float rectValue[] = powerUnitRect(program, unitId);
				before += rectValue[0];
				after += rectValue[1];
				less += rectValue[2];
				installed += rectValue[3];
			} else {
				float closeValue[] = powerUnitClose(program, unitId);
				before += closeValue[0];
				less += closeValue[2];
			}
		}
		values[0] = before;
		values[1] = after;
		values[2] = less;
		values[3] = installed;
		return values;
	}

	/**
	 * 新建机组 引起的排放量变化
	 * 
	 * @param programd
	 * @param unitId
	 * @return
	 */
	public static float[] powerUnitNew(List<Program> program, List<Integer> unitId) {
		float[] values = { 0, 0, 0, 0 };
		float after = 0;
		float installed = 0;
		for (Integer i : unitId) {
			for (Program bean : program) {
				if (i == bean.getProgramDetailsId()) {
					after += bean.getAmountAfter();
					installed += bean.getInstalled();
				}
			}
		}
		values[1] = after;
		values[3] = installed;
		return values;
	}

	/**
	 * 整改机组 引起的排放量变化
	 * 
	 * @param program
	 * @param unitId
	 * @return
	 */
	public static float[] powerUnitRect(List<Program> program, List<Integer> unitId) {
		float[] values = { 0, 0, 0, 0 };
		float before = 0;
		float after = 0;
		float less = 0;
		float installed = 0;
		for (Integer i : unitId) {
			for (Program bean : program) {
				if (i == bean.getProgramDetailsId()) {
					before += bean.getAmountBefore();
					after += bean.getAmountAfter();
					installed += bean.getInstalled();
					less += bean.getLessAmount();
				}
			}
		}
		values[0] = before;
		values[1] = after;
		values[2] = less;
		values[3] = installed;
		return values;
	}

	/**
	 * 关停机组 引起的排放量变化
	 * 
	 * @param program
	 * @param unitId
	 * @return
	 */
	public static float[] powerUnitClose(List<Program> program, List<Integer> unitId) {
		float[] values = { 0, 0, 0, 0 };
		float before = 0;
		float less = 0;
		for (Integer i : unitId) {
			for (Program bean : program) {
				if (i == bean.getProgramDetailsId()) {
					before += bean.getAmountBefore();
					less += bean.getLessAmount();
				}
			}
		}
		values[0] = before;
		values[2] = less;
		return values;
	}

	/**
	 * 关停机组 引起的排放量变化
	 * 
	 * @param program
	 * @param unitId
	 * @return
	 */
	public static Map formatProgramOperator(List<ResSuperLow> beans, JSONObject object, String[] years, String pollType, int operatorType) {
		Map<String, Float[]> values = new HashMap<String, Float[]>();
		List<Program> programDetails = formatProgramDetails(beans, pollType);
		switch (operatorType) {
		// 关停
		case ResConst.CLOSE:
			for (String year : years) {
				Float[] value = { 0f, 0f, 0f, 0f };
				float before = 0;
				float less = 0;
				float installed = 0;
				JSONArray array = (JSONArray) object.get(year);
				if (array == null || array.size() == 0) {
					continue;
				}
				int length = array.size();
				for (Program bean : programDetails) {
					for (int i = 0; i < length; i++) {
						if (bean.getProgramDetailsId() == Integer.parseInt(array.getString(i).toString())) {
							before += bean.getAmountBefore();
							installed += bean.getInstalled();
						}
					}
				}
				less = before;
				value[0] = before;
				value[2] = less;
				value[3] = installed;
				values.put(year, value);
			}
			break;
		// 整改
		case ResConst.CHANGE:
			for (String year : years) {
				Float[] value = { 0f, 0f, 0f, 0f };
				float before = 0;
				float after = 0;
				float less = 0;
				JSONArray array = (JSONArray) object.get(year);
				if (array == null || array.size() == 0) {
					continue;
				}
				int length = array.size();
				for (Program bean : programDetails) {
					for (int i = 0; i < length; i++) {
						if (bean.getProgramDetailsId() == Integer.parseInt(array.getString(i).toString())) {
							before += bean.getAmountBefore();
							after += bean.getAmountAfter();
							less += bean.getLessAmount();
						}
					}
				}
				value[0] = before;
				value[1] = after;
				value[2] = less;
				values.put(year, value);
			}
			break;
		default:
			break;
		}
		return values;
	}

	/**
	 * 新建机组 引起的数据变化
	 * 
	 * @param program
	 * @param unitId
	 * @return
	 */
	public static Map formatProgramOperatorNew(JSONObject object, String[] years, String pollType) {
		Map<String, Float[]> values = new HashMap<String, Float[]>();
		for (String year : years) {
			Float[] value = { 0f, 0f, 0f, 0f };
			float after = 0;
			float installed = 0;
			JSONArray array = (JSONArray) object.get(year);
			if (array == null || array.size() == 0) {
				continue;
			}
			int length = array.size();
			for (int i = 0; i < length; i++) {
				JSONObject oo = array.getJSONObject(i);
				float install = 0.0f;// oo.getFloatValue("installed");
				String instal = oo.getString("installed");
				if (instal != null && !"".equals(instal)) {
					install = Float.parseFloat(instal);
				}
				after += getPollSuperLow(install, pollType);
				installed += install;
			}
			value[1] = after;
			value[3] = installed;
			values.put(year, value);
		}
		return values;
	}

	/**
	 * 方案保存处理
	 * 
	 * @param changePowerUnit
	 * @param closePowerUnit
	 * @param newPowerUnit
	 * @return
	 */
	public static List<Program> formatProgramAdd(List<ResSuperLow> changePowerUnit, List<ResSuperLow> closePowerUnit, List<ResSuperLow> newPowerUnit,
			String pollType) {
		List<Program> proDetails = new ArrayList<Program>();
		Program pro = null;
		for (ResSuperLow bean : changePowerUnit) {
			pro = new Program();
			pro.setProgramDetailsId(bean.getId());
			pro.setCityName(bean.getCityName());
			pro.setPsCode(bean.getPsCode());
			pro.setPsName(bean.getPsName());
			pro.setYear(bean.getYear());
			pro.setUnit(bean.getUnit());
			pro.setGenElecAmount(bean.getGenElecAmount());
			pro.setInstalled(bean.getInstalledMax());
			pro.setOperatorType(ResConst.CHANGE);
			pro.setCreateDate(DateUtils.formatDate(new Date()));
			if (pollType.equals("SO2")) {
				pro.setEffective(bean.getSo2EffectiveMax());
				pro.setAmountBefore(bean.getSo2Amount());
				pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.so2Super));
				pro.setLessAmount(formatPollValue(bean.getSo2Amount(), bean.getGasFlow(), ResConst.so2Super));
			} else if (pollType.equals("NOx")) {
				pro.setEffective(bean.getNoxEffectiveMax());
				pro.setAmountBefore(bean.getNoxAmount());
				pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.noxSuper));
				pro.setLessAmount(formatPollValue(bean.getNoxAmount(), bean.getGasFlow(), ResConst.noxSuper));
			} else {
				pro.setEffective(bean.getDustEffectiveMax());
				pro.setAmountBefore(bean.getDustAmount());
				pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.dustSuper));
				pro.setLessAmount(formatPollValue(bean.getDustAmount(), bean.getGasFlow(), ResConst.dustSuper));
			}
			proDetails.add(pro);
		}
		for (ResSuperLow bean : closePowerUnit) {
			pro = new Program();
			pro.setProgramDetailsId(bean.getId());
			pro.setCityName(bean.getCityName());
			pro.setPsCode(bean.getPsCode());
			pro.setPsName(bean.getPsName());
			pro.setUnit(bean.getUnit());
			pro.setYear(bean.getYear());
			pro.setInstalled(bean.getInstalledMax());
			pro.setGenElecAmount(bean.getGenElecAmount());
			pro.setOperatorType(ResConst.CLOSE);
			pro.setCreateDate(DateUtils.formatDate(new Date()));
			if (pollType.equals("SO2")) {
				pro.setEffective(bean.getSo2EffectiveMax());
				pro.setAmountBefore(bean.getSo2Amount());
				pro.setAmountAfter(0);
				pro.setLessAmount(bean.getSo2Amount());
			} else if (pollType.equals("NOx")) {
				pro.setEffective(bean.getDustEffectiveMax());
				pro.setAmountBefore(bean.getNoxAmount());
				pro.setAmountAfter(0);
				pro.setLessAmount(bean.getNoxAmount());
			} else {
				pro.setEffective(bean.getDustEffectiveMax());
				pro.setAmountBefore(bean.getDustAmount());
				pro.setAmountAfter(0);
				pro.setLessAmount(bean.getDustAmount());
			}
			proDetails.add(pro);
		}
		if (newPowerUnit != null) {
			for (ResSuperLow bean : newPowerUnit) {
				pro = new Program();
				pro.setProgramDetailsId(-1);
				pro.setCityName(bean.getCityName());
				pro.setPsCode(bean.getPsCode());
				pro.setPsName(bean.getPsName());
				pro.setUnit(bean.getUnit());
				pro.setYear(bean.getYear());
				pro.setInstalled(bean.getInstalledMax());
				pro.setOperatorType(ResConst.NEW);
				pro.setGenElecAmount(bean.getGenElecAmount());
				pro.setCreateDate(DateUtils.formatDate(new Date()));
				if (pollType.equals("SO2")) {
					pro.setEffective(bean.getSo2EffectiveMax());
					pro.setAmountBefore(0);
					pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.so2Super));
					pro.setLessAmount(0 - pro.getAmountAfter());
				} else if (pollType.equals("NOx")) {
					pro.setEffective(bean.getNoxEffectiveMax());
					pro.setAmountBefore(0);
					pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.noxSuper));
					pro.setLessAmount(0 - pro.getAmountAfter());
				} else {
					pro.setEffective(bean.getDustEffectiveMax());
					pro.setAmountBefore(0);
					pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.dustSuper));
					pro.setLessAmount(0 - pro.getAmountAfter());
				}
				proDetails.add(pro);
			}
		}
		return proDetails;
	}

	/**
	 * 方案导出
	 * 
	 * @param program
	 * @param programDetail
	 * @param programDetails
	 * @return
	 */
	public static String exportProgram(Program program, List<Program> programDetail, List<Program> programDetails, String path, JSONObject object) {
		String fileName = null;
		// 第一步，创建一个webbook，对应一个Excel文件
		HSSFWorkbook wb = new HSSFWorkbook();

		// 表头样式
		HSSFCellStyle headerStyle = wb.createCellStyle();
		headerStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		headerStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 创建一个居中格式
		// style.setAlignment(HSSFCellStyle.VERTICAL_CENTER); // 创建一个居中格式
		HSSFFont headerFont = (HSSFFont) wb.createFont(); // 创建字体样式
		headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD); // 字体加粗
		headerFont.setFontName("宋体"); // 设置字体类型
		headerFont.setFontHeightInPoints((short) 14); // 设置字体大小
		headerStyle.setFont(headerFont); // 为标题样式设置字体样式
		// 内容样式
		HSSFCellStyle contentStyle = wb.createCellStyle();
		contentStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		contentStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 创建一个居中格式
		// style.setAlignment(HSSFCellStyle.VERTICAL_CENTER); // 创建一个居中格式
		HSSFFont contentFont = (HSSFFont) wb.createFont(); // 创建字体样式
		contentFont.setFontName("宋体"); // 设置字体类型
		contentFont.setFontHeightInPoints((short) 10); // 设置字体大小
		contentStyle.setFont(contentFont);
		List<ProgramTotal> total = new ArrayList<ProgramTotal>();
		ProgramTotal programTotal = null;
		// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
		for (int i = 0; i < programDetail.size(); i++) {
			programTotal = new ProgramTotal();
			float amountBefore = 0;
			float amountAfter = 0;
			float amountLess = 0;
			Program proDetail = programDetail.get(i);
			HSSFSheet sheet = wb.createSheet("超低排放-" + proDetail.getYear());

			// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short

			HSSFRow row = sheet.createRow((int) 0);
			HSSFCell cell = row.createCell((short) 0);
			row.setHeight((short) 500);
			sheet.setColumnWidth((short) 0, (short) (8 * 256));
			sheet.setColumnWidth((short) 1, (short) (10 * 256));
			sheet.setColumnWidth((short) 2, (short) (40 * 256));
			sheet.setColumnWidth((short) 3, (short) (10 * 256));
			sheet.setColumnWidth((short) 4, (short) (16 * 256));
			sheet.setColumnWidth((short) 5, (short) (16 * 256));
			sheet.setColumnWidth((short) 6, (short) (16 * 256));
			sheet.setColumnWidth((short) 7, (short) (12 * 256));
			sheet.setColumnWidth((short) 8, (short) (12 * 256));
			sheet.setColumnWidth((short) 9, (short) (12 * 256));
			cell.setCellStyle(headerStyle);
			sheet.addMergedRegion(new Region(0, (short) 0, 0, (short) 9));
			cell.setCellValue("超低排放预测方案");
			// 第四步，创建单元格，并设置值表头 设置表头居中
			row = sheet.createRow((int) 1);
			// style.setFont(contentFont);
			row.setHeight((short) 400);
			sheet.addMergedRegion(new Region(1, (short) 0, 1, (short) 1));
			cell = row.createCell((short) 0);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("开始年份");
			sheet.addMergedRegion(new Region(1, (short) 2, 1, (short) 2));
			cell = row.createCell((short) 2);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(program.getBeginYear());
			sheet.addMergedRegion(new Region(1, (short) 3, 1, (short) 4));
			cell = row.createCell((short) 3);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("结束年份");
			sheet.addMergedRegion(new Region(1, (short) 5, 1, (short) 5));
			cell = row.createCell((short) 5);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(program.getEndYear());
			sheet.addMergedRegion(new Region(1, (short) 6, 1, (short) 7));
			cell = row.createCell((short) 6);
			cell.setCellValue("污染物");
			cell.setCellStyle(contentStyle);
			sheet.addMergedRegion(new Region(1, (short) 8, 1, (short) 9));
			cell = row.createCell((short) 8);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(program.getPoll());

			// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
			row = sheet.createRow(2);
			row.setHeight((short) 400);
			// style.setFont(contentFont);
			// 第四步，创建单元格，并设置值

			cell = row.createCell((short) 0);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("操作类型");
			cell = row.createCell((short) 1);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("盟市");
			cell = row.createCell((short) 2);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("电厂名称");
			cell = row.createCell((short) 3);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("机组编号");
			cell = row.createCell((short) 4);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("装机容量(MW)");
			cell = row.createCell((short) 5);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("排放绩效(g/kWh)");
			cell = row.createCell((short) 6);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("预测排放绩效(g/kWh)");
			cell = row.createCell((short) 7);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("现状排放量(t)");
			cell = row.createCell((short) 8);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("预测排放量(t)");
			cell = row.createCell((short) 9);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("置换空间(t)");

			List<Program> changePower = new ArrayList<Program>();
			List<Program> closePower = new ArrayList<Program>();
			List<Program> newPower = new ArrayList<Program>();
			for (Program bean : programDetails) {
				if (proDetail.getYear().equals(bean.getYear())) {
					switch (bean.getOperatorType()) {
					case ResConst.NEW:
						newPower.add(bean);
						break;
					case ResConst.CLOSE:
						closePower.add(bean);
						break;
					case ResConst.CHANGE:
						changePower.add(bean);
						break;
					default:
						break;
					}
				}
			}
			int index = 3;
			int newLength = newPower.size();
			if (newLength > 0) {
				// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
				// 第四步，创建单元格，并设置值
				row = sheet.createRow(index);
				row.setHeight((short) 400);
				sheet.addMergedRegion(new Region(index, (short) 0, index + newLength - 1, (short) 0));
				cell = row.createCell((short) 0);
				cell.setCellStyle(contentStyle);
				cell.setCellValue("新建");
				for (int j = 0; j < newLength; j++) {
					Program bean = newPower.get(j);
					row = sheet.createRow(index);
					row.setHeight((short) 400);
					cell = row.createCell((short) 1);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getCityName());
					cell = row.createCell((short) 2);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getPsName());
					cell = row.createCell((short) 3);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getUnit());
					cell = row.createCell((short) 4);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getInstalled());
					cell = row.createCell((short) 5);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getEffective(), Utils.numberThree));
					cell = row.createCell((short) 6);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(ProgramUtils.formatPollEffective(bean.getAmountAfter(), bean.getGenElecAmount()),
							Utils.numberThree));
					cell = row.createCell((short) 7);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountBefore(), Utils.numberTwo));
					cell = row.createCell((short) 8);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountAfter(), Utils.numberTwo));
					cell = row.createCell((short) 9);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getLessAmount(), Utils.numberTwo));
					amountBefore += bean.getAmountBefore();
					amountAfter += bean.getAmountAfter();
					amountLess += bean.getLessAmount();
					programTotal.setNewUnit(bean.getInstalled() + programTotal.getNewUnit());
					programTotal.setAmountAfter(bean.getAmountAfter() + programTotal.getAmountAfter());
					programTotal.setAmountLess(bean.getLessAmount() + programTotal.getAmountLess());
					index++;
				}
			}
			int closeLength = closePower.size();
			if (closeLength > 0) {
				// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
				// 第四步，创建单元格，并设置值
				row = sheet.createRow(index);
				row.setHeight((short) 400);
				sheet.addMergedRegion(new Region(index, (short) 0, index + closeLength - 1, (short) 0));
				cell = row.createCell((short) 0);
				cell.setCellStyle(contentStyle);
				cell.setCellValue("关停");
				for (int j = 0; j < closeLength; j++) {
					Program bean = closePower.get(j);
					row = sheet.createRow(index);
					row.setHeight((short) 400);
					cell = row.createCell((short) 1);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getCityName());
					cell = row.createCell((short) 2);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getPsName());
					cell = row.createCell((short) 3);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getUnit());
					cell = row.createCell((short) 4);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getInstalled());
					cell = row.createCell((short) 5);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getEffective(), Utils.numberThree));
					cell = row.createCell((short) 6);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(ProgramUtils.formatPollEffective(bean.getAmountAfter(), bean.getGenElecAmount()),
							Utils.numberThree));
					cell = row.createCell((short) 7);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountBefore(), Utils.numberTwo));
					cell = row.createCell((short) 8);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountAfter(), Utils.numberTwo));
					cell = row.createCell((short) 9);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getLessAmount(), Utils.numberTwo));
					amountBefore += bean.getAmountBefore();
					amountAfter += bean.getAmountAfter();
					amountLess += bean.getLessAmount();
					programTotal.setCloseUnit(bean.getInstalled() + programTotal.getCloseUnit());
					programTotal.setAmountBefore(bean.getAmountBefore() + programTotal.getAmountBefore());
					programTotal.setAmountAfter(bean.getAmountAfter() + programTotal.getAmountAfter());
					programTotal.setAmountLess(bean.getLessAmount() + programTotal.getAmountLess());

					index++;
				}
			}
			int changeLength = changePower.size();
			if (changeLength > 0) {
				// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
				// 第四步，创建单元格，并设置值
				row = sheet.createRow(index);
				row.setHeight((short) 400);
				sheet.addMergedRegion(new Region(index, (short) 0, index + changeLength - 1, (short) 0));
				cell = row.createCell((short) 0);
				cell.setCellStyle(contentStyle);
				cell.setCellValue("整改");
				for (int j = 0; j < changeLength; j++) {
					Program bean = changePower.get(j);
					row = sheet.createRow(index);
					row.setHeight((short) 400);
					cell = row.createCell((short) 1);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getCityName());
					cell = row.createCell((short) 2);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getPsName());
					cell = row.createCell((short) 3);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getUnit());
					cell = row.createCell((short) 4);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getInstalled());
					cell = row.createCell((short) 5);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getEffective(), Utils.numberThree));
					cell = row.createCell((short) 6);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(ProgramUtils.formatPollEffective(bean.getAmountAfter(), bean.getGenElecAmount()),
							Utils.numberThree));
					cell = row.createCell((short) 7);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountBefore(), Utils.numberTwo));
					cell = row.createCell((short) 8);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountAfter(), Utils.numberTwo));
					cell = row.createCell((short) 9);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getLessAmount(), Utils.numberTwo));
					amountBefore += bean.getAmountBefore();
					amountAfter += bean.getAmountAfter();
					amountLess += bean.getLessAmount();

					programTotal.setChangeUnit(bean.getInstalled() + programTotal.getChangeUnit());
					programTotal.setAmountBefore(bean.getAmountBefore() + programTotal.getAmountBefore());
					programTotal.setAmountAfter(bean.getAmountAfter() + programTotal.getAmountAfter());
					programTotal.setAmountLess(bean.getLessAmount() + programTotal.getAmountLess());
					index++;
				}
			}
			// row.createCell((short) 0).setCellValue(proDetail.getYear());
			// sheet.addMergedRegion(new Region(i, (short) 1, i, (short) 3));
			row = sheet.createRow(index);
			row.setHeight((short) 400);
			sheet.addMergedRegion(new Region(index, (short) 0, index, (short) 6));
			cell = row.createCell((short) 0);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("小计");
			cell = row.createCell((short) 7);
			cell.setCellStyle(contentStyle);
			cell.setCellValue((String) Utils.numberFormat(amountBefore, Utils.numberTwo));
			cell = row.createCell((short) 8);
			cell.setCellStyle(contentStyle);
			cell.setCellValue((String) Utils.numberFormat(amountAfter, Utils.numberTwo));
			cell = row.createCell((short) 9);
			cell.setCellStyle(contentStyle);
			cell.setCellValue((String) Utils.numberFormat(amountLess, Utils.numberTwo));
			programTotal.setYear(proDetail.getYear());
			total.add(programTotal);
		}

		float newUnit = 0;
		float closeUnit = 0;
		float changeUnit = 0;
		float amountBefore = 0;
		float amountAfter = 0;
		float amountLess = 0;
		JSONArray installedArray = object.getJSONArray("installed");
		JSONArray beforeArray = object.getJSONArray("before");
		JSONArray afterArray = object.getJSONArray("after");
		JSONArray lessArray = object.getJSONArray("less");

		HSSFSheet sheet = wb.createSheet("超低排放总计");
		sheet.setDefaultRowHeight((short) (20 * 10));
		HSSFRow row = sheet.createRow((int) 0);
		HSSFCell cell = row.createCell((short) 0);
		row.setHeight((short) 500);
		sheet.setColumnWidth((short) 0, (short) (10 * 256));
		sheet.setColumnWidth((short) 1, (short) (12 * 256));
		sheet.setColumnWidth((short) 2, (short) (12 * 256));
		sheet.setColumnWidth((short) 3, (short) (12 * 256));
		sheet.setColumnWidth((short) 4, (short) (16 * 256));
		sheet.setColumnWidth((short) 5, (short) (16 * 256));
		sheet.setColumnWidth((short) 6, (short) (16 * 256));
		cell.setCellStyle(headerStyle);
		sheet.addMergedRegion(new Region(0, (short) 0, 0, (short) 6));
		cell.setCellValue("超低排放预测方案");
		// 第四步，创建单元格，并设置值表头 设置表头居中
		row = sheet.createRow((int) 1);
		row.setHeight((short) 400);
		cell = row.createCell((short) 0);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("开始年份");
		cell = row.createCell((short) 1);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(program.getBeginYear());
		cell = row.createCell((short) 2);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("结束年份");

		cell = row.createCell((short) 3);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(program.getEndYear());

		sheet.addMergedRegion(new Region(1, (short) 4, 1, (short) 5));
		cell = row.createCell((short) 4);
		cell.setCellValue("污染物");
		cell.setCellStyle(contentStyle);
		sheet.addMergedRegion(new Region(1, (short) 6, 1, (short) 7));
		cell = row.createCell((short) 6);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(program.getPoll());

		// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
		row = sheet.createRow(2);
		row.setHeight((short) 400);
		// 第四步，创建单元格，并设置值
		cell = row.createCell((short) 0);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("年份");
		cell = row.createCell((short) 1);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("装机总量(MW)");
		cell = row.createCell((short) 2);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("整改机组(MW)");
		cell = row.createCell((short) 3);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("关停机组(MW)");
		cell = row.createCell((short) 4);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("新建机组(MW)");
		cell = row.createCell((short) 5);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("排放现状总量(t)");
		cell = row.createCell((short) 6);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("预测排放总量(t)");
		cell = row.createCell((short) 7);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("预测削减量(t)");
		int index = 3;
		for (ProgramTotal bean : total) {
			row = sheet.createRow(index);
			row.setHeight((short) 400);
			// 第四步，创建单元格，并设置值
			cell = row.createCell((short) 0);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(bean.getYear());
			cell = row.createCell((short) 1);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(installedArray.getString(index - 3));
			cell = row.createCell((short) 2);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(bean.getChangeUnit());
			cell = row.createCell((short) 3);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(bean.getCloseUnit());
			cell = row.createCell((short) 4);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(bean.getNewUnit());
			cell = row.createCell((short) 5);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(beforeArray.getString(index - 3));
			cell = row.createCell((short) 6);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(afterArray.getString(index - 3));
			cell = row.createCell((short) 7);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(lessArray.getString(index - 3));
			newUnit += bean.getNewUnit();
			changeUnit += bean.getChangeUnit();
			closeUnit += bean.getCloseUnit();
			amountBefore += bean.getAmountAfter();
			amountAfter += bean.getAmountAfter();
			amountLess += bean.getAmountLess();
			index++;
		}
		row = sheet.createRow(index);
		row.setHeight((short) 400);
		// 第四步，创建单元格，并设置值
		cell = row.createCell((short) 0);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("总计");
		cell = row.createCell((short) 2);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(changeUnit);
		cell = row.createCell((short) 3);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(closeUnit);
		cell = row.createCell((short) 4);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(newUnit);
		// 第六步，将文件存到指定位置
		try {
			fileName = "超低排放预测" + new Date().getTime() + ".xls";
			FileOutputStream fout = new FileOutputStream(path + "/files/" + fileName);
			wb.write(fout);
			fout.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fileName;
	}

	/**
	 * 方案导出
	 * 
	 * @param program
	 * @param programDetail
	 * @param programDetails
	 * @return
	 */
	public static String exportProgramBack(Program program, List<Program> programDetail, List<Program> programDetails, String path, JSONObject object) {

		String fileName = null;
		// 第一步，创建一个webbook，对应一个Excel文件
		HSSFWorkbook wb = new HSSFWorkbook();
		// 表头样式
		HSSFCellStyle headerStyle = wb.createCellStyle();
		headerStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		headerStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 创建一个居中格式
		// style.setAlignment(HSSFCellStyle.VERTICAL_CENTER); // 创建一个居中格式
		HSSFFont headerFont = (HSSFFont) wb.createFont(); // 创建字体样式
		headerFont.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD); // 字体加粗
		headerFont.setFontName("宋体"); // 设置字体类型
		headerFont.setFontHeightInPoints((short) 14); // 设置字体大小
		headerStyle.setFont(headerFont); // 为标题样式设置字体样式
		// 内容样式
		HSSFCellStyle contentStyle = wb.createCellStyle();
		contentStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER); // 创建一个居中格式
		contentStyle.setVerticalAlignment(HSSFCellStyle.VERTICAL_CENTER); // 创建一个居中格式
		// style.setAlignment(HSSFCellStyle.VERTICAL_CENTER); // 创建一个居中格式
		HSSFFont contentFont = (HSSFFont) wb.createFont(); // 创建字体样式
		contentFont.setFontName("宋体"); // 设置字体类型
		contentFont.setFontHeightInPoints((short) 10); // 设置字体大小
		contentStyle.setFont(contentFont);
		List<ProgramTotal> total = new ArrayList<ProgramTotal>();
		ProgramTotal programTotal = null;
		// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
		for (int i = 0; i < programDetail.size(); i++) {
			programTotal = new ProgramTotal();
			float amountBefore = 0;
			float amountAfter = 0;
			float amountLess = 0;
			Program proDetail = programDetail.get(i);
			HSSFSheet sheet = wb.createSheet("超低排放逆推-" + proDetail.getYear());

			// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short

			HSSFRow row = sheet.createRow((int) 0);
			HSSFCell cell = row.createCell((short) 0);
			row.setHeight((short) 500);
			sheet.setColumnWidth((short) 0, (short) (8 * 256));
			sheet.setColumnWidth((short) 1, (short) (10 * 256));
			sheet.setColumnWidth((short) 2, (short) (40 * 256));
			sheet.setColumnWidth((short) 3, (short) (10 * 256));
			sheet.setColumnWidth((short) 4, (short) (16 * 256));
			sheet.setColumnWidth((short) 5, (short) (16 * 256));
			sheet.setColumnWidth((short) 6, (short) (16 * 256));
			sheet.setColumnWidth((short) 7, (short) (12 * 256));
			sheet.setColumnWidth((short) 8, (short) (12 * 256));
			sheet.setColumnWidth((short) 9, (short) (12 * 256));
			cell.setCellStyle(headerStyle);
			sheet.addMergedRegion(new Region(0, (short) 0, 0, (short) 9));
			cell.setCellValue("超低排放逆推预测方案");
			// 第四步，创建单元格，并设置值表头 设置表头居中
			row = sheet.createRow((int) 1);
			// style.setFont(contentFont);
			row.setHeight((short) 400);
			sheet.addMergedRegion(new Region(1, (short) 0, 1, (short) 1));
			cell = row.createCell((short) 0);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("开始年份");
			sheet.addMergedRegion(new Region(1, (short) 2, 1, (short) 2));
			cell = row.createCell((short) 2);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(program.getBeginYear());
			sheet.addMergedRegion(new Region(1, (short) 3, 1, (short) 4));
			cell = row.createCell((short) 3);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("结束年份");
			sheet.addMergedRegion(new Region(1, (short) 5, 1, (short) 5));
			cell = row.createCell((short) 5);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(program.getEndYear());
			sheet.addMergedRegion(new Region(1, (short) 6, 1, (short) 7));
			cell = row.createCell((short) 6);
			cell.setCellValue("污染物");
			cell.setCellStyle(contentStyle);
			sheet.addMergedRegion(new Region(1, (short) 8, 1, (short) 9));
			cell = row.createCell((short) 8);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(program.getPoll());

			// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
			row = sheet.createRow(2);
			row.setHeight((short) 400);
			// style.setFont(contentFont);
			// 第四步，创建单元格，并设置值
			cell = row.createCell((short) 0);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("操作类型");
			cell = row.createCell((short) 1);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("盟市");
			cell = row.createCell((short) 2);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("电厂名称");
			cell = row.createCell((short) 3);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("机组编号");
			cell = row.createCell((short) 4);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("装机容量(MW)");
			cell = row.createCell((short) 5);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("排放绩效(g/kWh)");
			cell = row.createCell((short) 6);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("预测排放绩效(g/kWh)");
			cell = row.createCell((short) 7);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("现状排放量(t)");
			cell = row.createCell((short) 8);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("预测排放量(t)");
			cell = row.createCell((short) 9);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("置换空间(t)");

			List<Program> changePower = new ArrayList<Program>();
			List<Program> closePower = new ArrayList<Program>();
			for (Program bean : programDetails) {
				if (proDetail.getYear().equals(bean.getYear())) {
					switch (bean.getOperatorType()) {
					case ResConst.CLOSE:
						closePower.add(bean);
						break;
					case ResConst.CHANGE:
						changePower.add(bean);
						break;
					default:
						break;
					}
				}
			}
			int index = 3;
			int closeLength = closePower.size();
			if (closeLength > 0) {
				// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
				// 第四步，创建单元格，并设置值
				row = sheet.createRow(index);
				row.setHeight((short) 400);
				sheet.addMergedRegion(new Region(index, (short) 0, index + closeLength - 1, (short) 0));
				cell = row.createCell((short) 0);
				cell.setCellStyle(contentStyle);
				cell.setCellValue("关停");
				for (int j = 0; j < closeLength; j++) {
					Program bean = closePower.get(j);
					row = sheet.createRow(index);
					row.setHeight((short) 400);
					cell = row.createCell((short) 1);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getCityName());
					cell = row.createCell((short) 2);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getPsName());
					cell = row.createCell((short) 3);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getUnit());
					cell = row.createCell((short) 4);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getInstalled());
					cell = row.createCell((short) 5);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getEffective(), Utils.numberThree));
					cell = row.createCell((short) 6);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(ProgramUtils.formatPollEffective(bean.getAmountAfter(), bean.getGenElecAmount()),
							Utils.numberThree));
					cell = row.createCell((short) 7);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountBefore(), Utils.numberTwo));
					cell = row.createCell((short) 8);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountAfter(), Utils.numberTwo));
					cell = row.createCell((short) 9);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getLessAmount(), Utils.numberTwo));
					amountBefore += bean.getAmountBefore();
					amountAfter += bean.getAmountAfter();
					amountLess += bean.getLessAmount();
					programTotal.setCloseUnit(bean.getInstalled() + programTotal.getCloseUnit());
					programTotal.setAmountBefore(bean.getAmountBefore() + programTotal.getAmountBefore());
					programTotal.setAmountAfter(bean.getAmountAfter() + programTotal.getAmountAfter());
					programTotal.setAmountLess(bean.getLessAmount() + programTotal.getAmountLess());
					index++;
				}
			}
			int changeLength = changePower.size();
			if (changeLength > 0) {
				// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
				// 第四步，创建单元格，并设置值
				row = sheet.createRow(index);
				row.setHeight((short) 400);
				sheet.addMergedRegion(new Region(index, (short) 0, index + changeLength - 1, (short) 0));
				cell = row.createCell((short) 0);
				cell.setCellStyle(contentStyle);
				cell.setCellValue("整改");
				for (int j = 0; j < changeLength; j++) {
					Program bean = changePower.get(j);
					row = sheet.createRow(index);
					row.setHeight((short) 400);
					cell = row.createCell((short) 1);
					cell.setCellStyle(contentStyle);

					cell.setCellValue(bean.getCityName());
					cell = row.createCell((short) 2);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getPsName());
					cell = row.createCell((short) 3);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getUnit());
					cell = row.createCell((short) 4);
					cell.setCellStyle(contentStyle);
					cell.setCellValue(bean.getInstalled());
					cell = row.createCell((short) 5);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getEffective(), Utils.numberThree));
					cell = row.createCell((short) 6);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(ProgramUtils.formatPollEffective(bean.getAmountAfter(), bean.getGenElecAmount()),
							Utils.numberThree));
					cell = row.createCell((short) 7);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountBefore(), Utils.numberTwo));
					cell = row.createCell((short) 8);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getAmountAfter(), Utils.numberTwo));
					cell = row.createCell((short) 9);
					cell.setCellStyle(contentStyle);
					cell.setCellValue((String) Utils.numberFormat(bean.getLessAmount(), Utils.numberTwo));
					amountBefore += bean.getAmountBefore();
					amountAfter += bean.getAmountAfter();
					amountLess += bean.getLessAmount();

					programTotal.setChangeUnit(bean.getInstalled() + programTotal.getChangeUnit());
					programTotal.setAmountBefore(bean.getAmountBefore() + programTotal.getAmountBefore());
					programTotal.setAmountAfter(bean.getAmountAfter() + programTotal.getAmountAfter());
					programTotal.setAmountLess(bean.getLessAmount() + programTotal.getAmountLess());
					index++;
				}
			}
			// row.createCell((short) 0).setCellValue(proDetail.getYear());
			// sheet.addMergedRegion(new Region(i, (short) 1, i, (short) 3));
			row = sheet.createRow(index);
			row.setHeight((short) 400);
			sheet.addMergedRegion(new Region(index, (short) 0, index, (short) 6));
			cell = row.createCell((short) 0);
			cell.setCellStyle(contentStyle);
			cell.setCellValue("小计");
			cell = row.createCell((short) 7);
			cell.setCellStyle(contentStyle);
			cell.setCellValue((String) Utils.numberFormat(amountAfter, Utils.numberTwo));
			cell = row.createCell((short) 8);
			cell.setCellStyle(contentStyle);
			cell.setCellValue((String) Utils.numberFormat(amountBefore, Utils.numberTwo));
			cell = row.createCell((short) 9);
			cell.setCellStyle(contentStyle);
			cell.setCellValue((String) Utils.numberFormat(amountLess, Utils.numberTwo));
			programTotal.setYear(proDetail.getYear());
			total.add(programTotal);
		}

		float newUnit = 0;
		float closeUnit = 0;
		float changeUnit = 0;
		float amountBefore = 0;
		float amountAfter = 0;
		float amountLess = 0;
		JSONArray installedArray = object.getJSONArray("installed");
		JSONArray beforeArray = object.getJSONArray("before");
		JSONArray afterArray = object.getJSONArray("after");
		JSONArray lessArray = object.getJSONArray("less");

		HSSFSheet sheet = wb.createSheet("超低排放逆推总计");
		sheet.setDefaultRowHeight((short) (20 * 10));
		HSSFRow row = sheet.createRow((int) 0);
		HSSFCell cell = row.createCell((short) 0);
		row.setHeight((short) 500);
		sheet.setColumnWidth((short) 0, (short) (10 * 256));
		sheet.setColumnWidth((short) 1, (short) (12 * 256));
		sheet.setColumnWidth((short) 2, (short) (12 * 256));
		sheet.setColumnWidth((short) 3, (short) (12 * 256));
		sheet.setColumnWidth((short) 4, (short) (16 * 256));
		sheet.setColumnWidth((short) 5, (short) (16 * 256));
		sheet.setColumnWidth((short) 6, (short) (16 * 256));
		sheet.addMergedRegion(new Region(0, (short) 0, 0, (short) 6));
		cell.setCellStyle(headerStyle);
		cell.setCellValue("超低排放逆推预测方案");
		// 第四步，创建单元格，并设置值表头 设置表头居中
		row = sheet.createRow((int) 1);
		row.setHeight((short) 400);
		sheet.addMergedRegion(new Region(1, (short) 0, 1, (short) 0));
		cell = row.createCell((short) 0);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("开始年份");
		sheet.addMergedRegion(new Region(1, (short) 1, 1, (short) 1));
		cell = row.createCell((short) 1);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(program.getBeginYear());
		sheet.addMergedRegion(new Region(1, (short) 2, 1, (short) 2));
		cell = row.createCell((short) 2);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("结束年份");
		sheet.addMergedRegion(new Region(1, (short) 3, 1, (short) 3));
		cell = row.createCell((short) 3);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(program.getEndYear());
		sheet.addMergedRegion(new Region(1, (short) 4, 1, (short) 5));
		cell = row.createCell((short) 4);
		cell.setCellValue("污染物");
		cell.setCellStyle(contentStyle);
		sheet.addMergedRegion(new Region(1, (short) 6, 1, (short) 6));
		cell = row.createCell((short) 6);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(program.getPoll());
		// 第五步，写入实体数据 实际应用中这些数据从数据库得到，
		row = sheet.createRow(2);
		row.setHeight((short) 400);
		// 第四步，创建单元格，并设置值
		cell = row.createCell((short) 0);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("年份");
		cell = row.createCell((short) 1);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("装机总量(MW)");
		cell = row.createCell((short) 2);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("整改机组(MW)");
		cell = row.createCell((short) 3);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("关停机组(MW)");
		cell = row.createCell((short) 4);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("排放现状总量(t)");
		cell = row.createCell((short) 5);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("预测排放总量(t)");
		cell = row.createCell((short) 6);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("预测削减量(t)");
		int index = 3;
		for (ProgramTotal bean : total) {
			row = sheet.createRow(index);
			row.setHeight((short) 400);
			// 第四步，创建单元格，并设置值
			cell = row.createCell((short) 0);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(bean.getYear());
			cell = row.createCell((short) 1);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(installedArray.getString(index - 3));
			cell = row.createCell((short) 2);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(bean.getChangeUnit());
			cell = row.createCell((short) 3);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(bean.getCloseUnit());
			cell = row.createCell((short) 4);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(beforeArray.getString(index - 3));
			cell = row.createCell((short) 5);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(afterArray.getString(index - 3));
			cell = row.createCell((short) 6);
			cell.setCellStyle(contentStyle);
			cell.setCellValue(lessArray.getString(index - 3));
			changeUnit += bean.getChangeUnit();
			closeUnit += bean.getCloseUnit();
			amountBefore += bean.getAmountAfter();
			amountAfter += bean.getAmountAfter();
			amountLess += bean.getAmountLess();
			index++;
		}
		row = sheet.createRow(index);
		row.setHeight((short) 400);
		// 第四步，创建单元格，并设置值
		cell = row.createCell((short) 0);
		cell.setCellStyle(contentStyle);
		cell.setCellValue("总计");
		cell = row.createCell((short) 2);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(changeUnit);
		cell = row.createCell((short) 3);
		cell.setCellStyle(contentStyle);
		cell.setCellValue(closeUnit);
		// 第六步，将文件存到指定位置
		try {
			fileName = "超低排放逆推" + new Date().getTime() + ".xls";
			FileOutputStream fout = new FileOutputStream(path + "/files/" + fileName);
			wb.write(fout);
			fout.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return fileName;
	}

	/**
	 * 判断对应的 满足条件的 信息是否可以执行超低排放是否可以超过 目标过多
	 * 
	 * @param beans
	 * @param bean
	 * @param aims
	 */
	public static List<ResSuperLow> formatPowerUnitBreak(List<ResSuperLow> beans, ResSuperLow bean, float aimsMin, float aimsMax) {

		List<ResSuperLow> result = new ArrayList<ResSuperLow>();
		if ("SO2".equals(bean.getPoll())) {
			for (ResSuperLow o : beans) {
				if (formatPowerUnitBreakBias(o.getSo2Amount(), ResConst.so2Super, o.getGasFlow(), aimsMin, aimsMax)) {
					result.add(o);
				}
			}
		} else if ("NOx".equals(bean.getPoll())) {
			for (ResSuperLow o : beans) {
				if (formatPowerUnitBreakBias(o.getNoxAmount(), ResConst.noxSuper, o.getGasFlow(), aimsMin, aimsMax)) {
					result.add(o);
				}
			}
		} else {
			for (ResSuperLow o : beans) {
				if (formatPowerUnitBreakBias(o.getDustAmount(), ResConst.dustSuper, o.getGasFlow(), aimsMin, aimsMax)) {
					result.add(o);
				}
			}
		}
		return result;
	}

	/**
	 * 判断给定的 参数时候满足要求
	 * 
	 * @param amount
	 * @param strengthBreak
	 * @param gasFlow
	 * @param aims
	 * @return
	 */
	public static boolean formatPowerUnitBreakBias(float amount, float strengthBreak, float gasFlow, float aimsMin, float aimsMax) {
		float after = strengthBreak * gasFlow / 100000;
		if ((amount - after) > aimsMax * (1 + ResConst.deviation) || (amount - after) < aimsMin * (1 - ResConst.deviation)) {
			return false;
		}
		return true;
	}

	/**
	 * 预览 超低排放逆推
	 * 
	 * @param bean
	 * @param powerUnitInfo
	 * @return
	 */
	public static JSONObject formatProgramBack(Map<String, Float[]> changePowerUnit, Map<String, Float[]> closePowerUnit, String[] years,
			ResSuperLow powerInfo, String pollType) {

		JSONObject object = new JSONObject();
		List<Float> before = new ArrayList<Float>();
		List<Float> after = new ArrayList<Float>();
		List<Float> less = new ArrayList<Float>();
		List<Float> installed = new ArrayList<Float>();
		List<String> xAxis = new ArrayList<String>();
		float beforeO = 0;
		float afterO = 0;
		float lessO = 0;
		// 当关停一个机组的时候影响 下一年的 变化量
		float closeYear = 0;
		if ("SO2".equals(pollType)) {
			beforeO = powerInfo.getSo2Amount();
			afterO = powerInfo.getSo2Amount();
		} else if ("NOx".equals(pollType)) {
			beforeO = powerInfo.getNoxAmount();
			afterO = powerInfo.getNoxAmount();
		} else {
			beforeO = powerInfo.getDustAmount();
			afterO = powerInfo.getDustAmount();
		}

		float installedO = powerInfo.getInstalledMax() * 10;
		for (String year : years) {
			Float[] changeValue = changePowerUnit.get(year);
			if (changeValue != null) {
				afterO -= changeValue[2];
				lessO += changeValue[2];
			}

			Float[] closeValue = closePowerUnit.get(year);

			if (closeValue != null) {
				closeYear += closeValue[0];
				afterO -= closeValue[2];
				lessO += closeValue[2];
				installedO -= closeValue[3];
			}
			before.add(beforeO);
			after.add(afterO);
			less.add(lessO);
			installed.add(installedO);
			xAxis.add(year);
			beforeO -= closeYear;
			afterO -= closeYear;
		}
		object.put("xAxis", xAxis);
		object.put("before", before);
		object.put("after", after);
		object.put("less", less);
		object.put("installed", installed);
		return object;

	}

	/**
	 * 超低排放 方案 逆推 保存处理
	 * 
	 * @param changePowerUnit
	 * @param closePowerUnit
	 * @param newPowerUnit
	 * @return
	 */
	public static List<Program> formatProgramBackAdd(List<ResSuperLow> changePowerUnit, List<ResSuperLow> closePowerUnit, String pollType) {
		List<Program> proDetails = new ArrayList<Program>();
		Program pro = null;
		for (ResSuperLow bean : changePowerUnit) {
			pro = new Program();
			pro.setProgramDetailsId(bean.getId());
			pro.setCityName(bean.getCityName());
			pro.setPsCode(bean.getPsCode());
			pro.setPsName(bean.getPsName());
			pro.setUnit(bean.getUnit());
			pro.setGenElecAmount(bean.getGenElecAmount());
			pro.setInstalled(bean.getInstalledMax());
			pro.setOperatorType(ResConst.CHANGE);
			pro.setCreateDate(DateUtils.formatDate(new Date()));
			if (pollType.equals("SO2")) {
				pro.setEffective(bean.getSo2EffectiveMax());
				pro.setAmountBefore(bean.getSo2Amount());
				pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.so2Super));
				pro.setLessAmount(formatPollValue(bean.getSo2Amount(), bean.getGasFlow(), ResConst.so2Super));
			} else if (pollType.equals("NOx")) {
				pro.setEffective(bean.getNoxEffectiveMax());
				pro.setAmountBefore(bean.getNoxAmount());
				pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.noxSuper));
				pro.setLessAmount(formatPollValue(bean.getNoxAmount(), bean.getGasFlow(), ResConst.noxSuper));
			} else {
				pro.setEffective(bean.getDustEffectiveMax());
				pro.setAmountBefore(bean.getDustAmount());
				pro.setAmountAfter(formatPollValue(bean.getGasFlow(), ResConst.dustSuper));
				pro.setLessAmount(formatPollValue(bean.getDustAmount(), bean.getGasFlow(), ResConst.dustSuper));
			}
			proDetails.add(pro);
		}
		for (ResSuperLow bean : closePowerUnit) {
			pro = new Program();
			pro.setProgramDetailsId(bean.getId());
			pro.setCityName(bean.getCityName());
			pro.setPsCode(bean.getPsCode());
			pro.setPsName(bean.getPsName());
			pro.setUnit(bean.getUnit());
			pro.setGenElecAmount(bean.getGenElecAmount());
			pro.setInstalled(bean.getInstalledMax());
			pro.setOperatorType(ResConst.CLOSE);
			pro.setCreateDate(DateUtils.formatDate(new Date()));
			if (pollType.equals("SO2")) {
				pro.setEffective(bean.getSo2EffectiveMax());
				pro.setAmountBefore(bean.getSo2Amount());
				pro.setAmountAfter(0);
				pro.setLessAmount(bean.getSo2Amount());
			} else if (pollType.equals("NOx")) {
				pro.setEffective(bean.getNoxEffectiveMax());
				pro.setAmountBefore(bean.getNoxAmount());
				pro.setAmountAfter(0);
				pro.setLessAmount(bean.getNoxAmount());
			} else {
				pro.setEffective(bean.getDustEffectiveMax());
				pro.setAmountBefore(bean.getDustAmount());
				pro.setAmountAfter(0);
				pro.setLessAmount(bean.getDustAmount());
			}
			proDetails.add(pro);
		}
		return proDetails;
	}

	/**
	 * 计算超低排放的信息 污染物排放量
	 * 
	 * @param installed
	 * @param pollType
	 * @return
	 */
	public static float getPollSuperLow(float installed, String pollType) {
		float num = 0;
		float emission = 0;
		if ("SO2".equals(pollType)) {
			emission = ResConst.so2Super;
		} else if ("NOx".equals(pollType)) {
			emission = ResConst.noxSuper;
		} else {
			emission = ResConst.dustSuper;
		}
		num = installed * 2600f * 4979f * emission / 0.56f / 1000000000;
		return num;
	}

	/**
	 * 计算超低排放的信息 污染物排放量
	 * 
	 * @param installed
	 * @param pollType
	 * @return
	 */
	public static float getPollSuperLow(float installed) {
		float num = 0;
		num = installed * 2600f * 4979f / 0.56f / 10000;
		return num;
	}

	/**
	 * 计算超低排放的信息 污染物排放量
	 * 
	 * @param installed
	 * @param pollType
	 * @return
	 */
	public static float getGenElecAmount(float installed) {
		float num = 0;
		num = installed * 4979f * 100;
		return num;
	}

	/**
	 * 获取排放绩效
	 * 
	 * @param pollType
	 * @return
	 */
	public static float getPollEffective(String pollType) {
		float concen = ResConst.so2Super;
		if ("NOx".equalsIgnoreCase(pollType)) {
			concen = 50f;
		} else if ("dust".equalsIgnoreCase(pollType)) {
			concen = 10;
		}
		float sum = (float) (26 * concen / 0.56 / 10000f);
		return sum;
	}

	/**
	 * 查询快捷方案的时候 获取对应的方案信息
	 * 
	 * @param program
	 * @param programDetail
	 * @param programDetails
	 * @param superLows
	 * @return
	 */
	public static JSONObject formatProgramInfo(Program program, List<Program> programDetail, List<Program> programDetails, List<ResSuperLow> superLows) {
		JSONObject object = new JSONObject();
		// 将明细信息和年份数据对应上
		for (Program o : programDetail) {
			for (Program oo : programDetails) {
				if (oo.getProgramDetailId() == o.getProgramDetailId()) {
					oo.setYear(o.getYear());
				}
			}
		}
		// 将 明细信息和具体的数据信息对应上
		List<ResSuperLow> beans = new ArrayList<ResSuperLow>();
		ResSuperLow bean = null;
		for (Program oo : programDetails) {
			// 如果是新建机组
			if (oo.getOperatorType() == ResConst.NEW) {
				bean = new ResSuperLow();
				bean.setId(oo.getProgramDetailsId());
				bean.setYear(oo.getYear());
				bean.setPsCode(oo.getPsCode());
				bean.setPsName(oo.getPsName());
				bean.setUnit(oo.getUnit());
				bean.setCityName(oo.getCityName());
				bean.setInstalledMax(oo.getInstalled());
				bean.setOperatorType(ResConst.NEW);
				bean.setSo2EffectiveMax(ProgramUtils.getPollEffective("SO2"));
				bean.setNoxEffectiveMax(ProgramUtils.getPollEffective("NOx"));
				bean.setDustEffectiveMax(ProgramUtils.getPollEffective("dust"));
				beans.add(bean);
				continue;
			}
			for (ResSuperLow o : superLows) {
				// 如果是整改或关停机组
				if (o.getPsCode().equals(oo.getPsCode()) && o.getUnit().equals(oo.getUnit())) {
					bean = new ResSuperLow();
					bean = o;
					bean.setYear(oo.getYear());
					bean.setOperatorType(oo.getOperatorType());
					beans.add(bean);
					break;
				}
			}
		}
		for (ResSuperLow o : beans) {
			if ("SO2".equals(program.getPoll())) {
				o.setCloseLessAmount(o.getSo2Amount());
				o.setChangeLessAmount(o.getSo2Amount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.so2Super));
				o.setPollEffective(o.getSo2EffectiveMax());
			} else if ("NOx".equals(program.getPoll())) {
				o.setCloseLessAmount(o.getNoxAmount());
				o.setChangeLessAmount(o.getNoxAmount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.noxSuper));
				o.setPollEffective(o.getNoxEffectiveMax());
			} else {
				o.setCloseLessAmount(o.getDustAmount());
				o.setChangeLessAmount(o.getDustAmount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.dustSuper));
				o.setDustEffectiveMax(o.getDustEffectiveMax());
			}
		}
		// 设置表头信息
		Map programMap = new HashMap();
		programMap.put("programId", program.getProgramId());
		programMap.put("beginYear", program.getBeginYear());
		programMap.put("endYear", program.getEndYear());
		programMap.put("poll", program.getPoll());
		// 设置明细信息
		object.put("parent", programMap);
		object.put("detail", programDetail);
		object.put("details", beans);
		System.out.println("beans :" + JSONArray.toJSONString(object));
		return object;
	}
}
