/**
 * Created by se7en on 2016/2/4.
 */

var currentId = '1';
var currentFlag = '0'
var currentName = '设备问题';
var option = {
	title : {
		text : '自动监控检查结果分析 全区热词类别占比',
		subtext : '内部为热词大类，外部为热词细类',
		x : 'center'
	},
	tooltip : {
		trigger : 'item',
		formatter : "{a} <br/>{b}: {c} ({d}%)"
	},
	toolbox : {
		right : 15,
		top : 5,
		show : true,
		feature : {
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
				name : '自动监控检查结果分析'
			}
		}
	},
	legend : {
		show : false,
		orient : 'vertical',
		x : 'center',
		bottom : 20,
		data : [ '热词主类', '热词细类' ]
	},
	series : [
			{
				name : '热词主类',
				type : 'pie',
				selectedMode : 'single',
				radius : [ 0, '30%' ],
				center : [ '50%', '50%' ],
				itemStyle : {
					normal : {
						color : function(params) {
							var index = params.dataIndex;
							var newColor = "";
							var colorList = [ '#F4E001', '#F0805A', '#26C0C0' ];
							newColor = colorList[index];
							return newColor;
						}
					},
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				},
				label : {
					normal : {
						position : 'inner'
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				}
			},
			{
				name : '热词细类',
				type : 'pie',
				radius : [ '40%', '55%' ],
				center : [ '50%', '50%' ],
				itemStyle : {
					normal : {
						color : function(params) {
							var index = params.dataIndex;
							var newColor = "";
							var colorList = [ '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', '#FE8463',
									'#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', '#D7504B', '#C6E579', '#F4E001',
									'#F0805A', '#26C0C0' ];
							newColor = colorList[index];
							return newColor;
						}
					},
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
};

var option1 = {
	title : {
		text : '自动监控检查结果分析 盟市热词类别占比',
		subtext : '内部为盟市数据，外部为企业数据',
		x : 'center'
	},
	tooltip : {
		trigger : 'item',
		formatter : "{a} <br/>{b} : {c} ({d}%)"
	},
	toolbox : {
		right : 15,
		top : 5,
		show : true,
		feature : {
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
				name : '自动监控检查结果分析'
			}
		}
	},
	legend : {
		left : 'center',
		bottom : 20,
		show : false
	},
	series : [
			{
				name : '设备问题',
				type : 'pie',
				selectedMode : 'single',
				radius : [ 0, '30%' ],
				center : [ '50%', '50%' ],
				itemStyle : {
					normal : {
						color : function(params) {
							var index = params.dataIndex;
							var newColor = "";
							var colorList = [ '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', '#FE8463',
									'#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', '#D7504B', '#C6E579', '#F4E001',
									'#F0805A', '#26C0C0' ];
							newColor = colorList[index];
							return newColor;
						}
					},
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				},
				label : {
					normal : {
						position : 'inner'
					}
				},
				labelLine : {
					normal : {
						show : false
					}
				}
			},
			{
				name : '设备问题',
				type : 'pie',
				radius : [ '40%', '55%' ],
				center : [ '50%', '50%' ],
				textStyle : {
					fontSize : 10
				},
				itemStyle : {
					normal : {
						color : function(params) {
							var index = params.dataIndex;
							var newColor = "";
							var colorList = [ '#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', '#FE8463',
									'#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', '#D7504B', '#C6E579', '#F4E001',
									'#F0805A', '#26C0C0' ];
							newColor = colorList[index];
							return newColor;
						}
					},
					emphasis : {
						shadowBlur : 10,
						shadowOffsetX : 0,
						shadowColor : 'rgba(0, 0, 0, 0.5)'
					}
				}
			} ]
};
$(document)
		.ready(
				function() {
					$('.help-tip')
							.find('p')
							.html(
									'将报告中所有问题分为三类：设备问题、管理问题及数据问题，并对每一类问题进行二级分类；对选定时间段内，全区范围内三类问题出现的频次进行统计，对每类问题可实现向下钻取，展示每个盟市出现该类问题的占比。')
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
					var nowtime = new Date().getTime();
					$('#beginTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30 * 6, 'yyyy-MM'));
					$('#endTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
					queryHotwordByType();
					$(window).resize(function() {
						queryHotwordByType();
					});
				});
/**
 * 获取热词类型和盟市分布信息
 * @return {TypeName} 
 */
function queryHotwordByType() {
	var width = document.documentElement.clientWidth - 20;
	var height = document.documentElement.clientHeight - 60;
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	if (beginTime == "" || endTime == "") {
		$.messager.alert('信息', '开始时间和结束时间为必填项!', 'info');
		return false;
	}
	$('#pieType').css('width', width / 2);
	$('#pieType').css('height', height);
	$('#pieCity').css('width', width / 2);
	$('#pieCity').css('height', height);

	$.ajax( {
		type : 'get',
		url : '../countHotwordByType',
		dataType : 'json',
		data : {
			beginTime : beginTime,
			endTime : endTime
		},
		success : function(data) {
			var myChart = echarts.init(document.getElementById('pieType'));
			var type = data.type.parent.series;
			var length = type.length;
			var series = new Array();
			var o = new Object();
			for ( var i = 0; i < length; i++) {
				var oo = type[i];
				o = new Object();
				o.name = oo.name;
				o.value = oo.value;
				o.id = oo.id;
				o.flag = oo.flag;
				series.push(o);
			}
			option.series[0].data = series;
			/**
			 * 更新热词细类信息
			 */
			if (typeof (data.type.child) == 'undefined') {
				$.messager.alert('信息', '没有满足条件的数据', 'info')
			} else {
				var type = data.type.child.series;
			}
			var length = type.length;
			var series = new Array();
			var o = new Object();
			for ( var i = 0; i < length; i++) {
				var oo = type[i];
				o = new Object();
				o.name = oo.name;
				o.value = oo.value;
				o.id = oo.id;
				o.flag = oo.flag;
				series.push(o);
			}
			option.series[1].data = series;
			myChart.setOption(option);
			/**
			 * 更新盟市热词分布信息
			 * 
			 */
			option1.legend.data = data.city.city.legend;
			var city = data.city.city.series;
			var length = city.length;
			var series = new Array();
			var o = new Object();
			for ( var i = 0; i < length; i++) {
				var oo = city[i];
				o = new Object();
				o.name = oo.name;
				o.id = oo.id;
				o.value = oo.value;
				o.flag = 1;
				series.push(o);
			}
			option1.series[0].data = series;

			var enterprise = data.city.enterprise.series;
			var length = enterprise.length;
			var series = new Array();
			var o = new Object();
			for ( var i = 0; i < length; i++) {
				var oo = enterprise[i];
				o = new Object();
				o.name = oo.name;
				o.id = oo.id;
				o.value = oo.value;
				o.flag = 0;
				series.push(o);
			}
			option1.series[1].data = series;
			option1.series[1].name = option1.series[1].name + '-' + data.city.enterprise.cityName;
			var myChart1 = echarts.init(document.getElementById('pieCity'));
			myChart1.setOption(option1, true);
			myChart.on('click', function(param) {
				initChildInfo(param);
			});
			myChart1.on('click', function(param) {
				initPSCodeInfo(param);
			});
		},
		error : function() {
			$.messager.alert('信息', '获取数据失败！', 'info');
		}
	});
}
/**
 * 获取点击的明细信息
 * @param {Object} param
 */
function initChildInfo(param) {
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	var data = param.data;
	currentId = data.id;
	currentName = data.name
	var typeId = data.id;
	var flag = data.flag;
	currentFlag = flag;
	$.ajax( {
		type : 'get',
		url : '../countHotwordCityInfoByType',
		data : {
			typeId : typeId,
			flag : flag,
			beginTime : beginTime,
			endTime : endTime
		},
		dataType : 'json',
		success : function(data) {
			//设置盟市的热词分布信息
		var cityData = data.city;
		option1.legend.data = cityData.legend;
		var city = cityData.series;
		var length = city.length;
		var series = new Array();
		var o = new Object();
		for ( var i = 0; i < length; i++) {
			var oo = city[i];
			o = new Object();
			o.name = oo.name;
			o.id = oo.id;
			o.value = oo.value;
			o.flag = 1;
			series.push(o);
		}
		option1.series[0].name = param.name;
		option1.series[0].data = series;

		var enterpriseData = data.enterprise;
		option1.legend.data = enterpriseData.legend;
		var enterprise = enterpriseData.series;
		var length = enterprise.length;
		var series = new Array();
		var o = new Object();
		for ( var i = 0; i < length; i++) {
			var oo = enterprise[i];
			o = new Object();
			o.name = oo.name;
			o.id = oo.id;
			o.value = oo.value;
			o.flag = 0;
			series.push(o);
		}
		option1.series[1].name = param.name + '-' + enterpriseData.cityName;
		option1.series[1].data = series;

		var myChart1 = echarts.init(document.getElementById('pieCity'));
		myChart1.setOption(option1, true);
		myChart1.on('click', function(param) {
			initPSCodeInfo(param);
		});
		var detailData = data.detail;
		//如果当前是主类，则热词细类信息
		if (detailData) {
			var detail = detailData.series;
			var length = detail.length;
			var series = new Array();
			var o = new Object();
			for ( var i = 0; i < length; i++) {
				var oo = detail[i];
				o = new Object();
				o.name = oo.name;
				o.value = oo.value;
				o.id = oo.id;
				o.flag = oo.flag;
				series.push(o);
			}
			option.series[1].data = series;
			var myChart = echarts.init(document.getElementById('pieType'));
			myChart.setOption(option);
			myChart.on('click', function(param) {
				initChildInfo(param);
			});

		}
	},
	error : function() {
		$.messager.alert('信息', '获取数据失败！', 'info');
	}
	});
}
/**
 * 获取点击的明细信息
 * @param {Object} param
 */
function initPSCodeInfo(param) {
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	var data = param.data;
	var cityId = data.id;
	var flag = data.flag;
	if (flag == 0) {
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../countHotwordPSCodeInfoByType',
		data : {
			typeId : currentId,
			cityId : cityId,
			beginTime : beginTime,
			endTime : endTime,
			flag : currentFlag
		},
		dataType : 'json',
		success : function(data) {
			var detail = data.series;
			var length = detail.length;
			var series = new Array();
			var o = new Object();
			for ( var i = 0; i < length; i++) {
				var oo = detail[i];
				o = new Object();
				o.name = oo.name;
				o.value = oo.value;
				o.id = oo.id;
				o.flag = 0;
				series.push(o);
			}
			option1.series[1].name = currentName + '-' + param.name;
			option1.series[1].data = series;
			var myChart1 = echarts.init(document.getElementById('pieCity'));
			myChart1.setOption(option1, true);
			myChart1.on('click', function(param) {
				initPSCodeInfo(param);
			});
		},
		error : function() {
			$.messager.alert('信息', '获取数据失败！', 'info');
		}
	});
}
