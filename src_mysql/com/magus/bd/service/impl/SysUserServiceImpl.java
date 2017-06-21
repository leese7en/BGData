package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.magus.bd.dao.SysUserDao;
import com.magus.bd.entity.SysUser;
import com.magus.bd.global.GlobalPara;
import com.magus.bd.service.SysUserService;

@Service("userService")
public class SysUserServiceImpl implements SysUserService {
	private SysUserDao mapper;

	public SysUserDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(SysUserDao mapper) {
		this.mapper = mapper;
	}

	public SysUser getUser(String name) {
		return mapper.getUser(name);
	}

	public JSONObject blurryUser(SysUser user) {
		List<SysUser> users = mapper.blurryUser(user);
		JSONObject  obj = new JSONObject();
		if (!(users == null || users.size() < 1)) {
			int count = mapper.blurryUserCount(user);
			obj.put(GlobalPara.rows, users);
			obj.put(GlobalPara.total, count);
		}
		else{
			obj.put(GlobalPara.rows, users);
			obj.put(GlobalPara.total, 0);
		}
		return obj;
	}

	public int addUser(SysUser user) {
		return mapper.addUser(user);
	}

	public int deleteUser(int userId) {

		return mapper.deleteUser(userId);
	}

	public int getUserByNameOrJobNo(SysUser user) {

		return mapper.getUserByNameOrJobNo(user);
	}

	public int resetUserPassword(SysUser user) {

		return mapper.resetUserPassword(user);
	}

	public int updateUser(SysUser user) {

		return mapper.updateUser(user);
	}

	public SysUser getUserById(int id) {

		return mapper.getUserById(id);
	}
}
