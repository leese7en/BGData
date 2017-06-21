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

var timeline = {
	data : [ '2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01' ],
	currentData : {},
	label : {
		formatter : function(s) {
			return s.slice(0, 4);
		}
	},

	controlPosition : 'right',
	autoPlay : true,
	playInterval : 5000
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

var childOption = {
	title : {
		text : '内蒙古12个盟市'
	},
	tooltip : {
		trigger : 'item'
	},
	series : [ {
		name : '内蒙古12个盟市',
		type : 'map',
		mapType : '呼和浩特市',
		selectedMode : 'single',
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
			initCharts(data);
		},
		error : function() {

		}
	});

});

function initCharts(data) {
	var width = document.documentElement.clientWidth - 20;
	var height = document.documentElement.clientHeight - 20;
	$('#main').css('width', width - 200);
	$('#main').css('height', height);
	var option
= {
		timeline : timeline,
		options : [ {
			title : {
				'text' : '2011内蒙古环保数据',
				'subtext' : '数据来自内蒙古环保局'
			},
			tooltip : {
				'trigger' : 'item'
			},
			legend : {
				orient : 'vertical',
				x : 'right',
				data : [ '统计数据' ]
			},
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
			series : [ {
				name : '统计数据',
				type : 'map',
				mapType : '内蒙古',
				tooltip : {
					show : false
				},
				selectedMode : 'single',
				itemStyle : {
					normal:{
					areaStyle:{
					color :'#c7e68a',/* function(params) {
				    var colorList = [ '#b2e5ff', '#c7e68a', '#ffee99','#b2e5ff','#c7e68a','#ffee99','#b2e5ff','#c7e68a','#ffee99','#b2e5ff','#c7e68a','#c4e3a5' ];
				    return colorList[params.dataIndex]
			        }*/
						},
					label:{
						show:true,
					},
				borderColor: '#fff',
				borderWidth: 2,
				},
				emphasis : {
					label : {
						show : true
					}
				}
				},
				'data' : dataMap.dataGDP['2011']
			}, {
				name : '河流',
				type : 'map',
				mapType : '内蒙古',
				data : [],
				markLine : {
					symbol : [ 'circle', 'circle' ],
					symbolSize : 1,
					itemStyle : {
						normal : {
							color : '#fff',
							borderWidth : 1,
							borderColor : 'lightskyblue',
							lineStyle : {
								type : 'solid'
							}
						}
					},
					data : [ [ {
						name : '额2'
					}, {
						name : '额3'
					} ], [ {
						name : '额3'
					}, {
						name : '额4'
					} ], [ {
						name : '额4'
					}, {
						name : '额5'
					} ], [ {
						name : '额5'
					}, {
						name : '额6'
					} ], [ {
						name : '额6'
					}, {
						name : '额7'
					} ], [ {
						name : '额7'
					}, {
						name : '额8'
					} ], [ {
						name : '额8'
					}, {
						name : '额9'
					} ], [ {
						name : '额9'
					}, {
						name : '额10'
					} ], [ {
						name : '额10'
					}, {
						name : '额11'
					} ], [ {
						name : '额11'
					}, {
						name : '额12'
					} ] ]
				},
				geoCoord : {
					'额1' : [ 121.45, 50.32 ],
					'额2' : [ 120.91, 53.29 ],
					'额3' : [ 120.52, 53.04 ],
					'额4' : [ 120.03, 52.78 ],
					'额5' : [ 120.19, 52.60 ],
					'额6' : [ 120.80, 52.55 ],
					'额7' : [ 120.72, 52.05 ],
					'额8' : [ 120.31, 51.76 ],
					'额9' : [ 119.73, 51.05 ],
					'额10' : [ 119.20, 50.39 ],
					'额11' : [ 119.35, 50.26 ],
					'额12' : [ 119.09, 49.99 ],
					'额13' : [ 118.44, 45.27 ]
				}
			}, {
				name : '电网',
				type : 'map',
				mapType : '内蒙古',
				data : [],
				markLine : {
					symbol : [ 'circle', 'circle' ],
					symbolSize : 1,
					itemStyle : {
						normal : {
							color : '#fff',
							borderWidth : 1,
							borderColor : 'rgba(255,0,0,1)',
							lineStyle : {
								type : 'solid'
							}
						}
					},
					smooth : true,
					data : data.network.network
				},
				geoCoord : data.network.power
			}, {
				name : '电力',
				type : 'map',
				mapType : '内蒙古',
				hoverable : false,
				roam : false,
				data : [],
				markPoint : {
					symbolSize : 2, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
					itemStyle : {
						normal : {
							borderColor : '#0911EB',
							borderWidth : 3, // 标注边线线宽，单位px，默认为1
							label : {
								show : false
							}
						}
					},
					data : [ {
						name : '神华宝日希勒能源有限公司二电厂',
						value : 1500
					}, {
						name : '内蒙古大雁矿业集团有限责任公司雁南热电厂',
						value : 1500
					}, {
						name : '呼伦贝尔安泰热电有限责任公司东海拉尔发电厂',
						value : 1500
					}, {
						name : '呼伦贝尔安泰热电有限公司牙克石热电厂',
						value : 1500
					}, {
						name : '呼伦贝尔安泰热电有限责任公司灵泉电厂',
						value : 1500
					}, {
						name : '呼伦贝尔安泰热电有限公司汇流河发电厂',
						value : 1500
					}, {
						name : '呼伦贝尔安泰热电股份有限公司扎兰屯热电厂',
						value : 1500
					}, {
						name : '呼伦贝尔安泰热电有限责任公司海拉尔热电厂',
						value : 1500
					}, {
						name : '呼伦贝尔安泰热电有限责任公司满洲里热电厂',
						value : 1500
					}, {
						name : '扎赉诺尔煤业有限责任公司煤矸石热电厂',
						value : 1500
					}, {
						name : '华能伊敏煤电有限责任公司海拉尔热电厂',
						value : 1500
					}, {
						name : '内蒙古蒙东能源有限公司鄂温克发电厂',
						value : 1500
					}, {
						name : '内蒙古大雁矿业集团有限责任公司雁中热电厂',
						value : 1500
					}, {
						name : '大雁煤业有限责任公司热电总厂雁北热电厂',
						value : 1500
					}, {
						name : '神华宝日希勒能源有限公司一电厂',
						value : 1500
					}, {
						name : '北方联合电力有限责任公司乌拉特发电厂',
						value : 1500
					}, {
						name : '北方联合电力有限责任公司临河热电厂',
						value : 1500
					}, {
						name : '内蒙古蒙电华能热电股份有限公司丰镇发电厂',
						value : 1500
					}, {
						name : '蒙维科技自备电厂',
						value : 1500
					}, {
						name : '乌兰察布市宏大实业有限公司兴和热电厂',
						value : 1500
					}, {
						name : '内蒙古国电能源投资有限公司锡林热电厂',
						value : 1500
					}, {
						name : '锡林浩特第二发电厂',
						value : 1500
					}, {
						name : '内蒙古能源发电投资集团有限公司乌斯太热电厂',
						value : 1500
					}

					]
				},
				geoCoord : {
					'神华宝日希勒能源有限公司二电厂' : [ 119.793528, 49.356111 ],
					'内蒙古大雁矿业集团有限责任公司雁南热电厂' : [ 120.4, 49.15 ],
					'呼伦贝尔安泰热电有限责任公司东海拉尔发电厂' : [ 119.829722, 49.260556 ],
					'呼伦贝尔安泰热电有限公司牙克石热电厂' : [ 120.729167, 49.292778 ],
					'呼伦贝尔安泰热电有限责任公司灵泉电厂' : [ 117.676667, 49.397222 ],
					'呼伦贝尔安泰热电有限公司汇流河发电厂' : [ 120.848611, 49.296667 ],
					'呼伦贝尔安泰热电股份有限公司扎兰屯热电厂' : [ 122.750278, 48.001944 ],
					'呼伦贝尔安泰热电有限责任公司海拉尔热电厂' : [ 119.733333, 49.233333 ],
					'呼伦贝尔安泰热电有限责任公司满洲里热电厂' : [ 117.480833, 49.586389 ],
					'扎赉诺尔煤业有限责任公司煤矸石热电厂' : [ 117.696111, 49.483333 ],
					'华能伊敏煤电有限责任公司海拉尔热电厂' : [ 119.979444, 49.242222 ],
					'内蒙古蒙东能源有限公司鄂温克发电厂' : [ 119.916667, 48.783333 ],
					'内蒙古大雁矿业集团有限责任公司雁中热电厂' : [ 120.4, 49.15 ],
					'大雁煤业有限责任公司热电总厂雁北热电厂' : [ 120.4, 49.166667 ],
					'神华宝日希勒能源有限公司一电厂' : [ 119.793333, 49.356111 ],
					'北方联合电力有限责任公司乌拉特发电厂' : [ 108.7675, 40.651111 ],
					'北方联合电力有限责任公司临河热电厂' : [ 107.583333, 40.135278 ],
					'内蒙古蒙电华能热电股份有限公司丰镇发电厂' : [ 113.083333, 40.4 ],
					'蒙维科技自备电厂' : [ 113, 40 ],
					'乌兰察布市宏大实业有限公司兴和热电厂' : [ 113.7475, 40.863889 ],
					'内蒙古国电能源投资有限公司锡林热电厂' : [ 116.136111, 43.986944 ],
					'锡林浩特第二发电厂' : [ 115.5033333, 42.725 ],
					'内蒙古能源发电投资集团有限公司乌斯太热电厂' : [ 106.6744443, 39.445278 ]
				}
			}, {
				name : '煤矿',
				type : 'map',
				mapType : '内蒙古',
				hoverable : false,
				roam : false,
				data : [],
				markPoint : {
					symbolSize : 2, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
					itemStyle : {
						normal : {
							borderColor : '#ff0000',
							borderWidth : 3, // 标注边线线宽，单位px，默认为1
							label : {
								show : false
							},
							areaStyle : {
								color : '#ff00ff'
							}
						}
					},
					data : [ {
						name : '华能伊敏煤电有限责任公司',
						value : 1500
					}, {
						name : '扎赉诺尔煤业有限责任公司煤矸石热电厂',
						value : 1500
					}, {
						name : '华能伊敏煤电有限责任公司海拉尔热电厂',
						value : 1500
					}, {
						name : '内蒙古牙克石五九煤炭（集团）有限责任公司',
						value : 1500
					}, {
						name : '扎赉诺尔煤业有限责任公司',
						value : 1500
					}, {
						name : '内蒙古大雁矿业集团有限责任公司雁南煤矿',
						value : 1500
					}, {
						name : '大雁煤业有限责任公司热电总厂雁北热电厂',
						value : 1500
					}, {
						name : '内蒙古磴口金牛煤电有限公司',
						value : 1500
					}, {
						name : '大唐内蒙古多伦煤化工有限责任公司',
						value : 1500
					}, {
						name : '内蒙古平西白音华煤业有限公司',
						value : 1500
					}, {
						name : '内蒙古庆华集团庆华煤化有限责任公司',
						value : 1500
					}, {
						name : '内蒙古太西煤集团兴泰煤化有限责任公司',
						value : 1500
					}, {
						name : '内蒙古庆华集团庆华煤化有限责任公司污水处理厂',
						value : 1500
					}, {
						name : '内蒙古庆华集团腾格里煤化有限公司',
						value : 1500
					}

					]
				},
				geoCoord : {
					'华能伊敏煤电有限责任公司' : [ 119.833333, 48.833333 ],
					'扎赉诺尔煤业有限责任公司煤矸石热电厂' : [ 117.696111, 49.483333 ],
					'华能伊敏煤电有限责任公司海拉尔热电厂' : [ 119.979444, 49.242222 ],
					'内蒙古牙克石五九煤炭（集团）有限责任公司' : [ 121.46, 49.501389 ],
					'扎赉诺尔煤业有限责任公司' : [ 117.696111, 49.483333 ],
					'内蒙古大雁矿业集团有限责任公司雁南煤矿' : [ 120.4, 49.15 ],
					'大雁煤业有限责任公司热电总厂雁北热电厂' : [ 120.4, 49.166667 ],
					'内蒙古磴口金牛煤电有限公司' : [ 107.003889, 40.383611 ],
					'大唐内蒙古多伦煤化工有限责任公司' : [ 116.577778, 42.195833 ],
					'内蒙古平西白音华煤业有限公司' : [ 118.420833, 42.195833 ],
					'内蒙古庆华集团庆华煤化有限责任公司' : [ 106.722222, 39.535 ],
					'内蒙古太西煤集团兴泰煤化有限责任公司' : [ 106.061111, 39.085 ],
					'内蒙古庆华集团庆华煤化有限责任公司污水处理厂' : [ 106.716667, 39.533333 ],
					'内蒙古庆华集团腾格里煤化有限公司' : [ 105.189722, 38.509722 ]
				}
			 }, //{
			// 	name : '湖泊',
			// 	type : 'map',
			// 	mapType : '内蒙古',
			// 	data : [],
			// 	tooltip : {
			// 		show : false,
			// 		showContent : false
			// 	},
			// 	itemStyle : {
			// 		normal : {
			// 			borderColor : 'rgba(100,149,237,1)',
			// 			borderWidth : 1.5,
			// 			areaStyle : {
			// 				color : '#1b1b1b'
			// 			}
			// 		}
			// 	},
			// 	hoverable : false,
			// 	markPoint : {
			// 		symbolSize : 2,
			// 		large : true,
			// 		itemStyle : {
			// 			normal : {
			// 				borderColor : '#ff0000',
			// 				borderWidth : 3, // 标注边线线宽，单位px，默认为1
			// 				label : {
			// 					show : false
			// 				},
			// 				areaStyle : {
			// 					color : '#ff00ff'
			// 				}
			// 			}
			// 		},
			// 		effct : {
			// 			show : true,
			// 			shadowColor : '#ff0000'
			// 		},
			// 		data : [ {
			// 			name : 'p1',
			// 			value : ''
			// 		}, {
			// 			name : 'p2',
			// 			value : ''
			// 		}, {
			// 			name : 'p3',
			// 			value : ''
			// 		}, {
			// 			name : 'p4',
			// 			value : ''
			// 		}, {
			// 			name : 'p5',
			// 			value : ''
			// 		}, {
			// 			name : 'p6',
			// 			value : ''
			// 		}

			// 		]
			// 	},
			// 	geoCoord : {
			// 		'p1' : [ 117.60, 49.27 ],
			// 		'p2' : [ 117.70, 49.15 ],
			// 		'p3' : [ 117.79, 49.09 ],
			// 		'p4' : [ 117.31, 48.60 ],
			// 		'p5' : [ 117.91, 48.79 ],
			// 		'p6' : [ 117.75, 48.90 ]
			// 	}
			// } 
			]
		}, {
			title : {
				'text' : '2008内蒙古环保数据'
			},
			series : [ {
				'data' : dataMap.dataGDP['2012']
			} ]
		}, {
			title : {
				'text' : '2009内蒙古环保数据'
			},
			series : [ {
				'data' : dataMap.dataGDP['2013']
			} ]
		}, {
			title : {
				'text' : '2010内蒙古环保数据'
			},
			series : [ {
				'data' : dataMap.dataGDP['2014']
			} ]
		}, {
			title : {
				'text' : '2011内蒙古环保数据'
			},
			series : [ {
				'data' : dataMap.dataGDP['2015']
			} ]
		} ]
	};

	/**
	 * 装机总量
	 */
	var installedOption = {
		title : {
			text : '装机总量',
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
			'name' : '装机量',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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

	/**
	 * 发电量
	 */
	var powerOption = {
		title : {
			text : '发电量',
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
			'name' : '发电量',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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

	/**
	 * 小地图装机总量
	 */
	installedChildOption = {
		title : {
			text : '装机总量',
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
			'name' : '装机量',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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
	
	/**
	 * 小地图发电量
	 */
	powerChildOption = {
		title : {
			text : '发电量',
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
			'name' : '发电量',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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

	/**
	 * 发电量环比增长
	 */
	var powerComOption = {
		title : {
			text : '发电量环比增长',
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
			data : [ '内蒙', '全国' ]
		} ],
		yAxis : [ {
			type : 'value',
			show : false
		} ],
		series : [ {
			'name' : '发电量',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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

	/**
	 * 装机量环比增长
	 */
	var installedComOption = {
		title : {
			text : '装机量环比增长',
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
			data : [ '内蒙', '全国' ]
		} ],
		yAxis : [ {
			type : 'value',
			show : false
		} ],
		series : [ {
			'name' : '装机容量',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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

	/**
	 * 有效利用小时
	 */
	var hourComOption = {
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
			data : [ '内蒙', '全国' ]
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
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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
	
	/**
	 * 发电量环比增长
	 */
	powerChildComOption = {
		title : {
			text : '发电量环比增长',
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
			data : [ '内蒙', '全国' ]
		} ],
		yAxis : [ {
			type : 'value',
			show : false
		} ],
		series : [ {
			'name' : '发电量',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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
	
	/**
	 * 小地图装机量环比增长
	 */
	installedChildComOption = {
		title : {
			text : '装机量环比增长',
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
			data : [ '内蒙', '全国' ]
		} ],
		yAxis : [ {
			type : 'value',
			show : false
		} ],
		series : [ {
			'name' : '装机容量',
			'type' : 'bar',
			itemStyle : {
				normal : {
					color : function(params) {
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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

	/**
	 * 小地图有效利用小时
	 */
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
			data : [ '内蒙', '全国' ]
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
						// build a color map as your need.
					var colorList = [ '#FCCE10', '#E87C25', '#27727B' ];
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
			echarts : './echarts'
		}
	});
	require( [ 'echarts', 'echarts/chart/line', 'echarts/chart/bar', 'echarts/chart/scatter', 'echarts/chart/k',
			'echarts/chart/pie', 'echarts/chart/radar', 'echarts/chart/force', 'echarts/chart/chord',
			'echarts/chart/gauge', 'echarts/chart/funnel', 'echarts/chart/eventRiver', 'echarts/chart/venn',
			'echarts/chart/treemap', 'echarts/chart/tree', 'echarts/chart/wordCloud', 'echarts/chart/heatmap',
			'echarts/chart/map' ], function(ec) {
		//电网数据
			echarts = ec;
			myChart = echarts.init(document.getElementById('main'));
			myChartInstalledBar = echarts.init(document.getElementById('installedBar'));
			myChartPowerBar = echarts.init(document.getElementById('powerBar'));
			myChartPowerCom = echarts.init(document.getElementById('powerCom'));
			installedCom = echarts.init(document.getElementById('installedCom'));
			hourCom = echarts.init(document.getElementById('hourCom'));

			childChart = echarts.init(document.getElementById('childMap'));
			powerChildBar = echarts.init(document.getElementById('powerChildBar'));
			installedChildBar = echarts.init(document.getElementById('installedChildBar'));
			powerChildCom = echarts.init(document.getElementById('powerChildCom'));
			installedChildCom = echarts.init(document.getElementById('installedChildCom'));
			hourChildCom = echarts.init(document.getElementById('hourChildCom'));
			// 使用刚指定的配置项和数据显示图表。
			myChart.setOption(option);

			//装机容量

			myChartInstalledBar.setOption(installedOption);

			//发电量

			myChartPowerBar.setOption(powerOption);

			//发电量对比

			myChartPowerCom.setOption(powerComOption);

			//装机容量对比

			installedCom.setOption(installedComOption);
			//有效利用小时

			hourCom.setOption(hourComOption);

			//发电量对比

			powerChildCom.setOption(powerChildComOption);

			//装机容量对比

			installedChildCom.setOption(installedComOption);
			//有效利用小时

			hourChildCom.setOption(hourComOption);

			
			installedChildBar.setOption(installedChildOption);
			powerChildBar.setOption(powerChildOption);
			
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
			});
				
		});
}

/**
 * 显示盟市信息
 * @param target
 */
function showChild(target) {
	$('#child').show();
	$('#child').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 470,
		width : 700,
		top : 20,
		title:'盟市详情',
		onOpen : function() {
			$('#childMap').css('width', 750);
			$('#childMap').css('height', 450);
			var mt = target.target;
			if (!mt) {
				mt = '内蒙古';
			}
			//map
			childOption.series[0].mapType = mt;
			childOption.title.subtext = mt + ' （滚轮或点击切换）';
			childChart.setOption(childOption);
			var year = timeline.currentData;
			
			//installedChildBar
			installedChildOption.series[0].data = dataMap.dataInstalled[year];
			installedChildBar.setOption(installedChildOption);
			
			//powerChildBar
			powerChildOption.series[0].data = dataMap.dataPower[year];
			powerChildBar.setOption(powerChildOption);
			
			//发电量对比
			powerChildComOption.series[0].data = dataMap.dataPowerCom[year];
			powerChildCom.setOption(powerChildComOption);
            
			//装机容量对比
			installedChildComOption.series[0].data = dataMap.dataInstalledCom[year];
			installedChildCom.setOption(installedChildComOption);
			//有效利用小时
			hourChildComOption.series[0].data = dataMap.dataEffectiveCom[year];
			hourChildCom.setOption(hourChildComOption);
		}
	});
	
}


//设置地图颜色

function setColor(option){
	
}