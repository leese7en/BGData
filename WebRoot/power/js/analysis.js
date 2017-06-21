/**
 * Created by se7en on 2016/2/4.
 */

var analysisType = 1;
$(document).ready(
		function() {
			$('.help-tip').find('p').html(
					'通过对电力企业污染排放指标和能源资源消耗指标进行年度统计分析，筛选出高能耗、高污染的企业。污染物排放指标包括：排放强度及排放绩效；能源资源消耗指标主要包括：煤炭消耗绩效和水消耗绩效。')
			var year = '2014';
			$('#queryYear').combobox('setValue', year);
			$('#queryAreaDetailYear').combobox('setValue', year);
			$('#pollutionKind').combobox('setValue', 'SO2')

			var yearArray = formatYear(2011);
			$('#queryYear').combobox( {
				valueField : 'value',
				textField : 'text',
				data : yearArray,
				editable : false
			});
			var data = $('#queryYear').combobox('getData');
			$("#queryYear ").combobox('select', data[0].value);

			$('#queryCountryPowerYear').combobox( {
				valueField : 'value',
				textField : 'text',
				data : yearArray,
				editable : false
			});
			var data1 = $('#queryCountryPowerYear').combobox('getData');
			$("#queryCountryPowerYear ").combobox('select', data1[0].value);

			$('#queryAreaDetailYear').combobox( {
				valueField : 'value',
				textField : 'text',
				data : yearArray,
				editable : false
			});
			var data2 = $('#queryAreaDetailYear').combobox('getData');
			$("#queryAreaDetailYear ").combobox('select', data2[0].value);

			/**
			 * 默认查询2014年的数据
			 * @memberOf {TypeName} 
			 */
			queryEmphasis(year);
			getRanking(year);
			$('#queryCountryPowerYear').combobox('setValue', year);
			queryCity();
			initEmissionEffectiveTable();
			setAreaDetail();
		});
/**
 * 当双机消耗绩效和排放绩效列表时触发事件
 */
function initEmissionEffectiveTable() {
	$('#coalConsumtion').datagrid( {
		onDblClickRow : function(rowIndex, rowData) { // 双击时触发事件
				$(this).datagrid("selectRow", rowIndex); // 根据索引选中该行
				showCityEnterprise(rowData);
			}
		});
	$('#waterConsumtion').datagrid( {
		onDblClickRow : function(rowIndex, rowData) { // 双击时触发事件
				$(this).datagrid("selectRow", rowIndex); // 根据索引选中该行
				showCityEnterprise(rowData);
			}
		});
	$('#emissionIntensity').datagrid( {
		onDblClickRow : function(rowIndex, rowData) { // 双击时触发事件
				$(this).datagrid("selectRow", rowIndex); // 根据索引选中该行
				showCityEnterprise(rowData);
			}
		});
	$('#emissionPerformance').datagrid( {
		onDblClickRow : function(rowIndex, rowData) { // 双击时触发事件
				$(this).datagrid("selectRow", rowIndex); // 根据索引选中该行
				showCityEnterprise(rowData);
			}
		});
}
/**
 * 显示盟市下面所属企业的年度消耗信息和排放信息
 * 
 * @param {Object}
 *            data
 */
function showCityEnterprise(data) {
	var year = $("#queryCountryPowerYear").combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getCitygEnterpriseByYear',
		data : {
			year : year,
			cityId : data.cityId
		},
		dataType : 'json',
		success : function(data) {
			$('#cityEnterpriseInfo').datagrid('loadData', data);
		},
		error : function() {
		}
	});
	$('#cityEnterprise').show();
	$('#cityEnterprise').dialog( {
		title : '盟市明细信息',
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 500,
		width : 900,
		top : 20
	});
}

var serverData = new Object();
var serData = new Object();
var bothData = new Array();

var energyData = [ {
	name : '红1',
	value : 1,
	symbol : 'image://../images/red.png'
}, {
	name : '红2',
	value : 2,
	symbol : 'image://../images/red.png'
}, {
	name : '红3',
	value : 3,
	symbol : 'image://../images/red.png'
}, {
	name : '红4',
	value : 4,
	symbol : 'image://../images/red.png'
}, {
	name : '红5',
	value : 5,
	symbol : 'image://../images/red.png'
}, {
	name : '红6',
	value : 6,
	symbol : 'image://../images/red.png'
}, {
	name : '红7',
	value : 7,
	symbol : 'image://../images/red.png'
}, {
	name : '红8',
	value : 8,
	symbol : 'image://../images/red.png'
}, {
	name : '红9',
	value : 9,
	symbol : 'image://../images/red.png'
}, {
	name : '红10',
	value : 10,
	symbol : 'image://../images/red.png'
} ];
var energyGeo= {
                        '红1': [-1, -1],
                        '红2': [-1, -1],
                        '红3': [-1, -1],
                        '红4': [-1, -1],
                        '红5': [-1, -1],
                        '红6': [-1, -1],
                        '红7': [-1, -1],
                        '红8': [-1, -1],
                        '红9': [-1, -1],
                        '红10': [-1, -1],
                    };

var emissionData =[
               	{name: '黑1', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑2', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑3', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑4', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑5', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑6', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑7', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑8', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑9', value: 350, symbol: 'image://../images/black.png'},
                {name: '黑10', value: 350, symbol: 'image://../images/black.png'},

                        ];
var emissionGeo={
                        '黑1': [-1, -1],
                        '黑2': [-1, -1],
                        '黑3': [-1, -1],
                        '黑4': [-1, -1],
                        '黑5': [-1, -1],
                        '黑6': [-1, -1],
                        '黑7': [-1, -1],
                        '黑8': [-1, -1],
                        '黑9': [-1, -1],
                        '黑10': [-1, -1],
                    };

var energyEData=[
                {name: '红黑1', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑2', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑3', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑4', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑5', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑6', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑7', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑8', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑9', value: 350, symbol: 'image://../images/redblack.png'},
                {name: '红黑10', value: 350, symbol: 'image://../images/redblack.png'}

            ];
var energyEGeo={
                '红黑1': [-1, -1],
                '红黑2': [-1, -1],
                '红黑3': [-1, -1],
                '红黑4': [-1, -1],
                '红黑5': [-1, -1],
                '红黑6': [-1, -1],
                '红黑7': [-1, -1],
                '红黑8': [-1, -1],
                '红黑9': [-1, -1],
                '红黑10': [-1, -1],
                    };


var option= {
			title:{
				text:'重点企业分布一览',
				x:'center',
				bottom:-30,
				y:'bottom'
			},
        	legend: {
            itemWidth: 20,
            itemHeight: 20,
            x:'20',
          	y:'20',
          	data: [],    
            },
            series: [
                {
                    name: '最高排放绩效企业',
                    type: 'map',
                    mapType: '内蒙古',
                    hoverable:false,
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
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
                    data: [],
                    markPoint: {
                    	itemStyle: {
	                 	   normal: {
			                        color: 'black',
			                        label: {
			                            show: false
			                        }
			                    },
		                    emphasis:{
		                    	color: 'black',
                             label: {
                                 show: true,
                                 formatter : function (params) {
                                for (var i=0; i < serverData.length; i++){
                                    if (serverData[i].pSName == params.name) {                        
                                    return params.name + '\n' + serverData[i].pSCode// + '\n' + params.value;
                                    }
                                }
                             },
                             textStyle: {
                             	color: 'red',
                                align:'right'
                         	}
                             }
                         }
		                },
                        data: energyData
                    },
                    geoCoord: energyGeo
                },
                {
                    name: '最高耗能企业',
                    type: 'map',
                    mapType: '内蒙古',
                    hoverable:false,
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
                    data: [],
                    markPoint: {
                    	itemStyle: {
                 	   normal: {
		                        color: 'black',
		                        label: {
		                            show: false
		                        }
		                    },
		                    emphasis:{
		                    	color: 'black',
                             label: {
                                 show: true,
                                 formatter : function (params) {
                                for (var i=0; i < serData.length; i++){
                                    if (serData[i].pSName == params.name) {                        
                                    return params.name + '\n' + serData[i].pSCode// + '\n' + params.value;
                                    }
                                }
                             },
                             textStyle: {
                              	color: 'red',
                                align:'right'
                            	}
                             }
                         }
		                },
                        data: emissionData
                    },
                    geoCoord: emissionGeo
                },
                {
                    name: '最高排放绩效+最高耗能企业',
                    type: 'map',
                    mapType: '内蒙古',
                    hoverable:false,
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
                    data: [],
                    markPoint: {
                        itemStyle: {
                    	   normal: {
		                        color: 'black',
		                        label: {
		                            show: false
		                        }
		                    },
		                    emphasis:{
		                    	color: 'black',
                                label: {
                                    show: true,
                                    formatter : function (params) {
                                   for (var i=0; i < bothData.length; i++){
                                       if (bothData[i].pSName == params.name) {                        
                                       return params.name + '\n' + bothData[i].pSCode// + '\n' + params.value;
                                       }
                                   }
                                },
                                textStyle: {
                                 	color: 'red',
                                    align:'right'

                             	}
                                }
                            }
		                },
                        data: energyEData
                    },
                    geoCoord: energyEGeo
                }
            ]
        };

/**
 * 散点图数据
 * @return
 */
function queryEmphasis(year) {
	if(!year){
		year = $('#queryYear').combobox('getValue');
	}
    if (!checkYear(year)){
        return
    }
	var consumeType = $('#consumeType').combobox('getValue');
	var pollType = $('#pollTypeEmphasis').combobox('getValue');
	$.ajax( {
		type : 'post',
		url : '../getAnalysisForAnalysis',
		dataType : 'json',
		data:{
		   year:year,
		   consumeType:consumeType,
		   pollType:pollType
	    },
		success : function(value) {
	    	var flag = value.flag;
	    	if(flag<0){
	    		$.messager.alert('信息',value.message,'info');
	    		return;
	    	}
	    	var data=value.data;
            for (var i = 0; i < data.dataEmission.length; i++){
                data.dataEmission[i].percent = data.dataEmission[i].generateElectricityAmount / data.dataEmission[i].sumElectricity;
                data.dataEmission[i].sumElectricity = data.dataEmission[i].sumElectricity.toFixed(2);
                data.dataEmission[i].percent = (data.dataEmission[i].percent * 100).toFixed(7);
            }
            for (var i = 0; i < data.dataConsume.length; i++){
                data.dataConsume[i].percent = data.dataConsume[i].generateElectricityAmount / data.dataConsume[i].sumElectricity;
                data.dataConsume[i].sumElectricity = data.dataConsume[i].sumElectricity.toFixed(2);
                data.dataConsume[i].percent = (data.dataConsume[i].percent * 100).toFixed(7) ;
            }
			$('#emissionRanking').datagrid('loadData', data.dataEmission);
			$('#consumeRanking').datagrid('loadData', data.dataConsume);
            serverData = data.dataEmission;
            serData = data.dataConsume;
            for (var indx = 0; indx < serverData.length; indx++){
                for (var j = 0; j < serData.length; j++){
                    if (serverData[indx].pSCode == serData[j].pSCode){
                        bothData.push(serverData[indx]);
                    }
                }
            }
            var bothNum = bothData.length;
            var myChart = echarts.init(document.getElementById('main'));           
            var legendData=[];
            var seriesData =[];
            	 legendData = [{
                      		 name: '最高排放绩效企业',
             			    icon: 'image://../images/red.png',
             			}, {
             			    name: '最高耗能企业',
             			    icon: 'image://../images/black.png',
             			}, {
             			    name: '最高排放绩效+最高耗能企业' + '(' + bothNum + '个)',
             			    icon: 'image://../images/redblack.png',
                    	} ];
            	 seriesData = [
								{name: '最高排放绩效企业',
								    type: 'map',
								    markPoint: {
								        data: data.emissionData
								    },
								    geoCoord: data.energyGeoCoord
								},
								{name: '最高耗能企业',
								    type: 'map',
								    markPoint: {
								        data: data.energyData
								    },
								    geoCoord: data.emissionGeoCoord
								},
								{name: '最高排放绩效+最高耗能企业' + '(' + bothNum + '个)',
								    type: 'map',
								    markPoint: {
								        data: data.energyEData
								    },
								    geoCoord: data.energyEGeoCoord
								} ];
    		
            
			 var myChart = echarts.init(document.getElementById('main'));
           // 使用刚指定的配置项和数据显示图表。
			option.legend.data = legendData;
	        myChart.setOption(option);
            myChart.setSeries(seriesData);
		    myChart.refresh();
		},
		error : function() {
			$.messager.error('错误', '获取数据失败！', 'error');
		}
	});
}

/**
 * 获取数据
 * 
 * @return
 */
function getRanking(year) {
	if(!year){
	 year = $('#queryCountryPowerYear').combobox('getValue');
	}
    if (!checkYear(year)){
        return
    }
	$.ajax( {
		type : 'post',
		url : '../getRankingByYear',
		data : {
			year : year
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if(flag>=0){
			var coalEffective_data = sort(data.data,'coalEffective');//根据煤消耗排序
			$('#coalConsumtion').datagrid('loadData', coalEffective_data);
			var array = new Array();
			array = coalEffective_data.concat();
			var waterEffective_data = sort(array,'waterEffective');//根据水消耗排序
			var array = new Array();
			array = waterEffective_data.concat();
			$('#waterConsumtion').datagrid('loadData', waterEffective_data);
			var so2Concentration_data = sort(array,'so2Concentration');//根据so2排放强度排序
			var array = new Array();
			array = so2Concentration_data.concat();
			$('#emissionIntensity').datagrid('loadData', so2Concentration_data);
			var so2Effective_data = sort(array,'so2Effective');//根据so2排放绩效排序
			var array = new Array();
			array = so2Effective_data.concat();
			$('#emissionPerformance').datagrid('loadData', so2Effective_data);
			}else{
				$.messager.alert('信息',data.message,'info');
			}
		},
		error : function() {
			$.messager.alert('信息', '获取数据失败！', '提示信息');
		}
	});
}
//对数组进行排序
function sort(data,column){
	var array = new Array();
	var t = data.length;
	for(var i=0;i<t;i++){
		var index = findMax(data,column);
		array.push(data[index]);
		data.splice(index,1);
	}
	return array;
}

//desc排序
function findMax(data,column){
	var max = data[0].coalEffective;;//最大值
		if(column == 'coalEffective'){
		   max = data[0].coalEffective;
		}else if(column == 'waterEffective'){
			max = data[0].waterEffective;
		}else if(column == 'so2Concentration'){
			max = data[0].so2Concentration;
		}else if(column == 'so2Effective'){
			max = data[0].so2Effective;
		}
	var index = 0;
	for(var i=0;i<data.length;i++){
		var value;
		if(column == 'coalEffective'){
		   value = data[i].coalEffective;
		}else if(column == 'waterEffective'){
			value = data[i].waterEffective;
		}else if(column == 'so2Concentration'){
			value = data[i].so2Concentration;
		}else if(column == 'so2Effective'){
			value = data[i].so2Effective;
		}
		if(value > max){
			max = value;
			index = i;
		}
	}
	return index;
}
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
			value.unshift(o);
			$('#queryAreaDetailCity').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value
			});
			$('#queryAreaDetailCity').combobox('setValue', '1501');
            getDetail();
		},
		error : function() {

		}
	});
}

/**
 * 地图信息
 * @param data
 * @return
 */
function setData(data) {
    var width = document.documentElement.clientWidth - 80;
    var height = document.documentElement.clientHeight - 80;
    var city = $('#queryAreaDetailCity').combobox('getText');
    $('#mainArea').css('width', width);
    $('#mainArea').css('height', height);
    var option
= {
        tooltip: {
            trigger: 'axis',
            showDelay: 0,
            formatter : function (params) {
	    	var result ='';
	    	if(analysisType==1){
	                result= params.value[3] + '<br/>排放绩效:' + params.value[0].toFixed(2)+ 'g/kWh<br/>排放强度:' + params.value[1].toFixed(2)+'kg/万元<br/>装机容量(万千瓦):'+params.value[2];
	        }else{
	                result= params.value[3] + '<br/>煤消耗:' + params.value[0].toFixed(2) + 'g/kWh<br/>新鲜水消耗绩效:' +params.value[1].toFixed(2)+'kg/kWh<br/>装机容量(万千瓦):'+params.value[2];
	        }    
    	return result;
    	},
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1 
                }
            }
        },
        legend: {
            orient : 'horizontal',
            x:'center',
            y:'top',
            data:[city]
        },
        toolbox: {
            show: true,
            feature: {
        		mark : {
				show : false,
			},
			dataView : {
				show : false,
				readOnly : false,
				icon : 'image://../images/echartstoolbox/data.png',
			},
			restore : {
				show : false,
				icon : 'image://../images/echartstoolbox/refresh.png'
			},
                saveAsImage: {
                    show: true,
                    name:"区域内明细",
                    icon : 'image://../images/echartstoolbox/save.png'
                }
            }
        },
        xAxis: 
        	[ {
		type : 'value',
		 name: data.xAxis,
		scale : true
	}],
        yAxis: 
            	[ {
		type : 'value',
		 name: data.yAxis,
		scale : true
	}],
        series: [
            {
                name: city,
                type: 'scatter',
                data:data.data,
                symbolSize: function (value){
	            	if(value[2]/8<5){
	            		return 5;
	            	}
	                    return value[2]/8 + 1;
                },
                markLine:
                {data : 
                    [
                     {type : 'average', name: '平均值'},
                     {type : 'average', valueIndex:0, name: '平均值'}
                    ]
                }              
            }
        ],
    };
    var myChart = echarts.init(document.getElementById('mainArea'));
    myChart.setOption(option);
}

/**
 * 获取某盟市下面的电厂信息
 * @return {TypeName} 
 */
function getDetail(){
    var year = $("#queryAreaDetailYear").combobox('getValue');
    if (!checkYear(year)){
        return
    }
    var cityId = $('#queryAreaDetailCity').combobox('getValue');
    var analysisType = $('#queryAreaDetailType').combobox('getValue');
	var pollType = $("#pollutionKind").combobox('getValue');
	var result;
	if(year =="select"){
        $.messager.alert('信息','请选择年份', '提示信息');
        return;
	}
    if (pollType == 'select'){       
        $.messager.alert('信息','请选择污染物', '提示信息');
        return;
    }
	$.ajax( {
		type : 'post',
		url : '../getRankingEnterpriseByYear',
		dataType : 'json',
		async:false,
		data:{
		   year:year,
		   cityId:cityId,
		   analysisType:analysisType,
		   pollType:pollType
	    },
		success : function(data) {
	    	var flag= data.flag;
	    	if(flag<0){
	    		$.messager.alert('信息',data.message,'info');
	    	}else
	    		{
    		setData(data.data);
    		}
		},
		error : function() {
			$.messager.alert('信息', '获取数据失败！', '提示信息');
		}
	});
   
}


/**
 * 区域内明细，当选择消耗分析，污染物置为不可选。坐标轴加箭头，坐标轴加单位。
 * 
 * @return
 */
function setAreaDetail(){
	var data= [{text : "排放分析", value : "1"},
               {text : "消耗分析", value : "2"}];
	$('#queryAreaDetailType').combobox({
		data:data,
		onLoadSuccess:function(){
		var data = $('#queryAreaDetailType').combobox('getData');
		$("#queryAreaDetailType ").combobox('select',data[0].value);
		},
		onChange: function (newValue, oldValue) {
		if(newValue=="2"){	
			analysisType =2;
			$('#pollutionKind').combobox("disable");
        }else{
        	analysisType =1;
        	$('#pollutionKind').combobox("enable");
        }
		}
		});
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
