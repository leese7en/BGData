package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.ProgramDao;
import com.magus.bd.dao.ResSuperLowDao;
import com.magus.bd.entity.Program;
import com.magus.bd.entity.ResSuperLow;
import com.magus.bd.service.ProgramService;
import com.magus.bd.utils.DateUtils;
import com.magus.bd.utils.ProgramUtils;
import com.magus.bd.utils.ResConst;
import com.magus.bd.vo.UserProgram;

@Service("programService")
public class ProgramServiceImpl implements ProgramService {
	private ProgramDao mapper;
	private ResSuperLowDao superLowMapper;

	public ProgramDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(ProgramDao mapper) {
		this.mapper = mapper;
	}

	public ResSuperLowDao getSuperLowMapper() {
		return superLowMapper;
	}

	@Autowired
	public void setSuperLowMapper(ResSuperLowDao superLowMapper) {
		this.superLowMapper = superLowMapper;
	}

	public List<Program> getProgram(Program bean) {
		return mapper.getProgram(bean);
	}

	public int getCountByProgramHeading(Program bean) {
		return mapper.getCountByProgramHeading(bean);
	}

	public int getCountByProgramBackHeading(Program bean) {
		return mapper.getCountByProgramBackHeading(bean);
	}

	public List<Program> getProgramBack(Program bean) {
		return mapper.getProgramBack(bean);
	}

	public JSONObject getProgramInfo(Program bean) {
		Program program = mapper.getProgramParent(bean);
		List<Program> programDetail = mapper.getProgramDetail(program);
		List<Integer> detailsIds = new ArrayList<Integer>();
		for (Program o : programDetail) {
			detailsIds.add(o.getProgramDetailId());
		}
		List<Program> programDetails = mapper.getProgramDetails(detailsIds);
		List<String> psCodes = new ArrayList<String>();
		for (Program o : programDetails) {
			psCodes.add(o.getPsCode());
		}
		ResSuperLow superLow = new ResSuperLow();
		superLow.setYear(ResConst.superYear);
		superLow.setPsCodes(psCodes);
		List<ResSuperLow> superLows = superLowMapper.getProgramInfo(superLow);
		JSONObject object = ProgramUtils.formatProgramInfo(program, programDetail, programDetails, superLows);
		return object;
	}

	public JSONObject getProgramBackInfo(Program bean) {
		Program program = mapper.getProgramBackParent(bean);
		List<Program> programDetail = mapper.getProgramBackDetail(program);
		List<Integer> detailsIds = new ArrayList<Integer>();
		for (Program o : programDetail) {
			detailsIds.add(o.getProgramDetailId());
		}
		List<Program> programDetails = mapper.getProgramBackDetails(detailsIds);
		List<String> psCodes = new ArrayList<String>();
		for (Program o : programDetails) {
			psCodes.add(o.getPsCode());
		}

		ResSuperLow superLow = new ResSuperLow();
		superLow.setYear(ResConst.superYear);
		superLow.setPsCodes(psCodes);
		List<ResSuperLow> superLows = superLowMapper.getProgramInfo(superLow);
		JSONObject object = ProgramUtils.formatProgramInfo(program, programDetail, programDetails, superLows);
		return object;
	}

	public int addProgram(UserProgram bean, String[] years) {
		int result = 0;
		Program program = new Program();
		program.setHeading(bean.getHeading());
		program.setBeginYear(bean.getBeginYear());
		program.setEndYear(bean.getEndYear());
		program.setUserId(bean.getUserId());
		program.setPoll(bean.getPollType());
		program.setDescription(bean.getDescription());
		program.setCreateDate(DateUtils.formatDate(new Date()));
		program.setUpdateDate(DateUtils.formatDate(new Date()));

		JSONObject yearCondition = (JSONObject) JSONObject.parse(bean.getYearCondition());
		List<Program> programDetail = new ArrayList<Program>();
		Program proDetail = null;
		List<Integer> closeUnits = null;
		List<Integer> changeUnits = null;
		Map<String, List<Integer>> newMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> closeMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> changeMap = new HashMap<String, List<Integer>>();
		for (String year : years) {
			proDetail = new Program();
			proDetail.setYear(year);
			if (yearCondition.getJSONObject(year) != null) {
				proDetail.setCityId(yearCondition.getJSONObject(year).getString("cityIds"));
				proDetail.setInstalleds(yearCondition.getJSONObject(year).getString("installeds"));
				proDetail.setEffectives(yearCondition.getJSONObject(year).getString("effectives"));
				programDetail.add(proDetail);
				/**
				 * 获取每年的
				 */
				newMap.put(year, ProgramUtils.formatJSONArrayToList(((JSONObject) JSONObject.parse(bean.getNewPowerUnit())).getJSONArray(year)));
				closeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getClosePowerUnit())).getJSONArray(year)));
				changeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getChangePowerUnit())).getJSONArray(year)));
			}
		}
		closeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getClosePowerUnit()), years);
		changeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getChangePowerUnit()), years);
		List<ResSuperLow> closeBeans = new ArrayList<ResSuperLow>();
		List<ResSuperLow> changeBeans = new ArrayList<ResSuperLow>();
		ResSuperLow ooo = new ResSuperLow();
		ooo.setYear(ResConst.superYear);
		// 判断需要整改或 关停的是否为 空
		if (!(closeUnits == null || closeUnits.size() == 0)) {
			ooo.setIds(closeUnits);
			closeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		if (!(changeUnits == null || changeUnits.size() == 0)) {
			ooo.setIds(changeUnits);
			changeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		List<ResSuperLow> newBeans = ProgramUtils.formatProgramDetails((JSONObject) JSONObject.parse(bean.getNewPowerUnit()), years);
		List<Program> proDetails = ProgramUtils.formatProgramAdd(changeBeans, closeBeans, newBeans, bean.getPollType());
		int flag = mapper.addProgram(program);
		if (flag > 0) {
			for (Program o : programDetail) {
				o.setProgramId(program.getProgramId());
				flag = mapper.addProgramDetail(o);
				if (flag > 0) {
					List<Integer> ids = ProgramUtils.formatMapArrayToArray(newMap.get(o.getYear()), changeMap.get(o.getYear()), closeMap.get(o.getYear()));
					for (Program oo : proDetails) {
						for (int id : ids) {
							if (oo.getProgramDetailsId() == id || (oo.getProgramDetailsId() == -1 && oo.getYear().equals(o.getYear()))) {
								oo.setProgramDetailId(o.getProgramDetailId());
							}
						}
					}
				}
			}
			flag = mapper.addProgramDetails(proDetails);
		}
		return result;
	}

	public int updateProgram(UserProgram bean, String[] years) {
		int result = 0;
		Program program = new Program();
		program.setProgramId(bean.getProgramId());
		program = mapper.getProgramParent(program);
		program.setUpdateDate(DateUtils.formatDate(new Date()));
		JSONObject yearCondition = (JSONObject) JSONObject.parse(bean.getYearCondition());
		List<Program> programDetail = new ArrayList<Program>();
		Program proDetail = null;
		List<Integer> closeUnits = null;
		List<Integer> changeUnits = null;
		Map<String, List<Integer>> newMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> closeMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> changeMap = new HashMap<String, List<Integer>>();
		for (String year : years) {
			proDetail = new Program();
			proDetail.setYear(year);
			proDetail.setCityId(yearCondition.getJSONObject(year).getString("cityIds"));
			proDetail.setInstalleds(yearCondition.getJSONObject(year).getString("installeds"));
			proDetail.setEffectives(yearCondition.getJSONObject(year).getString("effectives"));
			programDetail.add(proDetail);
			/**
			 * 获取每年的
			 */

			newMap.put(year, ProgramUtils.formatJSONArrayToList(((JSONObject) JSONObject.parse(bean.getNewPowerUnit())).getJSONArray(year)));
			closeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getClosePowerUnit())).getJSONArray(year)));
			changeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getChangePowerUnit())).getJSONArray(year)));
		}
		closeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getClosePowerUnit()), years);
		changeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getChangePowerUnit()), years);
		List<ResSuperLow> closeBeans = new ArrayList<ResSuperLow>();
		List<ResSuperLow> changeBeans = new ArrayList<ResSuperLow>();
		ResSuperLow ooo = new ResSuperLow();
		ooo.setYear(ResConst.superYear);
		// 判断需要整改或 关停的是否为 空
		if (!(closeUnits == null || closeUnits.size() == 0)) {
			ooo.setIds(closeUnits);
			closeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		if (!(changeUnits == null || changeUnits.size() == 0)) {
			ooo.setIds(changeUnits);
			changeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		List<ResSuperLow> newBeans = ProgramUtils.formatProgramDetails((JSONObject) JSONObject.parse(bean.getNewPowerUnit()), years);
		List<Program> proDetails = ProgramUtils.formatProgramAdd(changeBeans, closeBeans, newBeans, bean.getPollType());
		// 获取对应方案 下地二张表的 信息
		List<Program> programDetailList = mapper.getProgramDetail(program);
		// 删除 原先 第二张表的明细信息
		int flag = mapper.deleteProgramDetail(program);
		List<Integer> programDetailId = new ArrayList<Integer>();
		for (Program oo : programDetailList) {
			programDetailId.add(oo.getProgramDetailId());
		}
		// 删除方案的 第三张 明细信息
		flag = mapper.deleteProgramDetails(programDetailId);
		for (Program o : programDetail) {
			o.setProgramId(program.getProgramId());
			// 添加 表信息
			flag = mapper.addProgramDetail(o);
			boolean isUpdate = true;
			// 向数据库中添加 数据
			List<Program> programDetails = new ArrayList<Program>();
			if (flag > 0) {
				List<Integer> ids = ProgramUtils.formatMapArrayToArray(newMap.get(o.getYear()), changeMap.get(o.getYear()), closeMap.get(o.getYear()));
				if (ids == null || ids.size() == 0) {
					isUpdate = false;
					break;
				}
				for (Program oo : proDetails) {
					for (int id : ids) {
						if (oo.getProgramDetailsId() == id || (o.getYear().equals(oo.getYear()) && oo.getProgramDetailsId() == -1)) {
							oo.setProgramDetailId(o.getProgramDetailId());
							programDetails.add(oo);
							break;
						}
					}
				}
			}
			// 添加方案第三张表信息
			if (isUpdate) {
				flag = mapper.addProgramDetails(programDetails);
			}
		}

		return result;
	}

	public JSONObject previewProgram(JSONObject changePowerUnit, JSONObject closePowerUnit, JSONObject newPowerUnit, String pollType, String[] years) {
		List<Integer> closeUnits = null;
		List<Integer> changeUnits = null;
		// 遍历 每年的数据
		// 获取每年需要 新建 、整改的、关停的电厂 机组明细

		closeUnits = ProgramUtils.formatJSONArrayToArray(closePowerUnit, years);
		changeUnits = ProgramUtils.formatJSONArrayToArray(changePowerUnit, years);
		List<ResSuperLow> closeBeans = new ArrayList<ResSuperLow>();
		List<ResSuperLow> changeBeans = new ArrayList<ResSuperLow>();

		ResSuperLow ooo = new ResSuperLow();
		ooo.setYear(ResConst.superYear);
		// 判断需要整改或 关停的是否为 空
		if (!(closeUnits == null || closeUnits.size() == 0)) {
			ooo.setIds(closeUnits);
			closeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		if (!(changeUnits == null || changeUnits.size() == 0)) {
			ooo.setIds(changeUnits);
			changeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		Map changeValues = ProgramUtils.formatProgramOperator(changeBeans, changePowerUnit, years, pollType, ResConst.CHANGE);
		Map closeValues = ProgramUtils.formatProgramOperator(closeBeans, closePowerUnit, years, pollType, ResConst.CLOSE);
		Map newValues = ProgramUtils.formatProgramOperatorNew(newPowerUnit, years, pollType);
		ResSuperLow unitCount = new ResSuperLow();
		unitCount.setYear(ResConst.superYear);
		ResSuperLow powerInfo = superLowMapper.getPowerYearInfo(unitCount);
		JSONObject resultO = ProgramUtils.formatProgram(changeValues, closeValues, newValues, years, powerInfo, pollType);
		return resultO;
	}

	public String exportProgram(UserProgram bean, String[] years) {
		String fileName;
		Program program = new Program();
		program.setBeginYear(bean.getBeginYear());
		program.setEndYear(bean.getEndYear());
		program.setUserId(bean.getUserId());
		program.setPoll(bean.getPollType());
		program.setCreateDate(DateUtils.formatDate(new Date()));
		program.setUpdateDate(DateUtils.formatDate(new Date()));
		JSONObject yearCondition = (JSONObject) JSONObject.parse(bean.getYearCondition());
		List<Program> programDetail = new ArrayList<Program>();
		Program proDetail = null;
		List<Integer> closeUnits = null;
		List<Integer> changeUnits = null;
		Map<String, List<Integer>> newMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> closeMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> changeMap = new HashMap<String, List<Integer>>();
		for (String year : years) {
			proDetail = new Program();
			proDetail.setYear(year);
			proDetail.setCityId(yearCondition.getJSONObject(year).getString("cityIds"));
			proDetail.setInstalleds(yearCondition.getJSONObject(year).getString("installeds"));
			proDetail.setEffectives(yearCondition.getJSONObject(year).getString("effectives"));
			programDetail.add(proDetail);
			/**
			 * 获取每年的
			 */
			newMap.put(year, ProgramUtils.formatJSONArrayToArrayNew(((JSONObject) JSONObject.parse(bean.getNewPowerUnit())).getJSONArray(year)));
			closeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getClosePowerUnit())).getJSONArray(year)));
			changeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getChangePowerUnit())).getJSONArray(year)));
		}
		closeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getClosePowerUnit()), years);
		changeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getChangePowerUnit()), years);
		List<ResSuperLow> closeBeans = new ArrayList<ResSuperLow>();
		List<ResSuperLow> changeBeans = new ArrayList<ResSuperLow>();
		ResSuperLow ooo = new ResSuperLow();
		ooo.setYear(ResConst.superYear);
		// 判断需要整改或 关停的是否为 空
		if (!(closeUnits == null || closeUnits.size() == 0)) {
			ooo.setIds(closeUnits);
			closeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		if (!(changeUnits == null || changeUnits.size() == 0)) {
			ooo.setIds(changeUnits);
			changeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		List<ResSuperLow> newBeans = ProgramUtils.formatProgramDetails((JSONObject) JSONObject.parse(bean.getNewPowerUnit()), years);
		List<Program> proDetails = ProgramUtils.formatProgramAdd(changeBeans, closeBeans, newBeans, bean.getPollType());
		for (Program o : programDetail) {
			List<Integer> ids = ProgramUtils.formatMapArrayToArray(newMap.get(o.getYear()), changeMap.get(o.getYear()), closeMap.get(o.getYear()));
			for (Program oo : proDetails) {
				for (int id : ids) {
					if (oo.getProgramDetailsId() == id) {
						oo.setYear(o.getYear());
					}
				}
			}
		}
		/**
		 * 数据预览效果
		 */
		Map changeValues = ProgramUtils.formatProgramOperator(changeBeans, (JSONObject) JSONObject.parse(bean.getChangePowerUnit()), years, bean.getPollType(),
				ResConst.CHANGE);
		Map closeValues = ProgramUtils.formatProgramOperator(closeBeans, (JSONObject) JSONObject.parse(bean.getClosePowerUnit()), years, bean.getPollType(),
				ResConst.CLOSE);
		Map newValues = ProgramUtils.formatProgramOperatorNew((JSONObject) JSONObject.parse(bean.getNewPowerUnit()), years, bean.getPollType());
		ResSuperLow unitCount = new ResSuperLow();
		unitCount.setYear(ResConst.superYear);
		ResSuperLow powerInfo = superLowMapper.getPowerYearInfo(unitCount);
		JSONObject resultO = ProgramUtils.formatProgram(changeValues, closeValues, newValues, years, powerInfo, bean.getPollType());
		fileName = ProgramUtils.exportProgram(program, programDetail, proDetails, bean.getPath(), resultO);
		return fileName;
	}

	public JSONObject previewProgramBack(JSONObject changePowerUnit, JSONObject closePowerUnit, String pollType, String[] years) {
		List<Integer> closeUnits = null;
		List<Integer> changeUnits = null;
		// 遍历 每年的数据
		// 获取每年需要 新建 、整改的、关停的电厂 机组明细

		closeUnits = ProgramUtils.formatJSONArrayToArray(closePowerUnit, years);
		changeUnits = ProgramUtils.formatJSONArrayToArray(changePowerUnit, years);
		List<ResSuperLow> closeBeans = new ArrayList<ResSuperLow>();
		List<ResSuperLow> changeBeans = new ArrayList<ResSuperLow>();
		ResSuperLow ooo = new ResSuperLow();
		ooo.setYear(ResConst.superYear);
		// 判断需要整改或 关停的是否为 空
		if (!(closeUnits == null || closeUnits.size() == 0)) {
			ooo.setIds(closeUnits);
			closeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		if (!(changeUnits == null || changeUnits.size() == 0)) {
			ooo.setIds(changeUnits);
			changeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		Map changeValues = ProgramUtils.formatProgramOperator(changeBeans, changePowerUnit, years, pollType, ResConst.CHANGE);
		Map closeValues = ProgramUtils.formatProgramOperator(closeBeans, closePowerUnit, years, pollType, ResConst.CLOSE);
		ResSuperLow unitCount = new ResSuperLow();
		unitCount.setYear(ResConst.superYear);
		ResSuperLow powerInfo = superLowMapper.getPowerYearInfo(unitCount);
		JSONObject resutlO = ProgramUtils.formatProgram(changeValues, closeValues, null, years, powerInfo, pollType);
		return resutlO;
	}

	public int addProgramBack(UserProgram bean, String[] years) {
		int result = 0;
		Program program = new Program();
		program.setHeading(bean.getHeading());
		program.setBeginYear(bean.getBeginYear());
		program.setEndYear(bean.getEndYear());
		program.setUserId(bean.getUserId());
		program.setPoll(bean.getPollType());
		program.setDescription(bean.getDescription());
		program.setCreateDate(DateUtils.formatDate(new Date()));
		program.setUpdateDate(DateUtils.formatDate(new Date()));

		JSONObject yearCondition = (JSONObject) JSONObject.parse(bean.getYearCondition());
		List<Program> programDetail = new ArrayList<Program>();
		Program proDetail = null;
		List<Integer> closeUnits = null;
		List<Integer> changeUnits = null;
		Map<String, List<Integer>> closeMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> changeMap = new HashMap<String, List<Integer>>();
		for (String year : years) {
			proDetail = new Program();
			proDetail.setYear(year);
			proDetail.setCityId(yearCondition.getJSONObject(year).getString("cityIds"));
			proDetail.setInstalleds(yearCondition.getJSONObject(year).getString("installeds"));
			proDetail.setEffectives(yearCondition.getJSONObject(year).getString("effectives"));
			programDetail.add(proDetail);
			/**
			 * 获取每年的
			 */
			closeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getClosePowerUnit())).getJSONArray(year)));
			changeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getChangePowerUnit())).getJSONArray(year)));
		}
		closeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getClosePowerUnit()), years);
		changeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getChangePowerUnit()), years);
		List<ResSuperLow> closeBeans = new ArrayList<ResSuperLow>();
		List<ResSuperLow> changeBeans = new ArrayList<ResSuperLow>();
		ResSuperLow ooo = new ResSuperLow();
		ooo.setYear(ResConst.superYear);
		// 判断需要整改或 关停的是否为 空
		if (!(closeUnits == null || closeUnits.size() == 0)) {
			ooo.setIds(closeUnits);
			closeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		if (!(changeUnits == null || changeUnits.size() == 0)) {
			ooo.setIds(changeUnits);
			changeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		List<Program> proDetails = ProgramUtils.formatProgramAdd(changeBeans, closeBeans, null, bean.getPollType());
		int flag = mapper.addProgramBack(program);
		if (flag > 0) {
			for (Program o : programDetail) {
				o.setProgramId(program.getProgramId());
				flag = mapper.addProgramBackDetail(o);
				if (flag > 0) {
					List<Integer> ids = ProgramUtils.formatMapArrayToArray(null, changeMap.get(o.getYear()), closeMap.get(o.getYear()));
					for (Program oo : proDetails) {
						for (int id : ids) {
							if (oo.getProgramDetailsId() == id) {
								oo.setProgramDetailId(o.getProgramDetailId());
							}
						}
					}
				}
			}
			flag = mapper.addProgramBackDetails(proDetails);
		}
		return result;
	}

	public int updateProgramBack(UserProgram bean, String[] years) {
		int result = 0;
		Program program = new Program();
		program.setProgramId(bean.getProgramId());
		program = mapper.getProgramBackParent(program);
		program.setUpdateDate(DateUtils.formatDate(new Date()));
		JSONObject yearCondition = (JSONObject) JSONObject.parse(bean.getYearCondition());
		List<Program> programDetail = new ArrayList<Program>();
		Program proDetail = null;
		List<Integer> closeUnits = null;
		List<Integer> changeUnits = null;
		Map<String, List<Integer>> closeMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> changeMap = new HashMap<String, List<Integer>>();
		for (String year : years) {
			proDetail = new Program();
			proDetail.setYear(year);
			proDetail.setCityId(yearCondition.getJSONObject(year).getString("cityIds"));
			proDetail.setInstalleds(yearCondition.getJSONObject(year).getString("installeds"));
			proDetail.setEffectives(yearCondition.getJSONObject(year).getString("effectives"));
			programDetail.add(proDetail);
			/**
			 * 获取每年的
			 */
			closeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getClosePowerUnit())).getJSONArray(year)));
			changeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getChangePowerUnit())).getJSONArray(year)));
		}
		closeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getClosePowerUnit()), years);
		changeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getChangePowerUnit()), years);
		List<ResSuperLow> closeBeans = new ArrayList<ResSuperLow>();
		List<ResSuperLow> changeBeans = new ArrayList<ResSuperLow>();
		ResSuperLow ooo = new ResSuperLow();
		ooo.setYear(ResConst.superYear);
		// 判断需要整改或 关停的是否为 空
		if (!(closeUnits == null || closeUnits.size() == 0)) {
			ooo.setIds(closeUnits);
			closeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		if (!(changeUnits == null || changeUnits.size() == 0)) {
			ooo.setIds(changeUnits);
			changeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		List<Program> proDetails = ProgramUtils.formatProgramAdd(changeBeans, closeBeans, null, bean.getPollType());
		// 获取对应方案 下地二张表的 信息
		List<Program> programDetailList = mapper.getProgramBackDetail(program);
		// 删除 原先 第二张表的明细信息
		int flag = mapper.deleteProgramBackDetail(program);
		List<Integer> programDetailId = new ArrayList<Integer>();
		for (Program oo : programDetailList) {
			programDetailId.add(oo.getProgramDetailId());
		}
		// 删除方案的 第三张 明细信息
		flag = mapper.deleteProgramBackDetails(programDetailId);
		for (Program o : programDetail) {
			o.setProgramId(program.getProgramId());
			// 添加 表信息
			flag = mapper.addProgramBackDetail(o);
			boolean isUpdate = true;
			// 向数据库中添加 数据
			List<Program> programDetails = new ArrayList<Program>();
			if (flag > 0) {
				List<Integer> ids = ProgramUtils.formatMapArrayToArray(null, changeMap.get(o.getYear()), closeMap.get(o.getYear()));
				if (ids == null || ids.size() == 0) {
					isUpdate = false;
					break;
				}
				for (Program oo : proDetails) {
					for (int id : ids) {
						if (oo.getProgramDetailsId() == id) {
							oo.setProgramDetailId(o.getProgramDetailId());
							programDetails.add(oo);
						}
					}
				}
			}
			// 添加方案第三张表信息
			if (isUpdate) {
				flag = mapper.addProgramBackDetails(programDetails);
			}
		}
		return result;
	}

	public String exportProgramBack(UserProgram bean, String[] years) {
		String fileName;
		Program program = new Program();
		program.setBeginYear(bean.getBeginYear());
		program.setEndYear(bean.getEndYear());
		program.setUserId(bean.getUserId());
		program.setPoll(bean.getPollType());
		program.setCreateDate(DateUtils.formatDate(new Date()));
		program.setUpdateDate(DateUtils.formatDate(new Date()));

		JSONObject yearCondition = (JSONObject) JSONObject.parse(bean.getYearCondition());
		List<Program> programDetail = new ArrayList<Program>();
		Program proDetail = null;
		List<Integer> closeUnits = null;
		List<Integer> changeUnits = null;
		Map<String, List<Integer>> closeMap = new HashMap<String, List<Integer>>();
		Map<String, List<Integer>> changeMap = new HashMap<String, List<Integer>>();
		for (String year : years) {
			proDetail = new Program();
			proDetail.setYear(year);
			proDetail.setCityId(yearCondition.getJSONObject(year).getString("cityIds"));
			proDetail.setInstalleds(yearCondition.getJSONObject(year).getString("installeds"));
			proDetail.setEffectives(yearCondition.getJSONObject(year).getString("effectives"));
			programDetail.add(proDetail);
			/**
			 * 获取每年的
			 */
			closeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getClosePowerUnit())).getJSONArray(year)));
			changeMap.put(year, ProgramUtils.formatJSONArrayToArray(((JSONObject) JSONObject.parse(bean.getChangePowerUnit())).getJSONArray(year)));
		}
		closeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getClosePowerUnit()), years);
		changeUnits = ProgramUtils.formatJSONArrayToArray((JSONObject) JSONObject.parse(bean.getChangePowerUnit()), years);
		List<ResSuperLow> changeBeans = new ArrayList();
		List<ResSuperLow> closeBeans = new ArrayList();
		ResSuperLow ooo = new ResSuperLow();
		ooo.setYear(ResConst.superYear);
		// 判断需要整改或 关停的是否为 空
		if (!(closeUnits == null || closeUnits.size() == 0)) {
			ooo.setIds(closeUnits);
			closeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		if (!(changeUnits == null || changeUnits.size() == 0)) {
			ooo.setIds(changeUnits);
			changeBeans = superLowMapper.getPowerUnitByIds(ooo);
		}
		List<Program> proDetails = ProgramUtils.formatProgramBackAdd(changeBeans, closeBeans, bean.getPollType());
		for (String year : years) {
			List<Integer> closeIds = closeMap.get(year);
			List<Integer> changeIds = changeMap.get(year);
			for (Program oo : proDetails) {
				if (closeIds.contains(oo.getProgramDetailsId()) || changeIds.contains(oo.getProgramDetailsId())) {
					oo.setYear(year);
					continue;
				}
			}
		}
		/**
		 * 数据预览效果
		 */
		Map changeValues = ProgramUtils.formatProgramOperator(changeBeans, (JSONObject) JSONObject.parse(bean.getChangePowerUnit()), years, bean.getPollType(),
				ResConst.CHANGE);
		Map closeValues = ProgramUtils.formatProgramOperator(closeBeans, (JSONObject) JSONObject.parse(bean.getClosePowerUnit()), years, bean.getPollType(),
				ResConst.CLOSE);
		ResSuperLow unitCount = new ResSuperLow();
		unitCount.setYear(ResConst.superYear);
		ResSuperLow powerInfo = superLowMapper.getPowerYearInfo(unitCount);
		JSONObject resutlO = ProgramUtils.formatProgram(changeValues, closeValues, null, years, powerInfo, bean.getPollType());
		fileName = ProgramUtils.exportProgramBack(program, programDetail, proDetails, bean.getPath(), resutlO);
		return fileName;
	}
}
