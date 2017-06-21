package com.magus.bd.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.magus.bd.entity.IndustryGroup;
import com.magus.bd.entity.SysCity;
import com.magus.bd.entity.ZoneCity;
import com.magus.bd.service.SysCityService;
import com.magus.bd.util.Message;
import com.magus.bd.utils.ResConst;

@Controller
public class SysCityAction extends BaseAction {
	private SysCityService service;

	Message message = null;

	public SysCityService getService() {
		return service;
	}

	@Autowired
	public void setService(SysCityService service) {
		this.service = service;
	}

	/**
	 * 添加盟市信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addCity")
	public void addInstalledEmission(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String cityName = request.getParameter("cityName");
			String distributed = request.getParameter("distributed");
			String description = request.getParameter("description");
			SysCity bean = new SysCity();
			bean.setCityName(cityName);
			bean.setDistributed(distributed);
			bean.setDescription(description);
			// 插入数据
			if (!service.addCity(bean)) {
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
	@RequestMapping("/getCity")
	public void getCity(HttpServletRequest request, HttpServletResponse response) {
		response.setContentType("text/plain;charset=UTF-8");
		try {
			List<SysCity> beans = service.getCity();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取工况盟市信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndustryCity")
	public void getIndustryCity(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<SysCity> beans = service.getIndustryCity();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 删除城市
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/deleteCity")
	public void deleteCity(HttpServletRequest request, HttpServletResponse response) {
		message = new Message();
		int id = Integer.parseInt(request.getParameter("id"));
		if (service.deleteCity(id)) {
			message.setFlag(0);
		} else {
			message.setFlag(-1);
			message.setMessage("删除城市信息失败");
		}
		try {
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据id获取城市
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getCityById")
	public void getCityById(HttpServletRequest request, HttpServletResponse response) {
		message = new Message();
		String id = request.getParameter("id");
		SysCity city = service.getCityById(id);
		try {
			response.getWriter().print(JSONArray.toJSON(city));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 编辑盟市信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/editCity")
	public void editCity(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String id = request.getParameter("id");
			String cityName = request.getParameter("cityName");
			String distributed = request.getParameter("distributed");
			String description = request.getParameter("description");
			SysCity bean = new SysCity();
			bean.setId(id);
			bean.setCityName(cityName);
			bean.setDistributed(distributed);
			bean.setDescription(description);
			if (service.editCity(bean)) {
				message.setFlag(0);
			} else {
				message.setFlag(-1);
				message.setMessage("编辑失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 按条件查询盟市信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/queryCity")
	public void queryCity(HttpServletRequest request, HttpServletResponse response) {
		String cityName = request.getParameter("queryCityName");
		String distributed = request.getParameter("queryDistributed");
		SysCity bean = new SysCity();
		bean.setCityName(cityName);
		bean.setDistributed(distributed);
		try {
			List<SysCity> beans = service.queryCity(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
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
	@RequestMapping("/getIndustryGroup")
	public void getIndustryGroup(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<IndustryGroup> beans = service.getIndustryGroup();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取t_code_zone_temp
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getZoneCity")
	public void getZoneCity(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ZoneCity> beans = service.getZoneCity();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
