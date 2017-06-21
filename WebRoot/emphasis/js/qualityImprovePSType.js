var linePSTypeOption = {
	tooltip : {
		trigger : 'axis',
		axisPointer : {
			animation : false
		},
		formatter : function(params) {
			var length = params.length;
			var tip = params[0].name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>' + params[i].seriesName + ':'

				+ (params[i].value != '-' ? (params[i].value).toFixed(2) : '-');
			}
			return tip;
		}
	},
	legend : {
		data : []
	},
	toolbox : {
		show : true,
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : false,
				icon : 'image://../images/echartstoolbox/data.png',
				readOnly : false
			},
			magicType : {
				show : true,
				icon : {'line' : 'image://../images/echartstoolbox/line.png',
				        'bar' : 'image://../images/echartstoolbox/bar.png',
				        'stack' : 'image://../images/echartstoolbox/strack.png'},
				type : [ 'line', 'bar', 'stack' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png',
				name : '行业指标对比'
			}
		}
	},
	calculable : true,
	xAxis : {
		type : 'category',

		data : []
	},
	yAxis : {
		type : 'value'
	},
	series : []
};
var lineResOption = {
	tooltip : {
		trigger : 'axis',
		axisPointer : {
			animation : false
		},
		formatter : function(params) {
			var length = params.length;
			var tip = params[0].name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>' + params[i].seriesName + ':'
						+ (params[i].value != '-' ? (params[i].value).toFixed(2) : '-');
			}
			return tip;
		}
	},
	legend : {
		data : []
	},
	toolbox : {
		show : true,
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : false,
				icon : 'image://../images/echartstoolbox/data.png',
				readOnly : false
			},
			magicType : {
				show : true,
				icon : {'line' : 'image://../images/echartstoolbox/line.png',
				        'bar' : 'image://../images/echartstoolbox/bar.png',
				        'stack' : 'image://../images/echartstoolbox/strack.png'},
				type : [ 'line', 'bar', 'stack' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png',
				name :　'企业指标对比'
			}
		}
	},
	calculable : true,
	xAxis : {
		type : 'category',
		data : [],
		formatter : function(name) {
			return name + '月';
		}
	},
	yAxis : {
		type : 'value'
	},
	series : []
};
var psType = '火力发电';
var psCode = '150100000002';

$(document).ready(function() {
	$('.help-tip').find('p').html('对指定时间段内的，行业或企业数据质量得分及各指标得分进行趋势分析。')
	queryPSType();
	queryEnterprise();
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		startView : 'year',
		minView : 'year',
		todayHighlight : true,
		todayBtn : true,
		forceParse:false,
		allowInputToggle : true
	});
	var date = new Date();
	var nowtime = new Date().getTime();
	$('#beginTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30 * 6, 'yyyy-MM'));
	$('#endTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	var date = new Date();
	var nowtime = new Date().getTime();
	$('#beginEnterpriseTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30 * 6, 'yyyy-MM'));
	$('#endEnterpriseTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	var beginEnterpriseTime = $('#beginEnterpriseTime').find('input').val();
	var endEnterprisTime = $('#endEnterpriseTime').find('input').val();
	imporvePSTypeQuery(beginTime, endTime, psType);
	imporveEnterpriseQuery(beginEnterpriseTime, endEnterprisTime, psCode);
	$(window).resize(function() {
		imporvePSTypeQuery();
		imporveEnterpriseQuery();
	});
});

/**
 * 获取 企业类型
 */
function queryPSType() {
	$.ajax( {
		type : 'get',
		url : '../getPSType',
		dataType : 'json',
		success : function(data) {
			var value = data;
			$('#psType').combobox( {
				valueField : 'psType',
				textField : 'psType',
				data : value,
				value : psType,
				editable:false
			});
		},
		error : function() {

		}
	});
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
			var value = data;
			$('#enterprise').combobox( {
				valueField : 'psCode',
				textField : 'psName',
				data : value,
				value : psCode,
				editable:false
			});
		},
		error : function() {

		}
	});
}

/**
 * 查询指标
 */
function imporvePSTypeQuery(beginTime, endTime, psType) {
	var width = document.documentElement.clientWidth - 40;
	var height = document.documentElement.clientHeight - 80;
	$('#psTypeChart').css('width', width);
	$('#psTypeChart').css('height', height);
	if (!psType) {
		psType = $('#psType').combobox('getValue');
	} else {
		$('#psType').combobox('setValue', psType);
	}
	if (!beginTime) {
		beginTime = $('#beginTime').find('input').val();
	}
	if (!endTime) {
		endTime = $('#endTime').find('input').val();
	}
	if (beginTime > endTime) {
		$.messager.alert('信息', "开始时间不能晚于结束时间！", 'info');
		return;
	}
	var sroceType = $('#scoreTypePSType').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getImprovePSTypeMonth',
		data : {
			psType : encodeURI(encodeURI(psType)),
			beginTime : beginTime,
			endTime : endTime,
			sroceType : sroceType
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				var value = data.data;
				var legend = value.legend;
				linePSTypeOption.legend.data = legend;
				linePSTypeOption.xAxis.data = value.xAxis;
				var series = new Array();
				var serie = new Object();
				var values = value.data;
				var l = Object.keys(values).length;
				for ( var i = 0; i < l; i++) {
					serie = new Object();
					serie.name = legend[i];
					serie.type = 'line';
					serie.data = values[legend[i]];
					series.push(serie);
				}
				linePSTypeOption.series = series;
				var lineChart = echarts.init(document.getElementById('psTypeChart'));
				lineChart.setOption(linePSTypeOption);
			} else {
				$.messager.alert('信息', data.message, 'info');
			}
		},
		error : function() {

		}
	});
}
/**
 * 查询指标
 */
function imporveEnterpriseQuery(beginTime, endTime, psCode) {
	var width = document.documentElement.clientWidth - 40;
	var height = document.documentElement.clientHeight - 80;
	$('#lineEnterpriseChart').css('width', width);
	$('#lineEnterpriseChart').css('height', height);
	if (!psCode) {
		psCode = $('#enterprise').combobox('getValue');
	}
	if (!beginTime) {
		beginTime = $('#beginEnterpriseTime').find('input').val();
	}
	if (!endTime) {
		endTime = $('#endEnterpriseTime').find('input').val();
	}
	if (beginTime > endTime) {
		$.messager.alert('信息', "开始时间不能晚于结束时间！", 'info');
		return;
	}
	var sroceType = $('#scoreTypeEnterprise').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getImprovEnterpriseLine',
		data : {
			psCode : psCode,
			beginTime : beginTime,
			endTime : endTime,
			sroceType : sroceType
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				var value = data.data;
				var legend = value.legend;
				lineResOption.legend.data = legend;
				lineResOption.xAxis.data = value.xAxis;
				var series = new Array();
				var serie = new Object();
				var values = value.data;
				var l = Object.keys(values).length;
				for ( var i = 0; i < l; i++) {
					serie = new Object();
					serie.name = legend[i];
					serie.type = 'line';
					serie.data = values[legend[i]];
					series.push(serie);
				}
				lineResOption.series = series;
				var lineChart = echarts.init(document.getElementById('lineEnterpriseChart'));
				lineChart.setOption(lineResOption);
			} else {
				$.messager.alert('信息', data.message, 'info');
			}

		},
		error : function() {

		}
	});
}
