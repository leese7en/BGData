/**
 * Created by se7en on 2016/2/4.
 */

$(document).ready(function() {
	var width = document.documentElement.clientWidth - 20;
	var height = document.documentElement.clientHeight - 20;
	$('#main').css('width', width);
	$('#main').css('height', height);
	var chart = echarts.init(document.getElementById('main'));
	//			chart.setOption(option);
		chart.on('click', function(param) {
			alert(param.name);
		});

		var myChart = echarts.init(document.getElementById('main'));

		var hours = [ '一季度', '二季度', '三季度', '四季度' ];
		var days = [ '分析仪化学试剂过期', '更换设备,现未验收', '原、净烟气流量逻辑不符', '连续两小时数据相同', '烟气采样管频繁堵塞', '药剂更换记录不完整' ];

		var data = [ [ 0, 0, 3 ], [ 0, 1, 2 ], [ 0, 2, 9 ], [ 0, 3, 0 ], [ 0, 4, 0 ], [ 0, 5, 4 ], [ 1, 0, 5 ],
				[ 1, 1, 1 ], [ 1, 2, 0 ], [ 1, 3, 8 ], [ 1, 4, 0 ], [ 1, 5, 8 ], [ 2, 0, 0 ], [ 2, 1, 1 ], [ 2, 2, 9 ],
				[ 2, 3, 8 ], [ 2, 2, 0 ], [ 2, 5, 15 ], [ 3, 0, 5 ], [ 3, 1, 1 ], [ 3, 2, 0 ], [ 3, 3, 3 ],
				[ 3, 4, 0 ], [ 3, 5, 8 ] ];
		var data2 = [ [ 0, 0, 5 ], [ 0, 1, 1 ], [ 0, 2, 0 ], [ 0, 3, 8 ], [ 0, 4, 0 ], [ 0, 5, 2 ], [ 1, 0, 0 ],
				[ 1, 1, 1 ], [ 1, 2, 0 ], [ 1, 3, 8 ], [ 1, 4, 0 ], [ 1, 5, 8 ], [ 2, 0, 5 ], [ 2, 1, 1 ], [ 2, 2, 0 ],
				[ 2, 3, 6 ], [ 2, 4, 0 ], [ 2, 5, 5 ], [ 3, 0, 5 ], [ 3, 1, 1 ], [ 3, 2, 0 ], [ 3, 3, 8 ], [ 3, 4, 0 ],
				[ 3, 5, 8 ] ];
		var data3 = [ [ 0, 0, 5 ], [ 0, 1, 1 ], [ 0, 2, 0 ], [ 0, 3, 8 ], [ 0, 4, 0 ], [ 0, 5, 8 ], [ 1, 0, 5 ],
				[ 1, 1, 1 ], [ 1, 2, 0 ], [ 1, 3, 8 ], [ 1, 4, 0 ], [ 1, 5, 12 ], [ 2, 0, 8 ], [ 2, 1, 5 ],
				[ 2, 2, 8 ], [ 2, 3, 8 ], [ 2, 4, 2 ], [ 2, 5, 8 ], [ 3, 0, 5 ], [ 3, 1, 1 ], [ 3, 2, 0 ], [ 3, 3, 8 ],
				[ 3, 4, 0 ], [ 3, 5, 2 ] ];
		var data4 = [ [ 0, 0, 5 ], [ 0, 1, 1 ], [ 0, 2, 0 ], [ 0, 3, 8 ], [ 0, 4, 0 ], [ 0, 5, 10 ], [ 1, 0, 5 ],
				[ 1, 1, 1 ], [ 1, 2, 4 ], [ 1, 3, 8 ], [ 1, 4, 0 ], [ 1, 5, 8 ], [ 2, 0, 5 ], [ 2, 1, 1 ], [ 2, 2, 0 ],
				[ 2, 3, 7 ], [ 2, 4, 9 ], [ 2, 5, 8 ], [ 3, 0, 5 ], [ 3, 1, 1 ], [ 3, 2, 3 ], [ 3, 3, 8 ], [ 3, 4, 0 ],
				[ 3, 5, 23 ] ];
		var data5 = [ [ 0, 0, 5 ], [ 0, 1, 1 ], [ 0, 2, 0 ], [ 0, 3, 8 ], [ 0, 4, 0 ], [ 0, 5, 8 ], [ 1, 0, 5 ],
				[ 1, 1, 1 ], [ 1, 2, 0 ], [ 1, 3, 8 ], [ 1, 4, 0 ], [ 1, 5, 8 ], [ 2, 0, 5 ], [ 2, 1, 1 ],
				[ 2, 2, 10 ], [ 2, 3, 9 ], [ 2, 4, 8 ], [ 2, 5, 21 ], [ 3, 0, 5 ], [ 3, 1, 1 ], [ 3, 2, 0 ],
				[ 3, 3, 8 ], [ 3, 4, 0 ], [ 3, 5, 8 ] ];

		var option = {
			title : {
				text : '数据有效率'
			},
			legend : {
				data : [ '工况监控报告', '监督性现场检查报告', '数据传输率报告', '自动监控数据报告', '监督性监测报告' ]
			},
			tooltip : {
				trigger : 'axis',
				axisPointer : {
					show : true,
					type : 'cross',
					lineStyle : {
						type : 'dashed',
						width : 1
					}
				}
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : true,
						readOnly : false
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			xAxis : {
				type : 'category',
				data : [ '一季度', '二季度', '三季度', '四季度' ]
			},
			yAxis : {
				type : 'category',
				data : [ '分析仪化学试剂过期', '更换设备,现未验收', '原、净烟气流量逻辑不符', '连续两小时数据相同', '烟气采样管频繁堵塞', '药剂更换记录不完整' ]
			},
			series : [
					{
						name : '工况监控报告',
						type : 'scatter',
						tooltip : {
							trigger : 'item',
							formatter : function(params) {
								return params.seriesName + '<br/>' + '时间:' + params.value[0] + '<br/>' + '热词:'
										+ params.value[1] + '<br/>' + '次数: ' + params.value[2];
							},
							axisPointer : {
								show : true
							}
						},
						symbolSize : function(val) {
							return val[2] * 2;
						},
						data : data
					},
					{
						name : '监督性现场检查报告',
						type : 'scatter',
						tooltip : {
							trigger : 'item',
							formatter : function(params) {
								return params.seriesName + '<br/>' + '时间:' + params.value[0] + '<br/>' + '热词:'
										+ params.value[1] + '<br/>' + '次数: ' + params.value[2];
							},
							axisPointer : {
								show : true
							}
						},
						symbolOffset : [ '60 %', '70 %' ],
						symbolSize : function(val) {
							return val[2] * 2;
						},
						data : data2
					},
					{
						name : '数据传输率报告',
						type : 'scatter',
						symbolOffset : [ '10 %', '50 %' ],
						symbolSize : function(val) {
							return val[2] * 2;
						},
						data : data3
					},
					{
						name : '自动监控数据报告',
						type : 'scatter',
						tooltip : {
							trigger : 'item',
							formatter : function(params) {
								return params.seriesName + '<br/>' + '时间:' + params.value[0] + '<br/>' + '热词:'
										+ params.value[1] + '<br/>' + '次数: ' + params.value[2];
							},
							axisPointer : {
								show : true
							}
						},
						symbolOffset : [ '-100 %', '120 %' ],
						symbolSize : function(val) {
							return val[2] * 2;
						},
						data : data4
					},
					{
						name : '监督性监测报告',
						type : 'scatter',
						tooltip : {
							trigger : 'item',
							formatter : function(params) {
								return params.seriesName + '<br/>' + '时间:' + params.value[0] + '<br/>' + '热词:'
										+ params.value[1] + '<br/>' + '次数: ' + params.value[2];
							},
							axisPointer : {
								show : true
							}
						},
						symbolOffset : [ '-100 %', '60 %' ],
						symbolSize : function(val) {
							return val[2] * 2;
						},
						data : data5
					} ]
		};
		myChart.setOption(option, true);
	});
