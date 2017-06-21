var roleIdQuery = -1;

$(document).ready(function() {
	initPagination();
	toastr.options.positionClass = 'toast-top-center';
	roleQuery();
});

/**
 * 格式化分页组件
 */
function initPagination() {
	var pp = $('#rolePagination');
	pp.pagination( {
		pageSize : 20,
		pageList : [ 20, 100, 200, 500, 1000 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			roleQuery(pageNumber, pageSize);
		}
	});
	var ppMenu = $('#roleMenuPagination');
	ppMenu.pagination( {
		pageSize : 20,
		pageList : [ 20, 100, 200, 500, 1000 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			getRoleMenus(pageNumber, pageSize, roleIdQuery);
		}
	});
}

/**
 * 页面信息
 * @param {Object} pageNumber
 * @param {Object} pageSize
 */

function roleQuery(pageNumber, pageSize) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	var roleName = $('#roleNameQuery').val();
	var roleDesc = $('#descQuery').val();
	$
			.ajax( {
				type : 'post',
				url : '../blurryRole',
				data : {
					roleName : roleName,
					roleDesc : roleDesc,
					pageNumber : pageNumber,
					pageSize : pageSize
				},
				dataType : 'json',
				success : function(value) {
					var flag = value.flag;
					if (flag < 0) {
						toastr.warning(value.message);
						return;
					}
					var data = value.data.rows;
					var html = '';
					for ( var i in data) {
						var obj = data[i];
						html += '<tr><td>'
								+ (parseInt(i) + 1)
								+ '</td><td>'
								+ obj.roleId
								+ '</td><td>'
								+ obj.roleName
								+ '</td><td>'
								+ obj.description
								+ '</td><td><button class="btn btn-info glyphicon glyphicon-info-sign" type="button" onclick="showRoleInfo('
								+ obj.roleId
								+ ')"></button></td><td><button class="btn btn-success glyphicon glyphicon-th-list" type="button" onclick="showRoleMenu('
								+ obj.roleId
								+ ')"></button></td><td><button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="deleteRole('
								+ obj.roleId + ')"></button></td></tr>';
					}
					$('#roleTable tbody').html(html);
					$('#rolePagination').pagination( {
						total : value.data.total
					});
				},
				error : function() {
					toastr.error('查询角色信息失败');
				}
			});
}

/**
 * 打开插入对话框
 * @param {Object} roleId
 */
function insertRoleModel() {
	$('#roleMessageInsert').modal( {
		backdrop : 'static'
	});
}

/**
 * 关闭插入对话框
 * @param {Object} roleId
 */
function closeRoleInsertModal(roleId) {
	$('#roleMessageInsert').modal('hide');
}
/**
 * 显示角色信息 对话框
 */
function showRoleInfo(roleId) {
	$.ajax( {
		type : 'get',
		url : '../getRoleInfo',
		data : {
			roleId : roleId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			}
			var obj = data.data;
			$('#roleId').val(obj.roleId);
			$('#roleName').val(obj.roleName);
			$('#roleDesc').val(obj.description);
			$('#roleMessage').modal( {
				backdrop : 'static'
			});
		},
		error : function() {
			toastr.error('获取角色信息失败!');
		}
	});

}
/**
 * 跟新角色信息
 */
function updateRoleMessage() {
	var roleId = $('#roleId').val();
	var roleName = $('#roleName').val();
	var description = $('#roleDesc').val();
	$.ajax( {
		type : 'post',
		url : '../updateRoleInfo',
		data : {
			roleId : roleId,
			roleName : roleName,
			roleDesc : description
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			}
			$('#roleId').val('');
			$('#roleName').val('');
			$('#roleDesc').val('');
			toastr.success('更新角色信息成功');
			roleQuery();
			$('#roleMessage').modal('hide');
		},
		error : function() {
			toastr.error('获取角色信息失败!');
		}
	});
}
/**
 * 隐藏 角色信息对话框
 */
function closeRoleMessageoModal() {
	$('#roleId').val('');
	$('#roleName').val('');
	$('#roleDesc').val('');
	$('#roleMessage').modal('hide');
}

/**
 * 显示角色菜单信息
 * @param {Object} roleId
 */
function showRoleMenu(roleId) {
	roleIdQuery = roleId;
	$('#roleMenuId').val(roleId);
	getRoleMenus(null, null, roleId);
	$('#roleMenuMessage').modal( {
		backdrop : 'static'
	});
}
/**
 * 关闭对话框
 */
function closeRoleMenuMessageModal() {
	$('#roleMenuMessage').modal('hide');
}

/**
 * 添加系统菜单
 */
function insertRole() {
	var roleName = $('#roleNameInsert').val();
	var roleDesc = $('#roleDescInsert').val();
	$.ajax( {
		type : 'post',
		url : '../addRole',
		data : {
			roleName : roleName,
			roleDesc : roleDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.error(data.message);
			} else {
				toastr.success('添加成功');
				$('#roleMessageInsert').modal('hide');
				roleQuery();
				$('#roleNameInsert').val('');
				$('#roleDescInsert').val('');
			}
		},
		error : function() {
			toastr.error('添加失败');
		}
	});
}

/**
 * 获取用户的菜单信息
 */
function getRoleMenus(pageNumber, pageSize, roleId) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	$
			.ajax( {
				type : 'get',
				url : '../getRoleMenus',
				data : {
					roleId : roleId,
					pageNumber : pageNumber,
					pageSize : pageSize
				},
				dataType : 'json',
				success : function(value) {
					var flag = value.flag;
					if (flag < 0) {
						toastr.warning(value.message);
						return;
					}
					var data = value.data.data;
					var html = '';
					for ( var i in data) {
						var obj = data[i];
						html += '<tr><td>' + (parseInt(i) + 1) + '</td><td>' + obj.pageName + '</td><td>'
								+ (obj.description ? obj.description : "") + '</td><td>' + obj.url + '</td>';
						if (obj.flag == '0') {
							html += '<td><button class="btn btn-success glyphicon glyphicon-ok" type="button" onclick="bindRoleMenu(' + obj.pageId + ')">绑定</button></td></tr>'
						} else {
							html += '<td><button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="unBindRoleMenu(' + obj.pageId + ')">解绑</button></td></tr>'
						}
					}
					$('#roleMenuTable tbody').html(html);
					$('#roleMenuPagination').pagination( {
						total : value.data.count
					});
				},
				error : function() {
				}
			});
}

/**
 * 给角色绑定菜单
 * @param {Object} pageId
 */
function bindRoleMenu(pageId) {
	var roleId = $('#roleMenuId').val();
	$.ajax( {
		type : 'post',
		url : '../addRolePage',
		data : {
			roleId : roleId,
			pageId : pageId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				getRoleMenus(null, null, roleId);
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
 * 给角色解绑菜单
 * @param {Object} pageId
 */
function unBindRoleMenu(pageId) {
	var roleId = $('#roleMenuId').val();
	$.ajax( {
		type : 'post',
		url : '../deleteRolePage',
		data : {
			roleId : roleId,
			pageId : pageId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				getRoleMenus(null, null, roleId);
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
 * 删除角色
 * @param {Object} roleId
 */
function deleteRole(roleId) {
	if (!roleId) {
		toastr.error('请选择角色!');
		return;
	}
	swal( {
		title : "删除角色?",
		text : "你确定要删除这个角色吗？",
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
				url : '../deleteRole',
				data : {
					roleId : roleId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag == 0) {
						roleQuery();
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
			swal('取消', '角色没有删除', 'error');
		}
	});
}
