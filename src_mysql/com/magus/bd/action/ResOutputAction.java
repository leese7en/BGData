package com.magus.bd.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.magus.bd.entity.ResOutput;
import com.magus.bd.service.ResOutputService;

@Controller
public class ResOutputAction {

	@Autowired
	private ResOutputService service;
	
	@RequestMapping("/getResOutputByPSCode")
	public void getResOutputByPSCode(HttpServletRequest request, 
			HttpServletResponse response){
		try {
			String pSCode = request.getParameter("psCode");
			ResOutput bean = new ResOutput();
			bean.setpSCode(pSCode);
			List<ResOutput> beans = service.getResOutputByPSCode(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@RequestMapping("/getResOutputCodeByPSCode")
	public void getResOutputCodeByPSCode(HttpServletRequest request, 
			HttpServletResponse response){
		try {
			String pSCode = request.getParameter("psCode");
			ResOutput bean = new ResOutput();
			bean.setpSCode(pSCode);
			List<ResOutput> beans = service.getResOutputCodeByPSCode(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
