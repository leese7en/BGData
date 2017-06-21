var option = {
	tooltip : {
		trigger : 'axis',
		axisPointer : { // 坐标轴指示器，坐标轴触发有效
			type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	}
	},
	legend : {
		data : [ '总次数', '总时长(h)' ]
	},
	grid : {
		left : '3%',
		right : '4%',
		bottom : '3%',
		containLabel : true
	},
	xAxis : {
		type : 'category',
		data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
	},
	yAxis : [ {
		type : 'value'
	}, {
		type : 'value'
	} ],
	series : [ {
		name : '总次数',
		type : 'bar',
		data : [ 320, 332, 301, 334, 390, 330, 320 ]
	}, {
		name : '总时长(h)',
		type : 'bar',
		yAxisIndex : 1,
		data : [ 120, 132, 101, 134, 90, 230, 210 ]
	} ]
};
/**
 * 初始化
 */

$(document).ready(function() {
	toastr.options.positionClass = 'toast-top-center';
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
	$('#queryTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM'));
	queryCity();
});

/**
 * 获取盟市信息
 */
function queryCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(value) {
			var option = '';
			for ( var i in value) {
				option += '<option value="' + value[i].id + '">' + value[i].cityName + '</option>';
			}
			$('#queryCity').append(option);
			$('#queryCity').selectpicker('refresh');
			changeInfo();
		},
		error : function() {
		}
	});
}

/**
 * 获取具体的盟市
 */
function changeInfo() {
	var cityId = $('#queryCity option:selected').val();
	var psName = $('#psName').val();
	$.ajax( {
		type : 'get',
		url : '../getEnterpriseByInfo',
		data : {
			cityId : cityId,
			psName : encodeURI(encodeURI(psName))
		},
		dataType : 'json',
		success : function(value) {
			var option = '';
			for ( var i in value) {
				option += '<option value="' + value[i].psCode + '">' + value[i].psName + '</option>';
			}
			$('#queryPsName').html('');
			$('#queryPsName').append(option);
			$('#queryPsName').selectpicker('refresh');
			queryInfo();
		},
		error : function() {
		}
	});
}

/**
 * 获取满足条件的信息
 */
function queryInfo() {
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight - 100;
	$('#chart').css('width', width);
	$('#chart').css('height', height);
	var psCode = $('#queryPsName option:selected').val();
	var queryTime = $('#queryTime').find('input').val();
	var chart = echarts.init(document.getElementById('chart'));
	chart.showLoading( {
		text : '正在努力加载中...'
	});
	$.ajax( {
		type : 'get',
		url : '../getEnterpriseStatistics',
		data : {
			psCode : psCode,
			queryTime : queryTime
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			console.log(flag);
			if (flag < 0) {
				toastr.info(data.message);
				chart.hideLoading();
				return;
			}
			var value = data.data;
			option.xAxis.data = value.legend;
			option.series[0].data = value.count;
			option.series[1].data = value.distance;
			chart.setOption(option);
			chart.hideLoading();
		},
		error : function() {
		}
	});
}