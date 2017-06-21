
/**
 * 明細信息
 * @param {Object} value
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */

var pointGlobalGN = '';

var detailColumns =
	[ {
	field : 'id',
	title : '序号',
	width : '10%',
	align : 'center',
	formatter : function(value, row, index) {
		return index + 1;
	}
},  {
	field : 'detailBeginDateTime',
	title : '开始时间',
	align : 'center'
}, {
	field : 'detailEndDateTime',
	title : '结束时间',
	align : 'center'
}, {
	field : 'distance',
	title : '时间间隔',
	align : 'center',
	formatter : 'formatDistance',
},{
	field : 'sourceId',
	title : '操作',
	align : 'center',
	formatter : 'operateDetailFormatter'
}];


var parColumns =
	[ {
	field : 'id',
	title : '序号',
	align : 'center',
	formatter : function(value, row, index) {
		return index + 1;
	}
}, {
	field : 'psName',
	title : '企业名称',
	align : 'center',
	sortable:false
}, {
	field : 'cityName',
	title : '盟市名称',
	align : 'center',
	sortable:false
}, {
	field : 'pointGN',
	title : '节点名称',
	visible:false,
	align : 'center'
}, {
	field : 'dayinfo',
	title : '日期',
	visible:false,
	align : 'center'
}, {
	field : 'sourceId',
	title : '来源',
	visible:false,
	align : 'center'
}, {
	field : 'algorithmName',
	title : '预警类型',
	align : 'center',
	sortable:false
}, {
	field : 'outputName',
	title : '排口',
	align : 'center'
} , {
	field : 'pollutantName',
	title : '污染物',
	align : 'center',
	sortable:false
} , {
	field : 'flow',
	title : '流量/浓度',
	align : 'center',
	formatter:'formatFlow'
} , {
	field : 'beginDateTime',
	title : '开始时间',
	align : 'center'
} , {
	field : 'endDateTime',
	title : '结束时间',
	align : 'center'
} , {
	field : 'count',
	title : '出现次数',
	align : 'center',
	sortable:false,
	sorter:countSort,
	formatter:'formatCount'
}, {
	field : 'distance',
	title : '时间长度(h)',
	align : 'center',
	formatter : 'formatDistance'
}, {
	field : 'sourceId',
	title : '操作',
	align : 'center',
	formatter : 'operateFormatter'
}];


function countSort(a,b){
	console.log(a);
	console.log('\t'+b);
	return b-a;
}
/**
 * 查看信息，趋势
 * @param {Object} value
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function operateFormatter(value, row, index) {
	  return [
        '<a href="javascript:void(0)" title="明细" style="color:#f0ad4e" onclick="showDetail(\'' + row.dayinfo+'\',\''+ row.sourceId+'\',\''+ row.algorithmName + '\',\''+ row.pointGN+'\')">',
        '<i class="glyphicon glyphicon-list-alt"></i>',
        '</a>'
        + "&nbsp;&nbsp;&nbsp;&nbsp;" +
        '<a href="javascript:void(0)" title="趋势" style="color:#f0ad4e" onclick="showTrend(\'' + row.pointGN+'\',\''+ row.beginDateTime+'\',\''+ row.endDateTime + '\')">',
        '<i class="glyphicon glyphicon-stats"></i>',
        '</a>'
    ].join('');
}
/**
 * 查看趋势
 * @param {Object} value
 * @param {Object} row
 * @param {Object} index
 */
function operateDetailFormatter(value, row, index){
	return [
        '<a href="javascript:void(0)" title="趋势" style="color:#f0ad4e" onclick="showTrend(\'' + pointGlobalGN+'\',\''+ row.detailBeginDateTime+'\',\''+ row.detailEndDateTime + '\')">',
        '<i class="glyphicon glyphicon-stats"></i>',
        '</a>'
    ].join('');
}

$(document).ready(function() {
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
	queryCity();
	queryAlgorithm();
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm-dd',
		autoclose : true,
		minView : 'month',
		todayHighlight : true,
		todayBtn : true,
		forceParse:false,
		allowInputToggle : true
	});
	var nowtime = new Date().getTime();
	$('#beginTimeQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30 * 6, 'yyyy-MM-dd'));
	$('#endTimeQuery').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM-dd'));
	biresultQuery();
	$('.form_datetime').find('input').blur(function() {
		if (!onlyCheckDateDay($(this).val())) {
			$(this).val(utils.dateFormat(nowtime, 'yyyy-MM-dd'))
			$(this).parent('.form_datetime').datetimepicker('update')
		}
	})
});

/**
 * 检查条件
 * @param {Object} input
 * @return {TypeName} 
 */
function onlyCheckDateDay(input){
	var reg = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");    
    if(!reg.test(input) || !input.trim().length == 10){
		$.messager.alert('信息', '日期格式必须为 xxxx - xx - xx ', 'info');
		return false;
    }
    return true;
}


/**
 * 获取盟市信息
 */
function queryCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			var html = '';
			var j = data.length;
			for ( var i = 0;i<j ;i++) {
				var o = data[i];
				html += '<option value="' + o.id + '">' + o.cityName + '</option>';
			}
			html = '<option value="-1">请选择</option>' + html;
			$('#cityQuery').html(html);
			$('#cityQuery').selectpicker('refresh');
		},
		error : function() {

		}
	});
}
/**
 * 获取所有的算法信息
 */
function queryAlgorithm() {
	$.ajax( {
		type : 'get',
		url : '../getAlgorithm',
		dataType : 'json',
		async : false,
		success : function(data) {
			var html = '';
			var j = data.length;
			for ( var i = 0;i<j ;i++) {
				var o = data[i];
				html += '<option value="' + o.algorithmCode + '">' + o.algorithmName + '</option>';
			}
			html = '<option value="-1">请选择</option>' + html;
			$('#algorithmQuery').html(html);
			$('#algorithmQuery').selectpicker('refresh');
		},
		error : function() {
			toastr.error('获取信息失败');
		}
	});
}

/**
 * 查询用户信息
 */
function biresultQuery() {
	$('#biResultTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#biResultTable").bootstrapTable( {
		method : "get", //使用get请求到服务器获取数据  
		url : "../blurryBIResult", //获取数据的Servlet地址  
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
		columns : parColumns,
		
		exportDataType: "basic",
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var cityId = $('#cityQuery').selectpicker('val');
			if (!cityId) {
				cityId = -1;
			}
			var param = {
				psName : encodeURI(encodeURI($('#psnameQuery').val())),
				cityId : cityId,
				algorithm : encodeURI(encodeURI($('#algorithmQuery').selectpicker('val'))),
				beginTime : $('#beginTimeQuery').find('input').val(),
				endTime : $('#endTimeQuery').find('input').val(),
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
		url : "../getBIResultDetail", //获取数据的Servlet地址  
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