package com.magus.bd.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.Ranking;
import com.magus.bd.service.RankingService;
import com.magus.bd.util.Message;

@Controller
public class RankingAction {

	@Autowired
	private RankingService service;

	Message message = null;

	@RequestMapping("/getRankingByYear")
	public void getRankingByYear(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year");
			Ranking bean = new Ranking();
			bean.setYear(year);
			List<Ranking> o = service.getRankingByYear(bean);
			message = new Message();
			if (o == null || o.size() < 1) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			message.setFlag(0);
			message.setData(JSONObject.toJSON(o));
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/getRankingEnterpriseByYear")
	public void getRankingEnterpriseByYear(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year");
			String cityId = request.getParameter("cityId");
			String analysisType = request.getParameter("analysisType");
			String pollType = request.getParameter("pollType");
			Ranking bean = new Ranking();
			bean.setYear(year);
			bean.setCityId(cityId);
			JSONObject object = service.getRankingEnterpriseByYear(bean, analysisType, pollType);
			message = new Message();
			if (object == null) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			message.setData(object);
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/getCitygEnterpriseByYear")
	public void getCitygEnterpriseByYear(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year");
			String cityId = request.getParameter("cityId");
			Ranking bean = new Ranking();
			bean.setYear(year);
			bean.setCityId(cityId);
			List<Ranking> beans = service.getCitygEnterpriseByYear(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
