package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.ResEffective;

public interface ResEffectiveService {
	/**
	 * 根据年度区间 选择 获取盟市的数据有效率
	 * 
	 * @return
	 */
	public abstract List<ResEffective> getEffectiveYear(ResEffective bean);

}
