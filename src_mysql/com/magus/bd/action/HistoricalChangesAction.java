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
import com.magus.bd.entity.ResYearInfo;
import com.magus.bd.entity.SysCity;
import com.magus.bd.service.ResPowerNetworkService;
import com.magus.bd.service.ResYearInfoService;
import com.magus.bd.service.SysCityService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;
import com.magus.bd.utils.ResYearUtils;

@Controller
public class HistoricalChangesAction extends BaseAction {
	private ResPowerNetworkService service;

	private ResYearInfoService yearService;
	private SysCityService cityService;

	Message message = null;

	public ResPowerNetworkService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResPowerNetworkService service) {
		this.service = service;
	}

	public ResYearInfoService getYearService() {
		return yearService;
	}

	@Autowired
	public void setYearService(ResYearInfoService yearService) {
		this.yearService = yearService;
	}

	public SysCityService getCityService() {
		return cityService;
	}

	@Autowired
	public void setCityService(SysCityService cityService) {
		this.cityService = cityService;
	}

	/**
	 * 
	 * 
	 * @param request
	 *            返回json数据
	 * @return
	 */
	@RequestMapping("/getHistoricalChangeData")
	public void getData(HttpServletRequest request, HttpServletResponse response) {
		try {
			String cityId = request.getParameter("cityId");
			if (cityId == null || cityId == "") {
				cityId = "0";
			}
			JSONObject object = new JSONObject();
			JSONObject networkHigh = service.getPowerNetWorkHigh();
			JSONObject networkLow = service.getPowerNetWorkLow();
			JSONObject countryPower = yearService.getCountryPowerInfo();
			JSONObject countryContaminants = yearService.getCountryContaminants();
			JSONObject countryPowerPoint = yearService.getCountryPowerPoint();
			JSONObject countryCoalPoint = yearService.getCountryCoalPoint();
			ResYearInfo bean = new ResYearInfo();
			bean.setCityId("0");
			List<ResYearInfo> cityPowerList = yearService.getAreaYearInfo(bean);
			List<ResYearInfo> powerCountByYear = yearService.getPowerCountByYear(bean);
			JSONObject cityPower = ResYearUtils.formatResYearInfo(cityPowerList);
			JSONObject powerCountObj = ResYearUtils.formatResPowerCountByYear(powerCountByYear);
			object.put("networkHigh", networkHigh);
			object.put("networkLow", networkLow);
			object.put("countryPower", countryPower);
			object.put("cityPower", cityPower);
			object.put("contaminants", countryContaminants);
			object.put("powerPoint", countryPowerPoint);
			object.put("coalPoint", countryCoalPoint);
			object.put("powerCount", powerCountObj);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 按年份、盟市获取数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getChildrenMapData")
	public void getChildrenMapData(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String cityName = pp.parseString("cityName", request);
			cityName = URLDecoder.decode(cityName, "UTF-8");
			String cityId = "1501";
			List<SysCity> beans = cityService.getCity();
			for (SysCity o : beans) {
				if (cityName.equals(o.getCityName())) {
					cityId = o.getId();
				}
			}
			String year = request.getParameter("year");
			ResYearInfo bean = new ResYearInfo();
			bean.setYear(year);
			bean.setCityName(cityName);
			bean.setCityId(cityId);
			JSONObject childrenMapData = yearService.getChildrenMapData(bean);
			response.getWriter().print(JSONArray.toJSON(childrenMapData));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
