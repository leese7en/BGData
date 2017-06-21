package com.magus.bd.entity;

import java.util.List;

public class ResFacHourData extends Pagination {

	private String psCode;
	private String psName;
	private String outPutCode;
	private String outPutName;
	private String pollutantCode;
	private List<String> pollutantCodes;
	private String pollutantName;
	private String monitorTime;
	private String dataType;
	private float minFlow;
	private float avgFlow;
	private float maxFlow;
	private float revisedFlow;
	private float minStrength;
	private float avgStrength;
	private float maxStrength;
	private float revisedStrength;
	private String isException;
	private String dataSource;
	private String typerUnit;
	private String typerName;
	private String availableStatus;
	private float revisedAvgFlow;
	private String reviseCause;
	private String udpateTime;
	
	private String beginTime;
	private String endTime;
	public String getPsCode() {
		return psCode;
	}
	public void setPsCode(String psCode) {
		this.psCode = psCode;
	}
	public String getPsName() {
		return psName;
	}
	public void setPsName(String psName) {
		this.psName = psName;
	}
	public String getOutPutCode() {
		return outPutCode;
	}
	public void setOutPutCode(String outPutCode) {
		this.outPutCode = outPutCode;
	}
	public String getOutPutName() {
		return outPutName;
	}
	public void setOutPutName(String outPutName) {
		this.outPutName = outPutName;
	}

	public String getPollutantCode() {
		return pollutantCode;
	}
	public void setPollutantCode(String pollutantCode) {
		this.pollutantCode = pollutantCode;
	}
	
	public List<String>  getPollutantCodes() {
		return pollutantCodes;
	}
	public void setPollutantCodes(List<String> pollutantCodes) {
		this.pollutantCodes = pollutantCodes;
	}
	public String getPollutantName() {
		return pollutantName;
	}
	public void setPollutantName(String pollutantName) {
		this.pollutantName = pollutantName;
	}
	public String getMonitorTime() {
		return monitorTime;
	}
	public void setMonitorTime(String monitorTime) {
		this.monitorTime = monitorTime;
	}
	public String getDataType() {
		return dataType;
	}
	public void setDataType(String dataType) {
		this.dataType = dataType;
	}
	public float getMinFlow() {
		return minFlow;
	}
	public void setMinFlow(float minFlow) {
		this.minFlow = minFlow;
	}
	public float getAvgFlow() {
		return avgFlow;
	}
	public void setAvgFlow(float avgFlow) {
		this.avgFlow = avgFlow;
	}
	public float getMaxFlow() {
		return maxFlow;
	}
	public void setMaxFlow(float maxFlow) {
		this.maxFlow = maxFlow;
	}
	public float getRevisedFlow() {
		return revisedFlow;
	}
	public void setRevisedFlow(float revisedFlow) {
		this.revisedFlow = revisedFlow;
	}
	public float getMinStrength() {
		return minStrength;
	}
	public void setMinStrength(float minStrength) {
		this.minStrength = minStrength;
	}
	public float getAvgStrength() {
		return avgStrength;
	}
	public void setAvgStrength(float avgStrength) {
		this.avgStrength = avgStrength;
	}
	public float getMaxStrength() {
		return maxStrength;
	}
	public void setMaxStrength(float maxStrength) {
		this.maxStrength = maxStrength;
	}
	public float getRevisedStrength() {
		return revisedStrength;
	}
	public void setRevisedStrength(float revisedStrength) {
		this.revisedStrength = revisedStrength;
	}
	public String getIsException() {
		return isException;
	}
	public void setIsException(String isException) {
		this.isException = isException;
	}
	public String getDataSource() {
		return dataSource;
	}
	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}
	public String getTyperUnit() {
		return typerUnit;
	}
	public void setTyperUnit(String typerUnit) {
		this.typerUnit = typerUnit;
	}
	public String getTyperName() {
		return typerName;
	}
	public void setTyperName(String typerName) {
		this.typerName = typerName;
	}
	public String getAvailableStatus() {
		return availableStatus;
	}
	public void setAvailableStatus(String availableStatus) {
		this.availableStatus = availableStatus;
	}
	public float getRevisedAvgFlow() {
		return revisedAvgFlow;
	}
	public void setRevisedAvgFlow(float revisedAvgFlow) {
		this.revisedAvgFlow = revisedAvgFlow;
	}
	public String getReviseCause() {
		return reviseCause;
	}
	public void setReviseCause(String reviseCause) {
		this.reviseCause = reviseCause;
	}
	public String getUdpateTime() {
		return udpateTime;
	}
	public void setUdpateTime(String udpateTime) {
		this.udpateTime = udpateTime;
	}
	public String getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}
	public String getEndTime() {
		return endTime;
	}
	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
}
