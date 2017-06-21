$(document).ready(function() {

	$('.help-tip').find('p').html('本功能对电厂工况系统中的燃煤硫分进行分析，以时间、盟市、集团维度对燃煤硫分进行对比分析；时间维度分析可点击折线图中批注点查看批注。')

	var yearArray = formatYear(2011);
	$('#beginYear').combobox( {
		valueField : 'value',
		textField : 'text',
		data : yearArray,
		editable : false
	});
	var data = $('#beginYear').combobox('getData');
	$("#beginYear ").combobox('select', data[4].value);
	$('#endYear').combobox( {
		valueField : 'value',
		textField : 'text',
		data : yearArray,
		editable : false
	});
	var data1 = $('#endYear').combobox('getData');
	$("#endYear ").combobox('select', data1[4].value);
	$('#cityYear').combobox( {
		valueField : 'value',
		textField : 'text',
		data : yearArray,
		editable : false
	});
	$('#beginYear').combobox('setValue', '2015');
	$('#endYear').combobox('setValue', '2015');
	$('#cityYear').combobox('setValue', '2016');
	sulfurTimeQuery();
	sulfurCityQuery();
	$(window).resize(function() {
		sulfurTimeQuery();
		sulfurCityQuery();
	});
});
var myChart;
var optionTime = {
	title : {
		text : "火电厂工况推算硫份趋势分析",
		x : 'center'
	},
	tooltip : {
		trigger : 'axis',
		axisPointer : {
			animation : false
		},
		formatter : function(params) {
			var length = params.length;
			var tip = params[0].name;
			var name = params[0].seriesName;
			top += '<br/>' + name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>' + params[i].seriesName + '年:'
						+ (params[i].value != '-' ? parseFloat(params[i].value).toFixed(2) + '%' : params[i].value);
			}
			return tip;
		}
	},
	toolbox : {
		show : true,
		x : '87%',
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
					'bar' : 'image://../images/echartstoolbox/bar.png'
				},
				type : [ 'line', 'bar' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png',
				name : '工况火电厂硫分(时间纬度)'
			}
		}
	},
	calculable : true,
	legend : {
		y : '27',
		formatter : function(name) {
			return name + '年';
		}
	},
	xAxis : {
		type : 'category',
		data : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
		name : '月份'
	},
	yAxis : {
		type : 'value',
		name : '%'
	},
	itemStyle : {
		normal : {
			label : {
				show : true,
				formatter : function(params, ticket, callback) {//格式化展现（标签+值）
					return "";
				}
			}
		}
	},
	series : []
};

var option = {
	title : {
		text : "火电厂工况推算硫份分布分析",
		x : 'center'
	},
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
		show : true,
		x : '87%',
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
					'bar' : 'image://../images/echartstoolbox/bar.png'
				},
				type : [ 'line', 'bar' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png',
				name : '工况火电厂硫分(盟市/集团)'
			}
		}
	},
	calculable : true,
	legend : {
		y : '27',
		formatter : function(name) {
			return name + '月';
		}
	},
	xAxis : {
		type : 'category'

	},
	yAxis : {
		type : 'value'
	},
	series : []
};

/**
 * 设置 图表的值
 * 
 * @param {Object}
 *            xname
 * @param {Object}
 *            data
 */
function setDataCity(data) {
	var width = document.documentElement.clientWidth - 60;
	var height = document.documentElement.clientHeight - 110;
	$('#cityChart').css('width', width);
	$('#cityChart').css('height', height);
	var myArr = new Array();
	var seriesData = data.data;
	for ( var i = 0; i < seriesData.length; i++) {
		if (seriesData[i][2] != '-') {
			seriesData[i][2] = parseFloat(seriesData[i][2]).toFixed(2);
		}
	}
	var heatmapOption
= 
	{
		title:{
			text:"火电厂工况推算硫份分布分析",
			x:'center',
			y:'top'
		},
		tooltip : {
			position : 'top',
			axisPointer : {
				animation : false
			},
			formatter : function(params) {
				var data = params.data;
				var tip;
				var x = params.name;
				var y = data[1] + 1;
				var val = data[2];
				if (val == '' || val == null) {
					val = '-';
				}
				tip = x
						+ '<br>'
						+ y
						+ '月'
						+ '<br>硫份：'
						+ (val == '-' ? '' : (parseFloat(val).toFixed(2) + '%'));
				return tip;
			}
		},
		toolbox : {
			show : true,
			x:'87%',
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : false,
					icon : 'image://../images/echartstoolbox/data.png',
					readOnly : false
				},
				restore : {
					icon : 'image://../images/echartstoolbox/refresh.png'
				},
				saveAsImage : {
					icon : 'image://../images/echartstoolbox/save.png',
					name : '工况火电厂硫分(盟市/集团)'
				}
			}
		},
		animation : false,
		gradientColor:['blue', 'cyan', 'lime', 'yellow', 'red'],
		grid : {
			height : '70%',
			y : '10%'
		},
		xAxis : {
			name : '盟市/集团',
			type : 'category',
			data : data.xAxis,
			position:'bottom',
			axisTick:{
				interval:0
			},
			axisLabel:{
				rotate:0,
				interval:0,
				textStyle:{
					fontSize:4
				}
			},

		},
		yAxis : {
			name : '月份',
			type : 'category',
			data : data.yAxis
		},
		visualMap : {
			type:'piecewise',
			splitNumber:5,
			pieces:[{min:0, max:1},{min:1, max:2},{min: 2, max: 3},{min: 3, max: 4}],
			color:['#8B0000','#CD6600','#FFA500','#66CD00'],
			min : 0,
			max : 4,
			calculable : true,
				orient : 'horizontal',
			left : 'center',
			bottom : '5%'
		},
		series : [ {
			name : '硫分推算',
			type : 'heatmap',
			data : seriesData,
			label : {
				normal : {
					show : true
				}
			},
			itemStyle : {
				emphasis : {
					shadowBlur : 10,
					shadowColor : 'rgba(0, 0, 0, 0.5)'
				}
			}
		} ]
	};
    myChart = echarts.init(document.getElementById('cityChart'));
	myChart.setOption(heatmapOption);
}

/**
 * 盟市或集团 硫分查询
 */
function sulfurCityQuery() {
	var year = $('#cityYear').combobox('getValue');
	if (year == 'select') {
		$.messager.alert('提示信息','<div style="height:50px;line-height:50px;margin-left:20px;">请选择年份！</div>', '提示信息');
		return;
	}
	if (!checkYear(year)){
		return
	}
	var viewPoint = $('#viewPoint').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getIndustrySulfurMonth',
		data : {
			year : year,
			beginMonth : '1',
			endMonth : '12',
			viewPoint : viewPoint
		},
		dataType : 'json',
		success : function(data) {
			setDataCity(data);
		},
		error : function() {

		}
	});
}

/**
 * 时间纬度 硫分查询
 */
function sulfurTimeQuery() {
	var beginYear = $('#beginYear').combobox('getValue');
	var endYear = $('#endYear').combobox('getValue');

	if (beginYear == 'select' || endYear == 'select') {
		$.messager.alert('提示信息','<div style="height:50px;line-height:50px;margin-left:20px;">请选择开始年份和结束年份</div>', '提示信息');
		return;
	}
	if (!checkYear(beginYear) || !checkYear(endYear)){
		return
	}
	if (beginYear > endYear) {
		$.messager.alert('提示信息','<div style="height:50px;line-height:50px;margin-left:20px;">结束年份不能早于开始年份</div>', '提示信息');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getIndustrySulfurYear',
		data : {
			beginYear : beginYear,
			endYear : endYear
		},
		dataType : 'json',
		success : function(data) {
			setDataTime(data);
			myChart.on('click', function (param) {
				var monthNum=param.data.xAxis;
				if(monthNum.length==2){
					monthNum='0'+monthNum.substring(0,monthNum.length-1);
				}else{
					monthNum=monthNum.substring(0,monthNum.length-1);
				}
				$('#annotationDialog').show();
				queryAnotationData(monthNum);
				$('#annotationDialog').dialog({
					collapsible : false,
					minimizable : false,
					maximizable : false,
					draggable : true,
					modal : true,
					height : 400,
					width : 500,
					top : 20
				});
				
			});
		},
		error : function() {

		}
	});
}
/**
 * 根据年份和月份查询批注信息
 */
function queryAnotationData(monthNum) {
	var beginYear=$('#beginYear').combobox('getValue');
	var endYear=$('#endYear').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getAnnotationByYearAndMonth',
		data:{
			month:monthNum,
			beginYear:beginYear,
			endYear:endYear
		},
		dataType : 'json',
		success : function(data) {
			$('#annotationTable').datagrid('loadData', data);
		},
		error : function() {

		}
	});
}
var symbols = new Array('circle' , 'rectangle' , 'triangle' , 'diamond' ,'emptyCircle' , 'emptyRectangle' , 'emptyTriangle' , 'emptyDiamond', 'droplet', 'pin' );



/**
 * 设置更具设计纬度的格式 查询数据
 * 
 * @param {Object}
 *            xAxis
 * @param {Object}
 *            data
 */
function setDataTime(data) {
	
	var width = document.documentElement.clientWidth - 40;
	var height = document.documentElement.clientHeight - 100;
	$('#timeChart').css('width', width);
	$('#timeChart').css('height', height);
	var legend = data.legend;
	optionTime.legend.data = legend;
	var series = new Array();
	var serie = new Object();
	var values = data.data;
	var markPoint = data.markPoint;
	var l = Object.keys(values).length;
	for ( var i = 0; i < l; i++) {
		serie = new Object();
		serie.name = legend[i];
		serie.type = 'line';
		serie.symbol = symbols[i];
		serie.symbolSize = 10;
		serie.data = values['year' + legend[i]];
		serie.markPoint = data.markers[i];
		series.push(serie);
	}
	optionTime.series = series;
	myChart = echarts.init(document.getElementById('timeChart'));
	myChart.setOption(optionTime);
}

function formatMonth(val){
	if(val != null){
		return val.slice(-2);
	}
}

function formatPollutant(val){
	if(val=="liufen"){
		return "硫分";
	}
}
