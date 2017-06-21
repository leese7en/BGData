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
import com.magus.bd.entity.SysPageType;
import com.magus.bd.service.PageTypeService;
import com.magus.bd.util.Message;

@Controller
public class SysPageTypeAction extends BaseAction {
	private PageTypeService service;

	Message message = null;

	public PageTypeService getServices() {
		return service;
	}

	@Autowired
	public void setServices(PageTypeService service) {
		this.service = service;
	}

	/**
	 * 模糊查询部门类型信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/blurryPageType")
	public void blurryPageType(HttpServletRequest request, HttpServletResponse response) {
		try {
			String typeName = request.getParameter("typeName");
			String typeDesc = request.getParameter("typeDesc");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));
			SysPageType bean = new SysPageType();
			bean.setTypeName(typeName);
			bean.setDescription(typeDesc);
			bean.setPageNumber((pageNumber - 1) * pageSize);
			bean.setPageSize(pageSize);
			JSONObject beans = service.blurryPageType(bean);
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 添加部门类型信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addPageType")
	public void addPageType(HttpServletRequest request, HttpServletResponse response) {
		try {
			String typeName = request.getParameter("typeName");
			String typeDesc = request.getParameter("typeDesc");
			SysPageType bean = new SysPageType();
			bean.setTypeName(typeName);
			bean.setDescription(typeDesc);
			message = new Message();
			int flag = service.getPageTypeByName(bean);
			if (flag > 0) {
				message.setFlag(-1);
				message.setMessage("存在相同名称的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			int result = service.addPageType(bean);
			if (result == 1) {
				message.setFlag(0);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(-1);
				message.setMessage("插入数据失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 添加部门类型信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/updatePageType")
	public void updatePageType(HttpServletRequest request, HttpServletResponse response) {
		try {
			String pageTypeId = request.getParameter("pageTypeId");
			String typeName = request.getParameter("pageTypeName");
			String typeDesc = request.getParameter("pageTypeDesc");
			SysPageType bean = service.getPageTypeById(Integer.parseInt(pageTypeId));
			message = new Message();
			if (bean != null) {
				if (!bean.getTypeName().equals(typeName)) {
					bean.setTypeName(typeName);
					int flag = service.getPageTypeByName(bean);
					if (flag > 0) {
						message.setFlag(-1);
						message.setMessage("存在相同名称的数据");
						response.getWriter().print(JSONArray.toJSON(message));
						return;
					}
				}
			} else {
				message.setFlag(-1);
				message.setMessage("没有找到对应的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			bean.setTypeName(typeName);
			bean.setDescription(typeDesc);
			int flag = service.updatePageType(bean);
			if (flag < 1) {
				message.setFlag(-1);
				message.setMessage("更新数据失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 添加部门类型信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getAllPageType")
	public void getAllPageType(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<SysPageType> beans = service.getAllPageType();
			response.getWriter().print(JSONArray.toJSON(beans));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据部门类型id获取部门类型
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getPageTypeById")
	public void getPageTypeById(HttpServletRequest request, HttpServletResponse response) {
		int id = Integer.parseInt(request.getParameter("pageTypeId"));
		SysPageType bean = service.getPageTypeById(id);
		try {
			response.getWriter().print(JSONArray.toJSON(bean));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 删除资源类型
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/removePageType")
	public void removePageType(HttpServletRequest request, HttpServletResponse response) {
		try {
			int id = Integer.parseInt(request.getParameter("pageTypeId"));
			int flag = service.getPageTypeInUse(id);
			message = new Message();
			if (flag > 0) {
				message.setFlag(-1);
				message.setMessage("页面类型使用中");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			if (service.removePageType(id)) {
				message.setFlag(0);
				message.setMessage("删除成功");
			} else {
				message.setFlag(-1);
				message.setMessage("删除失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
