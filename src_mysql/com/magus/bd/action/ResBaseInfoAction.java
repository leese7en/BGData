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
import com.magus.bd.entity.ResBaseInfo;
import com.magus.bd.service.ResBaseInfoService;
import com.magus.bd.util.Message;
import com.magus.bd.util.ParseParameter;

@Controller
public class ResBaseInfoAction extends BaseAction {
	private ResBaseInfoService service;

	Message message = null;

	public ResBaseInfoService getServices() {
		return service;
	}

	@Autowired
	public void setServices(ResBaseInfoService service) {
		this.service = service;
	}

	/**
	 * 模糊查询部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/blurryBaseInfo")
	public void blurryBaseInfo(HttpServletRequest request, HttpServletResponse response) {
		try {

			ResBaseInfo bean = new ResBaseInfo();
			String psName = request.getParameter("psName");
			String cityId = request.getParameter("cityId");
			if (!(null == cityId || "".equals(cityId) || "-1".equals(cityId))) {
				bean.setCityId(cityId);
			}
			String psType = request.getParameter("psType");
			if (!(null == psType || "".equals(psType) || "-1".equals(psType))) {
				bean.setIndustryTypeName(psType);
			}
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));
			bean.setPsName(psName);
			bean.setPageNumber((pageNumber - 1) * pageSize);
			bean.setPageSize(pageSize);
			message = new Message();
			List<ResBaseInfo> beans = service.blurryBaseInfo(bean);
			if (beans == null || beans.size() < 1) {
				message.setFlag(-1);
				message.setMessage("没有获取到对应的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				int count = service.blurryCount(bean);
				JSONObject o = new JSONObject();
				o.put("count", count);
				o.put("data", beans);
				message.setFlag(0);
				message.setData(o);
				response.getWriter().print(JSONArray.toJSON(message));
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
	@RequestMapping("/addBaseInfo")
	public void addBaseInfo(HttpServletRequest request, HttpServletResponse response) {
		try {
			//
			// String prePageId = request.getParameter("prePageId");
			// String pageName = request.getParameter("pageName");
			// String url = request.getParameter("url");
			// String pageTypeId = request.getParameter("pageTypeId");
			// String pageDesc = request.getParameter("pageDesc");
			// SysPage page = new SysPage();
			// page.setPrePageId(Integer.parseInt(prePageId));
			// page.setPageName(pageName);
			// page.setUrl(url);
			// page.setDescription(pageDesc);
			// page.setPageTypeId(Integer.parseInt(pageTypeId));
			// int result = service.addPage(page);
			// message = new Message();
			// if (result == 1) {
			// message.setFlag(0);
			// } else {
			// message.setFlag(result);
			// message.setMessage("添加失败");
			// }
			// response.getWriter().print(JSONArray.toJSON(message));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 模糊查询部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getTopTen")
	public void getTopTen(HttpServletRequest request, HttpServletResponse response) {
		try {
			ParseParameter pp = ParseParameter.getParser();
			String psName = pp.parseString("psName", request);
			psName = URLDecoder.decode(psName, "UTF-8");
			ResBaseInfo bean = new ResBaseInfo();
			bean.setPsName(psName);
			List<ResBaseInfo> beans = service.getTopTen(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	

}
