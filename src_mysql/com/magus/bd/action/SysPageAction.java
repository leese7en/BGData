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
import com.magus.bd.entity.SysPage;
import com.magus.bd.service.PageService;
import com.magus.bd.service.SysUserPageService;
import com.magus.bd.util.Message;
import com.magus.bd.utils.SysPageUtils;

@Controller
public class SysPageAction extends BaseAction {
	@Autowired
	private PageService service;

	@Autowired
	private SysUserPageService userPageservice;
	Message message = null;

	/**
	 * 模糊查询部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/blurryPage")
	public void blurryPage(HttpServletRequest request, HttpServletResponse response) {
		try {
			String pageName = request.getParameter("pageName");
			String pageDesc = request.getParameter("pageDesc");
			String prePageId = request.getParameter("prePageId");
			String pageTypeId = request.getParameter("pageTypeId");
			SysPage page = new SysPage();
			page.setPageName(pageName);
			page.setDescription(pageDesc);
			if (!(prePageId == null || "-1".equals(prePageId))) {
				page.setPrePageId(Integer.parseInt(prePageId));
			}
			if (!(pageTypeId == null || "-1".equals(pageTypeId) || "".equals(pageTypeId))) {
				page.setPageTypeId(Integer.parseInt(pageTypeId));
			}
			List<SysPage> pages = service.blurryPage(page);
			message = new Message();
			if (pages == null || pages.size() < 1) {
				message.setFlag(-1);
				message.setMessage("没有查到对应的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(pages);
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
	@RequestMapping("/addPage")
	public void addPage(HttpServletRequest request, HttpServletResponse response) {
		try {
			message = new Message();
			String prePageId = request.getParameter("prePageId");
			String pageName = request.getParameter("pageName");
			if ("-1".equals(prePageId)) {
				prePageId = "0";
			}

			String url = request.getParameter("url");
			String pageTypeId = request.getParameter("pageTypeId");
			String pageIcon = request.getParameter("pageIcon");
			String pageOrder = request.getParameter("pageOrder");
			String pageDesc = request.getParameter("pageDesc");
			SysPage page = new SysPage();
			page.setPageName(pageName);
			page.setPrePageId(Integer.parseInt(prePageId));
			if (service.getPageByName(page) > 0) {
				message.setFlag(-1);
				message.setMessage("同一级菜单下存在相同名称的菜单");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}

			page.setUrl(url);
			page.setIcon(pageIcon);
			page.setOrderCode(pageOrder);
			page.setDescription(pageDesc);
			page.setPageTypeId(Integer.parseInt(pageTypeId));
			int result = service.addPage(page);
			message = new Message();
			if (result == 1) {
				message.setFlag(0);
			} else {
				message.setFlag(result);
				message.setMessage("添加失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 获取所有可以作为父级菜单的page
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getAllPrePage")
	public void getAllPrePage(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<SysPage> pages = service.getAllPrePage();
			response.getWriter().print(JSONArray.toJSON(SysPageUtils.pageFormat(pages)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	@RequestMapping("/editPage")
	public void editPage(HttpServletRequest request, HttpServletResponse response) {
		try {
			String pageId = request.getParameter("pageId");
			String pageName = request.getParameter("pageName");
			SysPage bean = new SysPage();
			bean.setPageId(Integer.parseInt(pageId));
			SysPage page = service.getPageById(bean);
			message = new Message();
			if (!page.getPageName().equals(pageName)) {
				page.setPageName(pageName);
				if (service.getPageByName(page) > 0) {
					message.setFlag(-1);
					message.setMessage("同一级菜单下存在相同名称的菜单");
					response.getWriter().print(JSONArray.toJSON(message));
					return;
				}
			}
			String prePageId = request.getParameter("prePageId");
			String url = request.getParameter("url");
			String icon = request.getParameter("pageIcon");
			String pageTypeId = request.getParameter("pageTypeId");
			String pageOrder = request.getParameter("pageOrder");
			String pageDesc = request.getParameter("pageDesc");
			page.setPageId(Integer.parseInt(pageId));
			page.setPrePageId(Integer.parseInt(prePageId));
			page.setPageName(pageName);
			page.setUrl(url);
			page.setIcon(icon);
			page.setOrderCode(pageOrder);
			page.setDescription(pageDesc);
			page.setPageTypeId(Integer.parseInt(pageTypeId));
			JSONObject object = service.editPage(page);
			message.setFlag(object.getIntValue("flag"));
			message.setMessage(object.getString("message"));
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据id获取
	 */
	@RequestMapping("/getPageById")
	public void getPageById(HttpServletRequest request, HttpServletResponse response) {
		try {
			int id = Integer.parseInt(request.getParameter("pageId"));
			SysPage bean = new SysPage();
			bean.setPageId(id);
			SysPage page = service.getPageById(bean);
			message = new Message();
			if (page == null) {
				message.setFlag(-1);
				message.setMessage("获取数据失败");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(page);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
