package com.magus.bd.dao;

import java.util.List;

import com.magus.bd.dao.BaseDao;
import com.magus.bd.entity.Authority;

public interface AuthorityDao extends BaseDao {

	/**
	 * 获取权限
	 * 
	 * @return
	 */
	public List<Authority> getAuthority();

	/**
	 * 获取菜单
	 * 
	 * @param phone
	 * @return
	 */
	public List<Authority> getMenuAuthority(int userId);

	/**
	 * 获取文件的权限信息
	 * 
	 * @param userId
	 * @return
	 */
	public List<String> getFileAuthority(int userId);

	/**
	 * 获取对应的权限信息
	 * 
	 * @param auth
	 * @return
	 */
	public Authority getAuthorityByAuth(Authority auth);

	/**
	 * 获取用户对应的权限信息
	 * 
	 * 对应的参数是否有数据
	 * 
	 * @param authority
	 * @return
	 */
	public int checkZXML(Authority authority);

	/**
	 * 删除对应的资源权限信息，标识没有该资源的权限
	 * 
	 * @param id
	 * @return
	 */
	public int deleteAuthority(int id);

	/**
	 * 添加权限信息
	 * 
	 * @param authority
	 * @return
	 */

	public int insertAuthority(Authority authority);

	/**
	 * 批量插入
	 * 
	 * @param authList
	 * @return
	 */
	public int insertBatch(List<Authority> authList);

	/**
	 * 批量删除
	 * 
	 * @param authority
	 * @return
	 */
	public int deleteBatch(Authority authority);

	/**
	 * 删除对应的权限数据
	 * 
	 * @param authority
	 * @return
	 */
	public int deleteAuthorityFile(Authority authority);
}
