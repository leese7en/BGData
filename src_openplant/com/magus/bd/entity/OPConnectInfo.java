package com.magus.bd.entity;

/**
 * 
 * @author sunbo 打算把这个对象进行序列化
 * 
 */
public final class OPConnectInfo implements java.io.Serializable {

	/**
	 * 这里只是定义了实时数据库连接的实体类而已, 有5个属性: connID,userName,password,host,port 应用1:
	 * com.magus.rsa2.db.cfg.OPConnectInfo中的属性GLOBAL_CONN_INFO,
	 * 使用hibernate与sqlite数据库对应
	 */
	private int id;
	private String username;
	private String password;
	private String ip;
	private int port = 8200;
	private int number;

	public OPConnectInfo() {

	}

	public OPConnectInfo(int connID, String host, int port, String userName, String password, int connCount) {
		this.id = connID;
		this.ip = host;
		this.port = port;
		this.username = userName;
		this.password = password;

		this.number = connCount;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

}
