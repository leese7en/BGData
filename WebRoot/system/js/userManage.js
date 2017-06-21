
var userColumns =
	[ {
	field : 'id',
	title : '序号',
	width : '10%',
	align : 'center',
	formatter : function(value, row, index) {
		return index + 1;
	}
}, {
	field : 'userName',
	title : '用户名称',
	align : 'center'
}, {
	field : 'jobNo',
	title : '登录名',
	align : 'center'
}, {
	field : 'deptName',
	title : '部门名称',
	align : 'center'
}, {
	field : 'description',
	title : '描述',
	align : 'center'
}, {
	field : 'email',
	title : '邮箱',
	align : 'center'
}, {
	field : 'phone',
	title : '手机',
	align : 'center'
}, {
	field : 'userId',
	title : '操作',
	align : 'center',
	width : '12%',
	formatter : 'operateFormatter'
} ];

var userRoleColumns =
	[ {
	field : 'id',
	title : '序号',
	width : '10%',
	align : 'center',
	formatter : function(value, row, index) {
		return index + 1;
	}
}, {
	field : 'roleName',
	title : '角色名称',
	align : 'center'
}, {
	field : 'description',
	title : '描述',
	align : 'center'
}, {
	field : 'roleId',
	title : '操作',
	align : 'center',
	width : '10%',
	formatter : 'operateUserRoleFormatter'
} ];

var userMenuColumns =
	[ {
	field : 'id',
	title : '序号',
	width : '10%',
	align : 'center',
	formatter : function(value, row, index) {
		return index + 1;
	}
}, {
	field : 'pageName',
	title : '菜单名称',
	align : 'center'
}, {
	field : 'desciption',
	title : '描述',
	align : 'center'
}, {
	field : 'url',
	title : '菜单路径',
	align : 'center'
}, {
	field : 'pageId',
	title : '操作',
	align : 'center',
	width : '10%',
	formatter : 'operateUserMenuFormatter'
} ];

function operateFormatter(value, row, index) {
	 return [
        '<a class="edit" href="javascript:void(0)" title="编辑" style="color:#f0ad4e" onclick="showUserInfo(' + value + ')">',
        '<i class="glyphicon glyphicon-edit"></i>',
        '</a>'
        + "&nbsp;&nbsp;&nbsp;&nbsp;" +
        '<a class="role" href="javascript:void(0)" title="角色" style="color:#f0ad4e" onclick="showUserRole(' + value + ')">',
        '<i class="glyphicon glyphicon-user"></i>',
        '</a>'
        + "&nbsp;&nbsp;&nbsp;&nbsp;" +
        '<a class="menu" href="javascript:void(0)" title="菜单" style="color:#f0ad4e" onclick="showUserMenu(' + value + ')">',
        '<i class="glyphicon glyphicon-book"></i>',
        '</a>'+ "&nbsp;&nbsp;&nbsp;&nbsp;" +
         '<a class="remove" href="javascript:void(0)" title="重置密码" style="color:#f0ad4e" onclick="resetUserPasswrd(' + value + ')">',
        '<i class="glyphicon glyphicon-scissors"></i>',
        '</a>' 
        + "&nbsp;&nbsp;&nbsp;&nbsp;"+  
        '<a class="remove" href="javascript:void(0)" title="删除" style="color:#f0ad4e" onclick="deleteUser(' + value + ')">',
        '<i class="glyphicon glyphicon-trash"></i>',
        '</a>'
    ].join('');
}

function operateUserRoleFormatter(value, row, index) {
	 if(row.flag == '0'){
        return  '<a href="#"  onclick="bindUserRole(\'' + value + '\')"><font color="red">绑定</font></a>';
    }else {
        return  '<a href="#"  onclick="unBindUserRole(\'' + value + '\')"><font color="black">解绑</font></a>';
    }
}

function operateUserMenuFormatter(value, row, index) {
	 if(row.flag == '0'){
        return  '<a href="#"  onclick="bindUserMenu(\'' + value + '\')"><font color="red">绑定</font></a>';
    }else {
        return  '<a href="#"  onclick="unBindUserMenu(\'' + value + '\')"><font color="black">解绑</font></a>';
    }
}

$(document).ready(function() {
	getDept();
	toastr.options = {
		"closeButton" : true,
		"debug" : false,
		"progressBar" : false,
		"positionClass" : "toast-top-center",
		"onclick" : null,
		"showDuration" : "300",
		"hideDuration" : "1000",
		"timeOut" : "1000",
		"extendedTimeOut" : "1000",
		"showEasing" : "swing",
		"hideEasing" : "linear",
		"showMethod" : "fadeIn",
		"hideMethod" : "fadeOut"
	};
	userQuery();
});


/**
 * 查询用户信息
 */
function userQuery() {
	$('#userTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#userTable").bootstrapTable( {
		method : "post", //使用get请求到服务器获取数据  
		contentType : "application/x-www-form-urlencoded",
		url : "../blurryUser", //获取数据的Servlet地址  
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 10, 20,50, 100, 200 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : true, //显示下拉框勾选要显示的列  
		showRefresh : true, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		columns : userColumns,
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				userName : $('#userNameQuery').val(),
				userDesc : $('#userDescQuery').val(),
				deptId : $('#userDeptQuery').selectpicker('val'),
				pageNumber : params.pageNumber,
				pageSize : params.pageSize
			};
			return param;
		},
		onLoadSuccess : function() { //加载成功时执行  
			toastr.success("加载成功");
		},
		onLoadError : function() { //加载失败时执行  
			toastr.error("加载数据失败");
		}
	});
}

/**
 * 显示用户信息
 * @param {Object} userId
 */
function showUserInfo(userId) {
	if (!userId) {
		toastr.warning('请选择用户');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../getUserById',
		data : {
			userId : userId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			}
			$('#userMessage').modal( {
				backdrop : 'static'
			});
			var obj = data.data;
			$('#userId').val(obj.userId);
			$('#userNameUpdate').val(obj.userName);
			$('#jobNoUpdate').val(obj.jobNo);
			$('#userDeptUpdate').selectpicker('val', obj.deptId);
			$('#userDescUpdate').val(obj.description);
			$('#userEmailUpdate').val(obj.email);
			$('#userPhoneUpdate').val(obj.phone);

		},
		error : function() {
			toastr.error('获取角色信息失败!');
		}
	});
}
/**
 * 关闭窗口
 */
function closeUserMessageoModal() {
	$('#userId').val('');
	$('#userNameUpdate').val('');
	$('#jobNoUpdate').val('');
	$('#userDeptUpdate').selectpicker('val', '-1');
	$('#userDescUpdate').val('');
	$('#userEmailUpdate').val('');
	$('#userPhoneUpdate').val('');
	$('#userMessage').modal('hide');
}
/**
 * 更新用户信息
 */
function updateUserMessage() {
	var userId = $('#userId').val();
	var userName = $('#userNameUpdate').val();
	if (!userName) {
		toastr.warning('请输入用户名');
		return;
	}
	var jobNo = $('#jobNoUpdate').val();
	if (!jobNo) {
		toastr.warning('请输入登录名');
		return;
	}
	var deptId = $('#userDeptUpdate').selectpicker('val');
	var userDesc = $('#userDescUpdate').val();
	var userEmail = $('#userEmailUpdate').val();
	var userPhone = $('#userPhoneUpdate').val();
	$.ajax( {
		type : 'post',
		url : '../updateUser',
		data : {
			userId : userId,
			userName : userName,
			jobNo : jobNo,
			deptId : deptId,
			userDesc : userDesc,
			userEmail : userEmail,
			userPhone : userPhone
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				userQuery();
				closeUserMessageoModal();
				toastr.success('更新用户信息成功');
			}
		},
		error : function() {
			toastr.warning('更新失败');
		}
	});
}

/**
 * 编辑 菜单权限
 */
function showUserMenu(userId) {
	if (!userId) {
		toastr.warning('请选择用户');
		return;
	}
	$('#userMenuId').val(userId)
	getUserMenus( userId);
	$('#userMenuMessage').modal( {
		backdrop : 'static'
	});
}
/**
 * 获取用户角色
 * @param {Object} userId
 */
function getUserMenus( userId) {
	$('#userMenuTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#userMenuTable").bootstrapTable({
		method : "post", //使用get请求到服务器获取数据  
		contentType : "application/x-www-form-urlencoded",
		url : "../getUserMenus", //获取数据的Servlet地址  
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 10, 20,50, 100, 200 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : true, //显示下拉框勾选要显示的列  
		showRefresh : true, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		columns : userMenuColumns,
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				userId : userId,
				pageNumber : params.pageNumber,
				pageSize : params.pageSize
			};
			return param;
		},
		onLoadSuccess : function() { //加载成功时执行  
			toastr.success("加载成功");
		},
		onLoadError : function() { //加载失败时执行  
			toastr.error("加载数据失败");
		}
	});
}
/**
 * 关闭用户菜单对话框
 */
function closeUserMenuMessageModal() {
	$('#userMenuMessage').modal('hide');
}

/**
 * 编辑 菜单权限
 */
function showUserRole(userId) {
	if (!userId) {
		toastr.warning('请选择用户!');
	}
	$('#userRoleId').val(userId);
	getUserRoles( userId)
	$('#userRoleMessage').modal( {
		backdrop : 'static'
	});
}
/**
 * 获取用户角色
 * @param {Object} pageNumber
 * @param {Object} pageSize
 * @param {Object} userId
 */
function getUserRoles(userId) {
	$('#userRoleTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#userRoleTable").bootstrapTable( {
		method : "post", //使用get请求到服务器获取数据  
		contentType : "application/x-www-form-urlencoded",
		url : "../getUserRole", //获取数据的Servlet地址  
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 10, 20,50, 100, 200 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : true, //显示下拉框勾选要显示的列  
		showRefresh : true, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		columns : userRoleColumns,
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				userId : userId,
				pageNumber : params.pageNumber,
				pageSize : params.pageSize
			};
			return param;
		},
		onLoadSuccess : function() { //加载成功时执行  
			toastr.success("加载成功");
			$('#userRoleMessage').modal( {
							backdrop : 'static'
						});
		},
		onLoadError : function() { //加载失败时执行  
			toastr.error("加载数据失败");
		}
	});
}
/**
 * 关闭用户角色对话框
 */
function closeUserRoleMessageModal() {
	$('#userRoleMessage').modal('hide');
}

/**
 * 给用户绑定菜单
 * @param {Object} pageId
 */
function bindUserMenu(pageId) {
	var userId = $('#userMenuId').val();
	$.ajax( {
		type : 'post',
		url : '../addUserPage',
		data : {
			userId : userId,
			pageId : pageId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				getUserMenus( userId);
				toastr.success('绑定成功');
			} else {
				toastr.error(data.message);
			}
		},
		error : function() {
			toastr.error('绑定失败');
		}
	});
}

/**
 * 给用户解绑菜单
 * @param {Object} pageId
 */
function unBindUserMenu(pageId) {
	var userId = $('#userMenuId').val();
	$.ajax( {
		type : 'post',
		url : '../deleteUserPage',
		data : {
			userId : userId,
			pageId : pageId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				getUserMenus( userId);
				toastr.success('解绑成功');
			} else {
				toastr.error(data.message);
			}
		},
		error : function() {
			toastr.error('解绑失败');
		}
	});
}

/**
 * 给用户绑定角色
 * @param {Object} pageId
 */
function bindUserRole(roleId) {
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
			if (flag == 0) {
				getUserRoles( userId);
				toastr.success('绑定成功');
			} else {
				toastr.error(data.message);
			}
		},
		error : function() {
			toastr.error('绑定失败');
		}
	});
}

/**
 * 给用户解绑角色
 * @param {Object} roleId
 */
function unBindUserRole(roleId) {
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
			if (flag == 0) {
				getUserRoles( userId);
				toastr.success('解绑成功');
			} else {
				toastr.error(data.message);
			}
		},
		error : function() {
			toastr.error('解绑失败');
		}
	});
}

/**
 * 添加用户
 */
function userInsert() {
	$('#userMessageInsert').modal( {
		backdrop : 'static'
	});

}
/**
 * 关闭对话框
 */
function closeUserInsertModal() {
	$('#userMessageInsert').modal('hide');
	$('#userNameInsert').val('');
	$('#jobNoInsert').val('');
	$('#passwordInsert').val('');
	$('#passwdInsert').val('');
	$('#passwordInsert').val('');
	$('#userDeptInsert').selectpicker('val', '-1');
	$('#userEmailInsert').val('');
	$('#userPhoneInsert').val('');
	$('#userDescInsert').val('');
}

/**
 * 添加用户
 */
function insertUser() {
	var userName = $('#userNameInsert').val();
	if (!userName) {
		toastr.warning('请输入用户名');
		return;
	}
	var jobNo = $('#jobNoInsert').val();
	if (!jobNo) {
		toastr.warning('请输入登录名');
		return;
	}
	var password = $('#passwordInsert').val();
	if (!password) {
		toastr.warning('请输入密码');
		return;
	}
	var passwd = $('#passwdInsert').val();
	if (passwd != password) {
		toastr.warning('两次密码不一样');
		return;
	}
	var deptId = $('#userDeptInsert').selectpicker('val');
	if (!deptId || deptId == '-1') {
		toastr.warning('请选择部门');
		return;
	}
	var email = $('#userEmailInsert').val();
	var phone = $('#userPhoneInsert').val();
	var desc = $('#userDescInsert').val();
	$.ajax( {
		type : 'post',
		url : '../addUser',
		data : {
			userName : userName,
			jobNo : jobNo,
			password : password,
			passwd : passwd,
			deptId : deptId,
			email : email,
			phone : phone,
			desc : desc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				userQuery();
				toastr.success('添加用户成功');
				closeUserInsertModal();

				return;
			}
		},
		error : function() {
			toastr.error('添加用户失败');
		}
	});
}

/**
 * 重置用户密码
 * @param {Object} userId
 */
function resetUserPasswrd(userId) {
	if (!userId) {
		toastr.error('请选择用户!');
		return;
	}
	swal( {
		title : "重置密码?",
		text : "你确定要重置这个用户密码吗？",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : '#DD6B55',
		confirmButtonText : '确定重置!',
		cancelButtonText : "取消!",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
			$.ajax( {
				type : 'post',
				url : '../resetUserPassword',
				data : {
					userId : userId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag == 0) {
						userQuery();
						swal('成功', '重置成功', 'success');
					} else {
						swal('错误', data.message, 'error');
					}
				},
				error : function() {
					swal('失败', '重置失败', "error");
				}
			});
		} else {
			swal('取消', '密码没有重置', 'error');
		}
	});
}
/**
 * 删除用户
 * @param {Object} userId
 * @return {TypeName} 
 */
function deleteUser(userId) {
	if (!userId) {
		toastr.error('请选择用户!');
		return;
	}
	swal( {
		title : "删除用户?",
		text : "你确定要删除这个用户吗？",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : '#DD6B55',
		confirmButtonText : '确定删除!',
		cancelButtonText : "取消!",
		closeOnConfirm : false,
		closeOnCancel : true
	}, function(isConfirm) {
		if (isConfirm) {
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
						userQuery();
						swal('成功', '删除成功', 'success');
					} else {
						swal('错误', data.message, 'error');
					}
				},
				error : function() {
					swal('失败', '删除失败', "error");
				}
			});
		} else {
			swal('取消', '用户没有删除', 'error');
		}
	});

}
/**
 * 获取部门信息
 * @param {Object} key
 */
function getDept() {
	$.ajax( {
		type : 'get',
		url : '../getAllDept',
		dataType : 'json',
		success : function(data) {
			var html = '';
			for ( var i in data) {
				var o = data[i];
				html += '<option value="' + o.deptId + '">' + o.deptName + '</option>'
			}
			html = '<option value="-1">请选择</option>' + html;
			$('#userDeptQuery').html(html);
			$('#userDeptQuery').selectpicker('refresh');
			$('#userDeptUpdate').html(html);
			$('#userDeptUpdate').selectpicker('refresh');
			$('#userDeptInsert').html(html);
			$('#userDeptInsert').selectpicker('refresh');
		},
		error : function() {
		}
	});
}
