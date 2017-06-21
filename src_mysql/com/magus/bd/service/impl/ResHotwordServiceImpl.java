package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.ResHotwordDao;
import com.magus.bd.entity.ResHotword;
import com.magus.bd.service.ResHotwordService;
import com.magus.bd.utils.HotwordUtils;

@Service("resHotwordService")
public class ResHotwordServiceImpl implements ResHotwordService {
	private ResHotwordDao mapper;

	public ResHotwordDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResHotwordDao mapper) {
		this.mapper = mapper;
	}

	public List<ResHotword> blurryHotword(ResHotword bean) {
		return mapper.blurryHotword(bean);
	}

	public int blurryHotwordCount(ResHotword bean) {
		return mapper.blurryHotwordCount(bean);
	}

	public List<ResHotword> blurryHotPhrase(ResHotword bean) {
		return mapper.blurryHotPhrase(bean);
	}

	public int insertHotword(ResHotword bean) {
		return mapper.insertHotword(bean);
	}

	public int insertHotwordType(ResHotword bean) {
		return mapper.insertHotwordType(bean);
	}

	public int insertHotPhrase(ResHotword bean) {
		return mapper.insertHotPhrase(bean);
	}

	public List<ResHotword> getHotwordType() {
		return mapper.getHotwordType();
	}

	public List<ResHotword> getReport() {
		return mapper.getReport();
	}

	public int insertHotwordEnterprise(ResHotword bean) {
		return mapper.insertHotwordEnterprise(bean);
	}

	public List<ResHotword> queryHotwordByType(ResHotword bean) {
		return mapper.queryHotwordByType(bean);
	}

	public List<ResHotword> getHotwords(ResHotword bean) {

		return mapper.getHotwords(bean);
	}

	public JSONObject getHotwordFrequencyYear(ResHotword bean) {
		List<ResHotword> beans = mapper.getHotwordFrequencyYear(bean);
		if (beans == null || beans.size() < 1) {
			return null;
		}
		List<String> hotwordIds = new ArrayList<String>();
		for (ResHotword o : beans) {
			hotwordIds.add(o.getId());
		}
		bean.setHotwordIds(hotwordIds);
		List<ResHotword> monthBeans = mapper.getHotwordFrequencyMonth(bean);
		if (monthBeans == null || monthBeans.size() < 1) {
			return null;
		}
		JSONObject object = HotwordUtils.formatHotwordFreQuency(beans, monthBeans);
		return object;
	}

	public JSONObject countHotwordTimes(ResHotword bean) {
		List<ResHotword> beans = mapper.countHotwordTimes(bean);
		JSONObject object = HotwordUtils.formatHotwordCloud(beans);
		return object;
	}

	public JSONObject countHotwordByType(ResHotword bean) {
		List<ResHotword> beansParent = mapper.countHotwordByType(bean);
		List<ResHotword> beansChild = mapper.countHotwordByTypeChild(bean);
		JSONObject object = HotwordUtils.formatHotwordByType(beansParent, beansChild);
		return object;
	}

	public JSONObject countHotwordCityInfoByType(ResHotword bean) {
		List<ResHotword> beans = null;
		List<ResHotword> beansPs = null;
		if ("0".equals(bean.getFlag())) {
			beans = mapper.countHotwordCityInfoByType(bean);
			if (beans != null && beans.size() > 0) {
				bean.setCityId(beans.get(0).getCityId());
				beansPs = mapper.countHotwordPsCodeInfoByType(bean);
			}
		} else {
			beans = mapper.countHotwordCityInfoByTypeDetail(bean);
			if (beans != null && beans.size() > 0) {
				bean.setCityId(beans.get(0).getCityId());
				beansPs = mapper.countHotwordPsCodeInfoByTypeDetail(bean);
			}
		}
		 List<ResHotword> beansDetail = mapper.countHotwordByBigType(bean);
		JSONObject object = HotwordUtils.formatHotwordCityInfoByType(beansDetail,beans, beansPs);
		return object;
	}

	public JSONObject countHotwordCityInfoByTypeDetail(ResHotword bean) {
		List<ResHotword> beans = null;
		List<ResHotword> beansDetail = null;
		if ("0".equals(bean.getFlag())) {
			beans = mapper.countHotwordCityInfoByType(bean);
			beansDetail = mapper.countHotwordByBigType(bean);
		} else {
			beans = mapper.countHotwordCityInfoByTypeDetail(bean);
		}
		JSONObject object = HotwordUtils.formatHotwordCityInfoByTypeDetail(beans, beansDetail);
		return object;
	}

	public JSONObject countHotwordPSCodeInfoByTypeDetail(ResHotword bean) {
		List<ResHotword> beansPs = null;
		if ("0".equals(bean.getFlag())) {
			beansPs = mapper.countHotwordPsCodeInfoByType(bean);
		} else {
			beansPs = mapper.countHotwordPsCodeInfoByTypeDetail(bean);
		}
		JSONObject object = HotwordUtils.formatHotwordPSCodeInfoByTypeDetail(beansPs);
		return object;
	}

	public JSONObject countHotwordTimesByWords(ResHotword bean) {
		List<ResHotword> beans = mapper.countHotwordTimesByWords(bean);
		JSONObject object = HotwordUtils.formatHotwordCloud(beans);
		return object;
	}

	public List<ResHotword> getAllHotWord() {
		return null;
	}

	public ResHotword getHotwordTypeById(String id) {

		return mapper.getHotwordTypeById(id);
	}

}
