package com.magus.bd.servlet;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;

import com.magus.bd.entity.OPConnectInfo;
import com.magus.bd.utils.ConfigObject;
import com.magus.bd.utils.DBConnetUtil;

public class OPConnectInfoServlet extends BaseServlet {

	@Override
	public void init() throws ServletException {
		super.init();
		OPConnectInfo info = DBConnetUtil.getOPConnectInfo();
		ServletContext ctx = this.getServletContext();
		ctx.setAttribute("opConnInfo", info);
		ConfigObject.GLOBAL_CONN_INFO = info;
		
		OPConnectInfo in = DBConnetUtil.getIndustryConn();
		ConfigObject.GLOBAL_IN_CONN_INFO = in;
	}
}
