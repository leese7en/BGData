var lineOption = {
	tooltip : {
		trigger : 'axis',
		x : '5%',
		axisPointer : {
			animation : false
		},
		formatter : function(params) {
			var length = params.length;
			var tip = params[0].name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>' + params[i].seriesName + ':'
				+ (params[i].value ? (params[i].value).toFixed(2) : '-');
			}
			return tip;
		}
	},
	legend : {
		x : 'center',
		data : []
	},
	toolbox : {
		show : true,
		itemGap : 5,
		x : "87%",
		feature : {
			mark : {
				show : true
			},
			dataView : {
				show : false,
				icon : 'image://../images/echartstoolbox/data.png',
				readOnly : false
			},
			magicType : {
				show : true,
				icon : {
					'line' : 'image://../images/echartstoolbox/line.png',
					'bar' : 'image://../images/echartstoolbox/bar.png',
					'stack' : 'image://../images/echartstoolbox/strack.png'
				},
				type : [ 'line', 'bar', 'stack' ]
			},
			restore : {
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
			saveAsImage : {
				icon : 'image://../images/echartstoolbox/save.png',
				name : '盟市指标对比'
			}
		}
	},
	calculable : true,
	xAxis : {
		type : 'category',
		name:'时间',
		data : [ '周一', '周二', '周三', '周四', '周五', '周六', '周日' ]
	},
	yAxis : [{
		type : 'value',
		name:'污染物',
		scale : true
	},{
		type : 'value',
		name:'流量',
		scale : true
	}],
	series : []
};

var waterPolltant = [ {
	code : 'B01',
	name : '流量'
}, {
	code : '001',
	name : 'PH值'
}, {
	code : '011',
	name : '化学需氧量(COD)'
}, {
	code : '060',
	name : '氨氮'
}, {
	code : '003',
	name : '悬浮物(SS)'
}, {
	code : '070',
	name : '总氰'
}, {
	code : '110',
	name : '挥发酚'
}, {
	code : '101',
	name : '总磷'
}, {
	code : '072',
	name : '氟化物(水)'
} ];
var gasPolltant = [ {
	code : 'B02',
	name : '流量'
}, {
	code : '001',
	name : '烟尘'
}, {
	code : '002',
	name : '二氧化硫'
}, {
	code : '003',
	name : '氮氧化物'
}, {
	code : '010',
	name : '氨'
}, {
	code : '006',
	name : '氟化物(气)'
}, {
	code : '004',
	name : '一氧化碳'
}, {
	code : '016',
	name : '苯'
}, {
	code : '008',
	name : '氯化氢'
} ];

$(document).ready(function() {
	$('#psTypeQuery').on('hide.bs.select', function(e) {
		var type = $('#psTypeQuery').selectpicker('val');
		if (type == '0') {
			initPolltant(waterPolltant);
		} else {
			initPolltant(gasPolltant);
		}
	});
	initPolltant(waterPolltant);
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"progressBar" : false,
		"positionClass" : "toast-top-center",
		"onclick" : null,
		"showDuration" : "300",
		"hideDuration" : "1000",
		"timeOut" : "1000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	};
	queryEnterprise();
	$('#psEnterQuery').on('hide.bs.select', function(e) {
		var pscode = $('#psEnterQuery').selectpicker('val');
		if (pscode && pscode != '-1') {
			queryPsEnterOutputCode(pscode);
		}
	});
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm-dd hh',
		autoclose : true,
		startView : 'month',
		minView : 'day',
		todayHighlight : true,
		todayBtn : true,
		forceParse : false,
		allowInputToggle : true
	});
	var nowtime = new Date().getTime();
	$('#beginTimeQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 7, 'yyyy-MM-dd HH'));
	$('#endTimeQuery').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM-dd HH'));
//	hourDataChartQuery();
});

/**
 * 污染物数据
 * @param {Object} data
 */
function initPolltant(data) {
	var html = '';
	var j = data.length;
	for ( var i = 0; i < j; i++) {
		var o = data[i];
		html += '<option value="' + o.code + '">' + o.name + '</option>';
	}
	$('#pollutantCodeQuery').html(html);
	$('#pollutantCodeQuery').selectpicker('refresh');
}

/**
 * 获取 企业类型
 */
function queryEnterprise() {
	$.ajax( {
		type : 'get',
		url : '../getEnterprise',
		dataType : 'json',
		success : function(data) {
			var html = '';
			var j = data.length;
			for ( var i = 0; i < j; i++) {
				var o = data[i];
				html += '<option value="' + o.psCode + '">' + o.psName + '</option>';
			}
			html = '<option value="-1">请选择</option>' + html;
			$('#psEnterQuery').html(html);
			$('#psEnterQuery').selectpicker('refresh');
		},
		error : function() {

		}
	});
}

/**
 * 获取企业排口数据
 */
function queryPsEnterOutputCode(psCode) {
	$.ajax( {
		type : 'get',
		url : '../getResOutputCodeByPSCode',
		dataType : 'json',
		data : {
			psCode : psCode
		},
		success : function(data) {
			var html = '';
			var j = data.length;
			for ( var i = 0; i < j; i++) {
				var o = data[i];
				html += '<option value="' + o.iOCode + '">' + o.iOName + '</option>';
			}
			$('#outPutCodeQuery').html(html);
			$('#outPutCodeQuery').selectpicker('refresh');
		},
		error : function() {

		}
	});
}

/**
 * 查询用户信息
 */
function hourDataChartQuery() {
	
	var waterOrGas = $('#psTypeQuery').selectpicker('val');
	var psCode = $('#psEnterQuery').selectpicker('val');
	if (!psCode || psCode == '-1') {
		toastr.error('请选择企业');
		return;
	}
	var outPutCode = $('#outPutCodeQuery').selectpicker('val');
	if (!outPutCode || outPutCode == '-1') {
		toastr.error('请选择排口');
		return;
	}
	var pollutantCode = $('#pollutantCodeQuery').selectpicker('val');
	var beginTime = $('#beginTimeQuery').find('input').val();
	var endTime = $('#endTimeQuery').find('input').val();
	if (!beginTime) {
		toastr.error('请输入开始时间');
		return;
	}
	if (!endTime) {
		toastr.error('请输入结束时间');
		return;
	}
	if (beginTime >= endTime) {
		toastr.error('开始时间不能晚于结束时间');
		return;
	}
	var width = document.documentElement.clientWidth - 80;
	var height = document.documentElement.clientHeight - 150;
	$('#facHourDataChart').css('width', width);
	$('#facHourDataChart').css('height', height);
	$('#summit').addClass('disabled');
	var lineChart = echarts.init(document.getElementById('facHourDataChart'));
	    lineChart.showLoading({
                        animation:false,
                        text : '加载中',
                       textStyle : {fontSize : 28}
                    }); 
	$.ajax( {
		type : 'get',
		url : '../getFacHourDataInfoChart',
		dataType : 'json',
		data : {
			waterOrGas : waterOrGas,
			psCode : psCode,
			outPutCode : outPutCode,
			pollutantCode : pollutantCode,
			beginTime : beginTime,
			endTime : endTime
		},
		success : function(value) {
			toastr.success("加载成功");
			lineChart.hideLoading();
			$('#summit').removeClass('disabled');
			var legend = value.legend;
			lineOption.legend.data = legend;
			lineOption.xAxis.data = value.xAxis;
			var series = new Array();
			var serie = new Object();
			var values = value.data;
			var l = Object.keys(values).length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = legend[i];
				serie.type = 'line';
				serie.yAxisIndex = 0;	
				serie.data = values[legend[i]];
				if(legend[i].indexOf('流量')>-1){
				 	serie.yAxisIndex = 1;	
				}
				series.push(serie);
			}
			lineOption.series = series;
			lineChart.setOption(lineOption);
			
		},
		error : function() {
			lineChart.hideLoading();
		}
	});
}
