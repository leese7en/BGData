$(document).ready(function() {
	getCountryPower();
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
				$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择权限</div>', '提示信息');
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
 * 查询
 */
function queryCountryPower() {

	var powerName = $('#powerNameQuery').val();

	$.ajax( {
		type : 'post',
		url : '../blurryPowerInfo',
		data : {
			powerName : powerName
		},
		dataType : 'json',
		success : function(data) {
			$('#countryPowerTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">查询失败</span>', '提示信息');
		}
	});

}


/**
 * 编辑 菜单权限
 */
function addCountryPower() {
	$('#countryPowerDialog').show();
	$('#countryPowerDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 380,
		width : 660,
		top : 150,
		buttons : [ {
			text : '确定',
			handler : function() {
				addCountryPowerInfo();
			}
		}, {
			text : '取消',
			handler : function() {
				$('#countryPowerDialog').dialog('close');
			}
		} ]
	});
}

/**
 *添加去年度信息
 *
 */
function addCountryPowerInfo() {
	var countryPowerYear = $('#countryPowerYear').combobox('getValue');
	var countryPowerType = $('#countryPowerType').combobox('getValue');
	var powerAmount = $('#powerAmount').val();
	var powerAmountIncrementRate = $('#powerAmountIncrementRate').val();
	var installedAmount = $('#installedAmount').val();
	var installedAmountIncrementRate = $('#installedAmountIncrementRate').val();
	var effectiveHour = $('#effectiveHour').val();
	var effectiveHourIncrementRate = $('#effectiveHourIncrementRate').val();
	var description = $('#description').val();
	$.ajax( {
		type : 'post',
		url : '../addCountryPowerInfo',
		data : {
			countryPowerYear : countryPowerYear,
			countryPowerType : countryPowerType,
			powerAmount : powerAmount,
			powerAmountIncrementRate : powerAmountIncrementRate,
			installedAmount : installedAmount,
			installedAmountIncrementRate : installedAmountIncrementRate,
			effectiveHour : effectiveHour,
			effectiveHourIncrementRate : effectiveHourIncrementRate,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			getCountryPowerInfo();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}


/**
 * 查询区和全国每年增长信息
 */

function getCountryPower() {
	$.ajax( {
		type : 'get',
		url : '../getCountryPower',
		dataType : 'json',
		success : function(data) {
			$('#countryPowerTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取信息失败</span>', '提示信息');
		}
	});
}
