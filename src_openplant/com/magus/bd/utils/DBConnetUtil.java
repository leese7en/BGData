package com.magus.bd.utils;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.magus.bd.entity.OPConnectInfo;
import com.mchange.v2.c3p0.ComboPooledDataSource;

public class DBConnetUtil {
	private static BeanFactory ac = new ClassPathXmlApplicationContext("applicationContext.xml");

	public static OPConnectInfo getOPConnectInfo() {
		return getSqlLiteConn();
	}

	public static OPConnectInfo getSqlLiteConn() {
		Object b = ac.getBean("dataSource");
		ComboPooledDataSource cb = (ComboPooledDataSource) b;
		Connection conn = null;
		Statement stmt = null;
		String sql;
		OPConnectInfo info = new OPConnectInfo();
		try {
			conn = cb.getConnection();
			stmt = conn.createStatement();
			sql = "SELECT id as id ,ip as ip ,port as port ,username as username ,password as password ,number as number  from sys_openplant where id = 1";
			ResultSet rs = stmt.executeQuery(sql);// executeQuery会返回结果的集合，否则返回空值
			while (rs.next()) {
				int connID = rs.getInt("id");
				String host = rs.getString("ip");
				int port = rs.getInt("port");
				String userName = rs.getString("username");
				String password = rs.getString("password");
				int connCount = rs.getInt("number");
				info = new OPConnectInfo(connID, host, port, userName, password, connCount);
			}
		} catch (SQLException e) {
			System.out.println("mysql 操作错误");
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (stmt != null)
					stmt.close();
				if (conn != null)
					conn.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

		}
		return info;
	}
	
	public static OPConnectInfo getIndustryConn(){
		OPConnectInfo info = new OPConnectInfo(connID, host, port, userName, password, connCount);
		return info;
	}
	
	public static final int connID = 100;
	public static final String host = "10.15.208.147";
	public static final int port = 8202;
	public static final String userName = "sis";
	public static final String password = "openplant";
	public static final int connCount = 10;
	
	
}
