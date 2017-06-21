var userIdQuery = -1;

$(document).ready(function() {
	getDept();
	toastr.options.positionClass = 'toast-top-center';
	initPagination();
	userQuery();
});
/**
 * 格式化分页组件
 */
function initPagination() {
	var pp = $('#userPagination');
	pp.pagination( {
		pageSize : 20,
		pageList : [ 20, 100, 200, 500, 1000 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			userQuery(pageNumber, pageSize);
		}
	});
	var ppMenu = $('#userMenuPagination');
	ppMenu.pagination( {
		pageSize : 20,
		pageList : [ 20, 100, 200, 500, 1000 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			getUserMenus(pageNumber, pageSize, userIdQuery);
		}
	});
	var ppRole = $('#userRolePagination');
	ppRole.pagination( {
		pageSize : 20,
		pageList : [ 20, 100, 200, 500, 1000 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			getUserRoles(pageNumber, pageSize, userIdQuery);
		}
	});
}

/**
 * 查询用户信息
 */
function userQuery(pageNumber, pageSize) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	var userName = $('#userNameQuery').val();
	var userDesc = $('#userDescQuery').val();
	var deptId = $('#userDeptQuery').selectpicker('val');
	$
			.ajax( {
				type : 'post',
				url : '../blurryUser',
				data : {
					userName : userName,
					userDesc : userDesc,
					deptId : deptId,
					pageNumber : pageNumber,
					pageSize : pageSize
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag < 0) {
						toastr.warning(data.message);
						return;
					} else {
						var html = '';
						var value = data.data.rows;
						for ( var i in value) {
							var o = value[i];
							html += '<tr><td>'
									+ o.userId
									+ '</td><td>'
									+ o.userName
									+ '</td><td>'
									+ o.jobNo
									+ '</td><td>'
									+ o.deptName
									+ '</td><td>'
									+ o.description
									+ '</td><td>'
									+ o.email
									+ '</td><td>'
									+ o.phone
									+ '</td><td><button class="btn btn-info glyphicon glyphicon-info-sign" type="button" onclick="showUserInfo('
									+ o.userId
									+ ')"></button></td><td><button class="btn btn-success glyphicon glyphicon-th-list" type="button" onclick="showUserRole('
									+ o.userId
									+ ')"></button></td><td><button class="btn btn-success glyphicon glyphicon-list-alt" type="button" onclick="showUserMenu('
									+ o.userId
									+ ')"></button></td><td><button class="btn btn-warning glyphicon glyphicon-scissors" type="button" onclick="resetUserPasswrd('
									+ o.userId
									+ ')"></button></td><td><button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="deleteUser('
									+ o.userId + ')"></button></td></tr>'
						}
						$('#userTable tbody').html(html);
						$('#userPagination').pagination( {
							total : data.data.total
						});
					}
				},
				error : function() {
					$.messager.alert('提示信息',
							'<div style="height:50px;line-height:50px;margin-left:20px;">获取用户信息失败</div>', '提示信息');
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
	userIdQuery = userId;
	getUserMenus(null, null, userId);
	$('#userMenuMessage').modal( {
		backdrop : 'static'
	});
}
/**
 * 获取用户角色
 * @param {Object} userId
 */
function getUserMenus(pageNumber, pageSize, userId) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	$('#userMenuId').val(userId);
	$
			.ajax( {
				type : 'get',
				url : '../getUserMenus',
				data : {
					userId : userId,
					pageNumber : pageNumber,
					pageSize : pageSize
				},
				dataType : 'json',
				success : function(value) {

					var flag = value.flag;
					if (flag < 0) {
						toastr.warning(value.message);
						return;
					} else {
						var html = '';
						var data = value.data.data;
						for ( var i in data) {
							var o = data[i];
							var str = '';
							if (o.flag == '0') {
								str = '<td><button class="btn btn-success glyphicon glyphicon-info-sign" type="button" onclick="bindUserMenu(' + o.pageId + ')">绑定</button></td>';
							} else {
								str = '<td><button class="btn btn-warning glyphicon glyphicon-info-sign" type="button" onclick="unBindUserMenu(' + o.pageId + ')">解绑</button></td>';
							}
							html += '<tr><td>' + (parseInt(i) + 1) + '</td><td>' + o.pageName + '</td><td>'
									+ o.description + '</td><td>' + o.url + '</td>' + str + '</tr>';
						}
						$('#userMenuTable tbody').html(html);
						$('#userMenuPagination').pagination( {
							total : value.data.count
						});
					}
				},
				error : function() {

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
	getUserRoles(null, null, userId)
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
function getUserRoles(pageNumber, pageSize, userId) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	$
			.ajax( {
				type : 'get',
				url : '../getUserRole',
				data : {
					userId : userId,
					pageNumber : pageNumber,
					pageSize : pageSize
				},
				dataType : 'json',
				success : function(value) {
					var flag = value.flag;
					if (flag < 0) {
						toastr.warning(value.message);
						return;
					} else {
						var html = '';
						var data = value.data.data;
						for ( var i in data) {
							var o = data[i];
							var str = '';
							if (o.flag == '0') {
								str = '<td><button class="btn btn-success glyphicon glyphicon-info-sign" type="button" onclick="bindUserRole(' + o.roleId + ')">绑定</button></td>';
							} else {
								str = '<td><button class="btn btn-warning glyphicon glyphicon-info-sign" type="button" onclick="unBindUserRole(' + o.roleId + ')">解绑</button></td>';
							}
							html += '<tr><td>' + (parseInt(i) + 1) + '</td><td>' + o.roleName + '</td><td>'
									+ o.description + '</td>' + str + '</tr>';
						}
						$('#userRoleTable tbody').html(html);
						$('#userRolePagination').pagination( {
							total : value.data.count
						});
						$('#userRoleMessage').modal( {
							backdrop : 'static'
						});
					}
				},
				error : function() {

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
				getUserMenus(null, null, userId);
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
				getUserMenus(null, null, userId);
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
				getUserRoles(null, null, userId);
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
				getUserRoles(null, null, userId);
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
