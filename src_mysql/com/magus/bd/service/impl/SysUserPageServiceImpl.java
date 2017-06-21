package com.magus.bd.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.SysPageDao;
import com.magus.bd.dao.SysRoleDao;
import com.magus.bd.dao.SysUserPageDao;
import com.magus.bd.dao.SysUserRoleDao;
import com.magus.bd.entity.SysPage;
import com.magus.bd.entity.SysRole;
import com.magus.bd.entity.SysUserPage;
import com.magus.bd.entity.SysUserRole;
import com.magus.bd.service.SysUserPageService;
import com.magus.bd.utils.UserPageUtils;
import com.magus.bd.vo.UserPage;

@Service("userPageService")
public class SysUserPageServiceImpl implements SysUserPageService {

	private SysUserPageDao mapper;
	private SysPageDao pageMapper;
	private SysUserRoleDao userRoleMapper;
	private SysRoleDao roleMapper;

	public SysUserPageDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(SysUserPageDao mapper) {
		this.mapper = mapper;
	}

	public SysPageDao getPageMapper() {
		return pageMapper;
	}

	@Autowired
	public void setPageMapper(SysPageDao pageMapper) {
		this.pageMapper = pageMapper;
	}

	public SysUserRoleDao getUserRoleMapper() {
		return userRoleMapper;
	}

	@Autowired
	public void setUserRoleMapper(SysUserRoleDao userRoleMapper) {
		this.userRoleMapper = userRoleMapper;
	}

	public SysRoleDao getRoleMapper() {
		return roleMapper;
	}

	@Autowired
	public void setRoleMapper(SysRoleDao roleMapper) {
		this.roleMapper = roleMapper;
	}

	/**
	 * 用户登录 获取菜单
	 */
	public List<UserPage> getMenus(int userId) {
		List<SysPage> allPage = pageMapper.getAllPage();
		List<SysUserPage> userPage = mapper.getUserMenus(userId);
		List<SysUserRole> userRole = userRoleMapper.getUserRole(userId);
		List<Integer> roleIds = new ArrayList<Integer>();
		for (SysUserRole role : userRole) {
			roleIds.add(role.getRoleId());
		}
		List<SysRole> rolePage = roleMapper.getRolesPage(roleIds);

		userPage = UserPageUtils.formatPageAndRole(userPage, rolePage);

		Set<Integer> allPageId = UserPageUtils.initUserMenus(allPage, userPage);

		List<Integer> pageIdList = new ArrayList<Integer>(allPageId);
		List<SysPage> userPages = pageMapper.getUserPageByIds(pageIdList);

		return UserPageUtils.formatUserMenus(userPages);
	}

	/**
	 * 获取用户菜单信息
	 */
	public List<SysUserPage> getUserMenus(int userId) {
		List<SysPage> pages = pageMapper.getUserPage();
		List<SysUserPage> userPage = mapper.getUserMenus(userId);
		return UserPageUtils.initMenus(pages, userPage);
	}

	public int addUserPage(SysUserPage bean) {
		return mapper.addUserPage(bean);
	}

	public int deleteUserPage(SysUserPage bean) {
		return mapper.deleteUserPage(bean);
	}

	public JSONObject getPageUsing(SysUserPage bean) {
		JSONObject object = new JSONObject();
		SysRole sysRole = new SysRole();
		sysRole.setPageId(bean.getPageId());
		Integer rolePage = roleMapper.getRolePage(sysRole);
		if (rolePage != null && rolePage > 0) {
			object.put("flag", -1);
			object.put("message", "该页面在角色使用中");
			return object;
		}
		Integer userPage = mapper.getUserPage(bean);
		if (userPage != null && userPage > 0) {
			object.put("flag", -1);
			object.put("message", "该页面在用户使用中");
			return object;
		}
		int result = mapper.deletePage(bean);
		if (result == 0) {
			object.put("flag", -1);
			object.put("message", "删除页面失败");
		} else {
			object.put("flag", 0);
			object.put("message", "删除页面成功");
		}
		return object;
	}
}
