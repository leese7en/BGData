/**
 * Created by se7en on 2016/2/4.
 */


$(document).ready(function () {
    var width = document.documentElement.clientWidth - 20;
    var height = document.documentElement.clientHeight - 20;
    $('#main').css('width', width / 2);
    $('#main').css('height', height);

    $('#main1').css('width', width / 2);
    $('#main1').css('height', height);

    var option = {
        title: {
            text: '自动监控检查结果分析 全区',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            left: 'center',
            bottom: 20,
            data: ['设备问题', '管理问题', '数据问题']
        },
        series: [
            {
                name: '全区',
                type: 'pie',
                radius: '55%',
                center: ['50%', '40%'],
                data: [
                    {value: 123, name: '设备问题'},
                    {value: 310, name: '管理问题'},
                    {value: 150, name: '数据问题'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    var myChart = echarts.init(document.getElementById('main'));
    myChart.setOption(option, true);

    var option1 = {
        title: {
            text: '自动监控检查结果分析 设备问题',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            left: 'center',
            bottom: 20,
            data: ['A集团', 'B集团', 'C集团', 'D集团', 'E集团', 'F集团', 'G集团', 'H集团']
        },
        series: [
            {
                name: '设备问题',
                type: 'pie',
                radius: '55%',
                center: ['50%', '40%'],
                data: [
                    {value: 123, name: 'A集团'},
                    {value: 310, name: 'B集团'},
                    {value: 150, name: 'C集团'},
                    {value: 244, name: 'D集团'},
                    {value: 23, name: 'E集团'},
                    {value: 76, name: 'F集团'},
                    {value: 99, name: 'G集团'},
                    {value: 234, name: 'H集团'}
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    var myChart1 = echarts.init(document.getElementById('main1'));
    myChart1.setOption(option1, true);

    myChart.on('click', function (param) {
        option1.title.text = param.name;
        var seriesData = [];
        if (param.name == '设备问题') {
            seriesData = [{value: 234, name: 'A集团'},
                {value: 123, name: 'B集团'},
                {value: 43, name: 'C集团'},
                {value: 78, name: 'D集团'},
                {value: 90, name: 'E集团'},
                {value: 67, name: 'F集团'},
                {value: 145, name: 'G集团'},
                {value: 87, name: 'H集团'}];
        }
        else if (param.name == '数据问题') {
            seriesData = [{value: 45, name: 'A集团'},
                {value: 56, name: 'B集团'},
                {value: 34, name: 'C集团'},
                {value: 234, name: 'D集团'},
                {value: 76, name: 'E集团'},
                {value: 98, name: 'F集团'},
                {value: 67, name: 'G集团'},
                {value: 32, name: 'H集团'}];
        } else {
            seriesData = [{value: 123, name: 'A集团'},
                {value: 213, name: 'B集团'},
                {value: 150, name: 'C集团'},
                {value: 34, name: 'D集团'},
                {value: 56, name: 'E集团'},
                {value: 123, name: 'F集团'},
                {value: 23, name: 'G集团'},
                {value: 190, name: 'H集团'}];
        }
        option1.series[0].data=seriesData;

        myChart1.setOption(option1);
    });
});