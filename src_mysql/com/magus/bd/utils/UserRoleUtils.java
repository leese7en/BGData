package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.List;

import com.magus.bd.entity.SysPage;
import com.magus.bd.entity.SysRole;
import com.magus.bd.entity.SysUserRole;

public class UserRoleUtils {
	/**
	 * 角色菜单信息
	 * 
	 * @param menus
	 * @param onwerMenus
	 * @return
	 */
	public static List<SysRole> initRolePages(List<SysPage> menus, List<SysRole> roles) {
		List<SysRole> rolePages = new ArrayList<SysRole>();
		SysRole rolePage = null;
		for (int i = 0; i < menus.size(); i++) {
			SysPage page = menus.get(i);
			rolePage = new SysRole();
			rolePage.setPageId(page.getPageId());
			rolePage.setPageName(page.getPageName());
			rolePage.setDescription(page.getDescription());
			rolePage.setUrl(page.getUrl());
			for (int j = 0; j < roles.size(); j++) {
				if (page.getPageId() == roles.get(j).getPageId()) {
					rolePage.setFlag(1);
				}
			}
			rolePages.add(rolePage);
		}
		return rolePages;
	}

	/**
	 * 格式化 用户角色信息
	 * 
	 * @param roles
	 * @param userRoles
	 * @return
	 */
	public static List<SysUserRole> initUserRole(List<SysRole> roles, List<SysUserRole> userRoles) {
		List<SysUserRole> list = new ArrayList<SysUserRole>();
		SysUserRole userRole = null;
		for (int i = 0; i < roles.size(); i++) {
			SysRole role = roles.get(i);
			userRole = new SysUserRole();
			userRole.setRoleId(role.getRoleId());
			userRole.setRoleName(role.getRoleName());
			userRole.setDescription(role.getDescription());
			for (int j = 0; j < userRoles.size(); j++) {
				if (role.getRoleId() == userRoles.get(j).getRoleId()) {
					userRole.setFlag(1);
				}
			}
			list.add(userRole);
		}
		return list;
	}

}
