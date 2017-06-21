/**
 * Created by se7en on 2016/2/4.
 */
function random() {
	var r = Math.random();
	return r.toFixed(2);
}

function randomDataArray() {
	var d = [];
	var len = 1;
	while (len--) {
		d.push( [ random(), random(), Math.abs(random()), '电厂' + len ]);
	}
	return d;
}

var markLineOpt = {
	animation : false,

	lineStyle : {
		normal : {
			type : 'solid'
		}
	},
	tooltip : {
		formatter : '平均值'
	},
	data : [ [ {
		coord : [ 0, 0.8 ],
		symbol : 'none'
	}, {
		coord : [ 1, 0.8 ],
		symbol : 'none'
	} ], [ {
		coord : [ 0.8, 0 ],
		symbol : 'none'
	}, {
		coord : [ 0.8, 1 ],
		symbol : 'none'
	} ] ]
};

$(document).ready(function() {
	getDetail();
});

function setData(xname, yname,data) {
	var width = document.documentElement.clientWidth - 80;
	var height = document.documentElement.clientHeight - 80;
	$('#mainArea').css('width', width);
	$('#mainArea').css('height', height);
	var option
= {
        tooltip: {
            trigger: 'axis',
            showDelay: 0,
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
            data: [data[0].pSName, data[1].pSName, data[2].pSName, data[3].pSName, data[4].pSName, data[5].pSName, data[6].pSName, data[7].pSName]
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataZoom: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        xAxis: [
            {
                type: 'value',
                name: xname,//'SO2排放绩效值(g/kWh)',
                splitNumber: 4,
                scale: true
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: yname,//'SO2排放强度(g/万元)',
                splitNumber: 4,
                scale: true
            }
        ],
        series: [
            {
                name: data[0].pSName,
                type: 'scatter',
                symbolSize: function (value) {
            	var pollutionKind = $("#pollutionKind").combobox('getValue');
            	 if (pollutionKind === "NOx"){
                	return data[0].nOxEffective;
                }else if(pollutionKind === "粉尘"){
                	return data[0].dustEffective;
                }else{
                	return data[0].sO2Effective;
                }
                },
                data: dataArray(0),
                markLine: markLineOpt
            },
            {
                name: data[1].pSName,
                type: 'scatter',
                symbolSize: function (value) {
            	var pollutionKind = $("#pollutionKind").combobox('getValue');
           	 if (pollutionKind === "NOx"){
               	return data[1].nOxEffective;
               }else if(pollutionKind === "粉尘"){
               	return data[1].dustEffective;
               }else{
               	return data[1].sO2Effective;
               }
                },
                data: dataArray(1)
            },
            {
                name: data[2].pSName,
                type: 'scatter',
                symbolSize: function (value) {
            	var pollutionKind = $("#pollutionKind").combobox('getValue');
           	 if (pollutionKind === "NOx"){
               	return data[2].nOxEffective;
               }else if(pollutionKind === "粉尘"){
               	return data[2].dustEffective;
               }else{
               	return data[2].sO2Effective;
               }
                },
                data: dataArray(2)
            },
            {
                name: data[3].pSName,
                type: 'scatter',
                symbolSize: function (value) {
            	var pollutionKind = $("#pollutionKind").combobox('getValue');
           	 if (pollutionKind === "NOx"){
               	return data[3].nOxEffective;
               }else if(pollutionKind === "粉尘"){
               	return data[3].dustEffective;
               }else{
               	return data[3].sO2Effective;
               }
                },
                data: dataArray(3)
            },
            {
                name: data[4].pSName,
                type: 'scatter',
                symbolSize: function (value) {
            	var pollutionKind = $("#pollutionKind").combobox('getValue');
           	 if (pollutionKind === "NOx"){
               	return data[4].nOxEffective;
               }else if(pollutionKind === "粉尘"){
               	return data[4].dustEffective;
               }else{
               	return data[4].sO2Effective;
               }
                },
                data: dataArray(4)
            },
            {
                name: data[5].pSName,
                type: 'scatter',
                symbolSize: function (value) {
            	var pollutionKind = $("#pollutionKind").combobox('getValue');
           	 if (pollutionKind === "NOx"){
               	return data[5].nOxEffective;
               }else if(pollutionKind === "粉尘"){
               	return data[5].dustEffective;
               }else{
               	return data[5].sO2Effective;
               }
                },
                data: dataArray(5)
            },
            {
                name: data[6].pSName,
                type: 'scatter',
                symbolSize: function (value) {
            	var pollutionKind = $("#pollutionKind").combobox('getValue');
           	 if (pollutionKind === "NOx"){
               	return data[6].nOxEffective;
               }else if(pollutionKind === "粉尘"){
               	return data[6].dustEffective;
               }else{
               	return data[6].sO2Effective;
               }
                },
                data: dataArray(6)
            },
            {
                name: data[7].pSName,
                type: 'scatter',
                symbolSize: function (value) {
            	var pollutionKind = $("#pollutionKind").combobox('getValue');
           	 if (pollutionKind === "NOx"){
               	return data[7].nOxEffective;
               }else if(pollutionKind === "粉尘"){
               	return data[7].dustEffective;
               }else{
               	return data[7].sO2Effective;
               }
                },
                data: dataArray(7)
            }
        ],
    };
    var myChart = echarts.init(document.getElementById('mainArea'));
// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

function getDetail(){
    var xy = $("#pollutionKind").combobox('getValue');
    var xname = 'SO2绩效g/kWh';
    var yname = 'SO2排放强度(g/万元)';
    if (xy === "SO2"){
    }else if (xy === "NOx"){
        xname = 'NOx绩效g/kWh';
        yname = 'NOx排放强度(g/万元)';
    }else{
        xname = '粉尘绩效g/kWh';
        yname = '粉尘排放强度(g/万元)';
    }
    var data = getOptionData();
    setData(xname, yname,data);
}


function getOptionData(){
	var year = $("#queryAreaDetailYear").combobox('getValue');
	var pollutionKind = $("#pollutionKind").combobox('getValue');
	var result;
	if(year ==""||year == "select"||year == "请选择"){
		year = 2011;
	}
	if(pollutionKind==""||pollutionKind=="select"||pollutionKind=="请选择"){
		pollutionKind = "SO2";
	}
	$.ajax( {
		type : 'post',
		url : '../getRankingByYear',
		dataType : 'json',
		async:false,
		data:{
		   pageNumber:1,
		   pageSize:8,
		   year:year,
		   pollutionKind:pollutionKind
	    },
		success : function(data) {
	    	result=data.rows;
		},
		error : function() {
			$.messager.alert('error', '获取数据失败！', 'error');
		}
	});
	return result;
}


function dataArray(i){
    var d = [];
    var data = getOptionData();
    var pollutionKind = $("#pollutionKind").combobox('getValue');
    if(pollutionKind==""||pollutionKind=="select"||pollutionKind=="请选择"){
		pollutionKind = "SO2";
	}
    var len = 8;
    while (len--) {
    	 if (pollutionKind === "粉尘"){
    		 d.push( [ data[i].pSName,data[i].installedAmount,data[i].dustAmount, data[i].dustEffective]);
        }else if (pollutionKind === "NOx"){
        	 d.push( [ data[i].pSName,data[i].installedAmount,data[i].nOxAmount, data[i].nOxEffective]);
        }else{
        	 d.push( [ data[i].installedAmount, data[i].sO2Amount, data[i].sO2Effective]);
        }
    }
   return d;
}

