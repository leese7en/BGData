package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.BIResultDao;
import com.magus.bd.entity.BIResult;
import com.magus.bd.service.BIResultService;

@Service("biResultService")
public class BIResultServiceImpl implements BIResultService {
	private BIResultDao mapper;

	public BIResultDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(BIResultDao mapper) {
		this.mapper = mapper;
	}

	public List<BIResult> blurryBIResult(BIResult bean) {
		return mapper.blurryBIResult(bean);
	}

	public int blurryCount(BIResult bean) {
		return mapper.blurryCount(bean);
	}

	public List<BIResult> getDetail(BIResult bean) {
		return mapper.getDetail(bean);
	}

	public List<BIResult> getAlgorithm() {
		return mapper.getAlgorithm();
	}

	
	public List<BIResult> blurryBIWaterResult(BIResult bean) {
		return mapper.blurryBIWaterResult(bean);
	}

	public int blurryWaterCount(BIResult bean) {
		return mapper.blurryWaterCount(bean);
	}

	public List<BIResult> getWaterDetail(BIResult bean) {
		return mapper.getWaterDetail(bean);
	}

	public List<BIResult> getWaterAlgorithm() {
		return mapper.getWaterAlgorithm();
	}
}
