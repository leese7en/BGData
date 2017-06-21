package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.LinkedMap;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResQuota;
import com.magus.bd.entity.ResQuotaParameter;

public class ResQuotaUtils {

	/**
	 * 格式化盟市信息 指标得分信息
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static List<ResQuota> formatCityQuota(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		List<ResQuota> cityBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> cityMap = new HashMap<String, ResQuota>();
		Map<String, Integer> cityNumber = new HashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota cityBean = cityMap.get(bean.getCityId());
			if (cityBean == null) {
				cityBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			cityBean.setCityId(bean.getCityId());
			cityBean.setCityName(bean.getCityName());
			cityBean.setConstant(bean.getConstant() + cityBean.getConstant());
			cityBean.setFluctuation(bean.getFluctuation() + cityBean.getFluctuation());
			cityBean.setHandicapping(bean.getHandicapping() + cityBean.getHandicapping());
			cityBean.setMutation(bean.getMutation() + cityBean.getMutation());
			cityBean.setScreenJump(bean.getScreenJump() + cityBean.getScreenJump());
			cityBean.setComplete(bean.getComplete() + cityBean.getComplete());
			cityBean.setEffective(bean.getEffective() + cityBean.getEffective());
			cityBean.setReliable(bean.getReliable() + cityBean.getReliable());

			cityBean.setConstantWeights(bean.getConstant() * weight.getConstant() + cityBean.getConstantWeights());
			cityBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ cityBean.getFluctuationWeights());
			cityBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ cityBean.getHandicappingWeights());
			cityBean.setMutationWeights(bean.getMutation() * weight.getMutation() + cityBean.getMutationWeights());
			cityBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
					+ cityBean.getScreenJumpWeights());
			cityBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + cityBean.getCompleteWeights());
			cityBean.setEffectiveWeights(bean.getEffective() * weight.getEffective() + cityBean.getEffectiveWeights());
			cityBean.setReliableWeights(bean.getReliable() * weight.getReliable() + cityBean.getReliableWeights());

			cityBean.setTotal(bean.getTotal() + cityBean.getTotal());
			cityMap.put(bean.getCityId(), cityBean);
			// 计算当前盟市个数
			Integer num = cityNumber.get(bean.getCityId());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			cityNumber.put(bean.getCityId(), num);
		}
		// 设置盟市得分情况
		for (String city : cityMap.keySet()) {
			ResQuota cityBean = cityMap.get(city);
			int number = cityNumber.get(city);
			cityBean.setConstant(cityBean.getConstant() / number);
			cityBean.setFluctuation(cityBean.getFluctuation() / number);
			cityBean.setHandicapping(cityBean.getHandicapping() / number);
			cityBean.setMutation(cityBean.getMutation() / number);
			cityBean.setScreenJump(cityBean.getScreenJump() / number);
			cityBean.setComplete(cityBean.getComplete() / number);
			cityBean.setEffective(cityBean.getEffective() / number);
			cityBean.setReliable(cityBean.getReliable() / number);

			cityBean.setConstantWeights(cityBean.getConstantWeights() / number);
			cityBean.setFluctuationWeights(cityBean.getFluctuationWeights() / number);
			cityBean.setHandicappingWeights(cityBean.getHandicappingWeights() / number);
			cityBean.setMutationWeights(cityBean.getMutationWeights() / number);
			cityBean.setScreenJumpWeights(cityBean.getScreenJumpWeights() / number);
			cityBean.setCompleteWeights(cityBean.getCompleteWeights() / number);
			cityBean.setEffectiveWeights(cityBean.getEffectiveWeights() / number);
			cityBean.setReliableWeights(cityBean.getReliableWeights() / number);

			cityBean.setTotal(cityBean.getTotal() / number);
			cityBeans.add(cityBean);
		}
		return cityBeans;

	}

	/**
	 * 格式化行业得分信息
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static List<ResQuota> formatPSTypeQuota(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		List<ResQuota> psTypeBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> psTypeMap = new HashMap<String, ResQuota>();
		Map<String, Integer> psTypeNumber = new HashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota psTypeBean = psTypeMap.get(bean.getPsType());
			if (psTypeBean == null) {
				psTypeBean = new ResQuota();
			}
			// 设置 企业类型指标得分信息
			psTypeBean.setPsType(bean.getPsType());
			psTypeBean.setConstant(bean.getConstant() + psTypeBean.getConstant());
			psTypeBean.setFluctuation(bean.getFluctuation() + psTypeBean.getFluctuation());
			psTypeBean.setHandicapping(bean.getHandicapping() + psTypeBean.getHandicapping());
			psTypeBean.setMutation(bean.getMutation() + psTypeBean.getMutation());
			psTypeBean.setScreenJump(bean.getScreenJump() + psTypeBean.getScreenJump());
			psTypeBean.setComplete(bean.getComplete() + psTypeBean.getComplete());
			psTypeBean.setEffective(bean.getEffective() + psTypeBean.getEffective());
			psTypeBean.setReliable(bean.getReliable() + psTypeBean.getReliable());

			psTypeBean.setConstantWeights(bean.getConstant() * weight.getConstant() + psTypeBean.getConstantWeights());
			psTypeBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ psTypeBean.getFluctuationWeights());
			psTypeBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ psTypeBean.getHandicappingWeights());
			psTypeBean.setMutationWeights(bean.getMutation() * weight.getMutation() + psTypeBean.getMutationWeights());
			psTypeBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
					+ psTypeBean.getScreenJumpWeights());
			psTypeBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + psTypeBean.getCompleteWeights());
			psTypeBean.setEffectiveWeights(bean.getEffective() * weight.getEffective()
					+ psTypeBean.getEffectiveWeights());
			psTypeBean.setReliableWeights(bean.getReliable() * weight.getReliable() + psTypeBean.getReliableWeights());

			psTypeBean.setTotal(bean.getTotal() + psTypeBean.getTotal());
			psTypeMap.put(bean.getPsType(), psTypeBean);
			// 计算当前行业个数
			Integer num = psTypeNumber.get(bean.getPsType());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			psTypeNumber.put(bean.getPsType(), num);
		}
		// 设置行业得分情况
		for (String psType : psTypeMap.keySet()) {
			ResQuota psTypeBean = psTypeMap.get(psType);
			int number = psTypeNumber.get(psType);
			psTypeBean.setConstant(psTypeBean.getConstant() / number);
			psTypeBean.setFluctuation(psTypeBean.getFluctuation() / number);
			psTypeBean.setHandicapping(psTypeBean.getHandicapping() / number);
			psTypeBean.setMutation(psTypeBean.getMutation() / number);
			psTypeBean.setScreenJump(psTypeBean.getScreenJump() / number);
			psTypeBean.setComplete(psTypeBean.getComplete() / number);
			psTypeBean.setEffective(psTypeBean.getEffective() / number);
			psTypeBean.setReliable(psTypeBean.getReliable() / number);

			psTypeBean.setConstantWeights(psTypeBean.getConstantWeights() / number);
			psTypeBean.setFluctuationWeights(psTypeBean.getFluctuationWeights() / number);
			psTypeBean.setHandicappingWeights(psTypeBean.getHandicappingWeights() / number);
			psTypeBean.setMutationWeights(psTypeBean.getMutationWeights() / number);
			psTypeBean.setScreenJumpWeights(psTypeBean.getScreenJumpWeights() / number);
			psTypeBean.setCompleteWeights(psTypeBean.getCompleteWeights() / number);
			psTypeBean.setEffectiveWeights(psTypeBean.getEffectiveWeights() / number);
			psTypeBean.setReliableWeights(psTypeBean.getReliableWeights() / number);

			psTypeBean.setTotal(psTypeBean.getTotal() / number);
			psTypeBeans.add(psTypeBean);
		}
		return psTypeBeans;

	}

	/**
	 * 格式化 企业信息 得分信息
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static List<ResQuota> formatResQuota(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		List<ResQuota> resBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> resMap = new HashMap<String, ResQuota>();
		Map<String, Integer> resNumber = new HashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota resBean = resMap.get(bean.getPsName());
			if (resBean == null) {
				resBean = new ResQuota();
			}
			// 设置 企业指标得分信息
			resBean.setPsCode(bean.getPsCode());
			resBean.setPsName(bean.getPsName());
			resBean.setConstant(bean.getConstant() + resBean.getConstant());
			resBean.setFluctuation(bean.getFluctuation() + resBean.getFluctuation());
			resBean.setHandicapping(bean.getHandicapping() + resBean.getHandicapping());
			resBean.setMutation(bean.getMutation() + resBean.getMutation());
			resBean.setScreenJump(bean.getScreenJump() + resBean.getScreenJump());
			resBean.setComplete(bean.getComplete() + resBean.getComplete());
			resBean.setEffective(bean.getEffective() + resBean.getEffective());
			resBean.setReliable(bean.getReliable() + resBean.getReliable());

			resBean.setConstantWeights(bean.getConstant() * weight.getConstant() + resBean.getConstantWeights());
			resBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ resBean.getFluctuationWeights());
			resBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ resBean.getHandicappingWeights());
			resBean.setMutationWeights(bean.getMutation() * weight.getMutation() + resBean.getMutationWeights());
			resBean
					.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
							+ resBean.getScreenJumpWeights());
			resBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + resBean.getCompleteWeights());
			resBean.setEffectiveWeights(bean.getEffective() * weight.getEffective() + resBean.getEffectiveWeights());
			resBean.setReliableWeights(bean.getReliable() * weight.getReliable() + resBean.getReliableWeights());

			resBean.setTotal(bean.getTotal() + resBean.getTotal());
			resMap.put(bean.getPsName(), resBean);
			// 计算当前企业个数
			Integer num = resNumber.get(bean.getPsName());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			resNumber.put(bean.getPsName(), num);
		}
		// 设置企业得分情况
		for (String res : resMap.keySet()) {
			ResQuota resBean = resMap.get(res);
			int number = resNumber.get(res);
			resBean.setConstant(resBean.getConstant() / number);
			resBean.setFluctuation(resBean.getFluctuation() / number);
			resBean.setHandicapping(resBean.getHandicapping() / number);
			resBean.setMutation(resBean.getMutation() / number);
			resBean.setScreenJump(resBean.getScreenJump() / number);
			resBean.setComplete(resBean.getComplete() / number);
			resBean.setEffective(resBean.getEffective() / number);
			resBean.setReliable(resBean.getReliable() / number);

			resBean.setConstantWeights(resBean.getConstantWeights() / number);
			resBean.setFluctuationWeights(resBean.getFluctuationWeights() / number);
			resBean.setHandicappingWeights(resBean.getHandicappingWeights() / number);
			resBean.setMutationWeights(resBean.getMutationWeights() / number);
			resBean.setScreenJumpWeights(resBean.getScreenJumpWeights() / number);
			resBean.setCompleteWeights(resBean.getCompleteWeights() / number);
			resBean.setEffectiveWeights(resBean.getEffectiveWeights() / number);
			resBean.setReliableWeights(resBean.getReliableWeights() / number);

			resBean.setTotal(resBean.getTotal() / number);
			resBeans.add(resBean);
		}
		return resBeans;

	}

	/**
	 * 查看某一具体盟市的在某一时间段内的明细
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static ResQuota formatCityQuotaDetailSta(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		ResQuota cityBean = new ResQuota();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			// 设置 盟市指标得分信息
			cityBean.setCityId(bean.getCityId());
			cityBean.setCityName(bean.getCityName());
			cityBean.setConstant(bean.getConstant() + cityBean.getConstant());
			cityBean.setFluctuation(bean.getFluctuation() + cityBean.getFluctuation());
			cityBean.setHandicapping(bean.getHandicapping() + cityBean.getHandicapping());
			cityBean.setMutation(bean.getMutation() + cityBean.getMutation());
			cityBean.setScreenJump(bean.getScreenJump() + cityBean.getScreenJump());
			cityBean.setComplete(bean.getComplete() + cityBean.getComplete());
			cityBean.setEffective(bean.getEffective() + cityBean.getEffective());
			cityBean.setReliable(bean.getReliable() + cityBean.getReliable());
			cityBean.setConstantWeights(bean.getConstant() * weight.getConstant() + cityBean.getConstantWeights());
			cityBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ cityBean.getFluctuationWeights());
			cityBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ cityBean.getHandicappingWeights());
			cityBean.setMutationWeights(bean.getMutation() * weight.getMutation() + cityBean.getMutationWeights());
			cityBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
					+ cityBean.getScreenJumpWeights());
			cityBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + cityBean.getCompleteWeights());
			cityBean.setEffectiveWeights(bean.getEffective() * weight.getEffective() + cityBean.getEffectiveWeights());
			cityBean.setReliableWeights(bean.getReliable() * weight.getReliable() + cityBean.getReliableWeights());

			cityBean.setTotal(bean.getTotal() + cityBean.getTotal());
		}
		// 设置盟市得分情况
		int number = beans.size();
		cityBean.setConstant(cityBean.getConstant() / number);
		cityBean.setFluctuation(cityBean.getFluctuation() / number);
		cityBean.setHandicapping(cityBean.getHandicapping() / number);
		cityBean.setMutation(cityBean.getMutation() / number);
		cityBean.setScreenJump(cityBean.getScreenJump() / number);
		cityBean.setComplete(cityBean.getComplete() / number);
		cityBean.setEffective(cityBean.getEffective() / number);
		cityBean.setReliable(cityBean.getReliable() / number);

		cityBean.setConstantWeights(cityBean.getConstantWeights() / number);
		cityBean.setFluctuationWeights(cityBean.getFluctuationWeights() / number);
		cityBean.setHandicappingWeights(cityBean.getHandicappingWeights() / number);
		cityBean.setMutationWeights(cityBean.getMutationWeights() / number);
		cityBean.setScreenJumpWeights(cityBean.getScreenJumpWeights() / number);
		cityBean.setCompleteWeights(cityBean.getCompleteWeights() / number);
		cityBean.setEffectiveWeights(cityBean.getEffectiveWeights() / number);
		cityBean.setReliableWeights(cityBean.getReliableWeights() / number);

		cityBean.setTotal(cityBean.getTotal() / number);
		return cityBean;
	}

	/**
	 * 查看某一行业在某段时间时间 内的具体的指标等分
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static ResQuota formatPSTypeQuotaDetailSta(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		ResQuota psTypeBean = new ResQuota();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			// 设置 行业指标得分信息
			psTypeBean.setPsType(bean.getPsType());
			psTypeBean.setConstant(bean.getConstant() + psTypeBean.getConstant());
			psTypeBean.setFluctuation(bean.getFluctuation() + psTypeBean.getFluctuation());
			psTypeBean.setHandicapping(bean.getHandicapping() + psTypeBean.getHandicapping());
			psTypeBean.setMutation(bean.getMutation() + psTypeBean.getMutation());
			psTypeBean.setScreenJump(bean.getScreenJump() + psTypeBean.getScreenJump());
			psTypeBean.setComplete(bean.getComplete() + psTypeBean.getComplete());
			psTypeBean.setEffective(bean.getEffective() + psTypeBean.getEffective());
			psTypeBean.setReliable(bean.getReliable() + psTypeBean.getReliable());

			psTypeBean.setConstantWeights(bean.getConstant() * weight.getConstant() + psTypeBean.getConstantWeights());
			psTypeBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ psTypeBean.getFluctuationWeights());
			psTypeBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ psTypeBean.getHandicappingWeights());
			psTypeBean.setMutationWeights(bean.getMutation() * weight.getMutation() + psTypeBean.getMutationWeights());
			psTypeBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
					+ psTypeBean.getScreenJumpWeights());
			psTypeBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + psTypeBean.getCompleteWeights());
			psTypeBean.setEffectiveWeights(bean.getEffective() * weight.getEffective()
					+ psTypeBean.getEffectiveWeights());
			psTypeBean.setReliableWeights(bean.getReliable() * weight.getReliable() + psTypeBean.getReliableWeights());

			psTypeBean.setTotal(bean.getTotal() + psTypeBean.getTotal());
		}
		// 设置盟市得分情况
		int number = beans.size();
		psTypeBean.setConstant(psTypeBean.getConstant() / number);
		psTypeBean.setFluctuation(psTypeBean.getFluctuation() / number);
		psTypeBean.setHandicapping(psTypeBean.getHandicapping() / number);
		psTypeBean.setMutation(psTypeBean.getMutation() / number);
		psTypeBean.setScreenJump(psTypeBean.getScreenJump() / number);
		psTypeBean.setComplete(psTypeBean.getComplete() / number);
		psTypeBean.setEffective(psTypeBean.getEffective() / number);
		psTypeBean.setReliable(psTypeBean.getReliable() / number);

		psTypeBean.setConstantWeights(psTypeBean.getConstantWeights() / number);
		psTypeBean.setFluctuationWeights(psTypeBean.getFluctuationWeights() / number);
		psTypeBean.setHandicappingWeights(psTypeBean.getHandicappingWeights() / number);
		psTypeBean.setMutationWeights(psTypeBean.getMutationWeights() / number);
		psTypeBean.setScreenJumpWeights(psTypeBean.getScreenJumpWeights() / number);
		psTypeBean.setCompleteWeights(psTypeBean.getCompleteWeights() / number);
		psTypeBean.setEffectiveWeights(psTypeBean.getEffectiveWeights() / number);
		psTypeBean.setReliableWeights(psTypeBean.getReliableWeights() / number);

		psTypeBean.setTotal(psTypeBean.getTotal() / number);
		return psTypeBean;
	}

	/**
	 * 查看某一 企业在某一时间段内的得分情况
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static ResQuota formatResQuotaDetailSta(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		ResQuota psTypeBean = new ResQuota();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			// 设置 行业指标得分信息
			psTypeBean.setPsType(bean.getPsType());
			psTypeBean.setConstant(bean.getConstant() + psTypeBean.getConstant());
			psTypeBean.setFluctuation(bean.getFluctuation() + psTypeBean.getFluctuation());
			psTypeBean.setHandicapping(bean.getHandicapping() + psTypeBean.getHandicapping());
			psTypeBean.setMutation(bean.getMutation() + psTypeBean.getMutation());
			psTypeBean.setScreenJump(bean.getScreenJump() + psTypeBean.getScreenJump());
			psTypeBean.setComplete(bean.getComplete() + psTypeBean.getComplete());
			psTypeBean.setEffective(bean.getEffective() + psTypeBean.getEffective());
			psTypeBean.setReliable(bean.getReliable() + psTypeBean.getReliable());

			psTypeBean.setConstantWeights(bean.getConstant() * weight.getConstant() + psTypeBean.getConstantWeights());
			psTypeBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ psTypeBean.getFluctuationWeights());
			psTypeBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ psTypeBean.getHandicappingWeights());
			psTypeBean.setMutationWeights(bean.getMutation() * weight.getMutation() + psTypeBean.getMutationWeights());
			psTypeBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
					+ psTypeBean.getScreenJumpWeights());
			psTypeBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + psTypeBean.getCompleteWeights());
			psTypeBean.setEffectiveWeights(bean.getEffective() * weight.getEffective()
					+ psTypeBean.getEffectiveWeights());
			psTypeBean.setReliableWeights(bean.getReliable() * weight.getReliable() + psTypeBean.getReliableWeights());

			psTypeBean.setTotal(bean.getTotal() + psTypeBean.getTotal());
		}
		// 设置盟市得分情况
		int number = beans.size();
		psTypeBean.setConstant(psTypeBean.getConstant() / number);
		psTypeBean.setFluctuation(psTypeBean.getFluctuation() / number);
		psTypeBean.setHandicapping(psTypeBean.getHandicapping() / number);
		psTypeBean.setMutation(psTypeBean.getMutation() / number);
		psTypeBean.setScreenJump(psTypeBean.getScreenJump() / number);
		psTypeBean.setComplete(psTypeBean.getComplete() / number);
		psTypeBean.setEffective(psTypeBean.getEffective() / number);
		psTypeBean.setReliable(psTypeBean.getReliable() / number);

		psTypeBean.setConstantWeights(psTypeBean.getConstantWeights() / number);
		psTypeBean.setFluctuationWeights(psTypeBean.getFluctuationWeights() / number);
		psTypeBean.setHandicappingWeights(psTypeBean.getHandicappingWeights() / number);
		psTypeBean.setMutationWeights(psTypeBean.getMutationWeights() / number);
		psTypeBean.setScreenJumpWeights(psTypeBean.getScreenJumpWeights() / number);
		psTypeBean.setCompleteWeights(psTypeBean.getCompleteWeights() / number);
		psTypeBean.setEffectiveWeights(psTypeBean.getEffectiveWeights() / number);
		psTypeBean.setReliableWeights(psTypeBean.getReliableWeights() / number);
		psTypeBean.setTotal(psTypeBean.getTotal() / number);
		return psTypeBean;
	}

	/**
	 * 查看某一具体盟市在某段时间内的各项指标明细的明细
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static List<ResQuota> formatCityQuotaDetailInterval(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight, String beginMonth, String endMonth) {
		List<ResQuota> monthBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> monthMap = new HashMap<String, ResQuota>();
		Map<String, Integer> monthNumber = new HashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota monthBean = monthMap.get(bean.getDate());
			if (monthBean == null) {
				monthBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			monthBean.setDate(bean.getDate());
			monthBean.setConstant(bean.getConstant() + monthBean.getConstant());
			monthBean.setFluctuation(bean.getFluctuation() + monthBean.getFluctuation());
			monthBean.setHandicapping(bean.getHandicapping() + monthBean.getHandicapping());
			monthBean.setMutation(bean.getMutation() + monthBean.getMutation());
			monthBean.setScreenJump(bean.getScreenJump() + monthBean.getScreenJump());
			monthBean.setComplete(bean.getComplete() + monthBean.getComplete());
			monthBean.setEffective(bean.getEffective() + monthBean.getEffective());
			monthBean.setReliable(bean.getReliable() + monthBean.getReliable());
			monthBean.setTotal(bean.getTotal() + monthBean.getTotal());
			monthMap.put(bean.getDate(), monthBean);
			// 计算当前盟市个数
			Integer num = monthNumber.get(bean.getDate());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			monthNumber.put(bean.getDate(), num);
		}
		// 设置盟市得分情况
		int begin = Integer.parseInt(beginMonth);
		int end = Integer.parseInt(endMonth);
		for (int i = begin; i <= end; i++) {
			ResQuota monthBean = monthMap.get(i + "");
			int number = monthNumber.get(i + "");
			monthBean.setConstant(monthBean.getConstant() / number);
			monthBean.setFluctuation(monthBean.getFluctuation() / number);
			monthBean.setHandicapping(monthBean.getHandicapping() / number);
			monthBean.setMutation(monthBean.getMutation() / number);
			monthBean.setScreenJump(monthBean.getScreenJump() / number);
			monthBean.setComplete(monthBean.getComplete() / number);
			monthBean.setEffective(monthBean.getEffective() / number);
			monthBean.setReliable(monthBean.getReliable() / number);
			monthBean.setTotal(monthBean.getTotal() / number);
			monthBeans.add(monthBean);
		}
		return monthBeans;
	}

	/**
	 * 查看某一具体盟市在某段时间内的各项指标明细的明细
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static List<ResQuota> formatCityQuotaLine(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		List<ResQuota> monthBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> monthMap = new LinkedHashMap<String, ResQuota>();
		Map<String, Integer> monthNumber = new LinkedHashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota monthBean = monthMap.get(bean.getCityId() + "-" + bean.getDate());
			if (monthBean == null) {
				monthBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			monthBean.setDate(bean.getDate());
			monthBean.setCityId(bean.getCityId());
			monthBean.setCityName(bean.getCityName());
			monthBean.setConstant(bean.getConstant() + monthBean.getConstant());
			monthBean.setFluctuation(bean.getFluctuation() + monthBean.getFluctuation());
			monthBean.setHandicapping(bean.getHandicapping() + monthBean.getHandicapping());
			monthBean.setMutation(bean.getMutation() + monthBean.getMutation());
			monthBean.setScreenJump(bean.getScreenJump() + monthBean.getScreenJump());
			monthBean.setComplete(bean.getComplete() + monthBean.getComplete());
			monthBean.setEffective(bean.getEffective() + monthBean.getEffective());
			monthBean.setReliable(bean.getReliable() + monthBean.getReliable());

			monthBean.setConstantWeights(bean.getConstant() * weight.getConstant() + monthBean.getConstantWeights());
			monthBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ monthBean.getFluctuationWeights());
			monthBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ monthBean.getHandicappingWeights());
			monthBean.setMutationWeights(bean.getMutation() * weight.getMutation() + monthBean.getMutationWeights());
			monthBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
					+ monthBean.getScreenJumpWeights());
			monthBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + monthBean.getCompleteWeights());
			monthBean
					.setEffectiveWeights(bean.getEffective() * weight.getEffective() + monthBean.getEffectiveWeights());
			monthBean.setReliableWeights(bean.getReliable() * weight.getReliable() + monthBean.getReliableWeights());

			monthBean.setTotal(bean.getTotal() + monthBean.getTotal());
			monthMap.put(bean.getCityId() + "-" + bean.getDate(), monthBean);
			// 计算当前盟市个数
			Integer num = monthNumber.get(bean.getCityId() + "-" + bean.getDate());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			monthNumber.put(bean.getCityId() + "-" + bean.getDate(), num);
		}
		// 设置盟市得分情况
		for (String key : monthMap.keySet()) {
			ResQuota monthBean = monthMap.get(key);
			int number = monthNumber.get(key);
			monthBean.setConstant(monthBean.getConstant() / number);
			monthBean.setFluctuation(monthBean.getFluctuation() / number);
			monthBean.setHandicapping(monthBean.getHandicapping() / number);
			monthBean.setMutation(monthBean.getMutation() / number);
			monthBean.setScreenJump(monthBean.getScreenJump() / number);
			monthBean.setComplete(monthBean.getComplete() / number);
			monthBean.setEffective(monthBean.getEffective() / number);
			monthBean.setReliable(monthBean.getReliable() / number);

			monthBean.setConstantWeights(monthBean.getConstantWeights() / number);
			monthBean.setFluctuationWeights(monthBean.getFluctuationWeights() / number);
			monthBean.setHandicappingWeights(monthBean.getHandicappingWeights() / number);
			monthBean.setMutationWeights(monthBean.getMutationWeights() / number);
			monthBean.setScreenJumpWeights(monthBean.getScreenJumpWeights() / number);
			monthBean.setCompleteWeights(monthBean.getCompleteWeights() / number);
			monthBean.setEffectiveWeights(monthBean.getEffectiveWeights() / number);
			monthBean.setReliableWeights(monthBean.getReliableWeights() / number);

			monthBean.setTotal(monthBean.getTotal() / number);
			monthBeans.add(monthBean);
		}
		return monthBeans;
	}

	/**
	 * 查看某一具体盟市在某段时间内的各项指标明细的明细
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static List<ResQuota> formatPSTypeQuotaLine(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		List<ResQuota> psTypeBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> psTypeMap = new HashMap<String, ResQuota>();
		Map<String, Integer> psTypeNumber = new HashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota psTypeBean = psTypeMap.get(bean.getPsType());
			if (psTypeBean == null) {
				psTypeBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			psTypeBean.setDate(bean.getDate());
			psTypeBean.setPsType(bean.getPsType());
			psTypeBean.setCityName(bean.getCityName());
			psTypeBean.setConstant(bean.getConstant() + psTypeBean.getConstant());
			psTypeBean.setFluctuation(bean.getFluctuation() + psTypeBean.getFluctuation());
			psTypeBean.setHandicapping(bean.getHandicapping() + psTypeBean.getHandicapping());
			psTypeBean.setMutation(bean.getMutation() + psTypeBean.getMutation());
			psTypeBean.setScreenJump(bean.getScreenJump() + psTypeBean.getScreenJump());
			psTypeBean.setComplete(bean.getComplete() + psTypeBean.getComplete());
			psTypeBean.setEffective(bean.getEffective() + psTypeBean.getEffective());
			psTypeBean.setReliable(bean.getReliable() + psTypeBean.getReliable());
			psTypeBean.setTotal(bean.getTotal() + psTypeBean.getTotal());
			psTypeMap.put(bean.getPsType(), psTypeBean);
			// 计算当前盟市个数
			Integer num = psTypeNumber.get(bean.getPsType());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			psTypeNumber.put(bean.getPsType(), num);
		}
		// 设置盟市得分情况
		for (String key : psTypeMap.keySet()) {
			ResQuota psTypeBean = psTypeMap.get(key);
			int number = psTypeNumber.get(key);
			psTypeBean.setConstant(psTypeBean.getConstant() / number);
			psTypeBean.setFluctuation(psTypeBean.getFluctuation() / number);
			psTypeBean.setHandicapping(psTypeBean.getHandicapping() / number);
			psTypeBean.setMutation(psTypeBean.getMutation() / number);
			psTypeBean.setScreenJump(psTypeBean.getScreenJump() / number);
			psTypeBean.setComplete(psTypeBean.getComplete() / number);
			psTypeBean.setEffective(psTypeBean.getEffective() / number);
			psTypeBean.setReliable(psTypeBean.getReliable() / number);
			psTypeBean.setTotal(psTypeBean.getTotal() / number);
			psTypeBeans.add(psTypeBean);
		}
		return psTypeBeans;
	}

	/**
	 * 查看某一具体盟市在某段时间内的各项指标明细的明细
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static List<ResQuota> formatCityQuotaCity(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight, String beginMonth, String endMonth, String cityId) {
		List<ResQuota> monthBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> monthMap = new LinkedHashMap<String, ResQuota>();
		Map<String, Integer> monthNumber = new LinkedHashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota monthBean = monthMap.get(bean.getCityId() + "-" + bean.getDate());
			if (monthBean == null) {
				monthBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			monthBean.setDate(bean.getDate());
			monthBean.setCityId(bean.getCityId());
			monthBean.setCityName(bean.getCityName());
			monthBean.setConstant(bean.getConstant() + monthBean.getConstant());
			monthBean.setFluctuation(bean.getFluctuation() + monthBean.getFluctuation());
			monthBean.setHandicapping(bean.getHandicapping() + monthBean.getHandicapping());
			monthBean.setMutation(bean.getMutation() + monthBean.getMutation());
			monthBean.setScreenJump(bean.getScreenJump() + monthBean.getScreenJump());
			monthBean.setComplete(bean.getComplete() + monthBean.getComplete());
			monthBean.setEffective(bean.getEffective() + monthBean.getEffective());
			monthBean.setReliable(bean.getReliable() + monthBean.getReliable());

			monthBean.setConstantWeights(bean.getConstant() * weight.getConstant() + monthBean.getConstantWeights());
			monthBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ monthBean.getFluctuationWeights());
			monthBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ monthBean.getHandicappingWeights());
			monthBean.setMutationWeights(bean.getMutation() * weight.getMutation() + monthBean.getMutationWeights());
			monthBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
					+ monthBean.getScreenJumpWeights());
			monthBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + monthBean.getCompleteWeights());
			monthBean
					.setEffectiveWeights(bean.getEffective() * weight.getEffective() + monthBean.getEffectiveWeights());
			monthBean.setReliableWeights(bean.getReliable() * weight.getReliable() + monthBean.getReliableWeights());

			monthBean.setTotal(bean.getTotal() + monthBean.getTotal());
			monthMap.put(bean.getCityId() + "-" + bean.getDate(), monthBean);
			// 计算当前盟市个数
			Integer num = monthNumber.get(bean.getCityId() + "-" + bean.getDate());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			monthNumber.put(bean.getCityId() + "-" + bean.getDate(), num);
		}
		// 设置盟市得分情况
		for (String key : monthMap.keySet()) {
			ResQuota monthBean = monthMap.get(key);
			if (monthBean != null) {
				int number = monthNumber.get(key);
				monthBean.setConstant(monthBean.getConstant() / number);
				monthBean.setFluctuation(monthBean.getFluctuation() / number);
				monthBean.setHandicapping(monthBean.getHandicapping() / number);
				monthBean.setMutation(monthBean.getMutation() / number);
				monthBean.setScreenJump(monthBean.getScreenJump() / number);
				monthBean.setComplete(monthBean.getComplete() / number);
				monthBean.setEffective(monthBean.getEffective() / number);
				monthBean.setReliable(monthBean.getReliable() / number);

				monthBean.setConstantWeights(monthBean.getConstantWeights() / number);
				monthBean.setFluctuationWeights(monthBean.getFluctuationWeights() / number);
				monthBean.setHandicappingWeights(monthBean.getHandicappingWeights() / number);
				monthBean.setMutationWeights(monthBean.getMutationWeights() / number);
				monthBean.setScreenJumpWeights(monthBean.getScreenJumpWeights() / number);
				monthBean.setCompleteWeights(monthBean.getCompleteWeights() / number);
				monthBean.setEffectiveWeights(monthBean.getEffectiveWeights() / number);
				monthBean.setReliableWeights(monthBean.getReliableWeights() / number);

				monthBean.setTotal(monthBean.getTotal() / number);
				monthBean.setDate(key.substring(key.indexOf("-") + 1));
				monthBean.setCityId(cityId);
				monthBeans.add(monthBean);
			} else {
				monthBean = new ResQuota();
				monthBean.setDate(key);
				monthBean.setFlag(-1);
			}
		}
		return monthBeans;
	}

	/**
	 * 查询某一行业 在某年的 的月间隔的时间差
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @param beginMonth
	 * @param endMonth
	 * @param cityId
	 * @return
	 */
	public static List<ResQuota> formatPSTypeQuota(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight, String beginMonth, String endMonth, String psType) {
		List<ResQuota> psTypeBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> psTypeMap = new LinkedHashMap<String, ResQuota>();
		Map<String, Integer> psTypeNumber = new LinkedHashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota psTypeBean = psTypeMap.get(bean.getDate());
			if (psTypeBean == null) {
				psTypeBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			psTypeBean.setDate(bean.getDate());
			bean.setPsType(psType);
			psTypeBean.setConstant(bean.getConstant() + psTypeBean.getConstant());
			psTypeBean.setFluctuation(bean.getFluctuation() + psTypeBean.getFluctuation());
			psTypeBean.setHandicapping(bean.getHandicapping() + psTypeBean.getHandicapping());
			psTypeBean.setMutation(bean.getMutation() + psTypeBean.getMutation());
			psTypeBean.setScreenJump(bean.getScreenJump() + psTypeBean.getScreenJump());
			psTypeBean.setComplete(bean.getComplete() + psTypeBean.getComplete());
			psTypeBean.setEffective(bean.getEffective() + psTypeBean.getEffective());
			psTypeBean.setReliable(bean.getReliable() + psTypeBean.getReliable());

			psTypeBean.setConstantWeights(bean.getConstant() * weight.getConstant() + psTypeBean.getConstantWeights());
			psTypeBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ psTypeBean.getFluctuationWeights());
			psTypeBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ psTypeBean.getHandicappingWeights());
			psTypeBean.setMutationWeights(bean.getMutation() * weight.getMutation() + psTypeBean.getMutationWeights());
			psTypeBean.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
					+ psTypeBean.getScreenJumpWeights());
			psTypeBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + psTypeBean.getCompleteWeights());
			psTypeBean.setEffectiveWeights(bean.getEffective() * weight.getEffective()
					+ psTypeBean.getEffectiveWeights());
			psTypeBean.setReliableWeights(bean.getReliable() * weight.getReliable() + psTypeBean.getReliableWeights());

			psTypeBean.setTotal(bean.getTotal() + psTypeBean.getTotal());
			psTypeMap.put(bean.getDate(), psTypeBean);
			// 计算当前盟市个数
			Integer num = psTypeNumber.get(bean.getDate());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			psTypeNumber.put(bean.getDate(), num);
		}
		// 设置盟市得分情况
		for (String key : psTypeMap.keySet()) {
			ResQuota psTypeBean = psTypeMap.get(key);
			if (psTypeBean != null) {
				int number = psTypeNumber.get(key);
				psTypeBean.setConstant(psTypeBean.getConstant() / number);
				psTypeBean.setFluctuation(psTypeBean.getFluctuation() / number);
				psTypeBean.setHandicapping(psTypeBean.getHandicapping() / number);
				psTypeBean.setMutation(psTypeBean.getMutation() / number);
				psTypeBean.setScreenJump(psTypeBean.getScreenJump() / number);
				psTypeBean.setComplete(psTypeBean.getComplete() / number);
				psTypeBean.setEffective(psTypeBean.getEffective() / number);
				psTypeBean.setReliable(psTypeBean.getReliable() / number);

				psTypeBean.setConstantWeights(psTypeBean.getConstantWeights() / number);
				psTypeBean.setFluctuationWeights(psTypeBean.getFluctuationWeights() / number);
				psTypeBean.setHandicappingWeights(psTypeBean.getHandicappingWeights() / number);
				psTypeBean.setMutationWeights(psTypeBean.getMutationWeights() / number);
				psTypeBean.setScreenJumpWeights(psTypeBean.getScreenJumpWeights() / number);
				psTypeBean.setCompleteWeights(psTypeBean.getCompleteWeights() / number);
				psTypeBean.setEffectiveWeights(psTypeBean.getEffectiveWeights() / number);
				psTypeBean.setReliableWeights(psTypeBean.getReliableWeights() / number);

				psTypeBean.setTotal(psTypeBean.getTotal() / number);
				psTypeBean.setDate(key);
				psTypeBean.setPsType(psType);
				psTypeBeans.add(psTypeBean);
			} else {
				psTypeBean = new ResQuota();
				psTypeBean.setDate(key);
				psTypeBean.setFlag(-1);
			}
		}
		return psTypeBeans;
	}

	/**
	 * 查询某一行企业在某年的 的月间隔的时间差
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @param beginMonth
	 * @param endMonth
	 * @param cityId
	 * @return
	 */
	public static List<ResQuota> formatResQuota(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight, String beginMonth, String endMonth, String psCode) {
		List<ResQuota> resBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> resMap = new LinkedHashMap<String, ResQuota>();
		Map<String, Integer> resNumber = new LinkedHashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota resBean = resMap.get(bean.getDate());
			if (resBean == null) {
				resBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			resBean.setDate(bean.getDate());
			resBean.setPsCode(psCode);
			resBean.setCityName(bean.getCityName());
			resBean.setConstant(bean.getConstant() + resBean.getConstant());
			resBean.setFluctuation(bean.getFluctuation() + resBean.getFluctuation());
			resBean.setHandicapping(bean.getHandicapping() + resBean.getHandicapping());
			resBean.setMutation(bean.getMutation() + resBean.getMutation());
			resBean.setScreenJump(bean.getScreenJump() + resBean.getScreenJump());
			resBean.setComplete(bean.getComplete() + resBean.getComplete());
			resBean.setEffective(bean.getEffective() + resBean.getEffective());
			resBean.setReliable(bean.getReliable() + resBean.getReliable());

			resBean.setConstantWeights(bean.getConstant() * weight.getConstant() + resBean.getConstantWeights());
			resBean.setFluctuationWeights(bean.getFluctuation() * weight.getFluctuation()
					+ resBean.getFluctuationWeights());
			resBean.setHandicappingWeights(bean.getHandicapping() * weight.getHandicapping()
					+ resBean.getHandicappingWeights());
			resBean.setMutationWeights(bean.getMutation() * weight.getMutation() + resBean.getMutationWeights());
			resBean
					.setScreenJumpWeights(bean.getScreenJump() * weight.getScreenJump()
							+ resBean.getScreenJumpWeights());
			resBean.setCompleteWeights(bean.getComplete() * weight.getComplete() + resBean.getCompleteWeights());
			resBean.setEffectiveWeights(bean.getEffective() * weight.getEffective() + resBean.getEffectiveWeights());
			resBean.setReliableWeights(bean.getReliable() * weight.getReliable() + resBean.getReliableWeights());

			resBean.setTotal(bean.getTotal() + resBean.getTotal());
			resMap.put(bean.getDate(), resBean);
			// 计算当前盟市个数
			Integer num = resNumber.get(bean.getDate());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			resNumber.put(bean.getDate(), num);
		}
		// 设置盟市得分情况
		for (String key : resMap.keySet()) {
			ResQuota resBean = resMap.get(key);
			if (resBean != null) {
				int number = resNumber.get(key);
				resBean.setConstant(resBean.getConstant() / number);
				resBean.setFluctuation(resBean.getFluctuation() / number);
				resBean.setHandicapping(resBean.getHandicapping() / number);
				resBean.setMutation(resBean.getMutation() / number);
				resBean.setScreenJump(resBean.getScreenJump() / number);
				resBean.setComplete(resBean.getComplete() / number);
				resBean.setEffective(resBean.getEffective() / number);
				resBean.setReliable(resBean.getReliable() / number);

				resBean.setConstantWeights(resBean.getConstantWeights() / number);
				resBean.setFluctuationWeights(resBean.getFluctuationWeights() / number);
				resBean.setHandicappingWeights(resBean.getHandicappingWeights() / number);
				resBean.setMutationWeights(resBean.getMutationWeights() / number);
				resBean.setScreenJumpWeights(resBean.getScreenJumpWeights() / number);
				resBean.setCompleteWeights(resBean.getCompleteWeights() / number);
				resBean.setEffectiveWeights(resBean.getEffectiveWeights() / number);
				resBean.setReliableWeights(resBean.getReliableWeights() / number);

				resBean.setTotal(resBean.getTotal() / number);
				resBean.setDate(key);
				resBean.setPsCode(psCode);
				resBeans.add(resBean);
			} else {
				resBean = new ResQuota();
				resBean.setDate(key);
				resBean.setFlag(-1);
			}
		}
		return resBeans;
	}

	/**
	 * 格式化盟市信息 指标得分信息
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static void formatQuotaTotal(ResQuota bean, List<ResQuota> reliablitity) {
		for (ResQuota o : reliablitity) {
			if (o.getPsCode().equals(bean.getPsCode())) {
				if ((DateUtils.formatDate(bean.getDate(), o.getBeginTime()) >= 0)
						&& (DateUtils.formatDate(bean.getDate(), o.getEndTime()) <= 0)) {
					bean.setReliable(0);
					bean.setTotal(0);
					return;
				}
			}
		}

	}

	/**
	 * 格式化 指标数据
	 * 
	 * @param bean
	 * @return
	 */
	public static JSONObject formatQuotaInfo(ResQuota bean) {
		JSONObject object = new JSONObject();
		JSONObject pieObject = new JSONObject();
		JSONObject radarObject = new JSONObject();

		JSONArray pieData = new JSONArray();
		JSONArray pieSeries = new JSONArray();
		JSONObject chartValue = null;
		// 饼状图 图列 处理
		pieData.add(ResConst.CCOMPLETE);
		pieData.add(ResConst.CFLUCTUATION);
		pieData.add(ResConst.CHANDICAPPING);
		pieData.add(ResConst.CMUTATION);
		pieData.add(ResConst.CSCREENJUMP);
		pieData.add(ResConst.CRELIABLE);
		pieData.add(ResConst.CCOMPLETE);
		pieData.add(ResConst.CEFFECTIVE);

		pieObject.put("data", pieData);

		// 饼状图数据处理
		chartValue = new JSONObject();
		chartValue.put("value", bean.getConstantWeights());
		chartValue.put("name", ResConst.CCOMPLETE);
		pieSeries.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("value", bean.getFluctuationWeights());
		chartValue.put("name", ResConst.CFLUCTUATION);
		pieSeries.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("value", bean.getHandicappingWeights());
		chartValue.put("name", ResConst.CHANDICAPPING);
		pieSeries.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("value", bean.getMutationWeights());
		chartValue.put("name", ResConst.CMUTATION);
		pieSeries.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("value", bean.getScreenJumpWeights());
		chartValue.put("name", ResConst.CSCREENJUMP);
		pieSeries.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("value", bean.getReliableWeights());
		chartValue.put("name", ResConst.CRELIABLE);
		pieSeries.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("value", bean.getCompleteWeights());
		chartValue.put("name", ResConst.CCOMPLETE);
		pieSeries.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("value", bean.getEffectiveWeights());
		chartValue.put("name", ResConst.CEFFECTIVE);
		pieSeries.add(chartValue);

		pieObject.put("series", pieSeries);

		object.put("pie", pieObject);

		// 雷达图 处理
		JSONArray radarPolar = new JSONArray();
		JSONArray radarSeries = new JSONArray();

		float max = ResQuotaUtils.formatQuotaMax(bean);
		chartValue = new JSONObject();
		chartValue.put("max", max);
		chartValue.put("text", ResConst.CCONSTANT);
		radarPolar.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("max", max);
		chartValue.put("text", ResConst.CFLUCTUATION);
		radarPolar.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("max", max);
		chartValue.put("text", ResConst.CHANDICAPPING);
		radarPolar.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("max", max);
		chartValue.put("text", ResConst.CMUTATION);
		radarPolar.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("max", max);
		chartValue.put("text", ResConst.CSCREENJUMP);
		radarPolar.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("max", max);
		chartValue.put("text", ResConst.CRELIABLE);
		radarPolar.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("max", max);
		chartValue.put("text", ResConst.CCOMPLETE);
		radarPolar.add(chartValue);

		chartValue = new JSONObject();
		chartValue.put("max", max);
		chartValue.put("text", ResConst.CEFFECTIVE);
		radarPolar.add(chartValue);
		chartValue = new JSONObject();
		chartValue.put("indicator", radarPolar);
		radarPolar = new JSONArray();

		radarPolar.add(chartValue);
		radarObject.put("polar", radarPolar);
		JSONArray tempArray = new JSONArray();
		tempArray.add(bean.getConstantWeights());
		tempArray.add(bean.getFluctuationWeights());
		tempArray.add(bean.getHandicappingWeights());
		tempArray.add(bean.getMutationWeights());
		tempArray.add(bean.getScreenJumpWeights());
		tempArray.add(bean.getReliableWeights());
		tempArray.add(bean.getCompleteWeights());
		tempArray.add(bean.getEffectiveWeights());
		JSONObject tempObject = new JSONObject();
		tempObject.put("value", tempArray);
		tempObject.put("name", "雷达图分析");
		radarSeries.add(tempObject);
		radarObject.put("series", radarSeries);
		object.put("radar", radarObject);
		return object;
	}

	/**
	 * 格式化 每月的指标数据
	 * 
	 * @param bean
	 * @return
	 */
	public static JSONObject formatQuotasInfoMonth(ResQuota oo, List<ResQuota> beans, String sroceType) {
		JSONObject object = new JSONObject();
		JSONArray legend = new JSONArray();
		JSONArray xAxis = new JSONArray();
		// map 对象
		Map CCOMPLETEMap = new LinkedMap();
		Map CFLUCTUATIONMap = new LinkedMap();
		Map CHANDICAPPINGMap = new LinkedMap();
		Map CMUTATIONMap = new LinkedMap();
		Map CSCREENJUMPMap = new LinkedMap();
		Map CRELIABLEMap = new LinkedMap();
		Map CCONSTANTMap = new LinkedMap();
		Map CEFFECTIVEMap = new LinkedMap();
		Map CTOTALMap = new LinkedMap();
		List<String> xx = ResQuotaUtils.formatTimexAxis(oo.getBeginTime(), oo.getEndTime());
		for (String key : xx) {
			xAxis.add(key);
			CCOMPLETEMap.put(key, "-");
			CFLUCTUATIONMap.put(key, "-");
			CHANDICAPPINGMap.put(key, "-");
			CMUTATIONMap.put(key, "-");
			CSCREENJUMPMap.put(key, "-");
			CRELIABLEMap.put(key, "-");
			CCONSTANTMap.put(key, "-");
			CEFFECTIVEMap.put(key, "-");
			CTOTALMap.put(key, "-");
		}

		JSONArray CCOMPLETE = new JSONArray();
		JSONArray CFLUCTUATION = new JSONArray();
		JSONArray CHANDICAPPING = new JSONArray();
		JSONArray CMUTATION = new JSONArray();
		JSONArray CSCREENJUMP = new JSONArray();
		JSONArray CRELIABLE = new JSONArray();
		JSONArray CCONSTANT = new JSONArray();
		JSONArray CEFFECTIVE = new JSONArray();
		JSONArray CTOTAL = new JSONArray();
		// 图例
		legend.add(ResConst.CCOMPLETE);
		legend.add(ResConst.CFLUCTUATION);
		legend.add(ResConst.CHANDICAPPING);
		legend.add(ResConst.CMUTATION);
		legend.add(ResConst.CSCREENJUMP);
		legend.add(ResConst.CRELIABLE);
		legend.add(ResConst.CCONSTANT);
		legend.add(ResConst.CEFFECTIVE);
		legend.add(ResConst.CTOTAL);
		object.put("legend", legend);

		/**
		 * 对应指标明细
		 */
		if (sroceType == null || "0".equals(sroceType)) {
			for (ResQuota bean : beans) {

				CCOMPLETEMap.put(bean.getDate(), bean.getComplete());
				CFLUCTUATIONMap.put(bean.getDate(), bean.getFluctuation());
				CHANDICAPPINGMap.put(bean.getDate(), bean.getHandicapping());
				CMUTATIONMap.put(bean.getDate(), bean.getMutation());
				CSCREENJUMPMap.put(bean.getDate(), bean.getScreenJump());
				CRELIABLEMap.put(bean.getDate(), bean.getReliable());
				CCONSTANTMap.put(bean.getDate(), bean.getConstant());
				CEFFECTIVEMap.put(bean.getDate(), bean.getEffective());
				CTOTALMap.put(bean.getDate(), bean.getTotal());
				// CCOMPLETE.add(bean.getComplete());
				// CFLUCTUATION.add(bean.getFluctuation());
				// CHANDICAPPING.add(bean.getHandicapping());
				// CMUTATION.add(bean.getMutation());
				// CREAPPEAR.add(bean.getReappear());
				// CRELIABLE.add(bean.getReliable());
				// CCONSTANT.add(bean.getConstant());
				// CEFFECTIVE.add(bean.getEffective());
				// CTOTAL.add(bean.getTotal());
			}
		} else {
			for (ResQuota bean : beans) {
				CCOMPLETEMap.put(bean.getDate(), bean.getCompleteWeights());
				CFLUCTUATIONMap.put(bean.getDate(), bean.getFluctuationWeights());
				CHANDICAPPINGMap.put(bean.getDate(), bean.getHandicappingWeights());
				CMUTATIONMap.put(bean.getDate(), bean.getMutationWeights());
				CSCREENJUMPMap.put(bean.getDate(), bean.getScreenJumpWeights());
				CRELIABLEMap.put(bean.getDate(), bean.getReliableWeights());
				CCONSTANTMap.put(bean.getDate(), bean.getConstantWeights());
				CEFFECTIVEMap.put(bean.getDate(), bean.getEffectiveWeights());
				CTOTALMap.put(bean.getDate(), bean.getTotal());

			}
		}

		for (String key : xx) {
			CCOMPLETE.add(CCOMPLETEMap.get(key));
			CFLUCTUATION.add(CFLUCTUATIONMap.get(key));
			CHANDICAPPING.add(CHANDICAPPINGMap.get(key));
			CMUTATION.add(CMUTATIONMap.get(key));
			CSCREENJUMP.add(CSCREENJUMPMap.get(key));
			CRELIABLE.add(CRELIABLEMap.get(key));
			CCONSTANT.add(CCONSTANTMap.get(key));
			CEFFECTIVE.add(CEFFECTIVEMap.get(key));
			CTOTAL.add(CTOTALMap.get(key));
		}
		JSONObject data = new JSONObject();
		data.put(ResConst.CCOMPLETE, CCOMPLETE);
		data.put(ResConst.CFLUCTUATION, CFLUCTUATION);
		data.put(ResConst.CHANDICAPPING, CHANDICAPPING);
		data.put(ResConst.CMUTATION, CMUTATION);
		data.put(ResConst.CSCREENJUMP, CSCREENJUMP);
		data.put(ResConst.CRELIABLE, CRELIABLE);
		data.put(ResConst.CCONSTANT, CCONSTANT);
		data.put(ResConst.CEFFECTIVE, CEFFECTIVE);
		data.put(ResConst.CTOTAL, CTOTAL);
		object.put("data", data);
		object.put("xAxis", xAxis);
		return object;
	}

	/**
	 * 格式化 指标数据
	 * 
	 * @param bean
	 * @return
	 */
	public static JSONObject formatQuotasInfo(List<ResQuota> beans) {
		JSONObject object = new JSONObject();

		JSONArray lineSeries = new JSONArray();
		JSONArray legend = new JSONArray();
		JSONArray xAxis = new JSONArray();
		JSONArray constantArray = new JSONArray();
		JSONArray fluctuationArray = new JSONArray();
		JSONArray handicappingArray = new JSONArray();
		JSONArray mutationArray = new JSONArray();
		JSONArray screenJumpArray = new JSONArray();
		JSONArray completeArray = new JSONArray();
		JSONArray reliableArray = new JSONArray();
		JSONArray effectiveArray = new JSONArray();
		JSONArray totalArray = new JSONArray();
		// 图列 处理
		legend.add(ResConst.CCOMPLETE);
		legend.add(ResConst.CFLUCTUATION);
		legend.add(ResConst.CHANDICAPPING);
		legend.add(ResConst.CMUTATION);
		legend.add(ResConst.CSCREENJUMP);
		legend.add(ResConst.CRELIABLE);
		legend.add(ResConst.CCOMPLETE);
		legend.add(ResConst.CEFFECTIVE);
		legend.add(ResConst.CTOTAL);
		object.put("legend", legend);
		for (ResQuota bean : beans) {
			xAxis.add(bean.getDate());
			constantArray.add(bean.getConstant());
			fluctuationArray.add(bean.getFluctuation());
			handicappingArray.add(bean.getHandicapping());
			mutationArray.add(bean.getMutation());
			screenJumpArray.add(bean.getScreenJump());
			reliableArray.add(bean.getReliable());
			completeArray.add(bean.getComplete());
			effectiveArray.add(bean.getEffective());
			totalArray.add(bean.getTotal());
		}
		object.put("xAixs", xAxis);
		JSONObject lineData = new JSONObject();
		lineData.put(ResConst.CCONSTANT, constantArray);
		lineData.put(ResConst.CFLUCTUATION, fluctuationArray);
		lineSeries.add(lineData);
		lineData.put(ResConst.CHANDICAPPING, handicappingArray);
		lineSeries.add(lineData);
		lineData.put(ResConst.CMUTATION, mutationArray);
		lineSeries.add(lineData);
		lineData.put(ResConst.CSCREENJUMP, screenJumpArray);
		lineSeries.add(lineData);
		lineData.put(ResConst.CRELIABLE, reliableArray);
		lineSeries.add(lineData);
		lineData.put(ResConst.CCOMPLETE, completeArray);
		lineData.put(ResConst.CEFFECTIVE, effectiveArray);
		lineData.put(ResConst.CTOTAL, totalArray);
		object.put("data", lineSeries);
		return object;
	}

	/**
	 * 数据质量改善分析 数据格式化
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatQuotaYear(List<ResQuota> beans, String algorithmCode, String sroceType) {

		JSONObject object = new JSONObject();
		List<String> legend = new ArrayList<String>();
		List<String> xAxis = new ArrayList<String>();
		Map<String, List> cityData = new HashMap<String, List>();
		// 初始化数值
		for (int i = 0; i < 12; i++) {
			xAxis.add(i + 1 + "月");
		}
		List cityValue = null;
		if (algorithmCode.equals(ResConst.CCONSTANT)) {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				if (sroceType == null || "0".equals(sroceType)) {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getConstant());
				} else {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getConstantWeights());
				}
				cityData.put(bean.getCityName(), cityValue);
			}
		} else if (algorithmCode.equals(ResConst.CHANDICAPPING)) {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				if (sroceType == null || "0".equals(sroceType)) {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getHandicapping());
				} else {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getHandicappingWeights());
				}
				cityData.put(bean.getCityName(), cityValue);
			}
		} else if (algorithmCode.equals(ResConst.CFLUCTUATION)) {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				if (sroceType == null || "0".equals(sroceType)) {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getHandicapping());
				} else {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getHandicappingWeights());
				}
				cityData.put(bean.getCityName(), cityValue);
			}
		} else if (algorithmCode.equals(ResConst.CMUTATION)) {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				if (sroceType == null || "0".equals(sroceType)) {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getMutation());
				} else {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getMutationWeights());
				}
				cityData.put(bean.getCityName(), cityValue);
			}
		} else if (algorithmCode.equals(ResConst.CSCREENJUMP)) {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				if (sroceType == null || "0".equals(sroceType)) {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getScreenJump());
				} else {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getScreenJumpWeights());
				}
				cityData.put(bean.getCityName(), cityValue);
			}
		} else if (algorithmCode.equals(ResConst.CRELIABLE)) {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				if (sroceType == null || "0".equals(sroceType)) {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getReliable());
				} else {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getReliableWeights());
				}
				cityData.put(bean.getCityName(), cityValue);
			}
		} else if (algorithmCode.equals(ResConst.CCOMPLETE)) {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				if (sroceType == null || "0".equals(sroceType)) {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getComplete());
				} else {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getCompleteWeights());
				}
				cityData.put(bean.getCityName(), cityValue);
			}
		} else if (algorithmCode.equals(ResConst.CEFFECTIVE)) {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				if (sroceType == null || "0".equals(sroceType)) {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getEffective());
				} else {
					cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getEffectiveWeights());
				}
				cityData.put(bean.getCityName(), cityValue);
			}
		} else {
			for (ResQuota bean : beans) {
				cityValue = cityData.get(bean.getCityName());
				if (cityValue == null) {
					cityValue = new ArrayList();
					for (int i = 0; i < 12; i++) {
						cityValue.add("-");
					}
				}
				if (!legend.contains(bean.getCityName())) {
					legend.add(bean.getCityName());
				}
				cityValue.set(Integer.parseInt(bean.getDate()) - 1, bean.getTotal());
				cityData.put(bean.getCityName(), cityValue);
			}
		}
		object.put("xAxis", xAxis);
		object.put("data", cityData);
		object.put("legend", legend);
		return object;
	}

	/**
	 * 数据质量改善分析 行业 数据格式化
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatQuotaPSTypeYear(List<ResQuota> beans, String algorithmCode) {

		JSONObject object = new JSONObject();
		List<String> legend = new ArrayList<String>();
		List<String> xAxis = new ArrayList<String>();
		xAxis.add("1月");
		xAxis.add("2月");
		xAxis.add("3月");
		xAxis.add("4月");
		xAxis.add("5月");
		xAxis.add("6月");
		xAxis.add("7月");
		xAxis.add("8月");
		xAxis.add("9月");
		xAxis.add("10月");
		xAxis.add("11月");
		xAxis.add("12月");
		object.put("xAxis", xAxis);
		Map<String, JSONArray> cityData = new HashMap<String, JSONArray>();
		JSONArray psTypeValue = null;
		if (algorithmCode.equals(ResConst.CCONSTANT)) {
			for (ResQuota bean : beans) {
				psTypeValue = cityData.get(bean.getPsType());
				if (psTypeValue == null) {
					psTypeValue = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				psTypeValue.add(bean.getConstant());
				cityData.put(bean.getPsType(), psTypeValue);
			}
		} else if (algorithmCode.equals(ResConst.CHANDICAPPING)) {
			for (ResQuota bean : beans) {
				psTypeValue = cityData.get(bean.getPsType());
				if (psTypeValue == null) {
					psTypeValue = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				psTypeValue.add(bean.getHandicapping());
				cityData.put(bean.getPsType(), psTypeValue);
			}
		} else if (algorithmCode.equals(ResConst.CFLUCTUATION)) {
			for (ResQuota bean : beans) {
				psTypeValue = cityData.get(bean.getPsType());
				if (psTypeValue == null) {
					psTypeValue = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				psTypeValue.add(bean.getHandicapping());
				cityData.put(bean.getPsType(), psTypeValue);
			}
		} else if (algorithmCode.equals(ResConst.CMUTATION)) {
			for (ResQuota bean : beans) {
				JSONArray array = cityData.get(bean.getPsType());
				if (array == null) {
					array = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				array.add(bean.getMutation());
				cityData.put(bean.getPsType(), array);
			}
		} else if (algorithmCode.equals(ResConst.CSCREENJUMP)) {
			for (ResQuota bean : beans) {
				psTypeValue = cityData.get(bean.getPsType());
				if (psTypeValue == null) {
					psTypeValue = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				psTypeValue.add(bean.getScreenJump());
				cityData.put(bean.getPsType(), psTypeValue);
			}
		} else if (algorithmCode.equals(ResConst.CRELIABLE)) {
			for (ResQuota bean : beans) {
				psTypeValue = cityData.get(bean.getPsType());
				if (psTypeValue == null) {
					psTypeValue = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				psTypeValue.add(bean.getReliable());
				cityData.put(bean.getPsType(), psTypeValue);
			}
		} else if (algorithmCode.equals(ResConst.CCOMPLETE)) {
			for (ResQuota bean : beans) {
				psTypeValue = cityData.get(bean.getPsType());
				if (psTypeValue == null) {
					psTypeValue = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				psTypeValue.add(bean.getComplete());
				cityData.put(bean.getPsType(), psTypeValue);
			}
		} else if (algorithmCode.equals(ResConst.CEFFECTIVE)) {
			for (ResQuota bean : beans) {
				psTypeValue = cityData.get(bean.getPsType());
				if (psTypeValue == null) {
					psTypeValue = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				psTypeValue.add(bean.getEffective());
				cityData.put(bean.getPsType(), psTypeValue);
			}
		} else {
			for (ResQuota bean : beans) {
				psTypeValue = cityData.get(bean.getPsType());
				if (psTypeValue == null) {
					psTypeValue = new JSONArray();
				}
				if (!legend.contains(bean.getPsType())) {
					legend.add(bean.getPsType());
				}
				psTypeValue.add(bean.getTotal());
				cityData.put(bean.getPsType(), psTypeValue);
			}
		}
		object.put("data", cityData);
		object.put("legend", legend);
		return object;
	}

	/**
	 * 格式化每个 企业的得分信息、每个盟市的得分信息
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatQuotaTop(List<ResQuota> beans, List<ResQuota> reliablitity, ResQuotaParameter weight) {
		JSONObject object = new JSONObject();
		List<ResQuota> cityBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> cityMap = new HashMap<String, ResQuota>();
		Map<String, Integer> cityNumber = new HashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota cityBean = cityMap.get(bean.getCityId());
			if (cityBean == null) {
				cityBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			cityBean.setCityId(bean.getCityId());
			cityBean.setCityName(bean.getCityName());
			cityBean.setConstant(bean.getConstant() + cityBean.getConstant());
			cityBean.setFluctuation(bean.getFluctuation() + cityBean.getFluctuation());
			cityBean.setHandicapping(bean.getHandicapping() + cityBean.getHandicapping());
			cityBean.setMutation(bean.getMutation() + cityBean.getMutation());
			cityBean.setScreenJump(bean.getScreenJump() + cityBean.getScreenJump());
			cityBean.setComplete(bean.getComplete() + cityBean.getComplete());
			cityBean.setEffective(bean.getEffective() + cityBean.getEffective());
			cityBean.setReliable(bean.getReliable() + cityBean.getReliable());
			cityBean.setTotal(bean.getTotal() + cityBean.getTotal());
			cityMap.put(bean.getCityId(), cityBean);
			// 计算当前盟市个数
			Integer num = cityNumber.get(bean.getCityId());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			cityNumber.put(bean.getCityId(), num);
		}
		// 设置盟市得分情况
		for (String city : cityMap.keySet()) {
			ResQuota cityBean = cityMap.get(city);
			int number = cityNumber.get(city);
			cityBean.setConstant(cityBean.getConstant() / number);
			cityBean.setFluctuation(cityBean.getFluctuation() / number);
			cityBean.setHandicapping(cityBean.getHandicapping() / number);
			cityBean.setMutation(cityBean.getMutation() / number);
			cityBean.setScreenJump(cityBean.getScreenJump() / number);
			cityBean.setComplete(cityBean.getComplete() / number);
			cityBean.setEffective(cityBean.getEffective() / number);
			cityBean.setReliable(cityBean.getReliable() / number);
			cityBean.setTotal(cityBean.getTotal() / number);
			cityBeans.add(cityBean);
		}

		Collections.sort(beans, new Comparator<ResQuota>() {
			public int compare(ResQuota data1, ResQuota data2) {
				Float d1 = data1.getTotal();
				Float d2 = data2.getTotal();
				return d1.compareTo(d2);
			}
		});
		Collections.sort(cityBeans, new Comparator<ResQuota>() {
			public int compare(ResQuota data1, ResQuota data2) {
				Float d1 = data1.getTotal();
				Float d2 = data2.getTotal();
				return d1.compareTo(d2);
			}
		});
		// 总分
		float sum = 0;
		for (ResQuota bean : beans) {
			sum += bean.getTotal();
		}

		// 平均分
		float avg = sum / beans.size();
		// 超过的分数
		int exceedAvg = 0;
		for (ResQuota bean : beans) {
			if (bean.getTotal() > avg) {
				exceedAvg++;
			}
		}
		// 最后一名和第一名
		ResQuota beginBean = beans.get(beans.size() - 1);
		ResQuota endBean = beans.get(0);
		StringBuffer message = new StringBuffer();
		message.append("共有" + beans.size() + "家企业进入评估系统,");
		message.append("得分最高企业“" + beginBean.getPsName() + "”,得分:" + Utils.numberFormat(beginBean.getTotal(), "#.00")
				+ ";");
		message
				.append("得分最低企业“" + endBean.getPsName() + "”,得分:" + Utils.numberFormat(endBean.getTotal(), "#.00")
						+ "。");
		message.append("全区平均得分:" + Utils.numberFormat(avg, "#.00") + ",");
		message.append("全区共有" + exceedAvg + "家企业得分超过全区平均值。");
		object.put("message", message);
		int end = 10;
		if (beans != null && beans.size() < 10) {
			end = beans.size();
		}
		List<ResQuota> resBeans = beans.subList(0, end);
		// 设置地理信息
		JSONObject geoCoord = new JSONObject();
		List<JSONObject> data = new ArrayList<JSONObject>();
		JSONObject ooData = null;
		JSONArray array = null;
		int length = resBeans.size();
		for (int i = 0; i < length; i++) {
			ResQuota bean = resBeans.get(i);
			if (bean.getPsName() == null || "".equals(bean.getPsName())) {
				continue;
			}
			ooData = new JSONObject();
			array = new JSONArray();
			array.add(bean.getLongitude());
			array.add(bean.getLatitude());
			geoCoord.put(bean.getPsName(), array);
			ooData.put("name", bean.getPsName());
			ooData.put("value", i + 1);
			ooData.put("cityName", bean.getCityName());
			ooData.put("psType", bean.getPsType());
			ooData.put("total", bean.getTotal());
			data.add(ooData);
		}
		object.put("enterprise", resBeans);
		object.put("city", cityBeans);
		object.put("geoCoord", geoCoord);
		object.put("data", data);
		return object;
	}

	/**
	 * 格式化盟市 下属企业、以及盟市指标得分信息
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static JSONObject formatQuotaCityTop(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		JSONObject object = new JSONObject();
		ResQuota quotaBean = new ResQuota();
		float quotaReliable = 0;
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			quotaReliable += bean.getReliable();
			bean.setTotal(total);
			quotaBean.setConstant(quotaBean.getConstant() + bean.getConstant() * weight.getConstant());
			quotaBean.setFluctuation(quotaBean.getFluctuation() + bean.getFluctuation() * weight.getFluctuation());
			quotaBean.setHandicapping(quotaBean.getHandicapping() + bean.getHandicapping() * weight.getHandicapping());
			quotaBean.setMutation(quotaBean.getMutation() + bean.getMutation() * weight.getMutation());
			quotaBean.setScreenJump(quotaBean.getScreenJump() + bean.getScreenJump() * weight.getScreenJump());
			quotaBean.setComplete(quotaBean.getComplete() + bean.getComplete() * weight.getComplete());
			quotaBean.setEffective(quotaBean.getEffective() + bean.getEffective() * weight.getEffective());
			quotaBean.setReliable(quotaBean.getReliable() + bean.getReliable() * weight.getReliable());
			quotaBean.setTotal(quotaBean.getTotal() + bean.getTotal());
		}

		Collections.sort(beans, new Comparator<ResQuota>() {
			public int compare(ResQuota data1, ResQuota data2) {
				Float d1 = data1.getTotal();
				Float d2 = data2.getTotal();
				return d1.compareTo(d2);
			}
		});
		// 总分
		float sum = quotaBean.getTotal();
		int size = beans.size();
		// 平均分
		float avg = sum / size;
		// 超过的分数
		int exceedAvg = 0;
		for (ResQuota bean : beans) {
			if (bean.getTotal() > avg) {
				exceedAvg++;
			}
		}
		// 最后一名和第一名
		ResQuota beginBean = beans.get(beans.size() - 1);
		ResQuota endBean = beans.get(0);
		StringBuffer message = new StringBuffer();
		message.append("共有" + beans.size() + "家企业进入评估系统,");
		message.append("得分最高企业“" + beginBean.getPsName() + "”,得分:" + Utils.numberFormat(beginBean.getTotal(), "#.00")
				+ ";");
		message
				.append("得分最低企业“" + endBean.getPsName() + "”,得分:" + Utils.numberFormat(endBean.getTotal(), "#.00")
						+ "。");
		message.append("全盟市平均得分:" + Utils.numberFormat(avg, "#.00") + ",");
		message.append("全盟市共有" + exceedAvg + "家企业得分超过全盟市平均值。");
		object.put("message", message);
		quotaBean.setConstant(quotaBean.getConstant() / size);
		quotaBean.setFluctuation(quotaBean.getFluctuation() / size);
		quotaBean.setHandicapping(quotaBean.getHandicapping() / size);
		quotaBean.setMutation(quotaBean.getMutation() / size);
		quotaBean.setScreenJump(quotaBean.getScreenJump() / size);
		quotaBean.setComplete(quotaBean.getComplete() / size);
		quotaBean.setEffective(quotaBean.getEffective() / size);
		quotaBean.setReliable(quotaBean.getReliable() / size);
		quotaBean.setTotal(quotaBean.getTotal() / size);
		List<ResQuota> cityBeans = new ArrayList<ResQuota>();
		ResQuota quota = null;
		// 总分
		quota = new ResQuota();
		quota.setCityName(ResConst.CTOTAL);
		quota.setTotal(quotaBean.getTotal());
		cityBeans.add(quota);

		// 恒值
		quota = new ResQuota();
		quota.setCityName(ResConst.CCONSTANT);
		quota.setTotal(quotaBean.getConstant());
		cityBeans.add(quota);
		// 波动异常
		quota = new ResQuota();
		quota.setCityName(ResConst.CFLUCTUATION);
		quota.setTotal(quotaBean.getFluctuation());
		cityBeans.add(quota);
		// 设限值
		quota = new ResQuota();
		quota.setCityName(ResConst.CHANDICAPPING);
		quota.setTotal(quotaBean.getHandicapping());
		cityBeans.add(quota);
		// 陡升陡降
		quota = new ResQuota();
		quota.setCityName(ResConst.CMUTATION);
		quota.setTotal(quotaBean.getMutation());
		cityBeans.add(quota);
		// 重现性
		quota = new ResQuota();
		quota.setCityName(ResConst.CSCREENJUMP);
		quota.setTotal(quotaBean.getScreenJump());
		cityBeans.add(quota);
		// 完整性
		quota = new ResQuota();
		quota.setCityName(ResConst.CCOMPLETE);
		quota.setTotal(quotaBean.getComplete());
		cityBeans.add(quota);
		// 有效性
		quota = new ResQuota();
		quota.setCityName(ResConst.CEFFECTIVE);
		quota.setTotal(quotaBean.getEffective());
		cityBeans.add(quota);
		// 可靠性
		quota = new ResQuota();
		quota.setCityName(ResConst.CRELIABLE);
		quota.setTotal(quotaBean.getReliable());
		cityBeans.add(quota);

		int end = 10;
		if (beans != null && beans.size() < 10) {
			end = beans.size();
		}
		List<ResQuota> resBeans = beans.subList(0, end);
		// 设置地理信息
		JSONObject geoCoord = new JSONObject();
		List<JSONObject> data = new ArrayList<JSONObject>();
		JSONObject ooData = null;
		JSONArray array = null;
		int length = resBeans.size();
		for (int i = 0; i < length; i++) {
			ResQuota bean = resBeans.get(i);
			if (bean.getPsName() == null || "".equals(bean.getPsName())) {
				continue;
			}
			ooData = new JSONObject();
			array = new JSONArray();
			array.add(bean.getLongitude());
			array.add(bean.getLatitude());
			geoCoord.put(bean.getPsName(), array);
			ooData.put("name", bean.getPsName());
			ooData.put("value", i + 1);
			ooData.put("cityName", bean.getCityName());
			ooData.put("psType", bean.getPsType());
			ooData.put("total", bean.getTotal());
			data.add(ooData);
		}
		object.put("enterprise", resBeans);
		object.put("geoCoord", geoCoord);
		object.put("city", cityBeans);
		object.put("data", data);
		return object;
	}

	/**
	 * 获取每个行业在每个月的数据信息
	 * 
	 * @param beans
	 * @param reliablitity
	 * @param weight
	 * @return
	 */
	public static JSONObject formatQuotaPSType(List<ResQuota> beans, List<ResQuota> reliablitity,
			ResQuotaParameter weight) {
		JSONObject object = new JSONObject();
		List<ResQuota> psTypeBeans = new ArrayList<ResQuota>();
		Map<String, ResQuota> psTypeMap = new HashMap<String, ResQuota>();
		Map<String, Integer> psTypeNumber = new HashMap<String, Integer>();
		for (ResQuota bean : beans) {
			// 判断当前企业的可靠性指标是否 可用
			formatQuotaTotal(bean, reliablitity);
			// 权重计算总得分
			float total = bean.getConstant() * weight.getConstant() + bean.getFluctuation() * weight.getFluctuation()
					+ bean.getHandicapping() * weight.getHandicapping() + bean.getMutation() * weight.getMutation()
					+ bean.getScreenJump() * weight.getScreenJump() + bean.getComplete() * weight.getComplete()
					+ bean.getEffective() * weight.getEffective() + bean.getReliable() * weight.getReliable();
			if (bean.getReliable() == 0f) {
				total = 0;
			}
			bean.setTotal(total);
			ResQuota psTypBean = psTypeMap.get(bean.getPsType());
			if (psTypBean == null) {
				psTypBean = new ResQuota();
			}
			// 设置 盟市指标得分信息
			psTypBean.setPsType(bean.getPsType());
			psTypBean.setConstant(bean.getConstant() + psTypBean.getConstant());
			psTypBean.setFluctuation(bean.getFluctuation() + psTypBean.getFluctuation());
			psTypBean.setHandicapping(bean.getHandicapping() + psTypBean.getHandicapping());
			psTypBean.setMutation(bean.getMutation() + psTypBean.getMutation());
			psTypBean.setScreenJump(bean.getScreenJump() + psTypBean.getScreenJump());
			psTypBean.setComplete(bean.getComplete() + psTypBean.getComplete());
			psTypBean.setEffective(bean.getEffective() + psTypBean.getEffective());
			psTypBean.setReliable(bean.getReliable() + psTypBean.getReliable());
			psTypBean.setTotal(bean.getTotal() + psTypBean.getTotal());
			psTypeMap.put(bean.getPsType(), psTypBean);
			// 计算当前盟市个数
			Integer num = psTypeNumber.get(bean.getPsType());
			if (num == null) {
				num = new Integer(0);
			}
			num++;
			psTypeNumber.put(bean.getPsType(), num);
		}
		// 设置盟市得分情况
		for (String psType : psTypeMap.keySet()) {
			ResQuota psTypBean = psTypeMap.get(psType);
			int number = psTypeNumber.get(psType);
			psTypBean.setConstant(psTypBean.getConstant() / number);
			psTypBean.setFluctuation(psTypBean.getFluctuation() / number);
			psTypBean.setHandicapping(psTypBean.getHandicapping() / number);
			psTypBean.setMutation(psTypBean.getMutation() / number);
			psTypBean.setScreenJump(psTypBean.getScreenJump() / number);
			psTypBean.setComplete(psTypBean.getComplete() / number);
			psTypBean.setEffective(psTypBean.getEffective() / number);
			psTypBean.setReliable(psTypBean.getReliable() / number);
			psTypBean.setTotal(psTypBean.getTotal() / number);
			psTypeBeans.add(psTypBean);
		}

		// 排序行业
		Collections.sort(psTypeBeans, new Comparator<ResQuota>() {
			public int compare(ResQuota data1, ResQuota data2) {
				Float d1 = data1.getTotal();
				Float d2 = data2.getTotal();
				return d1.compareTo(d2);
			}
		});
		// 排序企业
		Collections.sort(beans, new Comparator<ResQuota>() {
			public int compare(ResQuota data1, ResQuota data2) {
				Float d1 = data1.getTotal();
				Float d2 = data2.getTotal();
				return d1.compareTo(d2);
			}
		});

		int lenght = psTypeBeans.size();
		for (int i = 0; i < lenght; i++) {
			ResQuota bean = psTypeBeans.get(i);
			bean.setRanking(i + 1);
		}
		// 总分
		float sum = 0;
		for (ResQuota bean : beans) {
			sum += bean.getTotal();
		}
		// 平均分
		float avg = sum / beans.size();
		// 超过的分数
		int exceedAvg = 0;
		for (ResQuota bean : beans) {
			if (bean.getTotal() > avg) {
				exceedAvg++;
			}
		}
		// 最后一名和第一名
		ResQuota beginBean = beans.get(beans.size() - 1);
		ResQuota endBean = beans.get(0);
		StringBuffer message = new StringBuffer();
		message.append("共有" + beans.size() + "家企业进入评估系统,");
		message.append("得分最高企业“" + beginBean.getPsName() + "”,得分:"
				+ Utils.numberFormat(beginBean.getTotal(), Utils.numberTwo) + ";");
		message.append("得分最低企业“" + endBean.getPsName() + "”,得分:"
				+ Utils.numberFormat(endBean.getTotal(), Utils.numberTwo) + "。");
		message.append("全区平均得分:" + Utils.numberFormat(avg, "#.00") + ",");
		message.append("全区共有" + exceedAvg + "家企业得分超过全区平均值。");
		object.put("message", message);
		// 设置地理信息
		List<Float> values = new ArrayList<Float>();
		List<String> xAxis = new ArrayList<String>();
		for (ResQuota bean : psTypeBeans) {
			values.add(bean.getTotal());
			xAxis.add(bean.getPsType());
		}
		object.put("psType", psTypeBeans);
		object.put("xAxis", xAxis);
		object.put("data", values);
		return object;
	}

	/**
	 * 获取指标得分的最大值
	 * 
	 * @param bean
	 * @return
	 */
	public static float formatQuotaMax(ResQuota bean) {
		float max = 0;
		if (max < bean.getConstantWeights()) {
			max = bean.getConstantWeights();
		}
		if (max < bean.getFluctuationWeights()) {
			max = bean.getFluctuationWeights();
		}
		if (max < bean.getHandicappingWeights()) {
			max = bean.getHandicappingWeights();
		}
		if (max < bean.getMutationWeights()) {
			max = bean.getMutationWeights();
		}
		if (max < bean.getScreenJumpWeights()) {
			max = bean.getScreenJumpWeights();
		}
		if (max < bean.getCompleteWeights()) {
			max = bean.getCompleteWeights();
		}
		if (max < bean.getEffectiveWeights()) {
			max = bean.getEffectiveWeights();
		}
		if (max < bean.getReliableWeights()) {
			max = bean.getReliableWeights();
		}
		return max + 0.1f;
	}

	/**
	 * 获取给时间段内的时间间隔月
	 * 
	 * @param beginTime
	 * @param endTime
	 * @return
	 */
	public static List formatTimexAxis(String beginTime, String endTime) {
		List xAxis = new ArrayList();
		String[] beginTimes = beginTime.split("-");
		String[] endTimes = endTime.split("-");
		int beginYear = Integer.parseInt(beginTimes[0]);
		int beginMonth = Integer.parseInt(beginTimes[1]);
		int endYear = Integer.parseInt(endTimes[0]);
		int endMonth = Integer.parseInt(endTimes[1]);
		int year = beginYear;
		int i = 0;
		for (i = beginMonth; i != endMonth || year != endYear; i++) {
			String date = year + "-" + (i < 10 ? ("0" + i) : i);
			if (i == 12) {
				i = 0;
				year++;
			}
			xAxis.add(date);
		}
		String date = year + "-" + (i < 10 ? ("0" + i) : i);
		xAxis.add(date);
		return xAxis;
	}

	/**
	 * 格式化企业异常统计数据
	 * 
	 * @param beans
	 * @return
	 */
	public static JSONObject formatEnterpriseBIInfo(List<ResQuota> beans) {
		JSONObject object = null;
		if (beans != null && beans.size() > 0) {
			object = new JSONObject();
			JSONArray count = new JSONArray();
			JSONArray distance = new JSONArray();
			JSONArray legend = new JSONArray();
			for (ResQuota bean : beans) {
				count.add(bean.getCount());
				distance.add(Utils.numberFormat(bean.getDistance() / 3600.0, Utils.numberTwo));
				legend.add(bean.getAlgotirhmName());
			}
			object.put("count", count);
			object.put("distance", distance);
			object.put("legend", legend);
		}
		return object;
	}
}
