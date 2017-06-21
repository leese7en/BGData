package com.magus.bd.utils;

import java.util.ArrayList;
import java.util.List;

import com.magus.bd.entity.SysDept;

public class SysDeptUtils {

	/**
	 * 构建树形 结构
	 * 
	 * @param list
	 * @param parentId
	 * @return
	 */
	public static List<SysDept> treeDeptList(List<SysDept> list, int parentId) {
		List<SysDept> childDept = new ArrayList<SysDept>();
		for (SysDept object : list) {
			int menuId = object.getDeptId();
			int pid = object.getPreDeptId();
			if (parentId == pid) {
				List<SysDept> c_node = treeDeptList(list, menuId);
				object.setChildren(c_node);
				childDept.add(object);
			}
		}
		return childDept;
	}

	/**
	 * 获取最小的父级节点
	 * 
	 * @param list
	 * @return
	 */
	public static int getDeptMinParentId(List<SysDept> list) {
		int preId = 1000000;
		for (SysDept dept : list) {
			if (dept.getPreDeptId() < preId) {
				preId = dept.getPreDeptId();
			}
		}
		return preId;
	}

	/**
	 * 菜单格式化
	 * 
	 * @param list
	 * @return
	 */
	public static List<SysDept> buildDeptTree(List<SysDept> list) {
		List<SysDept> deptList = new ArrayList<SysDept>();
		for (SysDept res : list) {
			if (res.getPreDeptId() == 0) {
				SysDeptUtils.build(res, list, deptList);
			}
		}
		return deptList;
	}

	private static void build(SysDept node, List<SysDept> list, List<SysDept> deptList) {
		List<SysDept> children = SysDeptUtils.getChildren(node, list);
		if (node.getPreDeptId() == 0) {
			deptList.add(node);
		}
		if (!children.isEmpty()) {
			node.setChildren(children);
			for (SysDept child : children) {
				SysDeptUtils.build(child, list, deptList);
			}
		}
	}

	private static List<SysDept> getChildren(SysDept node, List<SysDept> list) {
		List<SysDept> children = new ArrayList<SysDept>();
		Integer id = node.getDeptId();
		for (SysDept child : list) {
			if (id.equals(child.getPreDeptId())) {
				children.add(child);
			}
		}
		return children;
	}
}
