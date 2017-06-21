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
var myChartPowerCom;
var installedCom;
var hourCom;

var childChart;
var installedChildBar;
var powerChildBar;
var powerChildCom;
var installedChildCom;
var hourChildCom;

var installedChildOption;
var powerChildOption;
var hourChildComOption;
var installedChildComOption;
var powerChildComOption;

var installedOption = {
	title : {
		text : '装机总量(万千瓦)',
		x : 'center'
	},
	tooltip : {
		trigger : 'item'
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		y : 70,
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
		min : 0
	} ],
	series : [ {
		'name' : '装机总量(万千瓦)',
		'type' : 'bar',
		itemStyle : {
			normal : {
				color : function(params) {
					var colorList = ['#EEC900', '#00FF00', '#FF6600' ];
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
		text : '发电量(亿千瓦时)',
		x : 'center'
	},
	tooltip : {
		trigger : 'item'
	},
	calculable : false,
	grid : {
		borderWidth : 0,
		y : 70,
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
		min : 0
	} ],
	series : [ {
		'name' : '发电量(亿千瓦时)',
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
		}
	},

	controlPosition : 'right',
	autoPlay : true,
	playInterval : 5000,
}

var cityMap = {
	"呼和浩特市" : "150100",
	"包头市" : "150200",
	"乌海市" : "150300",
	"赤峰市" : "150400",
	"通辽市" : "150500",
	"鄂尔多斯市" : "150600",
	"呼伦贝尔市" : "150700",
	"巴彦淖尔市" : "150800",
	"乌兰察布市" : "150900",
	"兴安盟" : "152200",
	"锡林郭勒盟" : "152500",
	"阿拉善盟" : "152900"
};

var childOption= {
	title : {
		text : '内蒙古12个盟市',
		top:-20
	},
	tooltip : {
		trigger : 'item',
		show : false
	},
	series : [ {
		name : '内蒙古12个盟市',
		type : 'map',
		mapType : '内蒙古',
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
			}
		},
		data : []
	}, {
		name : '内蒙古12个盟市',
		type : 'map',
		mapType : '内蒙古',
		itemStyle : {
			normal : {
				label : {
					show : true
				}
			},
			emphasis : {
				label : {
					show : true
				}
			}
		},
		data : []
	} ]
};
$(document).ready(function() {
	var fakeLoader = $(".fakeloader").fakeLoader({spinner:"spinner6"});
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
	$('.help-tip').find('p').html('地图上展示“十二五”期间全区电厂、煤矿、电网的空间分布，同步展示当年各类型电厂（火电、风电及其他）累计装机容量、发电量及全区GDP数据（图表），全国电力环比增长（发电量、装机容量）、有效利用小时数与内蒙数据的对比。点击盟市下钻到盟市信息。')
});
/**
 * 显示图表信息
 * @param {Object} data
 * @return {TypeName} 
 */
function initCharts(data) {
	var width = document.documentElement.clientWidth - 20;
	var height = document.documentElement.clientHeight - 20;
	$('#main').css('width', width - 190);
	$('#main').css('height', height);
	var option
= {
		timeline : timeline,
		options : [ {
			title : {
				'text' : '2011年电力建设情况',
				x:'center',
				textStyle : {
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
				data : [ '电厂', '500KV电网','220KV电网','煤矿'],
				
			},
			color:['#e7453d','#8B2252','#000080','#48ac47'],
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

	installedChildOption = {
		title : {
			text : '装机总量(万千瓦)',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		calculable : false,
		grid : {
			borderWidth : 0,
			y : 80,
			y2 : 60
		},
		xAxis : [ {
			type : 'category',
			show : false,
			data : [ '火电', '风电', '其它' ]
		} ],
		yAxis : [ {
			type : 'value',
			show : false
		} ],
		series : [ {
			'name' : '装机总量(万千瓦)',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
					var colorList = [ '#fe0000', '#00ff01', '#0000fe'  ];
					return colorList[params.dataIndex]
				},
				label : {
					show : true,
					position : 'top',
					formatter : '{b}\n{c}'
				}
				}
			},
			'data' : dataMap.dataInstalled['2011']
		} ]
	};
	
	powerChildOption = {
		title : {
			text : '发电量(亿千瓦时)',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		calculable : false,
		grid : {
			borderWidth : 0,
			y : 80,
			y2 : 60
		},
		xAxis : [ {
			type : 'category',
			show : false,
			data : [ '火电', '风电', '其它' ]
		} ],
		yAxis : [ {
			type : 'value',
			show : false
		} ],
		series : [ {
			'name' : '发电量(亿千瓦时)',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
					var colorList = ['#7CFC00', '#00ffff', '#ff00fe'];
					return colorList[params.dataIndex]
				},
				label : {
					show : true,
					position : 'top',
					formatter : '{b}\n{c}'
				}
				}
			},
			'data' : dataMap.dataPower['2011']
		} ]

	};

	 powerComOption = {
		title : {
			text : '发电量',
			subtext:'环比增长(%)',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		calculable : false,
		grid : {
			borderWidth : 0,
			y : 80,
			y2 : 40
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
					var colorList = [ '#fe8463', '#9bca63' ];
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

	 installedComOption = {
		title : {
			text : '装机总量',
			subtext:'环比增长(%)',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		calculable : false,
		grid : {
			borderWidth : 0,
			y : 80,
			y2 : 40
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
			'name' : '装机总量环比增长(%)',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
					var colorList = [ '#fe8463', '#9bca63' ];
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

	 hourComOption = {
		title : {
			text : '有效利用小时',
			subtext:'环比增长(%)',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		calculable : false,
		grid : {
			borderWidth : 0,
			y : 80,
			y2 : 40
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
					var colorList = [ '#fe8463', '#9bca63'];
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
	
	 powerChildComOption = {
		title : {
			text : '发电量环比增长(%)',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		calculable : false,
		grid : {
			borderWidth : 0,
			y : 80,
			y2 : 60
		},
		xAxis : [ {
			type : 'category',
			show : false,
			data : [ '盟市', '全区' ]
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
					var colorList = [ '#c1232b', '#b5c334'];
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
	
	 installedChildComOption = {
		title : {
			text : '装机总量环比增长(%)',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		calculable : false,
		grid : {
			borderWidth : 0,
			y : 80,
			y2 : 60
		},
		xAxis : [ {
			type : 'category',
			show : false,
			data : [ '盟市', '全区' ]
		} ],
		yAxis : [ {
			type : 'value',
			show : false
		} ],
		series : [ {
			'name' : '装机总量环比增长(%)',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
					var colorList = [ '#fe8463', '#9bca63'];
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

	 hourChildComOption = {
		title : {
			text : '有效利用小时',
			x : 'center'
		},
		tooltip : {
			trigger : 'item'
		},
		calculable : false,
		grid : {
			borderWidth : 0,
			y : 80,
			y2 : 60
		},
		xAxis : [ {
			type : 'category',
			show : false,
			data : [ '盟市', '全区' ]
		} ],
		yAxis : [ {
			type : 'value',
			show : false
		} ],
		series : [ {
			'name' : '有效利用小时',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
					var colorList = [ '#d7504b', '#c6e579' ];
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

	require.config( {
		paths : {
			echarts : '../js/echarts'
		}
	});
	require( [ 'echarts',  'echarts/chart/bar', 'echarts/chart/map' ], function(ec) {
		    //电网数据
			echarts = ec;
			myChart = echarts.init(document.getElementById('main'));
			myChartInstalledBar = echarts.init(document.getElementById('installedBar'));
			myChartPowerBar = echarts.init(document.getElementById('powerBar'));
			myChartPowerCom = echarts.init(document.getElementById('powerCom'));
			installedCom = echarts.init(document.getElementById('installedCom'));
			hourCom = echarts.init(document.getElementById('hourCom'));

			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);
			//装机容量
			installedOption.series[0].data = dataMap.dataInstalled[2011+''];
			myChartInstalledBar.setOption(installedOption);
			//发电量
			powerOption.series[0].data = dataMap.dataPower[2011 + ''];
			myChartPowerBar.setOption(powerOption);
			//发电量对比
			myChartPowerCom.setOption(powerComOption);
			//装机容量对比
			installedCom.setOption(installedComOption);
			//有效利用小时
			hourCom.setOption(hourComOption);
			
			myChart.on('timelineChanged', function(target) {
				timeline.currentData = 2011 + target.currentIndex;
				installedOption.series[0].data = dataMap.dataInstalled[(2011 + target.currentIndex) + ''];
				myChartInstalledBar.setOption(installedOption);
				powerOption.series[0].data = dataMap.dataPower[(2011 + target.currentIndex) + ''];
				myChartPowerBar.setOption(powerOption);

				powerComOption.series[0].data = dataMap.dataPowerCom[2011 + target.currentIndex];
				myChartPowerCom.setOption(powerComOption);

				installedComOption.series[0].data = dataMap.dataInstalledCom[2011 + target.currentIndex];
				installedCom.setOption(installedComOption);

				hourComOption.series[0].data = dataMap.dataEffectiveCom[2011 + target.currentIndex];
				hourCom.setOption(hourComOption);
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
//				myChart.setOption(option,true);
				myChart.setSeries(series);
				myChart.refresh();
				/**
				 * 监听地区选中
				 */
			});
			var mapGeoData = require('echarts/util/mapData/params');
			for ( var city in cityMap) {
				// 自定义扩展图表类型
				mapGeoData.params[city] = {
					getGeoJson : (function(c) {
						var geoJsonName = cityMap[c];
						return function(callback) {
							$.getJSON('geoJson/china-main-city/' + geoJsonName + '.json', callback);
						}
					})(city)
				}
			}
			myChart.on('mapSelected', function(target) {
				/**
				 * 显示对话框
				 */
				showChild(target);
				myChart.on({type:'timelinePlayChange', playState: false});
			});
		});
}

/**
 * 显示盟市信息
 * @param target
 */
function showChild(target) {
	var mt = target.target;
	if(!mt){
		return;
	}
	var year = timeline.currentData;
	var titleName =mt + ':'+year+'年';
	//当数据没有加载完成的时候
	if(typeof(year)!='number'){
		return;
	}
	childChart = echarts.init(document.getElementById('childMap'));
	childOption.series[0].mapType = mt ;
	childOption.series[1].mapType = mt ;
	childOption.title.text = '';
	$('#child').show();
	$('#child').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 600,
		width : 900,
		top : 20,
		title:titleName,
		onOpen : function() {
			$('#childMap').css('width', 750);
			$('#childMap').css('height', 450);
			//map
			powerChildBar = echarts.init(document.getElementById('powerChildBar'));
			installedChildBar = echarts.init(document.getElementById('installedChildBar'));
			powerChildCom = echarts.init(document.getElementById('powerChildCom'));
			installedChildCom = echarts.init(document.getElementById('installedChildCom'));
			childChart = echarts.init(document.getElementById('childMap'));
			childChart.setOption(childOption,true);
			$.ajax({
				type : 'get',
				data:{
					cityName:encodeURI(encodeURI(mt)),
					year:year
			    },
				url : '../getChildrenMapData',
				dataType : 'json',
				success : function(data) {
			    	var powerPoint = data.powerPoint;
			    	var coalPoint  = data.coalPoint;
			  		
					var seriesData = [];
					if(powerPoint.enterprise[year]&&powerPoint.geoCoord[year]){
						var powerSeries = {	
			                	name: '电力企业',
			                    type: 'map',
			                    mapType: mt,
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
										borderWidth: 1
									}
								},
			                    markPoint: {
			                	symbolSize : 2,
									itemStyle : {
										normal : {
											borderColor : '#0911EB',
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
			                        data: powerPoint.enterprise[year]
			                    },
			                    geoCoord: powerPoint.geoCoord[year]
			                };
						seriesData.push(powerSeries);
					}
					if(coalPoint.coal[year]&&coalPoint.geoCoord[year]){
						var coalSeries = {	
			                	name: '煤矿',
			                    type: 'map',
			                    mapType: mt,
			                    markPoint: {
			                	 symbolSize: 2, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
					                    itemStyle: {
					                        normal: {
					                            borderColor: '#ff0000',
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
			                        data: coalPoint.coal[year]
			                    },
			                    geoCoord: coalPoint.geoCoord[year]
			                };
						seriesData.push(coalSeries);
					}
					
						childChart.setOption(childOption,true);
					    childChart.setSeries(seriesData);
						childChart.refresh();
				    	var cityPower = data.cityPower;
				    	powerChildOption.series[0].data = cityPower.power[year];
						powerChildBar.setOption(powerChildOption);
						installedChildOption.series[0].data = cityPower.installed[year];
					    installedChildBar.setOption(installedChildOption);
						/**
						 * 发电量对比
						 */
						powerChildComOption.series[0].data = data.powerIncrement[year];
						powerChildCom.setOption(powerChildComOption);
						/**
						 * 装机容量对比
						 */
						installedChildComOption.series[0].data = data.installedIncrement[year];
						installedChildCom.setOption(installedChildComOption);
				},
				error : function() {

				}
			});
		},onClose:function(){
			$('#childMap').html();
		}
	});
	
}
