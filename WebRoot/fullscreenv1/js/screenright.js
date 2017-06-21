/**
 * Created by se7en on 2016/2/4.
 */

var dataQualityAllOption = {
	title : {
		text : '数据异常统计',
		x:'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		formatter : "{a} <br/>{b} : {c} ({d}%)"
	},
	legend : {
		show : false,
		orient : 'vertical',
		x : 'left',
		textStyle : {
			color : '#FAD860'
		},
		data : []
	},
	calculable : true,
	series : [ {
		name : '异常统计',
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
					position : 'center',
					textStyle : {
						fontSize : '16',
						fontWeight : 'bold'
					}
				}
			}
		},
		data : []
	}, {
		name : '总计',
		type : 'pie',

		radius : [ 0, '30%' ],
		label : {
			normal : {
				position : 'center',
				textStyle : {
					color : '#ff0000',
					fontSize : '16'
				}
			}
		},
		labelLine : {
			normal : {
				show : false
			}
		},
		itemStyle : {
			normal : {
				color : '#070627'
			}
		},
		data : []
	} ]
};

var dataQualityCityOption = {
	title : {
		text : '盟市数据异常统计',
		x:'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'axis',
		axisPointer : { // 坐标轴指示器，坐标轴触发有效
			type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	}
	},
	legend : {
		y : 'bottom',
		textStyle : {
			color : '#FAD860'
		},
		data : []
	},
	grid : {
		x : 60,
		y : 50,
		x2 : 40,
		y2 : 60
	},
	xAxis : {
		name : '盟市',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'category',
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
		data : []
	},
	yAxis : [ {
		name : '出现次数',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'value',
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	} ],
	series : []
};

var hotwordAllOption = {
	title : {
		text : '检查问题分析',
		x:'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		formatter : "{a} <br/>{b} : {c} ({d}%)"
	},
	legend : {
		y : 'bottom',
		data : [],
		textStyle : {
			color : '#FAD860'
		}
	},
	color : [ '#F98F6F', '#9FDABF', '#6F6ABF' ],
	calculable : true,
	series : [ {
		name : '异常统计',
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
					position : 'center',
					textStyle : {
						fontSize : '16',
						fontWeight : 'bold'
					}
				}
			}
		},
		data : []
	}, {
		name : '总计',
		type : 'pie',

		radius : [ 0, '30%' ],
		label : {
			normal : {
				position : 'center',
				textStyle : {
					color : '#ff0000',
					fontSize : '16'
				}
			}
		},
		labelLine : {
			normal : {
				show : false
			}
		},
		itemStyle : {
			normal : {
				color : '#070627'
			}
		},
		data : []
	} ]
};

var hotwordPsOption = {
	title : {
		text : '盟市检查问题统计',
		x:'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'axis',
		axisPointer : { // 坐标轴指示器，坐标轴触发有效
			type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	}
	},
	legend : {
		data : []
	},
	color : [ '#4f4f93' ],
	grid : {
		x : 50,
		y : 50,
		x2 : 40,
		y2 : 30
	},
	xAxis : {
		name : '企业',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'category',
		data : [],
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	},
	yAxis : [ {
		name : '出现次数',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'value',
		scale : true,
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	} ],
	series : [ {
		name : '企业热词统计',
		type : 'bar',
		data : []
	} ]
};

//全区状况
var cityParaOption = {
	title : {
		text : '盟市数据质量指标得分',
		subtext : '最大值恒值：1.5',
		x:'center',
		textStyle : {
			color : '#cde7f7'
		},
		subtextStyle : {
			color : '#cde7f7',
			fontSize : 12
		}
	},
	tooltip : {
		trigger : 'item'
	},
	legend : {
		data : []
	},
	color : [ 'rgb(233, 143, 111)' ],
	radar : {
		indicator : [],
		shape : 'circle',
		splitNumber : 5,
		center : [ '50%', '60%' ],
		radius : 62,
		name : {
			textStyle : {
				color : '#9bFe28'
			}
		},
		splitLine : {
			lineStyle : {
				color : 'FAD860'
			}
		},
		splitArea : {
			areaStyle : {
				color : [ 'rgba(114, 172, 209, 0.2)', 'rgba(114, 172, 209, 0.4)', 'rgba(114, 172, 209, 0.6)',
						'rgba(114, 172, 209, 0.8)', 'rgba(114, 172, 209, 1)' ],
				shadowColor : 'rgba(0, 0, 0, 0.3)',
				shadowBlur : 10
			}
		},
		axisLine : {
			lineStyle : {
				color : 'rgba(238, 197, 102, 0.5)'
			}
		}
	},
	series : [ {
		name : '指标得分分布',
		type : 'radar',
		data : []
	} ]
};

var width = 935;
var height = 768;
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
	$('#dataQualityAllChart').css('width', width / 3);
	$('#dataQualityAllChart').css('height', height / 3-20);
	$('#dataQualityCityChart').css('width', width / 3 * 2);
	$('#dataQualityCityChart').css('height', height / 3-20);

	$('#cityParaChart').css('width', width / 3);
	$('#cityParaChart').css('height', height / 3-20);
	$('#cityImproveChart').css('width', width / 3 * 2);
	$('#cityImproveChart').css('height', height / 3-30);

	$('#hotwordAllChart').css('width', width / 3);
	$('#hotwordAllChart').css('height', height / 3-20);
	$('#hotwordPsChart').css('width', width / 3 * 2);
	$('#hotwordPsChart').css('height', height / 3-30);
	getDataQuality();
	getDataQualityImprove();
	getHotWordInfo();
});
/**
 * 获取工况相关数据
 */
function getDataQuality() {
	var dataQualityAllChart = echarts.init(document.getElementById('dataQualityAllChart'));
	dataQualityAllChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	var dataQualityCityChart = echarts.init(document.getElementById('dataQualityCityChart'));
	dataQualityCityChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		url : '../getDataQuality',
		dataType : 'json',
		success : function(data) {
			toastr.success('加载成功');
			dataQualityAllChart.hideLoading();
			dataQualityAllOption.legend.data = data.legend;
			dataQualityAllOption.series[0].data = data.allValue;
			var values = data.allValue;
			var sum = 0;
			var valueSize = values.length;
			for ( var i = 0; i < valueSize; i++) {
				sum += values[i].value;
			}
			var tt = new Object();
			tt.name = sum + '';
			tt.value = sum;
			var ttArray = new Array();
			ttArray.push(tt);
			dataQualityAllOption.series[1].data = ttArray;
			dataQualityAllChart.setOption(dataQualityAllOption);
			dataQualityCityChart.hideLoading();
			var legend = data.legend;
			dataQualityCityOption.legend.data = legend;
			dataQualityCityOption.xAxis.data = data.xAxis;
			var series = new Array();
			var serie = new Object();
			var values = data.cityValue;
			var l = Object.keys(values).length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = legend[i];
				serie.type = 'bar';
				serie.stack = '统计', serie.data = values[legend[i]];
				series.push(serie);
			}
			dataQualityCityOption.series = series;
			dataQualityCityChart.setOption(dataQualityCityOption);
		},
		error : function() {
			toastr.error('加载失败');
		}
	});
}

/**
 * 获取工况相关数据
 */
function getHotWordInfo() {
	var hotwordAllChart = echarts.init(document.getElementById('hotwordAllChart'));
	hotwordAllChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	var hotwordPsChart = echarts.init(document.getElementById('hotwordPsChart'));
	hotwordPsChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		url : '../getHotwordInfo',
		dataType : 'json',
		success : function(data) {
			hotwordAllChart.hideLoading();
			hotwordAllOption.legend.data = data.legend;
			hotwordAllOption.series[0].data = data.allValue;

			var values = data.allValue;
			var sum = 0;
			var valueSize = values.length;
			for ( var i = 0; i < valueSize; i++) {
				sum += values[i].value;
			}
			var tt = new Object();
			tt.name = sum + '';
			tt.value = sum;
			var ttArray = new Array();
			ttArray.push(tt);
			hotwordAllOption.series[1].data = ttArray;

			hotwordAllChart.setOption(hotwordAllOption);
			hotwordPsChart.hideLoading();
			hotwordPsOption.xAxis.data = data.xAxis;
			hotwordPsOption.series[0].data = data.psValue;
			hotwordPsChart.setOption(hotwordPsOption);

			var psInfo = data.psInfo;
			var xAaix = data.xAxis;
			var size = xAaix.length;
			var j = 0;
			var psValue = psInfo[xAaix[j]];
			var length = psValue.length;
			if (length > 3) {
				length = 3;
			}
			var str = xAaix[j] + ' ';
			for ( var i = 0; i < length; i++) {
				var value = psValue[i];
				str += value.name + ':' + value.count + '次';
				if (i < length - 1) {
					str += ' ';
				}
			}
			$('#psHotwordInfo').html(str);
			setInterval(function() {
				j = j % size;
				var psValue = psInfo[xAaix[j]];
				var length = psValue.length;
				if (length > 3) {
					length = 3;
				}
				var str = xAaix[j] + ' ';
				for ( var i = 0; i < length; i++) {
					var value = psValue[i];
					str += value.name + ':' + value.count + '次';
					if (i < length - 1) {
						str += ' ';
					}
				}
				$('#psHotwordInfo').html(str);
				j++;
			}, 3000);
		},
		error : function() {
			toastr.error('加载失败');
		}
	});
}

function getDataQualityImprove() {
	var cityParaChart = echarts.init(document.getElementById('cityParaChart'));
	cityParaChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});

	var cityImproveChart = echarts.init(document.getElementById('cityImproveChart'));
	cityImproveChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		url : '../getDataQualityImprove',
		dataType : 'json',
		success : function(data) {
			cityImproveChart.hideLoading();
			var cityData = data.cityData;
			var legend = data.legend;
			var options = new Array();
			var option = null;
			var l = Object.keys(cityData).length;
			for ( var i = 0; i < l; i++) {
				option = new Object();
				var title = new Object();
				title.text = legend[i];
				option.title = title;
				var series = new Array();
				var serie = new Object();
				serie.data = cityData[legend[i]];
				series.push(serie);
				option.series = series;
				options.push(option);
			}
			var cityImproveOption = {
				baseOption : {
					timeline : {
						axisType : 'category',
						autoPlay : true,
						playInterval : 3000,
						controlPosition : 'right',
						left : 20,
						right : 20,
						data : data.legend,
						label : {
							normal : {
								textStyle : {
									color : '#60C0DD'
								}
							},
							emphasis : {
								textStyle : {
									color : '#FAD860'
								}
							}
						}
					},
					title : {
						x : 'center',
						textStyle : {
							color : '#cde7f7'
						}
					},
					tooltip : {
						trigger : 'axis',
						axisPointer : { // 坐标轴指示器，坐标轴触发有效
							type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
						},
						formatter : function(params) {
							var length = params.length;
							var tip = params[0].name;
							for ( var i = 0; i < length; i++) {
								if (params[i].value == '-') {
									tip += '<br/>' + params[i].seriesName + ':-';
								} else {
									tip += '<br/>' + params[i].seriesName + ':'
											+ (params[i].value ? (params[i].value).toFixed(2) : '-');
								}

							}
							return tip;
						}
					},
					color : [ '#FAD860' ],
					grid : {
						x : 50,
						y : 50,
						x2 : 40,
						y2 : 80
					},
					xAxis : [ {
						name : '月份',
						nameTextStyle : {
							color : 'rgba(255,255,255,0.7)'
						},
						type : 'category',
						axisLabel : {
							'interval' : 0,
							textStyle : {
								color : 'rgba(255,255,255,0.7)'
							}
						},
						data : data.xAxis,
						splitLine : {
							show : false
						}
					} ],
					yAxis : {
						name : '总得分',
						nameTextStyle : {
							color : 'rgba(255,255,255,0.7)'
						},
						max : 10,
						min : 8,
						type : 'value',
						axisLabel : {
							textStyle : {
								color : 'rgba(255,255,255,0.7)'
							}
						}
					},
					series : [ {
						name : '质量得分',
						type : 'line'
					} ]
				},
				options : options
			};
			cityImproveChart.setOption(cityImproveOption)
			cityParaChart.hideLoading();
			cityParaOption.radar.indicator = data.indicator;
			var cityPara = data.cityPara;
			var values = new Array();
			var value = null;
			//			var l = Object.keys(cityPara).length;
			//			for ( var i = 0; i <1; i++) {
			//				value = new Object();
			//				value.name = legend[i];
			//				value.value = cityPara[legend[i]];
			//				values.push(value);
			//			}
			value = new Object();
			value.name = legend[0];
			var vs = cityPara[legend[0]];
			var valuesSize = vs.length;
			for ( var i = 0; i < valuesSize; i++) {
				vs[i] = vs[i].toFixed(2);
			}
			value.value = vs;
			values.push(value);
			cityParaOption.series[0].data = values;
			cityParaChart.setOption(cityParaOption);
			cityImproveChart.on('timelineChanged', function(target) {
				var index = target.currentIndex;
				var values = new Array();
				var value = new Object();
				value.name = legend[index % 12];
				var vs = cityPara[legend[index % 12]];
				var valuesSize = vs.length;
				var max = 0;
				var indicator = data.indicator;
				var para = '';
				for ( var i = 0; i < valuesSize; i++) {
					vs[i] = parseFloat(vs[i]).toFixed(2);
					var tt = vs[i];
					if (tt > max) {
						max = tt;
						para = indicator[i].name;
					}
				}
				value.value = vs;
				values.push(value);
				var subtitle = '最大值' + para + ':' + max;
				cityParaOption.title.subtext = subtitle;
				cityParaOption.series[0].data = values;
				cityParaChart.setOption(cityParaOption)
			});
		},
		error : function() {
			toastr.error('加载失败');
		}
	});
}
