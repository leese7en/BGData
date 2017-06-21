/**
 * Created by se7en on 2016/12/26.
 */

var columns =
[  {
	field : 'groupName',
	title : '集团',
	width : '15%',
	align : 'center'
}, {
	field : 'psName',
	title : '企业名称',
	width : '45%',
	align : 'center'
}, {
	field : 'so2Performance',
	title : 'SO₂ 排放绩效<br\>(克每千瓦时)',
	align : 'center',
	width : '15%',
	formatter: 'toDecimalPer'
} , 
{
	field : 'genCapacity',
	title : '发电量<br\>(百万千瓦时)',
	width : '15%',
	align : 'center',
	formatter: 'toDecimalGen'
}, 
{
	field : 'so2Amount',
	title : 'SO₂ 排放量(吨)',
	align : 'center',
	width : '10%',
	formatter: 'toDecimalAmo'
}];

var boxplotOption = {
	title : {
		text : '火电厂SO₂排放绩效分布',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		axisPointer : {
			type : 'shadow'
		}
	},
	grid : {
		left : '20%',
		right : '5%',
		bottom : '15%'
	},
	xAxis : {
		type : 'category',
		data : [],
		boundaryGap : true,
		nameGap : 30,
		splitArea : {
			show : false
		},
		axisLabel : {
			formatter : '{value}',
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
		splitLine : {
			show : false
		},
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		}
	},
	yAxis : {
		type : 'value',
		name : 'SO₂ 排放绩效(g/kWh)',
		splitArea : {
			show : true
		},
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	},
	color:['#FF4500','#EEC900'],
	series : [{
				name : 'SO₂ 排放绩效',
				type : 'boxplot',
				data : [],
				tooltip : {
					formatter : function(param) {
						return [ 'SO₂ 排放绩效:' + '<br/>最大值: ' + param.data[4].toFixed(2), '上四分位: ' + param.data[3].toFixed(2),
								'中位值: ' + param.data[2].toFixed(2), '下四分位: ' + param.data[1].toFixed(2),
								'最小值: ' + param.data[0].toFixed(2) ].join('<br/>')
					}
				}
			}, {
				name : '排放绩效异常值',
				type : 'scatter',
				data : [],
				tooltip : {
					formatter : function(param) {
						return [ 'SO₂ 排放绩效:' + '<br/>异常值: ' + param.data[1].toFixed(2) ].join('<br/>')
					}
				}
			} ]
};
var cityBoxplotOption = {
	title : {
		text : '2014年盟市火电厂SO₂ 排放绩效分布',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		axisPointer : {
			type : 'shadow'
		}
	},
	grid : {
		left : '10%',
		right : '3%',
		bottom : '20%'
	},
	xAxis : {
		type : 'category',
		boundaryGap : true,
		data:['呼市','\n包头'],
		nameGap : 30,
		splitArea : {
			show : false
		},
		axisLabel : {
			formatter: function(value, index) {
                return value ? value.split("").join('\n') : ""; //竖排文字
            },
			textStyle : {
				color : 'rgba(255,255,255,0.7)',
				fontSize:8
			}
		},
		splitLine : {
			show : false
		},
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)',
			fontSize:8
		}
	},
	yAxis : {
		type : 'value',
		name : 'SO₂ 排放绩效(g/kWh)',
		splitArea : {
			show : true
		},
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	},
	color:['#FF4500','#EEC900'],
	series : [
			{
				name : 'SO₂ 排放绩效',
				type : 'boxplot',
				data : [],
				tooltip : {
					formatter : function(param) {
						return [ 'SO₂ 排放绩效:' + '<br/>最大值: ' + param.data[4].toFixed(2), '上四分位: ' + param.data[3].toFixed(2),
								'中位值: ' + param.data[2].toFixed(2), '下四分位: ' + param.data[1].toFixed(2),
								'最小值: ' + param.data[0].toFixed(2) ].join('<br/>')
					}
				}
			}, {
				name : '排放绩效异常值',
				type : 'scatter',
				data : [],
				tooltip : {
					formatter : function(param) {
						return [ 'SO₂ 排放绩效:' + '<br/>异常值: ' + param.data[1].toFixed(2) ].join('<br/>')
					}
				}
			} ]
};

var recentFunnelOption= {
    title: {
        text: '2014年SO₂排放绩效落后者与领跑者',
        x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
    },
    tooltip: {
    	position: [10, 10],
        trigger: 'item',
      	formatter : function(params) {
			var param = params.data
			var str = params.seriesName + '<br/>' + '企业:' + param.name + '<br/>' + 'SO₂ 排放绩效:'
				+ parseFloat(param.value).toFixed(2);
			return str;
		},
    },
    toolbox: {
    	show:false
    },
    calculable: true,
    color:['#FFD39B','#FFA54F','#FFB90F','#FFA54F','#FF8C00','#FF7F50','#FF7256','#FF4500','#FF0000','#FF3030','#000c0a','#012620','#024237','#045d4e','#136c5d','#298071','#44a090','#68c1b2','#9ce3d7','#8ce3d7'],
    legend: {
        data: [],
        textStyle : {
				color : '#FAD860'
		},
    },
    series: [ {
            name: '落后者',
            type: 'funnel',
            width: '8%',
            height: '80%',
            left: '5%',
            top: '15%',
            label: {
				 normal: {
                    formatter:function(param){
						var name = param.name;
						var str = '';
						var length = name.length;
						if(length>8){
							str=name.substring(0,8)+'\n'+name.substring(8,length);
						}else{
							str=name;
						}
						
						return str;
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
				emphasis:{
					
				}
			},
            data: []
        },
        {
            name: '领跑者',
            type: 'funnel',
            width: '8%',
            height: '80%',
            left: '52%',
            top: '15%',
            sort: 'ascending',
            label: {
				 normal: {
                    formatter:function(param){
						var name = param.name;
						var str = '';
						var length = name.length;
						if(length>8){
							str=name.substring(0,8)+'\n'+name.substring(8,length);
						}else{
							str=name;
						}
						return str;
                    },
                    textStyle: {
                        color: '#fff'
                    }
                },
				emphasis:{
					
				}
			},
            data: []
        }]
};



//盟市状况

var dataMap={};

var width = 935;
var height = 768;
$(document).ready(function() {
	$('#industryPollTable').bootstrapTable('destroy');
    $('#industryPollTable').bootstrapTable({
        columns: columns,
        height:310,
        striped: false, //是否显示行间隔色
        cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        pagination: false, //是否显示分页（*）
        sortable: false, //是否启用排序
        showColumns: false, //是否显示所有的列
        clickToSelect: false, //是否启用点击选中行
        idField: "ID", //每一行的唯一标识，一般为主键列
        showToggle: false, //是否显示详细视图和列表视图的切换按钮
        showExport: false, //显示导出按钮
        onLoadSuccess: function() {},
        onLoadError: function() {
            toastr.error('表格初始化失败');
        }
    });
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
	$('#so2EffectiveBoxChart').css('width', width / 3);
	$('#so2EffectiveBoxChart').css('height', height / 2 - 10);
	$('#so2EffectiveCityBoxChart').css('width', width / 3* 2);
	$('#so2EffectiveCityBoxChart').css('height', height / 2 - 10);
	
	$('#so2EffectiveLowChart').css('width', width / 3);
	$('#so2EffectiveLowChart').css('height', height / 2 - 10);
	getInddustrySO2EffectiveInfo();
	getIndustryFullScreenTable();
});

/**
 * 获取工况相关数据
 */
function getInddustrySO2EffectiveInfo() {
	var boxChart = echarts.init(document.getElementById('so2EffectiveBoxChart'));
	boxChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	var cityBoxChart = echarts.init(document.getElementById('so2EffectiveCityBoxChart'));
	cityBoxChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	var lowChart = echarts.init(document.getElementById('so2EffectiveLowChart'));
	lowChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		url : '../queryAnalysisFullScreen',
		dataType : 'json',
		success : function(data) {
			toastr.success('加载成功');
			boxChart.hideLoading();
			var boxplotData =data.boxplot;
			
			var abnormal =data.abnormal;
			var xAxis = data.xAxis;
			boxplotOption.xAxis.data = xAxis;
			boxplotOption.series[0].data= boxplotData;
			boxplotOption.series[1].data= abnormal;
			boxChart.setOption(boxplotOption);
			
			
			var cityXAxis = data.funnelXAxis;
			var cityBoxplot=data.cityBoxplot;
			var cityAbnormal=data.cityAbnormal;
			cityBoxChart.hideLoading();
			cityBoxplotOption.xAxis.data = cityXAxis;
			cityBoxplotOption.series[0].data= cityBoxplot;
			cityBoxplotOption.series[1].data= cityAbnormal;
			cityBoxChart.setOption(cityBoxplotOption);
			
			
			var funnel =data.recentFunnel;
			lowChart.hideLoading();
			recentFunnelOption.series[0].data= funnel.high;
			recentFunnelOption.series[1].data= funnel.low;
			lowChart.setOption(recentFunnelOption);
		},
		error : function() {
			toastr.error('加载失败');
		}
	});
}


/**
 * 盟市或集团 硫分查询
 */
function getIndustryFullScreenTable(cityName) {
	if(!cityName){
		cityName ='呼和浩特';
	}
	$.ajax( {
		type : 'get',
		url : '../getIndurutyConByEnterpriseFullScreen',
		data:{
			beginTime:'2016-01',
			endTime:'2016-12',
			city:encodeURI(encodeURI(cityName))
		},
		async:false,
		dataType : 'json',
		success : function(data) {
			$('#industryPollTable').bootstrapTable('load', data);
            $('#industryPollTable').bootstrapTable('refresh');
		},
		error : function() {

		}
	});
}

/**
 * 格式化数值，强制保留2位小数，如：2，会在2后面补上00.即2.00
 */
function toDecimalPer(value, row, index) {
    var x = value;
    var f = parseFloat(x);
    if (isNaN(f)) {
        return '-';
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

/**
 * 格式化数值，强制保留2位小数，如：2，会在2后面补上00.即2.00
 */
function toDecimalGen(value, row, index) {
    var x = value;
    var f = parseFloat(x);
    if (isNaN(f)) {
        return '-';
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

/**
 * 格式化数值，强制保留2位小数，如：2，会在2后面补上00.即2.00
 */
function toDecimalAmo(value, row, index) {
    var x = value;
    var f = parseFloat(x);
    if (isNaN(f)) {
        return '-';
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}