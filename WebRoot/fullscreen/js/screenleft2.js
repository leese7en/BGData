/**
 * Created by se7en on 2016/2/4.
 */
var columns =
[  {
	field : 'groupName',
	title : '集团',
	align : 'center'
}, {
	field : 'psName',
	title : '企业名称',
	align : 'center'
}, {
	field : 'so2Performance',
	title : 'SO₂ 排放绩效',
	align : 'center',
	formatter: 'toDecimalPer'
} , 
{
	field : 'genCapacity',
	title : '发电量百万',
	align : 'center',
	formatter: 'toDecimalGen'
}, 
{
	field : 'so2Amount',
	title : 'SO₂ 排放量',
	align : 'center',
	formatter: 'toDecimalAmo'
}];
var unitInstalledOption = {
	title : {
		text : '年度装机容量分布',
		x:'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'axis',
		axisPointer : { // 坐标轴指示器，坐标轴触发有效
			type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	}
	},
	legend : {
		y : 'bottom',
		textStyle : {
			color : '#FAD860'
		},
		data : []
	},
	grid : {
		x : 60,
		y : 50,
		x2 : 40,
		y2 : 60
	},
	xAxis : {
		name : '年份',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'category',
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
		data : []
	},
	color:['#c28154','#a66335','#763c15','#512406'],
	yAxis : [ {
		name : '装机容量(万千瓦)',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'value',
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	} ],
	series : []
};

var unitTypeOption = {
	title : {
		text : '年度装机类型分布',
		x:'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'axis',
		axisPointer : { // 坐标轴指示器，坐标轴触发有效
			type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	}
	},
	legend : {
		y : 'bottom',
		textStyle : {
			color : '#FAD860'
		},
		data : []
	},
	grid : {
		x : 60,
		y : 50,
		x2 : 40,
		y2 : 60
	},
	color:['#a69035','#a66335','#365f99','#4e3e9a','#319887'],
	xAxis : {
		name : '年份',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'category',
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
		data : []
	},
	yAxis : [ {
		name : '机组个数',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'value',
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	} ],
	series : []
};

var industryPollOption = {
		title : {
			text : '工况SO₂ 与发电量关系对比',
			x:'center',
			textStyle : {
				color : '#cde7f7'
			}
		},
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
            show: false
        },
        calculable: false,
        legend: {
            formatter : function(name) {
				return name;
			},
			y : 'bottom',
			textStyle : {
				color : '#FAD860'
			},
        },
        grid : {
			x : 60,
			y : 50,
			x2 : 60,
			y2 : 60
		},
		color : [ '#47cc91', '#9FDABF','#664992' ],
        xAxis: {
			name : '盟市',
            nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
			},
			type : 'category',
			axisLabel : {
				textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
			}
        },
        yAxis: [{
            type: 'value',
            name:'排放量(t)/发电量(百万kwh)',
            interval:10000,
            max:70000,
            axisLabel : {
                formatter: '{value}',
	            textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
            },
	        nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
        }, {
            type: 'value',
            name: '排放绩效(g/kwh)',
            interval:0.1,
            max:0.7,
            axisLabel : {
                formatter: '{value}',
	            textStyle : {
					color : 'rgba(255,255,255,0.7)'
				}
            },
	        nameTextStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
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


var width = 935;
var height = 768;
$(document).ready(function() {
	$('#industryPollTable').bootstrapTable('destroy');
    $('#industryPollTable').bootstrapTable({
        columns: columns,
        height:335,
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
	$('#unitInstalledChart').css('width', width /2);
	$('#unitInstalledChart').css('height', height / 2 - 20);
	$('#unitTypeChart').css('width', width / 2 );
	$('#unitTypeChart').css('height', height / 2 - 20);
	$('#industryPollChart').css('width', width / 2);
	$('#industryPollChart').css('height', height / 2 - 20);
	getUnit();
	getIndustryFullScreen();
	getIndustryFullScreenTable();
});
/**
 * 获取工况相关数据
 */
function getUnit() {
	var unitInstalled = echarts.init(document.getElementById('unitInstalledChart'));
	unitInstalled.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	var unitType = echarts.init(document.getElementById('unitTypeChart'));
	unitType.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		url : '../getBoilerTypeInstallAmountCountByYear',
		dataType : 'json',
		success : function(data) {
			toastr.success('加载成功');
			unitInstalled.hideLoading();
			var series = new Array();
			var serie = new Object();
			var xAxis = data.xAxis;
			var legend = data.amountLegend;
			
			unitInstalledOption.legend.data = legend;
			unitInstalledOption.xAxis.data = xAxis;
			var values = data.amountValues;
			var l = Object.keys(values).length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = legend[i];
				serie.type = 'bar';
				serie.stack = '统计', 
				serie.data = values[legend[i]];
				series.push(serie);
			}
			unitInstalledOption.series = series;
			unitInstalled.setOption(unitInstalledOption);
			unitType.hideLoading();
			var series = new Array();
			var serie = new Object();
			var legend = data.boilerLegend;
			unitTypeOption.xAxis.data = xAxis;
			unitTypeOption.legend.data = legend;
			var values = data.boilerValues;
			var l = Object.keys(values).length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = legend[i];
				serie.type = 'bar';
				serie.stack = '统计', 
				serie.data = values[legend[i]];
				series.push(serie);
			}
			unitTypeOption.series = series;
			unitType.setOption(unitTypeOption);
		},
		error : function() {
			toastr.error('加载失败');
		}
	});
}

/**
 * 获取工况相关数据
 */


function getIndustryFullScreen() {
	var industryPoll = echarts.init(document.getElementById('industryPollChart'));
	industryPoll.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		type : 'post',
		url : '../getIndustryFullScreen',
		data:{
			beginTime:'2016-01',
			endTime:'2016-12',
			viewPoint:'city',
			pollType:'SO2'
		},
		dataType : 'json',
		success : function(data) {
			industryPoll.hideLoading();
			var xAxis = data.xAxis;
			var legend = data.legend;
			var values = data.data;
			industryPollOption.legend.data = legend;
			industryPollOption.xAxis.data = xAxis;
			industryPollOption.series[0].name = legend[0];
			industryPollOption.series[1].name = legend[1];
			industryPollOption.series[2].name = legend[2];
			industryPollOption.series[0].data = values.pollData;
			industryPollOption.series[1].data = values.powerData;
			industryPollOption.series[2].data = values.emissionData;
		    industryPoll.setOption(industryPollOption);
		    industryPoll.on('click', function(target) {
		    	var cityName = target.name;
				getIndustryFullScreenTable(cityName)
		    });
		},
			error : function() {
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
//			$('#industryPollTable').bootstrapTable('load', data.length>5?data.slice(0,5):data);
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
    return s+'g/kWh';
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
    return s+'百万kWh';
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
    return s+'t';
}

