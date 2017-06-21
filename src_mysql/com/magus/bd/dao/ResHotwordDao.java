package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResHotword;

public interface ResHotwordDao extends BaseDao {

	/**
	 * 查询热词
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> blurryHotword(ResHotword bean);

	/**
	 * 满足条件的总个数
	 * 
	 * @param bean
	 * @return
	 */
	public int blurryHotwordCount(ResHotword bean);

	/**
	 * 查询热词
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> blurryHotPhrase(ResHotword bean);

	/**
	 * 获取所有的热词
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> getHotwords(ResHotword bean);

	/**
	 * 统计出现次数最多的几种热词
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> getHotwordFrequencyYear(ResHotword bean);

	/**
	 * 获取 每年的月度 数据
	 * 
	 * @param bean
	 * @return
	 */

	public List<ResHotword> getHotwordFrequencyMonth(ResHotword bean);

	/**
	 * 统计 热词出现的次数信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordTimes(ResHotword bean);

	/**
	 * 根据热词类型统计热词
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordByType(ResHotword bean);

	/**
	 * 获取明细信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordByTypeChild(ResHotword bean);

	/**
	 * 根据 热词类型获取盟市下属的频次信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordCityInfoByType(ResHotword bean);

	/**
	 * 获取明细类别的分布信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordCityInfoByTypeDetail(ResHotword bean);

	/**
	 * 根据 热词类型获取 盟市的企业分布信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordPsCodeInfoByType(ResHotword bean);

	/**
	 * 获取明细类别 企业分布信息
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordPsCodeInfoByTypeDetail(ResHotword bean);

	/**
	 * 插入 关键词
	 * 
	 * @param bean
	 * @return
	 */
	public int insertHotword(ResHotword bean);

	/**
	 * 添加热词类型
	 * 
	 * @param bean
	 * @return
	 */
	public int insertHotwordType(ResHotword bean);

	/**
	 * 插入热词组
	 * 
	 * @param bean
	 * @return
	 */
	public int insertHotPhrase(ResHotword bean);

	/**
	 * 获取 热词类型
	 * 
	 * @return
	 */
	public List<ResHotword> getHotwordType();

	/**
	 * 获取报告类型
	 * 
	 * @return
	 */
	public List<ResHotword> getReport();

	/**
	 * 插入 热词企业相关信息
	 * 
	 * @param bean
	 * @return
	 */
	public int insertHotwordEnterprise(ResHotword bean);

	/**
	 * 查询 给定时间段没每类问题出现的情况
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> queryHotwordByType(ResHotword bean);

	/**
	 * 统计 热词出现的次数信息(根据条件查找)
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordTimesByWords(ResHotword bean);

	/**
	 * 统计 热词出现的次数信息(根据大类找小类)
	 * 
	 * @param bean
	 * @return
	 */
	public List<ResHotword> countHotwordByBigType(ResHotword bean);

	/**
	 * 获取所有的热词
	 * 
	 * @return
	 */
	public List<ResHotword> getAllHotWord();

	public ResHotword getHotwordTypeById(String id);

}
