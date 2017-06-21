package com.magus.bd.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.magus.bd.entity.SysUser;

public class SessionFilter implements Filter {
	// 还没发现可以直接配置不拦截的资源，所以在代码里面来排除
	public String[] allowUrls = new String[] { "/login", "/logOut", "index.jsp" };
	public String loginUrl = "/login";

	public void destroy() {

	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

		boolean doFilter = false;
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;

		String ip = SessionFilter.getIpAddress(req);
		String path = req.getContextPath();
		String basePath = req.getScheme() + "://" + req.getServerName() + ":" + req.getServerPort() + path;
		String requestUrl = req.getRequestURI().replace(req.getContextPath(), "");
		HttpSession session = req.getSession();
		SysUser user = (SysUser) session.getAttribute("user");
		for (String url : allowUrls) {
			if (requestUrl.contains(url)) {
				chain.doFilter(request, response);
				doFilter = true;
			}
		}
		// if (requestUrl.contains(loginUrl) && user == null) {
		// doFilter = false;
		// }
		if (!doFilter) {
			if (null == user) {
				resp.setHeader("Cache-Control", "no-store");
				resp.setDateHeader("Expires", 0);
				resp.setHeader("Prama", "no-cache");
				resp.sendRedirect(basePath + "/index.jsp");
			} else {
				chain.doFilter(request, response);
			}
		}
	}

	public void init(FilterConfig filterConfig) throws ServletException {

	}

	/**
	 * 获取用户Ip
	 * 
	 * @param request
	 * @return
	 */
	public static String getIpAddress(HttpServletRequest request) {
		String ip = request.getHeader("x-forwarded-for");
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}
}
