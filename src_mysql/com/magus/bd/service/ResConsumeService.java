package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.ResConsume;

public interface ResConsumeService {
	/**
	 * 获取AQI数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract List<ResConsume> getConsumeInfo(ResConsume bean);

}
