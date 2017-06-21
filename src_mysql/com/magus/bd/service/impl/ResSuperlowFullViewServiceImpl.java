package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.ResSuperlowFullViewDao;
import com.magus.bd.entity.ResSuperlowFullView;
import com.magus.bd.entity.ResSuperlowFullViewInfo;
import com.magus.bd.service.ResSuperlowFullViewService;
import com.magus.bd.util.DateUtils;
import com.magus.bd.utils.ResSuperlowFullViewUtils;

@Service("superLowFullViewService")
public class ResSuperlowFullViewServiceImpl implements ResSuperlowFullViewService {
	private ResSuperlowFullViewDao mapper;

	public ResSuperlowFullViewDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResSuperlowFullViewDao mapper) {
		this.mapper = mapper;
	}

	public JSONObject getPowerUnitInfo(ResSuperlowFullView bean) {
		List<ResSuperlowFullView> beans = mapper.getPowerUnit(bean);
		List<ResSuperlowFullViewInfo> beansInfo = mapper.getFullViewInfo(null);

		JSONObject object = ResSuperlowFullViewUtils.formatArrayOperator(beans, beansInfo);
		Collections.sort(beansInfo, new Comparator<ResSuperlowFullViewInfo>() {
			public int compare(ResSuperlowFullViewInfo data1, ResSuperlowFullViewInfo data2) {
				Long time1 = DateUtils.dataFormatYm(data1.getTime());
				Long time2 = DateUtils.dataFormatYm(data2.getTime());
				return time1.compareTo(time2);
			}
		});
		object.put("event", beansInfo);
		/**
		 * 个人方案信息
		 */
		if (bean != null) {
			List<ResSuperlowFullView> programBeans = mapper.getProgramPowerUnit(bean);
			ResSuperlowFullView oo = mapper.getProgramFullViewInfo(bean);
			JSONObject programO = ResSuperlowFullViewUtils.formatArrayOperator(programBeans);
			programO.put("program", oo);
			object.put("programO", programO);
		}

		return object;
	}

	public JSONObject previewSuperlowFullView(JSONArray change, JSONArray close, JSONArray news, String pollCode, String cityInfo) {
		List<ResSuperlowFullView> beans = mapper.getPowerUnitEmissionInfo(pollCode);
		List<ResSuperlowFullView> opBeans = null;
		if (cityInfo != null && !"-1".equals(cityInfo)) {
			opBeans = new ArrayList<ResSuperlowFullView>();
			for (ResSuperlowFullView bean : beans) {
				if (bean.getCityId().equals(cityInfo)) {
					opBeans.add(bean);
				}
			}
		} else {
			opBeans = beans;
		}
		Map operatorBeans = ResSuperlowFullViewUtils.formatSuperlowFullViewOPerator(change, close, news, cityInfo);
		JSONObject object = ResSuperlowFullViewUtils.previewSuperlowFullView(opBeans, operatorBeans, pollCode, cityInfo);
		return object;
	}

	public JSONObject previewSuperlowFullViewDetail(JSONArray change, JSONArray close, JSONArray news, String pollCode, String cityInfo) {
		List<ResSuperlowFullView> beans = mapper.getPowerUnitEmissionInfo(pollCode);
		List<ResSuperlowFullView> opBeans = null;
		if (cityInfo != null && !"-1".equals(cityInfo)) {
			opBeans = new ArrayList<ResSuperlowFullView>();
			for (ResSuperlowFullView bean : beans) {
				if (bean.getCityId().equals(cityInfo)) {
					opBeans.add(bean);
				}
			}
		} else {
			opBeans = beans;
		}
		Map operatorBeans = ResSuperlowFullViewUtils.formatSuperlowFullViewOPerator(change, close, news, cityInfo);
		JSONObject object = ResSuperlowFullViewUtils.previewSuperlowFullViewDetail(opBeans, operatorBeans, pollCode);
		return object;
	}

	public JSONObject exportSuperlowFullView(ResSuperlowFullView bean, JSONArray change, JSONArray close, JSONArray news, String cityInfo) {
		List<ResSuperlowFullView> beans = mapper.getPowerUnitEmissionInfo(bean.getPolluteCode());
		List<ResSuperlowFullView> opBeans = null;
		if (cityInfo != null && !"-1".equals(cityInfo)) {
			opBeans = new ArrayList<ResSuperlowFullView>();
			for (ResSuperlowFullView o : beans) {
				if (o.getCityId().equals(cityInfo)) {
					opBeans.add(o);
				}
			}
		} else {
			opBeans = beans;
		}
		Map operatorBeans = ResSuperlowFullViewUtils.formatSuperlowFullViewOPerator(change, close, news, cityInfo);
		JSONObject object = ResSuperlowFullViewUtils.exportSuperlowFullView(bean, opBeans, operatorBeans);
		return object;
	}

	public int saveSuperlowFullView(ResSuperlowFullView bean, JSONArray change, JSONArray close, JSONArray news) {
		String nowTime = DateUtils.dataFormat(new Date());
		int flag = -1;
		if (bean.getProgramId() > 0) {
			bean.setUpdateDate(nowTime);
			flag = mapper.updateProgramFullView(bean);
			flag = mapper.deleteProgramFullViewDetail(bean);
		} else {
			bean.setCreateDate(nowTime);
			bean.setUpdateDate(nowTime);
			flag = mapper.insertResSuperlowFullView(bean);
		}

		if (flag > 0) {
			List<ResSuperlowFullView> operatorBeans = ResSuperlowFullViewUtils.formatSuperlowFullViewSave(change, close, news);
			for (ResSuperlowFullView o : operatorBeans) {
				o.setParentId(bean.getProgramId());
				o.setCreateDate(nowTime);
			}
			flag = mapper.insertResSuperlowFullViewDetail(operatorBeans);
		}
		return flag;
	}

	public int getCountByName(ResSuperlowFullView bean) {
		return mapper.getCountByName(bean);
	}

	public List<ResSuperlowFullView> queryProgramInfo(ResSuperlowFullView bean) {
		return mapper.queryProgramInfo(bean);
	}

	public int getCountPowerInfo(ResSuperlowFullView bean) {
		return mapper.getCountPowerInfo(bean);
	}

	public int insertPowerInfo(ResSuperlowFullView bean) {
		return mapper.insertPowerInfo(bean);
	}

	public int deleteProgramFullView(ResSuperlowFullView bean) {
		return mapper.deleteProgramFullView(bean);
	}

	public List<ResSuperlowFullView> queryPowerUnitInfo(ResSuperlowFullView bean) {
		return mapper.queryPowerUnitInfo(bean);
	}

	public int deletePowerUnitInfo(ResSuperlowFullView bean) {
		return mapper.deletePowerUnitInfo(bean);
	}

	public ResSuperlowFullView queryPowerUnitInfoById(ResSuperlowFullView bean) {
		return mapper.queryPowerUnitInfoById(bean);
	}

	public int updatePowerUnitInfo(ResSuperlowFullView bean) {
		return mapper.updatePowerUnitInfo(bean);
	}
}
