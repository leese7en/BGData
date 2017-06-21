/**
 * Created by se7en on 2016/2/4.
 */


$(document).ready(function() {
    // var year = $('#selectYear').combobox('getValue');
    //分析维度
    var xname = ['呼和浩特市', '包头市', '通辽市', '赤峰市', '锡林郭勒盟', '乌兰察布市', '鄂尔多斯市', '巴彦淖尔市', '乌海市', '阿拉善盟', '呼伦贝尔', '兴安盟'];
    //todo getdata
    var data = {
        pollutionName:'SO2',
        dataSO2: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        dataPower: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        dataPollution: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 12, 23.0, 16.5, 12.0, 6.2]
    };
    setData(xname, data);
});

function setData(xname, data) {
    var width = document.documentElement.clientWidth - 20;
    var height = document.documentElement.clientHeight - 20;
    $('#main').css('width', width);
    $('#main').css('height', height);
    option = {
        tooltip: {
            trigger: 'axis'
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
                    type: ['line', 'bar']
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
        legend: {
            y: '20',
            data: [data.pollutionName + '排放量(t)', '发电量(百万kwh)', data.pollutionName + '排放绩效值']
        },
        xAxis: [{
            type: 'category',
            data: xname,
            axisLabel:{
                rotate:45
            }
        }],
        yAxis: [{
            type: 'value',
            // axisLabel : {
            // formatter: '{value} t'
            // }
        }, {
            type: 'value',
            name: '排放绩效',
            // axisLabel : {
            // formatter: '{value} 百万kwh'
            // }
        }],
        series: [

            {
                name: data.pollutionName + '排放量(t)',
                type: 'bar',
                data: data.dataSO2
            }, {
                name: '发电量(百万kwh)',
                type: 'bar',
                data: data.dataPower
            }, {
                name: data.pollutionName + '排放绩效值',
                type: 'line',
                yAxisIndex: 1,
                data: data.dataPollution
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(option);
}

function queryData() {
    //getYear
    // var year = $('#selectYear').combobox('getValue');
    //分析维度
    var xname = ['呼和浩特市', '包头市', '通辽市', '赤峰市', '锡林郭勒盟', '乌兰察布市', '鄂尔多斯市', '巴彦淖尔市', '乌海市', '阿拉善盟', '呼伦贝尔', '兴安盟'];
    var data = {
        pollutionName:'SO2',
        dataSO2: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
        dataPower: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
        dataPollution: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 12, 23.0, 16.5, 12.0, 6.2]
    };
    var view = $("#viewPoint").combobox('getValue');
    var pollutionName = $('#pollutionKind').combobox('getValue');
    if (view === "city") {
        xname = ['呼和浩特市', '包头市', '通辽市', '赤峰市', '锡林郭勒盟', '乌兰察布市', '鄂尔多斯市', '巴彦淖尔市', '乌海市', '阿拉善盟', '呼伦贝尔', '兴安盟'];
        data = {
            pollutionName:pollutionName,
            dataSO2: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            dataPower: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            dataPollution: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 12, 23.0, 16.5, 12.0, 6.2]
        };
    } else if (view === "industry") {
        xname = ['大唐集团', '国电集团', '华电集团', '中电投集团', '华能集团', '蒙能集团', '神华集团', '鄂尔多斯电力', '京能集团', '希铝集团', '京煤集团', '华润集团', '源源集团'];
        data = {
            pollutionName:pollutionName,
            dataSO2: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3, 47.5],
            dataPower: [11.0, 43.9, 71.0, 2.2, 2.6, 6.7, 15.6, 16.2, 42.6, 24.0, 16.4, 22.3, 41.5],
            dataPollution: [7.0, 14.9, 17.0, 23.2, 15.6, 46.7, 35.6, 62.2, 42.6, 10.0, 2.4, 13.3, 31.5]
        };
    }
    setData(xname, data);
}