package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.ResPowerNetworkDao;
import com.magus.bd.entity.ResPowerNetwork;
import com.magus.bd.service.ResPowerNetworkService;
import com.magus.bd.utils.ResPowerNetworkUtils;

@Service("resPowerNetworkService")
public class ResPowerNetworkServiceImpl implements ResPowerNetworkService {
	private ResPowerNetworkDao mapper;

	public ResPowerNetworkDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResPowerNetworkDao mapper) {
		this.mapper = mapper;
	}

	public List<ResPowerNetwork> getPowerInfo() {

		return mapper.getPowerInfo();
	}

	public boolean addPowerInfo(ResPowerNetwork bean) {

		if (mapper.addPowerInfo(bean) == 1) {
			return true;
		}
		return false;
	}

	public boolean addPowerNetwork(ResPowerNetwork bean) {
		if (mapper.addPowerNetwork(bean) == 1) {
			return true;
		}
		return false;
	}

	/**
	 * 获取电网信息
	 */
	public JSONObject getPowerNetWorkHigh() {
		JSONObject object = new JSONObject();
		List<ResPowerNetwork> powers = mapper.getPowerInfo();
		JSONObject powerObject = new JSONObject();
		for (ResPowerNetwork bean : powers) {
			Float[] tude = new Float[2];
			tude[0] = bean.getBlongitude();
			tude[1] = bean.getBlatitude();
			powerObject.put(bean.getBname(), tude);
		}
		object.put("power", powerObject);
		List<ResPowerNetwork> network = mapper.getPowerNetWorkHigh();
		JSONArray jsonArray = new JSONArray();
		Map<String, JSONArray> objectMap = ResPowerNetworkUtils.formatNetwork(network);
		// List<JSONObject> networkList = null;
		// for (ResPowerNetwork bean : network) {
		// networkList = new ArrayList<JSONObject>();
		// JSONObject o1 = new JSONObject();
		// o1.put("name", bean.getBname());
		// JSONObject o2 = new JSONObject();
		// o2.put("name", bean.getEname());
		// networkList.add(o1);
		// networkList.add(o2);
		// jsonArray.add(networkList);
		// }
		object.put("network", objectMap);
		return object;
	}

	/**
	 * 获取电网信息
	 */
	public JSONObject getPowerNetWorkLow() {
		JSONObject object = new JSONObject();
		List<ResPowerNetwork> powers = mapper.getPowerInfo();
		JSONObject powerObject = new JSONObject();
		for (ResPowerNetwork bean : powers) {
			Float[] tude = new Float[2];
			tude[0] = bean.getBlongitude();
			tude[1] = bean.getBlatitude();
			powerObject.put(bean.getBname(), tude);
		}
		object.put("power", powerObject);
		List<ResPowerNetwork> network = mapper.getPowerNetWorkLow();
		JSONArray jsonArray = new JSONArray();
		Map<String, JSONArray> objectMap = ResPowerNetworkUtils.formatNetwork(network);
		// List<JSONObject> networkList = null;
		// for (ResPowerNetwork bean : network) {
		// networkList = new ArrayList<JSONObject>();
		// JSONObject o1 = new JSONObject();
		// o1.put("name", bean.getBname());
		// JSONObject o2 = new JSONObject();
		// o2.put("name", bean.getEname());
		// networkList.add(o1);
		// networkList.add(o2);
		// jsonArray.add(networkList);
		// }
		object.put("network", objectMap);
		return object;
	}

	public List<ResPowerNetwork> blurryPowerInfo(ResPowerNetwork bean) {

		return mapper.blurryPowerInfo(bean);
	}

	public List<ResPowerNetwork> blurryPowerNetworkInfo(ResPowerNetwork bean) {

		return mapper.blurryPowerNetworkInfo(bean);
	}

}
