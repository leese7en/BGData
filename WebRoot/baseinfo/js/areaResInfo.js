$(document).ready(function() {
	query();
	queryCity();
});

/**
 * 查询信息
 */
function query() {
	getAreaResInfo();
}

/**
 * 添加 下拉框
 * @return
 */
function queryCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.id = '0';
			o.cityName = '全国';
			o.id = '1';
			o.cityName = '全区';
			value.unshift(o);
			$('#city').combobox( {
				valueField : 'id',
				textField : 'cityName',
				data : value
			});
		},
		error : function() {

		}
	});
}
/**
 * 编辑 菜单权限
 */
function add() {
	$('#areaResInfoDialog').show();
	$('#areaResInfoDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 400,
		width : 400,
		top : 80,
		buttons : [ {
			text : '确定',
			handler : function() {
				addAreaResInfo();
			}
		}, {
			text : '取消',
			handler : function() {
				$('#areaResInfoDialog').dialog('close');
			}
		} ]
	});
}

/**
 * 获取信息
 *
 */
function getAreaResInfo() {
	var year = $('#queryYear').combobox('getValue');
	$.ajax( {
		type : 'get',
		url : '../getAreaInfo',
		data : {
			year : year
		},
		dataType : 'json',
		success : function(data) {
			$('#areaResInfoTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager
					.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">获取信息失败</div>', '提示信息');
		}
	});
}

/**
 * 获取信息
 *
 */
function addAreaResInfo() {
	var year = $('#year').combobox('getValue');
	if (year == '-1') {
		$.messager.alert('warning', '请选择年份', 'warning');
		return;
	}
	var cityId = $('#city').combobox('getValue');
	var fireInstalled = $('#fireInstalled').val();
	var windInstalled = $('#windInstalled').val();
	var otherInstalled = $('#otherInstalled').val();
	var firePower = $('#firePower').val();
	var windPower = $('#windPower').val();
	var otherPower = $('#otherPower').val();
	var GDP = $('#GDP').val();
	$.ajax( {
		type : 'post',
		url : '../addAreaResInfo',
		data : {
			year : year,
			cityId : cityId,
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
				$.messager.alert('提示信息', '<span class="mes">添加成功</span', '提示信息');
			}
			query();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}