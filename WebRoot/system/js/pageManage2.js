$(document).ready(function() {
	initPageTable();
	pageQuery();
	getPrePage('prePageQuery');
	getPageType('pageTypeQuery');

	$('#pageTypeQuery').combobox( {
		valueField : 'pageTypeId',
		textField : 'typeName'
	});
});
/**
 *初始化 用户信息
 */
function initPageTable() {
	//数据一览
	$('#pageTable').datagrid( {
		onRowContextMenu : function(e, rowIndex, rowData) { //右键时触发事件
				//三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
				e.preventDefault(); //阻止浏览器捕获右键事件
				$(this).datagrid("clearSelections"); //取消所有选中项
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				$('#editPage').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('id', rowData.ID);
			}
		});
	var p = $('#pageTable').datagrid('getPager');
	$(p).pagination( {
		pageSize : 50,
		pageList : [ 10, 20, 50, 100, 200 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			pageQuery(pageNumber, pageSize);
		}
	});
	$("#editPage").menu( {
		onClick : function(item) {
			var record = $('#pageTable').datagrid('getSelected');
			if (!record.pageId) {
				$.messager.alert('warning', '请选择页面', 'warning');
				return;
			}
			var name = item.name;
			if (name == 'basic') {
				showPageBasic(record.pageId);
			} else if (name == "delete") {
				deletePage(record.pageId);
			}
		}
	});
};
/**
 * 页面信息
 * @param {Object} pageNumber
 * @param {Object} pageSize
 */
function pageQuery(pageNumber, pageSize) {

	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 50;
	}
	var pageName = $('#pageNameQuery').textbox('getValue');
	var pageDesc = $('#pageDescQuery').textbox('getValue');
	var prePageId = $('#prePageQuery').combotree('getValue');
	if (!prePageId) {
		prePageId = -1;
	}
	var pageTypeId = $('#pageTypeQuery').combobox('getValue');
	if (!pageTypeId) {
		pageTypeId = -1;
	}
	$.ajax( {
		type : 'get',
		url : '../blurryPage',
		data : {
			pageName : pageName,
			pageDesc : pageDesc,
			prePageId : prePageId,
			pageTypeId : pageTypeId,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			$('#pageTable').treegrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">获取菜单信息失败</span>', '提示信息');
		}
	});
}

/**
 * 编辑页面
 */
function showPageBasic(id) {
	getPrePage('editPrePage');
	getPageType('editPageType');
	getPageById(id);
	$('#editPageMessage').show();
	$('#editPageMessage').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		width : 500,
		height : 280,
		modal : true,
		top : 150,
		buttons : [ {
			text : '提交',
			handler : function() {
				editPage(id);
			}
		}, {
			text : '取消',
			handler : function() {
				$('#editPageMessage').dialog('close');
			}
		} ]
	});
}

function getPageById(id) {
$.ajax( {
		type : 'post',
		url : '../getPageById',
		data : {
		    id:id,
		},
		async:false,
		dataType : 'json',
		success : function(data) {
			if(data != null && data != ""){
				$('#editPrePage').combotree('setValue',data.prePageId);
				$('#editPageName').textbox('setValue',data.pageName);
				$('#editUrl').textbox('setValue',data.url);
				$('#editPageType').combobox('setValue',data.pageTypeId);
				$('#editDesc').val(data.description);
			}
		},
		error:function(){
			
		}
	});
}

/**
 * 编辑菜单
 * @param id
 * @return
 */
function editPage(id){
	var prePageId = $('#editPrePage').combotree('getValue');
	var pageName = $('#editPageName').textbox('getValue');
	var url = $('#editUrl').val();
	var pageTypeId = $('#editPageType').combobox('getValue');
	var pageDesc = $('#editDesc').val();
	$.ajax( {
		type : 'post',
		url : '../editPage',
		data : {
		    id:id,
			prePageId : prePageId,
			pageName : pageName,
			url : url,
			pageTypeId : pageTypeId,
			pageDesc : pageDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$('#editPageMessage').dialog('close');
			/*	$('#editPrePage').combotree('setValue','0');
				$('#editPageName').textbox('setValue','');
				$('#editUrl').textbox('setValue','');
				$('#editPageType').combobox('setValue','0');
				$('#editDesc').val('');*/
				$.messager.alert('提示信息', '<span class="mes">编辑成功！</span>', '提示信息');
				pageQuery();
			} else {
				$.messager.alert('error', data.message, 'error');
			}
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">编辑失败！</span>', '提示信息');
		}
	});
}




/**
 * 添加页面
 */
function pageInsert() {
	getPrePage('prePage');
	getPageType('pageType');
	$('#pageMessage').show();
	$('#pageMessage').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		width : 500,
		height : 280,
		modal : true,
		top : 150,
		buttons : [ {
			text : '提交',
			handler : function() {
				addPage();
			}
		}, {
			text : '取消',
			handler : function() {
				$('#prePage').combotree('setValue','0');
				$('#pageName').textbox('setValue','');
				$('#url').textbox('setValue','');
				$('#pageType').combobox('setValue','0');
				$('#desc').val('');
				$('#pageMessage').dialog('close');
			}
		} ]
	});
}




/**
 * 添加系统菜单
 */
function addPage() {
	var prePageId = $('#prePage').combotree('getValue');
	var pageName = $('#pageName').textbox('getValue');
	var url = $('#url').val();
	var pageTypeId = $('#pageType').combobox('getValue');
	
	var pageDesc = $('#desc').val();
	$.ajax( {
		type : 'post',
		url : '../addPage',
		data : {
			prePageId : prePageId,
			pageName : pageName,
			url : url,
			pageTypeId : pageTypeId,
			pageDesc : pageDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$('#pageMessage').dialog('close');
				$('#prePage').combotree('setValue','0');
				$('#pageName').textbox('setValue','');
				$('#url').textbox('setValue','');
				$('#pageType').combobox('setValue','0');
				$('#desc').val('');
				pageQuery();
				$.messager.alert('提示信息', '<span class="mes">添加成功</span>', '提示信息');
			} else {
				$.messager.alert('error', data.message, 'error');
			}
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">添加失败</span>', '提示信息');
		}
	});
}

/**
 * 获取上级菜单
 * @param {Object} key
 */
function getPrePage(key) {
	$.ajax( {
		type : 'get',
		url : '../getAllPrePage',
		dataType : 'json',
		async:false,
		success : function(data) {
			var o = new Object();
			o.id = 0;
			o.text = '请选择';
			data.unshift(o);
			$('#' + key).combotree( {
				data : data,
				onChange : function(newValue, oldValue) {
				}
			});
		},
		error : function() {
		}
	});
}

/**
 * 获取资源类型
 */
function getPageType(key) {
	$.ajax( {
		type : 'get',
		url : '../getAllPageType',
		dataType : 'json',
		async:false,
		success : function(data) {

			var o = new Object();
			o.pageTypeId = 0;
			o.PID = 0;
			o.typeName = '请选择';
			data.unshift(o);
			$('#' + key).combobox( {
				valueField : 'pageTypeId',
				textField : 'typeName',
				data : data,
				onChange : function(newValue, oldValue) {
				}
			});

		},
		error : function() {

		}
	});
}

/**
 * 删除页面信息
 * @param {Object} data
 */
function deletePage(pageId) {

	$.messager.confirm('删除页面', '确定删除该页面吗?', function(result) {
		if (result) {
			$.ajax( {
				type : 'post',
				url : '../deletePage',
				data : {
					pageId : pageId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag == 0) {
						pageQuery();
						$.messager.alert('info', '删除页面成功', 'info');
					} else {
						$.messager.alert('error', data.message, 'error');
					}
				},
				error : function() {
					$.messager.alert('error', '删除页面失败', 'error');
				}
			});
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
function formatOperater(val, row, index) {
	if (val == 1 || val == '1') {
		return '<font color="red">是</font>';
	} else if (val == 0 || val == '0') {
		return '<font color="green">否</font>';
	}
}
/**
 * 格式化 
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function formatOperater1(val,row,index){
	if(val==0 || val=='0'){
		return '<font color="red">是</font>';
	}
	else if(val==1 || val=='1'){
		return '<font color="green">否</font>';
	}
}