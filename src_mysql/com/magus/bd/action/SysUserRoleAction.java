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
import com.magus.bd.entity.SysUserRole;
import com.magus.bd.global.GlobalPara;
import com.magus.bd.service.SysUserRoleService;
import com.magus.bd.util.Message;

@Controller
public class SysUserRoleAction extends BaseAction {
	private SysUserRoleService service;

	Message message = null;

	public SysUserRoleService getService() {
		return service;
	}

	@Autowired
	public void setService(SysUserRoleService service) {
		this.service = service;
	}

	/**
	 * 绑定用户菜单的时候获取菜单信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getUserRole")
	public void getMenus(HttpServletRequest request, HttpServletResponse response) {
		try {
			String userId = request.getParameter("userId");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));
			int size = pageSize;
			int number = (pageNumber - 1) * pageSize;
			List<SysUserRole> userRoles = service.getUserRole(Integer.parseInt(userId));
			JSONObject obj = new JSONObject();
			if (userRoles == null || userRoles.size() < 1) {
				obj.put(GlobalPara.rows, null);
				obj.put(GlobalPara.total, 0);
				response.getWriter().print(JSONArray.toJSON(obj));
				return;
			} else {
				
				int count = userRoles.size();
				obj = new JSONObject();
				obj.put(GlobalPara.total, count);
				if (count > number && count < (number + size)) {
					obj.put(GlobalPara.rows, userRoles.subList(number, count));
				} else if (count < number) {
					int temp = count / size;
					obj.put(GlobalPara.rows, userRoles.subList(count - temp, count));
				} else {
					obj.put(GlobalPara.rows, userRoles.subList(number, (number + size)));
				}
				response.getWriter().print(JSONArray.toJSON(obj));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 绑定角色信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addUserRole")
	public void addUserRole(HttpServletRequest request, HttpServletResponse response) {
		try {

			String userId = request.getParameter("userId");
			String roleId = request.getParameter("roleId");
			SysUserRole userRole = new SysUserRole();
			userRole.setUserId(Integer.parseInt(userId));
			userRole.setRoleId(Integer.parseInt(roleId));

			int result = service.addUserRole(userRole);
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
	 * 解绑角色信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/deleteUserRole")
	public void deleteUserRole(HttpServletRequest request, HttpServletResponse response) {
		try {
			String userId = request.getParameter("userId");
			String roleId = request.getParameter("roleId");
			SysUserRole userRole = new SysUserRole();
			userRole.setUserId(Integer.parseInt(userId));
			userRole.setRoleId(Integer.parseInt(roleId));

			int result = service.deleteUserRole(userRole);
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
}
