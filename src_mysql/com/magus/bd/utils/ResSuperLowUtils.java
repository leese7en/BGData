package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.List;

import com.magus.bd.vo.Parameter;

public class ResSuperLowUtils {

	/**
	 * 格式化 给定的区间范围
	 * 
	 * @param beans
	 * @return
	 */
	public static List<Parameter> formatEmission(String[] beans) {
		List<Parameter> para = new ArrayList<Parameter>();
		Parameter p = null;
		for (String bean : beans) {
			String[] ps = bean.split("-");
			p = new Parameter();
			// 当区间法务
			if (ps.length != 2) {
				continue;
			}
			p.setBegin(Float.parseFloat(ps[0]));
			p.setEnd(Float.parseFloat(ps[1]));
			para.add(p);
		}
		return para;
	}

	/**
	 * 获取给定区间内的最大值
	 * 
	 * @param beans
	 * @return
	 */
	public static float formatEmissionMax(String[] beans) {
		for (String bean : beans) {
			String[] ps = bean.split("-");
			if (ps.length == 1) {
				return Float.parseFloat(ps[0]);
			}
		}
		return 0;
	}

	/**
	 * 计算超低排放的排放量
	 * 
	 * @param gasFlow
	 * @param effective
	 * @return
	 */
	public static float superLowAmout(float gasFlow, float effective) {
		return gasFlow * effective / 100000;
	}
}
