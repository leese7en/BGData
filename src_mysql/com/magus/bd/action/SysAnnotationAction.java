package com.magus.bd.action;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.ResIndustryCon;
import com.magus.bd.entity.SysAnotation;
import com.magus.bd.entity.SysCity;
import com.magus.bd.entity.SysUser;
import com.magus.bd.service.ResIndustryConService;
import com.magus.bd.service.SysAnnotationService;
import com.magus.bd.util.DateUtils;
import com.magus.bd.util.Message;

@Controller
public class SysAnnotationAction extends BaseAction {
	private SysAnnotationService service;

	Message message = null;

	public SysAnnotationService getServices() {
		return service;
	}

	@Autowired
	public void setServices(SysAnnotationService service) {
		this.service = service;
	}

	/**
	 * 查询批注信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getAnnotation")
	public void getAnnotation(HttpServletRequest request, HttpServletResponse response) {
		try {
			String beginTime = request.getParameter("beginTime");
			String endTime = request.getParameter("endTime");
			String viewPoint = request.getParameter("viewPoint");
			String pollOrSulfur = request.getParameter("pollOrSulfur");
			SysAnotation bean = new SysAnotation();
			bean.setBeginTime(beginTime);
			bean.setEndTime(endTime);
			bean.setGroupOrCity(Integer.parseInt(viewPoint));
			bean.setPollOrSulfur(Integer.parseInt(pollOrSulfur));
			List<SysAnotation> beans = service.getAnnotation(bean);
			int count  = service.getAnnotationCount(bean);
			JSONObject obj = new JSONObject();
			obj.put("rows", beans);
			obj.put("total", count);
			response.getWriter().print(obj);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 添加批注
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addAnotation")
	public void addAnotation(HttpServletRequest request, HttpServletResponse response) {
		try {
			String pollOrSulfur = request.getParameter("pollOrSulfur");
			String pollutant=request.getParameter("pollutant");
			String viewPoint = request.getParameter("viewPoint");
			String groupIdOrCityId = request.getParameter("groupIdOrCityId");
			String time = request.getParameter("time");
			//SimpleDateFormat sdf =   new SimpleDateFormat( "yyyy-MM-dd HH:mm:ss" ); 
			//String time = sdf.format(new Date()); 
			String year = time.substring(0,4);
			String month = time.substring(0,7);
			String content = request.getParameter("content");
			SysUser sysUser=(SysUser) request.getSession().getAttribute("user");
			int annotationUserId=sysUser.getUserId();
			SysAnotation bean = new SysAnotation();

			bean.setPollOrSulfur(Integer.parseInt(pollOrSulfur));
			bean.setPollutant(pollutant);
			bean.setGroupOrCity(Integer.parseInt(viewPoint));
			bean.setGroupIdOrCityId(groupIdOrCityId);
			bean.setYear(year);
			bean.setMonth(month);
			bean.setContent(content);
			bean.setCreateDate(DateUtils.dataFormat(new Date()));
			bean.setIsDelete(0);
			bean.setAnnotationUserId(annotationUserId+"");
			int result = service.addAnotation(bean);
			message = new Message();
			if (result == 1) {
				message.setFlag(0);
			} else {
				message.setFlag(-1);
				message.setMessage("添加失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (Exception e) {
			e.printStackTrace();
		}

	}
	
	/**
	 * 根据id查批注信息
	 */
	@RequestMapping("/getAnnotationById")
	public void getAnnotationById(HttpServletRequest request, HttpServletResponse response) {
		int id = Integer.parseInt(request.getParameter("id"));
		SysAnotation bean =service.getAnnotationById(id);
		
		try {
			response.getWriter().print(JSONArray.toJSON(bean));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 编辑批注信息信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/editAnnotation")
	public void editAnnotation(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String id = request.getParameter("id");
			String pollOrSulfur = request.getParameter("pollOrSulfur");
			String pollutant=request.getParameter("pollutant");
			String viewPoint = request.getParameter("viewPoint");
			String groupIdOrCityId = request.getParameter("groupIdOrCityId");
			String time = request.getParameter("time"); 
			String year = time.substring(0,4);
			String month = time.substring(0,7);
			String content = request.getParameter("content");
			SysAnotation bean = new SysAnotation();

			bean.setId(id);
			bean.setPollOrSulfur(Integer.parseInt(pollOrSulfur));
			bean.setPollutant(pollutant);
			bean.setGroupOrCity(Integer.parseInt(viewPoint));
			bean.setGroupIdOrCityId(groupIdOrCityId);
			bean.setYear(year);
			bean.setMonth(month);
			bean.setContent(content);
			bean.setCreateDate(DateUtils.dataFormat(new Date()));
			if (service.editAnnotation(bean)) {
				message.setFlag(0);
			} else {
				message.setFlag(-1);
				message.setMessage("编辑失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	
	/**
	 * 删除用户
	 */
	@RequestMapping("/deleteAnnotation")
	public void removeAnnotation(HttpServletRequest request, HttpServletResponse response) {
		try {
			String id = request.getParameter("id");
			boolean result = service.removeAnotation(id);
			message = new Message();
			if (result) {
				message.setFlag(0);
			} else {
				message.setFlag(-1);
				message.setMessage("删除失败");
			}
			response.getWriter().print(JSON.toJSON(message));

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
