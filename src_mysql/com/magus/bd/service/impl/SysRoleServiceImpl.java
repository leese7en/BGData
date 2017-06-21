package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.SysPageDao;
import com.magus.bd.dao.SysRoleDao;
import com.magus.bd.entity.SysPage;
import com.magus.bd.entity.SysRole;
import com.magus.bd.global.GlobalPara;
import com.magus.bd.service.SysRoleService;
import com.magus.bd.utils.UserRoleUtils;

@Service("sysRoleService")
public class SysRoleServiceImpl implements SysRoleService {
	private SysRoleDao mapper;
	private SysPageDao pageMapper;

	public SysRoleDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(SysRoleDao mapper) {
		this.mapper = mapper;
	}

	public SysPageDao getPageMapper() {
		return pageMapper;
	}

	@Autowired
	public void setPageMapper(SysPageDao pageMapper) {
		this.pageMapper = pageMapper;
	}

	public int addRole(SysRole bean) {
		return mapper.addRole(bean);
	}

	public JSONObject blurryRole(SysRole bean) {
		List<SysRole> roles = mapper.blurryRole(bean);
		JSONObject obj = new JSONObject();
		if (!(roles == null || roles.size() < 1)) {
			int count = mapper.getBlurryCount(bean);
			obj.put(GlobalPara.rows, roles);
			obj.put(GlobalPara.total, count);
		}
		else{
			obj.put(GlobalPara.rows, roles);
			obj.put(GlobalPara.total, 0);
		}
		return obj;
	}

	public List<SysRole> getAllRole() {
		return null;
	}

	public List<SysRole> getUserRole() {
		return null;
	}

	public int deleteRole(int roleId) {
		return mapper.deleteRole(roleId);
	}

	public JSONObject getRoleMenus(SysRole role) {
		List<SysPage> pages = pageMapper.getUserPage();
		List<SysRole> rolePages = mapper.getPagesById(role);
		JSONObject obj = new JSONObject();
		List<SysRole> roleMenus = UserRoleUtils.initRolePages(pages, rolePages);
		if (!(roleMenus == null || roleMenus.size() < 1)) {
			int count = roleMenus.size();
			obj.put(GlobalPara.total, count);
			if (count > role.getPageNumber() && count < (role.getPageNumber() + role.getPageSize())) {
				obj.put(GlobalPara.rows, roleMenus.subList(role.getPageNumber(), count));
			} else if (count < role.getPageNumber()) {
				int temp = count / role.getPageSize();
				obj.put(GlobalPara.rows, roleMenus.subList(count - temp, count));
			} else {
				obj.put(GlobalPara.rows, roleMenus.subList(role.getPageNumber(), (role.getPageNumber() + role.getPageSize())));
			}
		}else{
			obj.put(GlobalPara.rows, roleMenus);
			obj.put(GlobalPara.total, 0);
			
		}
		return obj;
	}

	public int addRolePage(SysRole bean) {
		return mapper.addRolePage(bean);
	}

	public int deleteRolePage(SysRole bean) {
		return mapper.deleteRolePage(bean);
	}

	public SysRole getRoleInfoById(int roleId) {
		return mapper.getRoleInfoById(roleId);
	}

	public SysRole getRoleInfoByName(String roleName) {
		return mapper.getRoleInfoByName(roleName);
	}

	public int updateRoleInfo(SysRole role) {
		return mapper.updateRoleInfo(role);
	}

}
