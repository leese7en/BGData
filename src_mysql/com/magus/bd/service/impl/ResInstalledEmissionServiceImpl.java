package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.ResInstalledEmissionDao;
import com.magus.bd.entity.ResInstalledEmission;
import com.magus.bd.service.ResInstalledEmissionService;
import com.magus.bd.utils.ResConst;

@Service("resInstallEmissionService")
public class ResInstalledEmissionServiceImpl implements ResInstalledEmissionService {
	private ResInstalledEmissionDao mapper;

	public ResInstalledEmissionDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ResInstalledEmissionDao mapper) {
		this.mapper = mapper;
	}

	public boolean addResInstalledEmission(ResInstalledEmission bean, int operatorType) {
		if (operatorType == ResConst.INSTALLED) {
			if (mapper.addResInstalled(bean) == 1) {
				return true;
			}
		} else if (operatorType == ResConst.EMISSION) {
			if (mapper.addResEmission(bean) == 1) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 删除取值范围区间
	 */
	public boolean deleteResInstalledEmission(int id, int operatorType) {
		if (operatorType == ResConst.INSTALLED) {
			if (mapper.deleteResInstalled(id) == 1) {
				return true;
			}
		} else if (operatorType == ResConst.EMISSION) {
			if (mapper.deleteResEmission(id) == 1) {
				return true;
			}
		}
		return false;
	}

	/**
	 *获取每个类别下面 取值范围个数
	 */
	public int getCount(String pollutantCode, int operatorType) {

		if (operatorType == ResConst.INSTALLED)
			return mapper.getCountInstalled();
		else {
			return mapper.getCountEmission(pollutantCode);
		}
	}

	/**
	 * 获取每个取值范围类别的所有区间
	 */
	public List<ResInstalledEmission> getResInstalledEmission(String pollutantCode, int operatorType) {
		if (operatorType == ResConst.INSTALLED) {
			return mapper.getResInstalled(pollutantCode);
		} else if (operatorType == ResConst.EMISSION) {
			return mapper.getResEmission(pollutantCode);
		}
		return null;
	}

	public boolean updateResInstalledEmission(ResInstalledEmission bean, int operatorType) {
		if (operatorType == ResConst.INSTALLED) {
			if (mapper.updateResInstalled(bean) == 1) {
				return true;
			}
		} else if (operatorType == ResConst.EMISSION) {
			if (mapper.updateResEmission(bean) == 1) {
				return true;
			}
		}

		return false;
	}

}
