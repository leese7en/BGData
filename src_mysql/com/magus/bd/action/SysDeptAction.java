package com.magus.bd.action;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.magus.bd.entity.SysDept;
import com.magus.bd.service.SysDeptService;
import com.magus.bd.util.Message;
import com.magus.bd.utils.SysDeptUtils;

@Controller
public class SysDeptAction extends BaseAction {
	private SysDeptService service;
	Message message = null;

	public SysDeptService getServices() {
		return service;
	}

	@Autowired
	public void setServices(SysDeptService service) {
		this.service = service;
	}

	/**
	 * 模糊查询部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/blurryDept")
	public void blurryDept(HttpServletRequest request, HttpServletResponse response) {
		try {
			String deptName = request.getParameter("deptName");
			String deptDesc = request.getParameter("deptDesc");
			SysDept dept = new SysDept();
			dept.setDeptName(deptName);
			dept.setDescription(deptDesc);
			List<SysDept> depts = service.blurryDept(dept);
			message = new Message();
			if (depts == null || depts.size() < 1) {
				message.setFlag(-1);
				message.setMessage("没有获取到对应的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				int preId = SysDeptUtils.getDeptMinParentId(depts);
				// message.setData(SysDeptUtils.treeDeptList(depts, preId));
				message.setData(depts);
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
	@RequestMapping("/getAllDept")
	public void getAllDept(HttpServletRequest request, HttpServletResponse response) {
		try {
			List<SysDept> depts = service.getAllDept();
			response.getWriter().print(JSONArray.toJSON(SysDeptUtils.buildDeptTree(depts)));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 删除部门数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/getDeptById")
	public void getDeptById(HttpServletRequest request, HttpServletResponse response) {
		try {
			String deptId = request.getParameter("deptId");
			SysDept bean = new SysDept();
			bean.setDeptId(Integer.parseInt(deptId));
			SysDept dept = service.getDeptById(bean);
			message = new Message();
			if (dept == null) {
				message.setFlag(-1);
				message.setMessage("没有获取到对应的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(0);
				message.setData(dept);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 删除部门数据
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/deleteDept")
	public void deleteDept(HttpServletRequest request, HttpServletResponse response) {
		try {

			String deptId = request.getParameter("deptId");
			SysDept bean = new SysDept();
			bean.setDeptId(Integer.parseInt(deptId));
			message = new Message();
			if (service.getDeptInUse(bean) > 0) {
				message.setFlag(-1);
				message.setMessage("当前部门在使用中");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else if (service.getDeptChild(bean) > 0) {
				message.setFlag(-1);
				message.setMessage("当前部门存在子部门");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				if (service.deleteDept(bean) > 0) {
					message.setFlag(0);
					response.getWriter().print(JSONArray.toJSON(message));
					return;
				} else {
					message.setFlag(-1);
					message.setMessage("删除失败");
					response.getWriter().print(JSONArray.toJSON(message));
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 添加部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/addDept")
	public void addDept(HttpServletRequest request, HttpServletResponse response) {
		try {
			String deptPreId = request.getParameter("deptPreId");
			String deptName = request.getParameter("deptName");
			String deptDesc = request.getParameter("deptDesc");

			SysDept bean = new SysDept();
			if ("-1".equals(deptPreId)) {
				bean.setPreDeptId(0);
			} else {
				bean.setPreDeptId(Integer.parseInt(deptPreId));
			}
			bean.setDeptName(deptName);
			bean.setDescription(deptDesc);
			message = new Message();
			if (service.getDeptByName(bean) > 0) {
				message.setFlag(-1);
				message.setMessage("当前部门下存在相同名称的数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				if (service.addDept(bean) > 0) {
					message.setFlag(0);
					response.getWriter().print(JSONArray.toJSON(message));
					return;
				} else {
					message.setFlag(-1);
					message.setMessage("添加失败");
					response.getWriter().print(JSONArray.toJSON(message));
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 更新部门信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/updateDept")
	public void updateDept(HttpServletRequest request, HttpServletResponse response) {
		try {
			String deptId = request.getParameter("deptId");
			String deptPreId = request.getParameter("deptPreId");
			String deptName = request.getParameter("deptName");
			String deptDesc = request.getParameter("deptDesc");
			message = new Message();
			SysDept bean = new SysDept();
			bean.setDeptId(Integer.parseInt(deptId));
			if ("-1".equals(deptPreId)) {
				bean.setPreDeptId(0);
			} else {
				bean.setPreDeptId(Integer.parseInt(deptPreId));
			}
			bean.setDeptName(deptName);
			bean.setDescription(deptDesc);
			SysDept dept = service.getDeptById(bean);
			if (dept == null) {
				message.setFlag(-1);
				message.setMessage("没有获取到对应数据");
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			}

			if (!dept.getDeptName().equals(deptName)) {
				if (service.getDeptByName(bean) > 0) {
					message.setFlag(-1);
					message.setMessage("当前部门下存在相同名称的数据");
					response.getWriter().print(JSONArray.toJSON(message));
					return;
				}
			}
			if (service.updateDept(bean) > 0) {
				message.setFlag(0);
				response.getWriter().print(JSONArray.toJSON(message));
				return;
			} else {
				message.setFlag(-1);
				message.setMessage("添加失败");
				response.getWriter().print(JSONArray.toJSON(message));
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
