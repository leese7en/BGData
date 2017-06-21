package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.ResFacHourDataDao;
import com.magus.bd.entity.ResFacHourData;
import com.magus.bd.service.ResFacHourDataService;
import com.magus.bd.utils.ResFacHourDataUtils;

@Service("facHourDataervice")
public class ResFacHourDataServiceImpl implements ResFacHourDataService {
	private ResFacHourDataDao mapper;

	public ResFacHourDataDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResFacHourDataDao mapper) {
		this.mapper = mapper;
	}

	public JSONObject getWaterFacHourDataInfoChart(ResFacHourData bean) {
		List<ResFacHourData> beans = mapper.getWaterFacHourDataInfoChart(bean);
		return ResFacHourDataUtils.formatWaterFacHourDataLine(beans,bean);
	}

	public List<ResFacHourData> getWaterFacHourDataInfoTable(ResFacHourData bean) {
		return mapper.getWaterFacHourDataInfoTable(bean);
	}

	public int getWaterFacHourDataInfoTableCount(ResFacHourData bean) {
		return mapper.getWaterFacHourDataInfoTableCount(bean);
	}
	
	public JSONObject getGasFacHourDataInfoChart(ResFacHourData bean) {
		List<ResFacHourData> beans = mapper.getGasFacHourDataInfoChart(bean);
		return ResFacHourDataUtils.formatGasFacHourDataLine(beans,bean);
	}

	public List<ResFacHourData> getGasFacHourDataInfoTable(ResFacHourData bean) {
		return mapper.getGasFacHourDataInfoTable(bean);
	}

	public int getGasFacHourDataInfoTableCount(ResFacHourData bean) {
		return mapper.getGasFacHourDataInfoTableCount(bean);
	}

}
