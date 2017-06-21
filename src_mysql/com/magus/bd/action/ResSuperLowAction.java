package com.magus.bd.action;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Program;
import com.magus.bd.entity.ResSuperLow;
import com.magus.bd.entity.SysUser;
import com.magus.bd.service.ProgramService;
import com.magus.bd.service.ResSuperLowService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;
import com.magus.bd.utils.ResConst;
import com.magus.bd.utils.ResSuperLowUtils;
import com.magus.bd.vo.Parameter;
import com.magus.bd.vo.UserProgram;

@Controller
public class ResSuperLowAction extends BaseAction {
	private ResSuperLowService service;
	private ProgramService programService;

	Message message = null;

	public ResSuperLowService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResSuperLowService service) {
		this.service = service;
	}

	public ProgramService getProgramService() {
		return programService;
	}

	@Autowired
	public void setProgramService(ProgramService programService) {
		this.programService = programService;
	}

	/**
	 * 超低排放 预测
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getSuperLow")
	public void getSuperLow(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] installed = request.getParameterValues("installed[]");
			String[] effective = request.getParameterValues("effective[]");
			String[] cityId = request.getParameterValues("cityId[]");
			String poll = request.getParameter("poll");
			List<Parameter> para = ResSuperLowUtils.formatEmission(effective);
			float pollmMax = ResSuperLowUtils.formatEmissionMax(effective);
			ResSuperLow bean = new ResSuperLow();
			bean.setPoll(poll);
			bean.setYear(ResConst.superYear);
			bean.setInstalled(ResSuperLowUtils.formatEmission(installed));
			bean.setInstalledMax(ResSuperLowUtils.formatEmissionMax(installed));
			if ("SO2".equals(poll)) {
				bean.setSo2Effective(para);
				bean.setSo2EffectiveMax(pollmMax);
			} else if ("NOx".equals(poll)) {
				bean.setNoxEffective(para);
				bean.setNoxEffectiveMax(pollmMax);
			} else {
				bean.setDustEffective(para);
				bean.setDustEffectiveMax(pollmMax);
			}
			bean.setCityIds(Arrays.asList(cityId));
			List<ResSuperLow> beans = service.getPowerUnit(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 预测
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getProgram")
	public void getProgram(HttpServletRequest request, HttpServletResponse response) {
		try {
			HttpSession session = request.getSession();
			SysUser user = (SysUser) session.getAttribute("user");
			Program bean = new Program();
			bean.setUserId(12);
			List<Program> beans = programService.getProgram(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 预测
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getProgramInfo")
	public void getProgramInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			String programId = request.getParameter("programId");
			Program bean = new Program();
			bean.setProgramId(Integer.parseInt(programId));
			JSONObject object = programService.getProgramInfo(bean);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 预测
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getProgramBack")
	public void getProgramBack(HttpServletRequest request, HttpServletResponse response) {
		try {
			HttpSession session = request.getSession();
			SysUser user = (SysUser) session.getAttribute("user");
			Program bean = new Program();
			bean.setUserId(12);
			List<Program> beans = programService.getProgramBack(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 预测
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getProgramBackInfo")
	public void getProgramBackInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			String programId = request.getParameter("programId");
			Program bean = new Program();
			bean.setProgramId(Integer.parseInt(programId));
			JSONObject object = programService.getProgramBackInfo(bean);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 预览方案
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/previewProgram")
	public void previewProgram(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] years = request.getParameterValues("years[]");
			String changPowerUnit = request.getParameter("changePowerUnit");
			String closePowerUnit = request.getParameter("closePowerUnit");
			String newPowerUnit = request.getParameter("newPowerUnit");
			String pollType = request.getParameter("pollType");
			JSONObject change = (JSONObject) new JSONObject().parse(changPowerUnit);
			JSONObject close = (JSONObject) new JSONObject().parse(closePowerUnit);
			JSONObject news = (JSONObject) new JSONObject().parse(newPowerUnit);
			JSONObject o = programService.previewProgram(change, close, news, pollType, years);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 保存方案
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/saveProgram")
	public void saveProgram(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] years = request.getParameterValues("years[]");
			HttpSession session = request.getSession();
			SysUser user = (SysUser) session.getAttribute("user");
			ParseParameter pp = ParseParameter.getParser();
			String heading = pp.parseString("heading", request);
			heading = URLDecoder.decode(heading, "UTF-8");
			String description = pp.parseString("description", request);
			description = URLDecoder.decode(description, "UTF-8");
			String beginYear = request.getParameter("beginYear");
			String endYear = request.getParameter("endYear");
			String pollType = request.getParameter("pollType");
			String yearCondition = request.getParameter("yearCondition");
			String changePowerUnit = request.getParameter("changePowerUnit");
			String closePowerUnit = request.getParameter("closePowerUnit");
			String newPowerUnit = pp.parseString("newPowerUnit", request);
			newPowerUnit = URLDecoder.decode(newPowerUnit, "UTF-8");
			// 判断当前 方案名称是否已经存在
			Program program = new Program();
			program.setUserId(12);
			program.setHeading(heading);
			message = new Message();
			int result = programService.getCountByProgramHeading(program);
			if (result > 0) {
				message.setFlag(-1);
				message.setMessage("方案名称已经存在");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			UserProgram bean = new UserProgram();
			bean.setUserId(12);
			bean.setHeading(heading);
			bean.setDescription(description);
			bean.setBeginYear(beginYear);
			bean.setEndYear(endYear);
			bean.setPollType(pollType);
			bean.setChangePowerUnit(changePowerUnit);
			bean.setClosePowerUnit(closePowerUnit);
			bean.setNewPowerUnit(newPowerUnit);
			bean.setYearCondition(yearCondition);
			int flag = programService.addProgram(bean, years);
			message = new Message();
			message.setFlag(flag);
			if (flag < 0) {
				message.setMessage("保存方案出错");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 保存方案
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/updateProgram")
	public void updateProgram(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String[] years = request.getParameterValues("years[]");
			String yearCondition = request.getParameter("yearCondition");
			String changePowerUnit = request.getParameter("changePowerUnit");
			String closePowerUnit = request.getParameter("closePowerUnit");

			String newPowerUnit = pp.parseString("newPowerUnit", request);
			newPowerUnit = URLDecoder.decode(newPowerUnit, "UTF-8");
			String programId = request.getParameter("programId");
			String pollType = request.getParameter("pollType");
			UserProgram bean = new UserProgram();
			bean.setProgramId(Integer.parseInt(programId));
			bean.setChangePowerUnit(changePowerUnit);
			bean.setClosePowerUnit(closePowerUnit);
			bean.setNewPowerUnit(newPowerUnit);
			bean.setYearCondition(yearCondition);
			bean.setPollType(pollType);
			int flag = programService.updateProgram(bean, years);
			message = new Message();
			message.setFlag(flag);
			if (flag < 0) {
				message.setMessage("保存方案失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 保存方案
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/exportProgram")
	public void exportProgram(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] years = request.getParameterValues("years[]");
			HttpSession session = request.getSession();
			SysUser user = (SysUser) session.getAttribute("user");
			String path = request.getRealPath("/");
			String beginYear = request.getParameter("beginYear");
			String endYear = request.getParameter("endYear");
			String pollType = request.getParameter("pollType");
			String yearCondition = request.getParameter("yearCondition");
			String changePowerUnit = request.getParameter("changePowerUnit");
			String closePowerUnit = request.getParameter("closePowerUnit");
			ParseParameter pp = ParseParameter.getParser();
			String newPowerUnit = pp.parseString("newPowerUnit", request);
			newPowerUnit = URLDecoder.decode(newPowerUnit, "UTF-8");
			UserProgram bean = new UserProgram();
			bean.setUserId(12);
			bean.setBeginYear(beginYear);
			bean.setEndYear(endYear);
			bean.setPollType(pollType);
			bean.setChangePowerUnit(changePowerUnit);
			bean.setClosePowerUnit(closePowerUnit);
			bean.setNewPowerUnit(newPowerUnit);
			bean.setYearCondition(yearCondition);
			bean.setPath(path);
			String fileName = programService.exportProgram(bean, years);
			message = new Message();
			message.setFlag(0);
			message.setMessage(fileName);
			if (fileName == null || "".equals(fileName)) {
				message.setFlag(-1);
				message.setMessage("导出方案出错");
			}
			response.getWriter().print(JSONArray.toJSON(message));
			// 获得请求文件名
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 预测
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getSuperLowBack")
	public void getSuperLowBack(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] installed = request.getParameterValues("installed[]");
			String[] effective = request.getParameterValues("effective[]");
			String[] cityId = request.getParameterValues("cityId[]");
			String poll = request.getParameter("poll");
			String aimsMin = request.getParameter("aimsMin");
			String aimsMax = request.getParameter("aimsMax");
			List<Parameter> para = ResSuperLowUtils.formatEmission(effective);
			float pollmMax = ResSuperLowUtils.formatEmissionMax(effective);
			ResSuperLow bean = new ResSuperLow();
			bean.setYear(ResConst.superYear);
			bean.setInstalled(ResSuperLowUtils.formatEmission(installed));
			bean.setInstalledMax(ResSuperLowUtils.formatEmissionMax(installed));
			if ("SO2".equals(poll)) {
				bean.setSo2Effective(para);
				bean.setSo2EffectiveMax(pollmMax);
			} else if ("NOx".equals(poll)) {
				bean.setNoxEffective(para);
				bean.setNoxEffectiveMax(pollmMax);
			} else {
				bean.setDustEffective(para);
				bean.setDustEffectiveMax(pollmMax);
			}
			bean.setCityIds(Arrays.asList(cityId));
			bean.setPoll(poll);
			List<ResSuperLow> beans = service.getPowerUnitBreak(bean, Float.parseFloat(aimsMin), Float.parseFloat(aimsMax));
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 预览方案
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/previewProgramBack")
	public void previewProgramBreak(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] years = request.getParameterValues("years[]");
			String changPowerUnit = request.getParameter("changePowerUnit");
			String closePowerUnit = request.getParameter("closePowerUnit");
			String pollType = request.getParameter("pollType");
			JSONObject change = (JSONObject) new JSONObject().parse(changPowerUnit);
			JSONObject close = (JSONObject) new JSONObject().parse(closePowerUnit);
			JSONObject o = programService.previewProgramBack(change, close, pollType, years);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 保存方案
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/saveProgramBack")
	public void saveProgramBack(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] years = request.getParameterValues("years[]");
			HttpSession session = request.getSession();
			SysUser user = (SysUser) session.getAttribute("user");
			ParseParameter pp = ParseParameter.getParser();
			String heading = pp.parseString("heading", request);
			heading = URLDecoder.decode(heading, "UTF-8");
			String description = pp.parseString("description", request);
			description = URLDecoder.decode(description, "UTF-8");
			String beginYear = request.getParameter("beginYear");
			String endYear = request.getParameter("endYear");
			String pollType = request.getParameter("pollType");
			String yearCondition = request.getParameter("yearCondition");
			String changePowerUnit = request.getParameter("changePowerUnit");
			String closePowerUnit = request.getParameter("closePowerUnit");
			// 判断当前 方案名称是否已经存在
			Program program = new Program();
			program.setUserId(12);
			program.setHeading(heading);

			message = new Message();
			int result = programService.getCountByProgramBackHeading(program);
			if (result > 0) {
				message.setFlag(-1);
				message.setMessage("方案名称已经存在");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}

			UserProgram bean = new UserProgram();
			bean.setUserId(12);
			bean.setHeading(heading);

			bean.setDescription(description);
			bean.setBeginYear(beginYear);
			bean.setEndYear(endYear);
			bean.setPollType(pollType);
			bean.setChangePowerUnit(changePowerUnit);
			bean.setClosePowerUnit(closePowerUnit);
			bean.setYearCondition(yearCondition);
			int flag = programService.addProgramBack(bean, years);

			message.setFlag(flag);
			if (flag < 0) {
				message.setMessage("保存方案出错");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 更新逆推方案
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/updateProgramBack")
	public void updateProgramBack(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] years = request.getParameterValues("years[]");
			String yearCondition = request.getParameter("yearCondition");
			String changePowerUnit = request.getParameter("changePowerUnit");
			String closePowerUnit = request.getParameter("closePowerUnit");
			String programId = request.getParameter("programId");
			String pollType = request.getParameter("pollType");
			UserProgram bean = new UserProgram();
			bean.setProgramId(Integer.parseInt(programId));
			bean.setChangePowerUnit(changePowerUnit);
			bean.setClosePowerUnit(closePowerUnit);
			bean.setYearCondition(yearCondition);
			bean.setPollType(pollType);
			int flag = programService.updateProgramBack(bean, years);
			message = new Message();
			message.setFlag(flag);
			if (flag < 0) {
				message.setMessage("保存方案失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 保存方案
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/exportProgramBack")
	public void exportProgramBackk(HttpServletRequest request, HttpServletResponse response) {
		try {
			String[] years = request.getParameterValues("years[]");
			HttpSession session = request.getSession();
			SysUser user = (SysUser) session.getAttribute("user");
			String path = request.getRealPath("/");
			String beginYear = request.getParameter("beginYear");
			String endYear = request.getParameter("endYear");
			String pollType = request.getParameter("pollType");
			String yearCondition = request.getParameter("yearCondition");
			String changePowerUnit = request.getParameter("changePowerUnit");
			String closePowerUnit = request.getParameter("closePowerUnit");
			UserProgram bean = new UserProgram();
			bean.setUserId(12);
			bean.setBeginYear(beginYear);
			bean.setEndYear(endYear);
			bean.setPollType(pollType);
			bean.setChangePowerUnit(changePowerUnit);
			bean.setClosePowerUnit(closePowerUnit);
			bean.setYearCondition(yearCondition);
			bean.setPath(path);
			String fileName = programService.exportProgramBack(bean, years);
			message = new Message();
			message.setFlag(0);
			message.setMessage(fileName);
			if (fileName == null || "".equals(fileName)) {
				message.setFlag(-1);
				message.setMessage("导出方案出错");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
