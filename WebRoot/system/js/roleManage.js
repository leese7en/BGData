var roleIdQuery = -1;

var roleColumns =
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
	formatter : 'operateFormatter'
} ];
var roleMenuColumns =[ {
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
	field : 'description',
	title : '描述',
	align : 'center'
}, 
{
	field : 'url',
	title : '菜单路径',
	align : 'center'
},{
	field : 'pageId',
	title : '操作',
	align : 'center',
	width : '10%',
	formatter : 'operateRoleMenuFormatter'
} ];
	
function operateFormatter(value, row, index) {
	return [
			'<a class="edit" href="javascript:void(0)" title="编辑" style="color:#f0ad4e" onclick="showRoleInfo(' + value + ')">',
			'<i class="glyphicon glyphicon-edit"></i>',
			'</a>'
					+ "&nbsp;&nbsp;&nbsp;&nbsp;"
					+ '<a class="menu" href="javascript:void(0)" title="菜单" style="color:#f0ad4e" onclick="showRoleMenu('
					+ value + ')">',
			'<i class="glyphicon glyphicon-book"></i>',
			'</a>' + "&nbsp;&nbsp;&nbsp;&nbsp;"
					+ '<a class="remove" href="javascript:void(0)" title="删除" onclick="deleteRole(' + value + ')">',
			'<i class="glyphicon glyphicon-remove"></i>', '</a>' ].join('');
}

function operateRoleMenuFormatter(value, row, index) {
	 if(row.flag == '0'){
        return  '<a href="#"  onclick="bindRoleMenu(\'' + value + '\')"><font color="red">绑定</font></a>';
    }else {
        return  '<a href="#"  onclick="unBindRoleMenu(\'' + value + '\')"><font color="black">解绑</font></a>';
    }
}

$(document).ready(function() {
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
	roleQuery();
});


/**
 * 页面信息
 * @param {Object} pageNumber
 * @param {Object} pageSize
 */

function roleQuery() {
	$('#roleTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#roleTable").bootstrapTable( {
		method : "post", //使用get请求到服务器获取数据  
		contentType : "application/x-www-form-urlencoded",
		url : "../blurryRole", //获取数据的Servlet地址  
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 10, 20,50, 100, 200 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : true, //显示下拉框勾选要显示的列  
		showRefresh : true, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		columns : roleColumns,
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				roleName : $('#roleNameQuery').val(),
				roleDesc : $('#descQuery').val(),
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
	getRoleMenus(roleId);
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
function getRoleMenus( roleId) {
	$('#roleMenuTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#roleMenuTable").bootstrapTable( {
		method : "post", //使用get请求到服务器获取数据  
		contentType : "application/x-www-form-urlencoded",
		url : "../getRoleMenus", //获取数据的Servlet地址  
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 10, 20, 50, 100, 200 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : true, //显示下拉框勾选要显示的列  
		showRefresh : true, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		columns : roleMenuColumns,
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				roleId:roleId,
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
				getRoleMenus(roleId);
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
				getRoleMenus(roleId);
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
