$(document).ready(function() {
	initTable();
});
/**
 *初始化 用户信息
 */
function initCityTable() {
	//数据一览
	$('#cityTable').datagrid( {
		onRowContextMenu : function(e, rowIndex, rowData) { //右键时触发事件
				//三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
				e.preventDefault(); //阻止浏览器捕获右键事件
				$(this).datagrid("clearSelections"); //取消所有选中项
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				$('#editCity').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('id', rowData.ID);
			}
		});

	$("#editCity").menu( {
		onClick : function(item) {
			var row = $('#cityTable').datagrid('getSelected');
			var id = row.psCode;
			if (!id || id == '' || id == null) {
				$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择权限</div>', 'error');
				return;
			}
			var name = item.name;
			if (name == 'edit') {
				editCityBasic(id);
			} else if (name == 'delete') {
				deleteCity(id);
			}
		}
	});
};

/**
 * 查询变电站信息
 */
function queryPower() {

	var powerName = $('#powerNameQuery').val();

	$.ajax( {
		type : 'post',
		url : '../blurryPowerInfo',
		data : {
			powerName : powerName
		},
		dataType : 'json',
		success : function(data) {
			$('#powerTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">查询失败</span>', '提示信息');
		}
	});

}

/**
 * 查询电网信息
 */
function queryPowerNetwork() {

	var powerNetworkBeginName = $('#powerNetworkBeginNameQuery').val();
	var powerNetworkEndName = $('#powerNetworkEndNameQuery').val();

	$.ajax( {
		type : 'post',
		url : '../blurryPowerNetworkInfo',
		data : {
			powerNetworkBeginName : powerNetworkBeginName,
			powerNetworkEndName : powerNetworkEndName
		},
		dataType : 'json',
		success : function(data) {
			$('#powerNetworkTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">删除失败</span>', '提示信息');
		}
	});

}

/**
 * 编辑 菜单权限
 */
function addPower() {
	$('#powerDialog').show();
	$('#powerDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 300,
		width : 400,
		top : 50,
		buttons : [ {
			text : '确定',
			handler : function() {
				addPowerInfo();
			}
		}, {
			text : '取消',
			handler : function() {
				$('#powerDialog').dialog('close');
			}
		} ]
	});
}
/**
 * 编辑 菜单权限
 */
function addPowerNetwork() {
	queryPowerInfo();
	$('#powerNetworkDialog').show();
	$('#powerNetworkDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 300,
		width : 400,
		top : 50,
		buttons : [ {
			text : '确定',
			handler : function() {
				addPowerNetworkInfo();
			}
		}, {
			text : '取消',
			handler : function() {
				$('#powerNetworkDialog').dialog('close');
			}
		} ]
	});
}

function deleteCity(id) {
	$.messager.confirm('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">你确定删除该用户吗？</div>', function(result) {
		if (result) {
			$.ajax( {
				type : 'post',
				url : '../deleteUser',
				data : {
					userId : userId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag == 0) {
						query();
						$.messager.alert('提示信息', '<span class="mes">删除成功</span>', '提示信息');
					} else {
						$.messager.alert('error', data.Message, 'error');
					}
				},
				error : function() {
					$.messager.alert('提示信息', '<span class="mess">删除失败</span>', '提示信息');
				}
			});
		}
	});

}

/**
 * 获取信息
 *
 */
function addPowerInfo() {
	var powerName = $('#powerName').val();
	var powerLongitude = $('#powerLongitude').val();
	var powerLatitude = $('#powerLatitude').val();
	var description = $('#powerDescription').val();
	$.ajax( {
		type : 'post',
		url : '../addPowerInfo',
		data : {
			powerName : powerName,
			powerLongitude : powerLongitude,
			powerLatitude : powerLatitude,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			query();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}

/**
 * 添加电网信息
 *
 */
function addPowerNetworkInfo() {
	var year = $('#networkYear').combobox('getValue');
	var networkBeginPower = $('#networkBeginPower').combobox('getValue');
	var networkEndPower = $('#networkEndPower').combobox('getValue');
	var description = $('#networkDescription').val();
	$.ajax( {
		type : 'post',
		url : '../addPowerNetworkInfo',
		data : {
			year : year,
			networkBeginPower : networkBeginPower,
			networkEndPower : networkEndPower,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			query();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}

/**
 * 获取满足条件的变电站
 */

function queryPowerInfo() {
	$.ajax( {
		type : 'get',
		url : '../getPowerInfo',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.bname = '请选择';
			value.unshift(o);
			$('#networkBeginPower').combobox( {
				valueField : 'id',
				textField : 'bname',
				data : value
			});
			$('#networkEndPower').combobox( {
				valueField : 'id',
				textField : 'bname',
				data : value
			});
		},
		error : function() {

		}
	});

}