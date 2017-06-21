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

var seOption= {
    title : {
        text: '2016年排污收费情况',
        subtext:'全区排污费9.76亿，30万千瓦以上SO₂排污费1.3亿',
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
        y : 'bottom',
        data:['金额','企业数量'],
        textStyle: {
            color: 'rgb(200,174,64)'
        }
    },
    grid: {
       	x : 60,
		y : 50,
		x2 : 40,
		y2 : 60
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
               
                textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
            },
            nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			},
			type : 'category',
            data : ['第四季度','第一季度','第二季度','第三季度'],
        }
    ],
    yAxis : [
    	{
            type : 'value',
            name : '金额（万元）',
            nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			},
			axisLabel : {
				textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
			},
			interval:400,
            max:4000,
            min:2000
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
			interval:4,
            max:80,
            min:60
        }
        
    ],
    color : [ '#47cc91', '#664992','#4e3e9a' ],
    series : [
        {
            name:'金额',
            type:'bar',
            data:[2993.59,2964.01,3823.5,3350.69]
        },
        {
            name:'企业数量',
            type:'bar',
            yAxisIndex:1,
            data:[65,69,69,69]
        }
    ]
};

var cityBoxplotOption = {
	title : {
		text : '2015年盟市火电厂SO₂ 排放绩效分布',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		axisPointer : {
			type : 'shadow'
		}
	},
	grid : {
		left : '10%',
		right : '3%',
		bottom : '20%'
	},
	xAxis : {
		type : 'category',
		boundaryGap : true,
		data : [ '呼市', '\n包头' ],
		nameGap : 30,
		splitArea : {
			show : false
		},
		axisLabel : {
			formatter : function(value, index) {
				return value ? value.split("").join('\n') : ""; //竖排文字
			},
			textStyle : {
				color : 'rgba(255,255,255,0.7)',
				fontSize : 8
			}
		},
		splitLine : {
			show : false
		},
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)',
			fontSize : 8
		}
	},
	yAxis : {
		type : 'value',
		name : 'SO₂绩效(g/kWh)',
		splitArea : {
			show : true
		},
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	},
	color : [ '#FF8800', '#66ff00' ],
	series : [
			{
				name : 'SO₂ 排放绩效',
				type : 'boxplot',
				data : [],
				tooltip : {
					formatter : function(param) {
						return [ 'SO₂ 排放绩效:' + '<br/>最大值: ' + param.data[4].toFixed(2),
								'上四分位: ' + param.data[3].toFixed(2), '中位值: ' + param.data[2].toFixed(2),
								'下四分位: ' + param.data[1].toFixed(2), '最小值: ' + param.data[0].toFixed(2) ].join('<br/>')
					}
				}
			}]
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
	$('#sewageChart').css('width', width / 3 +100);
	$('#sewageChart').css('height', height / 2 - 20);
	$('#so2EffectiveCityBoxChart').css('width', width /3*2-100);
	$('#so2EffectiveCityBoxChart').css('height', height / 2 - 20);
	
	$('#industryPollChart').css('width', width );
	$('#industryPollChart').css('height', height / 2 - 20);
	getSewage();
	getInddustrySO2EffectiveInfo();
	getIndustryFullScreen();
	
});


function getSewage(){
	var sewageChart = echarts.init(document.getElementById('sewageChart'));
	sewageChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	sewageChart.hideLoading();
    sewageChart.setOption(seOption);
}


/**
 * 获取工况相关数据
 */
function getInddustrySO2EffectiveInfo() {
	var cityBoxChart = echarts.init(document.getElementById('so2EffectiveCityBoxChart'));
	cityBoxChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	
	$.ajax( {
		url : '../queryAnalysisFullScreen',
		dataType : 'json',
		success : function(data) {
			toastr.success('加载成功');
			var cityXAxis = data.funnelXAxis;
			var cityBoxplot=data.cityBoxplot;
			var cityAbnormal=data.cityAbnormal;
			cityBoxChart.hideLoading();
			cityBoxplotOption.xAxis.data = cityXAxis;
			cityBoxplotOption.series[0].data= cityBoxplot;
//			cityBoxplotOption.series[1].data= cityAbnormal;
			cityBoxChart.setOption(cityBoxplotOption);
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





