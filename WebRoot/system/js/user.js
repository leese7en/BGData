$(document).ready(function() {
	var nowtime = new Date().getTime();
	$('#beginTime').datetimebox('setValue', utils.dateFormat(nowtime - (864000 * 1000), 'yyyy-MM-dd HH:mm:ss'));
	$('#endTime').datetimebox('setValue', utils.dateFormat(nowtime, 'yyyy-MM-dd HH:mm:ss'));
	getDept('userDeptQuery');
	$('#userDeptQuery').combobox( {
		valueField : 'deptId',
		textField : 'deptName'
	});
	initUserTable();
	userQuery();
});
/**
 *初始化 用户信息
 */
function initUserTable() {
	//数据一览
	$('#userTable').datagrid( {
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
	var p = $('#userTable').datagrid('getPager');
	$(p).pagination( {
		pageSize : 50,
		pageList : [ 10, 20, 50, 100, 200 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			userQuery(pageNumber, pageSize);
		}
	});
	$("#editUser").menu( {
		onClick : function(item) {
			var row = $('#userTable').datagrid('getSelected');
			var id = row.userId;
			if (!id || id == '' || id == null) {
				$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">请选择权限</div>', '提示信息');
				return;
			}
			var name = item.name;
			if (name == 'basic') {
				showUserBasic(id);
			} else if (name == "role") {
				showUserRole(id);
			} else if (name == "menu") {
				showUserMenu(id);
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
function userQuery(pageNumber, pageSize) {

	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 50;
	}
	var userName = $('#userNameQuery').textbox('getValue');
	var userDesc = $('#userDescQuery').textbox('getValue');
	var deptId = $('#userDeptQuery').combobox('getValue');
	var beginTime = $('#beginTime').datetimebox('getValue');
	var endTime = $('#endTime').datetimebox('getValue');
	$.ajax( {
		type : 'get',
		url : '../blurryUser',
		data : {
			userName : userName,
			userDesc : userDesc,
			deptId : deptId,
			beginTime : beginTime,
			endTime : endTime,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			$('#userTable').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">获取用户信息失败</div>', '提示信息');
		}
	});
}

/**
 * 编辑 菜单权限
 */
function showUserMenu(userId) {
	$('#userMenuId').val(userId);
	getUserMenus(userId);
	$('#userMenuDialog').show();
	$('#userMenuDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 500,
		width : 700,
		top : 20,
		buttons : [ {
			text : '完成',
			handler : function() {
				$('#userMenuDialog').dialog('close');
			}
		} ]
	});
}
/**
 * 格式化用户 菜单
 * @param val
 * @param row
 * @param index
 * @returns {string}
 */
function formatOperator(val, row, index) {
	if (val == '0') {
		return '<a href="#" class="easyui-linkbutton" onclick="bindUserMenu(\'' + row.pageId + '\')">绑定</a>';
	} else {
		return '<a href="#" class="easyui-linkbutton" onclick="unBindUserMenu(\'' + row.pageId + '\')">解绑</a>';
	}
}

/**
 * 获取用户的菜单信息
 */
function getUserMenus(userId){
	$.ajax( {
		type : 'get',
		url : '../getUserMenus',
		data : {
			userId : userId
		},
		dataType : 'json',
		success : function(data) {
				$('#menuTable').datagrid('loadData', data);
		},
		error : function() {

		}
	});
}

/**
 * 给用户绑定菜单
 * @param {Object} pageId
 */
function bindUserMenu(pageId){
	
	var userId = $('#userMenuId').val();
	
	$.ajax( {
		type : 'post',
		url : '../addUserPage',
		data : {
			userId : userId,
			pageId:pageId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if(flag ==0){
				getUserMenus(userId);
				$.messager.alert('提示信息','<span class="mes">绑定成功</span>','提示信息');
			}else{
				$.messager.alert('error',data.message,'error');
			}
		},
		error : function() {
				$.messager.alert('error','<span class="mess">绑定失败</span>','error');
		}
	});
}


/**
 * 给用户解绑菜单
 * @param {Object} pageId
 */
function unBindUserMenu(pageId){
	var userId = $('#userMenuId').val();
	$.ajax( {
		type : 'post',
		url : '../deleteUserPage',
		data : {
			userId : userId,
			pageId:pageId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if(flag ==0){
				getUserMenus(userId);
				$.messager.alert('提示信息','<span class="mes">解绑成功</span>','提示信息');
			}else{
				$.messager.alert('error',data.message,'error');
			}
		},
		error : function() {
				$.messager.alert('error','解绑失败','error');
		}
	});
}

/**
 * 显示用户基本信息
 * @param id
 * @return
 */
function showUserBasic(id){
	$('#userBasicInfo').show();
	$.ajax({
		url:'../getUserById',
		type:'post',
		data:{
		id:id
	    },
	    dataType:'json',
	    success:function(data){
	    	$('#basicId').textbox('setValue',id);
	    	$('#basicName').textbox('setValue',data.userName);
	    	$('#basicJobNo').textbox('setValue',data.jobNo);
	    	$('#basicMail').textbox('setValue',data.email);
	    	$('#basicPhone').textbox('setValue',data.phone);
	    },
	    error:function(){
	    	$.messager.alert('提示信息','数据加载失败！','提示信息');
	    }
	});
	$('#userBasicInfo').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 250,
		width : 330,
		top : 80,
		buttons : [ {
			text : '提交',
			iconCls : 'icon-ok',
			handler : function() {
			$('#userBasicInfo').dialog('close');
			}
		}, {
			text : '取消',
			iconCls : 'icon-cancel',
			handler : function() {
			$('#userBasicInfo').dialog('close');
			}
		} ]
	});
}

/**
 * 编辑 角色权限
 */
function showUserRole(userId) {
	$('#userRoleId').val(userId);
	getUserRole(userId);
	$('#userRoleDialog').show();
	$('#userRoleDialog').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		height : 500,
		width : 700,
		top : 20,
		buttons : [ {
			text : '完成',
			handler : function() {
				$('#userRoleDialog').dialog('close');
			}
		} ]
	});
}

/**
 * 格式化用户 菜单
 * @param val
 * @param row
 * @param index
 * @returns {string}
 */
function formatRoleOperator(val, row, index) {
	if (val == '0') {
		return '<a href="#" class="easyui-linkbutton" onclick="bindUserRole(\'' + row.roleId + '\')">绑定</a>';
	} else {
		return '<a href="#" class="easyui-linkbutton" onclick="unBindUserRole(\'' + row.roleId + '\')">解绑</a>';
	}
}
/**
 * 获取用户 角色信息
 * @param {Object} userId
 */
function getUserRole(userId){
	$.ajax( {
		type : 'get',
		url : '../getUserRole',
		data : {
			userId : userId
		},
		dataType : 'json',
		success : function(data) {
				$('#roleTable').datagrid('loadData', data);
		},
		error : function() {

		}
	});
}

/**
 * 给用户绑定角色
 * @param {Object} pageId
 */
function bindUserRole(roleId){
	
	var userId = $('#userRoleId').val();
	
	$.ajax( {
		type : 'post',
		url : '../addUserRole',
		data : {
			userId : userId,
			roleId : roleId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if(flag ==0){
				getUserRole(userId);
				$.messager.alert('提示信息','<span class="mes">绑定成功</span>','提示信息');
			}else{
				$.messager.alert('提示信息',data.message,'提示信息');
			}
		},
		error : function() {
				$.messager.alert('提示信息','<span class="mess">绑定失败</span>','提示信息');
		}
	});
}


/**
 * 给用户解绑角色
 * @param {Object} roleId
 */
function unBindUserRole(roleId){
	var userId = $('#userRoleId').val();
	$.ajax( {
		type : 'post',
		url : '../deleteUserRole',
		data : {
			userId : userId,
			roleId : roleId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if(flag ==0){
				getUserRole(userId);
				$.messager.alert('提示信息','<span class="mes">解绑成功</span>','提示信息');
			}else{
				$.messager.alert('error',data.message,'error');
			}
		},
		error : function() {
				$.messager.alert('提示信息','<span class="mes">解绑失败</span>','提示信息');
		}
	});
}

/**
 * 添加用户
 */
function userInsert(){
	getDept('dept');
	$('#userMessage').show();
	$('#userMessage').dialog( {
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		top : 20,
		buttons : [ {
			text : '提交',
				handler : function() {
				addUser();
			}
		}, {
			text : '取消',
			handler : function() {
				$('#addUserId').textbox('setValue', '');
				$('#addRes').textbox('setValue', '');
				$('#addResType').textbox('setValue', '');
				$('#userMessage').dialog('close');
			}
		} ]
	});
}


/**
 * 添加用户
 */
function addUser(){
	var userName = $('#userName').val();
	var jobNo  =$('#jobNo').val();
	var password = $('#password').val();
	var passwd =$('#apassword').val();
	var deptId  =$('#dept').combobox('getValue');
	var email =$('#email').val();
	var phone = $('#phone').val();
	var mobilePhone =$('#mobilePhone').val();
	var desc =$('#desc').val();
	$.ajax({
		type:'post',
		url:'../addUser',
		data:{
			userName:userName,
			jobNo:jobNo,
			password:password,
			passwd:passwd,
			deptId:deptId,
			email :email,
			phone:phone,
			mobilePhone:mobilePhone,
			desc:desc
		},
		dataType:'json',
		success:function(data){
			var flag = data.flag;
			if(flag==0){
				$.messager.alert('提示信息','<span class="mes">添加成功</span>','提示信息');
			}
			else{
				$.messager.alert('提示信息',data.Message,'提示信息');
			}
		},
		error:function(){
			$.messager.alert('提示信息','<span class="mess">添加失败</span>','提示信息');
		}
	});	
}

function deleteUser(userId){
	 $.messager.confirm('删除用户', '<div style="height:50px;line-height:50px;margin-left:20px;">你确定删除该用户吗？</div>', function (result) {
        if (result) {
           $.ajax({
				type:'post',
				url:'../deleteUser',
				data:{
					userId:userId
				},
				dataType:'json',
				success:function(data){
					var flag = data.flag;
					if(flag==0){
						userQuery();
						$.messager.alert('提示信息','<span class="mes">删除成功</span>','提示信息');
					}
					else{
						$.messager.alert('提示信息',data.Message,'提示信息');
					}
				},
				error:function(){
					$.messager.alert('提示信息','<span class="mess">删除失败</span>','提示信息');
				}
			});	
        }
    });
	
}
/**
 * 获取部门信息
 * @param {Object} key
 */
function getDept(key) {
	$.ajax( {
		type : 'get',
		url : '../getAllDept',
		dataType : 'json',
		success : function(data) {
			var o = new Object();
			o.deptId = 0;
			o.PID = 0;
			o.deptName = '请选择';
			data.unshift(o);
			$('#' + key).combobox( {
				valueField : 'deptId',
				textField : 'deptName',
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