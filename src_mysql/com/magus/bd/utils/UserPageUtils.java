package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.magus.bd.entity.SysPage;
import com.magus.bd.entity.SysRole;
import com.magus.bd.entity.SysUserPage;
import com.magus.bd.vo.UserPage;

public class UserPageUtils {
	/**
	 * 操作用户菜单的时候格式化
	 * 
	 * @param menus
	 * @param onwerMenus
	 * @return
	 */
	public static List<SysUserPage> initMenus(List<SysPage> menus, List<SysUserPage> onwerMenus) {
		List<SysUserPage> menusUserList = new ArrayList<SysUserPage>();
		SysUserPage userPage = null;
		for (int i = 0; i < menus.size(); i++) {
			SysPage page = menus.get(i);
			userPage = new SysUserPage();
			userPage.setPageId(page.getPageId());
			userPage.setPageName(page.getPageName());
			userPage.setDesciption(page.getDescription());
			userPage.setUrl(page.getUrl());
			for (int j = 0; j < onwerMenus.size(); j++) {
				if (page.getPageId() == onwerMenus.get(j).getPageId()) {
					userPage.setFlag(1);
				}
			}
			menusUserList.add(userPage);
		}
		return menusUserList;
	}

	/**
	 * 获取用户菜单
	 * 
	 * @param menus
	 * @param onwerMenus
	 * @return
	 */
	public static Set<Integer> initUserMenus(List<SysPage> allPage, List<SysUserPage> childPage) {
		Set<Integer> allPageId = new HashSet<Integer>();
		for (SysUserPage userPage : childPage) {
			formatTree(allPageId, allPage, userPage.getPageId());
		}
		return allPageId;
	}

	/**
	 * 获取菜单的所有节点集合
	 * 
	 * @param all
	 * @param menus
	 * @param pageId
	 * @return
	 */
	public static Set<Integer> formatTree(Set<Integer> all, List<SysPage> menus, int pageId) {
		for (SysPage p : menus) {
			if (pageId == p.getPageId()) {
				all.add(pageId);
				if (p.getPrePageId() == 0) {
					return all;
				}
				return formatTree(all, menus, p.getPrePageId());
			}
		}
		return all;
	}

	/**
	 * 构建 菜单结构
	 * 
	 * @param pages
	 * @return
	 */
	public static List<UserPage> formatUserMenus(List<SysPage> pages) {
		List<UserPage> menus = new ArrayList<UserPage>();
		for (SysPage page : pages) {
			UserPage p = new UserPage(page.getPageId(), page.getPrePageId(), page.getPageName(), page.getIcon(), page.getUrl());
			if (page.getPrePageId() == 0) {
				p.setIcon(page.getIcon());
			}
			menus.add(p);
		}
		return menus;
	}

	/**
	 * 格式化 用户菜单和 角色菜单信息
	 * 
	 * @param userPage
	 * @param rolePage
	 * @return
	 */
	public static List<SysUserPage> formatPageAndRole(List<SysUserPage> userPage, List<SysRole> rolePage) {
		for (SysRole role : rolePage) {
			SysUserPage page = new SysUserPage();
			page.setPageId(role.getPageId());
			userPage.add(page);
		}
		return userPage;
	}

}
