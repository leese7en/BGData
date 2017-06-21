/**
 * Created by se7en on 2016/2/4.
 */

var installedOption = {
	title : {
		x : 'center',
		text : '全区-工况装机对比',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'axis'

	},
	legend : {
		x : 'center',
		y : 'bottom',
		textStyle : {
			color : '#FAD860'
		},
		data : []
	},
	color : [ '#F98F6F', '#9FDABF' ],
	calculable : true,
	grid : {
		x : 50,
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
		splitLine : {
			show : false
		},
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
		data : []
	},
	yAxis : [ {
		name : '万千瓦',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'value',
		splitLine : {
			type : 'dashed'
		},
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	} ],
	series : []
};

var powerOption = {
	title : {
		x : 'center',
		text : '工况机组发电趋势',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'axis',
		formatter : function(params) {
			var length = params.length;
			var tip = params[0].name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>' + params[i].seriesName + ':' + (params[i].value ? (params[i].value).toFixed(2) : '-');
			}
			return tip;
		}
	},
	legend : {
		x : 'center',
		y : 'bottom',
		textStyle : {
			color : '#FAD860'
		},
		data : []
	},
	calculable : true,
	color : [ '#ff4992', '#47ff91' ],
	grid : {
		x : 50,
		y : 60,
		x2 : 40,
		y2 : 60
	},
	xAxis : {
		name : '月份',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'category',
		splitLine : {
			show : false
		},
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
		data : []
	},
	yAxis : {
		name : '百万千瓦时',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		splitLine : {
			type : 'dashed'
		},
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
		type : 'value'
	},
	series : []
};

var dataMap = {};

//全区状况
var superAllOption = {
	title : {
		text : '超低排放预测',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'item',
		formatter : function(params) {
			if (params.data.subname) {
				tip = '置换装机:' + (params.value ? (params.value).toFixed(2) : '-');
			} else {
				tip = params.name + ':' + (params.value ? (params.value).toFixed(2) : '-');
			}
			return tip;
		}
	},
	legend : {
		y : 'bottom',
		textStyle : {
			color : '#FAD860'
		},
		data : [ '预计排放量', '预计削减量' ]
	},
	color : [ '#F98F6F', '#9FDABF', '#6F6ABF' ],
	calculable : true,
	series : [ {
		name : '置换装机容量',
		type : 'pie',
		radius : [ '50%', '70%' ],
		itemStyle : {
			normal : {
				label : {
					show : false
				},
				labelLine : {
					show : false
				}
			},
			emphasis : {
				label : {
					show : true,
					position : 'center',
					textStyle : {
						fontSize : '16',
						fontWeight : 'bold'
					}
				}
			}
		},
		data : [ 335, 1548 ]
	}, {
		name : '置换装机',
		type : 'pie',

		radius : [ 0, '30%' ],
		label : {
			normal : {
				position : 'center',
				textStyle : {
					color : '#ff0000',
					fontSize : '24'
				}
			}
		},
		labelLine : {
			normal : {
				show : false
			}
		},
		itemStyle : {
			normal : {
				color : '#070627'
			}
		},
		data : []
	} ]
};

//盟市状况

var width = 935;
var height = 768;
$(document).ready(function() {
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
	$('#installedChart').css('width', width / 3);
	$('#installedChart').css('height', height / 2 - 30);
	$('#powerChart').css('width', width / 3 * 2);
	$('#powerChart').css('height', height / 2 - 30);
	$('#superAllChart').css('width', width / 3);
	$('#superAllChart').css('height', height / 2 - 30);
	$('#superCityChart').css('width', width / 3 * 2);
	$('#superCityChart').css('height', height / 2 - 40);
	getInddustryInfo();
	getSupwerLowInfo();
});

/**
 * 获取工况相关数据
 */
function getInddustryInfo() {
	var installedChart = echarts.init(document.getElementById('installedChart'));
	installedChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	var powerChart = echarts.init(document.getElementById('powerChart'));
	powerChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax( {
		url : '../getIndustryInfo',
		dataType : 'json',
		success : function(data) {
			toastr.success('加载成功');
			installedChart.hideLoading();
			var installed = data.industryAmount;
			var legend = installed.legend;
			installedOption.legend.data = legend;
			installedOption.xAxis.data = installed.xAxis;
			var series = new Array();
			var serie = new Object();
			var values = installed.series;
			var l = Object.keys(values).length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = legend[i];
				serie.type = 'bar';
				serie.data = values[legend[i]];
				series.push(serie);
			}
			installedOption.series = series;
			installedChart.setOption(installedOption);

			powerChart.hideLoading();
			var power = data.powerAmount;

			var legend = power.legend;
			powerOption.legend.data = legend;
			powerOption.xAxis.data = power.xAxis;
			var series = new Array();
			var serie = new Object();
			var values = power.series;
			var l = Object.keys(values).length;
			for ( var i = 0; i < l; i++) {
				serie = new Object();
				serie.name = legend[i];
				serie.type = 'line';
				serie.data = values[legend[i]];
				serie.lineStyle = {
					normal : {
						width : 3
					}
				};
				series.push(serie);
			}
			powerOption.series = series;
			powerChart.setOption(powerOption);

		},
		error : function() {
			toastr.error('加载失败');
		}
	});
}

function getSupwerLowInfo() {
	var superAllChart = echarts.init(document.getElementById('superAllChart'));
	superAllChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});

	var superCityChart = echarts.init(document.getElementById('superCityChart'));
	superCityChart.showLoading( {
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax({
		url:'../getSupwerLowInfo',
		dataType:'json',
		success:function(data){
			initSuperChart(data);
			superCityChart.hideLoading();
			var superCityOption = {
   			baseOption: {
        timeline: {
            axisType: 'category',
            autoPlay: true,
            playInterval: 3000,
            controlPosition : 'right',
            left:20,
            right:20,
            bottom:30,
            data: [
                '2016-01-01','2017-01-01','2018-01-01','2019-01-01','2020-01-01'
            ],
			label : {
				formatter : function(s) {
                    return (new Date(s)).getFullYear();
                },
				normal : {
					textStyle : {
						color : '#60C0DD'
					}
				},
				emphasis : {
					textStyle : {
						color : '#FAD860'
					}
				}
			}
        },
        tooltip: {
        	trigger : 'axis',
			axisPointer : { 
				type : 'shadow' 
			},
			formatter:function(params){
			var length = params.length;
			var tip = params[0].name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>' + params[i].seriesName + ':'
				+ (params[i].value ? (params[i].value).toFixed(2) : '-');
			}
			return tip;
		}
			
        },
        title: {
            x:'center',
        	text: '超低排放与预测',
        	textStyle : {
			color : '#cde7f7'
		}
        },
        legend: {
            data: ['预计排放量', '预计削减量', '置换装机'],
            textStyle : {
				color : '#FAD860'
			},
            y:'bottom'
        },
        calculable : true,
        color:['#60C0DD','#FAD860','#F98F6F'],
        grid:{
	    	x:50,
	    	y:40,
	    	x2:50,
	    	y2:100
	    },
        xAxis: [
            {
 				name:'盟市',
				nameTextStyle:{
					color:'rgba(255,255,255,0.7)'
				},
            	 type:'category',
                 axisLabel:{'interval':0},
                 data:data.xAxis,
                 splitLine: {show: false},
                 axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
            }
        ],
        yAxis: [
            {
            	name: '排放量(t)',
            	max:10000,
            	interval:2000,
				nameTextStyle:{
					color:'rgba(255,255,255,0.7)'
				},
                type: 'value',
                axisLabel : {
					textStyle : {
						color : 'rgba(255,255,255,0.7)'
					}
				},
            },
             {
                type: 'value',
                name: '置换装机(万千瓦)',
                interval:7,
                max:35,
                nameTextStyle:{
					color:'rgba(255,255,255,0.7)'
				},
                axisLabel : {
					textStyle : {
						color : 'rgba(255,255,255,0.7)'
					}
				},
            }
        ],
        series: [
            {name: '预计排放量', type: 'bar'},
            {name: '预计削减量', type: 'bar'},
            {name: '置换装机', type: 'line',yAxisIndex:1}
           
        ]
    },
    options: [
        {
            title: {text: '2016超低排放预测'},
            series: [
                {data: dataMap.emissionsCityValue['2016']},
                {data: dataMap.reductionsCityValue['2016']},
                {data: dataMap.installedCityValue['2016']}
            ]
        },
        {
            title : {text: '2017超低排放预测'},
            series : [
               {data: dataMap.emissionsCityValue['2017']},
                {data: dataMap.reductionsCityValue['2017']},
                {data: dataMap.installedCityValue['2017']}
            ]
        },
        {
            title : {text: '2018超低排放预测'},
            series : [
               {data: dataMap.emissionsCityValue['2018']},
                {data: dataMap.reductionsCityValue['2018']},
                {data: dataMap.installedCityValue['2018']}
            ]
        },
        {
            title : {text: '2019超低排放预测'},
            series : [
               {data: dataMap.emissionsCityValue['2019']},
                {data: dataMap.reductionsCityValue['2019']},
                {data: dataMap.installedCityValue['2019']}
            ]
        },
        {
            title : {text: '2020超低排放预测'},
            series : [
                {data: dataMap.emissionsCityValue['2020']},
                {data: dataMap.reductionsCityValue['2020']},
                {data: dataMap.installedCityValue['2020']}
            ]
        }
    ]
};
			
			superCityChart.setOption(superCityOption)
			superAllChart.hideLoading();
			var allValues = dataMap.allValue[2016]; 
			var valuesArray = new Array();
			var v = allValues.slice(0,2);
			var obj1 = new Object(); 
			obj1.name = '预计排放量'; 
			obj1.value=v[0];
			valuesArray.push(obj1);
			var obj2 = new Object(); 
			obj2.name = '预计削减量'; 
			obj2.value=v[1];
			valuesArray.push(obj2);
			console.log(valuesArray);
			superAllOption.series[0].data = valuesArray;
			
			var tt =new Object();
			tt.name = allValues[2].toFixed(2)+'';
			tt.subname='置换';
			tt.value=allValues[2];
			var ttArray= new Array();
			ttArray.push(tt);
			superAllOption.series[1].data = ttArray;
			superAllChart.setOption(superAllOption);
			var allValues = dataMap.allValue;
			superCityChart.on('timelineChanged', function(target) {
				var year = 2016+(target.currentIndex%5);
				var valuess = allValues[year];
				var valuesArray = new Array();
				var v = valuess.slice(0,2);
				var obj1 = new Object(); 
				obj1.name = '预计排放量'; 
				obj1.value=v[0];
				valuesArray.push(obj1);
				var obj2 = new Object(); 
				obj2.name = '预计削减量'; 
				obj2.value=v[1];
				valuesArray.push(obj2);
				var tt =new Object();
				tt.name=valuess[2].toFixed(2)+'';
				tt.value=valuess[2];
				tt.subname='置换';
				var ttArray= new Array();
				ttArray.push(tt);
				superAllOption.series[1].data = ttArray;
				superAllOption.series[0].data = valuesArray;
				superAllChart.setOption(superAllOption);
			});
		},
		error:function(){
			toastr.error('加载失败');
		}
	});
}


/**
 * 格式化 超低排放的数据
 * @param {Object} data
 */
function initSuperChart(data){
	
	//盟市数据
	var emissionsCity= data.emissionsCity;
	var emissionsCityValue = new Object();
	for(var year =2016;year<=2020;year++){
		var values = emissionsCity[year];
		var size = values.length;
		for(var i =0;i<size;i++){
			if(!emissionsCityValue[year]){
				emissionsCityValue[year] = new Array();
			}
			emissionsCityValue[year+""][i]= values[i];
		}
	}
	dataMap.emissionsCityValue=emissionsCityValue;	
	var reductionsCity= data.reductionsCity;
	var reductionsCityValue = new Object();
	for(var year =2016;year<=2020;year++){
		var values = reductionsCity[year];
		var size = values.length;
		for(var i =0;i<size;i++){
			if(!reductionsCityValue[year]){
				reductionsCityValue[year] = new Array();
			}
			reductionsCityValue[year][i]= values[i];
		}
	}
	dataMap.reductionsCityValue=reductionsCityValue;
	
	var installedCity= data.installedCity;
	var installedCityValue = new Object();
	for(var year =2016;year<=2020;year++){
		var values = installedCity[year];
		
		var size = values.length;
		for(var i =0;i<size;i++){
			if(!installedCityValue[year]){
				installedCityValue[year] = new Array();
			}
			installedCityValue[year][i]= values[i];
		}
	}
	dataMap.installedCityValue=installedCityValue;
	
	//全区数据
	var emissionsAll= data.emissionsAll;
	var reductionsAll= data.reductionsAll;
	var installedAll= data.installedAll;
	var allValue = new Object();
	for(var i =0;i<5;i++){
		if(!emissionsAll[i]){
				emissionsAll[i]=0
			}
		if(!reductionsAll[i]){
				reductionsAll[i]=0
			}
		if(!installedAll[i]){
				installedAll[i]=0
			}
		
		if(!allValue[i+2016]){
			allValue[i+2016] = new Array();
		}
		allValue[i+2016][0]= emissionsAll[i];
		allValue[i+2016][1]= reductionsAll[i];
		allValue[i+2016][2]= installedAll[i];
	}
	dataMap.allValue=allValue;	
}