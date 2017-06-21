/**
 * Created by se7en on 2016/2/4.
 */

var timeline= {
    data: [
        '2011', '2012', '2013', '2014', '2015'
    ],

    axisType: 'category',
    // realtime: false,
    // loop: false,
    autoPlay: true,
    // currentIndex: 2,
    playInterval: 5000,
}

var geoCoordMap = {
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
};

var BJData = {
    2011: [
        [{name: '电1'}, {name: '电3'}],
        [{name: '电2'}, {name: '电3'}],
        [{name: '电3'}, {name: '电4'}],
        [{name: '电4'}, {name: '电5'}],
        [{name: '电5'}, {name: '电6'}],
        [{name: '电6'}, {name: '电7'}],
        [{name: '电7'}, {name: '电8'}],
        [{name: '电8'}, {name: '电9'}],
        [{name: '电9'}, {name: '电10'}],
        [{name: '电11'}, {name: '电10'}],
        [{name: '电12'}, {name: '电11'}],
        [{name: '电12'}, {name: '电13'}],
        [{name: '电14'}, {name: '电13'}],
        [{name: '电14'}, {name: '电15'}],
        [{name: '电16'}, {name: '电15'}],
        [{name: '电17'}, {name: '电16'}],
        [{name: '电18'}, {name: '电17'}],
        [{name: '电19'}, {name: '电18'}]
    ],
    2012: [
        [{name: '电1'}, {name: '电3'}],
        [{name: '电3'}, {name: '电4'}],
        [{name: '电4'}, {name: '电5'}],
        [{name: '电5'}, {name: '电6'}],
        [{name: '电6'}, {name: '电7'}],
        [{name: '电7'}, {name: '电8'}],
        [{name: '电8'}, {name: '电9'}],
        [{name: '电9'}, {name: '电10'}],
        [{name: '电11'}, {name: '电10'}],
        [{name: '电14'}, {name: '电13'}],
        [{name: '电14'}, {name: '电15'}],
        [{name: '电16'}, {name: '电15'}],
        [{name: '电17'}, {name: '电16'}],
        [{name: '电18'}, {name: '电17'}],
        [{name: '电19'}, {name: '电18'}]
    ],
    2013: [
        [{name: '电1'}, {name: '电3'}],
        [{name: '电2'}, {name: '电3'}],
        [{name: '电3'}, {name: '电4'}],
        [{name: '电4'}, {name: '电5'}],
        [{name: '电5'}, {name: '电6'}],
        [{name: '电6'}, {name: '电7'}],
        [{name: '电7'}, {name: '电8'}],
        [{name: '电8'}, {name: '电9'}],
        [{name: '电9'}, {name: '电10'}],
        [{name: '电11'}, {name: '电10'}],
        [{name: '电12'}, {name: '电11'}],
        [{name: '电12'}, {name: '电13'}],
        [{name: '电14'}, {name: '电13'}],
        [{name: '电14'}, {name: '电15'}],
        [{name: '电16'}, {name: '电15'}],
        [{name: '电17'}, {name: '电16'}],
        [{name: '电18'}, {name: '电17'}],
        [{name: '电19'}, {name: '电18'}]
    ],
    2014: [
        [{name: '电1'}, {name: '电3'}],
        [{name: '电2'}, {name: '电3'}],
        [{name: '电3'}, {name: '电4'}],
        [{name: '电4'}, {name: '电5'}],
        [{name: '电5'}, {name: '电6'}],
        [{name: '电6'}, {name: '电7'}],
        [{name: '电7'}, {name: '电8'}],
        [{name: '电8'}, {name: '电9'}],
        [{name: '电9'}, {name: '电10'}],
        [{name: '电11'}, {name: '电10'}],
        [{name: '电12'}, {name: '电11'}],
        [{name: '电12'}, {name: '电13'}],
        [{name: '电14'}, {name: '电13'}],
        [{name: '电14'}, {name: '电15'}],
        [{name: '电16'}, {name: '电15'}],
        [{name: '电17'}, {name: '电16'}],
        [{name: '电18'}, {name: '电17'}],
        [{name: '电19'}, {name: '电18'}]
    ],
    2015: [
        [{name: '电1'}, {name: '电3'}],
        [{name: '电2'}, {name: '电3'}],
        [{name: '电3'}, {name: '电4'}],
        [{name: '电4'}, {name: '电5'}],
        [{name: '电5'}, {name: '电6'}],
        [{name: '电6'}, {name: '电7'}],
        [{name: '电7'}, {name: '电8'}],
        [{name: '电8'}, {name: '电9'}],
        [{name: '电9'}, {name: '电10'}],
        [{name: '电11'}, {name: '电10'}],
        [{name: '电12'}, {name: '电11'}],
        [{name: '电12'}, {name: '电13'}],
        [{name: '电14'}, {name: '电13'}],
        [{name: '电14'}, {name: '电15'}],
        [{name: '电16'}, {name: '电15'}],
        [{name: '电19'}, {name: '电18'}]
    ]
};

var powerPos = {
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
var power = {
    2011: [
        {name: '呼伦贝尔安泰热电有限责任公司灵泉电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限公司汇流河发电厂', value: 1500},
        {name: '呼伦贝尔安泰热电股份有限公司扎兰屯热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司海拉尔热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司满洲里热电厂', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司煤矸石热电厂', value: 1500},
        {name: '华能伊敏煤电有限责任公司海拉尔热电厂', value: 1500},
        {name: '内蒙古蒙东能源有限公司鄂温克发电厂', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁中热电厂', value: 1500},
        {name: '大雁煤业有限责任公司热电总厂雁北热电厂', value: 1500},
        {name: '神华宝日希勒能源有限公司一电厂', value: 1500},
        {name: '北方联合电力有限责任公司乌拉特发电厂', value: 1500},
        {name: '北方联合电力有限责任公司临河热电厂', value: 1500},
        {name: '内蒙古蒙电华能热电股份有限公司丰镇发电厂', value: 1500},
        {name: '蒙维科技自备电厂', value: 1500},
        {name: '乌兰察布市宏大实业有限公司兴和热电厂', value: 1500},
        {name: '内蒙古国电能源投资有限公司锡林热电厂', value: 1500},
        {name: '锡林浩特第二发电厂', value: 1500},
        {name: '内蒙古能源发电投资集团有限公司乌斯太热电厂', value: 1500}
    ], 2012: [
        {name: '神华宝日希勒能源有限公司二电厂', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁南热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司东海拉尔发电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限公司牙克石热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司灵泉电厂', value: 1500},
        {name: '华能伊敏煤电有限责任公司海拉尔热电厂', value: 1500},
        {name: '内蒙古蒙东能源有限公司鄂温克发电厂', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁中热电厂', value: 1500},
        {name: '大雁煤业有限责任公司热电总厂雁北热电厂', value: 1500},
        {name: '神华宝日希勒能源有限公司一电厂', value: 1500},
        {name: '北方联合电力有限责任公司乌拉特发电厂', value: 1500},
        {name: '北方联合电力有限责任公司临河热电厂', value: 1500},
        {name: '内蒙古蒙电华能热电股份有限公司丰镇发电厂', value: 1500},
        {name: '蒙维科技自备电厂', value: 1500},
        {name: '乌兰察布市宏大实业有限公司兴和热电厂', value: 1500},
        {name: '内蒙古国电能源投资有限公司锡林热电厂', value: 1500},
        {name: '锡林浩特第二发电厂', value: 1500},
        {name: '内蒙古能源发电投资集团有限公司乌斯太热电厂', value: 1500}
    ], 2013: [
        {name: '神华宝日希勒能源有限公司二电厂', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁南热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司东海拉尔发电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限公司牙克石热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司灵泉电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限公司汇流河发电厂', value: 1500},
        {name: '呼伦贝尔安泰热电股份有限公司扎兰屯热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司海拉尔热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司满洲里热电厂', value: 1500},
        {name: '神华宝日希勒能源有限公司一电厂', value: 1500},
        {name: '北方联合电力有限责任公司乌拉特发电厂', value: 1500},
        {name: '北方联合电力有限责任公司临河热电厂', value: 1500},
        {name: '内蒙古蒙电华能热电股份有限公司丰镇发电厂', value: 1500},
        {name: '蒙维科技自备电厂', value: 1500},
        {name: '乌兰察布市宏大实业有限公司兴和热电厂', value: 1500},
        {name: '内蒙古国电能源投资有限公司锡林热电厂', value: 1500},
        {name: '锡林浩特第二发电厂', value: 1500},
        {name: '内蒙古能源发电投资集团有限公司乌斯太热电厂', value: 1500}
    ], 2014: [
        {name: '神华宝日希勒能源有限公司二电厂', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁南热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司东海拉尔发电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限公司牙克石热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司灵泉电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限公司汇流河发电厂', value: 1500},
        {name: '呼伦贝尔安泰热电股份有限公司扎兰屯热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司海拉尔热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司满洲里热电厂', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司煤矸石热电厂', value: 1500},
        {name: '华能伊敏煤电有限责任公司海拉尔热电厂', value: 1500},
        {name: '内蒙古蒙东能源有限公司鄂温克发电厂', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁中热电厂', value: 1500},
        {name: '大雁煤业有限责任公司热电总厂雁北热电厂', value: 1500},
        {name: '神华宝日希勒能源有限公司一电厂', value: 1500},
        {name: '北方联合电力有限责任公司乌拉特发电厂', value: 1500},
        {name: '锡林浩特第二发电厂', value: 1500},
        {name: '内蒙古能源发电投资集团有限公司乌斯太热电厂', value: 1500}
    ], 2015: [
        {name: '神华宝日希勒能源有限公司二电厂', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁南热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司东海拉尔发电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限公司牙克石热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司灵泉电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限公司汇流河发电厂', value: 1500},
        {name: '呼伦贝尔安泰热电股份有限公司扎兰屯热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司海拉尔热电厂', value: 1500},
        {name: '呼伦贝尔安泰热电有限责任公司满洲里热电厂', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司煤矸石热电厂', value: 1500},
        {name: '华能伊敏煤电有限责任公司海拉尔热电厂', value: 1500},
        {name: '内蒙古蒙东能源有限公司鄂温克发电厂', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁中热电厂', value: 1500},
        {name: '大雁煤业有限责任公司热电总厂雁北热电厂', value: 1500},
        {name: '神华宝日希勒能源有限公司一电厂', value: 1500},
        {name: '北方联合电力有限责任公司乌拉特发电厂', value: 1500},
        {name: '北方联合电力有限责任公司临河热电厂', value: 1500},
        {name: '内蒙古蒙电华能热电股份有限公司丰镇发电厂', value: 1500},
        {name: '蒙维科技自备电厂', value: 1500}
    ]
};

var coalPos = {
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
var coal = {
    2011: [
        {name: '华能伊敏煤电有限责任公司', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司煤矸石热电厂', value: 1500},
        {name: '华能伊敏煤电有限责任公司海拉尔热电厂', value: 1500},
        {name: '内蒙古牙克石五九煤炭（集团）有限责任公司', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁南煤矿', value: 1500},
        {name: '大雁煤业有限责任公司热电总厂雁北热电厂', value: 1500},
        {name: '内蒙古磴口金牛煤电有限公司', value: 1500},
        {name: '内蒙古庆华集团庆华煤化有限责任公司污水处理厂', value: 1500},
        {name: '内蒙古庆华集团腾格里煤化有限公司', value: 1500}

    ], 2012: [
        {name: '华能伊敏煤电有限责任公司海拉尔热电厂', value: 1500},
        {name: '内蒙古牙克石五九煤炭（集团）有限责任公司', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁南煤矿', value: 1500},
        {name: '大雁煤业有限责任公司热电总厂雁北热电厂', value: 1500},
        {name: '内蒙古磴口金牛煤电有限公司', value: 1500},
        {name: '大唐内蒙古多伦煤化工有限责任公司', value: 1500},
        {name: '内蒙古平西白音华煤业有限公司', value: 1500},
        {name: '内蒙古庆华集团庆华煤化有限责任公司', value: 1500},
        {name: '内蒙古太西煤集团兴泰煤化有限责任公司', value: 1500},
        {name: '内蒙古庆华集团庆华煤化有限责任公司污水处理厂', value: 1500},
        {name: '内蒙古庆华集团腾格里煤化有限公司', value: 1500}

    ], 2013: [
        {name: '华能伊敏煤电有限责任公司', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司煤矸石热电厂', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁南煤矿', value: 1500},
        {name: '大雁煤业有限责任公司热电总厂雁北热电厂', value: 1500},
        {name: '内蒙古磴口金牛煤电有限公司', value: 1500},
        {name: '大唐内蒙古多伦煤化工有限责任公司', value: 1500},
        {name: '内蒙古平西白音华煤业有限公司', value: 1500},
        {name: '内蒙古庆华集团庆华煤化有限责任公司', value: 1500},
        {name: '内蒙古太西煤集团兴泰煤化有限责任公司', value: 1500},
        {name: '内蒙古庆华集团庆华煤化有限责任公司污水处理厂', value: 1500},
        {name: '内蒙古庆华集团腾格里煤化有限公司', value: 1500}

    ], 2014: [
        {name: '华能伊敏煤电有限责任公司', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司煤矸石热电厂', value: 1500},
        {name: '华能伊敏煤电有限责任公司海拉尔热电厂', value: 1500},
        {name: '内蒙古牙克石五九煤炭（集团）有限责任公司', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司', value: 1500},
        {name: '内蒙古磴口金牛煤电有限公司', value: 1500},
        {name: '大唐内蒙古多伦煤化工有限责任公司', value: 1500},
        {name: '内蒙古平西白音华煤业有限公司', value: 1500},
        {name: '内蒙古庆华集团庆华煤化有限责任公司', value: 1500},
        {name: '内蒙古庆华集团腾格里煤化有限公司', value: 1500}

    ], 2015: [
        {name: '华能伊敏煤电有限责任公司', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司煤矸石热电厂', value: 1500},
        {name: '华能伊敏煤电有限责任公司海拉尔热电厂', value: 1500},
        {name: '内蒙古牙克石五九煤炭（集团）有限责任公司', value: 1500},
        {name: '扎赉诺尔煤业有限责任公司', value: 1500},
        {name: '内蒙古大雁矿业集团有限责任公司雁南煤矿', value: 1500},
        {name: '大雁煤业有限责任公司热电总厂雁北热电厂', value: 1500},
        {name: '内蒙古磴口金牛煤电有限公司', value: 1500},
        {name: '大唐内蒙古多伦煤化工有限责任公司', value: 1500},
        {name: '内蒙古平西白音华煤业有限公司', value: 1500},
        {name: '内蒙古庆华集团庆华煤化有限责任公司', value: 1500},
        {name: '内蒙古太西煤集团兴泰煤化有限责任公司', value: 1500},
        {name: '内蒙古庆华集团庆华煤化有限责任公司污水处理厂', value: 1500},
        {name: '内蒙古庆华集团腾格里煤化有限公司', value: 1500}

    ]
}

var color = ['#a6c84c', '#ffa022', '#ffff00'];
var convertData = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
            res.push([{
                coord: fromCoord
            }, {
                coord: toCoord
            }]);
        }
    }
    return res;
};

var convertDataPower = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = powerPos[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
var convertDataCoal = function (data) {
    var res = [];
    for (var i = 0; i < data.length; i++) {
        var geoCoord = coalPos[data[i].name];
        if (geoCoord) {
            res.push({
                name: data[i].name,
                value: geoCoord.concat(data[i].value)
            });
        }
    }
    return res;
};
$(document).ready(function () {
    var width = document.documentElement.clientWidth -50;
    var height = document.documentElement.clientHeight - 50;
    $('#main').css('width', width);
    $('#main').css('height', height);
    var option = {
        timeline: timeline,
        options: [
            {
                title: {
                    'text': '2011全区装机及电网情况',
                },
                tooltip: {'trigger': 'item'},
                legend: {
                    x: 'center',
                    data: ['电网', '电力', '煤产业']
                },
                selectedMode: 'single',
                toolbox: {
                    'show': false,
                    'feature': {
                        'mark': {'show': true},
                        'dataView': {'show': true, 'readOnly': false},
                        'restore': {'show': true},
                        'saveAsImage': {'show': true}
                    }
                },
                geo: {
                    map: '内蒙古',
                    label: {
                        normal: {
                            areaColor: '#B0D6E1',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    roam: true,
                    itemStyle: {
                        normal: {
                            areaColor: '#B0D6E1',
                            borderColor: '#404a59'
                        },
                        emphasis: {
                            areaColor: '#2a333d'
                        }
                    }
                },
                series: [
                    {
                        name: '电网',
                        type: 'lines',
                        symbol: ['arrow'],
                        effect: {
                            show: true,
                            color: color[0],
                            period: 1
                        },
                        lineStyle: {
                            normal: {
                                color: '#ff0000',
                                width: 2,
                                curveness: 0.2,
                                type: 'solid'
                            }
                        },
                        data: convertData(BJData['2011'])
                    }, {
                        name: '电力',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertDataPower(power['2011']),
                        symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                        itemStyle: {
                            normal: {
                                borderColor: '#0911EB',
                                borderWidth: 3,            // 标注边线线宽，单位px，默认为1
                                label: {
                                    show: false
                                }
                            }
                        }
                    }, {
                        name: '煤产业',
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        data: convertDataCoal(coal['2011']),
                        symbolSize: 5,       // 标注大小，半宽（半径）参数，当图形为方向或菱形则总宽度为symbolSize * 2
                        itemStyle: {
                            normal: {
                                borderColor: '#ff0000',
                                borderWidth: 3,            // 标注边线线宽，单位px，默认为1
                                label: {
                                    show: false
                                },
                                areaStyle: {
                                    color: '#ff00ff'
                                }
                            }
                        },
                    }
                ]
            },
            {
                title: {'text': '2012全区装机及电网情况'},
                series: [
                    {'data': convertData(BJData['2012'])},
                    {'data': convertDataPower(power['2012'])},
                    {'data': convertDataPower(coal['2012'])}
                ]
            },
            {
                title: {'text': '2013全区装机及电网情况'},
                series: [
                    {'data': convertData(BJData['2013'])},
                    {'data': convertDataPower(power['2013'])},
                    {'data': convertDataPower(coal['2013'])}
                ]
            },
            {
                title: {'text': '2014全区装机及电网情况'},
                series: [
                    {'data': convertData(BJData['2014'])},
                    {'data': convertDataPower(power['2014'])},
                    {'data': convertDataPower(coal['2014'])}
                ]
            },
            {
                title: {'text': '2015全区装机及电网情况'},
                series: [
                    {'data': convertData(BJData['2015'])},
                    {'data': convertDataPower(power['2015'])},
                    {'data': convertDataPower(coal['2015'])}
                ]
            }
        ]
    };

    var myChart = echarts.init(document.getElementById('main'));

// 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    var powerOption = {
        timeline: {
            data: [
                '2011', '2012', '2013', '2014', '2015'
            ],
            label: {
                formatter: function (s) {
                    return s.slice(0, 4);
                }
            },
            show: false,
            autoPlay: true,
            playInterval: 5000
        },
        options: [
            {
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
                                        '#FCCE10', '#E87C25'
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
            },
            {
                series: [
                    {'data': dataMap.dataPower['2012']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPower['2013']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPower['2014']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPower['2015']},
                ]
            }
        ]
    };
    var myChartPowerBar = echarts.init(document.getElementById('powerBar'));

    myChartPowerBar.setOption(powerOption);

    var powerOption = {

    	
        timeline: {
            data: [
                '2011', '2012', '2013', '2014', '2015'
            ],
            label: {
                formatter: function (s) {
                    return s.slice(0, 4);
                }
            },
            show: false,
            autoPlay: true,
            playInterval: 5000
        },
        options: [
            {
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
                        'data': dataMap.dataPoll['2011']
                    }
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPoll['2012']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPoll['2013']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPoll['2014']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPoll['2015']},
                ]
            }
        ]
    };
    var myChartPowerBar = echarts.init(document.getElementById('pollBar'));
    myChartPowerBar.setOption(powerOption);

    /**
     * 发电量环比增长
     */
    var powerComOption = {
        timeline: {
            data: [
                '2011', '2012', '2013', '2014', '2015'
            ],
            label: {
                formatter: function (s) {
                    return s.slice(0, 4);
                }
            },
            show: false,
            autoPlay: true,
            playInterval: 5000
        },
        options: [
            {
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
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2012']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2013']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2014']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2015']},
                ]
            }
        ]
    };
    var myChartPowerCom = echarts.init(document.getElementById('powerCom'));
    myChartPowerCom.setOption(powerComOption);


    /**
     * 装机量环比增长
     */
    var installedComOption = {
        timeline: {
            data: [
                '2011', '2012', '2013', '2014', '2015'
            ],
            label: {
                formatter: function (s) {
                    return s.slice(0, 4);
                }
            },
            show: false,
            autoPlay: true,
            playInterval: 5000
        },
        options: [
            {
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
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2012']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2013']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2014']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2015']},
                ]
            }
        ]
    };
    var installedCom = echarts.init(document.getElementById('installedCom'));
    installedCom.setOption(installedComOption);

    /**
     * 有效利用小时
     */
    var hourComOption = {
        timeline: {
            data: [
                '2011', '2012', '2013', '2014', '2015'
            ],
            label: {
                formatter: function (s) {
                    return s.slice(0, 4);
                }
            },
            show: false,
            autoPlay: true,
            playInterval: 5000
        },
        options: [
            {
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
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2012']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2013']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2014']},
                ]
            },
            {
                series: [
                    {'data': dataMap.dataPowerCom['2015']},
                ]
            }
        ]
    };
    var hourCom = echarts.init(document.getElementById('hourCom'));
    hourCom.setOption(hourComOption);
    myChart.on('timelineplaychanged', function (target) {
        myChartPowerBar.dispatchAction({type: 'timelinePlayChange', playState: target.playState});
        myChartPowerBar.dispatchAction({type: 'timelinePlayChange', playState: target.playState});
        myChartPowerCom.dispatchAction({type: 'timelinePlayChange', playState: target.playState});
        installedCom.dispatchAction({type: 'timelinePlayChange', playState: target.playState});
        hourCom.dispatchAction({type: 'timelinePlayChange', playState: target.playState});

    });
    myChart.on('timelinechanged', function (target) {
        myChartPowerBar.dispatchAction({type: 'timelineChange', currentIndex: target.currentIndex});
        myChartPowerBar.dispatchAction({type: 'timelineChange', currentIndex: target.currentIndex});
        myChartPowerCom.dispatchAction({type: 'timelineChange', currentIndex: target.currentIndex});
        installedCom.dispatchAction({type: 'timelineChange', currentIndex: target.currentIndex});
        hourCom.dispatchAction({type: 'timelineChange', currentIndex: target.currentIndex});

    });
    myChart.on('click', function (target) {
        alert('123');
    });

})
;