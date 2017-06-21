package com.magus.bd.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.magus.bd.dao.SysRoleDao;
import com.magus.bd.dao.SysUserRoleDao;
import com.magus.bd.entity.SysRole;
import com.magus.bd.entity.SysUserRole;
import com.magus.bd.service.SysUserRoleService;
import com.magus.bd.utils.UserRoleUtils;

@Service("userRoleService")
public class SysUserRoleServiceImpl implements SysUserRoleService {

	private SysUserRoleDao mapper;
	private SysRoleDao roleMapper;

	public SysUserRoleDao getMapper() {
		return mapper;
	}

	@Autowired
	public void setMapper(SysUserRoleDao mapper) {
		this.mapper = mapper;
	}

	public SysRoleDao getRoleMapper() {
		return roleMapper;
	}

	@Autowired
	public void setRoleMapper(SysRoleDao roleMapper) {
		this.roleMapper = roleMapper;
	}

	public int addUserRole(SysUserRole bean) {
		return mapper.addUserRole(bean);
	}

	public int deleteUserRole(SysUserRole bean) {
		return mapper.deleteUserRole(bean);
	}

	public List<SysUserRole> getUserRole(int userId) {
		List<SysUserRole> userRoles = mapper.getUserRole(userId);
		List<SysRole> roles = roleMapper.getAllRole();
		return UserRoleUtils.initUserRole(roles, userRoles);
	}

}
