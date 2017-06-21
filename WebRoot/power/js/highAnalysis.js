/**
 * Created by se7en on 2016/8/3.
 */

/**
 * 初始化信息
 */

var staChartOption= {
    tooltip: {
        trigger: 'axis',
        position: function (pt) {
            return [pt[0], '10%'];
        }
    },
    title: {
        left: 'center',
        text: '绩效分布',
    },
    legend: {
        top: 'bottom',
        data:['意向']
    },
    tooltip:{
    	trigger: 'axis',
    	formatter : function(params) {
    	var param = params[0].data;
			var str = '企业:' + param.name + '<br/>' + param.title +':'
				+ parseFloat(param.value).toFixed(2)+'<br/>主要产物:'+ (param.products?param.products:'');
			if(param.unit!='99'){
	    		str+='<br/>机组编号:'+param.unit;
	    	}
			return str;
		},
    },
    toolbox: {
        feature: {
    	 	magicType: {
        		type: ['line', 'bar']
    		},
            restore: {},
            saveAsImage: {
            	name:'高耗能高排放'
            }
        }
    },
     dataZoom : {
		show : true,
		start : 30,
		end : 70
	},
    xAxis: {
    	name:'企业/机组',
        type: 'category',
        boundaryGap: false,
        data: []
    },
    yAxis: {
    	name:'绩效/强度',
        type: 'value',
        boundaryGap: [0, '100%']
    },
    series: [
        {
            name:'排放/消耗',
            type:'line',
            smooth:true,
            symbol: 'none',
            sampling: 'average',
            itemStyle: {
                normal: {
                    color: 'rgb(255, 70, 131)'
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgb(255, 158, 68)'
                    }, {
                        offset: 1,
                        color: 'rgb(255, 70, 131)'
                    }])
                }
            },
            data: []
        }
    ]
};
var detailChartOptionHigh  = {
    title: {
        text: '落后者',
        left: 'center',
        top: 'top'
    },
    tooltip: {
        trigger: 'item',
      	formatter : function(params) {
			var param = params.data
			var str = params.seriesName + '<br/>' + '企业:' + param.name + '<br/>' +param.title+ ':'
				+ parseFloat(params.value).toFixed(2)+'<br/>主要产物:'+ (param.products?param.products:'');
			if(param.unit!='99'){
	    		str+='<br/>机组编号:'+param.unit;
	    	}
			return str;
		},
    },
    toolbox: {
        top: 'top',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {
            	name:'落后者'
            }
        }
    },
 
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['展现','点击','访问','咨询','订单']
    },
    calculable: true,
    color:['#FFD39B','#FFA54F','#FFB90F','#FFA54F','#FF8C00','#FF7F50','#FF7256','#FF4500','#FF0000','#FF3030'],
    series: [
        {
            name: '落后者',
            type: 'funnel',
            width: '10%',
            height: '90%',
            left: '3%',
            top: '5%',
            sort: 'descending',
            data:[]
        }
    ]
};
	
var detailChartOptionLow  = {
    title: {
        text: '领跑者',
        left: 'center',
        top: 'top'
    },
    tooltip: {
        trigger: 'item',
        formatter : function(params) {
    	var param = params.data
			var str =  params.seriesName + '<br/>' + '企业:' + param.name + '<br/>' +param.title+ ':'
				+ parseFloat(params.value).toFixed(3)+'<br/>主要产物:'+ (param.products?param.products:'');
	    	if(param.unit!='99'){
	    		str+='<br/>机组编号:'+param.unit;
	    	}
	    	return str;
		},
    },
    toolbox: {
        top: 'top',
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {
            	name:'领跑者'
            }
        }
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['展现','点击','访问','咨询','订单']
    },
    calculable: true,
    color:['#006400','#008B00','#008B45','#00CD00','#00CD66','#00EE00','#00EE76','#00FA9A','#00FF7F','#54FF9F'],
    series: [
        {
            name: '领跑者',
            type: 'funnel',
            width: '10%',
            height: '90%',
            left: '3%',
            top: '5%',
            sort: 'ascending',
            data:[]
        }
    ]
};

var analysisType =[{
	key:0,value:'SO2排放绩效'
},{
	key:1,value:'NOx排放绩效'
},{
	key:2,value:'烟尘排放绩效'
},{
	key:3,value:'SO2排放强度'
},{
	key:4,value:'NOx排放强度'
},{
	key:5,value:'烟尘排放强度'
},{
	key:6,value:'煤炭消耗绩效'
}];
var analysisTypeUnit =[{
	key:0,value:'SO2排放绩效'
},{
	key:1,value:'NOx排放绩效'
},{
	key:2,value:'烟尘排放绩效'
},{
	key:6,value:'煤炭消耗绩效'
}]

var installed =['0-100','100-300','300-600','600-'];
$(document).ready(function() {
	toastr.options.positionClass = 'toast-top-center';
	var beginYear = 2011;
	var endYear = 2015;
	initAnalysisType();
	var html='';
	for(var i =beginYear;i<=endYear;i++){
		html+='<option value="'+i+'">'+i+'</option>';
	}
	$('#yearQuery').html(html);
	
	queryInstalled();
	
});

/**
 * 格式啊胡显示 分析类型
 */
function initAnalysisType(){
	var html='';
	for(var  t in analysisType){
		var oo = analysisType[t];
		html+='<option value="'+oo.key+'">'+oo.value+'</option>';
	}
	$('#analysisTypeQuery').html(html);
	$('#analysisTypeQuery').selectpicker('refresh');
}
/**
 * 格式啊胡显示 分析类型
 */
function initAnalysisTypeUnit(){
	var html='';
	for(var  t in analysisTypeUnit){
		var oo = analysisTypeUnit[t];
		html+='<option value="'+oo.key+'">'+oo.value+'</option>';
	}
	$('#analysisTypeQuery').html(html);
	$('#analysisTypeQuery').selectpicker('refresh');
}
/**
 * 获取装机容量
 */
function queryInstalled(){
	$.ajax( {
		type : 'get',
		url : '../getInstalledEmission',
		data : {
			operatorType : 1
		},
		dataType : 'json',
		success : function(data) {
			var html = '';
			for ( var i in data) {
				html+='<option value="'+data[i].content+'">'+data[i].content+'</option>'
			}
			$('#installedQuery').html(html);
			$('#installedQuery').selectpicker('refresh');
			queryIndustry();
		},
		error : function() {
			toastr.warning('获取装机容量失败!');
		}
	});
	queryIndustry();
}
/**
 * 获取企业行业
 */
function queryIndustry(){
	$.ajax( {
		type : 'get',
		url : '../getIndustryPower',
		dataType : 'json',
		success : function(data) {
		var flag = data.flag;
		if(flag<0){
			toastr.warning(data.message);
			return;
		}
		var value = data.data;
		var html = '';
			for ( var i in value) {
				html+='<option value="'+value[i].psType+'">'+value[i].psType+'</option>'
			}
			html='<option value="-1">请选择</option>'+html;
			$('#industryQuery').html(html);
			$('#industryQuery').selectpicker('refresh');
			queryBoilerType();
		},
		error : function() {
			$.messager.alert('信息', '获取信息失败', 'info');
		}
	});
}

/**
 * 获取锅炉类型
 */
function queryBoilerType(){
	$.ajax( {
		type : 'get',
		url : '../getBoilerType',
		dataType : 'json',
		success : function(data) {
		var flag = data.flag;
		if(flag<0){
			toastr.warning(data.message);
			return;
		}
		var value = data.data;
		var html = '';
			for ( var i in value) {
				html+='<option value="'+value[i].boilerType+'">'+value[i].boilerType+'</option>'
			}
			html='<option value="-1">请选择</option>'+html;
			$('#boilerTypeQuery').html(html);
			$('#boilerTypeQuery').selectpicker('refresh');
			queryAnalysis();
		},
		error : function() {
			$.messager.alert('信息', '获取信息失败', 'info');
		}
	});
}
/**
 * 监听 锅炉类型改变事件
 */
function boilerChange(){
	var boilerType =$('#boilerTypeQuery').selectpicker('val');
	if(boilerType=='-1'){
		initAnalysisType();
	}else{
		initAnalysisTypeUnit();
	}
}
/**
 * 显示信息
 */
function queryAnalysis() {
	var year = $('#yearQuery').selectpicker('val');
	var  installed =$('#installedQuery').selectpicker('val');
	var boilerType =$('#boilerTypeQuery').selectpicker('val');
	var industry = $('#industryQuery').selectpicker('val');
	var analysisType=$('#analysisTypeQuery').selectpicker('val');
	
	$.ajax({
		type:'get',
		url:'../queryAnalysis',
		data:{
			year:year,
			installed:installed,
			psType:encodeURI(encodeURI(industry)),
			boilerType:encodeURI(encodeURI(boilerType)),
			analysisType:analysisType
		},
		dataType:'json',
		success:function(data){
			var flag = data.flag;
			if(flag<0){
				toastr.warning(data.message);
				return;
			}else{
				initAnalysis(data.data);
			}
		},
		error:function(){
			toastr.warning('获取信息失败');
		}
	});
}

/**
 * 格式化信息显示
 * @param {Object} data
 */
function initAnalysis(data){
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	$('#staChart').css('width', width /2 - 20);
	$('#staChart').css('height', height - 100);
	staChartOption.title.text = data.title;
	staChartOption.series[0].data = data.allInfo.data;
	staChartOption.xAxis.data = data.allInfo.xAxis;
	
	var myChart = echarts.init(document.getElementById('staChart'));
	myChart.setOption(staChartOption);
	
	$('#detailChartHigh').css('width', width /4 - 20);
	$('#detailChartHigh').css('height', height - 100);
	detailChartOptionHigh.series[0].data = data.highInfo;
	var myChartDetailHigh = echarts.init(document.getElementById('detailChartHigh'));
	myChartDetailHigh.setOption(detailChartOptionHigh);
	
	$('#detailChartLow').css('width', width /4 - 20);
	$('#detailChartLow').css('height', height - 100);
	detailChartOptionLow.series[0].data = data.lowInfo;
	var myChartDetailLow = echarts.init(document.getElementById('detailChartLow'));
	myChartDetailLow.setOption(detailChartOptionLow);
}