package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Ranking;

public interface RankingService {

	public List<Ranking> getRanking();

	public List<Ranking> getRankingByYear(Ranking bean);

	public JSONObject getRankingEnterpriseByYear(Ranking bean, String analysisType, String pollType);

	public List<Ranking> getCitygEnterpriseByYear(Ranking bean);

	public int getRankingCountByYear(Ranking bean);
}
