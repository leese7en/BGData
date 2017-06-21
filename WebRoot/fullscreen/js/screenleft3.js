/**
 * Created by se7en on 2016/2/4.
 */

var unitInstalledOption = {
	title : {
		text : '年度装机容量分布',
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
		name : '年份',
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
	color:[ '#47cc91', '#9FDABF','#319887' ,'#227447'],
	yAxis : [ {
		name : '装机容量(万千瓦)',
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

var unitTypeOption = {
	title : {
		text : '年度装机类型分布',
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
	color:['#a69035','#a66335','#365f99','#4e3e9a','#319887'],
	xAxis : {
		name : '年份',
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
		name : '机组个数',
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

var industryPollOption = {
		title : {
			text : '2016年SO₂排放绩效与发电量对比',
			x:'center',
			textStyle : {
				color : '#cde7f7'
			}
		},
		tooltip: {
            trigger: 'axis',
            axisPointer : {
				animation : false
			},
			formatter : function(params) {
				var length = params.length;
				var tip = params[0].name;
				var name = params[0].seriesName;
				top+='<br/>'+name;
				for ( var i = 0; i < length; i++) {
					tip += '<br/>' + params[i].seriesName + ':' + (params[i].value ? params[i].value : 0).toFixed(2);
				}
				return tip;
			}
        },
        toolbox: {
            show: false
        },
        calculable: false,
        legend: {
            formatter : function(name) {
				return name;
			},
			y : 'bottom',
			textStyle : {
				color : '#FAD860'
			},
        },
        grid : {
			x : 80,
			y : 50,
			x2 : 60,
			y2 : 100
		},
		color : [ '#47cc91', '#9FDABF','#664992' ],
        xAxis: {
			name : '盟市',
            nameTextStyle : {
				color : 'rgba(255,255,255,0.7)',
			},
			type : 'category',
			axisLabel : {
				formatter: function(value, index) {
                	return value ? value.split("").join('\n') : ""; //竖排文字
            	},
				textStyle : {
					color : 'rgba(255,255,255,0.7)',
					fontSize:12
				}
			}
        },
        yAxis: [{
            type: 'value',
            name:'排放量(t)/发电量(百万kwh)',
            interval:10000,
            max:70000,
            axisLabel : {
                formatter: '{value}',
	            textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
            },
	        nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
        }, {
            type: 'value',
            name: '排放绩效(g/kwh)',
            interval:0.1,
            max:0.7,
            axisLabel : {
                formatter: '{value}',
	            textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
            },
	        nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
        }],
        series: [
            {
                name: '排放量(t)',
                type: 'bar'
            }, {
                name: '发电量(百万kwh)',
                type: 'bar'
            }, {
                name:  '排放绩效值',
                type: 'line',
                yAxisIndex: 1,
                markPoint:{
                	symbol:'pin'
                },
            }
        ]
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
	$('#unitInstalledChart').css('width', width /2);
	$('#unitInstalledChart').css('height', height / 2 - 20);
	$('#unitTypeChart').css('width', width / 2 );
	$('#unitTypeChart').css('height', height / 2 - 20);
	$('#industryPollChart').css('width', width );
	$('#industryPollChart').css('height', height / 2 - 20);
	getUnit();
	getIndustryFullScreen();
});
/**
 * 获取工况相关数据
 */
function getUnit() {
	var unitInstalled = echarts.init(document.getElementById('unitInstalledChart'));
	unitInstalled.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	var unitType = echarts.init(document.getElementById('unitTypeChart'));
	unitType.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		url : '../getBoilerTypeInstallAmountCountByYear',
		dataType : 'json',
		success : function(data) {
			toastr.success('加载成功');
			unitInstalled.hideLoading();
			var series = new Array();
			var serie = new Object();
			var xAxis = data.xAxis;
			var legend = data.amountLegend;
			
			unitInstalledOption.legend.data = legend;
			unitInstalledOption.xAxis.data = xAxis;
			var values = data.amountValues;
			var l = Object.keys(values).length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = legend[i];
				serie.type = 'bar';
				serie.stack = '统计', 
				serie.data = values[legend[i]];
				series.push(serie);
			}
			unitInstalledOption.series = series;
			unitInstalled.setOption(unitInstalledOption);
			unitType.hideLoading();
			var series = new Array();
			var serie = new Object();
			var legend = data.boilerLegend;
			unitTypeOption.xAxis.data = xAxis;
			unitTypeOption.legend.data = legend;
			var values = data.boilerValues;
			var l = Object.keys(values).length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = legend[i];
				serie.type = 'bar';
				serie.stack = '统计', 
				serie.data = values[legend[i]];
				series.push(serie);
			}
			unitTypeOption.series = series;
			unitType.setOption(unitTypeOption);
		},
		error : function() {
			toastr.error('加载失败');
		}
	});
}

/**
 * 获取工况相关数据
 */


function getIndustryFullScreen() {
	var industryPoll = echarts.init(document.getElementById('industryPollChart'));
	industryPoll.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		type : 'post',
		url : '../getIndustryFullScreen',
		data:{
			beginTime:'2016-01',
			endTime:'2016-12',
			viewPoint:'city',
			pollType:'SO2'
		},
		dataType : 'json',
		success : function(data) {
			industryPoll.hideLoading();
			var xAxis = data.xAxis;
			var legend = data.legend;
			var values = data.data;
			industryPollOption.legend.data = legend;
			industryPollOption.xAxis.data = xAxis;
			industryPollOption.series[0].name = legend[0];
			industryPollOption.series[1].name = legend[1];
			industryPollOption.series[2].name = legend[2];
			industryPollOption.series[0].data = values.pollData;
			industryPollOption.series[1].data = values.powerData;
			industryPollOption.series[2].data = values.emissionData;
		    industryPoll.setOption(industryPollOption);
		    industryPoll.on('click', function(target) {
		    	var cityName = target.name;
				getIndustryFullScreenTable(cityName)
		    });
		},
			error : function() {
		}
	});
}





