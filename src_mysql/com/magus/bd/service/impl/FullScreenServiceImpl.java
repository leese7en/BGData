package com.magus.bd.service.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.cache.OPConnsIndustryCache;
import com.magus.bd.dao.FullScreenDao;
import com.magus.bd.dao.ResIndustryConDao;
import com.magus.bd.dao.ResPowerNetworkDao;
import com.magus.bd.dao.ResQuotaDao;
import com.magus.bd.dao.ResQuotaParameterDao;
import com.magus.bd.dao.ResSuperlowFullViewDao;
import com.magus.bd.dao.ResYearInfoDao;
import com.magus.bd.dao.SysCityDao;
import com.magus.bd.entity.FullScreen;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.ResPowerNetwork;
import com.magus.bd.entity.ResQuota;
import com.magus.bd.entity.ResQuotaParameter;
import com.magus.bd.entity.ResSuperlowFullView;
import com.magus.bd.entity.ResYearInfo;
import com.magus.bd.entity.SysCity;
import com.magus.bd.service.FullScreenService;
import com.magus.bd.utils.FullScreenUtils;
import com.magus.bd.utils.ResIndustryUtils;
import com.magus.bd.utils.ResPowerNetworkUtils;
import com.magus.bd.utils.ResQuotaUtils;
import com.magus.bd.utils.ResYearUtils;
import com.magus.net.IOPConnect;
import com.magus.net.OPDynamicData;
import com.magus.net.OPPooledConnects;
import com.magus.net.common.DynamicData;

@Service("fullScreenService")
public class FullScreenServiceImpl implements FullScreenService {
	private FullScreenDao mapper;

	public FullScreenDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(FullScreenDao mapper) {
		this.mapper = mapper;
	}

	private ResSuperlowFullViewDao superMapper;

	public ResSuperlowFullViewDao getSuperMapper() {
		return superMapper;
	}

	@Autowired
	public void setSuperMapper(ResSuperlowFullViewDao superMapper) {
		this.superMapper = superMapper;
	}

	private SysCityDao cityMapper;

	public SysCityDao getCityMapper() {
		return cityMapper;
	}

	@Autowired
	public void setCityMapper(SysCityDao cityMapper) {
		this.cityMapper = cityMapper;
	}
	
	
	private ResQuotaDao quotaMapper;

	

	public ResQuotaDao getQuotaMapper() {
		return quotaMapper;
	}
	@Autowired
	public void setQuotaMapper(ResQuotaDao quotaMapper) {
		this.quotaMapper = quotaMapper;
	}

	private ResQuotaParameterDao paraMapper;


	public ResQuotaParameterDao getParaMapper() {
		return paraMapper;
	}

	@Autowired
	public void setParaMapper(ResQuotaParameterDao paraMapper) {
		this.paraMapper = paraMapper;
	}

	
	private ResPowerNetworkDao netWorkMapper;
	private ResYearInfoDao yearMapper;
	

	public ResPowerNetworkDao getNetWorkMapper() {
		return netWorkMapper;
	}
	@Autowired
	public void setNetWorkMapper(ResPowerNetworkDao netWorkMapper) {
		this.netWorkMapper = netWorkMapper;
	}

	public ResYearInfoDao getYearMapper() {
		return yearMapper;
	}
	@Autowired
	public void setYearMapper(ResYearInfoDao yearMapper) {
		this.yearMapper = yearMapper;
	}

	/**
	 * 格式化 机组类型
	 */
	public JSONObject getBoilerTypeInstallAmountCountByYear(FullScreen bean) {
		List<FullScreen> boilerTypeBeans = mapper.getBoilerTypeCountByYear(bean);
		List<FullScreen> installAmountBeans = mapper.getInstallAmountByYear(bean);
		JSONObject object = FullScreenUtils.formatBoilerCountInstallAmount(boilerTypeBeans,installAmountBeans);
		return object;
	}
	
	/**
	 * 格式化 工况数据
	 */
	public JSONObject getIndustryInfo(FullScreen bean) {
		List<FullScreen> beans = mapper.getIndustryPowerAmountMonth(bean);
		JSONObject objInstalled = FullScreenUtils.formatIndustryInstalledAmountMonth(beans);
		JSONObject objPower = FullScreenUtils.formatIndustryPowerAmountMonth(beans);
		JSONObject object = new JSONObject();
		object.put("industryAmount", objInstalled);
		object.put("powerAmount", objPower);
		return object;
	}

	/**
	 * 格式化 工况数据
	 */
	public JSONObject getSupwerLowInfo(FullScreen bean) {
		List<ResSuperlowFullView> beans = superMapper.getPowerUnit(null);
		List<SysCity> cityBeans = cityMapper.getCity();
		List change = new ArrayList();
		List close = new ArrayList();
		List news = new ArrayList();
		for (ResSuperlowFullView o : beans) {
			int flag = o.getFlag();
			if (flag == 0) {
				change.add(o);
			} else if (flag == 1) {
				close.add(o);
			} else {
				news.add(o);
			}
		}
		List<ResSuperlowFullView> beanPoll = superMapper.getPowerUnitEmissionInfo(bean.getPolluteCode());
		Map citySuperlowMap = new HashMap();
		Map operatorBeans = null;
		operatorBeans = FullScreenUtils.formatSuperlowFullViewOPerator(change, close, news, "-1");
		JSONObject object = null;
		object = FullScreenUtils.previewSuperlowFullView(beanPoll, operatorBeans, bean.getPolluteCode(), "-1");
		citySuperlowMap.put("全区", object);
		List<ResSuperlowFullView> opBeans = null;
		for (SysCity city : cityBeans) {
			String cityInfo = city.getId();
			if (cityInfo != null && !"-1".equals(cityInfo)) {
				opBeans = new ArrayList<ResSuperlowFullView>();
				for (ResSuperlowFullView oo : beanPoll) {
					if (oo.getCityId().equals(cityInfo)) {
						opBeans.add(oo);
					}
				}
			} else {
				opBeans = beanPoll;
			}
			operatorBeans = FullScreenUtils.formatSuperlowFullViewOPerator(change, close, news, cityInfo);
			object = FullScreenUtils.previewSuperlowFullView(opBeans, operatorBeans, bean.getPolluteCode(), cityInfo);
			citySuperlowMap.put(city.getTagName(), object);
		}
		JSONObject obj = FullScreenUtils.formatFullScreenView(citySuperlowMap,bean.getPolluteCode());
		return obj;
	}
	/**
	 * 获取质量统计信息
	 */
	public JSONObject getDataQuality(FullScreen bean) {
		List<FullScreen> allBeans = mapper.getDataQualityTotal(bean);
		List<FullScreen> cityBeans = mapper.getDataQualityCity(bean);
		JSONObject obj = FullScreenUtils.formatDataQuality(allBeans,cityBeans);
		return obj;
	}
	/**
	 * 获取质量统计信息
	 */
	public JSONObject getHotwordInfo(FullScreen bean) {
		List<FullScreen> allBeans = mapper.getHotWordAll(bean);
		List<FullScreen> psBeans = mapper.getHotWordEnterprise(bean);
		JSONObject obj = FullScreenUtils.formatHotWord(allBeans,psBeans);
		return obj;
	}
	/**
	 * 质量现状和改善分析
	 */
	public JSONObject getDataQualityImprove(FullScreen bean) {
		ResQuota oo = new ResQuota();
		oo.setDate(bean.getYear());
		List<ResQuota> beans = quotaMapper.getImproveYear(oo);
		List<String> psCodes = new ArrayList<String>();
		for (ResQuota o : beans) {
			psCodes.add(o.getPsCode());
		}
		if (psCodes.size() <= 0) {
			return null;
		}
		List<ResQuota> reliablitity = quotaMapper.getReliability(psCodes);
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
		JSONObject o = FullScreenUtils.formatQuotaYear(cityBeans);
		return o;
	}

	public List<ResYearInfo> getAreaYearInfo(ResYearInfo bean) {
		return yearMapper.getAreaYearInfo(bean);
	}
	public JSONObject getCountryCoalPoint() {
		List<ResYearInfo> coalPoint = yearMapper.getCountryCoalPoint();
		JSONObject object = ResYearUtils.formatCoalPoint(coalPoint);
		return object;
	}

	public JSONObject getCountryPowerPoint() {
		List<ResYearInfo> powerPoint = yearMapper.getCountryPowerPoint();
		JSONObject object = ResYearUtils.formatPowerPoint(powerPoint);
		return object;
	}

	public JSONObject getPowerNetWorkHigh() {
		JSONObject object = new JSONObject();
		List<ResPowerNetwork> powers = netWorkMapper.getPowerInfo();
		JSONObject powerObject = new JSONObject();
		for (ResPowerNetwork bean : powers) {
			Float[] tude = new Float[2];
			tude[0] = bean.getBlongitude();
			tude[1] = bean.getBlatitude();
			powerObject.put(bean.getBname(), tude);
		}
		object.put("power", powerObject);
		List<ResPowerNetwork> network = netWorkMapper.getPowerNetWorkHigh();
		Map<String, JSONArray> objectMap = ResPowerNetworkUtils.formatNetwork(network);
		object.put("network", objectMap);
		return object;
	}

	public JSONObject getPowerNetWorkLow() {
		JSONObject object = new JSONObject();
		List<ResPowerNetwork> powers = netWorkMapper.getPowerInfo();
		JSONObject powerObject = new JSONObject();
		for (ResPowerNetwork bean : powers) {
			Float[] tude = new Float[2];
			tude[0] = bean.getBlongitude();
			tude[1] = bean.getBlatitude();
			powerObject.put(bean.getBname(), tude);
		}
		object.put("power", powerObject);
		List<ResPowerNetwork> network = netWorkMapper.getPowerNetWorkLow();
		Map<String, JSONArray> objectMap = ResPowerNetworkUtils.formatNetwork(network);
		object.put("network", objectMap);
		return object;
	}
	
	
	private ResIndustryConDao industryMapper;
	
	public ResIndustryConDao getIndustryMapper() {
		return industryMapper;
	}
	@Autowired
	public void setIndustryMapper(ResIndustryConDao industryMapper) {
		this.industryMapper = industryMapper;
	}

	public JSONObject getIndustryPollByPoll(ResIndustryCon bean, String viewPoint, String pollType) {
		List<ResIndustryCon> beans = null;
		if ("city".equals(viewPoint)) {
			beans = industryMapper.getIndustryPollByCity(bean);
			
		} else {
			beans = industryMapper.getIndustryPollByGroup(bean);
		}
		JSONObject object = FullScreenUtils.formatIndustryInfo(beans, viewPoint, pollType);
		return object;
	}
	
	public JSONObject getIndustrySulfurMonth(ResIndustryCon bean, String viewPoint) {
		List<ResIndustryCon> beans = null;
		if ("city".equals(viewPoint)) {
			beans = industryMapper.getIndustrySulfurByCity(bean);
		} else {
			beans = industryMapper.getIndustrySulfurByGroup(bean);
		}
		JSONObject object = FullScreenUtils.formatIndustrySulfurMonth(beans, viewPoint, Integer.parseInt(bean
				.getBeginTime()), Integer.parseInt(bean.getEndTime()));
		return object;
	}
	
	public JSONObject queryAnalysisFullScreen() {
		List<FullScreen> beans = mapper.queryAnalysisFullScreen();
		JSONObject object = FullScreenUtils.formatAnalysisFullScreen(beans);
		return object;
	}
	
	public List<ResIndustryCon> getIndurutyConByEnterprise(ResIndustryCon bean) {
		List<ResIndustryCon> beans = ResIndustryUtils.formatIndurutyEnterprise(industryMapper.getIndurutyConByEnterpriseByCityName(bean));
		return beans;
	}

	public JSONObject getIndurutyRealtime(String cityName) {
		List<String> pointsName = FullScreenUtils.getIndustryPointsName(cityName);
		OPPooledConnects cons = OPConnsIndustryCache.getConns();
		IOPConnect conn = null;
		try {
			conn = cons.getConnect();
		} catch (Exception e) {
			System.err.println("***数据库连接异常！***");
		}
		JSONObject obj =null;
		String[] names = new String[pointsName.size()];
		pointsName.toArray(names);
		try {
			Map<String, OPDynamicData> dys = conn.getPointDynamicDatas(names);
			if (conn != null) {
				cons.freeConnect(conn);
			}
			obj =FullScreenUtils.formatIndustryRealTime(dys,cityName); 
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		return obj;
	}
	public JSONObject getOnlineEmission(String cityName){
		List<FullScreen> beans =mapper.getOnlineEmission(cityName);
		JSONObject obj = FullScreenUtils.formatOnlineEmission(beans); 
		return obj;
	}
}
