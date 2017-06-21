/**
 * Created by se7en on 2016/2/4.
 */

var timeline = {
    data: ['2011-01-01', '2012-01-01', '2013-01-01', '2014-01-01', '2015-01-01'],
    label: {
        formatter: function (s) {
            return s.slice(0, 4);
        }
    },
    controlPosition: 'right',
    autoPlay: true,
    playInterval: 5000
}

var cityMap = {
    "呼和浩特市": "150100",
    "包头市": "150200",
    "乌海市": "150300",
    "赤峰市": "150400",
    "通辽市": "150500",
    "鄂尔多斯市": "150600",
    "呼伦贝尔市": "150700",
    "巴彦淖尔市": "150800",
    "乌兰察布市": "150900",
    "兴安盟": "152200",
    "锡林郭勒盟": "152500",
    "阿拉善盟": "152900"
};

$(document).ready(function () {
    //var mapGeoData = echarts.require('js/params');

    var width = document.documentElement.clientWidth - 20;
    var height = document.documentElement.clientHeight - 20;
    $('#main').css('width', width - 200);
    $('#main').css('height', height);
    var option = {
        timeline: timeline,
        options: [{
            title: {
                'text': '2011内蒙古环保数据',
                'subtext': '数据来自内蒙古环保局'
            },
            tooltip: {
                'trigger': 'item'
            },
            legend: {
                orient: 'vertical',
                x: 'right',
                data: ['统计数据']
            },
            toolbox: {
                'show': false,
                'feature': {
                    'mark': {
                        'show': true
                    },
                    'dataView': {
                        'show': true,
                        'readOnly': false
                    },
                    'restore': {
                        'show': true
                    },
                    'saveAsImage': {
                        'show': true
                    }
                }
            },
            series: [{
                name: '统计数据',
                type: 'map',
                mapType: '内蒙古',
                tooltip: {
                    show: false
                },
                selectedMode: 'single',
                itemStyle: {
                    normal: {
                        label: {
                            show: true
                        }
                    },
                    emphasis: {
                        label: {
                            show: true
                        }
                    }
                },
                'data': dataMap.dataGDP['2011']
            }, {
                name: '河流',
                type: 'map',
                mapType: '内蒙古',
                data: [],
                markLine: {
                    symbol: ['circle', 'circle'],
                    symbolSize: 1,
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            borderWidth: 1,
                            borderColor: 'lightskyblue',
                            lineStyle: {
                                type: 'solid'
                            }
                        }
                    },
                    data: [[{
                        name: '额2'
                    }, {
                        name: '额3'
                    }], [{
                        name: '额3'
                    }, {
                        name: '额4'
                    }], [{
                        name: '额4'
                    }, {
                        name: '额5'
                    }], [{
                        name: '额5'
                    }, {
                        name: '额6'
                    }], [{
                        name: '额6'
                    }, {
                        name: '额7'
                    }], [{
                        name: '额7'
                    }, {
                        name: '额8'
                    }], [{
                        name: '额8'
                    }, {
                        name: '额9'
                    }], [{
                        name: '额9'
                    }, {
                        name: '额10'
                    }], [{
                        name: '额10'
                    }, {
                        name: '额11'
                    }], [{
                        name: '额11'
                    }, {
                        name: '额12'
                    }]]
                },
                geoCoord: {
                    '额1': [121.45, 50.32],
                    '额2': [120.91, 53.29],
                    '额3': [120.52, 53.04],
                    '额4': [120.03, 52.78],
                    '额5': [120.19, 52.60],
                    '额6': [120.80, 52.55],
                    '额7': [120.72, 52.05],
                    '额8': [120.31, 51.76],
                    '额9': [119.73, 51.05],
                    '额10': [119.20, 50.39],
                    '额11': [119.35, 50.26],
                    '额12': [119.09, 49.99],
                    '额13': [118.44, 45.27]
                }
            }, {
                name: '电网',
                type: 'map',
                mapType: '内蒙古',
                data: [],
                markLine: {
                    symbol: ['circle', 'circle'],
                    symbolSize: 1,
                    itemStyle: {
                        normal: {
                            color: '#fff',
                            borderWidth: 1,
                            borderColor: 'rgba(255,0,0,1)',
                            lineStyle: {
                                type: 'solid'
                            }
                        }
                    },
                    smooth: true,
                    data: [
                        //电网信息
                        [{
                            name: '电1'
                        }, {
                            name: '电3'
                        }], [{
                            name: '电2'
                        }, {
                            name: '电3'
                        }], [{
                            name: '电3'
                        }, {
                            name: '电4'
                        }], [{
                            name: '电4'
                        }, {
                            name: '电5'
                        }], [{
                            name: '电5'
                        }, {
                            name: '电6'
                        }], [{
                            name: '电6'
                        }, {
                            name: '电7'
                        }], [{
                            name: '电7'
                        }, {
                            name: '电8'
                        }], [{
                            name: '电8'
                        }, {
                            name: '电9'
                        }], [{
                            name: '电9'
                        }, {
                            name: '电10'
                        }], [{
                            name: '电11'
                        }, {
                            name: '电10'
                        }], [{
                            name: '电12'
                        }, {
                            name: '电11'
                        }], [{
                            name: '电12'
                        }, {
                            name: '电13'
                        }], [{
                            name: '电14'
                        }, {
                            name: '电13'
                        }], [{
                            name: '电14'
                        }, {
                            name: '电15'
                        }], [{
                            name: '电16'
                        }, {
                            name: '电15'
                        }], [{
                            name: '电17'
                        }, {
                            name: '电16'
                        }], [{
                            name: '电18'
                        }, {
                            name: '电17'
                        }], [{
                            name: '电19'
                        }, {
                            name: '电18'
                        }],]
                },
                geoCoord: {
                    '电1': [118.74, 49.16],
                    '电2': [122.06, 50.37],
                    '电3': [121.35, 48.64],
                    '电4': [121.43, 47.81],
                    '电5': [120.20, 46.90],
                    '电6': [122.69, 46.37],
                    '电7': [119.90, 44.57],
                    '电8': [116.23, 45.05],
                    '电9': [115.99, 43.88],
                    '电10': [122.11, 43.35],
                    '电11': [116.72, 43.20],
                    '电12': [112.20, 42.89],
                    '电13': [111.59, 41.01],
                    '电14': [108.09, 41.69],
                    '电15': [108.88, 39.84],
                    '电16': [104.53, 40.68],
                    '电17': [101.56, 40.36],
                    '电18': [100.62, 41.61],
                    '电19': [99.10, 41.93]
                }
            }, {
                name: '电力',
                type: 'map',
                mapType: '内蒙古',
                hoverable: false,
                roam: true,
                data: [],
                markPoint: {
                    symbolSize: 2, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                    itemStyle: {
                        normal: {
                            borderColor: '#0911EB',
                            borderWidth: 3, // 标注边线线宽，单位px，默认为1
                            label: {
                                show: false
                            }
                        }
                    },
                    data: [{
                        name: '神华宝日希勒能源有限公司二电厂',
                        value: 1500
                    }, {
                        name: '内蒙古大雁矿业集团有限责任公司雁南热电厂',
                        value: 1500
                    }, {
                        name: '呼伦贝尔安泰热电有限责任公司东海拉尔发电厂',
                        value: 1500
                    }, {
                        name: '呼伦贝尔安泰热电有限公司牙克石热电厂',
                        value: 1500
                    }, {
                        name: '呼伦贝尔安泰热电有限责任公司灵泉电厂',
                        value: 1500
                    }, {
                        name: '呼伦贝尔安泰热电有限公司汇流河发电厂',
                        value: 1500
                    }, {
                        name: '呼伦贝尔安泰热电股份有限公司扎兰屯热电厂',
                        value: 1500
                    }, {
                        name: '呼伦贝尔安泰热电有限责任公司海拉尔热电厂',
                        value: 1500
                    }, {
                        name: '呼伦贝尔安泰热电有限责任公司满洲里热电厂',
                        value: 1500
                    }, {
                        name: '扎赉诺尔煤业有限责任公司煤矸石热电厂',
                        value: 1500
                    }, {
                        name: '华能伊敏煤电有限责任公司海拉尔热电厂',
                        value: 1500
                    }, {
                        name: '内蒙古蒙东能源有限公司鄂温克发电厂',
                        value: 1500
                    }, {
                        name: '内蒙古大雁矿业集团有限责任公司雁中热电厂',
                        value: 1500
                    }, {
                        name: '大雁煤业有限责任公司热电总厂雁北热电厂',
                        value: 1500
                    }, {
                        name: '神华宝日希勒能源有限公司一电厂',
                        value: 1500
                    }, {
                        name: '北方联合电力有限责任公司乌拉特发电厂',
                        value: 1500
                    }, {
                        name: '北方联合电力有限责任公司临河热电厂',
                        value: 1500
                    }, {
                        name: '内蒙古蒙电华能热电股份有限公司丰镇发电厂',
                        value: 1500
                    }, {
                        name: '蒙维科技自备电厂',
                        value: 1500
                    }, {
                        name: '乌兰察布市宏大实业有限公司兴和热电厂',
                        value: 1500
                    }, {
                        name: '内蒙古国电能源投资有限公司锡林热电厂',
                        value: 1500
                    }, {
                        name: '锡林浩特第二发电厂',
                        value: 1500
                    }, {
                        name: '内蒙古能源发电投资集团有限公司乌斯太热电厂',
                        value: 1500
                    }

                    ]
                },
                geoCoord: {
                    '神华宝日希勒能源有限公司二电厂': [119.793528, 49.356111],
                    '内蒙古大雁矿业集团有限责任公司雁南热电厂': [120.4, 49.15],
                    '呼伦贝尔安泰热电有限责任公司东海拉尔发电厂': [119.829722, 49.260556],
                    '呼伦贝尔安泰热电有限公司牙克石热电厂': [120.729167, 49.292778],
                    '呼伦贝尔安泰热电有限责任公司灵泉电厂': [117.676667, 49.397222],
                    '呼伦贝尔安泰热电有限公司汇流河发电厂': [120.848611, 49.296667],
                    '呼伦贝尔安泰热电股份有限公司扎兰屯热电厂': [122.750278, 48.001944],
                    '呼伦贝尔安泰热电有限责任公司海拉尔热电厂': [119.733333, 49.233333],
                    '呼伦贝尔安泰热电有限责任公司满洲里热电厂': [117.480833, 49.586389],
                    '扎赉诺尔煤业有限责任公司煤矸石热电厂': [117.696111, 49.483333],
                    '华能伊敏煤电有限责任公司海拉尔热电厂': [119.979444, 49.242222],
                    '内蒙古蒙东能源有限公司鄂温克发电厂': [119.916667, 48.783333],
                    '内蒙古大雁矿业集团有限责任公司雁中热电厂': [120.4, 49.15],
                    '大雁煤业有限责任公司热电总厂雁北热电厂': [120.4, 49.166667],
                    '神华宝日希勒能源有限公司一电厂': [119.793333, 49.356111],
                    '北方联合电力有限责任公司乌拉特发电厂': [108.7675, 40.651111],
                    '北方联合电力有限责任公司临河热电厂': [107.583333, 40.135278],
                    '内蒙古蒙电华能热电股份有限公司丰镇发电厂': [113.083333, 40.4],
                    '蒙维科技自备电厂': [113, 40],
                    '乌兰察布市宏大实业有限公司兴和热电厂': [113.7475, 40.863889],
                    '内蒙古国电能源投资有限公司锡林热电厂': [116.136111, 43.986944],
                    '锡林浩特第二发电厂': [115.5033333, 42.725],
                    '内蒙古能源发电投资集团有限公司乌斯太热电厂': [106.6744443, 39.445278]
                }
            }, {
                name: '煤矿',
                type: 'map',
                mapType: '内蒙古',
                hoverable: false,
                roam: true,
                data: [],
                markPoint: {
                    symbolSize: 2, // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                    itemStyle: {
                        normal: {
                            borderColor: '#ff0000',
                            borderWidth: 3, // 标注边线线宽，单位px，默认为1
                            label: {
                                show: false
                            },
                            areaStyle: {
                                color: '#ff00ff'
                            }
                        }
                    },
                    data: [{
                        name: '华能伊敏煤电有限责任公司',
                        value: 1500
                    }, {
                        name: '扎赉诺尔煤业有限责任公司煤矸石热电厂',
                        value: 1500
                    }, {
                        name: '华能伊敏煤电有限责任公司海拉尔热电厂',
                        value: 1500
                    }, {
                        name: '内蒙古牙克石五九煤炭（集团）有限责任公司',
                        value: 1500
                    }, {
                        name: '扎赉诺尔煤业有限责任公司',
                        value: 1500
                    }, {
                        name: '内蒙古大雁矿业集团有限责任公司雁南煤矿',
                        value: 1500
                    }, {
                        name: '大雁煤业有限责任公司热电总厂雁北热电厂',
                        value: 1500
                    }, {
                        name: '内蒙古磴口金牛煤电有限公司',
                        value: 1500
                    }, {
                        name: '大唐内蒙古多伦煤化工有限责任公司',
                        value: 1500
                    }, {
                        name: '内蒙古平西白音华煤业有限公司',
                        value: 1500
                    }, {
                        name: '内蒙古庆华集团庆华煤化有限责任公司',
                        value: 1500
                    }, {
                        name: '内蒙古太西煤集团兴泰煤化有限责任公司',
                        value: 1500
                    }, {
                        name: '内蒙古庆华集团庆华煤化有限责任公司污水处理厂',
                        value: 1500
                    }, {
                        name: '内蒙古庆华集团腾格里煤化有限公司',
                        value: 1500
                    }

                    ]
                },
                geoCoord: {
                    '华能伊敏煤电有限责任公司': [119.833333, 48.833333],
                    '扎赉诺尔煤业有限责任公司煤矸石热电厂': [117.696111, 49.483333],
                    '华能伊敏煤电有限责任公司海拉尔热电厂': [119.979444, 49.242222],
                    '内蒙古牙克石五九煤炭（集团）有限责任公司': [121.46, 49.501389],
                    '扎赉诺尔煤业有限责任公司': [117.696111, 49.483333],
                    '内蒙古大雁矿业集团有限责任公司雁南煤矿': [120.4, 49.15],
                    '大雁煤业有限责任公司热电总厂雁北热电厂': [120.4, 49.166667],
                    '内蒙古磴口金牛煤电有限公司': [107.003889, 40.383611],
                    '大唐内蒙古多伦煤化工有限责任公司': [116.577778, 42.195833],
                    '内蒙古平西白音华煤业有限公司': [118.420833, 42.195833],
                    '内蒙古庆华集团庆华煤化有限责任公司': [106.722222, 39.535],
                    '内蒙古太西煤集团兴泰煤化有限责任公司': [106.061111, 39.085],
                    '内蒙古庆华集团庆华煤化有限责任公司污水处理厂': [106.716667, 39.533333],
                    '内蒙古庆华集团腾格里煤化有限公司': [105.189722, 38.509722]
                }
            }, {
                name: '湖泊',
                type: 'map',
                mapType: '内蒙古',
                data: [],
                tooltip: {
                    show: false,
                    showContent: false
                },
                itemStyle: {
                    normal: {
                        borderColor: 'rgba(100,149,237,1)',
                        borderWidth: 1.5,
                        areaStyle: {
                            color: '#1b1b1b'
                        }
                    }
                },
                hoverable: false,
                markPoint: {
                    symbolSize: 2,
                    large: true,
                    itemStyle: {
                        normal: {
                            borderColor: '#ff0000',
                            borderWidth: 3, // 标注边线线宽，单位px，默认为1
                            label: {
                                show: false
                            },
                            areaStyle: {
                                color: '#ff00ff'
                            }
                        }
                    },
                    effct: {
                        show: true,
                        shadowColor: '#ff0000'
                    },
                    data: [{
                        name: 'p1',
                        value: ''
                    }, {
                        name: 'p2',
                        value: ''
                    }, {
                        name: 'p3',
                        value: ''
                    }, {
                        name: 'p4',
                        value: ''
                    }, {
                        name: 'p5',
                        value: ''
                    }, {
                        name: 'p6',
                        value: ''
                    }

                    ]
                },
                geoCoord: {
                    'p1': [117.60, 49.27],
                    'p2': [117.70, 49.15],
                    'p3': [117.79, 49.09],
                    'p4': [117.31, 48.60],
                    'p5': [117.91, 48.79],
                    'p6': [117.75, 48.90]
                }
            }]
        }, {
            title: {
                'text': '2008内蒙古环保数据'
            },
            series: [{
                'data': dataMap.dataGDP['2012']
            }]
        }, {
            title: {
                'text': '2009内蒙古环保数据'
            },
            series: [{
                'data': dataMap.dataGDP['2013']
            }]
        }, {
            title: {
                'text': '2010内蒙古环保数据'
            },
            series: [{
                'data': dataMap.dataGDP['2014']
            }]
        }, {
            title: {
                'text': '2011内蒙古环保数据'
            },
            series: [{
                'data': dataMap.dataGDP['2015']
            }]
        }]
    };

    var myChart = echarts.init(document.getElementById('main'));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


    var installedOption = {
        title: {
            text: '装机总量',
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['火电', '风电', '其它']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                'name': '装机量',
                'type': 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#FCCE10', '#E87C25', '#27727B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                'data': dataMap.dataInstalled['2011']
            }
        ]
    };
    var myChartInstalledBar = echarts.init(document.getElementById('installedBar'));

    myChartInstalledBar.setOption(installedOption);


    var powerOption = {
        title: {
            text: '发电量',
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['火电', '风电', '其它']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                'name': '发电量',
                'type': 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#FCCE10', '#E87C25', '#27727B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                'data': dataMap.dataPower['2011']
            }
        ]

    };
    var myChartPowerBar = echarts.init(document.getElementById('powerBar'));
    myChartPowerBar.setOption(powerOption);

    var powerComOption = {
        title: {
            text: '发电量环比增长',
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['内蒙', '全国']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                'name': '发电量',
                'type': 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#FCCE10', '#E87C25', '#27727B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                'data': dataMap.dataPowerCom['2011']
            }
        ]
    };
    var myChartPowerCom = echarts.init(document.getElementById('powerCom'));
    myChartPowerCom.setOption(powerComOption);

    var installedComOption = {
        title: {
            text: '装机量环比增长',
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['内蒙', '全国']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                'name': '装机容量',
                'type': 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#FCCE10', '#E87C25', '#27727B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                'data': dataMap.dataPowerCom['2011']
            }
        ]
    };
    var installedCom = echarts.init(document.getElementById('installedCom'));
    installedCom.setOption(installedComOption);
    var hourComOption = {
        title: {
            text: '有效利用小时',
            x: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        calculable: true,
        grid: {
            borderWidth: 0,
            y: 80,
            y2: 60
        },
        xAxis: [
            {
                type: 'category',
                show: false,
                data: ['内蒙', '全国']
            }
        ],
        yAxis: [
            {
                type: 'value',
                show: false
            }
        ],
        series: [
            {
                'name': '有效利用小时',
                'type': 'bar',
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#FCCE10', '#E87C25', '#27727B'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label: {
                            show: true,
                            position: 'top',
                            formatter: '{b}\n{c}'
                        }
                    }
                },
                'data': dataMap.dataPowerCom['2011']
            }
        ]
    };
    var hourCom = echarts.init(document.getElementById('hourCom'));
    hourCom.setOption(hourComOption);
    myChart.on('timelineChanged', function (target) {
        installedOption.series[0].data = dataMap.dataInstalled[(2011 + target.currentIndex) + ''];
        myChartInstalledBar.setOption(installedOption);
        powerOption.series[0].data = dataMap.dataPower[(2011 + target.currentIndex) + ''];
        myChartPowerBar.setOption(powerOption);

        powerComOption.series[0].data = dataMap.dataPowerCom[2011 + target.currentIndex];
        myChartPowerCom.setOption(powerComOption);

        installedComOption.series[0].data = dataMap.dataPowerCom[2011 + target.currentIndex];
        installedCom.setOption(installedComOption);

        hourComOption.series[0].data = dataMap.dataPowerCom[2011 + target.currentIndex];
        hourCom.setOption(hourComOption);
    });

    /**
     * 监听地区选中
     */
    myChart.on('mapSelected', function (target) {
        showChild(target);
    });
});

/**
 * 显示盟市信息
 * @param target
 */
function showChild(target) {
    $('#child').show();
    $('#child').dialog({
        collapsible: false,
        minimizable: false,
        maximizable: false,
        draggable: true,
        modal: true,
        height: 500,
        width: 800,
        top: 20,
        onOpen: function () {
            initChildInfo(target);
        }
    });
}


function initChildInfo(target) {
    $('#childMap').css('width', 750);
    $('#childMap').css('height', 450);


    var myChart = echarts.init(document.getElementById('childMap'));

    var option = {
        title: {
            text: '全国344个主要城市（县）地图 by Pactera 陈然',
            link: 'http://www.pactera.com/',
            subtext: '北京市 （滚轮或点击切换）'
        },
        tooltip: {
            trigger: 'item',
            formatter: '点击切换<br/>{b}'
        },
        series: [
            {
                name: '全国344个主要城市（县）地图',
                type: 'map',
                mapType: '内蒙古',
                selectedMode: 'single',
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: dataMap.dataGDP['2011']
            }
        ]
    };

    var mt = target.target;
    var len = mapType.length;
    var f = false;
    for (var i = 0; i < len; i++) {
        if (mt == mapType[i]) {
            f = true;
            mt = mapType[i];
        }
    }
    if (!f) {
        mt = '内蒙古';
    }
    option.series[0].mapType = mt;

    option.title.subtext = mt + ' （滚轮或点击切换）';
    myChart.setOption(option, true);

//var option = {
//    series: [
//        {
//            name: 'Map',
//            type: 'map',
//            mapType: '呼和浩特',
//            mapLocation: {
//                x: 'left',
//                y: 'top',
//                height: 500
//            },
//            selectedMode: 'multiple',
//            itemStyle: {
//                normal: {
//                    borderWidth: 2,
//                    borderColor: 'lightgreen',
//                    color: 'orange',
//                    label: {
//                        show: false
//                    }
//                },
//                emphasis: {                 // 也是选中样式
//                    borderWidth: 2,
//                    borderColor: '#fff',
//                    color: '#32cd32',
//                    label: {
//                        show: true,
//                        textStyle: {
//                            color: '#fff'
//                        }
//                    }
//                }
//            },
//            data: [
//                {
//                    name: '广东',
//                    value: Math.round(Math.random() * 1000),
//                    itemStyle: {
//                        normal: {
//                            color: '#32cd32',
//                            label: {
//                                show: true,
//                                textStyle: {
//                                    color: '#fff',
//                                    fontSize: 15
//                                }
//                            }
//                        },
//                        emphasis: {                 // 也是选中样式
//                            borderWidth: 5,
//                            borderColor: 'yellow',
//                            color: '#cd5c5c',
//                            label: {
//                                show: false,
//                                textStyle: {
//                                    color: 'blue'
//                                }
//                            }
//                        }
//                    }
//                }
//            ],
//            markPoint: {
//                itemStyle: {
//                    normal: {
//                        color: 'skyblue'
//                    }
//                },
//                data: [
//                    {name: '天津', value: 350},
//                    {name: '上海', value: 103},
//                    {
//                        name: 'echarts',
//                        symbol: 'image://../asset/img/echarts-logo.png',
//                        symbolSize: 21,
//                        x: 300,
//                        y: 100
//                    }
//                ]
//            },
//            geoCoord: {
//                '上海': [121.4648, 31.2891],
//                '天津': [117.4219, 39.4189]
//            }
//        }
//    ]
//};


// childChart.setOption(option);
}
