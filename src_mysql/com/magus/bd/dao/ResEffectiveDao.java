package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.entity.ResEffective;

public interface ResEffectiveDao extends BaseDao {
	/**
	 * 根据年度区间 选择 获取盟市的数据有效率
	 * 
	 * @return
	 */
	public List<ResEffective> getEffectiveYear(ResEffective bean);

}
