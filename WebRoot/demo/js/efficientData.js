/**
 * Created by se7en on 2016/2/4.
 */

$(document).ready(function () {
    var width = document.documentElement.clientWidth - 20;
    var height = document.documentElement.clientHeight - 20;
    $('#main').css('width', width);
    $('#main').css('height', height);


    var data1 = [];
    var data2 = [];
    var data3 = [];
    var data4 = [];
    var data5 = [];
    var data6 = [];
    var data7 = [];
    var data8 = [];
    var data9 = [];
    var data10 = [];
    var data11 = [];
    var data12 = [];

    var random = function (max) {
        return (Math.random() * max).toFixed(3);
    }

    for (var i = 0; i < 12; i++) {
        data1.push(random(2));
        data2.push(random(2));
        data3.push(random(2));
        data4.push(random(2));
        data5.push(random(2));
        data6.push(random(2));
        data7.push(random(2));
        data8.push(random(2));
        data9.push(random(2));
        data10.push(random(2));
        data11.push(random(2));
        data12.push(random(2));
    }

    var option = {
        title: {
            text: '数据有效率'
        },
        legend: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                show: true,
                type: 'cross',
                lineStyle: {
                    type: 'dashed',
                    width: 1
                }
            }
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        xAxis: {
            type: 'category',
            data: ['呼和浩特', '包头', '通辽', '赤峰', '锡林郭勒', '乌兰察布', '鄂尔多斯', '巴彦淖尔', '乌海', '阿拉善', '呼伦贝尔', '兴安盟']
        },
        yAxis: {
            type: 'value',
        },
        series: [{
            name: '1月',
            type: 'scatter',
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data1,
            markLine: {
                data: [{
                    name: '平均线',
                    type: 'average'
                }]
            }
        }, {
            name: '2月',
            type: 'scatter',
            symbolOffset: ['-300 %', '-250 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data2
        }, {
            name: '3月',
            type: 'scatter',
            symbolOffset: ['-200 %', '-250 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data3
        }, {
            name: '4月',
            type: 'scatter',
            symbolOffset: ['-140 %', '-150 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data4
        }, {
            name: '5月',
            type: 'scatter',
            symbolOffset: ['-100 %', '130 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data5
        }, {
            name: '6月',
            type: 'scatter',
            symbolOffset: ['-200 %', '-150 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data6
        }, {
            name: '7月',
            type: 'scatter',
            symbolOffset: ['-100 %', '-150 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data7
        }, {
            name: '8月',
            type: 'scatter',
            symbolOffset: ['-150 %', '-120 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data8
        }, {
            name: '9月',
            type: 'scatter',
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data9
        }, {
            name: '10月',
            type: 'scatter',
            symbolOffset: ['-120 %', '120 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data10
        }, {
            name: '11月',
            type: 'scatter',
            symbolOffset: ['-100 %', '120 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data11
        }, {
            name: '12月',
            type: 'scatter',
            symbolOffset: ['-150 %', '150 %'],
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br/>'
                        + '地区:' + params.name + '<br/>' +
                        '数据有效率: ' + params.value[2];
                },
                axisPointer: {
                    show: true
                }
            },
            symbolSize: 8,
            data: data12
        }
        ]
    };
    var chart = echarts.init(document.getElementById('main'));
    chart.setOption(option);
    chart.on('click', function (param) {
        alert(param.name);
    });
});

