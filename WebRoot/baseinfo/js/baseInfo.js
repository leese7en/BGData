var psCode;
var date = new Date();
$(document).ready(function() {
	//	var nowtime = new Date().getTime();
		//	$('#beginTime').datetimebox('setValue', utils.dateFormat(nowtime - (864000 * 1000), 'yyyy-MM-dd HH:mm:ss'));
		//	$('#endTime').datetimebox('setValue', utils.dateFormat(nowtime, 'yyyy-MM-dd HH:mm:ss'));
		//	getDept('userDeptQuery');
		//	$('#userDeptQuery').combobox( {
		//		valueField : 'deptId',
		//		textField : 'deptName'
		//	});
		initBaseInfoTable();
		initHotwordTable();
		baseInfoQuery();
		setDeafaultData();
	});
/**
 *初始化 用户信息
 */
function initBaseInfoTable() {
	//数据一览
	$('#baseInfoTable').datagrid( {
		onRowContextMenu : function(e, rowIndex, rowData) { //右键时触发事件
				//三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
				e.preventDefault(); //阻止浏览器捕获右键事件
				$(this).datagrid("clearSelections"); //取消所有选中项
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				$('#baseInfoMenu').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('id', rowData.ID);
			}
		});
	var p = $('#baseInfoTable').datagrid('getPager');
	$(p).pagination( {
		pageSize : 50,
		pageList : [ 10, 20, 50, 100, 200 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			baseInfoQuery(pageNumber, pageSize);
		}
	});
	$("#baseInfoMenu").menu(
			{
				onClick : function(item) {
					var row = $('#baseInfoTable').datagrid('getSelected');
					psCode = row.psCode;
					var id = row.psCode;
					if (!id || id == '' || id == null) {
						$.messager.alert('提示信息',
								'<div style="height:50px;line-height:50px;margin-left:20px;">请选择权限</div>', '提示信息');
						return;
					}
					var name = item.name;
					if (name == 'hotwordManage') {
						showHotword(id);
					}
				}
			});
}

function initHotwordTable() {
	$('#hotwordTable').datagrid( {
		onRowContextMenu : function(e, rowIndex, rowData) { //右键时触发事件
				//三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
				e.preventDefault(); //阻止浏览器捕获右键事件
				$(this).datagrid("clearSelections"); //取消所有选中项
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				$('#hotwordMenu').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('id', rowData.ID);
			}
		});

	$("#hotwordMenu").menu(
			{
				onClick : function(item) {
					var row = $('#hotwordTable').datagrid('getSelected');
					var id = row.id;
					if (!id || id == '' || id == null) {
						$.messager.alert('提示信息',
								'<div style="height:50px;line-height:50px;margin-left:20px;">请选择盟市信息</div>', '提示信息');
						return;
					}
					var name = item.name;
					if (name == 'enterprise') {
						editEnterprise(id);
					} else if (name == 'delete') {
						deleteHotword(id);
					}
				}
			});

	$("#enterprise").combobox( {
		valueField : 'psCode',
		textField : 'psName',
		onChange : function(newValue, oldValue) {
			getEnterpriseTopTen(newValue);
		}
	});
}

/**
 * 设置默认显示的数据
 * @return
 */
function setDeafaultData() {
	var nowtime = new Date().getTime();
	$('#beginTime').datetimebox('setValue', utils.dateFormat(nowtime - (864000 * 1000), 'yyyy-MM-dd HH:mm:ss'));
	$('#endTime').datetimebox('setValue', utils.dateFormat(nowtime, 'yyyy-MM-dd HH:mm:ss'));
}

/**
 * 查询用户信息
 */
function baseInfoQuery(pageNumber, pageSize) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	var psName = $('#psNameQuery').textbox('getValue');
	var psStatusQuery = $('#psStatusQuery').textbox('getValue');
	var beginTime = $('#beginTime').datetimebox('getValue');
	var endTime = $('#endTime').datetimebox('getValue');
	$.ajax( {
		type : 'get',
		url : '../blurryBaseInfo',
		data : {
			psName : psName,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			$('#baseInfoTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mes">获取用户信息失败</span>', '提示信息');
		}
	});
}

/**
 * 显示电厂对话框
 */
function showHotword(id) {
	$('#hotwordDialog').show();
	getHotword();
	$('#hotwordDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 300,
		width : 700,
		top : 20,
		title : '热词管理',
		buttons : [ {
			text : '完成',
			handler : function() {
				$('#hotwordDialog').dialog('close');
			}
		} ]
	});
}

/**
 * 获取热词信息
 */
function getHotword() {
	$.ajax( {
		type : 'post',
		url : '../getAllHotWord',
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
 * 
 * @param val
 * @param row
 * @param index
 * @returns {string}
 */
/*
 function formatOperator(val, row, index) {
 if (val == psCode) {
 return '<a href="#" style="text-decoration:none" class="easyui-linkbutton" onclick="bindingEnterprise(\'' + row.id + '\')">解绑</a>';
 }else if(val != psCode){
 return '<a href="#" style="text-decoration:none" class="easyui-linkbutton" onclick="unBindingEnterprise(\'' + row.id + '\')">绑定</a>';
 } 
 }
 */

/**
 * 编辑 热词 和企业信息对应
 */
function editEnterprise(id) {
	$('#hotwordEnterpriseDialog').show();
	getReport();
	getResOutput();
	$('#time').datebox('setValue', myformatter(date));
	$('#enterprisePSCode').textbox('setValue', psCode);
	$('#hotwordEnterpriseDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 300,
		title : '添加热词绑定',
		width : 400,
		top : 20,
		buttons : [ {
			text : '确定',
			handler : function() {
				bindingEnterprise(id);
				$('#description').textbox('setValue', '');
				$('#url').textbox('setValue', '');
				$('#time').datebox('setValue', myformatter(date));
			}
		}, {
			text : '取消',
			handler : function() {
				$('#hotwordEnterpriseDialog').dialog('close');
				$('#description').textbox('setValue', '');
				$('#url').textbox('setValue', '');
				$('#time').datebox('setValue', myformatter(date));
			}
		} ]
	});
}

/**
 * 删除热词
 * @param {Object} id
 */
function deleteHotword(id) {
	$.messager.confirm('删除用户', '提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">你确定删除该热词吗？</div>',
			'提示信息', function(result) {
				if (result) {
					$.ajax( {
						type : 'post',
						url : '../',
						data : {
							id : id
						},
						dataType : 'json',
						success : function(data) {
							var flag = data.flag;
							if (flag == 0) {

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
function getReport() {
	$.ajax( {
		type : 'get',
		url : '../getReport',
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.reportId = '-1';
			o.reportName = '请选择';
			value.unshift(o);
			$('#report').combobox( {
				valueField : 'reportId',
				textField : 'reportName',
				data : value
			});
			$('#report').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 * 获取排口信息
 *
 */
function getResOutput() {
	$.ajax( {
		type : 'get',
		url : '../getResOutputByPSCode',
		data : {
			psCode : psCode
		},
		dataType : 'json',
		success : function(data) {
			var value = data;
			var o = new Object();
			o.iOCode = '-1';
			o.iOName = '请选择';
			value.unshift(o);
			$('#outputCode').combobox( {
				valueField : 'iOCode',
				textField : 'iOName',
				data : value
			});
			$('#outputCode').combobox('setValue', '-1');
		},
		error : function() {

		}
	});
}

/**
 * 热词和企业信息绑定
 * @param {Object} id
 */
function bindingEnterprise(id) {

	var reportId = $('#report').combobox('getValue');
	var enterprisePSCode = $('#enterprisePSCode').textbox('getValue');
	var outputCode = $('#outputCode').combobox('getValue');
	var url = $('#url').textbox('getValue');
	var time = $('#time').datebox('getValue');
	var description = $('#description').textbox('getValue');
	var data = $('#outputCode').combobox('getData');
	if (reportId == '-1') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择报告来源</div>', '提示信息');
		return;
	}
	if (data[1].value != null && outputCode == '-1') {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择排口信息</div>', '提示信息');
		return;
	} else if (data[1].value == null && outputCode == '-1') {
		outputCode == '';
	}

	if (url == '' || url == null) {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择报告地址</div>', '提示信息');
		return;
	}
	if (time == '' || time == null) {
		$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择报告时间</div>', '提示信息');
		return;
	}
	$.ajax( {
		type : 'post',
		url : '../insertHotwordEnterprise',
		async : false,
		data : {
			hotwordId : id,
			reportId : reportId,
			outputCode : outputCode,
			psCode : enterprisePSCode,
			url : url,
			time : time,
			description : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$('#hotwordEnterpriseDialog').dialog('close');
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			}
		},
		error : function() {
			$('#hotwordEnterpriseDialog').dialog('close');
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