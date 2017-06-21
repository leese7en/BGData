/**
 * Created by se7en on 2016/2/4.
 */

$(document).ready(function() {
	$('.help-tip').find('p').html('对选定时间、盟市的AQI日指数，SO2、NOx、烟尘日均排放浓度进行展示对比，同时展示电厂污染排放总量在全区排放总量的占比。')
	var nowtime = new Date().getTime();
	$('.form_datetime').find('input').blur(function() {
		if (!onlyCheckDateDay($(this).val())) {
			$(this).val(utils.dateFormat(nowtime, 'yyyy-MM-dd'))
			$(this).parent('.form_datetime').datetimepicker('update')
		}
	})
	queryCity();
	initDate();
	$(window).resize(function() {
		queryData();
	});
	queryData();
});

function onlyCheckDateDay(input) {
	var reg = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");
	if (!reg.test(input) || !input.trim().length == 10) {
		$.messager.alert('信息', '日期格式必须为 xxxx - xx - xx ', 'info');
		return false;
	}
	return true;
}
/**
 * 初始化日期控件
 */
function initDate() {
	var nowtime = new Date().getTime();
	$('#beginTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 90, 'yyyy-MM-dd'));
	$('#endTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM-dd'));
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm-dd',
		autoclose : true,
		minView : 'month',
		todayHighlight : true,
		todayBtn : true,
		forceParse : false,
		allowInputToggle : true
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
	var width = document.documentElement.clientWidth - 30;
	var height = document.documentElement.clientHeight - 60;
	$('#main').css('width', width / 3 * 2 + 220);
	$('#main').css('height', height / 2 - 15);
	$('#main2').css('width', width / 3 * 2 + 220);
	$('#main2').css('height', height / 2 - 15);
	$('#pie').css('height', parseFloat(height) - 20);
	$('#pie').css('width', width / 3 - 120);

	var cityId = $('#city').combobox('getValue');
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	if (beginTime >= endTime) {
		$.messager.alert('信息', '开始日期不能晚于结束日期', '提示信息');
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
			var flag = data.flag;
			if (flag < 0) {
				$.messager.alert('信息', data.message + "!", 'info');
				data.data = {
					"total" : {
						"NOx" : [ {
							"name" : "",
							"value" : ""
						} ],
						"dust" : [ {
							"name" : "",
							"value" : ""
						} ],
						"SO2" : [ {
							"name" : "",
							"value" : ""
						} ]
					},
					"NOx" : [ "" ],
					"SO2" : [ "" ],
					"dust" : [ "" ],
					"aqiData" : [ {
						"name" : "",
						"value" : ""
					} ],
					"axisData" : [ "" ]
				};
				initChartLine(data.data);
				return;
			}
			initChartLine(data.data);
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
            formatter: function(params) {
                var res = params[0].name;
                var data = params[0].data;
                res += '<br/>' + params[0].seriesName + ':' + data.value+'<br/>首要污染物:'+data.name;
                return res;
            }
        },
        legend: {
            data: ['AQI指数']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataZoom: {
                    show: true
                },
                magicType: {
                    show: false,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true,
                    name:'空气质量变化与污染物浓度'
                }
            }
        },
        grid: {
            x: 40,
            y: 40,
            x2: 20,
            y2: 25
        },
        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisTick: {
                onGap: false
            },
            splitLine: {
                show: false
            },
            data: data.axisData
        }],
        yAxis: [{
            type: 'value',
            scale: true,
            boundaryGap: [0.05, 0.05],
            splitArea: {
                show: true
            }
        }],
        series: [{
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
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            },
            markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                }, {
                    type: 'min',
                    name: '最小值'
                }]
            },
        }]
    };
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(option);

    var option2 = {
        tooltip: {
            trigger: 'axis',
            showDelay: 0 ,
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
        legend: {
            y: "top",
            data: ['SO2日均排放浓度', 'NOx日均排放浓度', '烟尘日均排放浓度']
        },
        toolbox: {
            y: -30,
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataZoom: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: false,
                    type: ['line', 'bar']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        grid: {
            x: 40,
            y: 5,
            x2: 20,
            y2: 40
        },
        xAxis: [{
            type: 'category',
            position: 'top',
            boundaryGap: true,
            axisLabel: {
                show: false
            },
            axisTick: {
                onGap: false
            },
            splitLine: {
                show: false
            },
            data: data.axisData
        }],
        yAxis: [{
            type: 'value',
            scale: true,
            boundaryGap: [0.05, 0.05],
            splitArea: {
                show: true
            },
            name:'mg/m³'
        }],
        series: [{
            name: 'SO2日均排放浓度',
            type: 'line',
            symbol: 'none',
            data: data.SO2,
            markLine: {
                symbol: 'none',
                itemStyle: {
                    normal: {
                        label: {
                            show: false
                        }
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
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
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
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
                data: [{
                    type: 'average',
                    name: '平均值'
                }]
            }
        }]
    };
    myChart2 = echarts.init(document.getElementById('main2'));
    myChart2.setOption(option2);
    window.addEventListener("resize", function() {
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
            padding: [5, 20,15,0],
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
        	x: 'right',
        	y:'center',
            data: ['火电厂SO2', '其它SO2','火电厂NOx', '其它NOx','火电厂烟尘', '其它烟尘']
        },

        calculable: false,
        series: [{
            name: 'SO2',
            type: 'pie',
            radius: ['16%', '36%'],
            center: ['45%', '25%'],
            data: data.total.SO2,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
            }
        }, {
            name: 'NOx',
            type: 'pie',
            radius: ['16%', '36%'],
            center: ['45%', '55%'],
            data: data.total.NOx,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
            }
        },{
            name: '烟尘',
            type: 'pie',
            radius: ['16%', '36%'],
            avoidLabelOverlap: true,
            center: ['45%', '85%'],
            data: data.total.dust,
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    }
                },
            }
        } ]
    };
    var pieChart = echarts.init(document.getElementById('pie'));
    pieChart.setOption(pieOption);
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