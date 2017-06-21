package com.magus.bd.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.magus.bd.entity.ResConsume;
import com.magus.bd.service.ResConsumeService;
import com.magus.bd.util.Message;

@Controller
public class ResConsumeAction extends BaseAction {
	private ResConsumeService service;

	Message message = null;

	public ResConsumeService getService() {
		return service;
	}

	@Autowired
	public void setService(ResConsumeService service) {
		this.service = service;
	}

	/**
	 * 查询 盟市排名
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getResConsume")
	public void getResConsume(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String year = request.getParameter("year");
			ResConsume bean = new ResConsume();
			bean.setDate(year);
			List<ResConsume> list = service.getConsumeInfo(bean);
			System.out.println("result:" + JSONArray.toJSON(list));
			response.getWriter().print(JSONArray.toJSON(list));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
