/**
 * Created by se7en on 2016/2/4.
 */

var data1 = [];
var data2 = [];
var data3 = [];
var data4 = [];
var data5 = [];
var data6 = [];
var data7 = [];
var data8 = [];
var data9 = [];
var data10 = [];
var data11 = [];
var data12 = [];

var random = function(max) {
	return (Math.random() * max).toFixed(3);
}

for ( var i = 0; i < 12; i++) {
	data1.push(random(2));
	data2.push(random(2));
	data3.push(random(2));
	data4.push(random(2));
	data5.push(random(2));
	data6.push(random(2));
	data7.push(random(2));
	data8.push(random(2));
	data9.push(random(2));
	data10.push(random(2));
	data11.push(random(2));
	data12.push(random(2));
}

var option = {
	title : {
		text : ''
	},
	legend : {
		data : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月', '平均' ]
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
		x:"90%",
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
				        'bar' : 'image://../images/echartstoolbox/bar.png'},
				type : [ 'line', 'bar' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png',
				name : '热词频次分析'
			}
		}
	},
	xAxis : {
		name : '盟市',
		type : 'category',
		data : [ '呼和浩特', '包头', '通辽', '赤峰', '锡林郭勒', '乌兰察布', '鄂尔多斯', '巴彦淖尔', '乌海', '阿拉善', '呼伦贝尔', '兴安盟' ],
		axisLine : {
			color : 'red',
			type : 'dotted'
		},
		axisLabel:{
			interval:0
		}
	},
	yAxis : {
		name : '有效率(%)',
		type : 'value',
		scale : true,
		axisLine : {
			show : true,
			lineStyle : {
				color : '#48b',
				width : 1,
				type : 'dashed'
			}
		}
	},
	series : [
			{
				name : '1月',
				type : 'scatter',
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data1
			},
			{
				name : '2月',
				type : 'scatter',
				symbolOffset : [ '-300 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data2
			},
			{
				name : '3月',
				type : 'scatter',
				symbolOffset : [ '-200 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data3

			},
			{
				name : '4月',
				type : 'scatter',
				symbolOffset : [ '-140 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data4

			},
			{
				name : '5月',
				type : 'scatter',
				symbolOffset : [ '100 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data5

			},
			{
				name : '6月',
				type : 'scatter',
				symbolOffset : [ '100 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data6

			},
			{
				name : '7月',
				type : 'scatter',
				symbolOffset : [ '-100 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data7

			},
			{
				name : '8月',
				type : 'scatter',
				symbolOffset : [ '-150 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data8

			},
			{
				name : '9月',
				type : 'scatter',
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data9

			},
			{
				name : '10月',
				type : 'scatter',
				symbolOffset : [ '-120 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data10

			},
			{
				name : '11月',
				type : 'scatter',
				symbolOffset : [ '100 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data11

			},
			{
				name : '12月',
				type : 'scatter',
				symbolOffset : [ '-150 %', '0%' ],
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: '
								+ parseFloat(params.value).toFixed(2) + '%';
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data12

			}, {
				name : '平均',
				type : 'line',
				tooltip : {
					trigger : 'item',
					formatter : function(params) {
						return params.seriesName + '<br/>' + '地区:' + params.name + '<br/>' + '数据有效率: ' + params.value;
					},
					axisPointer : {
						show : true
					}
				},
				symbolSize : 8,
				data : data12
			} ]
};
$(document).ready(function() {
	$('.help-tip').find('p').html('对选定年份内，各盟市各月份的数据传输有效率进行展示。')
	var yearArray = formatYear(2011);
	$('#yearQuery').combobox( {
		data : yearArray,
		editable:false,
	});
	var year = '2015';
	getEffectiveYear(year);
	$('#yearQuery').combobox('setValue', year);
	$(window).resize(function() {
		getEffectiveYear();
	});
});
/**
 * 获取数据有效率
 */
function getEffectiveYear(year) {
	var width = document.documentElement.clientWidth - 20;
	var height = document.documentElement.clientHeight - 70;
	$('#main').css('width', width);
	$('#main').css('height', height);
	if (!year) {
		year = $('#yearQuery').combobox('getValue');
	}
	$.ajax( {
		type : 'get',
		url : '../getEffectiveYear',
		data : {
			year : year
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				var value = data.data;
				option.legend.data = value.legend;
				option.xAxis.data = value.xAxisData;
				option.series[0].data = value.month01;
				option.series[1].data = value.month02;
				option.series[2].data = value.month03;
				option.series[3].data = value.month04;
				option.series[4].data = value.month05;
				option.series[5].data = value.month06;
				option.series[6].data = value.month07;
				option.series[7].data = value.month08;
				option.series[8].data = value.month09;
				option.series[9].data = value.month10;
				option.series[10].data = value.month11;
				option.series[11].data = value.month12;
				option.series[12].data = value.month0;
				var chart = echarts.init(document.getElementById('main'));
				chart.on('click', function(param) {
					window.location.href = 'hotwordFrequency.html?year=' + year + '&cityName=' + encodeURI(param.name);
				});
				chart.setOption(option);
			} else {
				$.messager.alert('信息', data.message, 'info');
			}
		},
		error : function() {

		}
	});
}