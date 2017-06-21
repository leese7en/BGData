var cityId;
var psType;
var psCode;
var pieOption = {
	title : {
		text : '分析饼状图'
	},
	tooltip : {
		trigger : 'item',
		formatter : "{a} <br/>{b} : {c} ({d}%)"
	},
	legend : {
		orient : 'vertical',
		x : 'left',
		show : false
	},
	center : [ '90%', '50%' ],
	toolbox : {
		show : false,
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : false,
				readOnly : false
			},
			restore : {
				show : true
			},
			saveAsImage : {
				show : true,
				name :''
			}
		}
	},
	calculable : true,
	series : [ {
		name : '指标体系',
		type : 'pie',
		radius : [ '50%', '70%' ],
		itemStyle : {
			normal : {
				label : {
					show : false
				},
				labelLine : {
					show : false
				}
			},
			emphasis : {
				label : {
					show : true,
					position : 'right',
					textStyle : {
						fontSize : '12'
					}
				}
			}
		},
		data : []
	} ]
};

var radarOption = {
	title : {
		text : '分析雷达图'
	},
	tooltip : {},
	legend : {
		orient : 'vertical',
		x : 'right',
		y : 'bottom',
		data : [ '雷达图' ]
	},
	toolbox : {
		show : false,
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : false,
				readOnly : false
			},
			restore : {
				show : true
			},
			saveAsImage : {
				show : true
			}
		}
	},
	polar : {
		indicator : []
	},
	calculable : true,
	series : [ {
		name : '预算 vs 开销',
		type : 'radar',
		data : [ {
			value : [ 0.43, 0.5, 0.28, 0.89, 0.67, 0.19 ],
			name : '预算分配'
		} ]
	} ]
};

var lineOption = {
	tooltip : {
		trigger : 'axis',
		axisPointer : {
			animation : false
		},
		formatter : function(params) {
			var length = params.length;
			var tip = params[0].name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>' + params[i].seriesName + '月:' + (params[i].value ? params[i].value : 0).toFixed(2) + '%';
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
				show : false,
				readOnly : false
			},
			magicType : {
				show : true,
				type : [ 'line' ]
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
		y : '20',
		formatter : function(name) {
			return name + '月';
		}
	},
	xAxis : {
		type : 'category'

	},
	yAxis : {
		type : 'value'
	// axisLabel : {
	// formatter: '{value} t'
	// }
	},
	series : []
};

$(document).ready(function() {
	$('.help-tip').find('p').html('以盟市及行业维度，对选定时间段内的数据质量得分及各指标明细进行查询对比分析，并可查询企业得分及各指标明细。');
	queryCity();
	var nowtime = new Date().getTime();
	$('#beginTimeCityQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM'));
	$('#endTimeCityQuery').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	$('#beginTimePSTypeQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM'));
	$('#endTimePSTypeQuery').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	$('#beginTimeResQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM'));
	$('#endTimeResQuery').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
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
	initTable();
	checkAllLength();
	 improveResQuery();
		 improvePSTypeQuery();
		 improveCityQuery();
	});

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
			$('#resCity').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value,
				editable : false
			});
			$('#resCity').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 *初始化 用户信息
 */
function initTable() {
	//数据一览
	$('#improveCityTable').datagrid( {
		onDblClickRow : function(rowIndex, rowData) { //双击时触发事件
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				showCityDetail(rowData);
			}
		});
	$('#improvePSTypeTable').datagrid( {
		onDblClickRow : function(rowIndex, rowData) { //双击时触发事件
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				showPSTypeDetail(rowData);
			}
		});
	$('#improveResTable').datagrid( {
		onDblClickRow : function(rowIndex, rowData) { //双击时触发事件
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				showResDetail(rowData);
			}
		});
	var p = $('#improveResTable').datagrid('getPager');
	$(p).pagination( {
		pageSize : 20,
		pageList : [ 20, 50, 100, 200, 500 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			improveResQuery(pageNumber, pageSize);
		}
	});
};

/**
 * 获取盟市纬度的信息
 */
function improveCityQuery() {
	var beginTime = $('#beginTimeCityQuery').find('input').val();
	var endTime = $('#endTimeCityQuery').find('input').val();
	if (beginTime > endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getImproveCity',
		data : {
			beginTime : beginTime,
			endTime : endTime
		},
		dataType : 'json',
		success : function(data) {
			$('#improveCityTable').datagrid('loadData', data);
		},
		error : function() {

		}
	});

}

/**
 * 获取行业维度的信息
 */
function improvePSTypeQuery() {
	var beginTime = $('#beginTimePSTypeQuery').find('input').val();
	var endTime = $('#endTimePSTypeQuery').find('input').val();

	if (beginTime > endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getImprovePSType',
		data : {
			//			waterOrGas : encodeURI(encodeURI(waterOrGas)),
			beginTime : beginTime,
			endTime : endTime
		},
		dataType : 'json',
		success : function(data) {
			for ( var i = 0; i < data.length; i++) {
				if (typeof (data[i].psType) == 'undefined') {
					data[i].psType = '其它';
				}
			}
			$('#improvePSTypeTable').datagrid('loadData', data);
		},
		error : function() {

		}
	});

}

/**
 * 查询企业 得分信息
 * @param {Object} pageNumber
 * @param {Object} pageSize
 */
function improveResQuery(pageNumber, pageSize) {
	var grid = $('#improveResTable');
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
	var psName = $('#resName').textbox('getValue');
	//	var waterOrGas = $('#waterOrGasResQuery').combobox('getValue');
	var cityId = $('#resCity').combobox('getValue');
	var beginTime = $('#beginTimeResQuery').find('input').val();
	var endTime = $('#endTimeResQuery').find('input').val();

	if (beginTime > endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getImproveRes',
		data : {
			psName : encodeURI(encodeURI(psName)),
			cityId : cityId,
			beginTime : beginTime,
			endTime : endTime,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			if (data.total == null || data.total == 0) {
				$('#improveResTable').datagrid('loadData', {
					total : 0,
					rows : []
				});
				return;
			} else {
				$('#improveResTable').datagrid('loadData', data);
			}
		},
		error : function() {
			$.messager.alert('错误', '获取信息失败', 'error');
		}
	});
}

/**
 * 根据盟市显示具体 信息
 * @param {Object} data
 */
function showCityDetail(data) {
	cityId = data.cityId;
	// var beginTime = $('#beginTimeCityQuery').datetimespinner('getValue');
	// var endTime = $('#endTimeCityQuery').datetimespinner('getValue');
	var beginTime = $('#beginTimeCityQuery').find('input').val();
	var endTime = $('#endTimeCityQuery').find('input').val();
	if (beginTime >= endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	// $('#beginTimeCityDiaPieQuery').datetimespinner('setValue', beginTime);
	// $('#endTimeCityDiaPieQuery').datetimespinner('setValue', endTime);
	$('#beginTimeCityDiaPieQuery').find('input').val(beginTime);
	$('#endTimeCityDiaPieQuery').find('input').val(endTime);
	improveCityDiaPieQuery();
	$('#improveCityDialog').show();
	$('#improveCityDialog').dialog( {
		title : '盟市明细信息',
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 500,
		width : 800,
		top : 20
	// open:function(event, ui){
			// 	$('.form_datetime').datetimepicker({
			// 		language: 'zh-CN',
			// 		format: 'yyyy-mm',
			// 		autoclose: true,
			// 		startView: 'year',
			// 		minView: 'year',
			// 		todayHighlight: true,
			// 		todayBtn: true,
			// 		allowInputToggle: true
			// 	});
			// }
			});
}

/**
 * 处理盟市纬度的图标
 * @param {Object} data
 */
function improveCityDiaPieQuery() {
	$('#cityPieChart').css('width', 300);
	$('#cityPieChart').css('height', 240);
	$('#cityRadarChart').css('width', 300);
	$('#cityRadarChart').css('height', 240);
	// var beginTime = $('#beginTimeCityDiaPieQuery').datetimespinner('getValue');
	// var endTime = $('#endTimeCityDiaPieQuery').datetimespinner('getValue');
	var beginTime = $('#beginTimeCityDiaPieQuery').find('input').val();
	var endTime = $('#endTimeCityDiaPieQuery').find('input').val();
	if (beginTime >= endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getImproveCityDetailSta',
		data : {
			cityId : cityId,
			beginTime : beginTime,
			endTime : endTime
		},
		dataType : 'json',
		success : function(data) {
			pieOption.legend.data = data.pie.data;
			pieOption.series[0].data = data.pie.series;
			var pieChart = echarts.init(document.getElementById('cityPieChart'));
			pieChart.setOption(pieOption);

			radarOption.polar.indicator = data.radar.polar[0].indicator;
			radarOption.series[0].data = data.radar.series;

			var radarChart = echarts.init(document.getElementById('cityRadarChart'));
			radarChart.setOption(radarOption);
		},
		error : function() {

		}
	});

}
/**
 * 查询 盟市具体指标信息
 * @param {Object} data
 */
function improveCityDiaLineQuery(data) {
	$('#cityLineChart').css('width', 500);
	$('#cityLineChart').css('height', 300);
	var year = $('#cityYear').combobox('getValue');
	// var beginMonth = $('#beginMonth').datetimespinner('getValue');
	// var endMonth = $('#endMonth').datetimespinner('getValue');
	var beginMonth = $('#beginMonth').find('input').val();
	var endMonth = $('#endMonth').find('input').val();
	$.ajax( {
		type : 'get',
		url : '../getImproveCityDetailInterval',
		data : {
			cityId : cityId,
			year : year,
			beginMonth : beginMonth,
			endMonth : endMonth
		},
		dataType : 'json',
		success : function(data) {
			lineOption.legend.data = data.legend;
			lineOption.xAxis.data = data.xAixs
			var series = new Array();
			var serie = new Object();
			var values = data.series;
			var l = values.length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = values[i].name;
				serie.type = 'line';
				serie.data = values[i].value;
				series.push(serie);
			}
			lineOption.series = series;
			var lineChart = echarts.init(document.getElementById('cityLineChart'));
			lineChart.setOption(lineOption);
		},
		error : function() {

		}
	});
}
/**
 * 根据行业显示具体 信息
 * @param {Object} data
 */
function showPSTypeDetail(data) {
	psType = data.psType;
	// var beginTime = $('#beginTimePSTypeQuery').datetimespinner('getValue');
	// var endTime = $('#endTimePSTypeQuery').datetimespinner('getValue');
	var beginTime = $('#beginTimePSTypeQuery').find('input').val();
	var endTime = $('#endTimePSTypeQuery').find('input').val();
	if (beginTime >= endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	// $('#beginTimePSTypeDiaPieQuery').datetimespinner('setValue', beginTime);
	// $('#endTimePSTypeDiaPieQuery').datetimespinner('setValue', endTime);
	$('#beginTimePSTypeDiaPieQuery').find('input').val(beginTime);
	$('#endTimePSTypeDiaPieQuery').find('input').val(endTime);
	improvePsTypeDiaPieQuery();
	$('#improvePSTypeDialog').show();
	$('#improvePSTypeDialog').dialog( {
		title : '行业明细信息',
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 500,
		width : 800,
		top : 20
	});
}

/**
 * 格式化 行和类型的数据
 * @param {Object} data
 */
function improvePsTypeDiaPieQuery() {
	$('#psTypePieChart').css('width', 300);
	$('#psTypePieChart').css('height', 240);
	$('#psTypeRadarChart').css('width', 300);
	$('#psTypeRadarChart').css('height', 240);
	// var beginTime = $('#beginTimePSTypeDiaPieQuery').datetimespinner('getValue');
	// var endTime = $('#endTimePSTypeDiaPieQuery').datetimespinner('getValue');
	var beginTime = $('#beginTimePSTypeDiaPieQuery').find('input').val();
	var endTime = $('#endTimePSTypeDiaPieQuery').find('input').val();
	if (beginTime >= endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getImprovePSTypeDetailSta',
		data : {
			psType : encodeURI(encodeURI(psType)),
			beginTime : beginTime,
			endTime : endTime
		},
		dataType : 'json',
		success : function(data) {
			pieOption.legend.data = data.pie.data;
			pieOption.series[0].data = data.pie.series;
			var pieChart = echarts.init(document.getElementById('psTypePieChart'));
			pieChart.setOption(pieOption);
			radarOption.polar = data.radar.polar;
			radarOption.series[0].data = data.radar.series;
			var radarChart = echarts.init(document.getElementById('psTypeRadarChart'));
			radarChart.setOption(radarOption);
		},
		error : function() {

		}
	});
}

/**
 * 根据企业显示具体 信息
 * @param {Object} data
 */
function showResDetail(data) {
	psCode = data.psCode;
	// var beginTime = $('#beginTimeResQuery').datetimespinner('getValue');
	// var endTime = $('#endTimeResQuery').datetimespinner('getValue');
	var beginTime = $('#beginTimeResQuery').find('input').val();
	var endTime = $('#endTimeResQuery').find('input').val();
	if (beginTime >= endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	// $('#beginTimeEnterpriseDiaPieQuery').datetimespinner('setValue', beginTime);
	// $('#endTimeEnterpriseDiaPieQuery').datetimespinner('setValue', endTime);
	$('#beginTimeEnterpriseDiaPieQuery').find('input').val(beginTime);
	$('#endTimeEnterpriseDiaPieQuery').find('input').val(endTime);
	improveResDiaPieQuery();
	$('#improveResDialog').show();
	$('#improveResDialog').dialog( {
		title : '企业明细信息',
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 500,
		width : 800,
		top : 20
	});
}

/**
 * 格式化 企业的数据
 * @param {Object} data
 */
function improveResDiaPieQuery(data) {
	$('#resPieChart').css('width', 300);
	$('#resPieChart').css('height', 240);
	$('#resRadarChart').css('width', 300);
	$('#resRadarChart').css('height', 240);
	// var beginTime = $('#beginTimeEnterpriseDiaPieQuery').datetimespinner('getValue');
	// var endTime = $('#endTimeEnterpriseDiaPieQuery').datetimespinner('getValue');
	var beginTime = $('#beginTimeEnterpriseDiaPieQuery').find('input').val();
	var endTime = $('#endTimeEnterpriseDiaPieQuery').find('input').val();
	if (beginTime >= endTime) {
		$.messager.alert('错误', '开始日期不能晚于结束日期！', 'error');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getImproveResDetailSta',
		data : {
			psCode : psCode,
			beginTime : beginTime,
			endTime : endTime
		},
		dataType : 'json',
		success : function(data) {
			pieOption.legend.data = data.pie.data;
			pieOption.series[0].data = data.pie.series;
			var pieChart = echarts.init(document.getElementById('resPieChart'));
			pieChart.setOption(pieOption);
			radarOption.polar = data.radar.polar;
			radarOption.series[0].data = data.radar.series;
			var radarChart = echarts.init(document.getElementById('resRadarChart'));
			radarChart.setOption(radarOption);
		},
		error : function() {

		}
	});
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
	if (!date) {
		return '';
	}
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	return y + '-' + (m < 10 ? ('0' + m) : m);
}

/**
 * 格式化日期选择框
 * @param {Object} s
 * @return {TypeName} 
 */
function myparser(s) {
	if (!s) {
		return null;
	}
	var ss = s.split('-');
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	if (!isNaN(y) && !isNaN(m)) {
		return new Date(y, m - 1, 1);
	} else {
		return new Date();
	}
}
/**
 *  格式化 
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatNumber(val, row, index) {
	return '<font color="green">' + parseFloat(val).toFixed(2) + '</font>';
}
