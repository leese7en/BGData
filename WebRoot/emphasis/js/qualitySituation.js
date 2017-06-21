/**
 * Created by se7en on 2016/2/4.
 */
var energyData = [ {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}, {
	name : '黑1',
	value : 350,
	symbol : 'image://../images/red.png'
}

];
var energyGeo = {
	'黑1' : [ 107.68, 41.21 ]
};

var echarts;
var cityMap = {
	"呼和浩特市" : "150100",
	"包头市" : "150200",
	"乌海市" : "150300",
	"赤峰市" : "150400",
	"通辽市" : "150500",
	"鄂尔多斯市" : "150600",
	"呼伦贝尔市" : "150700",
	"巴彦淖尔市" : "150800",
	"乌兰察布市" : "150900",
	"兴安盟" : "152200",
	"锡林郭勒盟" : "152500",
	"阿拉善盟" : "152900"
};

var option= {
        	legend: {
            itemWidth: 20,
            itemHeight: 20,
            x:'20',
          	y:'20',
                data: [{
                    name: '后十名企业',
                    icon: 'image://../images/red.png',
                }]
            },
            tootip:{
            	trigger:'item'
            },
            dataRange:{
            	min:0,
            	max: 10,
            	precision:2,
            	x: 'left',
            	y: 50,
            	orient:'horizontal',
            	text:['高', '低'],
            	calculable:true,
            	color: ['green','yellow','red']
            },
            series: [
                {
                    name: '后十名企业',
                    type: 'map',
                    mapType: '内蒙古',
                  	hoverable:false,
                  	mapLocation: {x:'16%', y:'10%',width:'75%',height:'70%'},
                    itemStyle: {
                        normal: {
                            borderWidth: 2,
                            borderColor: 'green',
                            color: '#87CEFA',
                            label: {
                                show: true
                            }
                        },
                        emphasis: {                 // 也是选中样式
                            borderWidth: 2,
                            borderColor: '#fff',
                            color: '#32cd32',
                            label: {
                                show: true, 
                                textStyle: {
                                    color: '#fff'
                                }
                            }
                        }
                    },
                    // itemStyle: {
                    //     normal: {
                    //         borderWidth: 2,
                    //         // borderColor: 'lightgreen',
                    //         // color: 'green',
                    //         label: {
                    //             show: true
                    //         }
                    //     },
                    //     emphasis: {                 // 也是选中样式
                    //         borderWidth: 2,
                    //         // borderColor: '#fff',
                    //         // color: '#32cd32',
                    //         label: {
                    //             show: true,
                    //             textStyle: {
                    //                 color: '#fff'
                    //             }
                    //         }
                    //     }
                    // },
                    data: [
                    	{name: '呼伦贝尔市',value:9.5},
                		{name: '阿拉善盟',value: 9.2},
                		{name: '锡林郭勒盟',value: 9.0},
                		{name: '鄂尔多斯市',value: 7},
                		{name: '赤峰市',value: 6},
                		{name: '巴彦淖尔市',value: 9.1},
                		{name: '通辽市',value: 9.2},
                		{name: '乌兰察布市',value: Math.round(Math.random()*1000)},
                		{name: '兴安盟',value: Math.round(Math.random()*1000)},
                		{name: '包头市',value: Math.round(Math.random()*1000)},
                		{name: '呼和浩特市',value: Math.round(Math.random()*1000)},
               			{name: '乌海市',value: Math.round(Math.random()*1000)},
                    ],
                    markPoint: {
                        itemStyle: {
                            normal: {
                                color: 'black',
                                label: {
                                    show: true
                                }
                            },
                            emphasis:{
                            	color: 'red',
                                label: {
                                    show: true,
                                    formatter:function(params){
                                    	return params.name;
                                    },
                                    textStyle: {
                                    	color: 'black'
                                	}
                                }
                            }
                        },
                        data: energyData
                    },
                    geoCoord: energyGeo
                }
            ]
        };
$(document).ready(function() {
	$('.help-tip').find('p').html('展示选定月份，区域数据质量得分后十位的企业，当选择全区时，展示各盟市内所有企业的平均分，选择盟市时，展示改盟市的得分明细。')
	queryCity();
	 var nowtime = new Date().getTime();
	 $('#timeQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM'));
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		startView:'year',
		minView : 'year',
		todayHighlight : true,
		todayBtn : true,
		forceParse:false,
		allowInputToggle : true
	});
	$('.form_datetime').change(function(){
		var time = $('#timeQuery').find('input').val();
		if(onlyCheckDateMonth(time) == false){
			$('#timeQuery').find('input').val("2016-02");
			$('.form_datetime').datetimepicker("update");
		}
	});
	require.config( {
	paths : {
		echarts : '../js/echarts'
	}
});
require( [ 'echarts',  'echarts/chart/scatter', 
		'echarts/chart/map' ], function(ec) {
	//电网数据
		echarts = ec;
		var mapGeoData = require('echarts/util/mapData/params');
		for ( var city in cityMap) {
			// 自定义扩展图表类型
		mapGeoData.params[city] = {
			getGeoJson : (function(c) {
				var geoJsonName = cityMap[c];
				return function(callback) {
					$.getJSON('geoJson/china-main-city/' + geoJsonName + '.json', callback);
				}
			})(city)
		}
	}	
		queryInfo();
});
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
				editable:false ,
				data : value
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
	// var date = $('#timeQuery').val();
	var date = $('#timeQuery').find('input').val();
	if(!date){
		$.messager.alert('信息','请选择时间','info');
		return;
	}
	var cityId = $('#cityQuery').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getQuotaTop',
		data : {
			date : date,
			cityId:cityId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if(flag<0){
				$.messager.alert('信息',''+data.message+'','info');
				return ;
			}
			var message =data.data.message;
			// var time = $('#timeQuery').val();
			var time = $('#timeQuery').find('input').val();
			var times = time.split('-');
			var cityId = $('#cityQuery').combobox('getValue');
			var cityName = $('#cityQuery').combobox('getText');
			time =times[0]+'年'+parseInt(times[1])+'月'+cityName;
			$('#message').html(time+message);
			initChart(data.data,cityId);
			$('#topTen').datagrid('loadData', data.data.enterprise);
			if(cityId!='-1'){
				var gridPanel = $("#cityRank").datagrid("getPanel");
				gridPanel.panel('setTitle', '指标信息');
			}
			$('#cityRank').datagrid('loadData', data.data.city);
		},
		error : function() {
			$.messager.alert('信息', '获取信息失败', 'info');
		}
	});
}

function initChart(data,cityId) {
	$("#mapChart").css('height', 640);
	var cityName  =$('#cityQuery').combobox('getText');
	if(cityId =='-1'){
		cityName ='内蒙古';
		option.dataRange.show = true;
	}else{
		option.dataRange.show = false;
	}
	var cityData = new Array();
	for (var i = 0; i < data.city.length; i++){
		var temp = new Object();
		temp.name = data.city[i].cityName;
		temp.value = data.city[i].total;
		cityData.push(temp);
	}
	 var seriesData = [
                {name: '企业排名',
                    type: 'map',
                    mapType: cityName,
                    data:cityData,
                    markPoint: {
                        data: data.data
                    },
                    geoCoord: data.geoCoord
                } 
                ];
	// }
	
	var myChart = echarts.init(document.getElementById('mapChart'));
	  myChart.setOption(option,true);
      myChart.setSeries(seriesData);
	myChart.refresh();
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
 *  格式化 
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatNumber(val,row,index){
		return '<font color="green">'+parseFloat(val).toFixed(2)+'</font>';
}