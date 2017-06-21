$(document).ready(function() {
	getCity();
	initCityTable();
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

	$("#editCity").menu(
			{
				onClick : function(item) {
					var row = $('#cityTable').datagrid('getSelected');
					var id = row.id;
					if (!id || id == '' || id == null) {
						$.messager.alert('提示信息',
								'<div style="height:50px;line-height:50px;margin-left:20px;">请选择盟市信息</div>', '提示信息');
						return;
					}
					var name = item.name;
					if (name == 'edit') {
						edit(id);
					} else if (name == 'delete') {
						deleteCity(id);
					}
				}
			});
};
/**
 * 查询信息
 */
function query() {
	var queryCityName = $('#queryCityName').textbox('getValue');
	var queryDistributed = $('#queryDistributed').combobox('getValue');
	$.ajax( {
		type : 'post',
		url : '../queryCity',
		data : {
			queryCityName : queryCityName,
			queryDistributed : queryDistributed
		},
		dataType : 'json',
		success : function(data) {
			$('#cityTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('信息提示', '<div style="height:50px;line-height:50px;margin-left:20px;">获取信息失败</div>',
					'error');
		}
	});
}

/**
 * 添加 菜单权限
 */
function add() {
	$('#cityDialog').show();
	$('#cityDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 300,
		title : '添加盟市信息',
		width : 420,
		top : 150,
		buttons : [ {
			text : '确定',
			handler : function() {
				addCity();
				$('#cityDialog').dialog('close');
				$('#cityName').textbox('setValue', '');
				var data = $('#distributedType').combobox('getData');
				$("#distributedType ").combobox('select', data[0].value);
				$('#description').textbox('setValue', '');
			}
		}, {
			text : '取消',
			handler : function() {
				$('#cityDialog').dialog('close');
				$('#cityName').textbox('setValue', '');
				var data = $('#distributedType').combobox('getData');
				$("#distributedType ").combobox('select', data[0].value);
				$('#description').textbox('setValue', '');
			}
		} ]
	});
}

/**
 * 添加 菜单权限
 */
function edit(id) {
	$('#cityDialog').show();
	$.ajax( {
		url : '../getCityById',
		type : 'post',
		data : {
			id : id
		},
		dataType : 'json',
		success : function(data) {
			$('#cityName').textbox('setValue', data.cityName);
			$('#distributedType').textbox('setValue', data.distributed);
			$('#description').val(data.description);
		},
		error : function() {
			$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">数据加载失败</div>',
					'error');
		}
	});
	$('#cityDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 300,
		title : '编辑盟市信息',
		width : 460,
		top : 150,
		buttons : [ {
			text : '确定',
			handler : function() {
				editCity(id);
				$('#cityDialog').dialog('close');
				$('#cityName').textbox('setValue', '');
				var data = $('#distributedType').combobox('getData');
				$("#distributedType ").combobox('select', data[0].value);
				$('#description').val('');
			}
		}, {
			text : '取消',
			handler : function() {
				$('#cityDialog').dialog('close');
				$('#cityName').textbox('setValue', '');
				var data = $('#distributedType').combobox('getData');
				$("#distributedType ").combobox('select', data[0].value);
				$('#description').textbox('setValue', '');
			}
		} ]
	});
}

function deleteCity(id) {
	$.messager.confirm('删除用户', '<div style="height:50px;line-height:50px;margin-left:20px;">你确定删除该用户吗？</div>',
			function(result) {
				if (result) {
					$.ajax( {
						type : 'post',
						url : '../deleteCity',
						data : {
							id : id
						},
						dataType : 'json',
						success : function(data) {
							var flag = data.flag;
							if (flag == 0) {
								getCity();
								$.messager.alert('提示信息', '<span class="mes">删除成功</span>', '提示信息');
							} else {
								$.messager.alert('提示信息', data.Message, '提示信息');
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
function getCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			$('#cityTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}

/**
 * 添加盟市信息
 *
 */
function addCity() {
	var cityName = $('#cityName').val();
	var distributed = $('#distributedType').combobox('getValue');
	var description = $('#description').val();
	if (distributed == 'select') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择区域划分</div>', 'info');
		return;
	}
	$.ajax( {
		type : 'post',
		url : '../addCity',
		data : {
			cityName : cityName,
			distributed : distributed,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			getCity();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}

/**
 * 编辑盟市信息
 *
 */
function editCity(id) {
	var cityName = $('#cityName').textbox('getValue');
	var distributed = $('#distributedType').combobox('getValue');
	var description = $('#description').textbox('getValue');
	$.ajax( {
		type : 'post',
		url : '../editCity',
		data : {
			id : id,
			cityName : cityName,
			distributed : distributed,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">编辑成功</span>', '提示信息');
			}
			getCity();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">编辑失败</span>', '提示信息');
		}
	});
}