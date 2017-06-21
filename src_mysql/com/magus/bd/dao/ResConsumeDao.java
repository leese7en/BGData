package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResConsume;

public interface ResConsumeDao extends BaseDao {

	/**
	 * 获取区年度信息
	 * 
	 * @return
	 */
	public List<ResConsume> getConsumeInfo(ResConsume bean);

}
