package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.SysPageDao;
import com.magus.bd.dao.SysRoleDao;
import com.magus.bd.dao.SysUserPageDao;
import com.magus.bd.entity.SysPage;
import com.magus.bd.entity.SysRole;
import com.magus.bd.entity.SysUserPage;
import com.magus.bd.service.PageService;

@Service("pageService")
public class SysPageServiceImpl implements PageService {
	@Autowired
	private SysPageDao mapper;
	@Autowired
	private SysRoleDao roleMapper;
	@Autowired
	private SysUserPageDao userPageMapper;

	public int addPage(SysPage page) {
		return mapper.addPage(page);
	}

	public List<SysPage> blurryPage(SysPage page) {
		return mapper.blurryPage(page);
	}

	public List<SysPage> getAllPrePage() {
		return mapper.getAllPrePage();
	}

	public SysPage getPageById(SysPage bean) {
		return mapper.getPageById(bean);
	}

	public Integer getPageByName(SysPage bean) {
		return mapper.getPageByName(bean);
	}

	public boolean removePage(int id) {
		return false;
	}

	public JSONObject editPage(SysPage page) {
		JSONObject object = new JSONObject();
		SysRole sysRole = new SysRole();
		sysRole.setPageId(page.getPageId());
		Integer rolePage = roleMapper.getRolePage(sysRole);
		if (rolePage != null && rolePage > 0) {
			object.put("flag", -1);
			object.put("message", "该页面在角色使用中");
			return object;
		}
		SysUserPage userPage = new SysUserPage();
		userPage.setPageId(page.getPageId());
		Integer num = userPageMapper.getUserPage(userPage);
		if (num != null && num > 0) {
			object.put("flag", -1);
			object.put("message", "该页面在用户使用中");
			return object;
		}
		if (mapper.editPage(page) > 0) {
			object.put("flag", 0);
			object.put("message", "编辑页面成功");
		} else {
			object.put("flag", -1);
			object.put("message", "编辑页面失败");
		}
		return object;
	}

	public int blurryPageCount(SysPage page) {

		return mapper.blurryPageCount(page);
	}

}
