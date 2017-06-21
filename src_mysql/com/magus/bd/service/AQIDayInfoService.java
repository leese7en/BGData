package com.magus.bd.service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.AQIDayInfo;

public interface AQIDayInfoService {
	/**
	 * 获取AQI数据
	 * 
	 * @param bean
	 * @return
	 */
	public abstract JSONObject getAQIDayInfo(AQIDayInfo bean);

}
