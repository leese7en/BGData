package com.magus.bd.service;

import java.util.List;

import com.magus.bd.entity.SysPage;

public interface MenuService {
	/**
	 * 
	 * @param phone
	 * @return
	 */
	public abstract List<SysPage> getMenu(int userId);
}
