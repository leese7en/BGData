package com.magus.bd.action;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.SysUser;
import com.magus.bd.service.SysUserService;
import com.magus.bd.util.DateUtils;
import com.magus.bd.util.MD5Util;
import com.magus.bd.util.Message;
import com.magus.bd.utils.ResConst;

@Controller
public class SysUserAction extends BaseAction {
	private SysUserService service;
	MD5Util md5 = new MD5Util();
	Message message = null;

	public SysUserService getServices() {
		return service;
	}

	@Autowired
	public void setServices(SysUserService service) {
		this.service = service;
	}

	/**
	 * 用户登录
	 * 
	 * @param request
	 *            返回json数据
	 * @return
	 */
	@RequestMapping("/login")
	public String loginUser(HttpServletRequest request, HttpServletResponse response) {
		try {
			String name = request.getParameter("userName");
			String password = request.getParameter("password");
			SysUser bean = service.getUser(name);
			if (bean != null && bean.getPassword().equals(md5.getMd5(password))) {
				HttpSession session = request.getSession();
				session.setAttribute("user", bean);
				return "main";
			} else {
				return "index";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "index";
		}
	}

	@RequestMapping("/getCurrentUser")
	public void getCurrentUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();
		SysUser user = (SysUser) session.getAttribute("user");
		JSONObject result = new JSONObject();
		result.put("userName", user.getUserName());
		result.put("userId", user.getUserId());
		response.getWriter().println(result.toString());
	}

	/**
	 * 添加用户
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addUser")
	public void addUser(HttpServletRequest request, HttpServletResponse response) {

		try {
			SysUser user = new SysUser();
			String userName = request.getParameter("userName");
			String jobNo = request.getParameter("jobNo");
			message = new Message();
			String password = request.getParameter("password");
			String passwd = request.getParameter("passwd");
			String deptId = request.getParameter("deptId");
			String email = request.getParameter("email");
			String phone = request.getParameter("phone");
			String desc = request.getParameter("desc");
			user.setUserName(userName);
			user.setJobNo(jobNo);
			message = new Message();
			if (!md5.getMd5(password).equals(md5.getMd5(passwd))) {
				message.setFlag(-1);
				message.setMessage("两次密码不一样");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
			if (!(user.getUserName().equals(userName) && user.getJobNo().equals(jobNo))) {
				user.setUserName(userName);
				user.setJobNo(jobNo);
				int count = service.getUserByNameOrJobNo(user);
				if (count > 0) {
					message.setFlag(-1);
					message.setMessage("用户名或登录名重复");
					response.getWriter().print(JSONObject.toJSON(message));
					return;
				}
			}
			user.setPassword(md5.getMd5(password));
			user.setDeptId(Integer.parseInt(deptId));
			user.setEmail(email);
			user.setPhone(phone);
			user.setDescription(desc);
			user.setCreateDate(DateUtils.dataFormat(new Date()));
			int result = service.addUser(user);

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
	 * 用户注销
	 * 
	 * @param request
	 * 
	 * @return
	 */
	@RequestMapping("/logOut")
	public String logOut(HttpServletRequest request) {

		HttpSession session = request.getSession();
		// 清除session
		session.invalidate();
		// 返回到登录界面
		return "index";
	}

	/**
	 * 获取所有的用户信息
	 */
	@RequestMapping("/blurryUser")
	public void blurryUser(HttpServletRequest request, HttpServletResponse response) {
		try {
			String userName = request.getParameter("userName");
			String userDesc = request.getParameter("userDesc");
			String deptId = request.getParameter("deptId");
			int pageNumber = Integer.parseInt(request.getParameter("pageNumber"));
			int pageSize = Integer.parseInt(request.getParameter("pageSize"));

			SysUser user = new SysUser();
			user.setUserName(userName);
			user.setDescription(userDesc);
			user.setPageNumber((pageNumber - 1) * pageSize);
			user.setPageSize(pageSize);
			if (!(deptId == null || "-1".equals(deptId) || "".equals(deptId))) {
				user.setDeptId(Integer.parseInt(deptId));
			}
			JSONObject obj = service.blurryUser(user);
			response.getWriter().print(JSONArray.toJSON(obj));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 验证添加用户是否存在
	 */
	@RequestMapping("/validateUser")
	public void validateUser(HttpServletRequest request, HttpServletResponse response) {
		String name = request.getParameter("name");
		SysUser user = service.getUser(name);
		JSONObject result = new JSONObject();
		if (user != null) {
			result.put("info", "用户存在");
		} else {
			result.put("info", "用户不存在");
		}
		try {
			response.getWriter().print(result);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 删除用户
	 */
	@RequestMapping("/deleteUser")
	public void removeUser(HttpServletRequest request, HttpServletResponse response) {
		try {
			int userId = Integer.parseInt(request.getParameter("userId"));
			int result = service.deleteUser(userId);
			message = new Message();
			if (result == 1) {
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

	/**
	 * 编辑用户
	 */
	@RequestMapping("/updateUser")
	public void updateUser(HttpServletRequest request, HttpServletResponse response) {
		try {
			int userId = Integer.parseInt(request.getParameter("userId"));
			String userName = request.getParameter("userName");
			String jobNO = request.getParameter("jobNo");
			SysUser user = service.getUserById(userId);
			message = new Message();
			if (!(user.getUserName().equals(userName) && user.getJobNo().equals(jobNO))) {
				user.setUserName(userName);
				user.setJobNo(jobNO);
				int count = service.getUserByNameOrJobNo(user);
				if (count > 0) {
					message.setFlag(-1);
					message.setMessage("用户名或登录名重复");
					response.getWriter().print(JSONObject.toJSON(message));
					return;
				}
			}
			String deptId = request.getParameter("deptId");
			String userDesc = request.getParameter("userDesc");
			String userEmail = request.getParameter("userEmail");
			String userPhone = request.getParameter("userPhone");
			user.setUserName(userName);
			user.setJobNo(jobNO);
			user.setDeptId(Integer.parseInt(deptId));
			user.setDescription(userDesc);
			user.setEmail(userEmail);
			user.setPhone(userPhone);

			int flag = service.updateUser(user);
			if (flag < 1) {
				message.setFlag(-1);
				message.setMessage("更新用户信息失败");
				response.getWriter().print(JSONObject.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				response.getWriter().print(JSONObject.toJSON(message));
				return;
			}

		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 编辑用户
	 */
	@RequestMapping("/resetUserPassword")
	public void resetUserPassword(HttpServletRequest request, HttpServletResponse response) {
		try {
			int userId = Integer.parseInt(request.getParameter("userId"));
			SysUser user = new SysUser();
			message = new Message();
			user.setUserId(userId);
			user.setPassword(md5.getMd5(ResConst.resetPassword));
			int flag = service.resetUserPassword(user);
			if (flag < 1) {
				message.setFlag(-1);
				message.setMessage("更新用户信息失败");
				response.getWriter().print(JSONObject.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				response.getWriter().print(JSONObject.toJSON(message));
				return;
			}

		} catch (NumberFormatException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据id获取用户
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getUserById")
	public void getUserById(HttpServletRequest request, HttpServletResponse response) {
		try {
			String userId = request.getParameter("userId");
			int id = Integer.parseInt(userId);
			SysUser user = service.getUserById(id);
			message = new Message();
			if (user == null) {
				message.setFlag(-1);
				message.setMessage("获取用户信息失败");
				response.getWriter().print(JSONObject.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(user);
				response.getWriter().print(JSONObject.toJSON(message));
			}

		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据name获取用户
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getUserByName")
	public void getUserByName(HttpServletRequest request, HttpServletResponse response) {
		String name = request.getParameter("name");
		SysUser user = service.getUser(name);
		List<SysUser> users = new ArrayList<SysUser>();
		users.add(user);
		try {
			response.getWriter().print(JSONArray.toJSON(users));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 根据name获取用户
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/changePassword")
	public void changePassword(HttpServletRequest request, HttpServletResponse response) {
		try {
			String userId = request.getParameter("userId");
			String pass = request.getParameter("pass");
			String newPasswd = request.getParameter("passNew");
			String newPasswdA = request.getParameter("passAgain");
			message = new Message();
			if (newPasswd != null && newPasswdA != null) {
				if (!md5.getMd5(newPasswd).equals(md5.getMd5(newPasswdA))) {
					message.setFlag(-1);
					message.setMessage("两次密码不一样");
					response.getWriter().print(JSONArray.toJSON(message));
					return;
				} else {
					if (!(userId == null || "".equals(userId))) {
						SysUser user = service.getUserById(Integer.parseInt(userId));
						if (!md5.getMd5(pass).equals(user.getPassword())) {
							message.setFlag(-1);
							message.setMessage("原密码不对");
							response.getWriter().print(JSONArray.toJSON(message));
							return;
						} else {
							user.setPassword(md5.getMd5(newPasswd));
							int flag = service.resetUserPassword(user);
							if (flag < 1) {
								message.setFlag(-1);
								message.setMessage("更细密码失败");
								response.getWriter().print(JSONArray.toJSON(message));
								return;
							} else {
								message.setFlag(0);
								response.getWriter().print(JSONArray.toJSON(message));
							}
						}
					}
				}
			} else {
				message.setFlag(-1);
				message.setMessage("请确认密码");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
