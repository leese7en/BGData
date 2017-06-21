package com.magus.bd.action;

import java.io.IOException;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.magus.bd.entity.OPConnectInfo;
import com.magus.bd.service.OPConectService;
import com.magus.net.IOPConnect;
import com.magus.net.OPConnectsFactory;
import com.magus.net.OPSessionConnects;

@Controller
public class OPConfigAction extends BaseAction {

	private OPConectService service;
	String userName;
	String password;
	String host;
	int port;
	int connCount;
	String info;
	boolean result;// 是否连接数据库

	public OPConectService getService() {
		return service;
	}

	@Autowired
	public void setService(OPConectService service) {
		this.service = service;
	}

	public void getAjaxOPConnectInfo(HttpServletRequest request, HttpServletResponse response) {
		userName = request.getParameter("userName");
		password = request.getParameter("password");
		host = request.getParameter("host");
		port = Integer.parseInt(request.getParameter("port"));
		connCount = Integer.parseInt(request.getParameter("connCount"));
	}

	/**
	 * 获取配置信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/connectInfo_get")
	public void getOPConnectInfo(HttpServletRequest request, HttpServletResponse response) {
		OPConnectInfo opConnectInfo = service.getOPConnectInfo();
		try {
			response.getWriter().print(JSONArray.toJSON(opConnectInfo));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 保存连接信息
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/connectInfo_set")
	public void setOPConnectInfo(HttpServletRequest request, HttpServletResponse response) {
		getAjaxOPConnectInfo(request, response);
		/**
		 * 测试连接
		 */
		try {
			IOPConnect connect = null;
			OPSessionConnects conns = null;
			try {
				conns = OPConnectsFactory.getSessionConnects(host, port, userName, password);
				if (conns != null) {
					connect = conns.getConnect();
					result = (connect != null);
				}
			} catch (Exception e) {

			} finally {
				if (conns != null) {
					conns.freeConnect(connect);
				}
				conns.closeAll();
				conns = null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		OPConnectInfo opconn = new OPConnectInfo();
		opconn.setId(1);
		opconn.setIp(host);
		opconn.setPassword(password);
		opconn.setPort(port);
		opconn.setNumber(connCount);
		opconn.setUsername(userName);
		if (result) {
			result = service.setOPConnectInfo(opconn);
		} else {
			result = false;
		}
		ServletContext ctx = request.getSession().getServletContext();
		ctx.setAttribute("opConnInfo", opconn);
		info = result ? "设置成功" : "设置失败";
		JSONObject json = new JSONObject();
		json.put("info", info);
		try {
			response.getWriter().write(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 测试连接信息
	 * 
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	@RequestMapping("/connectInfo_test")
	public void testOPConnectInfo(HttpServletRequest request, HttpServletResponse response) {
		getAjaxOPConnectInfo(request, response);
		try {
			IOPConnect connect = null;
			OPSessionConnects conns = null;
			try {
				conns = OPConnectsFactory.getSessionConnects(host, port, userName, password);
				if (conns != null) {
					connect = conns.getConnect();
					result = (connect != null);
				}
			} catch (Exception e) {

			} finally {
				if (conns != null) {
					conns.freeConnect(connect);
				}
				conns.closeAll();
				conns = null;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		info = result ? "连接成功" : "连接失败";

		JSONObject json = new JSONObject();
		json.put("info", info);
		try {
			response.getWriter().write(json.toString());
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

}
