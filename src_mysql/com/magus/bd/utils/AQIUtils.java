package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.AQIDayInfo;

public class AQIUtils {

	public final static String SO2CODE = "A21026";
	public final static String NOXCODE = "A21002";
	public final static String DUSTCODE = "A34013";

	/**
	 * 获取给定空气质量 区间内 所有有数据的时间值
	 * 
	 * @param beans
	 * @return
	 */
	public static List<String> getAQIInterval(List<AQIDayInfo> beans) {
		List<String> dateTimes = new ArrayList<String>();
		for (AQIDayInfo bean : beans) {
			String date = bean.getDate();
			dateTimes.add(date.substring(0, date.indexOf(" ")));
		}
		return dateTimes;
	}

	/**
	 * 获取给定空气质量 区间内 所有有数据的AQI 值
	 * 
	 * @param beans
	 * @return
	 */
	public static List<JSONObject> getAQIData(List<AQIDayInfo> beans) {
		List<JSONObject> aqiDatas = new ArrayList<JSONObject>();
		JSONObject o = null;
		for (AQIDayInfo bean : beans) {
			o = new JSONObject();
			o.put("value", bean.getAqi());
			o.put("name", bean.getFirstPoll());
			aqiDatas.add(o);
		}
		return aqiDatas;
	}

	/**
	 * 获取给定空气质量 区间内 所有有数据的AQI 值
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject fromatPollStrength(List<AQIDayInfo> beans) {
		JSONObject object = new JSONObject();
		List<Float> so2Strength = new ArrayList<Float>();
		List<Float> noxStrength = new ArrayList<Float>();
		List<Float> dustStrength = new ArrayList<Float>();
		for (AQIDayInfo bean : beans) {
			if (AQIUtils.SO2CODE.equals(bean.getPollType())) {
				so2Strength.add(bean.getStrength());
			} else if (AQIUtils.NOXCODE.equals(bean.getPollType())) {
				noxStrength.add(bean.getStrength());
			} else if (AQIUtils.DUSTCODE.equals(bean.getPollType())) {
				dustStrength.add(bean.getStrength());
			}
		}
		object.put("SO2", so2Strength);
		object.put("NOx", noxStrength);
		object.put("dust", dustStrength);
		return object;
	}

	/**
	 * 获取给定空气质量 区间内 所有有数据的AQI 值
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject fromatPollAmount(List<AQIDayInfo> beans, List<AQIDayInfo> powerBeans) {
		JSONObject object = new JSONObject();
		List<JSONObject> so2Amount = new ArrayList<JSONObject>();
		List<JSONObject> noxAmount = new ArrayList<JSONObject>();
		List<JSONObject> dustAmount = new ArrayList<JSONObject>();
		float so2Number = 0;
		float noxNumber = 0;
		float dustNumber = 0;
		for (AQIDayInfo bean : powerBeans) {
			JSONObject oo = new JSONObject();
			if (AQIUtils.SO2CODE.equals(bean.getPollType())) {
				oo.put("value", bean.getAmount());
				oo.put("name", "火电厂SO2");
				so2Number = bean.getAmount();
				so2Amount.add(oo);
			} else if (AQIUtils.NOXCODE.equals(bean.getPollType())) {
				oo.put("value", bean.getAmount());
				oo.put("name", "火电厂NOx");
				noxNumber = bean.getAmount();
				noxAmount.add(oo);
			} else if (AQIUtils.DUSTCODE.equals(bean.getPollType())) {
				oo.put("value", bean.getAmount());
				oo.put("name", "火电厂烟尘");
				dustNumber = bean.getAmount();
				dustAmount.add(oo);
			}
		}
		for (AQIDayInfo bean : beans) {
			JSONObject oo = new JSONObject();
			if (AQIUtils.SO2CODE.equals(bean.getPollType())) {
				oo.put("value", bean.getAmount() - so2Number);
				oo.put("name", "其它SO2");
				so2Amount.add(oo);
			} else if (AQIUtils.NOXCODE.equals(bean.getPollType())) {
				oo.put("value", bean.getAmount() - noxNumber);
				oo.put("name", "其它NOx");
				noxAmount.add(oo);
			} else if (AQIUtils.DUSTCODE.equals(bean.getPollType())) {
				oo.put("value", bean.getAmount() - dustNumber);
				oo.put("name", "其它烟尘");
				dustAmount.add(oo);
			}
		}
		object.put("SO2", so2Amount);
		object.put("NOx", noxAmount);
		object.put("dust", dustAmount);
		return object;
	}
}
