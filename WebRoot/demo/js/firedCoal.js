/**
 * Created by se7en on 2016/2/4.
 */


$(document).ready(function() {
    var width = document.documentElement.clientWidth - 20;
    var height = document.documentElement.clientHeight - 20;
    $('#main').css('width', width);
    $('#main').css('height', height);
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            y: 30,
            data: ['2013', '2014', '2015']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar', 'stack', 'tiled']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '2013',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210, 120, 160, 250, 130, 160]
        }, {
            name: '2014',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310, 102, 150, 162, 30, 50]
        }, {
            name: '2015',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410, 150, 45, 62, 162, 75]
        }]
    };
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(option);

});

//handle city
$(function() {
    var width = document.documentElement.clientWidth - 20;
    var height = document.documentElement.clientHeight - 20;
    $('#main1').css('width', width);
    $('#main1').css('height', height);
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            y:30,
            show:false,
            data: ['盟市']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar', 'stack', 'tiled']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel:{
                rotate:45
            },
            data: ['呼和浩特市', '包头市', '通辽市', '赤峰市', '锡林郭勒盟', '乌兰察布市', '鄂尔多斯市', '巴彦淖尔市', '乌海市', '阿拉善盟', '呼伦贝尔', '兴安盟']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '盟市',
            type: 'line',
            stack: '总量',
            data: [0.98, 1.43, 0.64, 1.22, 1.00, 0.59, 0.78, 1.2, 1.6, 1.12, 0.87, 0.57]
        }]
    };
    var myChart1 = echarts.init(document.getElementById('main1'));
    myChart1.setOption(option);
});

//handle industry
$(function() {
    var width = document.documentElement.clientWidth - 20;
    var height = document.documentElement.clientHeight - 20;
    $('#main2').css('width', width);
    $('#main2').css('height', height);
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            y:30,
            show:false,
            data: ['集团']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {
                    show: true
                },
                dataView: {
                    show: true,
                    readOnly: false
                },
                magicType: {
                    show: true,
                    type: ['line', 'bar', 'stack', 'tiled']
                },
                restore: {
                    show: true
                },
                saveAsImage: {
                    show: true
                }
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLabel:{
                rotate:45
            },
            data: ['大唐集团', '国电集团', '华电集团', '中电投集团', '华能集团', '蒙能集团', '神华集团', '鄂尔多斯电力', '京能集团', '希铝集团', '京煤集团', '华润集团', '源源集团']
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '集团',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210, 120, 160, 250, 130, 160, 177]
        }]
    };
    var myChart2 = echarts.init(document.getElementById('main2'));
    myChart2.setOption(option);
});

function queryCity(){
    var year = $('#cityQuery').combobox('getValue');
   //get year data 
   //var data = getData(year);
   //setSData(data);
}

function queryIndustry(){
    var year = $('#industryQuery').combobox('getValue');
    //get industry year data
    //var data = getData();
    //setData();
}