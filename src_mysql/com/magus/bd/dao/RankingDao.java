package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.Ranking;

public interface RankingDao {

	public List<Ranking> getRanking();

	/**
	 * 根据排名查询年度信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<Ranking> getRankingByYear(Ranking bean);

	/**
	 * 查询企业 年度信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<Ranking> getRankingEnterpriseByYear(Ranking bean);

	/**
	 * 根据年度信息统计总个数
	 * 
	 * @param bean
	 * @return
	 */
	public int getRankingCountByYear(Ranking bean);

	/**
	 * 获取各盟市每年的GDP
	 * 
	 * @param bean
	 * @return
	 */
	public List<Ranking> getCityGDP(Ranking bean);

}
