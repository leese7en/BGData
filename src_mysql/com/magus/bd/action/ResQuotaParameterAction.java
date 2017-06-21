package com.magus.bd.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResQuotaParameter;
import com.magus.bd.service.ResQuotaParameterService;
import com.magus.bd.util.Message;
import com.magus.bd.utils.ResConst;
import com.magus.bd.utils.ResQuotaParameterUtils;

@Controller
public class ResQuotaParameterAction extends BaseAction {
	private ResQuotaParameterService service;

	Message message = null;

	public ResQuotaParameterService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResQuotaParameterService service) {
		this.service = service;
	}

	/**
	 * 查询结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getQuotaParameter")
	public void blurryBIResult(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<ResQuotaParameter> beans = service.getQuotaParameter();
			JSONObject objectPara = ResQuotaParameterUtils.formatQuotaParameter(beans);
			JSONObject object = new JSONObject();
			object.put("chart", objectPara);
			object.put("data", beans);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 通过id获取结果
	 */
	@RequestMapping("/getQuotaParameterById")
	public void getQuotaParameterById(HttpServletRequest request, HttpServletResponse response) {
		String id = request.getParameter("id");
		ResQuotaParameter bean = service.getQuotaParameterById(id);
		try {
			response.getWriter().print(JSONObject.toJSON(bean));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/updateQuotaParameter")
	public void updateQuotaParameter(HttpServletRequest request, HttpServletResponse response) {
		try {
			String constant = request.getParameter(ResConst.CONSTANT);
			String fluctuation = request.getParameter(ResConst.FLUCTUATION);
			String handicapping = request.getParameter(ResConst.HANDICAPPING);
			String mutation = request.getParameter(ResConst.MUTATION);
			String screenjump = request.getParameter(ResConst.SCREENJUMP);
			String reliable = request.getParameter(ResConst.RELIABLE);
			String complete = request.getParameter(ResConst.COMPLETE);
			String effective = request.getParameter(ResConst.EFFECTIVE);

			Map<String, Float> maps = new HashMap<String, Float>();

			maps.put(ResConst.CONSTANT, Float.parseFloat(constant));
			maps.put(ResConst.FLUCTUATION, Float.parseFloat(fluctuation));
			maps.put(ResConst.HANDICAPPING, Float.parseFloat(handicapping));
			maps.put(ResConst.MUTATION, Float.parseFloat(mutation));
			maps.put(ResConst.SCREENJUMP, Float.parseFloat(screenjump));
			maps.put(ResConst.RELIABLE, Float.parseFloat(reliable));
			maps.put(ResConst.COMPLETE, Float.parseFloat(complete));
			maps.put(ResConst.EFFECTIVE, Float.parseFloat(effective));
			message = new Message();
			int flag = service.updateQuotaParameter(maps);
			if (flag < 0) {
				message.setFlag(flag);
				response.getWriter().print(JSONArray.toJSON(message));
			}
			List<ResQuotaParameter> beans = service.getQuotaParameter();
			JSONObject objectPara = ResQuotaParameterUtils.formatQuotaParameter(beans);
			JSONObject object = new JSONObject();
			object.put("chart", objectPara);
			object.put("data", beans);
			response.getWriter().print(JSONArray.toJSON(object));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/setQuotaParameter")
	public void setQuotaParameter(HttpServletRequest request, HttpServletResponse response) {
		JSONObject result = new JSONObject();
		String id = request.getParameter("id");
		int maxNum = Integer.parseInt(request.getParameter("maxNum"));
		int maxTime = Integer.parseInt(request.getParameter("maxTime"));
		ResQuotaParameter bean = new ResQuotaParameter();
		bean.setId(id);
		bean.setMaxNum(maxNum);
		bean.setMaxTime(maxTime);
		if (service.setQuotaParameter(bean)) {
			result.put("info", "success");
		}
		try {
			response.getWriter().print(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
