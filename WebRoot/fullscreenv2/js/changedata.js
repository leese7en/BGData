var dataMap = {};

var GDP = [ '阿拉善盟', '乌海市', '巴彦淖尔市', '包头市', '鄂尔多斯市', '呼和浩特市', '乌兰察布市', '锡林郭勒盟', '赤峰市', '通辽市', '兴安盟', '呼伦贝尔市' ];
var power = [ '火电', '风电', '其它' ];
var poll = [ 'SO2', 'NOx', '烟尘' ]
var com = [ '内蒙', '全国' ];
function dataFormatter(obj, values) {
	var temp;
	var max = 0;
	for ( var year = 2011; year <= 2016; year++) {
		temp = obj[year];
		for ( var i = 0, l = temp.length; i < l; i++) {
			max = Math.max(max, temp[i]);
			obj[year][i] = {
				name : values[i],
				value : temp[i]
			}
		}
		obj[year + 'max'] = Math.floor(max / 100) * 100;
	}
	return obj;
}

dataMap.dataInstalled = [ [] ];
dataMap.dataPower = [ [] ];
dataMap.dataPowerCom = [ [] ];
dataMap.dataInstalledCom = [ [] ];
dataMap.dataEffectiveCom = [ [] ];
dataMap.powerPoint = [ [] ];






