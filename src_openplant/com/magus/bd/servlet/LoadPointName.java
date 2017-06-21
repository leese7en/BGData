package com.magus.bd.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.magus.bd.cache.OPConnsCache;
import com.magus.net.IOPConnect;
import com.magus.net.OPDB;
import com.magus.net.OPPooledConnects;
import com.magus.net.OPStaticInfo;

public class LoadPointName extends BaseServlet {
	private static int maxSize = 8;

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	@SuppressWarnings("unused")
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		// 获取参数
		String keyword = request.getParameter("KeyWord");
		PrintWriter out = response.getWriter();
		StringBuffer sb = new StringBuffer();

		OPPooledConnects conns = OPConnsCache.getConns();
		IOPConnect conn = conns.getConnect();
		// 获取所有点名
		if (conn != null) {
			try {
				conn.getServerTime();
				List<String> source = getPointGlobalNames(conn);
				// 关键字转大写
				String upCaseKey = keyword.toUpperCase();

				if (!source.isEmpty()) {
					maxSize = maxSize < source.size() ? maxSize : source.size();
					if (keyword == null) {
						// 未传入关键字
						for (int i = 0; i < maxSize; i++) {
							sb.append(source.get(i)).append("|");
						}
					} else {
						sb.append("|");
						int count = 0;
						for (int i = 0; i < source.size(); i++) {
							if (source.get(i).contains(upCaseKey)) {
								count++;
								sb.append(source.get(i)).append("|");
							}
							if (count > maxSize) {
								break;
							}
						}
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			} finally {
				conns.freeConnect(conn);
			}
		}

		out.print(sb.toString());

	}

	// 将过滤结果转换为输出到页面的HTML
	public static String toHTML(String key, List<String> source) {
		List<String> filted = filter(key, source);
		StringBuffer sb = new StringBuffer();
		for (String str : filted) {
			sb.append("点名:" + str + "\n");
		}
		return sb.toString();
	}

	// 过滤出source中所有包含key的字符串
	public static List<String> filter(String key, List<String> source) {
		String lowCaseKey = key.toLowerCase();
		List<String> result = new ArrayList<String>();
		for (String str : source) {
			if (str.toLowerCase().contains(lowCaseKey)) {
				result.add(str);
			}
		}
		return result;
	}

	/**
	 * 获得数据库下所有测点的点名
	 * 
	 * @param conn
	 * @return
	 * @throws IOException
	 */
	public static List<String> getPointGlobalNames(IOPConnect conn) throws IOException {
		List<String> pointGlobalNames = new ArrayList<String>();
		OPDB[] dbs = conn.getDBs();
		for (OPDB db : dbs) {
			String dbName = db.getName();
			Map<String, Integer> id2NodeNameMap = conn.getPointIdsMap(db.getName());
			String[] nodeNames = id2NodeNameMap.keySet().toArray(new String[id2NodeNameMap.size()]);
			Arrays.sort(nodeNames);
			for (String nodeName : nodeNames) {
				String nodeGlobalName = dbName + "." + nodeName;
				OPStaticInfo[] pointsInfo = conn.getAllPointStaticInfosByNodeName(nodeGlobalName);
				for (int i = 0; i < pointsInfo.length; i++) {
					OPStaticInfo pointInfo = pointsInfo[i];
					String pointGlobalName = nodeGlobalName + "." + pointInfo.getPN() + "-" + pointInfo.getED();
					pointGlobalNames.add(pointGlobalName);
				}
			}
		}
		return pointGlobalNames;
	}
}
