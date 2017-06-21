package com.magus.bd.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.SysUser;
import com.magus.bd.entity.SysUserPage;
import com.magus.bd.global.GlobalPara;
import com.magus.bd.service.SysUserPageService;
import com.magus.bd.util.Message;
import com.magus.bd.vo.UserPage;

@Controller
public class SysUserPageAction extends BaseAction {
	private SysUserPageService service;

	Message message = null;

	public SysUserPageService getServices() {
		return service;
	}

	@Autowired
	public void setServices(SysUserPageService service) {
		this.service = service;
	}

	/**
	 * 绑定用户菜单的时候获取菜单信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getMenus")
	public void getMenus(HttpServletRequest request, HttpServletResponse response) {
		try {
			HttpSession session = request.getSession();
			SysUser user = (SysUser) session.getAttribute("user");
			List<UserPage> pages = service.getMenus(3);
			response.getWriter().print(JSONArray.toJSON(pages));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 绑定用户菜单的时候获取菜单信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getUserMenus")
	public void getUserMenus(HttpServletRequest request, HttpServletResponse response) {
		try {
			String userId = request.getParameter("userId");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));
			int size = pageSize;
			int number = (pageNumber - 1) * pageSize;
			List<SysUserPage> pages = service.getUserMenus(Integer.parseInt(userId));
			JSONObject obj = new JSONObject();
			if (pages == null || pages.size() < 1) {
				obj.put(GlobalPara.rows, null);
				obj.put(GlobalPara.total, 0);
				response.getWriter().print(JSONArray.toJSON(obj));
				return;
			} else {
				int count = pages.size();
				obj = new JSONObject();
				obj.put(GlobalPara.total, count);
				if (count > number && count < (number + size)) {
					obj.put(GlobalPara.rows, pages.subList(number, count));
				} else if (count < number) {
					int temp = count / size;
					obj.put(GlobalPara.rows, pages.subList(count - temp, count));
				} else {
					obj.put(GlobalPara.rows, pages.subList(number, (number + size)));
				}
				response.getWriter().print(JSONArray.toJSON(obj));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 绑定菜单信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addUserPage")
	public void addUserPage(HttpServletRequest request, HttpServletResponse response) {
		try {
			String userId = request.getParameter("userId");
			String pageId = request.getParameter("pageId");
			SysUserPage bean = new SysUserPage();
			bean.setPageId(Integer.parseInt(pageId));
			bean.setUserId(Integer.parseInt(userId));
			int result = service.addUserPage(bean);
			message = new Message();
			if (result == 1) {
				message.setFlag(0);
			} else {
				message.setFlag(-1);
				message.setMessage("绑定失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 绑定菜单信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/deleteUserPage")
	public void deleteUserPage(HttpServletRequest request, HttpServletResponse response) {
		try {
			String userId = request.getParameter("userId");
			String pageId = request.getParameter("pageId");
			SysUserPage bean = new SysUserPage();
			bean.setPageId(Integer.parseInt(pageId));
			bean.setUserId(Integer.parseInt(userId));
			int result = service.deleteUserPage(bean);
			message = new Message();
			if (result == 1) {
				message.setFlag(0);
			} else {
				message.setFlag(-1);
				message.setMessage("绑定失败");
			}
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 绑定菜单信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/deletePage")
	public void deletePage(HttpServletRequest request, HttpServletResponse response) {
		try {
			String pageId = request.getParameter("pageId");
			SysUserPage bean = new SysUserPage();
			bean.setPageId(Integer.parseInt(pageId));
			JSONObject object = service.getPageUsing(bean);
			message = new Message();
			message.setFlag(object.getIntValue("flag"));
			message.setMessage(object.getString("message"));
			response.getWriter().print(JSONArray.toJSON(message));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
