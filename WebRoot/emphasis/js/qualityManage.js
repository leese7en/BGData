/**
 * Created by se7en on 2016/2/4.
 */

var width = document.documentElement.clientWidth * 0.4 - 50;
var height = document.documentElement.clientHeight / 2 + 50;
var radarOption = {
	title : {
		text : '指标权重分布',
		x : 'center'
	},
	tooltip : {},
	legend : {
		show : false
	},
	toolbox : {
		show : false,
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : false,
				readOnly : false
			},
			restore : {
				show : true
			},
			saveAsImage : {
				show : true,
				name : '指标权重分布'
			}
		}
	},
	polar : [ {
		indicator : [],
		center : [ '50%', '52%' ],
		radius : (height - 100) / 2
	} ],
	calculable : true,
	series : [ {
		name : '指标分布',
		type : 'radar',
		data : [ {
			value : [ 0.43, 0.5, 0.28, 0.89, 0.67, 0.19, 12.2, 12.2 ],
			name : '预算分配'
		} ]
	} ]
};
$(document).ready(function() {
	$('.help-tip').find('p').html('对各项指标权重进行分配管理，所有指标权重总和为一百。')
	queryInfo();
	initText();
	initTable();
	$(window).resize(function() {
		queryInfo();
		initText();
		initTable();
	});
	
	 $("#maxNum").textbox({
			onChange:function(){
		 onlyNumberAndLength($(this).val(),'');
	    }})
	    
	 $("#maxTime").textbox({
			onChange:function(){
		 onlyNumberAndLength($(this).val(),'');
	    }})
});

function initText() {
	$('input').blur(function() {
		var value = $(this).val();
		if (value < 0 || isNaN(value) || value > 100) {
			$(this).css( {
				borderColor : 'red',
				borderWidth : '2px'
			});
		} else {
			$(this).css( {
				borderColor : 'grey',
				borderWidth : '1px'
			});
		}
		var inputs = $('#inputtable').find('input');
		var sumvalue = 0;
		for ( var i = 0; i < 8; i++) {
			var tempval = inputs.get(i).value;
			if (tempval == "") {
				continue;
			}
			sumvalue = parseFloat(tempval) + sumvalue;
		}
		$('#sum').val(sumvalue);
	})
}
/**
 * 查询信息
 */
function queryInfo() {
	width = document.documentElement.clientWidth * 0.4 - 50;
	height = document.documentElement.clientHeight / 2 + 50;
	$('#quotaRadarChart').css('width', width);
	$('#quotaRadarChart').css('height', height);

	$.ajax( {
		type : 'get',
		url : '../getQuotaParameter',
		dataType : 'json',
		success : function(value) {
			var data = value.data;
			$('#quotaTable').datagrid('loadData', data);
			radarOption.polar[0].indicator = value.chart.radar.indicator;
			radarOption.series[0].data = value.chart.radar.series;
			var radarChart = echarts.init(document.getElementById('quotaRadarChart'));
			radarChart.setOption(radarOption);
			//加载信息到输入框
		var inputs = $('#inputtable').find('input');
		for ( var i = 0; i < 8; i++) {
			inputs.get(i).value = data[i].parameter
		}
		var inputs = $('#inputtable').find('input');
		var tempsum = 0;
		for ( var i = 0; i < 8; i++) {
			tempsum = parseFloat(inputs.get(i).value) + tempsum;
		}
		$('#sum').val(tempsum);
	},
	error : function() {
		$.messager.alert('信息', '获取信息失败！', 'info');
	}
	});
}
function initTable() {
	$('#quotaTable').datagrid('hideColumn', 'id');
	$('#quotaTable').datagrid( {
		onClickRow : function(rowIndex, rowData) {
		},
		onDblClickRow : function(rowIndex, rowData) {
			var id = rowData.id;
			showQualityDialog(id);
		}
	});
}

/**
 * 取消设置值
 */
function queryQuality() {
	var sum = 0;
	var len = $('input').length;
	for ( var i = 0; i < len; i++) {
		sum += $('input').eq(i).val();
	}
	if (sum != 100) {
		$.messager.alert('信息', '各项和必须为100%','info');
	}
}

/**
 * 保存指标数据
 */

function saveQuota() {
	var reliable = $('#reliable').val()
	if (reliable == 0 || isNaN(reliable)) {
		$('#reliable').css( {
			borderColor : 'red',
			borderWidth : '2px'
		});
		$.messager.alert('信息', '可靠性不能为零', 'info');
		return;
	} else {
		$('#reliable').css( {
			borderColor : 'grey',
			borderWidth : '1px'
		})
	}
	var sum = $('#sum').val();
	if (sum != 100) {
		$('#sum').css( {
			borderColor : 'red',
			borderWidth : '2px'
		});
		$.messager
				.alert('信息', '各项指标和应为100', 'info');
		return;
	} else {
		$('#sum').css( {
			borderColor : 'grey',
			borderWidth : '1px'
		})
	}
	var constant = $('#constant').val();
	var fluctuation = $('#fluctuation').val();
	var handicapping = $('#handicapping').val();
	var mutation = $('#mutation').val();
	var screenjump = $('#screenjump').val();
	var reliable = $('#reliable').val();
	var complete = $('#complete').val();
	var effective = $('#effective').val();
	if (constant == "" || constant == null || fluctuation == "" || fluctuation == null || handicapping == ""
			|| handicapping == null || mutation == "" || mutation == null || reappear == "" || reappear == null
			|| reliable == "" || reliable == null || complete == "" || complete == null || effective == ""
			|| effective == null) {
		return;
	}
	$.ajax( {
		type : 'post',
		url : '../updateQuotaParameter',
		dataType : 'json',
		async : false,
		data : {
			constant : constant,
			fluctuation : fluctuation,
			handicapping : handicapping,
			mutation : mutation,
			screenjump : screenjump,
			reliable : reliable,
			complete : complete,
			effective : effective
		},
		success : function(value) {
			var data = value.data;
			$('#quotaTable').datagrid('loadData', data);
			radarOption.polar[0].indicator = value.chart.radar.indicator;
			radarOption.series[0].data = value.chart.radar.series;
			var radarChart = echarts.init(document.getElementById('quotaRadarChart'));
			radarChart.setOption(radarOption);
		},
		error : function() {
			$.messager.alert('信息', '保存失败', 'info');
		}
	});
}

/**
 * 显示对话框
 * @param id
 */
function showQualityDialog(id) {
	$('#qualityDialog').show();

$.ajax({
		type : 'post',
		url : '../getQuotaParameterById',
		data : {
			id : id,
		},
		cache : false,
		dataType : 'json',
		success : function(data) {
			$('#maxNum').textbox('setValue',data.maxNum);
			$('#maxTime').textbox('setValue',data.maxTime);
		},error : function(){
			
		}
	});
	
	$('#qualityDialog')
			.dialog(
					{
						collapsible : false,
						minimizable : false,
						maximizable : false,
						draggable : true,
						modal : true,
						height : 180,
						width : 320,
						top : 100,
						buttons : [
								{
									text : '提交',
									handler : function() {
										//设置
									var maxNum = $('#maxNum').textbox('getValue');
									var maxTime = $('#maxTime').textbox('getValue');
									//数字验证
									var reg = new RegExp("^[0-9]*$"); //数字数
									if (!reg.test(maxNum)) {
										$.messager
												.alert(
														'信息',
														'请输入数字',
														'info');
										return;
									} else if (!/^[0-9]*$/.test(maxNum)) {
										$.messager
												.alert(
														'信息',
														'请输入数字',
														'info');
										;
										return;
									}
									//0~24的正数 
									if (!reg.test(maxTime)) {
										$.messager
												.alert(
														'信息',
														'请输入数字',
														'info');
										return;
									} else if (!/^[0-9]*$/.test(maxTime)) {
										$.messager
												.alert(
														'信息',
														'请输入数字',
														'info');
										;
										return;
									} else if (maxTime < 0 || maxTime > 24) {
										$.messager
												.alert(
														'信息',
														'时间长度设置范围1-24',
														'info');
										return;
									}
									set(id, maxNum, maxTime);
								}
								}, {
									text : '取消',
									handler : function() {
										$('#qualityDialog').dialog('close');
										$('#maxNum').textbox('setValue', '');
										$('#maxTime').textbox('setValue', '');
									}
								} ]
					});
}

/**
 * 设置 得分算法的信息
 * @param {Object} id
 * @param {Object} maxNum
 * @param {Object} maxTime
 */
function set(id, maxNum, maxTime) {
	$.ajax( {
		type : 'post',
		url : '../setQuotaParameter',
		data : {
			id : id,
			maxNum : maxNum,
			maxTime : maxTime
		},
		cache : false,
		dataType : 'json',
		success : function(data) {
			$('#qualityDialog').dialog('close');
			var data = value.data;
			$('#quotaTable').datagrid('loadData', data);
			radarOption.polar = value.chart.radar.polar;
			radarOption.series[0].data = value.chart.radar.series;
			var radarChart = echarts.init(document.getElementById('quotaRadarChart'));
			radarChart.setOption(radarOption);
			$('#maxNum').textbox('setValue', '');
			$('#maxTime').textbox('setValue', '');
			$.messager.alert("信息", "设置成功", "info");
		},
		error : function() {
			$.messager.alert("信息", "设置失败", "info");
		}
	});
}