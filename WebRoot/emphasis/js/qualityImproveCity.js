var lineOption = {
	tooltip : {
		trigger : 'axis',
		x : '5%',
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
		x : 'left',
		data : []
	},
	toolbox : {
		show : true,
		itemGap : 5,
		x : "87%",
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
				icon : {
					'line' : 'image://../images/echartstoolbox/line.png',
					'bar' : 'image://../images/echartstoolbox/bar.png',
					'stack' : 'image://../images/echartstoolbox/strack.png'
				},
				type : [ 'line', 'bar', 'stack' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png',
				name : '盟市指标对比'
			}
		}
	},
	calculable : true,
	xAxis : {
		type : 'category',
		data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
	},
	yAxis : {
		type : 'value',
		scale : true
	},
	series : []
};
var lineCityOption = {
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
		x : "87%",
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
				icon : {
					'line' : 'image://../images/echartstoolbox/line.png',
					'bar' : 'image://../images/echartstoolbox/bar.png',
					'stack' : 'image://../images/echartstoolbox/strack.png'
				},
				type : [ 'line', 'bar', 'stack' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png'
			}
		}
	},
	calculable : true,
	xAxis : {
		type : 'category',
		data : [],
		formatter : function(name) {
			return name;
		}
	},
	yAxis : {
		type : 'value',
		scale : true
	},
	series : []
};

$(document).ready(function() {
	$('.help-tip').find('p').html('对指定时间段内的，盟市数据质量得分及各指标得分进行趋势分析；也对不同盟市的总分或各指标进行对比分析。')
	var yearArray = formatYear(2011);
	$('#yearQuery').combobox( {
		valueField : 'value',
		textField : 'text',
		data : yearArray,
		editable : false
	});
	var year = '2016';
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
	var date = new Date();
	var nowtime = new Date().getTime();
	$('#beginTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30 * 6, 'yyyy-MM'));
	$('#endTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	queryAlgorithm();
	queryCity();
	imporveLineQuery(year);
	$('#yearQuery').combobox('setValue', year);
	$('#yearCityQuery').combobox('setValue', year);
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	imporveCityQuery(beginTime, endTime);
	$(window).resize(function() {
		imporveLineQuery();
		imporveCityQuery();
	});
});

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
			$('#cityQuery').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value,
				editable : false
			});
			$('#cityQuery').combobox('setValue', '1501');
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
		url : '../getQuotaBase',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.name = '总分';
			value.unshift(o);
			$('#quotaQuotaQuery').combobox( {
				valueField : 'name',
				textField : 'name',
				data : value,
				editable : false,
				onChange : function(n, o) {
					if (n == "总分") {
						$('#scoreTypeCity').combobox('disable');
					} else {
						$('#scoreTypeCity').combobox('enable');
					}
				}
			});
			$('#quotaQuotaQuery').combobox('setValue', '总分');
		},
		error : function() {

		}
	});
}
/**
 * 查询指标
 */
function imporveLineQuery(year) {
	var width = document.documentElement.clientWidth - 40;
	var height = document.documentElement.clientHeight - 110;
	$('#lineChart').css('width', width);
	$('#lineChart').css('height', height);
	if (!year) {
		year = $('#yearQuery').combobox('getValue');
	}
	var algorithmCode = $('#quotaQuotaQuery').combobox('getValue');
	var sroceType = $('#scoreTypeCity').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getImproveLine',
		data : {
			year : year,
			algorithmCode : encodeURI(encodeURI(algorithmCode)),
			sroceType : sroceType
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				var value = data.data;
				var legend = value.legend;
				lineOption.legend.data = legend;
				lineOption.xAxis.data = value.xAxis;
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
				lineOption.series = series;
				var lineChart = echarts.init(document.getElementById('lineChart'));
				lineChart.setOption(lineOption);
			} else {
				$.messager.alert('信息', data.message, 'info');
			}
		},
		error : function() {
			$.messager.alert('信息', '获取信息出错', 'info');
		}
	});
}
/**
 * 盟市指标得分信息
 */
function imporveCityQuery(beginTime, endTime) {
	var width = document.documentElement.clientWidth - 40;
	var height = document.documentElement.clientHeight - 100;
	$('#lineCityChart').css('width', width);
	$('#lineCityChart').css('height', height);
	if (!beginTime) {
		var beginTime = $('#beginTime').find('input').val();
	}
	if (!endTime) {
		var endTime = $('#endTime').find('input').val();
	}
	var sroceType = $('#scoreType').combobox('getValue');
	var cityId = $('#cityQuery').combobox('getValue');
	if (!cityId) {
		cityId = '1501';
	}
	$.ajax( {
		type : 'get',
		url : '../getImproveYearCity',
		data : {
			beginTime : beginTime,
			endTime : endTime,
			cityId : cityId,
			sroceType : sroceType
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				var value = data.data;
				var legend = value.legend;
				lineCityOption.legend.data = legend;
				lineCityOption.xAxis.data = value.xAxis;
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
				lineCityOption.series = series;
				var lineChart = echarts.init(document.getElementById('lineCityChart'));
				lineChart.setOption(lineCityOption);
			} else {
				$.messager.alert('信息', data.message, 'info');
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

function check() {
	$("#quotaQuotaQuery").combobox( {

		onChange : function(n, o) {
			if (n == "") {
				$("#id").combobox( {
					disabled : true
				});
			} else {
				$("#id").combobox( {
					disabled : false
				});
			}
		}

	});
}