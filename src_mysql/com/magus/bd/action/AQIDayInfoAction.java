package com.magus.bd.action;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.AQIDayInfo;
import com.magus.bd.service.AQIDayInfoService;
import com.magus.bd.util.Message;

@Controller
public class AQIDayInfoAction extends BaseAction {
	private AQIDayInfoService service;

	Message message = null;

	public AQIDayInfoService getService() {
		return service;
	}

	@Autowired
	public void setService(AQIDayInfoService service) {
		this.service = service;
	}

	/**
	 * 插入排放绩效 、装机容量区间范围
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getAQIInfoDay")
	public void getAQIInfoDay(HttpServletRequest request, HttpServletResponse response) {
		try {
			response.setContentType("text/plain;charset=UTF-8"); 
			message = new Message();
			String cityId = request.getParameter("cityId");
			String beginTime = request.getParameter("beginTime").trim();
			String endTime = request.getParameter("endTime").trim();
			AQIDayInfo bean = new AQIDayInfo();
			if (null == cityId || "".equals(cityId)) {
				cityId = "1501";
			}
			bean.setCityId(Integer.parseInt(cityId));
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			JSONObject object = service.getAQIDayInfo(bean);
			message = new Message();
			if (object == null) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			message.setFlag(0);
			message.setData(object);
			response.getWriter().print(JSONArray.toJSON(message));
			System.out.println(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
