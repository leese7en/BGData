/**
 * Created by se7en on 2015/12/2.
 */
var option = {
	tooltip : {
		trigger : 'axis'
	},
	toolbox : {
		show : false,
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : true,
				readOnly : false
			},
			magicType : {
				show : true,
				type : [ 'line', 'bar' ]
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
	legend : {
		data : [ '预测排放量', '实际排放量', '置换空间', '装机容量' ],
		bottom : true
	},
	grid : {
		x : '5%',
		x2 : '25%',
		y : '8%',
		y2 : '20%'
	},
	xAxis : {
		type : 'category',
		data : [ '2011', '2012', '2013', '2014', '2015' ]
	},
	yAxis : [ {
		type : 'value',
		name : '排放量',
		axisLabel : {
			formatter : '{value} t'
		},
		scale : true
	}, {
		type : 'value',
		name : '装机总量',
		axisLabel : {
			formatter : '{value} 万千瓦'
		},
		scale : true
	} ],
	series : [ {
		name : '预测排放量',
		type : 'bar',
		data : [ 4.0, 9.9, 10.0, 12.2, 23.6 ]
	}, {
		name : '实际排放量',
		type : 'bar',
		stack : '总量',
		data : [ 2.0, 4.9, 7.0, 12.2, 25.6 ]
	}, {
		name : '置换空间',
		type : 'bar',
		stack : '总量',
		data : [ 2.6, 5.9, 9.0, 12.4, 12.7 ]
	}, {
		name : '装机容量',
		type : 'line',
		yAxisIndex : 1,
		data : [ 5.0, 6.2, 8.3, 8.5, 6.3 ]
	} ]
};

/**
 * 获取menu
 */
$(document).ready(function() {
	$('.dragProduction').bind('dblclick', function(e) {
		// 弹出添加框
			$('#powerUnitInfo').modal( {
				backdrop : 'static'
			});
		});
	$('.dragReform').bind('dblclick', function(e) {
		// 弹出添加框
			$('#powerUnitInfo').modal( {
				backdrop : 'static'
			});
		});
	$('.dragPlan').bind('dblclick', function(e) {
		// 弹出添加框
			$('#powerUnitInfo').modal( {
				backdrop : 'static'
			});
		});
	$('.dragPlanning').bind('dblclick', function(e) {
		// 弹出添加框
			$('#powerUnitInfo').modal( {
				backdrop : 'static'
			});
		});
	$('.dragChange').bind('dblclick', function(e) {
		// 弹出添加框
			$('#powerUnitInfo').modal( {
				backdrop : 'static'
			});
		});
	$('.dragClose').bind('dblclick', function(e) {
		// 弹出添加框
			$('#powerUnitInfo').modal( {
				backdrop : 'static'
			});
		});
	$('.dragNew').bind('dblclick', function(e) {
		// 弹出添加框
			$('#powerUnitInfo').modal( {
				backdrop : 'static'
			});
		});
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		minView : 'month',
		todayHighlight : true,
		todayBtn : true,
		allowInputToggle : true
	});
});

/**
 * 修改超低排放的标准
 */
function changeStandard() {
	$('#standardInfo').modal( {
		backdrop : 'static'
	});
}

function programOperator() {
	$('#programOperator').modal( {
		backdrop : 'static'
	});
}
function previewProgram() {
	$('#previewProgram').modal( {
		backdrop : 'static'
	});
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	$('#preview').css('width', width / 2 + 100);
	$('#preview').css('height', height - 200);
	var myChart = echarts.init(document.getElementById('preview'));
	myChart.setOption(option);
}
/**
 * 电厂机组信息
 */
function closeStandardInfoModal() {
	// 关闭modal窗口
	$('#standardInfo').modal('hide');
	$('#userId').val('');
	$('#userName').val('');
	$('#userNickName').val('');
	$('#userDesc').val('');
	$('#password').val('');
	$('#newPass').val('');
	$('#newPassAgain').val('');
}
/**
 * 关闭电厂机组信息窗口
 */
function closePowerUnitModal() {
	// 关闭modal窗口
	$('#powerUnitInfo').modal('hide');
	$('#userId').val('');
	$('#userName').val('');
	$('#userNickName').val('');
	$('#userDesc').val('');
	$('#password').val('');
	$('#newPass').val('');
	$('#newPassAgain').val('');
}

/**
 * 关闭方案窗口
 */
function closeProgramOperatorModal() {
	// 关闭modal窗口
	$('#programOperator').modal('hide');
	$('#userId').val('');
	$('#userName').val('');
	$('#userNickName').val('');
	$('#userDesc').val('');
	$('#password').val('');
	$('#newPass').val('');
	$('#newPassAgain').val('');
}
/**
 * 关闭方案窗口
 */
function closeProgramPreviewModal() {
	// 关闭modal窗口
	$('#previewProgram').modal('hide');
	$('#userId').val('');
	$('#userName').val('');
	$('#userNickName').val('');
	$('#userDesc').val('');
	$('#password').val('');
	$('#newPass').val('');
	$('#newPassAgain').val('');
}