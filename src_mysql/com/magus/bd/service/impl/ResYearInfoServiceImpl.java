package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.ResYearInfoDao;
import com.magus.bd.entity.ResYearInfo;
import com.magus.bd.service.ResYearInfoService;
import com.magus.bd.utils.ResYearUtils;

@Service("areaInfoService")
public class ResYearInfoServiceImpl implements ResYearInfoService {
	private ResYearInfoDao mapper;

	public ResYearInfoDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResYearInfoDao mapper) {
		this.mapper = mapper;
	}

	public boolean addAreaYearInfo(ResYearInfo bean) {
		if (mapper.addAreaYearInfo(bean) == 1) {
			return true;
		}
		return false;
	}

	public List<ResYearInfo> getAreaYearInfo(ResYearInfo bean) {
		return mapper.getAreaYearInfo(bean);
	}
	public List<ResYearInfo> getPowerCountByYear(ResYearInfo bean) {
		return mapper.getPowerCountByYear(bean);
	}

	public boolean addCityYearInfo(ResYearInfo bean) {
		if (mapper.addCityYearInfo(bean) == 1) {
			return true;
		}
		return false;
	}

	public List<ResYearInfo> getCityYearInfo() {

		return mapper.getCityYearInfo();
	}

	public List<ResYearInfo> getCountryPower() {

		return mapper.getCountryPower();
	}

	public boolean addCountryPowerInfo(ResYearInfo bean) {
		if (mapper.addCountryPowerInfo(bean) == 1) {
			return true;
		}
		return false;
	}

	public JSONObject getCountryPowerInfo() {
		List<ResYearInfo> infos = mapper.getCountryPower();
		JSONObject object = new JSONObject();
		JSONObject oPower = new JSONObject();
		JSONObject oInstalled = new JSONObject();
		JSONObject oEffective = new JSONObject();
		JSONArray arrayPower = null;
		JSONArray arrayInstalled = null;
		JSONArray arrayEffective = null;
		for (ResYearInfo info : infos) {
			// 发电量
			arrayPower = oPower.getJSONArray(info.getYear());
			if (arrayPower == null) {
				arrayPower = new JSONArray();
			}
			arrayPower.add(info.getPowerAmountIncrementRate());
			oPower.put(info.getYear(), arrayPower);
			// 装机容量
			arrayInstalled = oInstalled.getJSONArray(info.getYear());
			if (arrayInstalled == null) {
				arrayInstalled = new JSONArray();
			}
			arrayInstalled.add(info.getInstalledAmountIncrementRate());
			oInstalled.put(info.getYear(), arrayInstalled);
			// 有效利用小时
			arrayEffective = oEffective.getJSONArray(info.getYear());
			if (arrayEffective == null) {
				arrayEffective = new JSONArray();
			}
			arrayEffective.add(info.getEffectiveHourIncrementRate());
			oEffective.put(info.getYear(), arrayEffective);
		}
		object.put("powerIncrement", oPower);
		object.put("installedIncrement", oInstalled);
		object.put("effectiveIncrement", oEffective);
		return object;
	}
	public JSONObject getCountryContaminants() {
		List<ResYearInfo> infos = mapper.getCountryContaminants();
			JSONArray contaminantsArray = null;
			JSONObject contaminantsObject = new JSONObject();
			for (ResYearInfo bean : infos) {
				contaminantsArray = new JSONArray();
				contaminantsArray.add(bean.getSo2Amount());
				contaminantsArray.add(bean.getNoxAmount());
				contaminantsArray.add(bean.getDustAmount());
				contaminantsObject.put(bean.getYear(), contaminantsArray);
			}
		return contaminantsObject;
	}

	public JSONObject getCountryPowerPoint() {
		List<ResYearInfo> powerPoint = mapper.getCountryPowerPoint();
		JSONObject object = ResYearUtils.formatPowerPoint(powerPoint);
		return object;
	}

	public JSONObject getCountryCoalPoint() {
		List<ResYearInfo> coalPoint = mapper.getCountryCoalPoint();
		JSONObject object = ResYearUtils.formatCoalPoint(coalPoint);
		return object;
	}

	public JSONObject getChildrenMapData(ResYearInfo bean) {
		JSONObject object = new JSONObject();
		List<ResYearInfo> beansIncreamnet = mapper.getCityPower(bean);
		List<ResYearInfo> beansPower = mapper.getCityYear(bean);
		List<ResYearInfo> powerPoint = mapper.getCityPowerPoint(bean);
		List<ResYearInfo> coalPoint = mapper.getCityCoalPoint(bean);
		JSONObject cityPower = ResYearUtils.formatResYearInfo(beansPower);
		JSONObject powerPointO = ResYearUtils.formatPowerPoint(powerPoint);
		JSONObject coalPointO = ResYearUtils.formatCoalPoint(coalPoint);
		object.put("cityPower", cityPower);
		object.put("powerPoint", powerPointO);
		object.put("coalPoint", coalPointO);
		JSONObject oPower = new JSONObject();
		JSONObject oInstalled = new JSONObject();
		JSONObject oEffective = new JSONObject();
		JSONArray arrayPower = null;
		JSONArray arrayInstalled = null;
		JSONArray arrayEffective = null;
		for (ResYearInfo info : beansIncreamnet) {
			// 发电量
			arrayPower = oPower.getJSONArray(info.getYear());
			if (arrayPower == null) {
				arrayPower = new JSONArray();
			}
			arrayPower.add(info.getPowerAmountIncrementRate());
			oPower.put(info.getYear(), arrayPower);
			// 装机容量
			arrayInstalled = oInstalled.getJSONArray(info.getYear());
			if (arrayInstalled == null) {
				arrayInstalled = new JSONArray();
			}
			arrayInstalled.add(info.getInstalledAmountIncrementRate());
			oInstalled.put(info.getYear(), arrayInstalled);
			// 有效利用小时
			arrayEffective = oEffective.getJSONArray(info.getYear());
			if (arrayEffective == null) {
				arrayEffective = new JSONArray();
			}
			arrayEffective.add(info.getEffectiveHourIncrementRate());
			oEffective.put(info.getYear(), arrayEffective);
		}
		object.put("powerIncrement", oPower);
		object.put("installedIncrement", oInstalled);
		object.put("effectiveIncrement", oEffective);
		return object;
	}
}
