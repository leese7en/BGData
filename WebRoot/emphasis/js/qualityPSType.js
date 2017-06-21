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
				show : false,
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
				show : true,
				name : ''
			}
		}
	},
	dataZoom : {
		show : true,
		start : 30,
		end : 70
	},
	calculable : true,
	legend : {
		data : [ '行业得分' ],
		bottom : false,
		top : true
	},
	xAxis : {
		type : 'category'
	},
	yAxis : [ {
		type : 'value',
		name : '得分',
		scale : true
	} ],
	series : [ {
		name : '行业得分',
		type : 'bar'
	} ]
};

$(document).ready(function() {
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	$('#psTypeChart').css('width', width / 2 - 10);
	$('#psTypeChart').css('height', height - 80);
	$('.help-tip').find('p').html('对选定月份各行业数据质量得分进行排名。')
	queryCity();
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		startView : 'year',
		minView : 'year',
		todayHighlight : true,
		todayBtn : true,
		forceParse : false,
		allowInputToggle : true
	});
	var nowtime = new Date().getTime();
	$('#timeQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM'));
	queryInfo();
});

/**
 * 查询盟市信息
 */
function queryCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.cityName = '全区';
			value.unshift(o);
			$('#cityQuery').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value,
				editable : false
			});
			$('#cityQuery').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}
/**
 * 获取满足条件的数据
 */
function queryInfo() {
	var date = $('#timeQuery').find('input').val();
	if (!date) {
		$.messager.alert('信息', '请选择时间', 'info');
		return;
	}
	var cityId = $('#cityQuery').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getQuotaPSType',
		data : {
			date : date,
			cityId : cityId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				$.messager.alert('信息', '' + data.message + '', 'info');
				return;
			}
			var message = data.data.message;
			var time = $('#timeQuery').find('input').val();
			var times = time.split('-');
			var cityId = $('#cityQuery').combobox('getValue');
			var cityName = $('#cityQuery').combobox('getText');
			time = times[0] + '年' + parseInt(times[1]) + '月' + cityName;
			$('#message').html(time + message);
			initChart(data.data);
			$('#psTypeRank').show();
			$('#psTypeRank').datagrid('loadData', data.data.psType);
		},
		error : function() {
			$.messager.alert('信息', '获取信息失败', 'info');
		}
	});
}

/**
 * 格式化图表
 * @param {Object} data
 */
function initChart(data) {
	option.xAxis.data = data.xAxis;
	option.series[0].data = data.data;
	var myChart = echarts.init(document.getElementById('psTypeChart'));
	myChart.setOption(option);
}

/**
 *  格式化 
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatNumber(val, row, index) {
	return '<font color="green">' + parseFloat(val).toFixed(2) + '</font>';
}
