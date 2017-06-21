package com.magus.bd.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.magus.bd.entity.ResYearInfo;
import com.magus.bd.service.ResYearInfoService;
import com.magus.bd.util.Message;
import com.magus.bd.utils.ResConst;

@Controller
public class ResYearInfoAction extends BaseAction {
	private ResYearInfoService service;

	Message message = null;

	public ResYearInfoService getService() {
		return service;
	}

	@Autowired
	public void setService(ResYearInfoService service) {
		this.service = service;
	}

	/**
	 * 插入排放绩效 、装机容量区间范围
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addAreaResInfo")
	public void addAreaResInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String year = request.getParameter("year");
			String cityId = request.getParameter("cityId");
			String fireInstalled = request.getParameter("fireInstalled");
			String windInstalled = request.getParameter("windInstalled");
			String otherInstalled = request.getParameter("otherInstalled");
			String firePower = request.getParameter("firePower");
			String windPower = request.getParameter("windPower");
			String otherPower = request.getParameter("otherPower");
			String GDP = request.getParameter("GDP");
			ResYearInfo bean = new ResYearInfo();
			bean.setYear(year);
			bean.setCityId(cityId);
			bean.setFireInstalled(Double.parseDouble(fireInstalled));
			bean.setWindInstalled(Double.parseDouble(windInstalled));
			bean.setOtherInstalled(Double.parseDouble(otherInstalled));
			bean.setFirePower(Double.parseDouble(firePower));
			bean.setWindPower(Double.parseDouble(windPower));
			bean.setOtherPower(Double.parseDouble(otherPower));
			bean.setGDP(Double.parseDouble(GDP));
			// 插入数据
			if (!service.addAreaYearInfo(bean)) {
				message.setFlag(ResConst.UNNORMALVALUE);
				message.setMessage(ResConst.UNNORMAL);
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取盟市信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getAreaInfo")
	public void getAreaInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year");
			ResYearInfo bean = new ResYearInfo();
			if (!"-1".equals(year)) {
				bean.setYear(year);
			}
			List<ResYearInfo> beans = service.getAreaYearInfo(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 添加盟市年度信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addCityResInfo")
	public void addCityResInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String cityId = request.getParameter("cityId");
			String year = request.getParameter("year");
			String fireInstalled = request.getParameter("fireInstalled");
			String windInstalled = request.getParameter("windInstalled");
			String otherInstalled = request.getParameter("otherInstalled");
			String firePower = request.getParameter("firePower");
			String windPower = request.getParameter("windPower");
			String otherPower = request.getParameter("otherPower");
			String GDP = request.getParameter("GDP");
			ResYearInfo bean = new ResYearInfo();
			bean.setCityId(cityId);
			bean.setYear(year);
			bean.setFireInstalled(Double.parseDouble(fireInstalled));
			bean.setWindInstalled(Double.parseDouble(windInstalled));
			bean.setOtherInstalled(Double.parseDouble(otherInstalled));
			bean.setFirePower(Double.parseDouble(firePower));
			bean.setWindPower(Double.parseDouble(windPower));
			bean.setOtherPower(Double.parseDouble(otherPower));
			bean.setGDP(Double.parseDouble(GDP));
			// 插入数据
			if (!service.addCityYearInfo(bean)) {
				message.setFlag(ResConst.UNNORMALVALUE);
				message.setMessage(ResConst.UNNORMAL);
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取盟市年度信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getCityResInfo")
	public void getCityResInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResYearInfo> beans = service.getCityYearInfo();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取盟市年度信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getCountryPower")
	public void getCountryPower(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResYearInfo> beans = service.getCountryPower();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 插入排放绩效 、装机容量区间范围
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addCountryPower")
	public void addCountryPowerInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String countryPowerYear = request.getParameter("countryPowerYear");
			String countryPowerType = request.getParameter("countryPowerType");
			String powerAmount = request.getParameter("powerAmount");
			String powerAmountIncrementRate = request.getParameter("powerAmountIncrementRate");
			String installedAmount = request.getParameter("installedAmount");
			String installedAmountIncrementRate = request.getParameter("installedAmountIncrementRate");
			String effectiveHour = request.getParameter("effectiveHour");
			String effectiveHourIncrementRate = request.getParameter("effectiveHourIncrementRate");
			String description = request.getParameter("description");
			ResYearInfo bean = new ResYearInfo();

			bean.setYear(countryPowerYear);
			bean.setType(Integer.parseInt(countryPowerType));
			bean.setPowerAmount(Double.parseDouble(powerAmount));
			bean.setPowerAmountIncrementRate(Float.parseFloat(powerAmountIncrementRate));

			bean.setInstalledAmount(Double.parseDouble(installedAmount));
			bean.setInstalledAmountIncrementRate(Float.parseFloat(installedAmountIncrementRate));
			bean.setEffectiveHour(Double.parseDouble(effectiveHour));
			bean.setEffectiveHourIncrementRate(Float.parseFloat(effectiveHourIncrementRate));
			bean.setDescription(description);
			// 插入数据
			if (!service.addCountryPowerInfo(bean)) {
				message.setFlag(ResConst.UNNORMALVALUE);
				message.setMessage(ResConst.UNNORMAL);
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
