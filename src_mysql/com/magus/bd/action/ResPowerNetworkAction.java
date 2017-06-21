package com.magus.bd.action;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.magus.bd.entity.ResPowerNetwork;
import com.magus.bd.service.ResPowerNetworkService;
import com.magus.bd.util.Message;

@Controller
public class ResPowerNetworkAction extends BaseAction {
	private ResPowerNetworkService service;

	Message message = null;

	public ResPowerNetworkService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResPowerNetworkService service) {
		this.service = service;
	}

	@RequestMapping("/addPowerInfo")
	public void addPowerInfo(HttpServletRequest request, HttpServletResponse response) {

		try {
			String powerName = request.getParameter("powerName");
			String longitude = request.getParameter("powerLongitude");
			String latitude = request.getParameter("powerLatitude");
			String description = request.getParameter("description");

			ResPowerNetwork bean = new ResPowerNetwork();
			bean.setBname(powerName);
			bean.setBlongitude(Float.parseFloat(longitude));
			bean.setBlatitude(Float.parseFloat(latitude));
			bean.setDescription(description);
			message = new Message();
			if (service.addPowerInfo(bean)) {
				message.setFlag(0);
			} else {
				message.setFlag(-1);
				message.setMessage("添加失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@RequestMapping("/addPowerNetworkInfo")
	public void addPowerNetworkInfo(HttpServletRequest request, HttpServletResponse response) {

		try {
			String year = request.getParameter("year");
			String networkBeginPower = request.getParameter("networkBeginPower");
			String networkEndPower = request.getParameter("networkEndPower");
			String description = request.getParameter("description");

			ResPowerNetwork bean = new ResPowerNetwork();
			bean.setYear(year);
			bean.setbId(Integer.parseInt(networkBeginPower));
			bean.seteId(Integer.parseInt(networkEndPower));
			bean.setDescription(description);
			message = new Message();
			if (service.addPowerNetwork(bean)) {
				message.setFlag(0);
			} else {
				message.setFlag(-1);
				message.setMessage("添加失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@RequestMapping("/getPowerInfo")
	public void getPowerInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResPowerNetwork> beans = service.getPowerInfo();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@RequestMapping("/blurryPowerInfo")
	public void blurryPowerInfo(HttpServletRequest request, HttpServletResponse response) {
		try {

			String powerName = request.getParameter("powerName");
			ResPowerNetwork bean = new ResPowerNetwork();
			bean.setBname(powerName);
			List<ResPowerNetwork> beans = service.blurryPowerInfo(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	@RequestMapping("/blurryPowerNetworkInfo")
	public void blurryPowerNetworkInfo(HttpServletRequest request, HttpServletResponse response) {
		try {

			String powerBeginName = request.getParameter("powerNetworkBeginName");
			String powerEndName = request.getParameter("powerNetworkEndName");
			ResPowerNetwork bean = new ResPowerNetwork();
			bean.setBname(powerBeginName);
			bean.setEname(powerEndName);
			List<ResPowerNetwork> beans = service.blurryPowerNetworkInfo(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
