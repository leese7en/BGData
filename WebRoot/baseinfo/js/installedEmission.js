$(document).ready(function() {

	query();
		//initBaseInfoTable();
	});
/**
 *初始化 用户信息
 */
function initBaseInfoTable() {
	//数据一览
	$('#installedEmissionTable').datagrid( {
		onRowContextMenu : function(e, rowIndex, rowData) { //右键时触发事件
				//三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
				e.preventDefault(); //阻止浏览器捕获右键事件
				$(this).datagrid("clearSelections"); //取消所有选中项
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				$('#editInstalledEmission').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('id', rowData.ID);
			}
		});

	$("#editBaseInfo").menu( {
		onClick : function(item) {
			var row = $('#baseInfoTable').datagrid('getSelected');
			var id = row.psCode;
			if (!id || id == '' || id == null) {
				$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择权限</div>', '提示信息');
				return;
			}
			var name = item.name;
			if (name == 'basic') {
				showBaseInfoBasic(id);
			} else if (name == 'delete') {
				deleteInstalledEmission(id);
			}
		}
	});
};
/**
 * 查询信息
 */
function query() {
	getInstalledEmission();
}

/**
 * 编辑 菜单权限
 */
function add() {
	$('#installedEmissionDialog').show();
	//给下拉框绑定事件
	setUnit();
	
	$('#installedEmissionDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 220,
		width : 320,
		top : 150,
		buttons : [ {
			text : '确定',
			handler : function() {
				addInstalledEmission();
				$('#installedEmissionDialog').dialog('close');
				var data = $('#addInstalledOrEmission').combobox('getData');
				 $("#addInstalledOrEmission ").combobox('select',data[0].value);
				$('#addMax').textbox('setValue','');
				$('#addMin').textbox('setValue','');
			}
		}, {
			text : '取消',
			handler : function() {
				$('#installedEmissionDialog').dialog('close');
				var data = $('#addInstalledOrEmission').combobox('getData');
				 $("#addInstalledOrEmission ").combobox('select',data[0].value);
				$('#addMax').textbox('setValue','');
				$('#addMin').textbox('setValue','');
			}
		} ]
	});
}

/**
 * 给不同的污染物设置不同的单位
 * @return
 */
function setUnit(){
	var data= [{text : "请选择", value : "select"},
               {text : "SO2", value : "SO2"},
               {text : "NOx", value : "NOx"},
               {text : "粉尘", value : "粉尘"},
               {text : "装机容量", value : "-1"}];
	$('#addInstalledOrEmission').combobox({
		data:data,
		onLoadSuccess:function(){
		var data = $('#addInstalledOrEmission').combobox('getData');
		$("#addInstalledOrEmission").combobox('select',data[0].value);
		},
		onChange: function (newValue, oldValue) {
		if(newValue=="select"){	
			$("#unit").html("");
			$("#unit1").html("");
        }else if(newValue=="SO2"){	
			$("#unit").html("g/kwh");
			$("#unit1").html("g/kwh");
        }else if(newValue=="NOx"){	
        	$("#unit").html("g/kwh");
        	$("#unit1").html("g/kwh");
        }else if(newValue=="粉尘"){	
        	$("#unit").html("g/kwh");
        	$("#unit1").html("g/kwh");
        }else if(newValue=="-1"){	
        	$("#unit").html("MW");
        	$("#unit1").html("MW");
        }
		}
		});
}

function deleteInstalledEmission(id) {
	$.messager.confirm('删除用户', '<div style="height:50px;line-height:50px;margin-left:20px;">你确定删除该用户吗？</div>', function(result) {
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
function getInstalledEmission() {
	var type = $('#installedOrEmission').combobox('getValue');
	if (type == 'select') {
		$.messager.alert('提示信息', '请选择查询类别', '提示信息');
		return;
	}
	var pollutantCode;
	if (type == 'select') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择查询类别</div>', '提示信息');
		return;
	}else if(type == 'SO2'){
		pollutantCode = '002';
	}else if(type == 'NOx'){
		pollutantCode = '003';
	}else if(type == '粉尘'){
		pollutantCode = '001';
	}
	var operatorType = 2;
	if (type == '-1') {
		operatorType = 1;
	}
	$.ajax( {
		type : 'get',
		url : '../getInstalledEmission',
		data : {
		    pollutantCode:pollutantCode,
			operatorType : operatorType
		},
		dataType : 'json',
		success : function(data) {
			$('#installedEmissionTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('error', data.Message, 'error');
		}
	});
}

/**
 * 添加区间信息
 *
 */
function addInstalledEmission() {
	var type = $('#addInstalledOrEmission').combobox('getValue');
	var max = $('#addMax').textbox('getValue');
	var min = $('#addMin').textbox('getValue');
    var pollutantCode;
	if (type == 'select') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择查询类别</div>', '提示信息');
		return;
	}else if(type == 'SO2'){
		pollutantCode = '002';
	}else if(type == 'NOx'){
		pollutantCode = '003';
	}else if(type == '粉尘'){
		pollutantCode = '001';
	}
	
	var operatorType = 2;
	if (type == '-1') {
		operatorType = 1;
	}
	$.ajax( {
		type : 'post',
		url : '../addInstalledEmission',
		data : {
		    pollutantCode:pollutantCode,
			operatorType : operatorType,
			min : min,
			max : max
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
			$('#installedEmissionTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加区间信息失败</span>', '提示信息');
		}
	});
}

/**
 * 格式化 
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatOperater(val,row,index){
	if(val==0 || val==''){
		return '无穷大';
	}else{
		return val;
	}
	
}


/**
 * 格式化 
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function myFormat(val,row,index){
    var type = $('#installedOrEmission').combobox('getValue');
	if(type == "-1"){
		return val+"  MW";
	}else{
		return val;
	}
	
}
