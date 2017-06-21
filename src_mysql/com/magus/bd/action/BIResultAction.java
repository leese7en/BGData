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
import com.magus.bd.entity.BIResult;
import com.magus.bd.global.GlobalPara;
import com.magus.bd.service.BIResultService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;

@Controller
public class BIResultAction extends BaseAction {
	private BIResultService service;

	Message message = null;

	public BIResultService getServices() {
		return service;
	}

	@Autowired
	public void setServices(BIResultService service) {
		this.service = service;
	}

	/**
	 * 模糊查询分析结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/blurryBIResult")
	public void blurryBIResult(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psName = pp.parseString("psName", request);
			psName = URLDecoder.decode(psName, "UTF-8");
			String cityId = request.getParameter("cityId");

			String algorithmCode = pp.parseString("algorithm", request);
			algorithmCode = URLDecoder.decode(algorithmCode, "UTF-8");
			String beginTime = request.getParameter("beginTime").replaceAll("-", "");
			String endTime = request.getParameter("endTime").replaceAll("-", "");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));

			BIResult bean = new BIResult();
			bean.setPsName(psName);
			if (!("".equals(cityId) || "-1".equals(cityId))) {
				bean.setCityId(Integer.parseInt(cityId));
			}
			if (!("".equals(algorithmCode) || "-1".equals(algorithmCode))) {
				bean.setAlgorithmCode(algorithmCode);
			}
			bean.setBeginDateTime(beginTime);
			bean.setEndDateTime(endTime);
			bean.setPageNumber((pageNumber - 1) * pageSize);
			bean.setPageSize(pageSize);
			List<BIResult> beans = service.blurryBIResult(bean);
			int count = service.blurryCount(bean);
			JSONObject o = new JSONObject();
			o.put("total", count);
			o.put("rows", beans);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 模糊查询分析结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getBIResultDetail")
	public void getBIResultDetail(HttpServletRequest request, HttpServletResponse response) {
		try {
			String resultId = request.getParameter("sourceId");
			String dayinfo = request.getParameter("dayinfo");
			BIResult bean = new BIResult();
			bean.setResultId(Integer.parseInt(resultId));
			bean.setDayinfo(dayinfo);
			List<BIResult> beans = service.getDetail(bean);
			JSONObject o = new JSONObject();
			o.put(GlobalPara.total, 0);
			o.put(GlobalPara.rows, beans);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取 算法
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getAlgorithm")
	public void getAlgorithm(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<BIResult> beans = service.getAlgorithm();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 模糊查询分析结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/blurryBIWaterResult")
	public void blurryBIWaterResult(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psName = pp.parseString("psName", request);
			psName = URLDecoder.decode(psName, "UTF-8");
			String cityId = request.getParameter("cityId");

			String algorithmCode = pp.parseString("algorithm", request);
			algorithmCode = URLDecoder.decode(algorithmCode, "UTF-8");
			String beginTime = request.getParameter("beginTime").replaceAll("-", "");
			String endTime = request.getParameter("endTime").replaceAll("-", "");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));

			BIResult bean = new BIResult();
			bean.setPsName(psName);
			if (!("".equals(cityId) || "-1".equals(cityId))) {
				bean.setCityId(Integer.parseInt(cityId));
			}
			if (!("".equals(algorithmCode) || "-1".equals(algorithmCode))) {
				bean.setAlgorithmCode(algorithmCode);
			}
			bean.setBeginDateTime(beginTime);
			bean.setEndDateTime(endTime);
			bean.setPageNumber((pageNumber - 1) * pageSize);
			bean.setPageSize(pageSize);
			List<BIResult> beans = service.blurryBIWaterResult(bean);
			int count = service.blurryWaterCount(bean);
			JSONObject o = new JSONObject();
			o.put(GlobalPara.total, count);
			o.put(GlobalPara.rows, beans);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 模糊查询分析结果
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getBIWaterResultDetail")
	public void getBIWaterResultDetail(HttpServletRequest request, HttpServletResponse response) {
		try {
			String resultId = request.getParameter("sourceId");
			String dayinfo = request.getParameter("dayinfo");
			BIResult bean = new BIResult();
			bean.setResultId(Integer.parseInt(resultId));
			bean.setDayinfo(dayinfo);
			List<BIResult> beans = service.getWaterDetail(bean);
			JSONObject o = new JSONObject();
			o.put(GlobalPara.total, 0);
			o.put(GlobalPara.rows, beans);
			response.getWriter().print(JSONArray.toJSON(o));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取 算法
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getWaterAlgorithm")
	public void getWaterAlgorithm(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<BIResult> beans = service.getWaterAlgorithm();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
