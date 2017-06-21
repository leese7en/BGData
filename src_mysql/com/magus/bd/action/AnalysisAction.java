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
import com.magus.bd.service.AnalysisService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;
import com.magus.bd.utils.ResSuperLowUtils;

@Controller
public class AnalysisAction {

	@Autowired
	private AnalysisService service;
	Message message = null;

	@RequestMapping("/getAnalysis")
	public void getAnalysis(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<Analysis> beans = service.getAnalysis();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/getAnalysisForAnalysis")
	public void getAnalysisForAnalysis(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year");
			String consumeType = request.getParameter("consumeType");
			// 0是水 、 1 是煤、2 是污染物
			int emission = 1;
			if ("water".equals(consumeType)) {
				emission = 0;
			}
			String pollType = request.getParameter("pollType");
			Analysis bean = new Analysis();
			bean.setYear(year);
			bean.setEmission(emission);
			bean.setPollType(pollType);
			JSONObject object = service.getAnalysisForAnalysis(bean);
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
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/getIndustryPower")
	public void getIndustryPower(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<Analysis> object = service.getInduestryPower();
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
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/getBoilerType")
	public void getBoilerType(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<Analysis> object = service.getBoilerType();
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
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/queryAnalysis")
	public void queryAnalysis(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year");
			String[] installeds = request.getParameterValues("installed[]");
			ParseParameter pp = ParseParameter.getParser();
			String psType = pp.parseString("psType", request);
			psType = URLDecoder.decode(psType, "UTF-8");
			String boilerType = pp.parseString("boilerType", request);
			boilerType = URLDecoder.decode(boilerType, "UTF-8");
			String analysisType = request.getParameter("analysisType");
			Analysis bean = new Analysis();
			bean.setYear(year);
			bean.setIsStrength("1");
			if (!(psType == null || "-1".equals(psType))) {
				bean.setPsType(psType);
			}
			if (!(boilerType == null || "-1".equals(boilerType))) {
				bean.setBoilerType(boilerType);
				bean.setIsStrength("0");
			}
			if (installeds != null && installeds.length > 0) {
				bean.setInstalled(ResSuperLowUtils.formatEmission(installeds));
				bean.setInstalledMax(ResSuperLowUtils.formatEmissionMax(installeds));
			}
			bean.setEmission(Integer.parseInt(analysisType));
			JSONObject object = service.queryAnalysis(bean);
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
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
