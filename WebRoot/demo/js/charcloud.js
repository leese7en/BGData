/**
 * Created by se7en on 2016/2/4.
 */

$(document).ready(
		function() {

			var width = document.documentElement.clientWidth - 20;
			var height = document.documentElement.clientHeight - 20;
			$('#main').css('width', width);
			$('#main').css('height', height);

			function createRandomItemStyle() {
				return {
					normal : {
						color : 'rgb(' + [ Math.round(Math.random() * 160), Math.round(Math.random() * 160),
								Math.round(Math.random() * 160) ].join(',') + ')'
					}
				};
			}

			var option = {
				title : {
					text : '字符云',
				},
				tooltip : {
					show : true
				},
				series : [ {
					name : '字符云',
					type : 'wordCloud',
					size : [ '100%', '100%' ],
					textRotation : [ 0, 45, 90, -45 ],
					textPadding : 3,
					autoSize : {
						enable : true,
						minSize : 12
					},
					data : [ {
						name : "大气压力设置错误",
						value : 100,
						itemStyle : createRandomItemStyle()
					}, {
						name : "进出口流量误差大",
						value : 93,
						itemStyle : createRandomItemStyle()
					}, {
						name : "烟气采样管频繁堵塞",
						value : 89,
						itemStyle : createRandomItemStyle()
					}, {
						name : "预处理系统堵塞",
						value : 84,
						itemStyle : createRandomItemStyle()
					}, {
						name : "连续两小时数据相同",
						value : 76,
						itemStyle : createRandomItemStyle()
					}, {
						name : "未贴有效性审核标签",
						value : 71,
						itemStyle : createRandomItemStyle()
					}, {
						name : "No的NOx转换系数未参与计算",
						value : 67,
						itemStyle : createRandomItemStyle()
					}, {
						name : "采样泵堵塞",
						value : 60,
						itemStyle : createRandomItemStyle()
					}, {
						name : "小时数据上传推迟一小时",
						value : 55,
						itemStyle : createRandomItemStyle()
					}, {
						name : "药剂更换记录不完整",
						value : 50,
						itemStyle : createRandomItemStyle()
					}, {
						name : "数值变化小，未抽上水样",
						value : 45,
						itemStyle : createRandomItemStyle()
					}, {
						name : "原净烟流量逻辑不符",
						value : 39,
						itemStyle : createRandomItemStyle()
					}, {
						name : "信号漂移，使COD数据为0",
						value : 37,
						itemStyle : createRandomItemStyle()
					},

					{
						name : "标液标签未更换",
						value : 35,
						itemStyle : createRandomItemStyle()
					}, {
						name : "计量单元报故障",
						value : 30,
						itemStyle : createRandomItemStyle()
					}, {
						name : "污水厂改造，数据不能正常上传",
						value : 26,
						itemStyle : createRandomItemStyle()
					}, {
						name : "采样故障数据死值",
						value : 15,
						itemStyle : createRandomItemStyle()
					} ]
				} ]
			};

			var myChart = echarts.init(document.getElementById('main'));
			myChart.setOption(option);
			myChart.on('click', function(param) {
				alert(param.name);
			});

		});
