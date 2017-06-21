package com.magus.bd.action;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResFacHourData;
import com.magus.bd.global.GlobalPara;
import com.magus.bd.service.ResFacHourDataService;
import com.magus.bd.util.Message;

@Controller
public class ResFacHourDataAction extends BaseAction {
	private ResFacHourDataService service;

	Message message = null;

	public ResFacHourDataService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResFacHourDataService service) {
		this.service = service;
	}

	/**
	 * 模糊查询部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getFacHourDataInfoTable")
	public void getFacHourDataInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			ResFacHourData bean = new ResFacHourData();
			String waterOrGas = request.getParameter("waterOrGas");
			String psCode = request.getParameter("psCode");
			String outPutCode = request.getParameter("outPutCode");
			String[] pollutantCodes = request.getParameterValues("pollutantCode[]");
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			bean.setPsCode(psCode);
			bean.setOutPutCode(outPutCode);
			if(pollutantCodes!=null&&pollutantCodes.length>0){
				bean.setPollutantCodes(Arrays.asList(pollutantCodes));
				}
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));
			bean.setPageNumber((pageNumber - 1) * pageSize);
			bean.setPageSize(pageSize);
			if (waterOrGas == null || "".equals(waterOrGas) || "0".equals(waterOrGas)) {
				List<ResFacHourData> beans = service.getWaterFacHourDataInfoTable(bean);
				int count = service.getWaterFacHourDataInfoTableCount(bean);
				JSONObject o = new JSONObject();
				o.put(GlobalPara.total, count);
				o.put(GlobalPara.rows, beans);
				response.getWriter().print(JSONArray.toJSON(o));
				return;
			} else {
				List<ResFacHourData> beans = service.getGasFacHourDataInfoTable(bean);
				int count = service.getGasFacHourDataInfoTableCount(bean);
				JSONObject o = new JSONObject();
				o.put(GlobalPara.total, count);
				o.put(GlobalPara.rows, beans);
				response.getWriter().print(JSONArray.toJSON(o));
				return;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 模糊查询部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getFacHourDataInfoChart")
	public void getFacHourDataInfoChart(HttpServletRequest request, HttpServletResponse response) {
		try {
			ResFacHourData bean = new ResFacHourData();
			String waterOrGas = request.getParameter("waterOrGas");
			String psCode = request.getParameter("psCode");
			String outPutCode = request.getParameter("outPutCode");
			String[] pollutantCodes = request.getParameterValues("pollutantCode[]");
			System.out.println(pollutantCodes);
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			bean.setPsCode(psCode);
			bean.setOutPutCode(outPutCode);
			if(pollutantCodes!=null&&pollutantCodes.length>0){
			bean.setPollutantCodes(Arrays.asList(pollutantCodes));
			}
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			if (waterOrGas == null || "".equals(waterOrGas) || "0".equals(waterOrGas)) {
				JSONObject object = service.getWaterFacHourDataInfoChart(bean);
				response.getWriter().print(JSONArray.toJSON(object));
				return;
			} else {
				JSONObject object = service.getGasFacHourDataInfoChart(bean);
				response.getWriter().print(JSONArray.toJSON(object));
				return;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
