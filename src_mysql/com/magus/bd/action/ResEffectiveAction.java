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
import com.magus.bd.entity.ResEffective;
import com.magus.bd.service.ResEffectiveService;
import com.magus.bd.util.Message;
import com.magus.bd.utils.ResEffectiveUtils;

@Controller
public class ResEffectiveAction extends BaseAction {
	private ResEffectiveService service;

	Message message = null;

	public ResEffectiveService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResEffectiveService service) {
		this.service = service;
	}

	/**
	 * 获取每年的数据有效率
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getEffectiveYear")
	public void getEffectiveYear(HttpServletRequest request, HttpServletResponse response) {
		try {
			String year = request.getParameter("year").trim();
			ResEffective bean = new ResEffective();
			bean.setYear(year);
			List<ResEffective> beans = service.getEffectiveYear(bean);
			message = new Message();
			message.setFlag(0);
			if (beans == null || beans.size() < 1) {
				message.setFlag(-1);
				message.setMessage("没有满足条件的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			JSONObject object = ResEffectiveUtils.formatEffectiveYear(beans);
			message.setData(object);
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
