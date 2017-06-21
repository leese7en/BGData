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
 * 初始化
 */
$(document).ready(function() {
	var args = op_get_url_parms();
	var hotword = args.hotword;
	var hotwordType = args.hotwordType;
	var beginTime = args.beginTime;
	var endTime = args.endTime
	if (hotword) {
		$('#hotword').textbox('setValue', hotword);
	}

	queryHotwordType();

	if (hotwordType) {
		$('#hotwordType').combotree('setValue', hotwordType);
	}
	if (beginTime) {
		$('#beginTime').find('input').val(beginTime)
	}
	if (endTime) {
		$('#endTime').find('input').val(endTime)
	}
	$('.help-tip').find('p').html('对现场检查报告中出现的问题进行分析，形成自动监控管理热词。对所选择范围内的热词进行搜索，并可下载相关热词出现的报告。')
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		startView : 'year',
		minView : 'year',
		todayHighlight : true,
		todayBtn : true,
		forceParse : false,
		allowInputToggle : true,
		zIndex : 9999
	});
	var p = $('#hotwordInfo').datagrid('getPager');
	$(p).pagination( {
		pageSize : 20,
		pageList : [ 20, 50, 100, 200, 500 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			queryHotword(pageNumber, pageSize);
		}
	});
	var i = $('#industrygrid').datagrid('getPager');
	$(i).pagination( {
		pageSize : 20,
		pageList : [ 20, 50, 100, 200, 500 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			queryIndustry(pageNumber, pageSize);
		}
	});
	queryCity();
	queryHotword();
	checkAllLength();
});

//查询热词类型
function queryHotwordType() {
	$.ajax( {
		type : 'get',
		url : '../getHotwordTypes',
		dataType : 'json',
		async : false,
		success : function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.text = '请选择';
			o.children = new Array();
			value.unshift(o);
			$('#hotwordType').combotree( {
				data : data
			});
			$('#hotwordType').combotree('setValue', '-1');
		},
		error : function() {
			$.messager.alert('信息', '获取数据失败！', 'info');
		}
	});
}
/**
 * 查看详情
 * @param {Object} val
 * @param {Object} row
 * @return {TypeName} 
 */
function detail(val, row) {
	if (val) {
		if (val.indexOf('.xlsx') != -1 || val.indexOf('.xls') != -1) {
			return '<a href="javascript:void(0);" onclick="downloadThis(\'' + val + '\')">' + val + '</a>';
		} else {
			return '<a href="javascript:void(0);" onclick="showIndustryInfo(\'' + val + '\')"> 工况数据 </a>';
		}
	}
}
/**
 * 下载文件
 * @param {Object} fileName
 */
function downloadThis(fileName) {
	var url = '../fileDownload?filePath=reports&fileName=' + fileName;
	window.location.href = encodeURI(encodeURI(url));
}
/**
 * 显示工况信息
 * @param {Object} val
 */
function showIndustryInfo(val) {
	$('#userMessage').show();
	$('#userMessage').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		title : '工况数据查询',
		top : 20
	});
	queryIndustryById(1, 20, val);
}
/**
 * 获取数据
 * @return
 */
function queryHotword(pageNumber, pageSize) {

	/**
	 * 获取跳转过来的信息
	 * @param {Object} data
	 */

	var cityId = $('#city').combobox('getValue');
	var psName = $('#enterprise').val();
	var hotwordType = $('#hotwordType').combobox('getValue');
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	var hotword = $('#hotword').val();
	if (beginTime > endTime) {
		$.messager.alert('信息', '开始时间不能晚于结束时间！', 'info');
		return;
	}
	var grid = $('#hotwordInfo');
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
	$.ajax( {
		type : 'post',
		url : '../blurryHotword',
		data : {
			cityId : cityId,
			psName : encodeURI(encodeURI(psName)),
			hotwordType : hotwordType,
			hotword : encodeURI(encodeURI(hotword)),
			beginTime : beginTime,
			endTime : endTime,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			$('#hotwordInfo').datagrid('loadData', data);
		},
		error : function() {

		}
	});
}
/**
 * 根据id获取对应的工况信息
 */
function queryIndustryById(pageNumber, pageSize, alarmLogId) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	$.ajax( {
		type : 'post',
		url : '../getIndustryAByAlarmLogId',
		data : {
			alarmLogId : alarmLogId,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			$('#industrygrid').datagrid('loadData', data);
		},
		error : function() {

		}
	});
}
/**
 * 查询盟市信息
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
			$('#city').combobox( {
				valueField : 'id',
				textField : 'cityName',
				editable : false,
				data : value
			});
			$('#city').combobox('setValue', '-1');
			$('#city1').combobox( {
				valueField : 'id',
				textField : 'cityName',
				editable : false,
				data : value
			});
			$('#city1').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 * 按条件查询工况信息
 */
function queryIndustry(pageNumber, pageSize) {
	var cityId = $('#city1').combobox('getValue');
	var psName = $('#enterprise1').val();
	var beginTime = $('#beginTime1').find('input').val();
	var endTime = $('#endTime1').find('input').val();
	var grid = $('#industrygrid');
	var options = grid.datagrid('getPager').data("pagination").options;
	if (beginTime > endTime) {
		$.messager.alert('信息', '开始时间不能晚于结束时间！', 'info');
		return;
	}
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
	$.ajax( {
		type : 'post',
		url : '../queryIndustryA',
		data : {
			cityId : cityId,
			psName : encodeURI(encodeURI(psName)),
			beginTime : beginTime,
			endTime : endTime,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			$('#industrygrid').datagrid('loadData', data);
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
