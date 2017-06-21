package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.AuthorityDao;
import com.magus.bd.dao.MenuDao;
import com.magus.bd.entity.SysPage;
import com.magus.bd.service.MenuService;

@Service("menuService")
public class MenuServiceImpl implements MenuService {
	private MenuDao mapper;
	private AuthorityDao authMapper;

	public MenuDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(MenuDao mapper) {
		this.mapper = mapper;
	}

	public AuthorityDao getAuthMapper() {
		return authMapper;
	}

	@Autowired
	public void setAuthMapper(AuthorityDao authMapper) {
		this.authMapper = authMapper;
	}

	/**
	 * 获取菜单
	 */
	public List<SysPage> getMenu(int userId) {

		// 获取所有的 菜单信息
		// List<Menu> allMenu = mapper.getChildMenu();
		// // 获取所拥有的 菜单信息
		// List<Authority> onwerMenu = authMapper.getMenuAuthority(userId);
		//
		// // 格式化菜单信息
		// List<MenusUser> menusUserList = AuthorityUtils.initMenus(allMenu,
		// onwerMenu);
		// List<String> menuNames = new ArrayList<String>();
		//
		// for (MenusUser menuUser : menusUserList) {
		// if (menuUser.getFlag() == 0) {
		// menuNames.add(menuUser.getName());
		// }
		// }
		//
		// List<Menu> menus = mapper.getMenuByNames(menuNames);
		//
		// List<Menu> menusList = new ArrayList<Menu>();
		// for (Menu menu : menus) {
		// if (menu.getPreId() == 0) {
		// for (Menu m : menus) {
		// if (m.getPreId() == menu.getId()) {
		// List<Menu> mm = menu.getChildren();
		// if (mm == null) {
		// mm = new ArrayList<Menu>();
		// }
		// mm.add(m);
		// menu.setChildren(mm);
		// }
		// }
		// menusList.add(menu);
		// }
		// }
		return null;

	}
}
