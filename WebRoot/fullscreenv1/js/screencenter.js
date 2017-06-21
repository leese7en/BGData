/**
 * Created by se7en on 2016/4/26.
 */
/**
 * Created by se7en on 2016/2/4.
 */
var echarts;
var myChart;
var myChartInstalledBar;
var myChartPowerBar;

var width = 1024;
var height = 518;

var installedOption = {
	title : {
		text : '全区装机总量(万千瓦)',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item'
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		y : 50,
		y2 : 60
	},
	xAxis : [ {
		type : 'category',
		show : false,
		data : [ '火电', '风电', '其它' ]
	} ],
	yAxis : [ {
		type : 'value',
		show : true,
		splitNumber : 4,
		max : 8000,
		min : 0,
		axisLabel : {
			textStyle : {
				color : '#60C0DD'
			}
		}
	} ],
	series : [ {
		'name' : '全区装机总量(万千瓦)',
		'type' : 'bar',
		itemStyle : {
			normal : {
				color : function(params) {
					var colorList = [ '#EEC900', '#00FF00', '#FF6600' ];
					return colorList[params.dataIndex]
				},
				label : {
					show : true,
					position : 'top',
					formatter : '{b}\n{c}'
				}
			}
		},
		'data' : []
	} ]
};

var powerOption = {
	title : {
		text : '全区发电量(万千瓦时)',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item'
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		y : 50,
		y2 : 60
	},
	xAxis : [ {
		type : 'category',
		show : false,
		data : [ '火电', '风电', '其它' ]
	} ],
	yAxis : [ {
		type : 'value',
		show : true,
		splitNumber : 4,
		max : 4000,
		min : 0,
		axisLabel : {
			textStyle : {
				color : '#60C0DD'
			}
		}
	} ],
	series : [ {
		'name' : '全区发电量(万千瓦时)',
		'type' : 'bar',
		itemStyle : {
			normal : {
				color : function(params) {
					var colorList = [ '#EEC900', '#00FF00', '#FF6600' ];
					return colorList[params.dataIndex]
				},
				label : {
					show : true,
					position : 'top',
					formatter : '{b}\n{c}'
				}
			}
		},
		'data' : []
	} ]

};
var timeline= {
	data : [ '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01' ],
	currentData : {},
	label : {
		formatter : function(s) {
			return s.slice(0, 4);
		},
		textStyle : {
			color : '#60C0DD'
		}
	},
	controlPosition : 'right',
	autoPlay : true,
	playInterval : 5000,
}

$(document).ready(function() {
	var fakeLoader = $(".fakeloader").fakeLoader({spinner:"spinner6"});
	
	$('#installedBar').css('width', width / 4+20);
	$('#installedBar').css('height', height/ 2);
	$('#powerBar').css('width', width /4+20);
	$('#powerBar').css('height', height/ 2);
	$('#powerMain').css('width', width);
	$('#powerMain').css('height', height);
	$.ajax( {
		type : 'get',
		url : '../getHistoricalChangeData',
		dataType : 'json',
		success : function(data) {
			dataMap.dataPowerCom = dataFormatter(data.countryPower.powerIncrement, com);
			dataMap.dataInstalledCom = dataFormatter(data.countryPower.installedIncrement, com);
			dataMap.dataEffectiveCom = dataFormatter(data.countryPower.effectiveIncrement, com);
			dataMap.dataInstalled = dataFormatter(data.cityPower.installed, com);
			dataMap.dataPower = dataFormatter(data.cityPower.power, com);
			dataMap.powerPoint = data.powerPoint;
			initCharts(data);
			$(fakeLoader).fadeOut();
		},
		error : function(data) {
			$(fakeLoader).fadeOut();
		}
	});
});
/**
 * 显示图表信息
 * @param {Object} data
 * @return {TypeName} 
 */
function initCharts(data) {
	var option = {
		timeline : timeline,
		options : [ {
			title : {
				x:'center',
				'text' : '2011年电力建设情况',
				textStyle : {
					color : '#cde7f7',
					fontSize:20
				}
			},
			tooltip : {
				'trigger' : 'item',
				show:false
			},
			legend : {
				orient : 'horizontal',
				x : '65%',
				y:'85%',
				textStyle : {
					color : '#FAD860'
				},
				data : [ '电厂', '500KV电网','220KV电网','煤矿'],
				
			},
			color:['#e7453d','#68228B','#0000FF','#48ac47'],
			toolbox : {
				'show' : false,
				'feature' : {
					'mark' : {
						'show' : true
					},
					'dataView' : {
						'show' : true,
						'readOnly' : false
					},
					'restore' : {
						'show' : true
					},
					'saveAsImage' : {
						'show' : true
					}
				}
			},
			series : [{
				name : '电厂',
				type : 'map',
				mapType : '内蒙古',
				selectedMode : 'single',
				itemStyle : {
					normal:{
					areaStyle:{
					color :'#A4D3EE', 
						},
					label:{
						show:true,
					},
				borderColor: '#fff',
				borderWidth: 1,
				},
				emphasis : {
					label : {
						show : true
					}
				}
				},
				data : [],
				markPoint : {
					symbolSize : 2,
					itemStyle : {
						normal : {
							borderColor : '#e7453d',
							borderWidth : 3, 
							label : {
								show : false
							}
						},
	                    emphasis:{
	                    	color: 'black',
                         label: {
                             show: true,
                             formatter : function (params) {
                    			var data =params.data;
                                return '企业名称：'+params.name + '\n企业类型：' + data.industryTypeName + '\n装机容量(MW)：' + data.installedAmount+'\n发电量：'+data.powerAmount;
                         },
                         textStyle: {
                         	color: 'blue'
                     		}
                          }
                        }
					},
					data : data.powerPoint.enterprise[2011]
				},
				geoCoord :  data.powerPoint.geoCoord[2011]
			}, {
				name : '500KV电网',
				type : 'map',
				mapType : '内蒙古',
				tooltip : {
					show : false
				},
				
				data : [],
				markLine : {
					symbol : [ 'circle', 'circle' ],
					symbolSize : 1,
					effect:{
					    show: true,
			            period: 50,
			            trailLength: 0.7,
			            color: '#fff',
			            symbolSize: 1
					},
					itemStyle : {
						normal : {
							borderWidth : 1,
							lineStyle : {
								type : 'solid'
							}
						},
	                    emphasis:{
                         label: {
                             show: true,
                             formatter : function (params) {
                    			var data =params.name;
                                return '500KV电网-'+data;
                         },
                         textStyle: {
                         	color: 'blue'
                     		}
                          }
                        }
					},
					smooth : true,
					data : data.networkHigh.network[2011]
				},
				geoCoord : data.networkHigh.power
			}, {
				name : '220KV电网',
				type : 'map',
				mapType : '内蒙古',
				tooltip : {
					show : false
				},
				data : [],
				markLine : {
					symbol : [ 'circle', 'circle' ],
					symbolSize : 1,
					effect:{
					    show: true,
			            period: 50,
			            trailLength: 0.7,
			            color: '#00FFFF',
			            symbolSize: 1
					},
					itemStyle : {
						normal : {
							borderWidth : 1,
							lineStyle : {
								type : 'solid'
							}
						},
	                    emphasis:{
                         label: {
                             show: true,
                             formatter : function (params) {
                    			var data =params.name;
                                return '220KV电网-'+data;
                         },
                         textStyle: {
                         	color: 'blue'
                     		}
                          }
                        }
					},
					smooth : true,
					data : data.networkLow.network[2011]
				},
				geoCoord : data.networkLow.power
			}, {
                name: '煤矿',
                type: 'map',
                mapType: '内蒙古',
                hoverable: false,
                roam:false,
               	selectedMode : 'single',
                data: [],
                markPoint: {
                    symbolSize: 2, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                    itemStyle: {
                        normal: {
                            borderColor: '#48ac47',
                            borderWidth: 3, // 标注边线线宽，单位px，默认为1
                            label: {
                                show: false
                            },
                            areaStyle: {
                                color: '#ff00ff'
                            }
                        },
		                    emphasis:{
		                    	color: 'black',
                             label: {
                                 show: true,
                                 formatter : function (params) {
                        			var data =params.data;
                                    return '企业名称：'+params.name + '\n企业类型：' + data.psType + '\n主营产品：' + data.product+'\n年产值：'+data.annual;
                             },
                             textStyle: {
                             	color: 'black'
                         	}
                           }
                         }
                    },
                    data :data.coalPoint.coal[2011]
                },
                geoCoord: data.coalPoint.geoCoord[2011]
            }
			]
		}, {
			title : {
				'text' : '2012年电力建设情况'
			},
			series : [ {
			}]
		}, {
			title : {
				'text' : '2013年电力建设情况'
			},
			series : [ {
			} ]
		}, {
			title : {
				'text' : '2014年电力建设情况'
			},
			series : [ {
			} ]
		}, {
			title : {
				'text' : '2015年电力建设情况'
			},
			series : [ {
			} ]
		} ]
	};


	require.config( {
		paths : {
			echarts : '../js/echarts'
		}
	});
	require( [ 'echarts',  'echarts/chart/bar', 'echarts/chart/map' ], function(ec) {
		//电网数据
			echarts = ec;
			myChart = echarts.init(document.getElementById('powerMain'));
			myChartInstalledBar = echarts.init(document.getElementById('installedBar'));
			myChartPowerBar = echarts.init(document.getElementById('powerBar'));
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			//装机容量
			installedOption.series[0].data = dataMap.dataInstalled[2011+''];
			myChartInstalledBar.setOption(installedOption);
			//发电量
			powerOption.series[0].data = dataMap.dataPower[2011 + ''];
			myChartPowerBar.setOption(powerOption);
			
			myChart.on('timelineChanged', function(target) {
				timeline.currentData = 2011 + target.currentIndex;
				installedOption.series[0].data = dataMap.dataInstalled[(2011 + target.currentIndex) + ''];
				myChartInstalledBar.setOption(installedOption);
				powerOption.series[0].data = dataMap.dataPower[(2011 + target.currentIndex) + ''];
				myChartPowerBar.setOption(powerOption);
				var powerPoint =dataMap.powerPoint;
				var series = [{
				name : '电厂',
				type : 'map',
				mapType : '内蒙古',
				selectedMode : 'single',
				itemStyle : {
					normal:{
					areaStyle:{
					color :'#A4D3EE', 
						},
					label:{
						show:true,
					},
				borderColor: '#fff',
				borderWidth: 1,
				},
				emphasis : {
					label : {
						show : true
					}
				}
				},
				data : [],
				markPoint : {
					symbolSize : 2,
					itemStyle : {
						normal : {
							borderColor : '#e7453d',
							borderWidth : 3, 
							label : {
								show : false
							}
						},
		                    emphasis:{
		                    	color: 'black',
                             label: {
                                 show: true,
                                 formatter : function (params) {
                        			var data =params.data;
                                    return '企业名称：'+params.name + '\n企业类型：' + data.industryTypeName + '\n装机容量(MW)：' + data.installedAmount+'\n发电量：'+data.powerAmount;
                             },
                             textStyle: {
                             	color: 'blue'
                         	}
                           }
                         }
					},
					data : powerPoint.enterprise[2011 + target.currentIndex]
				},
				geoCoord :  powerPoint.geoCoord[2011 + target.currentIndex]
			}, {
				name : '500KV电网',
				type : 'map',
				mapType : '内蒙古',
				tooltip : {
					show : false
				},
				data : [],
				markLine : {
					symbol : [ 'circle', 'circle' ],
					symbolSize : 1,
					effect:{
					    show: true,
			            period: 50,
			            trailLength: 0.4,
			            color: '#fff',
			            symbolSize: 0.5
					},
					itemStyle : {
						normal : {
							borderWidth : 1,
							
							lineStyle : {
								type : 'solid'
							}
						}
					},
					smooth : true,
					data : data.networkHigh.network[2011+ target.currentIndex]
				},
				geoCoord : data.networkHigh.power
			},{
				name : '220KV电网',
				type : 'map',
				mapType : '内蒙古',
				tooltip : {
					show : false
				},
				
				data : [],
				markLine : {
					symbol : [ 'circle', 'circle' ],
					symbolSize : 1,
					effect:{
					    show: true,
			            period: 50,
			            trailLength: 0.4,
			            color: '#00FFFF',
			            symbolSize: 0.5
					},
					itemStyle : {
						normal : {
							borderWidth : 1,
							lineStyle : {
								type : 'solid'
							}
						}
					},
					smooth : true,
					data : data.networkLow.network[2011]
				},
				geoCoord : data.networkLow.power
			}, {
                name: '煤矿',
                type: 'map',
                mapType: '内蒙古',
                hoverable: false,
                roam: false,
                data: [],
                markPoint: {
                    symbolSize: 2, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                    itemStyle: {
                        normal: {
                            borderColor: '#48ac47',
                            borderWidth: 3, // 标注边线线宽，单位px，默认为1
                            label: {
                                show: false
                            },
                            areaStyle: {
                                color: '#ff00ff'
                            }
                        },
		                    emphasis:{
		                    	color: 'black',
                             label: {
                                 show: true,
                                 formatter : function (params) {
                        			var data =params.data;
                                    return '企业名称：'+params.name + '\n企业类型：' + data.psType + '\n主营产品：' + data.product+'\n年产值：'+data.annual;
                             },
                             textStyle: {
                             	color: 'black'
                         	}
                           }
                         }
                    },
                    data :data.coalPoint.coal[2011 + target.currentIndex]
                },
                geoCoord: data.coalPoint.geoCoord[2011 + target.currentIndex]
            }
			];
				myChart.setSeries(series);
				myChart.refresh();
			});
		});
}


