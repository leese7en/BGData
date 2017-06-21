
function initChart(data){
	
	var lineOption = {
			tooltip : {
				trigger : 'axis'
			},
			legend : {
				/*data : [ '鄂尔多斯', '赤峰', '呼和浩特', '包头', '乌海','阿拉善','乌兰察布','通辽','呼伦贝尔' ]*/
				data : [ '鄂尔多斯', '赤峰', '呼和浩特', '包头', '乌海' ]
			},
			toolbox : {
				show : true,
				feature : {
					mark : {
						show : true
					},
					dataView : {
						show : false,
						readOnly : false
					},
					magicType : {
						show : true,
						type : [ 'line', 'bar', 'stack', 'tiled' ]
					},
					restore : {
						show : true
					},
					saveAsImage : {
						show : true
					}
				}
			},
			calculable : true,
			xAxis : [ {
				type : 'category',
				boundaryGap : false,
				data : [ 'z1', 'z2', 'z3', 'z4', 'z5' ]
			} ],
			yAxis : [ {
				type : 'value'
			} ],
			series : [ {
				name : '鄂尔多斯',
				type : 'line',
				stack : '总量',
				data : [ data.鄂尔多斯 ]
			}, {
				name : '赤峰',
				type : 'line',
				stack : '总量',
				data : [ data.赤峰 ]
			}, {
				name : '呼和浩特',
				type : 'line',
				stack : '总量',
				data : [ data.呼和浩特 ]
			}, {
				name : '包头',
				type : 'line',
				stack : '总量',
				data : [ data.包头 ]
			}, {
				name : '乌海',
				type : 'line',
				stack : '总量',
				data : [ data.乌海 ]
			}/*, {
				name : '阿拉善',
				type : 'line',
				stack : '总量',
				data : [ data.阿拉善 ]
			}, {
				name : '乌兰察布',
				type : 'line',
				stack : '总量',
				data : [ data.乌兰察布 ]
			}, {
				name : '通辽',
				type : 'line',
				stack : '总量',
				data : [ data.通辽 ]
			}, {
				name : '呼伦贝尔',
				type : 'line',
				stack : '总量',
				data : [ data.呼伦贝尔 ]
			} */]
		};

	
	var lineChart = echarts.init(document.getElementById('lineChart'));
	lineChart.setOption(lineOption);
	
}


$(document).ready(function() {
	//	var nowtime = new Date().getTime();
		//	$('#yearQuery').datetimespinner('setValue', utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM-dd'));
		$('#lineChart').css('width', 900);
		$('#lineChart').css('height', 400);

		queryAlgorithm();
		//			imporveLineQuery();
	});

/**
 * 获取所有的算法信息
 */
function queryAlgorithm() {
	$.ajax( {
		type : 'get',
		url : '../getQuotaBase',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.name = '全部';
			value.unshift(o);
			$('#quotaQuotaQuery').combobox( {
				valueField : 'name',
				textField : 'name',
				data : value
			});
			$('#quotaQuotaQuery').combobox('setValue', '全部');
		},
		error : function() {

		}
	});
}
/**
 * 查询指标
 */
function imporveLineQuery() {
	$('#lineChart').css('width', 900);
	$('#lineChart').css('height', 400);

	var year = $('#yearQuery').combobox('getValue');
	var algorithmCode = $('#quotaQuotaQuery').combobox('getValue');
	var waterOrGas = $('#waterOrGasQuery').combobox('getValue');

	$.ajax( {
		type : 'get',
		url : '../getImproveLine',
		data : {
			year : year,
			algorithmCode : encodeURI(encodeURI(algorithmCode)),
			waterOrGas : encodeURI(encodeURI(waterOrGas))
		},
		dataType : 'json',
		success : function(data) {
			var value = data.value;
			initChart(value);
		//							lineOption.legend.data = data.value.data;
		//			lineOption.xAxis = data.line.xAxis;
		//			lineOption.series = data.line.series;
		

	},
	error : function() {

	}
	});

}



