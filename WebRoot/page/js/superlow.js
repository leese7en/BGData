$(document).ready(function() {

	init();
	queryCity();
	//query();
		preview();
		powerDrag();
		queryInstalled();
	});

/**
 * 初始化信息
 */
function init() {
	$('#poll').combobox('setValue', '-1');
	$('#poll').combobox( {
		onSelect : function(redcord) {
			queryEmission('SO2');
		}
	});
}
/**
 * 查询盟市信息
 */
function queryCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.cityName = '请选择';
			value.unshift(o);
			$('#city').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value
			});
			$('#city').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 * 查询装机容量信息
 */
function queryInstalled() {
	$.ajax( {
		type : 'get',
		url : '../getInstalledEmission',
		data : {
			operatorType : 2
		},
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.content = '请选择';
			value.unshift(o);
			$('#powerInstall').combobox( {
				valueField : 'id',
				textField : 'content',
				data : value
			});
			$('#powerInstall').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 * 获取 污染物排放绩效区间
 * @param {Object} pollutantCode
 */
function queryEmission(pollutantCode) {
	$.ajax( {
		type : 'get',
		url : '../getInstalledEmission',
		data : {
			operatorType : 2
		},
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.content = '请选择';
			value.unshift(o);
			$('#powerPer').combobox( {
				valueField : 'id',
				textField : 'content',
				data : value
			});
			$('#powerPer').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 * 编辑 菜单权限
 */
function add() {
	$('#cityResInfoDialog').show();
	$('#cityResInfoDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 400,
		width : 600,
		top : 20,
		buttons : [ {
			text : '确定',
			iconCls : 'icon-ok',
			handler : function() {
				addCityResInfo();
			}
		}, {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
				$('#cityResInfoDialog').dialog('close');
			}
		} ]
	});
}

/**
 * 获取信息
 *
 */
function getCityResInfo() {
	$.ajax( {
		type : 'get',
		url : '../getCityResInfo',
		dataType : 'json',
		success : function(data) {
			$('#cityResInfoTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('error', '获取信息失败', 'error');
		}
	});
}

/**
 * 获取信息
 *
 */
function addCityResInfo() {
	var cityId = $('#city').combobox('getValue');
	var year = $('#year').combobox('getValue');
	var fireInstalled = $('#fireInstalled').val();
	var windInstalled = $('#windInstalled').val();
	var otherInstalled = $('#otherInstalled').val();
	var firePower = $('#firePower').val();
	var windPower = $('#windPower').val();
	var otherPower = $('#otherPower').val();
	var GDP = $('#GDP').val();
	$.ajax( {
		type : 'post',
		url : '../addCityResInfo',
		data : {
			cityId : cityId,
			year : year,
			fireInstalled : fireInstalled,
			windInstalled : windInstalled,
			otherInstalled : otherInstalled,
			firePower : firePower,
			windPower : windPower,
			otherPower : otherPower,
			GDP : GDP
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('info', '添加成功', 'info');
			}
			query();
		},
		error : function() {
			$.messager.alert('error', '添加失败', 'error');
		}
	});
}

/**
 * 预览超低排放曲线
 */
function preview() {
	var width = document.documentElement.clientWidth - 20;
	var height = document.documentElement.clientHeight - 20;
	$('#result2011').css('width', width / 2 - 100);
	$('#result2011').css('height', height - 120);
	option = {
		tooltip : {
			trigger : 'axis'
		},
		toolbox : {
			show : false,
			feature : {
				mark : {
					show : true
				},
				dataView : {
					show : true,
					readOnly : false
				},
				magicType : {
					show : true,
					type : [ 'line', 'bar' ]
				},
				restore : {
					show : true
				},
				saveAsImage : {
					show : true
				}
			}
		},
		calculable : true,
		legend : {
			data : [ '新建电厂累加', '执行超低排放', '置换空间', '装机容量' ],
			bottom : true
		},
		xAxis : [ {
			type : 'category',
			data : [ '2011', '2012', '2013', '2014', '2015' ]
		} ],
		yAxis : [ {
			type : 'value',
			name : '排放量',
			axisLabel : {
				formatter : '{value} t'
			}
		}, {
			type : 'value',
			name : '装机总量',
			axisLabel : {
				formatter : '{value} 机组'
			}
		} ],
		series : [ {
			name : '新建电厂累加',
			type : 'bar',
			data : [ 4.0, 9.9, 10.0, 12.2, 23.6 ]
		}, {
			name : '执行超低排放',
			type : 'bar',
			stack : '总量',
			data : [ 2.0, 4.9, 7.0, 12.2, 25.6 ]
		}, {
			name : '置换空间',
			type : 'bar',
			stack : '总量',
			data : [ 2.6, 5.9, 9.0, 12.4, 12.7 ]
		}, {
			name : '装机容量',
			type : 'line',
			yAxisIndex : 1,
			data : [ 2.0, 2.2, 3.3, 4.5, 6.3 ]
		} ]
	};
	var myChart = echarts.init(document.getElementById('result2011'));
	myChart.setOption(option);
}

function powerDrag() {
	$('.drag').draggable( {
		proxy : 'clone',
		revert : true,
		cursor : 'auto',
		onStartDrag : function() {
			$(this).draggable('options').cursor = 'not-allowed';
			$(this).draggable('proxy').addClass('dp');
		},
		onStopDrag : function() {
			$(this).draggable('options').cursor = 'auto';
		}
	});
	$('.powerContainer').droppable( {
		onDragEnter : function(e, source) {
			$(source).draggable('options').cursor = 'auto';
			$(source).draggable('proxy').css('border', '1px solid red');
			$(this).addClass('over');
		},
		onDragLeave : function(e, source) {
			$(source).draggable('options').cursor = 'not-allowed';
			$(source).draggable('proxy').css('border', '1px solid #ccc');
			$(this).removeClass('over');
		},
		onDrop : function(e, source) {
			$(this).append(source);
			$(this).removeClass('over');
		}
	});
}