package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.ResSuperLowDao;
import com.magus.bd.entity.ResSuperLow;
import com.magus.bd.service.ResSuperLowService;
import com.magus.bd.utils.ProgramUtils;
import com.magus.bd.utils.ResConst;
import com.magus.bd.utils.ResSuperLowUtils;

@Service("superLowService")
public class ResSuperLowServiceImpl implements ResSuperLowService {
	private ResSuperLowDao mapper;

	public ResSuperLowDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResSuperLowDao mapper) {
		this.mapper = mapper;
	}

	public List<ResSuperLow> getPowerUnit(ResSuperLow bean) {
		List<ResSuperLow> beans = mapper.getPowerUnit(bean);
		List<ResSuperLow> beanss = new ArrayList<ResSuperLow>();
		// 格式化整改和关停的 释放量
		for (ResSuperLow o : beans) {
			if ("SO2".equals(bean.getPoll())) {
				o.setCloseLessAmount(o.getSo2Amount());
				o.setChangeLessAmount(o.getSo2Amount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.so2Super));
				o.setPollEffective(o.getSo2EffectiveMax());
			} else if ("NOx".equals(bean.getPoll())) {
				o.setCloseLessAmount(o.getNoxAmount());
				o.setChangeLessAmount(o.getNoxAmount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.noxSuper));
				o.setPollEffective(o.getNoxEffectiveMax());
			} else {
				o.setCloseLessAmount(o.getDustAmount());
				o.setChangeLessAmount(o.getDustAmount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.dustSuper));
				o.setPollEffective(o.getDustEffectiveMax());
			}
			beanss.add(o);
		}
		return beanss;
	}

	public List<ResSuperLow> getPowerUnitBreak(ResSuperLow bean, float aimsMin, float aimsMax) {
		List<ResSuperLow> beans = mapper.getPowerUnit(bean);
		List<ResSuperLow> oo = ProgramUtils.formatPowerUnitBreak(beans, bean, aimsMin, aimsMax);
		// 格式化整改和关停的 释放量
		for (ResSuperLow o : oo) {
			if ("SO2".equals(bean.getPoll())) {
				o.setCloseLessAmount(o.getSo2Amount());
				o.setChangeLessAmount(o.getSo2Amount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.so2Super));
				o.setPollEffective(o.getSo2EffectiveMax());
			} else if ("NOx".equals(bean.getPoll())) {
				o.setCloseLessAmount(o.getNoxAmount());
				o.setChangeLessAmount(o.getNoxAmount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.noxSuper));
				o.setPollEffective(o.getNoxEffectiveMax());
			} else {
				o.setCloseLessAmount(o.getDustAmount());
				o.setChangeLessAmount(o.getDustAmount() - ResSuperLowUtils.superLowAmout(o.getGasFlow(), ResConst.dustSuper));
				o.setPollEffective(o.getDustEffectiveMax());
			}
		}
		return oo;
	}
}
