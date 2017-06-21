package com.magus.bd.service;

import java.util.List;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResHotword;

public interface ResHotwordService {
	/**
	 * 查询热词
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResHotword> blurryHotword(ResHotword bean);

	/**
	 * 满足条件的总个数
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int blurryHotwordCount(ResHotword bean);

	/**
	 * 查询热词组
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResHotword> blurryHotPhrase(ResHotword bean);

	/**
	 * 获取所有的热词
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResHotword> getHotwords(ResHotword bean);

	/**
	 * 统计 热词出现的次数信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject countHotwordTimes(ResHotword bean);

	/**
	 * 根据热词类型统计热词
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject countHotwordByType(ResHotword bean);

	/**
	 * 根据 热词类型获取盟市下属的频次信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject countHotwordCityInfoByType(ResHotword bean);

	/**
	 * 获取具体的盟市 以及具体信息
	 * 
	 * @param bean
	 * @return
	 */

	public abstract JSONObject countHotwordCityInfoByTypeDetail(ResHotword bean);

	/**
	 * 获取盟市下面企业信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject countHotwordPSCodeInfoByTypeDetail(ResHotword bean);

	/**
	 * 插入 关键词
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int insertHotword(ResHotword bean);

	/**
	 * 添加热词类型
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int insertHotwordType(ResHotword bean);

	/**
	 * 插入热词组
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int insertHotPhrase(ResHotword bean);

	/**
	 * 获取 热词类型
	 * 
	 * @return
	 */
	public abstract List<ResHotword> getHotwordType();

	/**
	 * 获取报告类型
	 * 
	 * @return
	 */
	public abstract List<ResHotword> getReport();

	/**
	 * 插入 热词企业相关信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract int insertHotwordEnterprise(ResHotword bean);

	/**
	 * 查询 给定时间段没每类问题出现的情况
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResHotword> queryHotwordByType(ResHotword bean);

	/**
	 * 获取每年的热词频次信息
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getHotwordFrequencyYear(ResHotword bean);

	/**
	 * 统计 热词出现的次数信息(根据条件模糊查询)
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject countHotwordTimesByWords(ResHotword bean);

	/**
	 * 获取所有的热词
	 * 
	 * @return
	 */
	public List<ResHotword> getAllHotWord();

	public ResHotword getHotwordTypeById(String id);
}
