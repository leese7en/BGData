/**
 * Created by se7en on 2016/2/4.
 */

$(document).ready(function() {
	initDate();
	queryCity();
	var width = document.documentElement.clientWidth - 30;
	var height = document.documentElement.clientHeight - 30;
	// $('#main').css('width', width - 200);
	$('#main').css('height', height / 2);
	// $('#main2').css('width', width - 200);
	$('#main2').css('height', height / 2);
	// $('#pie').css('width', 180);
	$('#pie').css('height', parseFloat(height));
	queryData();
});

/**
 * 初始化日期控件
 */
function initDate() {
	var nowtime = new Date().getTime();
	$('#beginTime').datebox('setValue', utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM-dd'));
	$('#endTime').datebox('setValue', utils.dateFormat(nowtime, 'yyyy-MM-dd'));
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
			$('#city').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value
			});
			$('#city').combobox('setValue', '1501');
		},
		error : function() {

		}
	});
}

/**
 * 查询 aqi 数据
 */
function queryData() {
	var cityId = $('#city').combobox('getValue');
	var beginTime = $('#beginTime').datebox('getValue');
	var endTime = $('#endTime').datebox('getValue');
	if (beginTime >= endTime) {
		$.messager.alert('error', '开始日期不能早于结束日期', 'error');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getAQIInfoDay',
		data : {
			cityId : cityId,
			beginTime : beginTime,
			endTime : endTime
		},
		dataType : 'json',
		success : function(data) {
			initChartLine(data);
		},
		error : function() {

		}
	});
}

/**
 * 构建 chart 组件
 * @return {TypeName} 
 */
function initChartLine(data) {
	var option
= {
        tooltip: {
            trigger: 'axis',
            showDelay: 0,
            formatter: function (params) {
                var res = params[0].name;
                res += '<br/>' + params[0].seriesName + ':' + params[0].value;
                return res;
            }
        },
        legend: {
            data: ['AQI指数']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataZoom: {show: true},
                magicType: {show: false, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        dataZoom: {
            y: 250,
            show: false,
            realtime: true,
            start: 50,
            end: 100
        },
        grid: {
            x: 80,
            y: 40,
            x2: 20,
            y2: 25
        },
        xAxis: [
            {
                type: 'category',
                boundaryGap: true,
                axisTick: {onGap: false},
                splitLine: {show: false},
                data: data.axisData
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                boundaryGap: [0.05, 0.05],
                splitArea: {show: true}
            }
        ],
        series: [
            {
                name: 'AQI指数',
                type: 'line',
                data: data.aqiData,
                markLine: {
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        }
                    },
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                },
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
            } 
        ]
    };
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(option);
    
    window.addEventListener("resize", function () {

    	myChart.resize();

    });
    
    var option2 = {
        tooltip: {
            trigger: 'axis',
            showDelay: 0             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        },
        legend: {
            y: "bottom", 
            data: ['SO2日均排放浓度', 'NOx日均排放浓度', '烟尘日均排放浓度']
        },
        toolbox: {
            y: -30,
            show: false,
            feature: {
                mark: {show: true},
                dataZoom: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: false, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        dataZoom: {
            show: false,
            realtime: true,
            start: 50,
            end: 100
        },
        grid: {
            x: 80,
            y: 5,
            x2: 20,
            y2: 40
        },
        xAxis: [
            {
                type: 'category',
                position: 'top',
                boundaryGap: true,
                axisLabel: {show: false},
                axisTick: {onGap: false},
                splitLine: {show: false},
                data:  data.axisData
            }
        ],
        yAxis: [
            {
                type: 'value',
                scale: true,
                boundaryGap: [0.05, 0.05],
                splitArea: {show: true}
            }
        ],
        series: [
            {
                name: 'SO2日均排放浓度',
                type: 'line',
                symbol: 'none',
                data:data.SO2,
                markLine: {
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        }
                    },
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }, {
                name: 'NOx日均排放浓度',
                type: 'line',
                symbol: 'none',
                data: data.NOx,
                markLine: {
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        }
                    },
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }, {
                name: '烟尘日均排放浓度',
                type: 'line',
                symbol: 'none',
                data: data.dust,
                markLine: {
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            }
                        }
                    },
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
    myChart2 = echarts.init(document.getElementById('main2'));
    myChart2.setOption(option2);
    
    window.addEventListener("resize", function () {

    	myChart2.resize();

    });
    
    myChart.connect([myChart2]);
    myChart2.connect([myChart]);

    var pieOption = {
        title: {
            text: '火电厂和全区污染物对比',
            padding: 15,
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x: 'center',
            y: 'bottom',
            data: ['火电厂', '全区']
        },

        calculable: false,
        series: [
            {
                name: '烟尘',
                type: 'pie',
                radius: ['20%', '40%'],
                avoidLabelOverlap: true,

                center: ['45%', '25%'],
                data: [
                    {value: 56, name: '火电厂'},
                    {value: 354, name: '全区'}
                ]
            },
            {
                name: 'SO2',
                type: 'pie',
                radius: ['20%', '40%'],
                center: ['45%', '52%'],

                data: [
                    {value: 123, name: '火电厂'},
                    {value: 178, name: '全区'}
                ]
            },
            {
                name: 'NOx',
                type: 'pie',
                radius: ['20%', '40%'],
                center: ['45%', '79%'],
                data: [
                    {value: 35, name: '火电厂'},
                    {value: 104, name: '全区'}
                ]
            }
        ]
    };


    var pieChart = echarts.init(document.getElementById('pie'));
    pieChart.setOption(pieOption);

   /* setTimeout(function () {
        window.onresize = function () {
            myChart.resize();
            myChart2.resize();
            pieChart.resize();
        };
    }, 200);*/
    
    window.addEventListener("resize", function () {
    	
    	pieChart.resize();

    });
}

/**
 * 日期格式化
 * @param {Object} date
 * @return {TypeName} 
 */
function myformatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

