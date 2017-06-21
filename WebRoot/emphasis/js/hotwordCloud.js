/**
 * Created by se7en on 2016/2/4.
 */

var echarts;
function createRandomItemStyle() {
	return {
		normal : {
			color : 'rgb(' + [ Math.round(Math.random() * 160), Math.round(Math.random() * 160),
					Math.round(Math.random() * 160) ].join(',') + ')'
		}
	};
}
var option = {
	tooltip : {
		show : true
	},
	toolbox : {
		show : true,
		feature : {
			dataView : {
				show : false,
				readOnly : false
			},
			restore : {
				show : false
			},
			saveAsImage : {
				show : true,
				name : '热词字符云'
			}
		}
	},
	series : [ {
		name : '热词分布',
		type : 'wordCloud',
		size : [ '100%', '100%' ],
		textRotation : [ 0, 45, 90, -45 ],
		textPadding : 10,
		autoSize : {
			enable : true,
			minSize : 10,
			maxSize : 55
		},
		data : []
	} ]
};
$(document).ready(function() {
	$('.help-tip').find('p').html('热词展示界面以字符云的形式，只展示报告中提取出的问题，根据问题所处的位置及字体大小表现问题出现的热度。可点击词条直接进入热词搜索页面。')
	var nowtime = new Date().getTime();
	$('#beginTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30 * 6, 'yyyy-MM'));
	$('#endTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	queryHotwordType();
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

	require.config( {
		paths : {
			echarts : '../js/echarts'
		}
	});
	require( [ 'echarts', 'echarts/chart/wordCloud' ], function(ec) {
		echarts = ec;
		query();
	});
	$(window).resize(function() {
		query();
	});
});

/**
 * 查询热词类型
 */
function queryHotwordType() {
	$.ajax( {
		type : 'get',
		url : '../getHotwordTypes',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.text = '请选择';
			o.children = new Array();
			value.unshift(o);
			$('#hotwordType').combotree( {
				data : value
			});
			$('#hotwordType').combotree('setValue', '-1');
		},
		error : function() {
			$.messager.alert('信息', '获取数据失败！', 'info');
		}
	});
}
/**
 * 查询字符云
 * @return {TypeName} 
 */
function query() {
	var typeId = $('#hotwordType').combotree('getValue');
	if (!typeId) {
		typeId = '-1';
	}
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	if (beginTime == "" || endTime == "") {
		$.messager.alert('信息', '开始时间和结束时间为必填项!', 'info');
		return false;
	}
	$.ajax( {
		type : 'get',
		url : '../countHotwordTimesByWords',
		data : {
			"typeId" : typeId,
			"startTime" : beginTime,
			"endTime" : endTime
		},
		dataType : 'json',
		success : function(data) {
			var width = document.documentElement.clientWidth - 30;
			var height = document.documentElement.clientHeight - 60;
			$('#main').css('width', width);
			$('#main').css('height', height);
			var myChart = echarts.init(document.getElementById('main'));
			var length = data.series.length;
			var series = new Array();
			var o = new Object();
			for ( var i = 0; i < length; i++) {
				var oo = data.series[i];
				o = new Object();
				o.name = oo.name;
				o.value = oo.value;
				o.typeId = oo.typeId;
				o.itemStyle = createRandomItemStyle();
				series.push(o);
			}
			option.series[0].data = series;
			myChart.setOption(option);
			myChart.on('click', function(param) {
				window.location.href = 'hotwordManager.html?beginTime=' + beginTime + '&endTime=' + endTime
						+ '&hotword=' + encodeURI(param.name) + '&hotwordType=' + param.data.typeId;
			});
		},
		error : function() {
			$.messager.alert('信息', '获取数据失败！', 'info');
		}
	});
}