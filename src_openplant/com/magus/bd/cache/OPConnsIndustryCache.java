package com.magus.bd.cache;

import com.magus.bd.entity.OPConnectInfo;
import com.magus.bd.utils.ConfigObject;
import com.magus.net.IOPConnect;
import com.magus.net.OPConnectsFactory;
import com.magus.net.OPPooledConnects;

public class OPConnsIndustryCache {
	private static OPPooledConnects conns = null;

	public static void init() {
		try {
			OPPooledConnects connData = null;
			if (conns != null) {
				synchronized (conns) {
					conns = connData;
				}
			} else {
				conns = connData;
			}
			OPConnectInfo opConnectInfo = ConfigObject.GLOBAL_IN_CONN_INFO;
			if (opConnectInfo != null) {
				String host = opConnectInfo.getIp();
				int port = opConnectInfo.getPort();
				String userName = opConnectInfo.getUsername();
				String password = opConnectInfo.getPassword();
				int count = opConnectInfo.getNumber();
				IOPConnect connect = null;
				try {
					conns = OPConnectsFactory.getPooledConnects(host, port, userName, password);
					conns.setMaxConn(count);
					if (conns != null) {
						connect = conns.getConnect();
					}
				} catch (Exception e) {

				} finally {
					if (conns != null) {
						conns.freeConnect(connect);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static OPPooledConnects getConns() {
		if (conns == null) {
			init();
		}
		return conns;
	}
}
