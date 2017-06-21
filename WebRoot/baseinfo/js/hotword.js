$(document).ready(function() {
	queryHotwordType();
});

/**
 * 查询信息
 */
function queryHotwordType() {
	$.ajax( {
		type : 'get',
		url : '../getHotwordType',
		dataType : 'json',
		success : function(data) {
			$('#hotwordTypeTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}

/**
 * 查询信息
 */
function queryHotword() {
	

	var name = $('#hotwordNameQuery').textbox('getValue');
	var description = $('#descriptionQuery').textbox('getValue');
	var typeId = $('#hotwordTypeQuery').combobox('getValue');
	$.ajax( {
		type : 'post',
		url : '../blurryHotword',
		data : {
			name : name,
			description : description,
			typeId : typeId
		},
		dataType : 'json',
		success : function(data) {
			$('#hotwordTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}
/**
 * 查询信息
 */
function queryHotwordPhrase() {
	var name = $('#hotwordPhraseNameQuery').textbox('getValue');
	var description = $('#descriptionPhraseQuery').textbox('getValue');
	$.ajax( {
		type : 'post',
		url : '../blurryHotPhrase',
		data : {
			name : name,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			$('#hotPhraseTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}

/**
 * 添加 菜单权限
 */
function addHotword() {
	getHotwordType();
	$('#hotwordDialog').show();
	$('#hotwordDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 300,
		title : '添加盟市信息',
		width : 440,
		top : 150,
		buttons : [ {
			text : '确定',
			handler : function() {
				insertHotword();
				$('#hotwordDialog').dialog('close');
				$('#name').textbox('setValue', '-1');
				var data = $('#hotwordType').combobox('getData');
				$("#hotwordType ").combobox('select', data[0].value);
				$('#description').textbox('setValue', '');
			}
		}, {
			text : '取消',
			handler : function() {
				$('#hotwordDialog').dialog('close');
				$('#name').textbox('setValue', '-1');
				var data = $('#hotwordType').combobox('getData');
				$("#hotwordType ").combobox('select', data[0].value);
				$('#description').textbox('setValue', '');
			}
		} ]
	});
}
/**
 * 添加 菜单权限
 */
function addHotwordType() {
	getHotwordType();
	$('#hotwordTypeDialog').show();
	$('#hotwordTypeDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 300,
		title : '添加热词类型',
		width : 440,
		top : 150,
		buttons : [ {
			text : '确定',
			handler : function() {
				insertHotwordType();
				$('#hotwordTypeDialog').dialog('close');
			}
		}, {
			text : '取消',
			handler : function() {
				$('#hotwordTypeDialog').dialog('close');
			}
		} ]
	});
}
/**
 * 添加 热词组
 */
function addHotPhrase() {
	$('#hotPhraseDialog').show();
	$('#hotPhraseDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 260,
		title : '添加热词',
		width : 420,
		top : 150,
		buttons : [ {
			text : '确定',
			handler : function() {
				insertHotPhrase();
				$('#hotPhraseDialog').dialog('close');
			}
		}, {
			text : '取消',
			handler : function() {
				$('#hotPhraseDialog').dialog('close');
			}
		} ]
	});
}

/**
 * 获取信息
 *
 */
function getHotwordType() {
	$.ajax( {
		type : 'get',
		url : '../getHotwordType',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.typeId = '-1';
			o.typeName = '请选择';
			value.unshift(o);
			$('#hotwordTypeQuery').combobox( {
				valueField : 'typeId',
				textField : 'typeName',
				data : value
			});
			$('#hotwordTypeQuery').combobox('setValue', '-1');
			$('#hotwordType').combobox( {
				valueField : 'typeId',
				textField : 'typeName',
				data : value
			});
			$('#hotwordType').combobox('setValue', '-1');
			$('#hotwordTypePre').combobox( {
				valueField : 'typeId',
				textField : 'typeName',
				data : value
			});
			$('#hotwordTypePre').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 * 添加热词信息
 *
 */
function insertHotword() {
	var name = $('#name').val();
	var hotwordType = $('#hotwordType').combobox('getValue');
	var description = $('#description').val();
	if (hotwordType == '-1') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择区域划分</div>', '提示信息');
		return;
	}
	$.ajax( {
		type : 'post',
		url : '../insertHotword',
		data : {
			name : name,
			hotwordType : hotwordType,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			queryHotword();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}
/**
 * 添加热词信息
 *
 */
function insertHotwordType() {
	var name = $('#nameType').val();
	var hotwordType = $('#hotwordTypePre').combobox('getValue');
	var description = $('#descriptionType').val();
	if (hotwordType == '-1') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择区域划分</div>', '提示信息');
		return;
	}
	$.ajax( {
		type : 'post',
		url : '../insertHotwordType',
		data : {
			name : name,
			hotwordType : hotwordType,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			queryHotword();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}
/**
 * 添加热词信息
 *
 */
function insertHotPhrase() {
	var name = $('#namePhrase').val();
	var description = $('#descriptionPhrase').val();
	if (name == '') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请输入名称</div>', '提示信息');
		return;
	}
	$.ajax( {
		type : 'post',
		url : '../insertHotPhrase',
		data : {
			name : name,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			queryHotword();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}

/**
 * 日期格式化
 * @param {Object} date
 * @return {TypeName} 
 */
function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + (m < 10 ? ('0' + m) : m) + '-' + (d < 10 ? ('0' + d) : d);
}