/**
 * 明細信息
 * @param {Object} value
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */

var columns=
	[ {
	field : 'id',
	title : '序号',
	align : 'center',
	formatter : function(value, row, index) {
		return index + 1;
	}
}, {
	field : 'psCode',
	title : '企业编码',
	visible:false,
	align : 'center',
	sortable:false
},  {
	field : 'psName',
	title : '企业名称',
	align : 'center',
	sortable:false
}, {
	field : 'outPutCode',
	title : '排口编码',
	visible:false,
	align : 'center',
	sortable:false
},{
	field : 'outPutName',
	title : '排口名称',
	align : 'center',
	sortable:false
},{
	field : 'pollutantCode',
	title : '污染物编码',
	visible:false,
	align : 'center',
	sortable:false
},{
	field : 'pollutantName',
	title : '污染物名称',
	align : 'center',
	sortable:false,
	formatter : 'formatPollutant',
},{
	field : 'monitorTime',
	title : '修改时间',
	visible:false,
	align : 'center'
}, {
	field : 'dataType',
	title : '数据类型',
	visible:false,
	align : 'center'
}, {
	field : 'minFlow',
	title : '最小流量',
	visible:false,
	visible:false,
	align : 'center'
}, {
	field : 'avgFlow',
	title : '平均流量',
	align : 'center',
	sortable:false
}, {
	field : 'maxFlow',
	title : '最大流量',
	visible:false,
	align : 'center'
} , {
	field : 'revisedFlow',
	title : '修正流量',
	align : 'center',
	sortable:false
} , {
	field : 'minStrength',
	title : '最小浓度',
	visible:false,
	align : 'center'
} , {
	field : 'avgStrength',
	title : '平均浓度',
	align : 'center'
} , {
	field : 'maxStrength',
	title : '最大浓度',
	visible:false,
	align : 'center'
} ,{
	field : 'revisedStrength',
	title : '修正浓度',
	align : 'center'
} ,{
	field : 'couFLow',
	title : '累计流量',
	visible:false,
	align : 'center'
}, {
	field : 'isException',
	title : '是否异常',
	align : 'center'
}, {
	field : 'dataSource',
	title : '数据来源',
	align : 'center'
}, {
	field : 'typerUnit',
	title : '修正单位',
	visible:false,
	align : 'center'
}, {
	field : 'typerName',
	title : '修正人',
	visible:false,
	align : 'center'
}, {
	field : 'availableStatus',
	title : '数据有效性判断',
	visible:false,
	align : 'center'
}, {
	field : 'revisedAvgFlow',
	title : '修正平均流量',
	visible:false,
	align : 'center'
}, {
	field : 'updateTime',
	title : '更新时间',
	visible:false,
	align : 'center'
}];


/**
 *  格式化 时间间隔
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatPollutant(val,row,index){
	if(val){
		return '<font color="green">'+val+'</font>';
	}
	else{
		return '<font color="red">流量</font>';
	}
}

var waterPolltant=[{code:'B01',name:'流量'},
				   {code:'001',name:'PH值'},
				   {code:'011',name:'化学需氧量(COD)'},
				   {code:'060',name:'氨氮'},
				   {code:'003',name:'悬浮物(SS)'},
				   {code:'070',name:'总氰'},
				   {code:'110',name:'挥发酚'},
				   {code:'101',name:'总磷'},
				   {code:'072',name:'氟化物(水)'}];
var gasPolltant=[{code:'B02',name:'流量'},
	             {code:'001',name:'烟尘'},
	             {code:'002',name:'二氧化硫'},
	             {code:'003',name:'氮氧化物'},
	             {code:'010',name:'氨'},
	             {code:'006',name:'氟化物(气)'},
	             {code:'004',name:'一氧化碳'},
	             {code:'016',name:'苯'},
	             {code:'008',name:'氯化氢'}];

$(document).ready(function() {
	$('#psTypeQuery').on('hide.bs.select', function (e) {
		var type = $('#psTypeQuery').selectpicker('val');
		if(type=='0'){
			initPolltant(waterPolltant);
		}else{
			initPolltant(gasPolltant);
		}
	});
	initPolltant(waterPolltant);
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"progressBar" : false,
		"positionClass" : "toast-top-center",
		"onclick" : null,
		"showDuration" : "300",
		"hideDuration" : "1000",
		"timeOut" : "1000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	};
	queryEnterprise();
	$('#psEnterQuery').on('hide.bs.select', function (e) {
		var pscode = $('#psEnterQuery').selectpicker('val');
		if(pscode&&pscode!='-1'){
			queryPsEnterOutputCode(pscode);
		}
	});
	
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm-dd hh',
		autoclose : true,
		startView : 'month',
		minView : 'day',
		todayHighlight : true,
		todayBtn : true,
		forceParse : false,
		allowInputToggle : true
	});
	
	var nowtime = new Date().getTime();
	$('#beginTimeQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 7, 'yyyy-MM-dd HH'));
	$('#endTimeQuery').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM-dd HH'));
//	hourDataQuery();
});

/**
 * 污染物数据
 * @param {Object} data
 */
function initPolltant(data){
	var html = '';
	var j = data.length;
	for ( var i = 0;i<j ;i++) {
		var o = data[i];
		html += '<option value="' + o.code + '">' + o.name + '</option>';
	}
	$('#pollutantCodeQuery').html(html);
	$('#pollutantCodeQuery').selectpicker('refresh');
}

/**
 * 获取 企业类型
 */
function queryEnterprise() {
	$.ajax( {
		type : 'get',
		url : '../getEnterprise',
		dataType : 'json',
		success : function(data) {
			var html = '';
			var j = data.length;
			for ( var i = 0;i<j ;i++) {
				var o = data[i];
				html += '<option value="' + o.psCode + '">' + o.psName + '</option>';
			}
			html = '<option value="-1">请选择</option>'+html;
			$('#psEnterQuery').html(html);
			$('#psEnterQuery').selectpicker('refresh');
		},
		error : function() {

		}
	});
}

/**
 * 获取企业排口数据
 */
function queryPsEnterOutputCode(psCode){
	$.ajax( {
		type : 'get',
		url : '../getResOutputCodeByPSCode',
		dataType : 'json',
		data:{psCode:psCode},
		success : function(data) {
			var html = '';
			var j = data.length;
			for ( var i = 0;i<j ;i++) {
				var o = data[i];
				html += '<option value="' + o.iOCode + '">' + o.iOName + '</option>';
			}
			$('#outPutCodeQuery').html(html);
			$('#outPutCodeQuery').selectpicker('refresh');
		},
		error : function() {

		}
	});
}

/**
 * 查询用户信息
 */
function hourDataQuery() {
	$('#facHourDataTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#facHourDataTable").bootstrapTable( {
		method : "get", //使用get请求到服务器获取数据  
		url : "../getFacHourDataInfoTable", //获取数据的Servlet地址  
		striped : true, //表格显示条纹  
		showToggle:true,
		showExport:true,
		pagination : true, //启动分页  
		pageSize : 20, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 20,50, 100, 200 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : true, //显示下拉框勾选要显示的列  
		showRefresh : true, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		columns : columns,
		exportDataType: "basic",
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
		
		var waterOrGas = $('#psTypeQuery').selectpicker('val');
		var psCode = $('#psEnterQuery').selectpicker('val');
		if(!psCode||psCode == '-1'){
			toastr.error('请选择企业');
			return ;
		}
		var outPutCode = $('#outPutCodeQuery').selectpicker('val');
		if(!outPutCode||outPutCode == '-1'){
			toastr.error('请选择排口');
			return ;
		}
		var pollutantCode = $('#pollutantCodeQuery').selectpicker('val');
		var beginTime = $('#beginTimeQuery').find('input').val();
		var endTime = $('#endTimeQuery').find('input').val();
		if(!beginTime){
			toastr.error('请输入开始时间');
			return ;
		}
		if(!endTime){
			toastr.error('请输入结束时间');
			return ;
		}
		if(beginTime>=endTime){
			toastr.error('开始时间不能晚于结束时间');
			return;
		}
			var param = {
				waterOrGas : waterOrGas,
				psCode : psCode,
				outPutCode : outPutCode,
				pollutantCode : pollutantCode,
				beginTime : beginTime,
				endTime : endTime,
				pageNumber : params.pageNumber,
				pageSize : params.pageSize
			};
			return param;
		},
		onLoadSuccess : function() { //加载成功时执行  
			toastr.success("加载成功");
		},
		onLoadError : function() { //加载失败时执行  
			toastr.error("加载数据失败");
		}
	});
}

function showUserMenu(userId) {
	if (!userId) {
		toastr.warning('请选择用户');
		return;
	}
	$('#userMenuId').val(userId)
	getUserMenus( userId);
	$('#userMenuMessage').modal( {
		backdrop : 'static'
	});
}
/**
 * 编辑 菜单权限
 */
function showDetail(dayinfo, sourceId, algorithmName,pointGN) {
	pointGlobalGN = pointGN;
	getBIResultDetail(dayinfo, sourceId, algorithmName);
	$('#biWaterResultModel').modal( {
		backdrop : 'static'
	});
}

/**
 * 关闭对话框
 */
function closeBiWaterModal(){
	$('#biWaterResultModel').modal('hide');
}

/**
 * 显示趋势信息
 * @param {Object} pointGN
 * @param {Object} beginTime
 * @param {Object} endTime
 */
function showTrend(pointGN, beginTime, endTime) {
	pointGlobalGN = pointGN
	defaultTrendGroup.defaultTrendServerName = "../trend_getData";
	defaultTrendGroup.isDialog = true;
	defaultTrendGroup.addName(pointGN.toString(), beginTime, endTime, null, null, null);
}

/**
 * 获取 明细信息
 * @param {Object} dayinfo
 * @param {Object} sourceId
 */
function getBIResultDetail(dayinfo, sourceId, algorithmName) {
	$('#biResultDetailTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#biResultDetailTable").bootstrapTable({
		method : "get", //使用get请求到服务器获取数据  
		url : "../getBIWaterResultDetail", //获取数据的Servlet地址  
		striped : true, //表格显示条纹  
		showToggle:true,
		showExport:true,
		pagination : false, //启动分页  
		search : false, //是否启用查询  
		showColumns : true, //显示下拉框勾选要显示的列  
		showRefresh : true, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		columns : detailColumns,
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				dayinfo : dayinfo,
				sourceId : sourceId
			};
			return param;
		},
		onLoadSuccess : function() { //加载成功时执行  
			toastr.success("加载成功");
		},
		onLoadError : function() { //加载失败时执行  
			toastr.error("加载数据失败");
		}
	});
}

/**
 * 日期格式化
 * @param {Object} date
 * @return {TypeName} 
 */
function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}

/**
 * 流量或浓度
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatFlow(val, row, index) {
	if (val == 0) {
		return '<font color="green">浓度</font>';
	} else {
		return '<font color="red">流量</font>';
	}
}
/**
 * 格式化 是否出现的次数
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatCount(val,row,index){
	if(row.abnormal==1&&val==0){
		return '<font color="red">出现</font>';
	}
	else if(val==0){
		return '<font color="green">'+val+'</font>';
	}
	else{
		return '<font color="red">'+val+'</font>';
	}
}

/**
 *  格式化 时间间隔
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatDistance(val,row,index){
	if(row.abnormal==1&&val==0){
		return '<font color="red">-</font>';
	}
	else if(val==0){
		return '<font color="green">'+(val/3600).toFixed(2)+'</font>';
	}
	else{
		return '<font color="red">'+(val/3600).toFixed(2)+'</font>';
	}
}