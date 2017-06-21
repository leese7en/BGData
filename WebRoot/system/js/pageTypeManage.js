var columns = [ {
	field : 'id',
	title : '序号',
	width : '10%',
	align : 'center',
	formatter : function(value, row, index) {
		return index + 1;
	}
}, {
	field : 'typeName',
	title : '名称',
	align : 'center'
}, {
	field : 'description',
	title : '描述',
	align : 'center'
}, {
	field : 'pageTypeId',
	title : '操作',
	align : 'center',
	width : '10%',
	formatter : 'operateFormatter'
} ];


function operateFormatter(value, row, index) {
	return [
			'<a class="edit" href="javascript:void(0)" title="编辑" style="color:#f0ad4e" onclick="showPageTypeInfo(' + value + ')">',
			'<i class="glyphicon glyphicon-edit"></i>',
			'</a>' + "&nbsp;&nbsp;&nbsp;&nbsp;"
					+ '<a class="remove" href="javascript:void(0)" title="删除" onclick="deletePageType(' + value + ')">',
			'<i class="glyphicon glyphicon-remove"></i>', '</a>' ].join('');
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
	}
	pageTypeQuery();
});


/**
 * 页面信息
 * @param {Object} pageNumber
 * @param {Object} pageSize
 */
function pageTypeQuery(pageNumber, pageSize) {
	$('#pageTypeTable').bootstrapTable('destroy');
	//初始化表格,动态从服务器加载数据  
	$("#pageTypeTable").bootstrapTable( {
		method : "post", //使用get请求到服务器获取数据  
		contentType : "application/x-www-form-urlencoded",
		url : "../blurryPageType", //获取数据的Servlet地址  
		striped : true, //表格显示条纹  
		pagination : true, //启动分页  
		pageSize : 10, //每页显示的记录数  
		pageNumber : 1, //当前第几页  
		pageList : [ 10, 20,50, 100, 200 ], //记录数可选列表  
		search : false, //是否启用查询  
		showColumns : true, //显示下拉框勾选要显示的列  
		showRefresh : true, //显示刷新按钮  
		sidePagination : "server", //表示服务端请求  
		columns : columns,
		//设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder  
		//设置为limit可以获取limit, offset, search, sort, order  
		queryParamsType : "undefined",
		queryParams : function queryParams(params) { //设置查询参数  
			var param = {
				typeName : $('#pageTypeNameQuery').val(),
				typeDesc : $('#pageTypeDescQuery').val(),
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
 * 添加页面菜单类型
 */
function insertPageTypeModel() {
	$('#pageTypeMessageInsert').modal( {
		backdrop : 'static'
	});
}
/**
 * 添加菜单类型
 */
function inserPageType() {
	var typeName = $('#pageTypeNameInsert').val();
	if (!typeName) {
		toastr.warning('请输入菜单类型');
		return;
	}
	var typeDesc = $('#pageTypeDescInsert').val();
	$.ajax( {
		type : 'post',
		url : '../addPageType',
		data : {
			typeName : typeName,
			typeDesc : typeDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				toastr.success('添加菜单类型成功');
				pageTypeQuery();
				closePageTypeInsertModal();
			}
		},
		error : function() {
			toastr.error('添加菜单类型失败');
		}
	});
}
/**
 * 关闭对话框
 */
function closePageTypeInsertModal() {
	$('#pageTypeMessageInsert').modal('hide');
	$('#pageTypeNameInsert').val('');
	$('#pageTypeDescInsert').val('');
}

/**
 * 查看菜单信息
 * @param {Object} pageTypeId
 */
function showPageTypeInfo(pageTypeId) {
	if (!pageTypeId) {
		toastr.warning('请选择菜单类型');
		return;
	}
	$('#pageTypeId').val(pageTypeId);
	$.ajax( {
		type : 'post',
		url : '../getPageTypeById',
		data : {
			pageTypeId : pageTypeId
		},
		dataType : 'json',
		success : function(data) {
			$('#pageTypeNameUpdate').val(data.typeName);
			$('#pageTypeDescUpdate').val(data.description);
			$('#pageTypeMessage').modal( {
				backdrop : 'static'
			});
		},
		error : function() {
			toastr.error('获取菜单类型信息失败');
		}
	});

}
/**
 * 关闭 菜单新对话框
 */
function closePageTypeMessageoModal() {
	$('#pageTypeMessage').modal('hide');
	$('#pageTypeNameUpdate').val('');
	$('#pageTypeDescUpdate').val('');
	$('#pageTypeId').val('');
}

/**
 * 获取页面类型
 * @param id
 * @return
 */
function getPageTypeById(pageTypeId) {
	$.ajax( {
		type : 'post',
		url : '../getPageTypeById',
		data : {
			pageTypeId : pageTypeId
		},
		dataType : 'json',
		success : function(data) {
			$('#pageTypeName').textbox('setValue', data.typeName);
			$('#pageTypeDesc').textbox('setValue', data.description);
		},
		error : function() {
			$.messager.alert('error', '<span class="mess">获取菜单类型信息失败</span>', 'error');
		}
	});
}
/**
 * 更细菜单类型数据
 */
function updatePageTypeMessage() {
	var pageTypeName = $('#pageTypeNameUpdate').val();
	var pageTypeDesc = $('#pageTypeDescUpdate').val();
	var pageTypeId = $('#pageTypeId').val();
	$.ajax( {
		type : 'post',
		url : '../updatePageType',
		data : {
			pageTypeId : pageTypeId,
			pageTypeName : pageTypeName,
			pageTypeDesc : pageTypeDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				toastr.success('更新成功');
				pageTypeQuery();
				closePageTypeMessageoModal();
			}
		},
		error : function() {
			toastr.error('更新失败');
		}
	});
}
/**
 * 删除页面类型
 * @param id
 * @return
 */
function deletePageType(pageTypeId) {
	if (!pageTypeId) {
		toastr.error('请选择菜单类型!');
		return;
	}
	swal( {
		title : "删除菜单类型?",
		text : "你确定要删除这个菜单类型吗？",
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
				url : '../removePageType',
				data : {
					pageTypeId : pageTypeId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag == 0) {
						pageTypeQuery();
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
			swal('取消', '菜单类型没有删除', 'error');
		}
	});

}
