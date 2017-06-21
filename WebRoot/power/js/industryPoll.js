/**
 * Created by se7en on 2016/2/4.
 */
var myChart;
var option= {
        tooltip: {
            trigger: 'axis',
            axisPointer : {
				animation : false
			},
			formatter : function(params) {
				var length = params.length;
				var tip = params[0].name;
				var name = params[0].seriesName;
				top+='<br/>'+name;
				for ( var i = 0; i < length; i++) {
					tip += '<br/>' + params[i].seriesName + ':' + (params[i].value ? params[i].value : 0).toFixed(2);
				}
				return tip;
			}
        },
        toolbox: {
            show: true,
            feature: {
        		mark : {
				show : false,
			},
			magicType : {
				show : true,
				type : [ 'line', 'bar' ],
			},
			dataView : {
				show : false,
				readOnly : false,
				icon : 'image://../images/echartstoolbox/data.png',
			},
			restore : {
				show : true,
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
                saveAsImage: {
                    show: true,
                    name:"工况污染物",
                    icon : 'image://../images/echartstoolbox/save.png'
                }
            }
        },
        calculable: false,
        legend: {
            y: '20',
            formatter : function(name) {
				return name;
			}
        },
        xAxis: {
            type: 'category'
        },
        yAxis: [{
            type: 'value',
            name:'排放量(t)/发电量(百万kwh)',
            axisLabel : {
                formatter: '{value}'
            }
        }, {
            type: 'value',
            name: '排放绩效(g/kwh)',
        }],
        series: [
            {
                name: '排放量(t)',
                type: 'bar'
            }, {
                name: '发电量(百万kwh)',
                type: 'bar'
            }, {
                name:  '排放绩效值',
                type: 'line',
                yAxisIndex: 1,
                markPoint:{
                	symbol:'pin'
                },
            }
        ]
    };

$(document).ready(function() {
	$('.help-tip').find('p').html('本功能对电厂工况系统中的发电量及污染物排放进行分析，展示选定时间内盟市（集团）的排放及发电量对比，并可以选择盟市，展示盟市内企业的详细情况；用户可在批注管理里添加批注。')
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		startView:'year',
		minView : 'year',
		todayHighlight : true,
		todayBtn : true,
		forceParse:false,
		allowInputToggle : true,
		forceParse:false
	});
	var nowtime = new Date().getTime();
	$('#beginTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30*6, 'yyyy-MM'));
	$('#endTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	$('#beginEnterpriseTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30*6, 'yyyy-MM'));
	$('#endEnterpriseTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	$('.form_datetime').datetimepicker('update')
	queryCity();
	queryData();
	$(window).resize(function() {
		queryData();
	});
	queryEnterpriseData();
});

/**
 * 设置 图表的值
 * @param {Object} xname
 * @param {Object} data
 */
function setData(xAxis, data) {
	var width = document.documentElement.clientWidth - 60;
	var height = document.documentElement.clientHeight - 100;
	$('#cityChart').css('width', width);
	$('#cityChart').css('height', height);
	var legend = data.legend;
	var values = data.data;
	option.legend.data = legend;
	option.xAxis.data = xAxis;
		option.series[0].name = legend[0];
		option.series[1].name = legend[1];
		option.series[2].name = legend[2];
		option.series[0].data = values.pollData;
		option.series[1].data = values.powerData;
		option.series[2].data = values.emissionData;
		option.series[2].markPoint.data = values.markers;
	    myChart = echarts.init(document.getElementById('cityChart'));
	    myChart.setOption(option);
}
/**
 * 查询盟市信息
 */
function queryCity() {
	$.ajax({
		type: 'get',
		url: '../getIndustryCity',
		dataType: 'json',
		async:false,
		success: function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.cityName = '请选择';
			value.unshift(o);
			$('#cityEnterprise').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value
			});
			 var data = $('#cityEnterprise').combobox('getData');
             if (data.length > 0) {
                 $('#cityEnterprise').combobox('select', data[1].id);
             }
		},
		error: function() {

		}
	});
}
/**
 * 查询数据
 */
function queryData() {
	
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	if (beginTime > endTime){
		$.messager.alert('信息','结束年份不能早于开始年份', 'info');	
		return;
	}
	var viewPoint = $('#viewPoint').combobox('getValue');
	var pollType = $('#pollutionKind').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getIndustryConByPoll',
		data:{
			beginTime:beginTime,
			endTime:endTime,
			viewPoint:viewPoint,
			pollType:pollType
		},
		dataType : 'json',
		success : function(data) {
			var xAxis = data.xAxis;
			/*var y;
			if(pollutionKind == "SO2"){
				y = "SO2排放量(t)/发电量(百万kwh)";
			}else if(pollutionKind == "NOx"){
				y = "NOx排放量(t)/发电量(百万kwh)";
			}else if(pollutionKind == "dust"){
				y = "烟尘排放量(t)/发电量(百万kwh)";
			}
			option.yAxis.name=y;*/
			setData(xAxis,data);
			myChart.on('click', function (param) {
				var xids = data.xAxisId;
				var markers = data.data.markers;
				$('#annotationDialog').show();
				queryAnotationData(markers[param.dataIndex].groupIdOrCityId);
				$('#annotationDialog').dialog( {
					collapsible : false,
					minimizable : false,
					maximizable : false,
					draggable : true,
					modal : true,
					height : 400,
					width : 500,
					top : 20,
				});
				
			});
		},
		error : function() {
		}
	});
}


/**
 * 查询盟市下面的企业信息
 */
function queryEnterpriseData() {
	var beginTime = $('#beginEnterpriseTime').find('input').val();
	var endTime = $('#endEnterpriseTime').find('input').val();
	if (beginTime > endTime){
		$.messager.alert('信息','结束年份不能早于开始年份', 'info');	
		return	
	}
	var city = $('#cityEnterprise').combobox('getValue');
	if(city=='-1'){
		$.messager.alert('信息','请选择盟市','info');
		return ;
	}
	$.ajax( {
		type : 'get',
		url : '../getIndurutyConByEnterprise',
		data:{
			beginTime:beginTime,
			endTime:endTime,
			city:city
		},
		async:false,
		dataType : 'json',
		success : function(data) {
			$('#enterprise').datagrid('loadData', data);
		},
		error : function() {

		}
	});
}
/**
 * 查询批注信息
 */
function queryAnotationData(groupIdOrCityId) {
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	var viewPoint = $('#viewPoint').combobox('getValue');
	var pollutant=$('#pollutionKind').combobox('getValue');
	if("city"==viewPoint){
		viewPoint="2";
	}
	else{
		viewPoint="1";
	}
	$.ajax( {
		type : 'get',
		url : '../getGroupOrCityAnnotationById',
		data:{
			beginTime:beginTime,
			endTime:endTime,
			viewPoint:viewPoint,
			groupIdOrCityId:groupIdOrCityId,
			pollutant:pollutant
		},
		dataType : 'json',
		success : function(data){
			$('#annotationTable').datagrid('loadData', data);
		},
		error : function() {

		}
	});
}
/**
 * 日期格式化
 * @param {Object} date
 * @return {TypeName} 
 */
function myformatter(date) {
	if (!date) {
		return '';
	}
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	return y + '-' + (m < 10 ? ('0' + m) : m);
}

/**
 * 格式化日期选择框
 * @param {Object} s
 * @return {TypeName} 
 */
function myparser(s) {
	if (!s) {
		return null;
	}
	var ss = s.split('-');
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	if (!isNaN(y) && !isNaN(m)) {
		return new Date(y, m - 1, 1);
	} else {
		return new Date();
	}
}


/**
 *  格式化 时间间隔
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatNumber(val,row,index){
	if(val){
		return '<font color="green">'+val.toFixed(2)+'</font>';
	}else{
		return '<font color="green">0.00</font>';
	}
}

/**
 *  格式化 时间间隔
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatSulfur(val,row,index){
	if(val){
		return '<font color="green">'+val.toFixed(2)+'%</font>';
	}else{
		return '<font color="green">0.00%</font>';
	}

}
function formatMonth(val){
	if(val != null){
		return val.slice(-2);
	}
}


