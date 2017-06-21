/**
 * Created by se7en on 2016/4/26.
 */
var socket = null;
function startServer() {
	socket = io.connect('ws://10.15.255.22:8081');
}
function sendMessage(cityName) {
	socket.emit('changeCity',{cityName:cityName});
}
var echarts;
var myChart;
var myChartInstalledBar;
var myChartPowerBar;
var powerComChart;
var installedComChart;
var hourComChart;

var width = 1024;
var height = 488;

var installedOption = {
	title : {
		text : '全区装机总量',
		subtext : '万千瓦',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		textStyle : {
			fontSize : 16
		}
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		y : 75,
		y2 : 10
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
		text : '全区发电量',
		subtext : '万千瓦时',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		textStyle : {
			fontSize : 16
		}
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		y : 75,
		y2 : 10
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
var contaminantsOption = {
	title : {
		text : '全区污染物排放量',
		subtext : '万吨',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		textStyle : {
			fontSize : 16
		}
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		y : 75,
		y2 : 10
	},
	xAxis : [ {
		type : 'category',
		show : false,
		data : [ 'SO₂', 'NOx', '烟尘' ]
	} ],
	yAxis : [ {
		type : 'value',
		show : true,
		splitNumber : 4,
		max : 60,
		min : 0,
		axisLabel : {
			textStyle : {
				color : '#60C0DD'
			}
		}
	} ],
	series : [ {
		'name' : '全区污染物排放量(万吨)',
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
var powerComOption = {
	title : {
		text : '发电总量',
		subtext : '环比增长(%)',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		textStyle : {
			fontSize : 16
		}
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		x : 60,
		y : 80,
		x2 : 60,
		y2 : 20
	},
	xAxis : [ {
		type : 'category',
		show : false,
		data : [ '内蒙', '全国' ]
	} ],
	yAxis : [ {
		type : 'value',
		show : false
	} ],
	series : [ {
		'name' : '发电量环比增长(%)',
		'type' : 'bar',
		itemStyle : {
			normal : {
				color : function(params) {
					var colorList = [ '#fe8463', '#EEC900' ];
					return colorList[params.dataIndex]
				},
				label : {
					show : true,
					position : 'top',
					formatter : '{b}\n{c}'
				}
			}
		},
		'data' : dataMap.dataPowerCom['2011']
	} ]
};

var installedComOption = {
	title : {
		text : '装机总量',
		subtext : '环比增长(%)',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		textStyle : {
			fontSize : 16
		}
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		x : 60,
		y : 80,
		x2 : 60,
		y2 : 20
	},
	xAxis : [ {
		type : 'category',
		show : false,
		data : [ '内蒙', '全国' ]
	} ],
	yAxis : [ {
		type : 'value',
		show : false
	} ],
	series : [ {
		'name' : '装机量环比增长(%)',
		'type' : 'bar',
		itemStyle : {
			normal : {
				color : function(params) {
					var colorList = [ '#fe8463', '#EEC900' ];
					return colorList[params.dataIndex]
				},
				label : {
					show : true,
					position : 'top',
					formatter : '{b}\n{c}'
				}
			}
		},
		'data' : dataMap.dataInstalledCom['2011']
	} ]
};

var hourComOption = {
	title : {
		text : '有效利用小时',
		subtext : '环比增长(%)',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		textStyle : {
			fontSize : 16
		}
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		x : 60,
		y : 90,
		x2 : 60,
		y2 : 20
	},
	xAxis : [ {
		type : 'category',
		show : false,
		data : [ '内蒙', '全国' ]
	} ],
	yAxis : [ {
		type : 'value',
		show : false
	} ],
	series : [ {
		'name' : '有效利用小时环比增长(%)',
		'type' : 'bar',
		itemStyle : {
			normal : {
				color : function(params) {
					var colorList = [ '#fe8463', '#EEC900' ];
					return colorList[params.dataIndex]
				},
				label : {
					show : true,
					position : 'top',
					formatter : '{b}\n{c}'
				}
			}
		},
		'data' : dataMap.dataEffectiveCom['2011']
	} ]
};

var timeline= {
	data : [ '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01','2016-01-01' ],
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
	startServer();
	var fakeLoader = $(".fakeloader").fakeLoader({spinner:"spinner6"});
	$('#installedBar').css('width', width / 4);
	$('#installedBar').css('height', height/ 2);
	$('#powerBar').css('width', width /4);
	$('#powerBar').css('height', height/ 2);
	$('#contaminants').css('width', width /4);
	$('#contaminants').css('height', height/ 2);
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
			dataMap.contaminants = dataFormatter(data.contaminants, com);
			dataMap.powerPoint = data.powerPoint;
			dataMap.powerCount = data.powerCount;
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
						color : '#dcdcdc'
					},
					borderColor: '#fff',
					borderWidth: 1,
					},
					emphasis : {
						areaColor: '#red',
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
		}, {
			title : {
				'text' : '2016年电力建设情况'
			},
			series : [ {
			} ]
		}]
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
			myChartContaminants = echarts.init(document.getElementById('contaminants'));
			powerComChart = echarts.init(document.getElementById('powerComChart'));
			installedComChart = echarts.init(document.getElementById('installedComChart'));
			hourComChart = echarts.init(document.getElementById('hourComChart'));
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			//装机容量
			installedOption.series[0].data = dataMap.dataInstalled[2011+''];
			myChartInstalledBar.setOption(installedOption);
			//发电量
			powerOption.series[0].data = dataMap.dataPower[2011 + ''];
			myChartPowerBar.setOption(powerOption);
			contaminantsOption.series[0].data = dataMap.contaminants[2011 + ''];
			myChartContaminants.setOption(contaminantsOption);
			//发电量对比
			powerComOption.series[0].data = dataMap.dataPowerCom[2011 + ''];
			powerComChart.setOption(powerComOption);
			//装机容量对比
			installedComOption.series[0].data = dataMap.dataInstalledCom[2011 + ''];
			installedComChart.setOption(installedComOption);
			//有效利用小时对比
			hourComOption.series[0].data = dataMap.dataEffectiveCom[2011 + ''];
			hourComChart.setOption(hourComOption);
			
			$('#powerCount').html(2011+'年全区电厂数量为'+(dataMap.powerCount[2011 +''])+'个');
			myChart.on('timelineChanged', function(target) {
				timeline.currentData = 2011 + target.currentIndex;
				installedOption.series[0].data = dataMap.dataInstalled[(2011 + target.currentIndex) + ''];
				myChartInstalledBar.setOption(installedOption);
				powerOption.series[0].data = dataMap.dataPower[(2011 + target.currentIndex) + ''];
				myChartPowerBar.setOption(powerOption);
				
				contaminantsOption.series[0].data = dataMap.contaminants[(2011 + target.currentIndex) + ''];
				myChartContaminants.setOption(contaminantsOption);
				
				//发电量对比
				powerComOption.series[0].data = dataMap.dataPowerCom[(2011 + target.currentIndex) + ''];
				powerComChart.setOption(powerComOption);
				//装机容量对比
				installedComOption.series[0].data = dataMap.dataInstalledCom[(2011 + target.currentIndex) + ''];
				installedComChart.setOption(installedComOption);
				//有效利用小时对比
				hourComOption.series[0].data = dataMap.dataEffectiveCom[(2011 + target.currentIndex) + ''];
				hourComChart.setOption(hourComOption);
				
				$('#powerCount').html((2011+ target.currentIndex)+'年全区电厂数量为'+(dataMap.powerCount[(2011 + target.currentIndex) + '']||dataMap.powerCount[(2010 + target.currentIndex) + '']||dataMap.powerCount[(2009 + target.currentIndex) + ''])+'个');
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
			myChart.on('mapSelected', function(target) {
				/**
				 * 显示对话框
				 */
				showChild(target);
			});
		});
}
function showChild(target) {
	var cityName = target.target;
	sendMessage(cityName);
}


