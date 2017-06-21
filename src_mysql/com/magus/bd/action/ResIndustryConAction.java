package com.magus.bd.action;

import java.io.IOException;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.SysAnotation;
import com.magus.bd.service.ResIndustryConService;
import com.magus.bd.util.DateUtils;
import com.magus.bd.util.Message;

@Controller
public class ResIndustryConAction extends BaseAction {
	private ResIndustryConService service;

	Message message = null;

	public ResIndustryConService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResIndustryConService service) {
		this.service = service;
	}

	/**
	 * 根据时间获取 推算硫分年份数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndustrySulfurYear")
	public void getIndustrySulfurYear(HttpServletRequest request, HttpServletResponse response) {
		try {

			String beginYear = request.getParameter("beginYear");
			String endYear = request.getParameter("endYear");
			ResIndustryCon bean = new ResIndustryCon();
			bean.setBeginTime(beginYear);
			bean.setEndTime(endYear);
			JSONObject object = service.getIndustrySulfurYear(bean);
			object.put("markers", object.get("markers"));
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e){
			e.printStackTrace();
		}
	}

	/**
	 * 根据时间获取 推算硫分年份数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndustrySulfurMonth")
	public void getIndustrySulfurMonth(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year");
			String beginMonth = request.getParameter("beginMonth");
			String endMonth = request.getParameter("endMonth");
			String viewPoint = request.getParameter("viewPoint");
			ResIndustryCon bean = new ResIndustryCon();
			bean.setYear(year);
			bean.setBeginTime(beginMonth);
			bean.setEndTime(endMonth);
			JSONObject object = service.getIndustrySulfurMonth(bean, viewPoint);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 模糊查询分析结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndustryConByPoll")
	public void getIndustryConByPoll(HttpServletRequest request, HttpServletResponse response) {
		try {

			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String viewPoint = request.getParameter("viewPoint");
			String pollType = request.getParameter("pollType");
			ResIndustryCon bean = new ResIndustryCon();
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setPollType(pollType);
			JSONObject object = service.getIndustryPollByPoll(bean, viewPoint, pollType);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询 盟市下企业得分信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndurutyConByEnterprise")
	public void getIndurutyConByEnterprise(HttpServletRequest request, HttpServletResponse response) {
		try {
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String city = request.getParameter("city");
			ResIndustryCon bean = new ResIndustryCon();
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setCityId(Integer.parseInt(city));
			List<ResIndustryCon> beans = service.getIndurutyConByEnterprise(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 查询盟市或者集团的批注信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getGroupOrCityAnnotationById")
	public void getGroupOrCityAnnotationById(HttpServletRequest request, HttpServletResponse response) {
		try {
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String viewPoint = request.getParameter("viewPoint");
			String groupIdOrCityId = request.getParameter("groupIdOrCityId");
			String pollutant = request.getParameter("pollutant");
			SysAnotation bean = new SysAnotation();
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setGroupIdOrCityId(groupIdOrCityId);
			bean.setGroupOrCity(Integer.parseInt(viewPoint));
			bean.setPollutant(pollutant);
			List<SysAnotation> beans = service.getGroupOrCityAnnotationById(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 根据月份和年份查询批注信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getAnnotationByYearAndMonth")
	public void getAnnotationByYearAndMonth(HttpServletRequest request, HttpServletResponse response) {
		try {
			String month = request.getParameter("month");
			String beginYear = request.getParameter("beginYear");
			String endYear = request.getParameter("endYear");
			SysAnotation bean = new SysAnotation();
			bean.setMonth(month);
			bean.setBeginTime(beginYear);
			bean.setEndTime(endYear);
			List<SysAnotation> beans = service.getAnnotationByYearAndMonth(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
