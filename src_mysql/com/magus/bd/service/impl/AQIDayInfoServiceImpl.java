package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.AQIDayInfoDao;
import com.magus.bd.entity.AQIDayInfo;
import com.magus.bd.service.AQIDayInfoService;
import com.magus.bd.utils.AQIUtils;

@Service("aqiDayInfoService")
public class AQIDayInfoServiceImpl implements AQIDayInfoService {
	private AQIDayInfoDao mapper;

	public AQIDayInfoDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(AQIDayInfoDao mapper) {
		this.mapper = mapper;
	}

	public JSONObject getAQIDayInfo(AQIDayInfo bean) {
		List<AQIDayInfo> beans = mapper.getAQIDayInfo(bean);
		List<AQIDayInfo> pollBeans = mapper.getPollDayInfo(bean);
		if (beans == null || beans.size() < 1 || pollBeans == null || pollBeans.size() < 1) {
			return null;
		}

		JSONObject pollObject = AQIUtils.fromatPollStrength(pollBeans);
		List<AQIDayInfo> pollAmount = mapper.getPollAmountInfo(bean);
		List<AQIDayInfo> powerPollAmount = mapper.getPowerPollAmountInfo(bean);
		JSONObject pollAmountO = AQIUtils.fromatPollAmount(pollAmount, powerPollAmount);
		List<String> axisData = AQIUtils.getAQIInterval(beans);
		List<JSONObject> aqiData = AQIUtils.getAQIData(beans);
		JSONObject object = new JSONObject();
		object.put("axisData", axisData);
		object.put("aqiData", aqiData);
		object.put("SO2", pollObject.get("SO2"));
		object.put("NOx", pollObject.get("NOx"));
		object.put("dust", pollObject.get("dust"));
		object.put("total", pollAmountO);
		return object;
	}
}
