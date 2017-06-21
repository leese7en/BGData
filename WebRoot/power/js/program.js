/**
 * Created by se7en on 2015/12/2.
 */

var numberFormat = 1;
var numberFormatChart = 2;

var currentPowerUnit;
var currentDate = "2016-08";
var programId;
var option = {
	tooltip : {
		trigger : 'axis',
		axisPointer : {
			animation : false
		},
		formatter : function(params) {
			var length = params.length;
			var length = params.length;
			var tip = params[0].name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>'
						+ params[i].seriesName
						+ '年:'
						+ (params[i].value != '-' ? parseFloat(params[i].value).toFixed(numberFormatChart)
								: params[i].value);
			}
			return tip;
		}
	},
	toolbox : {
		show : false,
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : true,
				readOnly : false
			},
			magicType : {
				show : true,
				type : [ 'line', 'bar' ]
			},
			restore : {
				show : true
			},
			saveAsImage : {
				show : true
			}
		}
	},
	calculable : true,
	legend : {
		data : [ '预测排放量(t)', '预计减排量(t)', '装机容量(WM)' ],
		bottom : true
	},
	grid : {
		x : '15%',
		y : '10%',
		x2 : '16%',
		y2 : '13%'
	},
	color : [ '#5B9BD5', '#ED7D31', '#A5A5A5' ],
	xAxis : {
		type : 'category',
		data : [ '2016', '2017', '2018', '2019', '2020' ]
	},
	yAxis : [ {
		type : 'value',
		name : '排放量(t)',
		axisLabel : {
			formatter : '{value}'
		},
		scale : true
	}, {
		type : 'value',
		name : '装机总量(MW)',
		axisLabel : {
			formatter : '{value}'
		},
		scale : true
	} ],
	series : [ {
		name : '预测排放量(t)',
		type : 'bar',
		stack : '总量',
		data : [ 80588, 71865, 63167, 54538, 45907 ]
	}, {
		name : '预计减排量(t)',
		type : 'bar',
		stack : '总量',
		data : [ 8812, 8723, 8698, 8629, 8631 ]
	}, {
		name : '装机容量(WM)',
		type : 'line',
		yAxisIndex : 1,
		data : [ 51010, 51430, 51430, 51730, 52230 ]
	} ]
};

var changePowerUnitRegion = new Array();
var closePowerUnitRegion = new Array();
var newPowerUnitRegion = new Array();
var changePowerUnit = new Array();
var closePowerUnit = new Array();
var newPowerUnit = new Array();
var exportFile = false;

function op_get_url_parms() {
	var args = new Object();
	var query = decodeURI(location.search.substring(1));
	var pairs = query.split("&");
	for ( var i = 0; i < pairs.length; i++) {
		var pos = pairs[i].indexOf('=');
		if (pos == -1)
			continue;
		var argname = pairs[i].substring(0, pos);
		var value = pairs[i].substring(pos + 1);
		args[argname] = unescape(value);
	}
	return args;
}
/**
 * 获取menu
 */
$(document).ready(function() {
	toastr.options.positionClass = 'toast-top-center';
	initStyle();
	initPowerDbClick();
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		startView : 'year',
		minView : 'year',
		todayHighlight : true,
		todayBtn : true,
		forceParse : false,
		allowInputToggle : true
	});
	getCity();
	$(window).resize(function() {
		initStyle();
	});
	initProgramInfo();

});

/**
 * 获取盟市 信息
 */
function getCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			var option = '';
			for ( var i in data) {
				option += '<option value="' + data[i].id + '">' + data[i].cityName + '</option>';
			}
			var citySelect = '<option value="-1">全区</option>' + option;
			option = '<option value="">请选择</option>' + option;
			$('#cityId').html(option);
			$('#cityId').selectpicker('refresh');
			$('#cityInfo').html(citySelect);
			$('#cityInfo').selectpicker('refresh');
			getIndustryGroup();
		},
		error : function() {

		}
	});
}

/**
 * 获取 集团信息
 */
function getIndustryGroup() {
	$.ajax( {
		type : 'get',
		url : '../getIndustryGroup',
		dataType : 'json',
		success : function(data) {
			var option = '';
			for ( var i in data) {
				option += '<option value="' + data[i].id + '">' + data[i].groupName + '</option>';
			}
			option = '<option value="-1">请选择</option>' + option;
			$('#groupId').html(option);
			$('#groupId').selectpicker('refresh');
		},
		error : function() {

		}
	});
}

function isRegionTab() {
	var region = $('#planTab .active').attr("value");
	if (region == 'region') {
		return true;
	} else {
		false;
	}
}
/**
 * 格式化样式
 */
function initStyle() {
	var heigth = document.documentElement.clientHeight;
	var h = heigth - 388;
	$('#regionProduction .panel-body').css('height', h);
	$('#regionReform .panel-body').css('height', h);
	$('#regionPlans .panel-body').css('height', h);
	$('#regionPlanning .panel-body').css('height', h);
	$('#otherProduction .panel-body').css('height', h);
	$('#otherReform .panel-body').css('height', h);
	$('#otherPlans .panel-body').css('height', h);
	$('#otherPlanning .panel-body').css('height', h);
	$('#mainevent').css('height', h+250);
}
/**
 * 点击机组的时候弹出框
 */
function initPowerDbClick() {
	$('.dragProduction').unbind('dbclick');
	$('.dragProduction').bind('dblclick', function(e) {
		currentPowerUnit=this;
		powerUnitInfoModel(this);
	});
	$('.dragReform').unbind('dbclick');
	$('.dragReform').bind('dblclick', function(e) {
		currentPowerUnit=this;
		powerUnitInfoModel(this);
	});
	$('.dragPlan').unbind('dbclick');
	$('.dragPlan').bind('dblclick', function(e) {
		currentPowerUnit=this;
		powerUnitInfoModel(this);
	});
	$('.dragPlanning').unbind('dbclick');
	$('.dragPlanning').bind('dblclick', function(e) {
		currentPowerUnit=this;
		powerUnitInfoModel(this);
	});
}
/**
 * 机组信息展示
 */
function powerUnitInfoModel(data) {
	var id = $(data).attr('id');
	var psCode = $(data).attr('psCode');
	var psName = $(data).attr('psName');
	$('#powerPsName').val(psName);
	var unit = $(data).attr('unit');
	$('#powerUnit').val(unit + '号机组');
	var rectificationDate = $(data).attr('rectificationDate');
	$('#rectificationDate').find('input').val(rectificationDate);
	var productionDate = $(data).attr('productionDate');
	$('#productionDate').find('input').val(productionDate);

	if(isRegionTab()){
		$('#rectificationDate').find('input').attr('disabled','true');
		$('#productionDate').find('input').attr('disabled','true');
		$('#rectificationDate').find('span').hide();
		$('#productionDate').find('span').hide();
	}else{
		$('#rectificationDate').find('input').removeAttr('disabled');
		$('#productionDate').find('input').removeAttr('disabled');
		$('#rectificationDate').find('span').show();
		$('#productionDate').find('span').show();
	}
	$('#powerUnitInfo').modal( {
		backdrop : 'static'
	});
}

/**
 * 更新机组信息
 */
function updatePowerUnitInfo(){
	if(isRegionTab()){
		currentPowerUnit = null;
		$('#powerUnitInfo').modal('hide');
	}
	var rectificationDate = $('#rectificationDate').find('input').val();
	var productionDate =$('#productionDate').find('input').val();
	if(rectificationDate>productionDate){
		toastr.warning('整改时间不能晚于投产时间!');
		return;
	}
	var psCode = $(currentPowerUnit).attr('psCode');
	var unit = $(currentPowerUnit).attr('unit');
	var flag = $(currentPowerUnit).attr('flag');
	if(flag==0){
		for(var i in changePowerUnit ){
			var powerUnit = changePowerUnit[i];
			if(powerUnit.psCode==psCode&&powerUnit.unit==unit){
				if(powerUnit.rectificationDate ==rectificationDate&& powerUnit.productionDate==productionDate){
					currentPowerUnit = null;
					$('#powerUnitInfo').modal('hide');
					return ;
				}else{
					powerUnit.rectificationDate=rectificationDate;
					powerUnit.productionDate=productionDate;
					$(currentPowerUnit).attr('rectificationDate',rectificationDate);
					$(currentPowerUnit).attr('productionDate',productionDate);
					updatePowerUnitState();
				}
			}
		}
	}else if(flag==1){
		for(var i in closePowerUnit ){
			var powerUnit = closePowerUnit[i];
				if(powerUnit.psCode==psCode&&powerUnit.unit==unit){
					
				if(powerUnit.rectificationDate ==rectificationDate&& powerUnit.productionDate==productionDate){
					currentPowerUnit = null;
					$('#powerUnitInfo').modal('hide');
					return ;
				}else{
					powerUnit.rectificationDate=rectificationDate;
					powerUnit.productionDate=productionDate;
					$(currentPowerUnit).attr('rectificationDate',rectificationDate);
					$(currentPowerUnit).attr('productionDate',productionDate);
					updatePowerUnitState()
				}
			}
		}
	}else if(flag==2){
		for(var i in newPowerUnit ){
			var powerUnit = newPowerUnit[i];
			if(powerUnit.psCode==psCode&&powerUnit.unit==unit){
				if(powerUnit.rectificationDate ==rectificationDate&& powerUnit.productionDate==productionDate){
					currentPowerUnit = null;
					$('#powerUnitInfo').modal('hide');
					return ;
				}else{
					powerUnit.rectificationDate=rectificationDate;
					powerUnit.productionDate=productionDate;
					$(currentPowerUnit).attr('rectificationDate',rectificationDate);
					$(currentPowerUnit).attr('productionDate',productionDate);
					updatePowerUnitState();
				}
			}
		}
	}
	else{
		return;
	}
	
	
}
/**
 * 更新机组现有的 状态，并更新位置信息
 */
function updatePowerUnitState(){
	var rectificationDate =  $(currentPowerUnit).attr('rectificationDate');
	var productionDate =$(currentPowerUnit).attr('productionDate');
	$(currentPowerUnit).removeClass('dragProduction');
	$(currentPowerUnit).removeClass('dragReform');
	$(currentPowerUnit).removeClass('dragPlan');
	if(currentDate>productionDate){
		$(currentPowerUnit).remove().appendTo($('#otherProduction .panel-body')).css('backgroundColor', '#449D44').addClass('dragProduction');
	}else if(currentDate>=rectificationDate && currentDate<=productionDate){
		$(currentPowerUnit).remove().appendTo($('#otherReform .panel-body')).css('backgroundColor', '#286090').addClass('dragReform');
	}else if(currentDate<rectificationDate){
		$(currentPowerUnit).remove().appendTo($('#otherPlans .panel-body')).css('backgroundColor', '#31B0D5').addClass('dragPlan');
	}
	currentPowerUnit = null;
	initPowerDbClick();
	$('#powerUnitInfo').modal('hide');
}
/**
 * 修改超低排放的标准
 */
function changeStandard() {
	$('#standardInfo').modal( {
		backdrop : 'static'
	});
}

/**
 * 显示新增机组的对话框
 */
function insertPowerUnitModel(){
	if(isRegionTab()){
		toastr.warning('自治区计划下不能新建');
		return;
	}
	$('#insertPowerUnitModel').modal( {
		backdrop : 'static'
	});
}
/**
 * 关闭新增机组对话框
 */
function closeInsertPowerUnitModal(){
	$('#insertPowerUnitModel').modal('hide');
}

/**
 * 关闭新增机组对话框
 */
function insertPowerUnit(){
	
	var powerCode =$('#powerCode').val();
	if(!powerCode||powerCode==''){
		toastr.warning('电厂编码不能为空');
		return;
	}
	var powerName =$('#powerName').val();
	if(!powerName||powerName==''){
		toastr.warning('电厂名称不能为空');
		return;
	}
	var cityId = $('#cityId').selectpicker('val');
	if(!cityId||cityId =='-1'){
		toastr.warning('请选择盟市');
		return;
	}
	var cityName=$("#cityId option:selected").text();
	var groupId = $('#groupId').selectpicker('val');
	if(!groupId||groupId == '-1'){
		toastr.warning('请选择集团');
		return;
	}
	var groupName = $('#groupId option:selected').text();
	var powerUnitCode =$('#powerUnitCode').val();
	if(!powerUnitCode||powerUnitCode==''){
		toastr.warning('机组编码不能为空');
		return;
	}
	var powerUnitInstalled =$('#powerUnitInstalled').val();
	if(!powerUnitInstalled||powerUnitInstalled==''){
		toastr.warning('装机容量不能为空');
		return;
	}
	var powerUnitDate =$('#powerUnitDate').find('input').val();
	if(!powerUnitDate||powerUnitDate==''){
		toastr.warning('投产时间不能为空');
		return;
	}
	
	for(var i in newPowerUnit){
		var powerUnit = newPowerUnit[i];
		if(powerCode ==powerUnit.psCode&&powerUnitCode==powerUnit.unit){
			toastr.warning('新建机组中已经存在该机组');
			return;
		}
	}
	
	var powerO = new Object();
	powerO.psCode =powerCode;
	powerO.psName = powerName;
	powerO.cityId = cityId;
	powerO.cityName  =cityName;
	powerO.groupId = groupId;
	powerO.groupName  =groupName;
	powerO.unit = powerUnitCode;
	powerO.installed=powerUnitInstalled;
	powerO.rectificationDate = powerUnitDate;
	powerO.productionDate = powerUnitDate;
	powerO.flag =2;
	newPowerUnit.push(powerO);
	var info  =powerName + ',' + powerUnitCode + '号机组,' + powerUnitInstalled + 'MW';
	var htmlPlanning = '<li class="dragPlanning" style="width: auto; list-style-type: none; cursor: pointer;" id="0" psCode="'
									+ powerCode
									+'" psName="'
									+ powerName
									+ '" unit="'
									+ powerUnitCode
									+ '" flag="'
									+ 2
									+ '" rectificationDate="'
									+ powerUnitDate
									+ '" productionDate="'
									+ powerUnitDate + '">' + info + '</li>';
	$('#otherPlanning .panel-body').append(htmlPlanning);
	initPowerDbClick();
	$('#insertPowerUnitModel').modal('hide');
}

/**
 * 保存或导出方案
 * @param {Object} val
 * @return {TypeName} 
 */
function programOperator(val) {
	/**
	 * 保存自治区计划给出提示
	 */
	if (val) {
		exportFile = true;
	}else{
		if(isRegionTab()){
		toastr.warning('自治区计划为基础方案，不能保存，请到自定义计划中保存');
		return;
	}
	}
	$('#programOperator').modal( {
		backdrop : 'static'
	});
}
/**
 * 获取基本信息，并初始化
 */
function initProgramInfo() {
	var args = op_get_url_parms();
	programId = args.programId;
	$
			.ajax( {
				url : '../getSuperlowFullView',
				type : 'get',
				data:{
					programId:programId
				},
				cache : false,
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag != 0) {
						toastr.info(data.message);
					} else {
						var value = data.data;
						initRegionProgram(value);
						var programO =value.programO; 
						if(programO){
						initOtherProgram(programO);
						}else{
							initOtherProgram(value);
						}
						initPowerDbClick();
						previewSuperlowFullView();
					}
				},
				error : function() {
					toastr.info('获取信息失败');
				}
			});
}
	/**
	 * 显示自治方案
	 * @param {Object} value
	 */
function initRegionProgram(value){
	var complete = value.complete;
	var htmlcomplete = '';
	for ( var i in complete) {
		var o = complete[i];
		var info = o.psName + ',' + o.unit + '号机组,' + o.installed + 'MW';
		var oo = new Object();
		oo.id = o.id;
		oo.psCode = o.psCode;
		oo.psName = o.psName;
		oo.cityId = o.cityId;
		oo.cityName = o.cityName;
		oo.unit = o.unit;
		oo.installed = o.installed;
		oo.rectificationDate = o.rectificationDate;
		oo.productionDate = o.productionDate;
		var flag = o.flag;
		if (flag == 0) {
			changePowerUnitRegion.push(oo)
		} else if (flag == 1) {
			closePowerUnitRegion.push(oo)
		} else {
			newPowerUnitRegion.push(oo)
		}
		htmlcomplete += '<li class="dragProduction" style="width: auto; list-style-type: none; cursor: pointer;" id="'
				+ o.id
				+ '" psCode="'
				+ o.psCode
				+'" psName="'
				+ o.psName
				+ '" unit="'
				+ o.unit
				+ '" flag="'
				+ o.flag
				+ '" rectificationDate="'
				+ o.rectificationDate
				+ '" productionDate="'
				+ o.productionDate + '">' + info + '</li>';
	}
	$('#regionProduction .panel-body').html(htmlcomplete);
	var processing = value.processing;
	var htmlprocessing = '';
	for ( var i in processing) {
		var o = processing[i];
		var info = o.psName + ',' + o.unit + '号机组,' + o.installed + 'MW';
		var oo = new Object();
		oo.id = o.id;
		oo.psCode = o.psCode;
		oo.psName = o.psName;
		oo.cityId = o.cityId;
		oo.cityName = o.cityName;
		oo.unit = o.unit;
		oo.installed = o.installed;
		oo.rectificationDate = o.rectificationDate;
		oo.productionDate = o.productionDate;
		var flag = o.flag;
		if (flag == 0) {
			changePowerUnitRegion.push(oo)
		} else if (flag == 1) {
			closePowerUnitRegion.push(oo)
		} else {
			newPowerUnitRegion.push(oo)
		}
		htmlprocessing += '<li class="dragReform" style="width: auto; list-style-type: none; cursor: pointer;"id="'
				+ o.id
				+ '" psCode="'
				+ o.psCode
				+'" psName="'
				+ o.psName
				+ '" unit="'
				+ o.unit
				+ '" flag="'
				+ o.flag
				+ '" rectificationDate="'
				+ o.rectificationDate
				+ '" productionDate="'
				+ o.productionDate + '">' + info + '</li>';
	}
	$('#regionReform .panel-body').html(htmlprocessing);
	var plan = value.plan;
	var htmlplan = '';
	for ( var i in plan) {
		var o = plan[i];
		var info = o.psName + ',' + o.unit + '号机组,' + o.installed + 'MW';
		var oo = new Object();
		oo.id = o.id;
		oo.psCode = o.psCode;
		oo.psName = o.psName;
		oo.cityId = o.cityId;
		oo.cityName = o.cityName;
		oo.unit = o.unit;
		oo.installed = o.installed;
		oo.rectificationDate = o.rectificationDate;
		oo.productionDate = o.productionDate;
		var flag = o.flag;
		if (flag == 0) {
			changePowerUnitRegion.push(oo)
		} else if (flag == 1) {
			closePowerUnitRegion.push(oo)
		} else {
			newPowerUnitRegion.push(oo)
		}
		htmlplan += '<li class="dragPlan" style="width: auto; list-style-type: none; cursor: pointer;"id="'
				+ o.id
				+ '" psCode="'
				+ o.psCode
				+'" psName="'
				+ o.psName
				+ '" unit="'
				+ o.unit
				+ '" flag="'
				+ o.flag
				+ '" rectificationDate="'
				+ o.rectificationDate
				+ '" productionDate="'
				+ o.productionDate + '">' + info + '</li>';
	}
	$('#regionPlans .panel-body').html(htmlplan);

	var planning = value.planning;
	var htmlplanning = '';
	for ( var i in planning) {
		var o = planning[i];
		var info = o.psName + ',' + o.unit + '号机组,' + o.installed + 'MW';
		var oo = new Object();
		oo.id = o.id;
		oo.psCode = o.psCode;
		oo.psName = o.psName;
		oo.cityId = o.cityId;
		oo.cityName = o.cityName;
		oo.unit = o.unit;
		oo.installed = o.installed;
		oo.rectificationDate = o.rectificationDate;
		oo.productionDate = o.productionDate;
		var flag = o.flag;
		if (flag == 0) {
			changePowerUnitRegion.push(oo)
		} else if (flag == 1) {
			closePowerUnitRegion.push(oo)
		} else {
			newPowerUnitRegion.push(oo)
		}
		htmlplanning += '<li class="dragPlanning" style="width: auto; list-style-type: none; cursor: pointer;"id="'
				+ o.id
				+ '" psCode="'
				+ o.psCode
				+'" psName="'
				+ o.psName
				+ '" unit="'
				+ o.unit
				+ '" flag="'
				+ o.flag
				+ '" rectificationDate="'
				+ o.rectificationDate
				+ '" productionDate="'
				+ o.productionDate + '">' + info + '</li>';
	}
	$('#regionPlanning .panel-body').html(htmlplanning);
	var event = value.event;
	var htmlevent = '';
	for ( var i in event) {
		var o = event[i];
		htmlevent += '<li><div class="cbp_tmicon cbp_tmicon-phone"></div><div class="cbp_tmlabel"><span>'
				+ o.time + '</span><br /><h5>' + o.content + '</h5></div></li>';
	}
	$('#mainevent .cbp_tmtimeline').html(htmlevent);
}

/**
 * g格式化显示 自定义计划
 * @param {Object} value
 */
function initOtherProgram(value){
	var complete = value.complete;
	var htmlcomplete = '';
	for ( var i in complete) {
		var o = complete[i];
		var info = o.psName + ',' + o.unit + '号机组,' + o.installed + 'MW';
		var oo = new Object();
		oo.id = o.id;
		oo.psCode = o.psCode;
		oo.psName = o.psName;
		oo.cityId = o.cityId;
		oo.cityName = o.cityName;
		oo.unit = o.unit;
		oo.installed = o.installed;
		oo.rectificationDate = o.rectificationDate;
		oo.productionDate = o.productionDate;
		var flag = o.flag;
		if (flag == 0) {
			changePowerUnit.push(oo)
		} else if (flag == 1) {
			closePowerUnit.push(oo)
		} else {
			newPowerUnit.push(oo)
		}
		htmlcomplete += '<li class="dragProduction" style="width: auto; list-style-type: none; cursor: pointer;" id="'
				+ o.id
				+ '" psCode="'
				+ o.psCode
				+'" psName="'
				+ o.psName
				+ '" unit="'
				+ o.unit
				+ '" flag="'
				+ o.flag
				+ '" rectificationDate="'
				+ o.rectificationDate
				+ '" productionDate="'
				+ o.productionDate + '">' + info + '</li>';
	}
	$('#otherProduction .panel-body').html(htmlcomplete);
	var processing = value.processing;
	var htmlprocessing = '';
	for ( var i in processing) {
		var o = processing[i];
		var info = o.psName + ',' + o.unit + '号机组,' + o.installed + 'MW';
		var oo = new Object();
		oo.id = o.id;
		oo.psCode = o.psCode;
		oo.psName = o.psName;
		oo.cityId = o.cityId;
		oo.cityName = o.cityName;
		oo.unit = o.unit;
		oo.installed = o.installed;
		oo.rectificationDate = o.rectificationDate;
		oo.productionDate = o.productionDate;
		var flag = o.flag;
		if (flag == 0) {
			changePowerUnit.push(oo)
		} else if (flag == 1) {
			closePowerUnit.push(oo)
		} else {
			newPowerUnit.push(oo)
		}
		htmlprocessing += '<li class="dragReform" style="width: auto; list-style-type: none; cursor: pointer;"id="'
				+ o.id
				+ '" psCode="'
				+ o.psCode
				+'" psName="'
				+ o.psName
				+ '" unit="'
				+ o.unit
				+ '" flag="'
				+ o.flag
				+ '" rectificationDate="'
				+ o.rectificationDate
				+ '" productionDate="'
				+ o.productionDate + '">' + info + '</li>';
	}
	$('#otherReform .panel-body').html(htmlprocessing);
	var plan = value.plan;
	var htmlplan = '';
	for ( var i in plan) {
		var o = plan[i];
		var info = o.psName + ',' + o.unit + '号机组,' + o.installed + 'MW';
		var oo = new Object();
		oo.id = o.id;
		oo.psCode = o.psCode;
		oo.psName = o.psName;
		oo.cityId = o.cityId;
		oo.cityName = o.cityName;
		oo.unit = o.unit;
		oo.installed = o.installed;
		oo.rectificationDate = o.rectificationDate;
		oo.productionDate = o.productionDate;
		var flag = o.flag;
		if (flag == 0) {
			changePowerUnit.push(oo)
		} else if (flag == 1) {
			closePowerUnit.push(oo)
		} else {
			newPowerUnit.push(oo)
		}
		htmlplan += '<li class="dragPlan" style="width: auto; list-style-type: none; cursor: pointer;"id="'
				+ o.id
				+ '" psCode="'
				+ o.psCode
				+'" psName="'
				+ o.psName
				+ '" unit="'
				+ o.unit
				+ '" flag="'
				+ o.flag
				+ '" rectificationDate="'
				+ o.rectificationDate
				+ '" productionDate="'
				+ o.productionDate + '">' + info + '</li>';
	}
	$('#otherPlans .panel-body').html(htmlplan);

	var planning = value.planning;
	var htmlplanning = '';
	for ( var i in planning) {
		var o = planning[i];
		var info = o.psName + ',' + o.unit + '号机组,' + o.installed + 'MW';
		var oo = new Object();
		oo.id = o.id;
		oo.psCode = o.psCode;
		oo.psName = o.psName;
		oo.cityId = o.cityId;
		oo.cityName = o.cityName;
		oo.unit = o.unit;
		oo.installed = o.installed;
		oo.rectificationDate = o.rectificationDate;
		oo.productionDate = o.productionDate;
		var flag = o.flag;
		if (flag == 0) {
			changePowerUnit.push(oo)
		} else if (flag == 1) {
			closePowerUnit.push(oo)
		} else {
			newPowerUnit.push(oo)
		}
		htmlplanning += '<li class="dragPlanning" style="width: auto; list-style-type: none; cursor: pointer;"id="'
				+ o.id
				+ '" psCode="'
				+ o.psCode
				+'" psName="'
				+ o.psName
				+ '" unit="'
				+ o.unit
				+ '" flag="'
				+ o.flag
				+ '" rectificationDate="'
				+ o.rectificationDate
				+ '" productionDate="'
				+ o.productionDate + '">' + info + '</li>';
	}
	$('#otherPlanning .panel-body').html(htmlplanning);
	
	var program = value.program;
	if(program){
		$('#programName').val(program.programName);
	 	$('#programUser').val(program.programUser);
	 	$('#programDesc').val(program.programDesc);
	 	$("#pollCode").val(program.polluteCode);
	}
	
}
/**
 * 预览方案统计信息
 */
function previewSuperlowFullView() {
	var pollCode = $('#pollCode option:selected').val();
	var cityInfo = $('#cityInfo option:selected').val();
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	$('#preview').css('width', width / 5 * 2 - 20);
	$('#preview').css('height', height - 240);
	var changeUnit = JSON.stringify(changePowerUnit);
	var closeUnit = JSON.stringify(closePowerUnit);
	var newUnit = JSON.stringify(newPowerUnit);
	var object = new Object();
	$.ajax( {
		type : 'post',
		url : '../previewSuperlowFullView',
		data : {
			cityInfo :cityInfo,
			pollCode : pollCode,
			changePowerUnit : changeUnit,
			closePowerUnit : closeUnit,
			newPowerUnit : newUnit
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				var value = data.data;
				option.series[0].data = value.emissions;
				option.series[1].data = value.reductions;
				option.series[2].data = value.installed;
				var myChart = echarts.init(document.getElementById('preview'));
				myChart.setOption(option);
			}
		},
		error : function() {
			toastr.error('获取信息失败');
		}
	});
}
/**
 * 预览明细信息
 */
function previewDetail() {
	var pollCode = $('#pollCode option:selected').val();
	var cityInfo = $('#cityInfo option:selected').val();
	var changeUnit = JSON.stringify(changePowerUnit);
	var closeUnit = JSON.stringify(closePowerUnit);
	var newUnit = JSON.stringify(newPowerUnit);
	$.ajax( {
		type : 'post',
		url : '../previewSuperlowFullViewDetail',
		data : {
			cityInfo:cityInfo,
			pollCode : pollCode,
			changePowerUnit : changeUnit,
			closePowerUnit : closeUnit,
			newPowerUnit : newUnit
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.info(data.message);
			} else {
				var pollName = $('#pollCode option:selected').text();
				formatFullViewDetailTable(data.data, pollName)
			}
		},
		error : function() {

		}
	});

}
/**
 * 格式化显示 方案明细信息
 * @param {Object} data
 * @param {Object} pollName
 */
function formatFullViewDetailTable(data, pollName) {
	var thead = '<thead><tr><td>序号</td><td>盟市</td><td>集团</td><td>企业名称</td><td>机组</td><td>装机容量(MW)</td><td>改造时间</td><td>完成时间</td><td>指标</td><td>1月</td><td>2月</td><td>3月</td><td>4月</td><td>5月</td><td>6月</td><td>7月</td><td>8月</td><td>9月</td><td>10月</td><td>11月</td><td>12月</td><td>合计/平均</td><td>预计减排量(t)</td></tr></thead>'
	var time = data.nowTime;
	for ( var i = 2016; i <= 2020; i++) {
		var tbody = '';
		var resultId = '#result' + i;
		$(resultId + ' .predictionYear').html('预测年份：' + i + '年');
		$(resultId + ' .preparedDate').html('编制日期：' + time);
		$(resultId + ' .pollutants').html('预测污染物：' + pollName);
		var value = data[i + ""];
		if(!value){
			tbody = '<tbody><tr style="heigth:50px;"><td colspan="23">没有数据</td></tr></tbody>';
			$(resultId + ' .tableInfo').html((thead + tbody));
			continue;
		}
		for ( var t in value) {
			var o = value[t];
			var info1 = '<tr><td rowspan="2">' + (parseInt(t) + 1) + '</td><td rowspan="2"> ' + o.cityName
					+ '</td><td rowspan="2">' + (o.groupName?o.groupName:'') + '</td><td rowspan="2">' + o.psName
					+ '</td><td rowspan="2">' + o.unit + '</td><td rowspan="2">' + o.installed
					+ '</td><td rowspan="2">' + o.rectificationDate + '</td><td rowspan="2">' + o.productionDate
					+ '</td><td>排放浓度(mg/m³)</td><td>'
					+ (o.avgConcentMonth[0] ? parseFloat(o.avgConcentMonth[0]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[1] ? parseFloat(o.avgConcentMonth[1]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[2] ? parseFloat(o.avgConcentMonth[2]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[3] ? parseFloat(o.avgConcentMonth[3]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[4] ? parseFloat(o.avgConcentMonth[4]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[5] ? parseFloat(o.avgConcentMonth[5]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[6] ? parseFloat(o.avgConcentMonth[6]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[7] ? parseFloat(o.avgConcentMonth[7]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[8] ? parseFloat(o.avgConcentMonth[8]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[9] ? parseFloat(o.avgConcentMonth[9]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[10] ? parseFloat(o.avgConcentMonth[10]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[11] ? parseFloat(o.avgConcentMonth[11]).toFixed(numberFormat) : '-')
					+ '</td><td>'
					+ (o.avgConcentMonth[12] ? parseFloat(o.avgConcentMonth[12]).toFixed(numberFormat) : '-')
					+ '</td><td>-</td></tr>'
			var info2 = '<tr><td>排放量(t)</td><td>'
					+ (o.emissionMonth[0] ? parseFloat(o.emissionMonth[0]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[1] ? parseFloat(o.emissionMonth[1]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[2] ? parseFloat(o.emissionMonth[2]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[3] ? parseFloat(o.emissionMonth[3]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[4] ? parseFloat(o.emissionMonth[4]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[5] ? parseFloat(o.emissionMonth[5]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[6] ? parseFloat(o.emissionMonth[6]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[7] ? parseFloat(o.emissionMonth[7]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[8] ? parseFloat(o.emissionMonth[8]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[9] ? parseFloat(o.emissionMonth[9]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[10] ? parseFloat(o.emissionMonth[10]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[11] ? parseFloat(o.emissionMonth[11]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.emissionMonth[12] ? parseFloat(o.emissionMonth[12]).toFixed(numberFormat) : '-') + '</td><td>'
					+ (o.reductions ? parseFloat(o.reductions).toFixed(numberFormat) : 0) + '</td></tr>'
			tbody += info1;
			tbody += info2;
		}
		tbody = '<tbody>' + tbody;
		tbody = tbody + '</tbody>';
		$(resultId + ' .tableInfo').html((thead + tbody));
	}
	$('#previewDetail').modal( {
		backdrop : 'static'
	});
}

/**
 * 显示方案明细信息
 */
function closePreviewDetailModal() {
	$('#previewDetail').modal('hide');
}
/**
 * 导出文件
 */

function exportOrSaveProgram() {
	var programName = $('#programName').val();
	if (!programName) {
		toastr.warning('请输入方案名称');
		return;
	}
	var programUser = $('#programUser').val();
	if (!programUser) {
		toastr.warning('请输出方案制作人');
		return;
	}
	var programDesc = $('#programDesc').val();
	if (!programDesc) {
		toastr.warning('请输入方案描述');
		return;
	}
	var changeUnit ;
	var closeUnit ;
	var newUnit ;
	/**
	 * 自治区计划
	 * @param {Object} data
	 * @return {TypeName} 
	 */
	if(isRegionTab()){
		changeUnit = JSON.stringify(changePowerUnitRegion);
	 	closeUnit = JSON.stringify(closePowerUnitRegion);
		newUnit = JSON.stringify(newPowerUnitRegion);
	}else{
		changeUnit = JSON.stringify(changePowerUnit);
	 	closeUnit = JSON.stringify(closePowerUnit);
		newUnit = JSON.stringify(newPowerUnit);
	}
	var pollCode = $('#pollCode option:selected').val();
	var cityInfo = $('#cityInfo option:selected').val();
	var pollName = $('#pollCode option:selected').text();
	
	if (exportFile) {
		$.ajax( {
			type : 'post',
			url : '../exportSuperlowFullView',
			data : {
				cityInfo:cityInfo,
				pollCode : pollCode,
				pollName : pollName,
				changePowerUnit : changeUnit,
				closePowerUnit : closeUnit,
				newPowerUnit : newUnit,
				programName : programName,
				programUser : programUser,
				programDesc : programDesc
			},
			dataType : 'json',
			success : function(data) {
				var flag = data.flag;
				if (flag < 0) {
					toastr.info(data.message);
					return;
				} else {
					var value = data.data;
					window.open(value.url);
				}
			},

			error : function() {

			}
		});
	} else {
		if(isRegionTab()){
			toastr.warning('自治区计划为基础方案，不能保存，请到自定义计划中保存');
			return;
		}
		$.ajax( {
			type : 'post',
			url : '../saveSuperlowFullView',
			data : {
				programId:programId,
				pollCode : pollCode,
				pollName : pollName,
				changePowerUnit : changeUnit,
				closePowerUnit : closeUnit,
				newPowerUnit : newUnit,
				programName : programName,
				programUser : programUser,
				programDesc : programDesc
			},
			dataType : 'json',
			success : function(data) {
				var flag = data.flag;
				if (flag < 0) {
					toastr.info(data.message);
					return;
				}
				toastr.success('保存方案成功!');
				$('#programOperator').modal('hide');

			},
			error : function() {

			}
		});
	}
}
/**
 * 电厂机组信息
 */
function closeStandardInfoModal() {
	/**
	 * 关闭modal窗口
	 */
	$('#standardInfo').modal('hide');
	$('#userId').val('');
	$('#userName').val('');
	$('#userNickName').val('');
	$('#userDesc').val('');
	$('#password').val('');
	$('#newPass').val('');
	$('#newPassAgain').val('');
}
/**
 * 关闭电厂机组信息窗口
 */
function closePowerUnitModal() {
	/**
	 *  关闭modal窗口
	 */
	currentPowerUnit = null;
	$('#powerUnitInfo').modal('hide');
	$('#powerPsName').val('');
	$('#powerId').val('');
	$('#powerUnit').val('');
	$('#rectificationDate').find('input').val('');
	$('#productionDate').find('input').val('');
}

/**
 * 关闭方案窗口
 */
function closeProgramOperatorModal() {
	if (exportFile) {
		exportFile = false;
	}
	/**
	 * 关闭modal窗口
	 */
	$('#programOperator').modal('hide');
	$('#userId').val('');
	$('#userName').val('');
	$('#userNickName').val('');
	$('#userDesc').val('');
	$('#password').val('');
	$('#newPass').val('');
	$('#newPassAgain').val('');
}
/**
 * 关闭方案窗口
 */
function closeProgramPreviewModal() {
	/**
	 *  关闭modal窗口
	 */
	$('#previewProgram').modal('hide');
	$('#userId').val('');
	$('#userName').val('');
	$('#userNickName').val('');
	$('#userDesc').val('');
	$('#password').val('');
	$('#newPass').val('');
	$('#newPassAgain').val('');
}