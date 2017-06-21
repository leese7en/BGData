package com.magus.bd.action;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResSuperlowFullView;
import com.magus.bd.service.ResSuperlowFullViewService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;
import com.magus.bd.util.DateUtils;

@Controller
public class ResSuperlowFullViewAction extends BaseAction {
	private ResSuperlowFullViewService service;

	Message message = null;

	public ResSuperlowFullViewService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResSuperlowFullViewService service) {
		this.service = service;
	}

	/**
	 * 超低排放 预测
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getSuperlowFullView")
	public void getSuperlowFullView(HttpServletRequest request, HttpServletResponse response) {
		try {
			String programId = request.getParameter("programId");
			ResSuperlowFullView bean = null;
			if (!(programId == null || "".equals(programId))) {
				bean = new ResSuperlowFullView();
				bean.setParentId(Integer.parseInt(programId));
			}
			JSONObject object = service.getPowerUnitInfo(bean);
			message = new Message();
			if (object == null) {
				message.setFlag(-1);
				message.setMessage("没有获取到对应的信息");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(object);
				response.getWriter().print(JSONArray.toJSON(message));
			}
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
	@RequestMapping("/previewSuperlowFullView")
	public void previewSuperlowFullView(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String changePowerUnit = pp.parseString("changePowerUnit", request);
			changePowerUnit = URLDecoder.decode(changePowerUnit, "UTF-8");
			String closePowerUnit = pp.parseString("closePowerUnit", request);
			closePowerUnit = URLDecoder.decode(closePowerUnit, "UTF-8");
			String newPowerUnit = pp.parseString("newPowerUnit", request);
			newPowerUnit = URLDecoder.decode(newPowerUnit, "UTF-8");
			String cityInfo = request.getParameter("cityInfo");
			String pollCode = request.getParameter("pollCode");
			JSONArray change = (JSONArray) new JSONArray().parse(changePowerUnit);
			JSONArray close = (JSONArray) new JSONArray().parse(closePowerUnit);
			JSONArray news = (JSONArray) new JSONArray().parse(newPowerUnit);
			JSONObject o = service.previewSuperlowFullView(change, close, news, pollCode, cityInfo);
			message = new Message();
			if (o == null) {
				message.setFlag(-1);
				message.setMessage("获取信息失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
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
	@RequestMapping("/previewSuperlowFullViewDetail")
	public void previewSuperlowFullViewDetail(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String changePowerUnit = pp.parseString("changePowerUnit", request);
			changePowerUnit = URLDecoder.decode(changePowerUnit, "UTF-8");
			String closePowerUnit = pp.parseString("closePowerUnit", request);
			closePowerUnit = URLDecoder.decode(closePowerUnit, "UTF-8");
			String newPowerUnit = pp.parseString("newPowerUnit", request);
			newPowerUnit = URLDecoder.decode(newPowerUnit, "UTF-8");
			String pollCode = request.getParameter("pollCode");
			String cityInfo = request.getParameter("cityInfo");
			JSONArray change = (JSONArray) new JSONArray().parse(changePowerUnit);
			JSONArray close = (JSONArray) new JSONArray().parse(closePowerUnit);
			JSONArray news = (JSONArray) new JSONArray().parse(newPowerUnit);
			JSONObject o = service.previewSuperlowFullViewDetail(change, close, news, pollCode, cityInfo);
			message = new Message();
			if (o == null) {
				message.setFlag(-1);
				message.setMessage("获取信息失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
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
	@RequestMapping("/exportSuperlowFullView")
	public void exportSuperlowFullView(HttpServletRequest request, HttpServletResponse response) {
		try {
			String path = request.getRealPath("/");
			ParseParameter pp = ParseParameter.getParser();
			String changePowerUnit = pp.parseString("changePowerUnit", request);
			changePowerUnit = URLDecoder.decode(changePowerUnit, "UTF-8");
			String closePowerUnit = pp.parseString("closePowerUnit", request);
			closePowerUnit = URLDecoder.decode(closePowerUnit, "UTF-8");
			String newPowerUnit = pp.parseString("newPowerUnit", request);
			newPowerUnit = URLDecoder.decode(newPowerUnit, "UTF-8");
			String programName = request.getParameter("programName");
			String programUser = request.getParameter("programUser");
			String programDesc = request.getParameter("programDesc");
			String pollCode = request.getParameter("pollCode");
			String pollName = request.getParameter("pollName");
			String cityInfo = request.getParameter("cityInfo");
			ResSuperlowFullView bean = new ResSuperlowFullView();
			bean.setProgramName(programName);
			bean.setProgramUser(programUser);
			bean.setProgramDesc(programDesc);
			bean.setPolluteCode(pollCode);
			bean.setPolluteName(pollName);
			bean.setPath(path);
			JSONArray change = (JSONArray) new JSONArray().parse(changePowerUnit);
			JSONArray close = (JSONArray) new JSONArray().parse(closePowerUnit);
			JSONArray news = (JSONArray) new JSONArray().parse(newPowerUnit);
			/**
			 * 生成导出方案
			 */

			JSONObject o = service.exportSuperlowFullView(bean, change, close, news, cityInfo);
			message = new Message();
			if (o == null) {
				message.setFlag(-1);
				message.setMessage("获取信息失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
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
	@RequestMapping("/saveSuperlowFullView")
	public void saveSuperlowFullView(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String changePowerUnit = pp.parseString("changePowerUnit", request);
			changePowerUnit = URLDecoder.decode(changePowerUnit, "UTF-8");
			String closePowerUnit = pp.parseString("closePowerUnit", request);
			closePowerUnit = URLDecoder.decode(closePowerUnit, "UTF-8");
			String newPowerUnit = pp.parseString("newPowerUnit", request);
			newPowerUnit = URLDecoder.decode(newPowerUnit, "UTF-8");

			String programId = request.getParameter("programId");

			String programName = request.getParameter("programName");
			String programUser = request.getParameter("programUser");
			String programDesc = request.getParameter("programDesc");
			String pollCode = request.getParameter("pollCode");
			String pollName = request.getParameter("pollName");
			ResSuperlowFullView bean = new ResSuperlowFullView();
			if (programId != null && !("".equals(programId))) {
				bean.setId(Integer.parseInt(programId));
			}
			bean.setProgramName(programName);
			bean.setProgramUser(programUser);
			bean.setProgramDesc(programDesc);
			bean.setPolluteCode(pollCode);
			bean.setPolluteName(pollName);

			JSONArray change = (JSONArray) new JSONArray().parse(changePowerUnit);
			JSONArray close = (JSONArray) new JSONArray().parse(closePowerUnit);
			JSONArray news = (JSONArray) new JSONArray().parse(newPowerUnit);

			message = new Message();
			int count = service.getCountByName(bean);
			if (count > 0) {
				message.setFlag(-1);
				message.setMessage("已经存在相同名称的方案");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			/**
			 * 保存方案
			 */
			int o = service.saveSuperlowFullView(bean, change, close, news);
			if (o < 0) {
				message.setFlag(-1);
				message.setMessage("保存方案失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
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
	@RequestMapping("/queryProgramInfo")
	public void queryProgramInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String programName = request.getParameter("programName");
			String programUser = request.getParameter("programUser");
			String programDesc = request.getParameter("programDesc");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");

			ResSuperlowFullView bean = new ResSuperlowFullView();
			bean.setProgramName(programName);
			bean.setProgramUser(programUser);
			bean.setProgramDesc(programDesc);
			if (!(beginTime == null || "".equals(beginTime) || endTime == null || "".equals(endTime))) {
				bean.setBeginTime(beginTime);
				bean.setEndTime(endTime);
			}

			message = new Message();
			/**
			 * 保存方案
			 */
			List<ResSuperlowFullView> o = service.queryProgramInfo(bean);
			if (o == null || o.size() < 1) {
				message.setFlag(-1);
				message.setMessage("没有对应的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 添加机组
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/insertPowerInfo")
	public void insertPowerInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psCode = request.getParameter("psCode");
			String psName = request.getParameter("psName");
			String cityId = request.getParameter("cityId");
			String groupId = request.getParameter("groupId");
			String unit = request.getParameter("unit");
			String installed = request.getParameter("installed");
			String rectificationDate = request.getParameter("rectificationDate");
			String productionDate = request.getParameter("productionDate");
			String flag = request.getParameter("flag");
			ResSuperlowFullView bean = new ResSuperlowFullView();
			bean.setPsCode(psCode);
			bean.setPsName(psName);
			bean.setCityId(cityId);
			bean.setGroupId(groupId);
			bean.setUnit(unit);
			bean.setInstalled(Integer.parseInt(installed));
			bean.setRectificationDate(rectificationDate);
			bean.setProductionDate(productionDate);
			bean.setFlag(Integer.parseInt(flag));
			bean.setCreateDate(DateUtils.dataFormatYMD(new Date()));
			bean.setUpdateDate(DateUtils.dataFormatYMD(new Date()));
			message = new Message();

			int count = service.getCountPowerInfo(bean);
			if (count > 0) {
				message.setFlag(-1);
				message.setMessage("当前机组已经存在");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}

			/**
			 * 保存方案
			 */
			int o = service.insertPowerInfo(bean);
			if (o < 1) {
				message.setFlag(-1);
				message.setMessage("添加失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 添加机组
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/deleteProgramFullView")
	public void deleteProgramFullView(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String programId = request.getParameter("programId");
			ResSuperlowFullView bean = new ResSuperlowFullView();
			bean.setProgramId(Integer.parseInt(programId));
			message = new Message();
			int result = service.deleteProgramFullView(bean);
			if (result < 1) {
				message.setFlag(-1);
				message.setMessage("删除方案失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 添加机组
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/queryPowerUnitInfo")
	public void queryPowerUnitInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psName = request.getParameter("powerName");
			String cityId = request.getParameter("cityId");
			String groupId = request.getParameter("groupId");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ResSuperlowFullView bean = new ResSuperlowFullView();
			bean.setPsName(psName);
			bean.setCityId(cityId);
			bean.setGroupId(groupId);
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			message = new Message();
			List<ResSuperlowFullView> result = service.queryPowerUnitInfo(bean);
			if (result == null || result.size() < 1) {
				message.setFlag(-1);
				message.setMessage("没有获取到对应信息");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(result);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 添加机组
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/deletePowerUnitInfo")
	public void deletePowerUnitInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String powerUnitId = request.getParameter("powerUnitId");
			ResSuperlowFullView bean = new ResSuperlowFullView();
			message = new Message();
			if (powerUnitId == null || "".equals(powerUnitId)) {
				message.setFlag(-1);
				message.setMessage("请选择机组");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			bean.setProgramId(Integer.parseInt(powerUnitId));
			int result = service.deletePowerUnitInfo(bean);
			if (result < 1) {
				message.setFlag(-1);
				message.setMessage("删除机组失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 添加机组
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/queryPowerUnitInfoById")
	public void queryPowerUnitInfoById(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String powerUnitId = request.getParameter("powerUnitId");
			ResSuperlowFullView bean = new ResSuperlowFullView();
			message = new Message();
			if (powerUnitId == null || "".equals(powerUnitId)) {
				message.setFlag(-1);
				message.setMessage("请选择机组");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			bean.setProgramId(Integer.parseInt(powerUnitId));
			ResSuperlowFullView result = service.queryPowerUnitInfoById(bean);
			if (result == null) {
				message.setFlag(-1);
				message.setMessage("获取信息失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(result);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 超低排放 更新机组
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/updatePowerUnitInfo")
	public void updatePowerUnitInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String powerUnitId = request.getParameter("powerUnitId");
			ResSuperlowFullView bean = new ResSuperlowFullView();

			message = new Message();
			if (powerUnitId == null || "".equals(powerUnitId)) {
				message.setFlag(-1);
				message.setMessage("请选择机组");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			bean.setProgramId(Integer.parseInt(powerUnitId));
			String psName = request.getParameter("psName");
			String unit = request.getParameter("unit");
			String cityId = request.getParameter("cityId");
			String groupId = request.getParameter("groupId");
			String installed = request.getParameter("installed");
			String rectificationDate = request.getParameter("rectificationDate");
			String productionDate = request.getParameter("productionDate");
			String tt = request.getParameter("flag");
			if (tt == null || "".equals(tt)) {
				tt = "0";
			}
			ResSuperlowFullView result = service.queryPowerUnitInfoById(bean);
			if (result == null) {
				message.setFlag(-1);
				message.setMessage("获取信息失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			result.setPsName(psName);
			result.setCityId(cityId);
			result.setGroupId(groupId);
			result.setUnit(unit);
			result.setInstalled(Integer.parseInt(installed));
			result.setRectificationDate(rectificationDate);
			result.setProductionDate(productionDate);
			result.setUpdateDate(DateUtils.dataFormatYMD(new Date()));
			result.setFlag(Integer.parseInt(tt));
			message = new Message();
			int flag = service.updatePowerUnitInfo(result);
			if (flag < 1) {
				message.setFlag(-1);
				message.setMessage("更新机组失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
