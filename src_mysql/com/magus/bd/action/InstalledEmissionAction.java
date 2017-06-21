package com.magus.bd.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.magus.bd.entity.ResInstalledEmission;
import com.magus.bd.service.ResInstalledEmissionService;
import com.magus.bd.util.Message;
import com.magus.bd.utils.ResConst;

@Controller
public class InstalledEmissionAction extends BaseAction {
	private ResInstalledEmissionService service;

	Message message = null;

	public ResInstalledEmissionService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResInstalledEmissionService service) {
		this.service = service;
	}

	/**
	 * 插入排放绩效 、装机容量区间范围
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addInstalledEmission")
	public void addInstalledEmission(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String pollutantCode = request.getParameter("pollutantCode");
			int operatorType = Integer.parseInt(request.getParameter("operatorType"));
			String min = request.getParameter("min");
			String max = request.getParameter("max");
			ResInstalledEmission bean = new ResInstalledEmission();
			String content;
			float minValue = -1;
			float maxValue = -1;
			// 当最小值为 空或0 的时候
			if (min == null || "".equals(min) || "0".equals(min)) {
				minValue = 0;
			} else {
				minValue = Float.parseFloat(min);
			}
			if (!(max == null || "".equals(max))) {
				maxValue = Float.parseFloat(max);
			}
			// 当没有最大值的时候 或最大值 小于 最小值的时候
			if (maxValue == -1 && minValue > 0) {
				if(operatorType == 1){
					//content = ">" + minValue + "MW";
					content = ">" + minValue;
				}else{
					content = ">" + minValue + "g/kWh";
				}
				bean.setMin(minValue);
				bean.setContent(content);
				bean.setPollutantCode(pollutantCode);
			} else if (maxValue != -1 && maxValue > minValue) {
				if(operatorType == 1){
					//content = minValue + "-" + maxValue + "MW";
					content = minValue + "-" + maxValue;
				}else{
					content = minValue + "-" + maxValue + "g/kWh";
				}
				bean.setMin(minValue);
				bean.setMax(maxValue);
				bean.setContent(content);
				bean.setPollutantCode(pollutantCode);
			} else {
				message.setFlag(ResConst.MAXMINVALUE);
				message.setMessage(ResConst.MAXMIN);
				response.getWriter().print(JSONArray.toJSON(message));
			}

			// 插入数据
			if (!service.addResInstalledEmission(bean, operatorType)) {
				message.setFlag(ResConst.UNNORMALVALUE);
				message.setMessage(ResConst.UNNORMAL);
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取排放绩效 、装机容量区间范围
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getInstalledEmission")
	public void getInstalledEmission(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String pollutantCode = request.getParameter("pollutantCode");
			int operatorType = Integer.parseInt(request.getParameter("operatorType"));
			// 获取数据
			List<ResInstalledEmission> beans = service.getResInstalledEmission(pollutantCode, operatorType);
			response.getWriter().print(JSONArray.toJSON(beans));
			System.out.println(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
