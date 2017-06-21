package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.RankingDao;
import com.magus.bd.entity.Ranking;
import com.magus.bd.service.RankingService;
import com.magus.bd.utils.RankingUtils;

@Service
public class RankingServiceImpl implements RankingService {

	@Autowired
	private RankingDao mapper;

	public List<Ranking> getRanking() {

		return mapper.getRanking();
	}

	public List<Ranking> getRankingByYear(Ranking bean) {
		List<Ranking> beans = mapper.getRankingByYear(bean);
		return beans;
	}

	public JSONObject getRankingEnterpriseByYear(Ranking bean, String analysisType, String pollType) {
		List<Ranking> beans = mapper.getRankingEnterpriseByYear(bean);
		JSONObject object = RankingUtils.formatAnalysisPoll(beans, analysisType, pollType);
		return object;
	}

	public List<Ranking> getCitygEnterpriseByYear(Ranking bean) {
		List<Ranking> beans = mapper.getRankingEnterpriseByYear(bean);
		return beans;
	}

	public int getRankingCountByYear(Ranking bean) {
		return mapper.getRankingCountByYear(bean);
	}

}
