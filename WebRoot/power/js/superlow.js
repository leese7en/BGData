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
		y : '10%',
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

var checkInstalled = new Array();
var checkEmission = new Array();

var changePowerUnit = new Object();
var closePowerUnit = new Object();
var newPowerUnit = new Object();
var years = new Array();
//当前是否处于 方案更新阶段
var isUpdate = 0;
//当前编辑方案的 id
var programId = 0;

/**
 * 每年的条件 集合
 */
var yearCondition = new Object();

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
 * 初始化内容
 */
$(document).ready(function() {
	initStyleInfo();
	init();
	getProgram();
});

/**
 * 修改组件的默认大小，适应窗体变化
 */
function initStyleInfo() {
	var height = document.documentElement.clientHeight - 130;
	$('#source').css('height', height + 'px');
	$('#power').css('height', height + 'px');
}
/**
 * 获取选中的装机容量
 * @return {TypeName} 
 */
function getInstalled() {
	var installedList = new Array();
	var list = $('#installedPower').find('input');
	var length = list.length;
	for ( var i = 0; i < length; i++) {
		var bean = list[i];
		if ($(bean).is(':checked')) {
			installedList.push($(bean).attr('name'));
		}
	}
	return installedList;
}
/**
 * 获取 对应污染物的排放绩效
 * @param {Object} param
 * @return {TypeName} 
 */
function getEmission(param) {
	var emissiondList = new Array();
	var list = $('#perPower').find('input');
	var length = list.length;
	for ( var i = 0; i < length; i++) {
		var bean = list[i];
		if ($(bean).is(':checked')) {
			emissiondList.push($(bean).attr('name'));
		}
	}
	return emissiondList;
}
function init() {
	$('.help-tip')
			.find('p')
			.html(
					'大数据平台提供条件筛选、组合工具，帮助用户形成多套超低排放实施预测方案，并可根据用户需求保存多套方案，功能包括：方案管理、新建方案、方案对比。操作说明：新建方案功能，可新建超低排放预测方案。进入页面后，可快捷选择系统保存的历史方案并进行编辑，也可编辑新方案。' + '选择左上方开始结束时间，污染物点击确定，到右上方，选择装机容量、盟市、排放绩效（条件都为多选），点击查询，此时右下方框内会出现符合条件的电厂，选择操作类型后双击电厂，电厂出现在左侧相应年份内，整改为黄色，关停是灰色；点击右侧操作类型旁的新建按钮，填入新建电厂信息，新建为绿色；制定方案之后点击预览，生成该方案执行后的预测趋势；该方案可保存，可导出，在左侧电厂列表上有快捷方案选择按钮，可选择保存过的方案。')
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
					console.log(values);
					if (values && values.length == 0) {
						values.push('-1');
						$('#cityQuery').combobox('setValues', values);
					}
				}
			});
			$('#cityQuery').combobox('setValue', '-1');
			$('#cityBelong').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value
			});
			$('#cityBelong').combobox('setValue', '-1');
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

			var html = '';
			for ( var i in data) {
				html += '<input class="installedPower" type="checkbox" name="' + data[i].content + '" />'
						+ data[i].content;
			}
			$('#installedPower').html(html);
		},
		error : function() {
			$.messager.alert('信息', '获取信息失败', 'info');
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
			var value = new Array();
			var o = new Object();
			o.id = '-1';
			o.content = '请选择';
			value.push(o);
			var html = '';
			for ( var i in data) {
				o = new Object();
				o.id = data[i].content;
				o.content = data[i].content + "g/kwh";
				value.push(o);
				html += '<input class="alarmRealRed" type="checkbox" name="' + data[i].content + '" />'
						+ data[i].content;
			}
			$('#perPower').html(html);
		},
		error : function() {
			$.messager.alert('信息', '获取信息失败', 'info');
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
			$.messager.alert('信息', '获取信息失败', 'info');
		}
	});
}
/**
 * 获取方案
 */
function getProgram() {
	$.ajax( {
		type : 'get',
		url : '../getProgram',
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
						if (!onlyCheckLength(newValue, '快捷方案')) {
							$('#myProgram').combobox('setValue', -1)
							return;

						}
						getProgramInfo(newValue);
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
 * 获取对应 方案的明细信息
 * @param {Object} programId
 */
function getProgramInfo(programId) {
	$.ajax( {
		type : 'get',
		url : '../getProgramInfo',
		data : {
			programId : programId
		},
		dataType : 'json',
		success : function(data) {
			initProgramInfo(data);
			isUpdate = 1;
		},
		error : function() {
			$.messager.alert('信息', '获取信息失败', 'info');
		}
	});
}
/**
 * 格式化 方案信息 并将其展示出来
 * @param {Object} data
 */
function initProgramInfo(data) {
	changePowerUnit = new Object();
	closePowerUnit = new Object();
	newPowerUnit = new Object();
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
		var psName = bean.psName + ',' + bean.unit + '号机组,' + bean.installedMax + '万千瓦,'
				+ parseFloat(bean.pollEffective).toFixed(2) + 'g/kwh';
		var base = '<li  class="drag" style="width:auto;list-style-type:none;cursor:pointer;border-radius:5px;" title="双击选择或取消" operatorId="'
				+ bean.id + '">' + '<span id="' + bean.psCode + '">' + psName + '</span></li>';
		var year = bean.year;
		var operate = bean.operatorType;
		if (operate == '0') {
			var newArray = newPowerUnit[year];
			if (!newArray) {
				newArray = new Array();
			}
			var object = new Object();
			object.cityId = bean.id;
			object.cityName = encodeURI(encodeURI(bean.cityName));
			object.psCode = bean.psCode;
			object.psName = encodeURI(encodeURI(bean.psName));
			object.unit = bean.unit;
			object.installed = bean.installedMax;
			newArray.push(object);
			newPowerUnit[year] = newArray;
		} else if (operate == '2') {
			var changeArray = changePowerUnit[year];
			if (!changeArray) {
				changeArray = new Array();
			}
			changeArray.push(bean.id);
			changePowerUnit[year] = changeArray;
		} else {
			var closeArray = closePowerUnit[year];
			if (!closeArray) {
				closeArray = new Array();
			}
			closeArray.push(bean.id);
			closePowerUnit[year] = closeArray;
		}

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
	$('#source .drag').bind('dblclick', function() {
		if ($('#power .powerContainer').size() == 0) {
			$.messager.alert('信息', '请先选择年份', 'info');
			return;
		}
		var operate = $('#operatorType').combobox('getValue');
		if (operate == 'select') {
			$.messager.alert('信息', '请选择操作类型', 'info');
			return;
		}
		var tabs = $('#yearTabs').tabs('getSelected');
		var year = tabs.panel('options').title;
		if (operate == 'change') {
			var changeArray = changePowerUnit[year];
			if (!changeArray) {
				changeArray = new Array();
			}
			changeArray.push($(this).attr('operatorId'));
			changePowerUnit[year] = changeArray;
		} else {
			var closeArray = closePowerUnit[year];
			if (!closeArray) {
				closeArray = new Array();
			}
			closeArray.push($(this).attr('operatorId'));
			closePowerUnit[year] = closeArray;
		}

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
		var currenttitle = $('#power .tabs-selected .tabs-title').text();
		var currentId = 'yearTabs' + currenttitle;
		if ($('#' + currentId + ' .drag').size() == 0) {
			$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
		}
		var tabs = $('#yearTabs').tabs('getSelected');
		var year = tabs.panel('options').title;
		var operatorId = $(this).attr('operatorId');
		/**
		 * 整改
		 * @return {TypeName} 
		 */
		var changeArray = changePowerUnit[year];
		var change = new Array();
		for ( var i in changeArray) {
			if (changeArray[i] != operatorId) {
				change.push(changeArray[i]);
			} else {
				$(this).remove().appendTo($('#source')).css('backgroundColor', '#AACCFF');
			}
		}
		changePowerUnit[year] = change;
		/**
		 * 关停
		 * @return {TypeName} 
		 */
		var closeArray = closePowerUnit[year];
		var close = new Array();
		for ( var i in closeArray) {
			if (closeArray[i] != operatorId) {
				close.push(closeArray[i]);
			} else {
				$(this).remove().appendTo($('#source')).css('backgroundColor', '#AACCFF');
			}
		}
		closePowerUnit[year] = close;
		/**
		 * 新建
		 * @return {TypeName} 
		 */
		var newArray = newPowerUnit[year];
		var news = new Array();
		for ( var i in newArray) {
			if (newArray[i].cityId != operatorId) {
				news.push(newArray[i]);
			} else {
				$(this).remove();
			}
		}
		newPowerUnit[year] = news;
		conditionDbClick();
	});
}
/**
 * 将所有的数据移动到 年份区间中
 */
function addCompanyAll() {
	var powerUnits = $('#source .drag');
	if (powerUnits.length <= 0) {
		$.messager.alert('信息', '没有可操作的电厂机组', 'info');
		return;
	}
	if ($('#power .powerContainer').size() == 0) {
		$.messager.alert('信息', '请先选择年份', 'info');
		return;
	}
	var operate = $('#operatorType').combobox('getValue');
	if (operate == 'select') {
		$.messager.alert('信息', '请选择操作类型', 'info');
		return;
	}
	var tabs = $('#yearTabs').tabs('getSelected');
	var year = tabs.panel('options').title;

	var currenttitle = $('#power .tabs-selected .tabs-title').text();
	var currentId = 'yearTabs' + currenttitle;
	var color = '#d3d3d3';
	if (operate == 'change') {
		color = '#ffe500';
	}

	if (operate == 'change') {
		var changeArray = changePowerUnit[year];
		if (!changeArray) {
			changeArray = new Array();
		}
		for ( var i = 0; i < powerUnits.length; i++) {
			var powerUnit = powerUnits[i];
			changeArray.push($(powerUnit).attr('operatorId'));
			$(powerUnit).remove().appendTo($('#' + currentId)).css('backgroundColor', color);
		}
		changePowerUnit[year] = changeArray;
	} else {
		var closeArray = closePowerUnit[year];
		if (!closeArray) {
			closeArray = new Array();
		}
		for ( var i = 0; i < powerUnits.length; i++) {
			var powerUnit = powerUnits[i];
			closeArray.push($(powerUnit).attr('operatorId'));
			$(powerUnit).remove().appendTo($('#' + currentId)).css('backgroundColor', color);
		}
		closePowerUnit[year] = closeArray;
	}

	$('#exportbutton').removeAttr('disabled').css('background', '#39affe');
	$('#savebutton').removeAttr('disabled').css('background', '#39affe');
	$('#previewbutton').removeAttr('disabled').css('background', '#39affe');
	resultDbClick();
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
	if (powerUnits.length <= 0) {
		$.messager.alert('信息', '当前年份没有需要操作的数据', 'info');
		return;
	}
	for ( var i = 0; i < powerUnits.length; i++) {
		var powerUnit = powerUnits[i];
		$(powerUnit).remove().appendTo($('#sourceholder')).css('backgroundColor', '#AACCFF');
		if ($('#' + currentId + ' .drag').size() == 0) {
			$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
		}
		var operatorId = $(powerUnit).attr('operatorId');
		var changeArray = changePowerUnit[year];
		var change = new Array();
		for ( var j in changeArray) {
			if (changeArray[j] != operatorId) {
				change.push(changeArray[j]);
			}
		}
		changePowerUnit[year] = change;
		var closeArray = closePowerUnit[year];
		var close = new Array();
		for ( var j in closeArray) {
			if (closeArray[j] != operatorId) {
				close.push(closeArray[j]);
			}
		}

		closePowerUnit[year] = close;
		var newArray = newPowerUnit[year];
		var news = new Array();
		for ( var j in newArray) {
			if (newArray[j] != operatorId) {
				news.push(newArray[j]);
			}
		}
		newPowerUnit[year] = news;
		conditionDbClick();
	}
}
/**
 * 预览超低排放曲线
 */
function query() {
	var cityId = $('#cityQuery').combobox('getValues');
	if (cityId.length == 1 && cityId[0] == '-1') {
		$.messager.alert('信息', '请选择城市', 'info');
		return;
	}
	if (cityId[0] == '-1') {
		cityId.splice(0, 1);
	}
	var installed = getInstalled();
	if (installed.length < 1) {
		$.messager.alert('信息', '请选择装机容量', 'info');
		return;
	}
	var effective = getEmission();
	if (effective.length < 1) {
		$.messager.alert('信息', '请选择装机排放绩效', 'info');
		return;
	}
	var poll = $('#poll').combobox('getValue');

	var conditionSel = initYearQuery(cityId, installed, effective);
	if (conditionSel == false) {
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getSuperLow',
		data : {
			installed : installed,
			effective : effective,
			cityId : cityId,
			poll : poll
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
					powerUnits.push(powerUnit);
				}
			}
			$('#sourceholder').empty();
			initPowerDrag(powerUnits);
		},
		error : function() {
			$.messager.alert('信息', '获取信息失败', 'info');
		}
	});
}

/**
 * 清空查询条件
 */
function clearCon() {
	$('#source .drag').unbind('dblclick');
	$('#sourceholder').empty();
	$('#cityQuery').combobox('setValue', '-1');
	$('.alarmRealRed').attr('checked', false);
	$('.installedPower').attr('checked', false);
}

/**
 * 合并 年份条件
 */
function initYearQuery(cityId, installed, effective) {
	var tabs = $('#yearTabs').tabs('getSelected');
	if (!tabs) {
		$.messager.alert('信息', '请先确定要操作的年份', 'info');
		return false;
	}
	var year = tabs.panel('options').title;
	for ( var i in years) {
		var yearCon = new Object();
		yearCon.cityIds = cityId;
		yearCon.installeds = installed;
		yearCon.effectives = effective;
		yearCondition[years[i]] = yearCon;
	}
}

/**
 * 格式化 电厂拖动组件
 * @param {Object} powerUnits
 */
function initPowerDrag(powerUnits) {
	for ( var i in powerUnits) {
		var bean = powerUnits[i];
		var base = '<li  class="drag" style="width:auto;list-style-type:none;cursor:pointer;border-radius:5px;" title="双击选择或取消" operatorId="'
				+ bean.value + '">' + '<span id="' + bean.psCode + '">' + bean.psName + '</span></li>';
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
	});
}

/**
 * 预览超低排放曲线
 */
function saveProgram() {
	if (isUpdate == 0) {
		$('#saveProgram').show();
		$('#saveProgram').dialog( {
			height : 260,
			width : 460,
			buttons : [ {
				text : '确认',
				handler : function() {
					var width = document.documentElement.clientWidth - 20;
					var height = document.documentElement.clientHeight - 20;
					$('#previewChart').css('width', width);
					$('#previewChart').css('height', height);
					var name = $('#programName').val();
					if (name == '') {
						$.messager.alert('信息', '请输入方案名称', 'info');
						return;
					}
					var description = $('#programDescription').val();
					var beginYear = $('#beginYear').combobox('getValue');
					var endYear = $('#endYear').combobox('getValue');
					var pollType = $('#poll').combobox('getValue');
					var changeUnit = JSON.stringify(changePowerUnit);
					var closeUnit = JSON.stringify(closePowerUnit);
					var newUnit = JSON.stringify(newPowerUnit);
					var yearCon = JSON.stringify(yearCondition);
					$.ajax( {
						type : 'post',
						url : '../saveProgram',
						data : {
							heading : encodeURI(encodeURI(name)),
							description : encodeURI(encodeURI(description)),
							beginYear : beginYear,
							endYear : endYear,
							years : years,
							pollType : pollType,
							changePowerUnit : changeUnit,
							closePowerUnit : closeUnit,
							newPowerUnit : newUnit,
							yearCondition : yearCon
						},
						dataType : 'json',
						success : function(data) {
							var flag = data.flag;
							if (flag >= 0) {
								$.messager.alert('信息', '保存方案成功', 'info');
								getProgram();
							} else {
								$.messager.alert('信息', data.message, 'info');
							}
						},
						error : function() {
							$.messager.alert('信息', '获取信息失败', 'info');
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
	var newUnit = JSON.stringify(newPowerUnit);
	var yearCon = JSON.stringify(yearCondition);
	var pollType = $('#poll').combobox('getValue');
	$.ajax( {
		type : 'post',
		url : '../updateProgram',
		data : {
			pollType : pollType,
			years : years,
			programId : programId,
			changePowerUnit : changeUnit,
			closePowerUnit : closeUnit,
			newPowerUnit : newUnit,
			yearCondition : yearCon
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				$.messager.alert('信息', '更新方案成功', 'info');
			} else {
				$.messager.alert('错误', data.message, 'error');
			}
		},
		error : function() {
			$.messager.alert('错误', '获取信息失败', 'error');
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
	var newUnit = JSON.stringify(newPowerUnit);
	var yearCon = JSON.stringify(yearCondition);
	$.ajax( {
		type : 'get',
		url : '../exportProgram',
		data : {
			beginYear : beginYear,
			endYear : endYear,
			years : years,
			pollType : pollType,
			changePowerUnit : changeUnit,
			closePowerUnit : closeUnit,
			newPowerUnit : newUnit,
			yearCondition : yearCon
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag >= 0) {
				$.messager.alert('信息', '导出方案成功');
				window.location.href = '../fileDownload?filePath=files&fileName=' + encodeURI(encodeURI(data.message));
			} else {
				$.messager.alert('错误', '导出方案出错', 'error');
			}
		},
		error : function() {
			$.messager.alert('错误', '获取信息失败', 'error');
		}
	});
}
/**
 * 预览超低排放曲线
 */
function preview() {
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	$('#previewChart').css('width', width / 2 - 50);
	$('#previewChart').css('height', height - 280);
	var pollType = $('#poll').combobox('getValue');
	var changeUnit = JSON.stringify(changePowerUnit);
	var closeUnit = JSON.stringify(closePowerUnit);
	var newUnit = JSON.stringify(newPowerUnit);
	$.ajax( {
		type : 'get',
		url : '../previewProgram',
		data : {
			years : years,
			pollType : pollType,
			changePowerUnit : changeUnit,
			closePowerUnit : closeUnit,
			newPowerUnit : newUnit
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
		title : "超低排放预览",
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		width : width / 2,
		height : height - 180,
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
 * 添加tab 页面 预览 和 电厂操作
 * @return {TypeName} 
 */
function addTabsFunc() {
	var bgtime = $('#beginYear').combobox('getValue');
	var edtime = $('#endYear').combobox('getValue');
	if (bgtime == -1 || edtime == -1) {
		$.messager.alert("信息", "请先选择年份", 'info');
		return;
	}
	if (edtime < bgtime) {
		$.messager.alert("信息", "结束时间不能早于开始时间", "info");
		return;
	}
	var pollType = $('#poll').combobox('getValue');
	if (pollType == '-1') {
		$.messager.alert("信息", "请选择污染物", "info");
		return;
	}
	var allYearTabs = $('#yearTabs').children('.tabs-panels').children('div');
	for ( var i = 0; i < allYearTabs.length; i++) {
		// $('#allYearTabs').tabs('close', 0);
		$('#yearTabs').tabs('close', 0);
	}
	var height = document.documentElement.clientHeight - 200;
	for ( var i = bgtime; i <= edtime; i++) {
		var contentYear = '<div id="yearTabs' + i + '" class="powerContainer" style="width:99%;height:' + height
				+ 'px;float:left;margin:0.5%;"></div>';
		$('#yearTabs').tabs('add', {
			title : i.toString(),
			content : contentYear,
			closable : false
		});
		years.push(i);
	}
	$('#yearTabs').tabs('select', 0);

	//条件置为不可用
	$('#beginYear').combobox("disable");
	$('#endYear').combobox("disable");
	$('#poll').combobox("disable");
	$('#confirmYear').attr('disabled', true).css('background', '#C0C0C0');

	var cityId = $('#cityQuery').combobox('getValues');
	var installed = getInstalled();
	var effective = getEmission();
	var poll = $('#poll').combobox('getValue');
	/**
	 * 初始化条件
	 * @return {TypeName} 
	 */
	initYearQuery(cityId, installed, effective);

}

/**
 * 添加新的电厂
 */
function addNewCompany() {
	if ($('#power .powerContainer').size() == 0) {
		$.messager.alert('信息', '请先选择年份', 'info');
		return;
	}
	initPowerDrag();
	$('#companyDialog').show();
	$('#companyDialog').dialog( {
		height : 320,
		width : 320,
		buttons : [ {
			text : '确认',
			handler : function() {
				if (!checkInput()) {
					return;
				}
				appendToPower();
			}
		}, {
			text : '取消',
			handler : function() {
				$('#companyDialog').dialog('close');
			}
		} ]
	});
}

function checkInput() {
	if (!onlyNumberAndLength($('#companyCode').val(), '电厂编码')) {
		return false
	}
	if (!onlyCheckLength($('#companyName').val(), '电厂名称')) {
		return false
	}
	if (!onlyNumberAndLength($('#companyNum').val(), "机组编号")) {
		return false
	}
	if (!onlyNumberAndLength($('#companyInstall').val(), "装机容量")) {
		return false
	}
	return true
}

/**
 * 将新建的电厂信息保存下来
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function appendToPower() {
	var cityId = $('#cityBelong').combobox('getValue');
	if (cityId == '-1') {
		$.messager.alert('warning', '请选择盟市', '警告');
		return;
	}
	var cityName = $('#cityBelong').combobox('getText');
	var code = $('#companyCode').val();
	var name = $('#companyName').val();
	var num = $('#companyNum').val();
	var tabs = $('#yearTabs').tabs('getSelected');
	var year = tabs.panel('options').title;
	var newArray = newPowerUnit[year];
	var news = new Array();
	for ( var i in newArray) {
		if (newArray[i].psName == name&&newArray[i].unit ==num) {
			$.messager.alert('错误', '名称和机组不能一样','error');
			return;
		}
	}
	var install = $('#companyInstall').val();
	var tabs = $('#yearTabs').tabs('getSelected');
	if (code == "" || name == "") {
		$.messager.alert('信息', '请填写必要信息','info');
		return;
	}
	var year = tabs.panel('options').title;
	var newArray = newPowerUnit[year];
	if (!newArray) {
		newArray = new Array();
	}
	var object = new Object();

	var pollType = $('#poll').combobox('getValue');
	object.cityId = cityId;
	object.cityName = encodeURI(encodeURI(cityName));
	object.psCode = code;
	object.psName = name;
	object.unit = num;
	object.installed = install;
	object.pollEffective = pollEffective(pollType);
	newArray.push(object);
	newPowerUnit[year] = newArray;
	var base = '<li  class="drag created" style="width:auto;list-style-type:none;background:#51ff00;border-radius:5px"'
			+ '" unit="' + num + '" name ="'+name+'" >' + '<span >' + name + ',' + num + '号机组,' + install + '万千瓦' + ','
			+ object.pollEffective + 'g/kWh</span></li>';
	var currenttitle = $('#power .tabs-selected .tabs-title').text();
	var currentId = 'yearTabs' + currenttitle;
	$('#' + currentId).append(base);
	$('#power .created').bind('dblclick', function() {

		var unit = $(this).attr('unit');
		var name = $(this).attr('name');
		var tabs = $('#yearTabs').tabs('getSelected');
		var year = tabs.panel('options').title;
		var currenttitle = $('#power .tabs-selected .tabs-title').text();
		var currentId = 'yearTabs' + currenttitle;
		var powerUnits = $('#' + currentId + ' .drag');
		
		var newArray = newPowerUnit[year];
		var news = new Array();
		for ( var i in newArray) {
			if (newArray[i].unit != unit||newArray[i].psName !=name) {
				news.push(newArray[i]);
			} else {
				$(this).remove();
			}
		}
		newPowerUnit[year] = news;
		$(this).remove();
		if (!powerUnits || powerUnits.size() == 0) {
			$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
			$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
		}
	});
	$('#exportbutton').removeAttr('disabled').css('background', '#39affe');
	$('#savebutton').removeAttr('disabled').css('background', '#39affe');
	$('#previewbutton').removeAttr('disabled').css('background', '#39affe');
	$('#companyDialog').dialog('close');
}
/**
 * 重置 主查询条件
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
						$('#myProgram').combobox('setValue', '-1');
						$('#cityQuery').combobox('setValue', '-1');
						$('.alarmRealRed').attr('checked', false);
						$('#confirmYear').removeAttr('disabled').css('background', '#39affe');
						//重置信息
				changePowerUnit = new Object();
				closePowerUnit = new Object();
				newPowerUnit = new Object();
				years = new Array();
				yearCondition = new Object();
				$('#sourceholder').empty();
				var allYearTabs = $('#yearTabs').children('.tabs-panels').children('div');
				for ( var i = 0; i < allYearTabs.length; i++) {
					$('#yearTabs').tabs('close', 0);
				}
				isUpdate = 0;
				$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
				$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
				$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
			}
		});
	} else {
		$('#beginYear').combobox("enable");
		$('#endYear').combobox("enable");
		$('#poll').combobox("enable");
		$('#beginYear').combobox('setValue', '-1');
		$('#endYear').combobox('setValue', '-1');
		$('#poll').combobox('setValue', '-1');
		$('#cityQuery').combobox('setValue', '-1');
		$('.alarmRealRed').attr('checked', false);
		$('#perPower')
		$('#myProgram').combobox('getValue', '-1');
		$('#confirmYear').removeAttr('disabled').css('background', '#39affe');
		$('#sourceholder').empty();
		var allYearTabs = $('#yearTabs').children('.tabs-panels').children('div');
		for ( var i = 0; i < allYearTabs.length; i++) {
			$('#yearTabs').tabs('close', 0);
		}
		//重置信息
		changePowerUnit = new Object();
		closePowerUnit = new Object();
		newPowerUnit = new Object();
		years = new Array();
		yearCondition = new Object();
		$('#exportbutton').attr('disabled', true).css('background', '#C0C0C0');
		$('#savebutton').attr('disabled', true).css('background', '#C0C0C0');
		$('#previewbutton').attr('disabled', true).css('background', '#C0C0C0');
	}
}
/**
 * 获取污染物的 排放绩效
 * @param {Object} installed
 * @param {Object} pollType
 */
function pollEffective(pollType) {
	var concen = 35;
	if (pollType == 'NOx') {
		concen = 50;
	} else if (pollType == 'dust') {
		concen = 10;
	}
	var sum = 26 * concen / 0.56 / 10000;
	return sum.toFixed(2);

}
