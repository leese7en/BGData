package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.AnalysisDao;
import com.magus.bd.entity.Analysis;
import com.magus.bd.service.AnalysisService;
import com.magus.bd.utils.AnalysisUtils;

@Service
public class AnalysisServiceImpl implements AnalysisService {

	@Autowired
	private AnalysisDao mapper;

	public List<Analysis> getAnalysis() {
		return mapper.getAnalysis();
	}

	public double getElectricitySum(String year) {
		return mapper.getElectricitySum(year);
	}

	public JSONObject getAnalysisForAnalysis(Analysis bean) {
		Double sum = mapper.getElectricitySum(bean.getYear());
		if (sum == null) {
			return null;
		}
		List<Analysis> beansEnergy = mapper.getAnalysisForAnalysis(bean);
		List<Analysis> beansEnergys = new ArrayList<Analysis>();
		for (Analysis o : beansEnergy) {
			o.setEnergyAndEmission(AnalysisUtils.ENERGY);
			if (bean.getEmission() == 0) {
				o.setConsumeEffective(o.getWaterEffective() * 1000);
			} else {
				o.setConsumeEffective(o.getCoalEffective());
			}
			o.setSumElectricity(sum);
			beansEnergys.add(o);
		}
		bean.setEmission(2);
		List<Analysis> beansEmission = mapper.getAnalysisForAnalysis(bean);
		for (Analysis o : beansEmission) {
			o.setEnergyAndEmission(AnalysisUtils.EMISSION);
			o.setSumElectricity(sum);
			if ("SO2".equals(bean.getPollType())) {
				o.setPollEffective(o.getSo2Effective());
			} else if ("NOx".equals(bean.getPollType())) {
				o.setPollEffective(o.getNoxEffective());
			} else {
				o.setPollEffective(o.getDustEffective());
			}
		}
		List<Analysis> allBeans = AnalysisUtils.formatAnalysisEnergyAndEmission(beansEnergys, beansEmission);
		JSONObject object = AnalysisUtils.formatAnalysis(beansEnergys, beansEmission, allBeans, bean);
		return object;
	}

	public List<Analysis> getInduestryPower() {
		return mapper.getInduestryPower();
	}

	public List<Analysis> getBoilerType() {
		return mapper.getBoilerType();
	}

	public JSONObject queryAnalysis(Analysis bean) {
		List<Analysis> beans = mapper.queryAnalysis(bean);
		JSONObject object = AnalysisUtils.formatAnalysis(beans, bean);
		return object;
	}
}
