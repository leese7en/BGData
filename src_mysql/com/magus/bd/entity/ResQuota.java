package com.magus.bd.entity;

public class ResQuota implements Comparable<ResQuota> {

	private int id;
	private String name;

	private int rownum;
	private String psCode;
	private String psName;
	private String cityId;
	private String cityName;
	private String psType;
	private String date;
	private float longitude;
	private float latitude;
	private float mutation;
	private float handicapping;
	private float constant;
	private float fluctuation;
	private float screenJump;
	private float effective;
	private float complete;
	private float reliable;

	private float mutationWeights;
	private float handicappingWeights;
	private float constantWeights;
	private float fluctuationWeights;
	private float screenJumpWeights;
	private float effectiveWeights;
	private float completeWeights;
	private float reliableWeights;

	private float total;
	private String createDate;
	private int pageNumber;
	private int pageSize;
	private int count;
	private float distance;

	private String beginTime;
	private String endTime;
	private String waterOrGas;
	private int flag = 0;

	private int ranking;

	private String algotirhmName;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getRownum() {
		return rownum;
	}

	public void setRownum(int rownum) {
		this.rownum = rownum;
	}

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

	public String getCityId() {
		return cityId;
	}

	public void setCityId(String cityId) {
		this.cityId = cityId;
	}

	public String getCityName() {
		return cityName;
	}

	public void setCityName(String cityName) {
		this.cityName = cityName;
	}

	public String getPsType() {
		return psType;
	}

	public void setPsType(String psType) {
		this.psType = psType;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public float getLongitude() {
		return longitude;
	}

	public void setLongitude(float longitude) {
		this.longitude = longitude;
	}

	public float getLatitude() {
		return latitude;
	}

	public void setLatitude(float latitude) {
		this.latitude = latitude;
	}

	public float getMutation() {
		return mutation;
	}

	public void setMutation(float mutation) {
		this.mutation = mutation;
	}

	public float getHandicapping() {
		return handicapping;
	}

	public void setHandicapping(float handicapping) {
		this.handicapping = handicapping;
	}

	public float getConstant() {
		return constant;
	}

	public void setConstant(float constant) {
		this.constant = constant;
	}

	public float getFluctuation() {
		return fluctuation;
	}

	public void setFluctuation(float fluctuation) {
		this.fluctuation = fluctuation;
	}

	public float getScreenJump() {
		return screenJump;
	}

	public void setScreenJump(float screenJump) {
		this.screenJump = screenJump;
	}

	public float getEffective() {
		return effective;
	}

	public void setEffective(float effective) {
		this.effective = effective;
	}

	public float getComplete() {
		return complete;
	}

	public void setComplete(float complete) {
		this.complete = complete;
	}

	public float getReliable() {
		return reliable;
	}

	public void setReliable(float reliable) {
		this.reliable = reliable;
	}

	public float getMutationWeights() {
		return mutationWeights;
	}

	public void setMutationWeights(float mutationWeights) {
		this.mutationWeights = mutationWeights;
	}

	public float getHandicappingWeights() {
		return handicappingWeights;
	}

	public void setHandicappingWeights(float handicappingWeights) {
		this.handicappingWeights = handicappingWeights;
	}

	public float getConstantWeights() {
		return constantWeights;
	}

	public void setConstantWeights(float constantWeights) {
		this.constantWeights = constantWeights;
	}

	public float getFluctuationWeights() {
		return fluctuationWeights;
	}

	public void setFluctuationWeights(float fluctuationWeights) {
		this.fluctuationWeights = fluctuationWeights;
	}

	public float getScreenJumpWeights() {
		return screenJumpWeights;
	}

	public void setScreenJumpWeights(float screenJumpWeights) {
		this.screenJumpWeights = screenJumpWeights;
	}

	public float getEffectiveWeights() {
		return effectiveWeights;
	}

	public void setEffectiveWeights(float effectiveWeights) {
		this.effectiveWeights = effectiveWeights;
	}

	public float getCompleteWeights() {
		return completeWeights;
	}

	public void setCompleteWeights(float completeWeights) {
		this.completeWeights = completeWeights;
	}

	public float getReliableWeights() {
		return reliableWeights;
	}

	public void setReliableWeights(float reliableWeights) {
		this.reliableWeights = reliableWeights;
	}

	public float getTotal() {
		return total;
	}

	public void setTotal(float total) {
		this.total = total;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public float getDistance() {
		return distance;
	}

	public void setDistance(float distance) {
		this.distance = distance;
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

	public String getWaterOrGas() {
		return waterOrGas;
	}

	public void setWaterOrGas(String waterOrGas) {
		this.waterOrGas = waterOrGas;
	}

	public void compareTo() {

	}

	public int compareTo(ResQuota o) {
		return this.total < o.getTotal() ? -1 : 1;
	}

	public int getFlag() {
		return flag;
	}

	public void setFlag(int flag) {
		this.flag = flag;
	}

	public int getRanking() {
		return ranking;
	}

	public void setRanking(int ranking) {
		this.ranking = ranking;
	}

	public String getAlgotirhmName() {
		return algotirhmName;
	}

	public void setAlgotirhmName(String algotirhmName) {
		this.algotirhmName = algotirhmName;
	}

}
