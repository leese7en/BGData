package com.magus.bd.service;

import java.util.Date;

import com.magus.net.OPPooledConnects;

public interface TrendGetDataService {

	public String getPointsMessage(OPPooledConnects cons, String pn);

	public String getData(OPPooledConnects cons, String pn, Date from, Date to, short type, int interval,
			boolean isCanvas);

	public String getDyData(OPPooledConnects cons, String pn, String historyRedress);

	public String[] getPointNames(String pn);
}
