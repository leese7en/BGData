package com.magus.bd.action;

import java.io.IOException;
import java.net.URLDecoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Analysis;
import com.magus.bd.entity.FullScreen;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.ResYearInfo;
import com.magus.bd.service.FullScreenService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;
import com.magus.bd.utils.ResConst;
import com.magus.bd.utils.ResSuperLowUtils;
import com.magus.bd.utils.ResYearUtils;

@Controller
public class FullScreenAction {
	@Autowired
	private FullScreenService service;

	@RequestMapping("/getIndustryInfo")
	public void getAnalysis(HttpServletRequest request, HttpServletResponse response) {
		try {
			FullScreen bean  = new  FullScreen();
			JSONObject obj = service.getIndustryInfo(bean);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}	
	@RequestMapping("/getSupwerLowInfo")
	public void getSupwerLowInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			FullScreen bean  = new  FullScreen();
			bean.setPolluteCode(ResConst.SO2CODE);
			JSONObject obj = service.getSupwerLowInfo(bean);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}	
	@RequestMapping("/getDataQuality")
	public void getDataQuality(HttpServletRequest request, HttpServletResponse response) {
		try {
			FullScreen bean  = new  FullScreen();
			String beginDate = request.getParameter("beginDate");
			String endDate = request.getParameter("endDate");
			bean.setBeginDate(beginDate);
			bean.setEndDate(endDate);
			JSONObject obj = service.getDataQuality(bean);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}	
	@RequestMapping("/getDataQualityImprove")
	public void getDataQualityImprove(HttpServletRequest request, HttpServletResponse response) {
		try {
			FullScreen bean  = new  FullScreen();
			ParseParameter pp = ParseParameter.getParser();
			String year = request.getParameter("year");
			bean.setYear("2016");
			JSONObject obj  = service.getDataQualityImprove(bean);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}	
	@RequestMapping("/getHotwordInfo")
	public void getHotwordInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			FullScreen bean  = new  FullScreen();
			JSONObject obj = service.getHotwordInfo(bean);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}	
	@RequestMapping("/getBoilerTypeInstallAmountCountByYear")
	public void getBoilerTypeInstallAmountCountByYear(HttpServletRequest request, HttpServletResponse response) {
		try {
			FullScreen bean  = new  FullScreen();
			JSONObject obj = service.getBoilerTypeInstallAmountCountByYear(bean);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}	
	@RequestMapping("/getPowerChangeInfo")
	public void getPowerChangeInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			String cityId = request.getParameter("cityId");
			if (cityId == null || cityId == "") {
				cityId = "0";
			}
			JSONObject object = new JSONObject();
			JSONObject networkHigh = service.getPowerNetWorkHigh();
			JSONObject networkLow = service.getPowerNetWorkLow();
			JSONObject countryPowerPoint = service.getCountryPowerPoint();
			JSONObject countryCoalPoint = service.getCountryCoalPoint();
			ResYearInfo bean = new ResYearInfo();
			bean.setCityId("0");
			List<ResYearInfo> cityPowerList = service.getAreaYearInfo(bean);
			JSONObject cityPower = ResYearUtils.formatResYearInfo(cityPowerList);
			object.put("networkHigh", networkHigh);
			object.put("networkLow", networkLow);
			object.put("cityPower", cityPower);
			object.put("powerPoint", countryPowerPoint);
			object.put("coalPoint", countryCoalPoint);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 工况污染物排放
	 * @param request
	 * @param response
	 */
	 
	@RequestMapping("/getIndustryFullScreen")
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
	
	@RequestMapping("/queryAnalysisFullScreen")
	public void queryAnalysisFullScreen(HttpServletRequest request, HttpServletResponse response) {
		try {
			JSONObject object = service.queryAnalysisFullScreen();
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 根据时间获取 推算硫分年份数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndustrySulfurMonthFullScreen")
	public void getIndustrySulfurMonthFullScreen(HttpServletRequest request, HttpServletResponse response) {
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
	 * 根据时间获取 推算硫分年份数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndurutyConByEnterpriseFullScreen")
	public void getIndurutyConByEnterpriseFullScreen(HttpServletRequest request, HttpServletResponse response) {
		try {
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			ParseParameter pp = ParseParameter.getParser();
			String cityName = pp.parseString("city", request);
			cityName = URLDecoder.decode(cityName, "UTF-8");
			ResIndustryCon bean = new ResIndustryCon();
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setCityName(cityName);
			List<ResIndustryCon> beans = service.getIndurutyConByEnterprise(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 根据时间获取 推算硫分年份数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndurutyRealtime")
	public void getIndurutyRealtime(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String cityName = pp.parseString("cityName", request);
			cityName = URLDecoder.decode(cityName, "UTF-8");
			JSONObject obj = service.getIndurutyRealtime(cityName);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 根据时间获取 推算硫分年份数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getOnlineEmission")
	public void getOnlineEmission(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String cityName = pp.parseString("cityName", request);
			cityName = URLDecoder.decode(cityName, "UTF-8");
			JSONObject obj = service.getOnlineEmission(cityName);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
