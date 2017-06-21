/**
 * Created by se7en on 2016/2/4.
 */

var option = {
	title : {
		text : '热词分布',
		x : 'center',
		y : 'top'
	},
	legend : {
		data : [ '热词分布' ]
	},
	tooltip : {
		trigger : 'axis',
		axisPointer : {
			show : true,
			type : 'cross',
			lineStyle : {
				type : 'dashed',
				width : 1
			}
		}
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
				show : false,
				icon : [ 'image://../images/echartstoolbox/data.png', 'image://../images/echartstoolbox/data.png' ],
				type : [ 'line', 'bar' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png',
				name : '热词分布'
			}
		}
	},
	xAxis : {
		name : '时间',
		type : 'category'
	},
	yAxis : {
		name : '高频热词',
		type : 'category',
		axisLabel : {
			rotate : 45
		}
	},
	series : [ {
		name : '热词分布',
		type : 'scatter',
		tooltip : {
			trigger : 'item',
			formatter : function(params) {
				return params.seriesName + '<br/>' + '次数: ' + params.value[2];
			}
		},
		symbolSize : function(val) {
			if (val[2] > 7) {
				return 42;
			}
			return val[2] * 6;
		},
		data : []
	} ]
};

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
$(document).ready(function() {
	$('.help-tip').find('p').html('对选定年份，选定区域内排名前六的热词的频率进行按月统计。')
	var yearArray = formatYear(2011);
	$('#yearQuery').combobox( {
		data : yearArray,
		editable : false
	});
	queryCity();
	$(window).resize(function() {
		getEffectiveYear();
	});
});
/**
 * 获取数据有效率
 */
function getEffectiveYear(year, cityId) {
	var width = document.documentElement.clientWidth - 5;
	var height = document.documentElement.clientHeight - 50;
	$('#main').css('width', width);
	$('#main').css('height', height);
	if (!year) {
		year = $('#yearQuery').combobox('getValue');
	}
	if (!cityId) {
		cityId = $('#cityQuery').combobox('getValue');
	}
	$.ajax( {
		type : 'get',
		url : '../getHotwordFrequencyYear',
		data : {
			year : year,
			cityId : cityId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				$.messager.alert('信息',
						'' + data.message + '',
						'info');
				return;
			}
			var chart = echarts.init(document.getElementById('main'));
			var value = data.data;
			option.legend.data = value.legend;
			option.xAxis.data = value.xAxis;
			option.yAxis.data = value.yAxis;
			option.series[0].data = value.data;
			chart.setOption(option);
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
			o.cityName = '全区';
			value.unshift(o);
			$('#cityQuery').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value,
				editable : false
			});
			$('#cityQuery').combobox('setValue', '-1');
			var args = op_get_url_parms();
			var year = args.year;
			var cityName = args.cityName;
			if (!year) {
				year = '2015';
			}
			/**
			 * 绑定盟市框
			 */
			var cityId = '-1';
			if (cityName) {
				var cityData = $('#cityQuery').combobox('getData');
				for ( var i in cityData) {
					if (cityName == cityData[i].cityName) {
						cityId = cityData[i].id;
						break;
					}
				}
				$('#cityQuery').combobox('setValue', cityId);
			}
			getEffectiveYear(year, cityId);
			$('#yearQuery').combobox('setValue', year);
		},
		error : function() {

		}
	});
}