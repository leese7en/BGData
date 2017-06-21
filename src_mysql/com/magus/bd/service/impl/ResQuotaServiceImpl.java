package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.ResQuotaDao;
import com.magus.bd.dao.ResQuotaParameterDao;
import com.magus.bd.entity.ResQuota;
import com.magus.bd.entity.ResQuotaParameter;
import com.magus.bd.service.ResQuotaService;
import com.magus.bd.utils.ResQuotaUtils;

@Service("quotaService")
public class ResQuotaServiceImpl implements ResQuotaService {
	private ResQuotaDao mapper;

	public ResQuotaDao getMapper() {
		return mapper;
	}

	private ResQuotaParameterDao paraMapper;

	@Autowired
	public void setMapper(ResQuotaDao mapper) {
		this.mapper = mapper;
	}

	public ResQuotaParameterDao getParaMapper() {
		return paraMapper;
	}

	@Autowired
	public void setParaMapper(ResQuotaParameterDao paraMapper) {
		this.paraMapper = paraMapper;
	}

	public List<ResQuota> getQuotaBase() {
		return mapper.getQuotaBase();
	}

	/**
	 * 获取企业类型
	 * 
	 * @return
	 */
	public List<ResQuota> getPSType() {
		return mapper.getPSType();
	}

	/**
	 * 获取企业名称
	 * 
	 * @return
	 */
	public List<ResQuota> getEnterprise() {
		return mapper.getEnterpriseInfo();
	}

	public int blurryCount(ResQuota bean) {
		return mapper.blurryCount(bean);
	}

	public List<ResQuota> blurryQuota(ResQuota bean) {
		return mapper.blurryQuota(bean);
	}

	public List<ResQuota> getCityQutoa(ResQuota bean) {
		return mapper.getCityQutoa(bean);
	}

	public JSONObject getQuotaTop(ResQuota bean) {
		List<ResQuota> beans = mapper.getEnterpriseByMonth(bean);
		if (beans == null || beans.size() < 1) {
			return null;
		}
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		JSONObject object = null;
		if (bean.getCityId() == null || "-1".equals(bean.getCityId())) {
			object = ResQuotaUtils.formatQuotaTop(beans, reliablitity, weight);
		} else {
			object = ResQuotaUtils.formatQuotaCityTop(beans, reliablitity, weight);
		}
		return object;
	}

	public JSONObject getQuotaPSType(ResQuota bean) {
		List<ResQuota> beans = mapper.getEnterpriseByMonth(bean);
		if (beans == null || beans.size() < 1) {
			return null;
		}
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		JSONObject object = ResQuotaUtils.formatQuotaPSType(beans, reliablitity, weight);
		return object;
	}

	public List<ResQuota> getImproveCity(ResQuota bean) {

		List<ResQuota> beans = mapper.getEnterprise(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> cityBeans = ResQuotaUtils.formatCityQuota(beans, reliablitity, weight);
		return cityBeans;
	}

	public ResQuota getImproveCityDetailSta(ResQuota bean) {
		List<ResQuota> beans = mapper.getEnterprise(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		ResQuota cityBean = ResQuotaUtils.formatCityQuotaDetailSta(beans, reliablitity, weight);
		return cityBean;
	}

	public List<ResQuota> getImproveCityDetailInterval(ResQuota bean) {
		List<ResQuota> beans = mapper.getImproveCityDetailInterval(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> cityBeans = ResQuotaUtils.formatCityQuotaDetailInterval(beans, reliablitity, weight, bean.getBeginTime(), bean.getEndTime());
		return cityBeans;
	}

	public List<ResQuota> getImprovePSType(ResQuota bean) {
		List<ResQuota> beans = mapper.getEnterprise(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> psTypeBeans = ResQuotaUtils.formatPSTypeQuota(beans, reliablitity, weight);
		return psTypeBeans;
	}

	public ResQuota getImprovePSTypeDetailSta(ResQuota bean) {
		List<ResQuota> beans = mapper.getEnterprise(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		ResQuota psTypeBean = ResQuotaUtils.formatPSTypeQuotaDetailSta(beans, reliablitity, weight);
		return psTypeBean;
	}

	public List<ResQuota> getImprovePSTypeDetailInterval(ResQuota bean) {
		return mapper.getImprovePSTypeDetailInterval(bean);
	}

	public List<ResQuota> getImproveRes(ResQuota bean) {
		List<ResQuota> beans = mapper.getImproveRes(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> reseBeans = ResQuotaUtils.formatResQuota(beans, reliablitity, weight);
		return reseBeans;
	}

	public ResQuota getImproveResDetailSta(ResQuota bean) {
		List<ResQuota> beans = mapper.getEnterprise(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		ResQuota resBean = ResQuotaUtils.formatResQuotaDetailSta(beans, reliablitity, weight);
		return resBean;
	}

	public List<ResQuota> getImproveResDetailInterval(ResQuota bean) {
		return mapper.getImproveResDetailInterval(bean);
	}

	public int getImproveResCount(ResQuota bean) {
		return mapper.getImproveResCount(bean);
	}

	public List<ResQuota> getImproveYear(ResQuota bean) {
		List<ResQuota> beans = mapper.getImproveYear(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> cityBeans = ResQuotaUtils.formatCityQuotaLine(beans, reliablitity, weight);
		return cityBeans;
	}

	public List<ResQuota> getImprovePSTypeYear(ResQuota bean) {
		List<ResQuota> beans = mapper.getImproveYear(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> psTypeBeans = ResQuotaUtils.formatPSTypeQuotaLine(beans, reliablitity, weight);
		return psTypeBeans;
	}

	public List<ResQuota> getImproveYearCity(ResQuota bean) {
		List<ResQuota> beans = mapper.getImproveCityDetailInterval(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> cityBeans = ResQuotaUtils.formatCityQuotaCity(beans, reliablitity, weight, bean.getBeginTime(), bean.getEndTime(), bean.getCityId());
		return cityBeans;
	}

	public List<ResQuota> getImprovePSTypeMonth(ResQuota bean) {
		List<ResQuota> beans = mapper.getImprovePSTypeDetailInterval(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> psTypeBeans = ResQuotaUtils.formatPSTypeQuota(beans, reliablitity, weight, bean.getBeginTime(), bean.getEndTime(), bean.getPsType());
		return psTypeBeans;
	}

	public List<ResQuota> getImprovEnterpriseLine(ResQuota bean) {
		List<ResQuota> beans = mapper.getImproveResDetailInterval(bean);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = mapper.getReliability(psCodes);
		// 获取指标权重信息
		List<ResQuotaParameter> weights = paraMapper.getQuotaParameter();
		ResQuotaParameter weight = new ResQuotaParameter();
		weight.setConstant(weights.get(0).getParameter() / 100f);
		weight.setFluctuation(weights.get(1).getParameter() / 100f);
		weight.setHandicapping(weights.get(2).getParameter() / 100f);
		weight.setMutation(weights.get(3).getParameter() / 100f);
		weight.setScreenJump(weights.get(4).getParameter() / 100f);
		weight.setReliable(weights.get(5).getParameter() / 100f);
		weight.setComplete(weights.get(6).getParameter() / 100f);
		weight.setEffective(weights.get(7).getParameter() / 100f);
		List<ResQuota> enterpriseBeans = ResQuotaUtils.formatResQuota(beans, reliablitity, weight, bean.getBeginTime(), bean.getEndTime(), bean.getPsType());
		return enterpriseBeans;
	}

	public List<ResQuota> getEnterpriseByInfo(ResQuota bean) {
		return mapper.getEnterpriseByInfo(bean);
	}

	public JSONObject getEnterpriseBIInfo(ResQuota bean) {
		List<ResQuota> beans = mapper.getEnterpriseBIInfo(bean);
		JSONObject object = ResQuotaUtils.formatEnterpriseBIInfo(beans);
		return object;

	}

	public int addPSReliable(ResQuota bean) {
		return mapper.addPSReliable(bean);
	}
}
