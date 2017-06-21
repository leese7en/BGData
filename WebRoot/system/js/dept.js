$(document).ready(function() {
	initDeptTable();
	deptQuery();
});
/**
 *初始化 用户信息
 */
function initDeptTable() {
	//数据一览
	$('#deptTable').datagrid( {
		onRowContextMenu : function(e, rowIndex, rowData) { //右键时触发事件
				//三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
				e.preventDefault(); //阻止浏览器捕获右键事件
				$(this).datagrid("clearSelections"); //取消所有选中项
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				$('#editUser').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('id', rowData.ID);
			}
		});
	$("#editDept").menu( {
		onClick : function(item) {
			var id = $(this).data('id');
			var record = $('#deptTable').datagrid('getSelected');
			if (!id || id == '') {
				$.messager.alert('warning', '请选择角色', 'warning');
				return;
			}

			var name = item.name;
			if (name == 'basic') {
				showUserBasic(id);
			} else if (name == "role") {
				showUserRole(id, record.Name);
			} else if (name == "resources") {
				showUserResources(id, record.Name);
			} else if (name == "password") {
				resetPassword(id);
			} else if (name == 'delete') {
				deleteUser(id);
			}
		}
	});
};
/**
 * 查询用户信息
 */
function deptQuery() {
	var deptName = $('#deptName').textbox('getValue');
	var deptDesc = $('#deptDesc').textbox('getValue');
	var preDeptId = $('#preDeptId').combobox('getValue');
$.ajax( {
		type : 'get',
		url : '../blurryDept',
		data : {
			deptName : deptName,
			deptDesc : deptDesc,
			preDeptId : preDeptId,
		},
		dataType : 'json',
		success : function(data) {
			$('#deptTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('error', '获取部门户信息失败', 'error');
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
	if(val==1 || val=='1'){
		return '<font color="red">是</font>';
	}
	else if(val==0 || val=='0'){
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