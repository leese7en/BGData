/**
 * Created by se7en on 2016/12/26.
 */
var socket = null;
function startServer() {
	socket = io.connect('ws://10.15.255.22:8081');
	socket.on('changeCity', function(data) {
		getIndurutyRealtime(data.cityName);
		getPollutantEmission(data.cityName);
	});
}

var industryInterval;
var emissionOption = {
	title : {
		text : '2016年污染物排放量',
		x : 'center',
		textStyle : {
			color : '#cde7f7'
		}
	},
	tooltip : {
		trigger : 'axis',
		formatter : function(params) {
			var length = params.length;
			var tip = params[0].name;
			for ( var i = 0; i < length; i++) {
				tip += '<br/>'
						+ params[i].seriesName
						+ ':'
						+ (params[i].value ? (params[i].value).toFixed(2) : '-');
			}
			return tip;
		}
	},
	legend : {
		x : 'center',
		y : 'bottom',
		data : [ '二氧化硫', '氮氧化物', '烟尘' ],
		textStyle : {
			color : 'rgb(200,174,64)',
			fontSize : 14
		}
	},
	grid : {
		x : 60,
		y : 50,
		x2 : 40,
		y2 : 60
	},
	xAxis : [ {
		splitLine : {
			show : false
		},
		axisLine : {
			lineStyle : {
				color : '#eee'
			}
		},
		axisLabel : {
			interval : 0,
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		},
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		type : 'category',
		data : [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月',
				'11月', '12月' ],
	} ],
	yAxis : [ {
		splitLine : {
			show : false,
			lineStyle : {
				type : 'dashed'
			}
		},
		type : 'value',
		name : '排放量（吨）',
		nameTextStyle : {
			color : 'rgba(255,255,255,0.7)'
		},
		axisLabel : {
			textStyle : {
				color : 'rgba(255,255,255,0.7)'
			}
		}
	} ],
	color : [ '#67bdea', '#f3e478', '#664992' ],
	series : [ {
		name : '二氧化硫',
		type : 'line',
		smooth : true,
		data : []
	}, {
		name : '氮氧化物',
		type : 'line',
		smooth : true,
		data : []
	}, {
		name : '烟尘',
		type : 'line',
		smooth : true,
		data : []
	} ]
};

// 盟市状况

var dataMap = {};

var width = 935;
var height = 768;
$(document).ready(function() {
	startServer();
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"progressBar" : false,
		"positionClass" : "toast-top-center",
		"onclick" : null,
		"showDuration" : "300",
		"hideDuration" : "1000",
		"timeOut" : "1000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	};
	$('#so2EffectiveLowChart').css('width', width / 3);
	$('#so2EffectiveLowChart').css('height', height / 2 - 10);
	$('#so2EffectiveCityBoxChart').css('width', width / 3 * 2);
	$('#so2EffectiveCityBoxChart').css('height', height / 2 - 10);
	$('#emissionChart').css('width', width);
	$('#emissionChart').css('height', height / 2 - 40);
	getIndurutyRealtime();
	getPollutantEmission();
});

function refreashIndurutyRealtime(cityName) {
	if (!cityName) {
		cityName = '呼和浩特市';
	}

	clearInterval(industryInterval);
	industryInterval = setInterval(
			function() {
				$
						.ajax({
							url : '../getIndurutyRealtime',
							data : {
								cityName : encodeURI(encodeURI(cityName))
							},
							dataType : 'json',
							success : function(data) {
								var enterNum = data.enterNum;
								var installed = data.installed;
								var unitRun = data.unitRun;
								var unitStop = data.unitStop;
								var unitInterruption = data.unitInterruption;
								var totalLoad = data.totalLoad;
								var so2Concentration = data.so2Concentration;
								var desulfurizationEffectiveness = data.desulfurizationEffectiveness;
								var ZML = data.ZML;
								var CSL = data.CSL;
								var PFL = data.PFL;
								$('#cityName').html(cityName);
								$('#enterNum').html(enterNum);
								$('#installed').html(installed);
								$('#unitTotal').html(unitRun + unitStop);
								$('#unitRun').html(unitRun);
								$('#totalLoad').html(totalLoad.toFixed(2));
								$('#so2Concentration').html(
										so2Concentration.toFixed(2));
								$('#desulfurizationEffectiveness')
										.html(
												desulfurizationEffectiveness
														.toFixed(2));
								$('#ZML').html(ZML.toFixed(2));
								$('#CSL').html((CSL / 1000 / 1000).toFixed(2));
								$('#PFL').html((PFL / 1000 / 1000).toFixed(2));
							},
							error : function() {
							}
						});
			}, 2000);
}
/**
 * 获取工况实时数据
 */
function getIndurutyRealtime(cityName) {
	if (!cityName) {
		cityName = '呼和浩特市';
	}
	$
			.ajax({
				url : '../getIndurutyRealtime',
				data : {
					cityName : encodeURI(encodeURI(cityName))
				},
				dataType : 'json',
				success : function(data) {
					var enterNum = data.enterNum;
					var unitRun = data.unitRun;
					var unitStop = data.unitStop;
					var unitInterruption = data.unitInterruption;
					var totalLoad = data.totalLoad;
					var so2Concentration = data.so2Concentration;
					var desulfurizationEffectiveness = data.desulfurizationEffectiveness;
					var ZML = data.ZML;
					var CSL = data.CSL;
					var PFL = data.PFL;
					$('#cityName').html(cityName);
					$('#enterNum').html(enterNum);
					$('#unitTotal').html(unitRun + unitStop);
					$('#unitRun').html(unitRun);
					$('#unitStop').html(unitStop);
					$('#totalLoad').html(totalLoad.toFixed(2));
					$('#so2Concentration').html(so2Concentration.toFixed(2));
					$('#desulfurizationEffectiveness').html(
							desulfurizationEffectiveness.toFixed(2));
					$('#ZML').html(ZML.toFixed(2));
					$('#CSL').html((CSL / 1000 / 1000).toFixed(2));
					$('#PFL').html((PFL / 1000 / 1000).toFixed(2));
					refreashIndurutyRealtime(cityName);
				},
				error : function() {
				}
			});
}
/**
 * 获取在线盟市排放量相关数据
 */
function getPollutantEmission(cityName) {
	if (!cityName) {
		cityName = '呼和浩特市';
	}
	var emissionChart = echarts.init(document.getElementById('emissionChart'));
	emissionChart.showLoading({
		animation : true,
		text : '加载中',
		textStyle : {
			fontSize : 28
		}
	});
	$.ajax({
		url : '../getOnlineEmission',
		data : {
			cityName : encodeURI(encodeURI(cityName))
		},
		dataType : 'json',
		success : function(data) {
			var so2Value = data.so2;
			var noxValue = data.nox;
			var dustValue = data.dust;
			emissionOption.series[0].data = so2Value;
			emissionOption.series[1].data = noxValue;
			emissionOption.series[2].data = dustValue;
			emissionChart.hideLoading();
			emissionChart.setOption(emissionOption);
		},
		error : function() {
		}
	});

}
