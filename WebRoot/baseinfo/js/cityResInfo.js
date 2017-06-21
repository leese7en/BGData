$(document).ready(function() {

	queryCity();
	getCityResInfo();
});

/**
 * 查询信息
 */
function query() {
	var year = $('#queryYear').combobox('getValue'); 
	$.ajax( {
		type : 'get',
		url : '../queryCityResInfo',
		data:{
		    year:year
	    },
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
			o.id = '';
			o.cityName = '请选择';
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
	$('#cityResInfoDialog').show();
	$('#cityResInfoDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		title:'添加区年度信息',
		height : 450,
		width : 400,
		top : 40,
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
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			query();
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}