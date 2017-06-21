var option = {
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
		data : [ '预测排放量', '实际排放量', '置换空间', '装机容量' ],
		bottom : true
	},
	grid : {
		x : '20%',
		x2 : '20%',
		y : '20%',
		y2 : '20%'
	},
	xAxis : {
		type : 'category',
		data : [ '2011', '2012', '2013', '2014', '2015' ]
	},
	yAxis : [ {
		type : 'value',
		name : '排放量',
		axisLabel : {
			formatter : '{value} t'
		},
		scale : true
	}, {
		type : 'value',
		name : '装机总量',
		axisLabel : {
			formatter : '{value} 万千瓦'
		},
		scale : true
	} ],
	series : [ {
		name : '预测排放量',
		type : 'bar',
		data : [ 4.0, 9.9, 10.0, 12.2, 23.6 ]
	}, {
		name : '实际排放量',
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

var changePowerUnit = new UtilMap();
var closePowerUnit = new UtilMap();
var years = new Array();

/**
 * 每年的条件 集合
 */
var yearCondition = new Object();
//当前是否处于 方案更新阶段
var isUpdate = 0;
//当前编辑方案的 id
var programId = 0;

/**
 * 初始化信息
 */

var dataPollution = [ {
	text : "请选择",
	value : "-1"
}, {
	text : "SO2",
	value : "SO2"
}, {
	text : "NOx",
	value : "NOx"
}, {
	text : "烟尘",
	value : "dust"
} ];
/**
 * 页面加载调用
 */
$(document).ready(function() {
	$('.help-tip').find('p').html('大数据平台提供条件筛选、组合工具，帮助用户形成多套超低排放实施预测方案，并可根据用户需求保存多套方案，功能包括：方案管理、新建方案、方案对比。操作说明：新建方案功能，可新建超低排放预测方案。进入页面后，可快捷选择系统保存的历史方案并进行编辑，也可编辑新方案。选择左上方开始结束时间，污染物点击确定，到右上方，选择装机容量、盟市、排放绩效（条件都为多选），填入单机目标削减目标，' + 
		'点击查询，此时右下方框内会出现符合条件的电厂，选择操作类型后双击电厂，电厂出现在左侧相应年份内，整改为黄色，关停是灰色；点击右侧操作类型旁的新建按钮，填入新建电厂信息，新建为绿色；在左下方可以填入目标削减量，并且与实际削减量进行对比，方便调整方案；制定方案之后点击预览，生成该方案执行后的预测趋势；该方案可保存，可导出，在左侧电厂列表上有快捷方案选择按钮，可选择保存过的方案。')
	initStyleInfo();
	init();
	getProgramBack();
});
/**
 * 修改组件的默认大小，适应窗体变化
 */
function initStyleInfo() {
	var height = document.documentElement.clientHeight - 140;
	$('#source').css('height', height + 'px');
	$('#power').css('height', height + 'px');
}
/**
 * 初始化信息
 */
function init() {
	$('.drag').tooltip();
	//删除预览标签 added by tang
	var viewtabs = $('#previewTabs').children('.tabs-panels').children('div');
	for ( var i = 0; i < viewtabs.length; i++) {
		$('#previewTabs').tabs('close', 0);
	}
	// 设置污染物combobox	
	$('#poll').combobox( {
		valueField : 'value',
		textField : 'text',
		data : dataPollution,
		onSelect : function() {
			var poll = $('#poll').combobox('getValue');
			$('#powerPer').combobox('clear');
			//添加绩效下拉列表值
		queryEmission(poll);
	}
	});
	$('#poll').combobox('setValue', '-1');
	queryCity();
	queryInstalled();
	//设置按钮为不可用
	$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
	$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
	$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
}
/**
 * 查询盟市信息,设置盟市combobox
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
			$('#cityQuery').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value,
				onSelect : function(record) {
					var values = $('#cityQuery').combobox('getValues');
					if (values) {
						var length = values.length;
						if (values[0] == '-1') {
							values = values.slice(1, length);
							$('#cityQuery').combobox('setValues', values);
						}
					}
				},
				onUnselect : function(record) {
					var values = $('#cityQuery').combobox('getValues');
					if (values && values.length == 0) {
						values.push('-1');
						$('#cityQuery').combobox('setValues', values);
					}
				}
			});
			$('#cityQuery').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 * 查询装机容量信息,设置装机容量combobox
 */
function queryInstalled() {
	$.ajax( {
		type : 'get',
		url : '../getInstalledEmission',
		data : {
			operatorType : 1
		},
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			for ( var i in value) {
				data[i].content = data[i].content + '万千瓦';
			}
			o.id = '-1';
			o.content = '请选择';
			value.unshift(o);
			$('#powerInstall').combobox( {
				valueField : 'id',
				textField : 'content',
				data : value,
				onSelect : function(record) {
					var values = $('#powerInstall').combobox('getValues');
					if (values) {
						var length = values.length;
						if (values[0] == '-1') {
							values = values.slice(1, length);
							$('#powerInstall').combobox('setValues', values);
						}
					}
				},
				onUnselect : function(record) {
					var values = $('#powerInstall').combobox('getValues');
					if (values && values.length == 0) {
						values.push('-1');
						$('#powerInstall').combobox('setValues', values);
					}
				}
			});
			$('#powerInstall').combobox('setValue', '-1');
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}
/**
 * 获取 污染物排放绩效区间,设置排放绩效combobox
 * @param {Object} pollutantCode
 */
function queryEmission(pollutantCode) {
	$.ajax( {
		type : 'get',
		url : '../getInstalledEmission',
		data : {
			operatorType : 2,
			pollutantCode : pollutantCode
		},
		dataType : 'json',
		success : function(data) {
			var value = data;
			for ( var i in value) {
				value[i].content = value[i].content + 'g/kwh';
			}
			var o = new Object();
			o.id = '-1';
			o.content = '请选择';
			value.unshift(o);
			$('#powerPer').combobox( {
				valueField : 'id',
				textField : 'content',
				data : value,
				onSelect : function(record) {
					var values = $('#powerPer').combobox('getValues');
					if (values) {
						var length = values.length;
						if (values[0] == '-1') {
							values = values.slice(1, length);
							$('#powerPer').combobox('setValues', values);
						}
					}
				},
				onUnselect : function(record) {
					var values = $('#powerPer').combobox('getValues');
					if (values && values.length == 0) {
						values.push('-1');
						$('#powerPer').combobox('setValues', values);
					}
				}
			});
			$('#powerPer').combobox('setValue', '-1');
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}

/**
 * 获取方案
 */
function getProgramBack() {
	$.ajax( {
		type : 'get',
		url : '../getProgramBack',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.programId = '-1';
			o.heading = '请选择';
			value.unshift(o);
			$('#myProgram').combobox( {
				valueField : 'programId',
				textField : 'heading',
				data : value,
				onChange : function(newValue, oldValue) {
					if (newValue != '-1') {
						if (!onlyCheckLength(newValue, "快捷方案")){
							$('#myProgram').combobox('setValue', -1)
							return
						}
						getProgramBackInfo(newValue);
					}
				}
			});
			$('#myProgram').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}
/**
 * 获取逆推方案 信息
 * @param {Object} data
 */
function getProgramBackInfo(programId) {
	$.ajax( {
		type : 'get',
		url : '../getProgramBackInfo',
		data : {
			programId : programId
		},
		dataType : 'json',
		success : function(data) {
			initProgramBackInfo(data);
			isUpdate = 1;
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}
/**
 * 格式化 逆推方案信息
 * @param {Object} data
 */
function initProgramBackInfo(data) {
	changePowerUnit = new Object();
	closePowerUnit = new Object();
	years = new Array();
	/**
	 * 每年的条件 集合
	 */
	yearCondition = new Object();
	var program = data.parent;
	var detail = data.detail;
	for ( var i in detail) {
		var bean = detail[i];
		var yearCon = new Object();
		yearCon.cityIds = bean.cityId;
		yearCon.installeds = bean.installeds;
		yearCon.effectives = bean.effectives;
		yearCondition[bean.year] = yearCon;
	}

	var details = data.details;
	programId = program.programId;
	$('#beginYear').combobox('setValue', program.beginYear);
	$('#endYear').combobox('setValue', program.endYear);
	$('#poll').combobox('setValue', program.poll);
	queryEmission(program.poll);
	addTabsFunc();
	for ( var i in details) {
		var bean = details[i];
		bean.psName = bean.psName + ',' + bean.unit + '号机组,' + bean.installedMax + '万千瓦,'
				+ parseFloat(bean.pollEffective).toFixed(2) + 'g/kwh';
		var base = '<li  class="drag" style="width:auto;list-style-type:none;cursor:pointer;border-radius:5px;" title="双击选择或取消" operatorId="'
				+ bean.id
				+ '"changeAmount ="'
				+ bean.changeLessAmount
				+ '"closeAmount ="'
				+ bean.closeLessAmount
				+ '"><span id="' + bean.psCode + '">' + bean.psName + '</span></li>';
		var year = bean.year;
		var valueId = 'actualYear' + year;
		var amountValue = $('#' + valueId).textbox('getValue');
		if (!amountValue) {
			amountValue = 0;
		}
		var operate = bean.operatorType;
		if (operate == '2') {
			var changeArray = changePowerUnit[year];
			if (!changeArray) {
				changeArray = new Array();
			}
			changeArray.push(bean.id);
			changePowerUnit[year] = changeArray;
			operatorValue = bean.changeLessAmount;
		} else {
			var closeArray = closePowerUnit[year];
			if (!closeArray) {
				closeArray = new Array();
			}
			closeArray.push(bean.id);
			closePowerUnit[year] = closeArray;
			operatorValue = bean.closeLessAmount;
		}
		amountValue = (parseFloat(amountValue) + parseFloat(operatorValue)).toFixed(2);
		$('#' + valueId).textbox('setValue', amountValue);
		var currentId = 'yearTabs' + year;
		var color = '#d3d3d3';
		if (operate == '2') {
			color = '#ffe500';
		} else if (operate == '0') {
			color = '#51ff00';
		}
		$('#' + currentId).append($(base).css('backgroundColor', color));
		resultDbClick();
		$('#exportbutton').removeAttr('disabled').css('background', '#39affe');
		$('#savebutton').removeAttr('disabled').css('background', '#39affe');
		$('#previewbutton').removeAttr('disabled').css('background', '#39affe');
	}
	$('#yearTabs .tabs-inner').bind('click', function(e) {
		var text = $(e.target).find('.tabs-title').text();
		if (text === "") {
			text = $(e.target).text();
			if (text == "") {
				text = $(e.target).prev('span').text();
			}
		}
		var currentId = 'yearTabs' + text;
		if ($('#' + currentId + ' .drag').size() == 0) {
			$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
		} else {
			$('#exportbutton').removeAttr('disabled').css('background', '#39affe');
			$('#savebutton').removeAttr('disabled').css('background', '#39affe');
			$('#previewbutton').removeAttr('disabled').css('background', '#39affe');
		}
	});
}

/**
 * 原始集合绑定 双击事件
 */
function conditionDbClick() {
	$('#source .drag').unbind('dblclick');
	$('#source .drag').bind(
			'dblclick',
			function() {
				if ($('#power .powerContainer').size() == 0) {
					$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择年份</div>',
							'提示信息');
					return;
				}
				var operate = $('#operatorType').combobox('getValue');
				if (operate == 'select') {
					$.messager.alert('提示信息',
							'<div style="height:50px;line-height:50px;margin-left:20px;">请选择操作类型</div>', '提示信息');
					return;
				}

				var tabs = $('#yearTabs').tabs('getSelected');
				var year = tabs.panel('options').title;

				var valueId = 'actualYear' + year;
				var amountValue = $('#' + valueId).textbox('getValue');
				if (!amountValue) {
					amountValue = 0;
				}
				if (operate == 'change') {
					var changeArray = changePowerUnit[year];
					if (!changeArray) {
						changeArray = new Array();
					}
					changeArray.push($(this).attr('operatorId'));
					changePowerUnit[year] = changeArray;
					operatorValue = $(this).attr('changeAmount');
				} else {
					var closeArray = closePowerUnit[year];
					if (!closeArray) {
						closeArray = new Array();
					}
					closeArray.push($(this).attr('operatorId'));
					closePowerUnit[year] = closeArray;
					operatorValue = $(this).attr('closeAmount');
				}
				amountValue = (parseFloat(amountValue) + parseFloat(operatorValue)).toFixed(2);
				$('#' + valueId).textbox('setValue', amountValue);
				var currenttitle = $('#power .tabs-selected .tabs-title').text();
				var currentId = 'yearTabs' + currenttitle;
				var color = '#d3d3d3';
				if (operate == 'change') {
					color = '#ffe500';
				}
				$(this).remove().appendTo($('#' + currentId)).css('backgroundColor', color);
				$('#exportbutton').removeAttr('disabled').css('background', '#39affe');
				$('#savebutton').removeAttr('disabled').css('background', '#39affe');
				$('#previewbutton').removeAttr('disabled').css('background', '#39affe');
				resultDbClick();
			});
}
/**
 * 结果数据双击事件
 * @memberOf {TypeName} 
 */
function resultDbClick() {
	$('#power .drag').unbind('dblclick');
	$('#power .drag').bind('dblclick', function() {
		$(this).remove().appendTo($('#sourceholder')).css('backgroundColor', '#AACCFF');
		var currenttitle = $('#power .tabs-selected .tabs-title').text();
		var currentId = 'yearTabs' + currenttitle;
		if ($('#' + currentId + ' .drag').size() == 0) {
			$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
		}
		var tabs = $('#yearTabs').tabs('getSelected');
		var year = tabs.panel('options').title;

		var valueId = 'actualYear' + year;
		var amountValue = $('#' + valueId).textbox('getValue');
		if (!amountValue) {
			amountValue = 0;
		}
		var operatorId = $(this).attr('operatorId');
		var changeArray = changePowerUnit[year];
		var change = new Array();
		for ( var i in changeArray) {
			if (changeArray[i] != operatorId) {
				change.push(changeArray[i]);
			} else {
				operatorValue = $(this).attr('changeAmount');
			}
		}
		changePowerUnit[year] = change;
		var closeArray = closePowerUnit[year];
		var close = new Array();
		for ( var i in closeArray) {
			if (closeArray[i] != operatorId) {
				close.push(closeArray[i]);
			} else {
				operatorValue = $(this).attr('closeAmount');
			}
		}
		amountValue = (parseFloat(amountValue) - parseFloat(operatorValue)).toFixed(2);
		if (amountValue < 0) {
			amountValue = 0;
		}
		$('#' + valueId).textbox('setValue', amountValue);
		closePowerUnit[year] = close;
		conditionDbClick();
	});
}
/**
 * 将所有的数据移动到 年份区间中
 */
function addCompanyAll() {
	var powerUnits = $('#source .drag');
	var length = powerUnits.length;
	if (length <= 0) {
		$.messager
				.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">没有可操作的电厂机组</div>', '提示信息');
		return;
	}
	if ($('#power .powerContainer').size() == 0) {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请先选择年份</div>', '提示信息');
		return;
	}
	var operate = $('#operatorType').combobox('getValue');
	if (operate == 'select') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请先选择操作类型</div>', '提示信息');
		return;
	}
	var tabs = $('#yearTabs').tabs('getSelected');
	var year = tabs.panel('options').title;
	var valueId = 'actualYear' + year;
	for ( var i = 0; i < length; i++) {
		var powerUnit = powerUnits[i];
		var amountValue = $('#' + valueId).textbox('getValue');
		if (!amountValue) {
			amountValue = 0;
		}
		if (operate == 'change') {
			var changeArray = changePowerUnit[year];
			if (!changeArray) {
				changeArray = new Array();
			}
			changeArray.push($(powerUnit).attr('operatorId'));
			changePowerUnit[year] = changeArray;
			operatorValue = $(powerUnit).attr('changeAmount');
		} else {
			var closeArray = closePowerUnit[year];
			if (!closeArray) {
				closeArray = new Array();
			}
			closeArray.push($(powerUnit).attr('operatorId'));
			closePowerUnit[year] = closeArray;
			operatorValue = $(powerUnit).attr('closeAmount');
		}
		amountValue = (parseFloat(amountValue) + parseFloat(operatorValue)).toFixed(2);
		$('#' + valueId).textbox('setValue', amountValue);
		var currenttitle = $('#power .tabs-selected .tabs-title').text();
		var currentId = 'yearTabs' + currenttitle;
		var color = '#d3d3d3';
		if (operate == 'change') {
			color = '#ffe500';
		}
		$(powerUnit).remove().appendTo($('#' + currentId)).css('backgroundColor', color);
		$('#exportbutton').removeAttr('disabled').css('background', '#39affe');
		$('#savebutton').removeAttr('disabled').css('background', '#39affe');
		$('#previewbutton').removeAttr('disabled').css('background', '#39affe');
		resultDbClick();
	}
}
/**
 * 清空当年所选择的机组、移动到原位置
 */
function removeCompanyAll() {
	var tabs = $('#yearTabs').tabs('getSelected');
	var year = tabs.panel('options').title;
	var currenttitle = $('#power .tabs-selected .tabs-title').text();
	var currentId = 'yearTabs' + currenttitle;
	var powerUnits = $('#' + currentId + ' .drag');
	var length = powerUnits.length;
	if (length <= 0) {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">当前年份没有需要操作的数据</div>',
				'提示信息');
		return;
	}
	for ( var j = 0; j < length; j++) {
		var powerUnit = powerUnits[j];
		$(powerUnit).remove().appendTo($('#sourceholder')).css('backgroundColor', '#AACCFF');
		if ($('#' + currentId + ' .drag').size() == 0) {
			$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
		}
		var operatorId = $(powerUnit).attr('operatorId');
		var changeArray = changePowerUnit[year];
		var change = new Array();
		for ( var i in changeArray) {
			if (changeArray[i] != operatorId) {
				change.push(changeArray[i]);
			}
		}
		changePowerUnit[year] = change;
		var closeArray = closePowerUnit[year];
		var close = new Array();
		for ( var i in closeArray) {
			if (closeArray[i] != operatorId) {
				close.push(closeArray[i]);
			}
		}
		closePowerUnit[year] = close;
		conditionDbClick();
	}
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
			handler : function() {
				addCityResInfo();
			}
		}, {
			text : '取消',
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
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}

/**
 * 预览超低排放曲线
 */
function query() {
	var cityId = $('#cityQuery').combobox('getValues');
	if (cityId.length == 1 && cityId[0] == '请选择') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请先选择城市</div>', '提示信息');
		return;
	}
	if (cityId[0] == '-1') {
		cityId.splice(0, 1);
	}
	var installed = $('#powerInstall').combobox('getValues');
	if (installed.length == 1 && installed[0] == '请选择') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请先选择装机容量</div>', '提示信息');
		return;
	}
	if (installed[0] == '请选择') {
		installed.splice(0, 1);
	}
	var effective = $('#powerPer').combobox('getValues');
	if (effective.length == 1 && effective[0] == '请选择') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请先选排放绩效</div>', '提示信息');
		return;
	}
	if (effective[0] == '请选择') {
		effective.splice(0, 1);
	}
	var poll = $('#poll').combobox('getValue');
	var aimsMin = $('#aimsLessMin').val();
	if (!aimsMin) {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择输入单机组目标消减量最小值</div>',
				'提示信息');
		return;
	}
	if (!onlyNumberAndLength(aimsMin, '减排最小值')){
		return
	}
	var aimsMax = $('#aimsLessMax').val();
	if (!aimsMax) {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择输入单机组目标消减量最大值</div>',
				'提示信息');
		return;
	}
	if (!onlyNumberAndLength(aimsMax, '减排最大值')){
		return
	}

	initYearQuery(cityId, installed, effective, aimsMin, aimsMax);
	$.ajax( {
		type : 'get',
		url : '../getSuperLowBack',
		data : {
			installed : installed,
			effective : effective,
			cityId : cityId,
			poll : poll,
			aimsMin : aimsMin,
			aimsMax : aimsMax
		},
		dataType : 'json',
		success : function(data) {
			var powerUnits = new Array();
			var operator = $('#power .powerContainer .drag');
			for ( var i in data) {
				var flag = false;
				for ( var k = 0; k < operator.length; k++) {
					if (operator[k].getAttribute('operatorId') == data[i].id) {
						flag = true;
						break;
					}
				}
				if (flag == false) {
					powerUnit = new Object();
					powerUnit.value = data[i].id;
					powerUnit.psCode = data[i].psName;
					powerUnit.psName = data[i].psName + ',' + data[i].unit + '号机组,' + data[i].installedMax + '万千瓦,'
							+ parseFloat(data[i].pollEffective).toFixed(2) + 'g/kwh';
					powerUnit.operatorType = '1';
					powerUnit.changeLessAmount = data[i].changeLessAmount;
					powerUnit.closeLessAmount = data[i].closeLessAmount;
					powerUnits.push(powerUnit);
				}
			}
			initPowerDrag(powerUnits);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}

function clearCon() {
	$('#source .drag').unbind('dblclick');
	$('#sourceholder').empty();
	$('#powerPer').combobox('setValue', '请选择');
	$('#powerInstall').combobox('setValue', '请选择');
	$('#cityQuery').combobox('setValue', '请选择');
}

/**
 * 合并 年份条件
 */
function initYearQuery(cityId, installed, effective, aimsMin, aimsMax) {
	var tabs = $('#yearTabs').tabs('getSelected');
	if (!tabs) {
		$.messager
				.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请先确定要操作的年份</div>', '提示信息');
		return;
	}
	var year = tabs.panel('options').title;
	for ( var i in years) {
		var yearCon = new Object();
		yearCon.cityIds = cityId;
		yearCon.installeds = installed;
		yearCon.effectives = effective;
		yearCon.aimsMin = aimsMin;
		yearCon.aimsMax = aimsMax;
		yearCondition[years[i]] = yearCon;
	}
}

/**
 * 格式化 电厂拖动组件
 * @param {Object} powerUnits
 */
function initPowerDrag(powerUnits) {
	$('#source .drag').unbind('dblclick');
	$('#sourceholder').empty();
	for ( var i in powerUnits) {
		var bean = powerUnits[i];
		var base = '<li  class="drag" style="width:auto;list-style-type:none;cursor:pointer;border-radius:5px;" title="双击选择或取消" operatorId="'
				+ bean.value
				+ '" changeAmount ="'
				+ bean.changeLessAmount
				+ '" closeAmount = "'
				+ bean.closeLessAmount
				+ '">' + '<span id="' + bean.psCode + '">' + bean.psName + '</span></li>';
		$('#sourceholder').append(base);
	}
	conditionDbClick();

	$('#yearTabs .tabs-inner').bind('click', function(e) {
		var text = $(e.target).find('.tabs-title').text();
		if (text === "") {
			text = $(e.target).text();
			if (text == "") {
				text = $(e.target).prev('span').text();
			}
		}
		var currentId = 'yearTabs' + text;
		if ($('#' + currentId + ' .drag').size() == 0) {
			$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
		} else {
			$('#exportbutton').removeAttr('disabled').css('background', '#39affe');
			$('#savebutton').removeAttr('disabled').css('background', '#39affe');
			$('#previewbutton').removeAttr('disabled').css('background', '#39affe');
		}
	})
}

/**
 * 预览超低排放曲线
 */
function preview() {
	var width = document.documentElement.clientWidth - 20;
	var height = document.documentElement.clientHeight - 20;
	$('#previewChart').css('width', width / 2);
	$('#previewChart').css('height', height / 2);
	var beginYear = $('#beginYear').combobox('getValue');
	var endYear = $('#endYear').combobox('getValue');
	var pollType = $('#poll').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../previewProgramBack',
		data : {
			years : years,
			pollType : pollType,
			changePowerUnit : JSON.stringify(changePowerUnit),
			closePowerUnit : JSON.stringify(closePowerUnit)
		},
		dataType : 'json',
		success : function(data) {
			option.xAxis.data = data.xAxis;
			option.series[0].data = data.before;
			option.series[1].data = data.after;
			option.series[2].data = data.less;
			option.series[3].data = data.installed;
			var myChart = echarts.init(document.getElementById('previewChart'));
			myChart.setOption(option);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});

	$('#previewChartDialog').show();
	$('#previewChartDialog').dialog( {
		title : '超低排放预览',
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		top : 20,
		buttons : [ {
			text : '完成',
			handler : function() {
				$('#previewChartDialog').dialog('close');
			}
		} ]
	});
}

/**
 * 预览超低排放曲线
 */
function saveProgram() {
	if (isUpdate == 0) {
		$('#saveProgram').show();
		$('#saveProgram')
				.dialog(
						{
							height : 270,
							width : 320,
							buttons : [
									{
										text : '确认',
										handler : function() {
											var width = document.documentElement.clientWidth - 20;
											var height = document.documentElement.clientHeight - 20;
											$('#previewChart').css('width', width / 2 - 100);
											$('#previewChart').css('height', height - 120);
											var name = $('#programName').val();
											if (name == '') {
												$.messager
														.alert(
																'提示信息',
																'<div style="height:50px;line-height:50px;margin-left:20px;">请输入方案名称</div>',
																'提示信息');
												return;
											}
											var description = $('#programDescription').val();
											var beginYear = $('#beginYear').combobox('getValue');
											var endYear = $('#endYear').combobox('getValue');
											var pollType = $('#poll').combobox('getValue');
											var changeUnit = JSON.stringify(changePowerUnit);
											var closeUnit = JSON.stringify(closePowerUnit);
											var yearCon = JSON.stringify(yearCondition);
											$.ajax( {
												type : 'get',
												url : '../saveProgramBack',
												data : {
													heading : encodeURI(encodeURI(name)),
													description : encodeURI(encodeURI(description)),
													beginYear : beginYear,
													endYear : endYear,
													years : years,
													pollType : pollType,
													changePowerUnit : changeUnit,
													closePowerUnit : closeUnit,
													yearCondition : yearCon
												},
												dataType : 'json',
												success : function(data) {
													var flag = data.flag;
													if (flag >= 0) {
														$.messager.alert('提示信息', '<span class="mes">保存方案成功</span>',
																'提示信息');
														getProgramBack();
													} else {
														$.messager.alert('提示信息', data.message, 'warning');
													}
												},
												error : function() {
													$.messager
															.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
												}
											});
											$('#saveProgram').dialog('close');
										}
									}, {
										text : '取消',
										handler : function() {
											$('#saveProgram').dialog('close');
										}
									} ]
						});
	} else {
		updateProgram();
	}
}

/**
 * 编辑快捷方案
 */
function updateProgram() {
	var changeUnit = JSON.stringify(changePowerUnit);
	var closeUnit = JSON.stringify(closePowerUnit);
	var yearCon = JSON.stringify(yearCondition);
	var pollType = $('#poll').combobox('getValue');
	$.ajax( {
		type : 'post',
		url : '../updateProgramBack',
		data : {
			pollType : pollType,
			years : years,
			programId : programId,
			changePowerUnit : changeUnit,
			closePowerUnit : closeUnit,
			yearCondition : yearCon
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				$.messager.alert('提示信息', '<span class="mes">更新方案成功</span>', '提示信息');
			} else {
				$.messager.alert('error', data.message, 'error');
			}
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}

/**
 * 导出 excel 方案
 */
function exportProgram() {
	var width = document.documentElement.clientWidth - 20;
	var height = document.documentElement.clientHeight - 20;
	$('#previewChart').css('width', width / 2 - 100);
	$('#previewChart').css('height', height - 120);
	var beginYear = $('#beginYear').combobox('getValue');
	var endYear = $('#endYear').combobox('getValue');
	var pollType = $('#poll').combobox('getValue');
	var changeUnit = JSON.stringify(changePowerUnit);
	var closeUnit = JSON.stringify(closePowerUnit);
	var yearCon = JSON.stringify(yearCondition);
	$.ajax( {
		type : 'get',
		url : '../exportProgramBack',
		data : {
			beginYear : beginYear,
			endYear : endYear,
			years : years,
			pollType : pollType,
			changePowerUnit : changeUnit,
			closePowerUnit : closeUnit,
			yearCondition : yearCon
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				$.messager.alert('提示信息', '<span class="mes">导出方案成功</span。');
				window.location.href = '../fileDownload?filePath=files&fileName=' + encodeURI(encodeURI(data.message));
			} else {
				$.messager.alert('提示信息', '<span class="mess">导出方案出错</span>', '提示信息')
			}
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});

}
/**
 * 添加tab 页面 预览 和 电厂操作
 * @return {TypeName} 
 */
function addTabsFunc() {
	var bgtime = $('#beginYear').combobox('getValue');
	var edtime = $('#endYear').combobox('getValue');
	if (bgtime == -1 || edtime == -1) {
		$.messager.alert("提示信息", "<div style='height:50px;line-height:50px;margin-left:20px;'>请先选择时间</div>",
				"<div style='height:50px;line-height:50px;margin-left:20px;'>请先选择年份</div>");
		return;
	}
	if (edtime < bgtime) {
		$.messager.alert("提示信息", "<div style='height:50px;line-height:50px;margin-left:20px;'>结束年份不能小于开始年份</div>",
				"提示信息");
		return;
	}
	var pollType = $('#poll').combobox('getValue');
	if (pollType == '-1') {
		$.messager.alert("提示信息", "<div style='height:50px;line-height:50px;margin-left:20px;'>请选择污染物</div>", "提示信息");
		return;
	}
	var allYearTabs = $('#yearTabs').children('.tabs-panels').children('div');
	for ( var i = 0; i < allYearTabs.length; i++) {
		// $('#allYearTabs').tabs('close', 0);
		$('#yearTabs').tabs('close', 0);
	}
	var height = document.documentElement.clientHeight - 220;
	for ( var i = bgtime; i <= edtime; i++) {
		var contentYear = '<div><div id="yearTabs'
				+ i
				+ '" class="powerContainer" style="width:99%;height:'
				+ height
				+ 'px;margin:0.5%;">'
				+ '</div>'
				+ '<div style="position:absolute;bottom:40px;height:36px;line-height:36px;color:#fff;width:100%;padding-left:10px;background:rgba(0,0,0,.5)">目标削减量:<input id="aimsYear'
				+ i
				+ '" class="easyui-textbox" style="width: 80px;height:28px;margin-top: 5px;"  />t&nbsp;&nbsp;&nbsp;'
				+ '实际削减量:<input id="actualYear' + i
				+ '" class="easyui-textbox" style="width: 80px;height:28px;margin-top: 5px;"  />t</div></div>';
		$('#yearTabs').tabs('add', {
			title : i.toString(),
			content : contentYear,
			closable : false
		});
		years.push(i);
		$('#aimsYear' + i).val('0');
		$('#actualYear' + i).val('0');
	}
	//修改高度
	$('#yearTabs').tabs('select', 0);
	// powerDrag();
	//条件置为不可用
	$('#beginYear').combobox("disable");
	$('#endYear').combobox("disable");
	$('#poll').combobox("disable");
	$('#confirmYear').attr('disabled', true).css('background', '#C0C0C0');
}

/**
 * 添加盟市信息
 */
function appendToPower() {
	var code = $('#companyCode').val();
	var name = $('#companyName').val();
	var num = $('#companyNum').val();
	var install = $('#companyInstall').val();
	var base = '<li  class="drag created" style="width:auto;list-style-type:none;background:#51ff00;"' + '">'
			+ '<span id="' + code + '">' + name + '</span></li>';
	var currenttitle = $('#power .tabs-selected .tabs-title').text();
	var currentId = 'yearTabs' + currenttitle;
	$('#' + currentId).append(base);
	$('#exportbutton').removeAttr('disabled').css('background', '#39affe');
	$('#savebutton').removeAttr('disabled').css('background', '#39affe');
	$('#previewbutton').removeAttr('disabled').css('background', '#39affe');
}
/**
 * 重置信息
 */
function resetYearFunc() {
	if (isUpdate == 1) {
		$.messager.confirm('重置条件', '<div style="height:50px;line-height:50px;margin-left:20px;">重置将清空已选机组，确认重置?</div>',
				function(result) {
					if (result) {
						$('#beginYear').combobox("enable");
						$('#endYear').combobox("enable");
						$('#poll').combobox("enable");
						$('#beginYear').combobox('setValue', '-1');
						$('#endYear').combobox('setValue', '-1');
						$('#poll').combobox('setValue', '-1');
						$('#myProgram').combobox('getValue', '-1');
						$('#confirmYear').removeAttr('disabled').css('background', '#39affe');
						$('#sourceholder').empty();
						$('#source .drag').unbind('dblclick');
						$('#sourceholder').empty();
						$('#powerPer').combobox('setValue', '-1');
						$('#powerInstall').combobox('setValue', '-1');
						$('#cityQuery').combobox('setValue', '-1');
						var allYearTabs = $('#yearTabs').children('.tabs-panels').children('div');
						for ( var i = 0; i < allYearTabs.length; i++) {
							$('#yearTabs').tabs('close', 0);
						}
						$('#myProgram').combobox('setValue', '-1');
						//重置信息
				changePowerUnit = new UtilMap();
				closePowerUnit = new UtilMap();
				years = new Array();
				yearCondition = new Object();
				isUpdate = 0;
			}
		});
	} else {
		$('#beginYear').combobox("enable");
		$('#endYear').combobox("enable");
		$('#poll').combobox("enable");
		$('#beginYear').combobox('setValue', '-1');
		$('#endYear').combobox('setValue', '-1');
		$('#poll').combobox('setValue', '-1');
		$('#myProgram').combobox('getValue', '-1');
		$('#confirmYear').removeAttr('disabled').css('background', '#39affe');
		$('#sourceholder').empty();
		$('#source .drag').unbind('dblclick');
		$('#sourceholder').empty();
		$('#powerPer').combobox('setValue', '-1');
		$('#powerInstall').combobox('setValue', '-1');
		$('#cityQuery').combobox('setValue', '-1');
		var allYearTabs = $('#yearTabs').children('.tabs-panels').children('div');
		for ( var i = 0; i < allYearTabs.length; i++) {
			$('#yearTabs').tabs('close', 0);
		}
		//重置信息
		changePowerUnit = new UtilMap();
		closePowerUnit = new UtilMap();
		years = new Array();
		yearCondition = new Object();
	}

}