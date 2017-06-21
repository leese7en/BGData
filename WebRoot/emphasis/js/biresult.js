$(document).ready(function() {
	$('.help-tip').find('p').html('通过重点污染源自动监控大数据分析平台，质量评估模型可以自动对自动监控数据的异常情况进行报警，可以查询到选定时间段内的预警列表，可以查询到每个异常的详情及预警时段的自动监控数据曲线。')
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
	initBIResultTable();
	biresultQuery();
	checkAllLength();
	$('.form_datetime').find('input').blur(function() {
		if (!onlyCheckDateDay($(this).val())) {
			$(this).val(utils.dateFormat(nowtime, 'yyyy-MM-dd'))
			$(this).parent('.form_datetime').datetimepicker('update')
		}
	})
});
var inputLength = 64;
/**
 * easyui textbox 统一验证长度
 * @return
 */
function checkAllLength(){
	 $(".easyui-textbox").textbox({
		onChange:function(){
		 onlyCheckLength($(this).val());
    }})
}
//input can be all just check length
function onlyCheckLength(input){
        if(input.length > inputLength){
		$.messager.alert('信息', '长度不能大于'+inputLength+"!", 'info');
		return false;
		}
        return true;
}
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
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.cityName = '请选择';
			value.unshift(o);
			$('#cityQuery').combobox( {
				valueField : 'id',
				textField : 'cityName',
				editable:false,
				data : value
			});
			$('#cityQuery').combobox('setValue', '-1');
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
		success : function(data) {
			var value = data;
			var o = new Object();
			o.algorithmCode = '-1';
			o.algorithmName = '全部';
			value.unshift(o);
			$('#algorithmQuery').combobox( {
				valueField : 'algorithmCode',
				textField : 'algorithmName',
				editable:false,
				data : value
			});
			$('#algorithmQuery').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}
/**
 *初始化 用户信息
 */
function initBIResultTable() {
	//数据一览
	$('#biResultTable').datagrid( {
		onRowContextMenu : function(e, rowIndex, rowData) { //右键时触发事件
				e.preventDefault(); //阻止浏览器捕获右键事件
				$(this).datagrid("clearSelections"); //取消所有选中项
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				$('#biDetail').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('id', rowData.ID);
			}
		});
	$("#biDetail").menu(
			{
				onClick : function(item) {
					var row = $('#biResultTable').datagrid('getSelected');
					var pointGN = row.pointGN;
					var id = row.psCode;
					if (!id || id == '' || id == null) {
						$.messager.alert('信息',
								'请选择数据！', 'info');
						return;
					}
					var name = item.name;
					if (name == 'detailInfo') {
						showDetail(row.dayinfo, row.sourceId, row.algorithmName);
					} else {
						showTrend(pointGN, row.beginDateTime, row.endDateTime);
					}
				}
			});
	var p = $('#biResultTable').datagrid('getPager');
	$(p).pagination( {
		pageSize : 20,
		pageList : [ 20, 50, 100, 200, 500 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			biresultQuery(pageNumber, pageSize);
		}
	});
};
/**
 * 查询用户信息
 */
function biresultQuery(pageNumber, pageSize) {
	var grid = $('#biResultTable');
	var options = grid.datagrid('getPager').data("pagination").options;
	if (!pageNumber) {
		pageNumber = options.pageNumber;
	}
	if (!pageSize) {
		pageSize = options.pageSize;
	}

	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	var psName = $('#psnameQuery').textbox('getValue');
	var cityId = $('#cityQuery').combobox('getValue');
	if (!cityId) {
		cityId = -1;
	}

	var algorithm = $('#algorithmQuery').combobox('getValue');
	var beginTime = $('#beginTimeQuery').find('input').val();
	var endTime = $('#endTimeQuery').find('input').val();
	$.ajax( {
		type : 'get',
		url : '../blurryBIResult',
		data : {
			psName : encodeURI(encodeURI(psName)),
			cityId : cityId,
			algorithm : encodeURI(encodeURI(algorithm)),
			beginTime : beginTime,
			endTime : endTime,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			if (data.rows == null || data.rows == "") {
				$.messager.alert('信息', '没有满足条件的数据!',
						'info');
			}
			$('#biResultTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('信息', '获取数据失败！', 'info');
		}
	});
}

/**
 * 编辑 菜单权限
 */
function showDetail(dayinfo, sourceId, algorithmName) {
	getBIResultDetail(dayinfo, sourceId, algorithmName);
	$('#biresultDialog').show();
	$('#biresultDialog').dialog( {
		title : '明细信息',
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 400,
		width : 600,
		top : 20,
		buttons : [ {
			text : '完成',
			handler : function() {
				$('#biresultDialog').dialog('close');
			}
		} ]
	});
}

/**
 * 显示趋势信息
 * @param {Object} pointGN
 * @param {Object} beginTime
 * @param {Object} endTime
 */
function showTrend(pointGN, beginTime, endTime) {
	beginTime = utils.dateFormat(beginTime, 'yyyy-MM-dd') + ' 00:00:00';
	endTime = utils.dateFormat(endTime, 'yyyy-MM-dd') + ' 23:59:59';
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
	$.ajax( {
		type : 'get',
		url : '../getBIResultDetail',
		data : {
			dayinfo : dayinfo,
			sourceId : sourceId
		},
		dataType : 'json',
		success : function(data) {
			$('#biResultDetailTable').datagrid('loadData', data);

			if (algorithmName == '重播') {
				for ( var i = 0; i < data.length; i += 2) {
					$('#biResultDetailTable').datagrid('mergeCells', {
						index : i,
						field : 'dayinfo',
						rowspan : 2
					});
				}
			}
		},
		error : function() {

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