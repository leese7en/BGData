/**
 * Created by se7en on 2016/2/4.
 */

var unitInstalledOption = {
	title : {
		text : '年度装机容量分布',
		x : 'center',
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
	color : [ '#47cc91', '#9FDABF', '#319887', '#227447' ],
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
		x : 'center',
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
	color : [ '#a69035', '#a66335', '#365f99', '#4e3e9a', '#319887' ],
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

var epOption= {
    title : {
        text: '2016年环保电价扣减电量',
        subtext:'全区84家企业，209个排口',
        x:'center',
        textStyle: {
               color : '#cde7f7'
            }
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            
            type : 'shadow'        
        }
    },
    legend: {
        x : 'center',
        y : 'bottom',
        data:['二氧化硫电量','氮氧化物电量','烟尘电量','企业数量'],
        textStyle: {
            color: 'rgb(200,174,64)',
            fontSize: 14
        }
    },
    grid: {
       	x : 60,
		y : 50,
		x2 : 40,
		y2 : 110
    },
    xAxis : [
        {
            splitLine:{show: true},
            axisLine: {
                lineStyle: {
                    color: '#eee'
                }
            },
            axisLabel:{
                interval:0,
                formatter: function (params) {
                    var newParamsName = "";
                    var paramsNameLength = params.length;
                    for (var p = 0; p < paramsNameLength; p++) {
                        newParamsName += params.substring(p, p+1)+'\n';
                    }
                    return newParamsName;
                },
                textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
            },
            nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			},
			type : 'category',
            data : ['呼和浩特市','包头市','呼伦贝尔市','兴安盟','通辽市','赤峰市','锡林郭勒盟','乌兰察布市','鄂尔多斯市','巴彦淖尔市','乌海市','阿拉善盟'],
        }
    ],
    yAxis : [
    	{
            type : 'value',
            name : '电量（15亿千瓦时）',
            nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			},
			axisLabel : {
				textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
			},
			interval:4000,
            max:20000,
        },
       	 {
           	type : 'value',
            name : '企业数量',
           	nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			},
			axisLabel : {
				textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
			},
			interval:5,
            max:25,
        }
        
    ],
    color : [ '#47cc91', '#9FDABF','#664992','#4e3e9a' ],
    series : [
        {
            name:'二氧化硫电量',
            type:'bar',
            data:[822.362,2658.098,1925.612,317.469,4696.808,15448.982,2037.615,7973.382,10096.37,1980.592,8191.533,157.397]
        },
        {
            name:'氮氧化物电量',
            type:'bar',
            data:[1505.236,3500.583,7377.822,87.94,2276.577,1641.008,3355.84,11021.049,11830.732,781.114,5678.478,1187.717]
        },
        {
            name:'烟尘电量',
            type:'bar',
            data:[2111.717,1905.035,4652.111,199.842,4273.995,897.657,1452.035,11321.12,11302.845,1089.853,5310.87,143.276]
        },
        {
            name:'企业数量',
            type:'line',
            stack: '广告',
            yAxisIndex:1,
            data:[6,6,12,2,5,8,5,8,20,4,6,2]
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
 * 环保电价
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
	industryPoll.hideLoading();
    industryPoll.setOption(epOption);
}





