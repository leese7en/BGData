$(document).ready(function() {
	initPagination();
	toastr.options.positionClass = 'toast-top-center';
	pageTypeQuery();
});
/**
 *初始化 用户信息
 */
function initPagination() {
	var pp = $('#pageTypePagination');
	pp.pagination( {
		pageSize : 20,
		pageList : [ 20, 100, 200, 500, 1000 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			pageTypeQuery(pageNumber, pageSize);
		}
	});
};
/**
 * 页面信息
 * @param {Object} pageNumber
 * @param {Object} pageSize
 */
function pageTypeQuery(pageNumber, pageSize) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	var typeName = $('#pageTypeNameQuery').val();
	var typeDesc = $('#pageTypeDescQuery').val();
	$
			.ajax( {
				type : 'post',
				url : '../blurryPageType',
				data : {
					typeName : typeName,
					typeDesc : typeDesc,
					pageNumber : pageNumber,
					pageSize : pageSize
				},
				dataType : 'json',
				success : function(value) {
					var data = value.rows;
					var html = '';
					for ( var i in data) {
						var obj = data[i];
						html += '<tr><td>'
								+ (parseInt(i) + 1)
								+ '</td><td>'
								+ obj.typeName
								+ '</td><td>'
								+ obj.description
								+ '</td><td><button class="btn btn-info glyphicon glyphicon-info-sign" type="button" onclick="showPageTypeInfo('
								+ obj.pageTypeId
								+ ')"></button></td><td><button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="deletePageType('
								+ obj.pageTypeId + ')"></button></td></tr>';
					}
					$('#pageTypeTable tbody').html(html);
					$('#pageTypePagination').pagination( {
						total : value.total
					});
				},
				error : function() {
					toastr.error('查询菜单类型信息失败');
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
