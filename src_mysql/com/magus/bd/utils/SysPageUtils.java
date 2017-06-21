package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.magus.bd.entity.SysPage;

public class SysPageUtils {

	/**
	 * 菜单格式化
	 * 
	 * @param list
	 * @return
	 */
	public static List<SysPage> pageFormat(List<SysPage> list) {
		List<SysPage> pageList = new ArrayList<SysPage>();
		List<SysPage> pageChildren = null;
		for (SysPage res : list) {
			res.setId(res.getPageId());
			res.setText(res.getPageName());
			if (res.getPrePageId() == 0) {
				pageChildren = new ArrayList<SysPage>();
				for (SysPage r : list) {
					r.setId(r.getPageId());
					r.setText(r.getPageName());
					if (r.getPrePageId() != 0) {
						if (res.getPageId() == r.getPrePageId()) {
							pageChildren.add(r);
						}
					}
				}
				res.setChildren(pageChildren);
				pageList.add(res);
			}
		}
		return pageList;
	}

	/**
	 * 菜单排序
	 * 
	 * @param list
	 * @return
	 */
	public static List<SysPage> pageFormatOrder(List<SysPage> list) {
		List<SysPage> pageList = new ArrayList<SysPage>();
		for (SysPage page : list) {
			if (page.getPrePageId() == 0 && page.getIsRecursion() == 0) {
				pageList.add(page);
				page.setIsRecursion(1);
			}
		}
		pageFormatRecursion(pageList, list);
		for (SysPage page : pageList) {
			pageFormatRecursion(page.getChildren(), list);
		}
		return pageList;
	}

	/**
	 * 递归排序
	 * 
	 * @param list
	 * @return
	 * @return
	 */
	public static void pageFormatRecursion(List<SysPage> list, List<SysPage> beans) {
		for (SysPage l : list) {
			List<SysPage> pageList = new ArrayList<SysPage>();
			for (SysPage bean : beans) {
				if (l.getPageId() == bean.getPrePageId() && bean.getIsRecursion() == 0) {
					pageList.add(bean);
				}
			}
			l.setChildren(pageList);
		}
	}
}
