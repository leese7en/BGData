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
import com.magus.bd.entity.IndustryA;
import com.magus.bd.service.IndustryAService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;

@Controller
public class IndustryAAction extends BaseAction {
	private IndustryAService service;

	Message message = null;

	public IndustryAService getService() {
		return service;
	}

	@Autowired
	public void setService(IndustryAService service) {
		this.service = service;
	}

	/**
	 * 查询 工况信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getIndustryAByAlarmLogId")
	public void getIndustryAByAlarmLogId(HttpServletRequest request, HttpServletResponse response) {
		try {
			String alarmLogId = request.getParameter("alarmLogId");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));
			IndustryA bean = new IndustryA();
			bean.setAlarmLogId(alarmLogId);
			bean.setPageNumber((pageNumber - 1) * pageSize);
			bean.setPageSize(pageSize);
			List<IndustryA> list = service.getIndustryAByAlarmLogId(bean);
			response.getWriter().print(JSONArray.toJSON(list));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 按条件查询工况信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/queryIndustryA")
	public void queryIndustryA(HttpServletRequest request, HttpServletResponse response) {
		try {
			String cityId = request.getParameter("cityId");
			ParseParameter pp = ParseParameter.getParser();
			String psName = pp.parseString("psName", request);
			psName = URLDecoder.decode(psName, "UTF-8");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));
			IndustryA bean = new IndustryA();
			if (!(psName == null || "".equals(psName) || "-1".equals(psName))) {
				bean.setPsName(psName);
			}
			if (!(cityId == null || "".equals(cityId) || "-1".equals(cityId))) {
				bean.setCityId(cityId);
			}
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setPageNumber((pageNumber - 1) * pageSize);
			bean.setPageSize(pageSize);
			List<IndustryA> list = service.queryIndustryA(bean);
			int count=service.queryIndustryACount(bean);
			JSONObject o = new JSONObject();
			o.put("total", count);
			o.put("rows", list);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
