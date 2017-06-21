/**
 * Created by se7en on 2016/2/4.
 */
var option= {
        	legend: {
            itemWidth: 20,
            itemHeight: 20,
            x:'20',
           y:'20',
                data: [{
                    name: '高排放企业',
                    icon: 'image://../images/red.png',
                }, {
                    name: '高耗能企业',
                    icon: 'image://../images/black.png',
                }, {
                    name: '高排放+耗能企业',
                    icon: 'image://../images/redblack.png',
                }, ],
            },
            series: [
                {
                    name: '高排放企业',
                    type: 'map',
                    mapType: '内蒙古',
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: 'lightgreen',
                            color: 'orange',
                            label: {
                                show: false
                            }
                        },
                        emphasis: {                 // 也是选中样式
                            borderWidth: 2,
                            borderColor: '#fff',
                            color: '#32cd32',
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    data: [],
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'skyblue',
                                label: {
                                    show: false
                                }
                            }
                        },
                        data: [
                            {name: '红1', value: 350, symbol: 'image://../images/red.png'},
                            {name: '红2', value: 350, symbol: 'image://../images/red.png'},
                            {name: '红3', value: 350, symbol: 'image://../images/red.png'},
                            {name: '红4', value: 350, symbol: 'image://../images/red.png'},
                        ]
                    },
                    geoCoord: {
                        '红1': [107.36, 39.39],
                        '红2': [116.29, 42.59],
                        '红3': [122.13, 47.18],
                        '红4': [119.07, 49.19],
                    }
                },
                {
                    name: '高耗能企业',
                    type: 'map',
                    mapType: '内蒙古',
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: 'lightgreen',
                            color: 'orange',
                            label: {
                                show: false
                            }
                        },
                        emphasis: {                 // 也是选中样式
                            borderWidth: 2,
                            borderColor: '#fff',
                            color: '#32cd32',
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    data: [],
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'skyblue',
                                label: {
                                    show: false
                                }
                            }
                        },
                        data: [
                            {name: '黑1', value: 350, symbol: 'image://../images/black.png'},
                            {name: '黑2', value: 350, symbol: 'image://../images/black.png'},
                            {name: '黑3', value: 350, symbol: 'image://../images/black.png'},
                            {name: '黑4', value: 350, symbol: 'image://../images/black.png'},
                            {name: '黑5', value: 350, symbol: 'image://../images/black.png'},

                        ]
                    },
                    geoCoord: {
                        '黑1': [107.68, 41.21],
                        '黑2': [111.15, 40.04],
                        '黑3': [110.76, 42.20],
                        '黑4': [118.88, 43.32],
                        '黑5': [112.53, 43.67],
                    }
                },
                {
                    name: '高排放+耗能企业',
                    type: 'map',
                    mapType: '内蒙古',
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: 'lightgreen',
                            color: 'orange',
                            label: {
                                show: false
                            }
                        },
                        emphasis: {                 // 也是选中样式
                            borderWidth: 2,
                            borderColor: '#fff',
                            color: '#32cd32',
                            label: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    data: [],
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'skyblue',
                                label: {
                                    show: false
                                }
                            }
                        },
                        data: [
                            {name: '红黑1', value: 350, symbol: 'image://../images/redblack.png'},
                            {name: '红黑2', value: 350, symbol: 'image://../images/redblack.png'},
                            {name: '红黑3', value: 350, symbol: 'image://../images/redblack.png'},
                            {name: '红黑4', value: 350, symbol: 'image://../images/redblack.png'},
                            {name: '红黑5', value: 350, symbol: 'image://../images/redblack.png'},

                        ]
                    },
                    geoCoord: {
                        '红黑1': [119.90, 43.57],
                        '红黑2': [118.41, 45.98],
                        '红黑3': [118.70, 45.23],
                        '红黑4': [122.15, 49.81],
                        '红黑5': [122.51, 46.71],
                    }
                }
            ]
        };
$(document).ready(function() {
	getMap();
	getAnalysis();
	selectQueryYear();
});

function getMap() {
        var myChart = echarts.init(document.getElementById('main'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}

/**
 * 
 * @return
 */
function getAnalysis(year,emission){
	if(!year){
		year = 2011;
	}
	$.ajax( {
		type : 'post',
		url : '../getAnalysisForAnalysis',
		dataType : 'json',
		data:{
		   year:year,
		   emission:emission
	    },
		success : function(data) {
			$('#ranking').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('error', '获取数据失败！', 'error');
		}
	});
}

function selectQueryYear(){
	var data = $('#queryYear').combobox('setValue','请选择');
	$("#queryYear").combobox({
		onChange: function (n,o) {
		var emission =$('#energyOrEmission').combobox('getValue');
			if(n=='请选择'){
				getAnalysis(2011,emission);
			}else{
				getAnalysis(n,emission);
			}
		}
	});
}



