$(document).ready(function() {
	getPrePage();
	getPageType();
	toastr.options.positionClass = 'toast-top-center';
	pageQuery();
});

/**
 * 获取上级菜单
 * @param {Object} key
 */
function getPrePage() {
	$.ajax( {
		type : 'get',
		url : '../getAllPrePage',
		dataType : 'json',
		async : false,
		success : function(data) {
			var html = '<ul><li item-selected="true" id="0">请选择</li>';//开始为请选择
			for ( var i in data) {
				var o = data[i];
				var childs = o.children;
				var str = ' <li id = "' + o.id + '"> ' + o.pageName
						+ '<ul>';
				for ( var j in childs) {
					var oo = childs[j];
					str += '<li id="' + oo.id + '" >' + oo.pageName + '</li>';
				}
				str += '</ul></li>';//关闭子集标签
				html += str;
			}
			html = html + '</ul>';
			
			$('#jqxTree').html(html);//查询
			$('#jqxTree2').html(html);//新增
			$('#jqxTree3').html(html);//更新
			
			// Create jqxDropDownButton
            $('#dropDownButton').jqxDropDownButton({ width: '80%', height: $('#pageDescQuery').height()});
            $('#dropDownButton2').jqxDropDownButton({ width: '90%'});
            $('#dropDownButton3').jqxDropDownButton({ width: '90%'});
            
            $('#jqxTree').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxTree').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 3px;">' + item.label + '</div>';
                $('#dropDownButton').jqxDropDownButton('setContent', dropDownContent);
                $('#prePageId').val(item.id);
                console.log('选择后' + $('#prePageId').val());
                $('#dropDownButton').jqxDropDownButton('close');//选中后关闭该下拉框
            });
            $('#jqxTree2').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxTree2').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 3px;">' + item.label + '</div>';
                $('#dropDownButton2').jqxDropDownButton('setContent', dropDownContent);
                $('#prePageId').val(item.id);
                console.log('选择后2' + $('#prePageId').val());
                $('#dropDownButton2').jqxDropDownButton('close');//选中后关闭该下拉框
            });
            $('#jqxTree3').on('select', function (event) {
                var args = event.args;
                var item = $('#jqxTree3').jqxTree('getItem', args.element);
                var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 3px;">' + item.label + '</div>';
                $('#dropDownButton3').jqxDropDownButton('setContent', dropDownContent);
                $('#prePageId').val(item.id);
                console.log('选择后3' + $('#prePageId').val());
                $('#dropDownButton3').jqxDropDownButton('close');//选中后关闭该下拉框
            });
            
            $('#jqxTree').jqxTree();
            $('#jqxTree2').jqxTree();
            $('#jqxTree3').jqxTree();
			
		},
		error : function() {
			toastr.error('获取信息失败');
		}
	});
}

/**
 * 获取菜单类型
 */
function getPageType() {
	$.ajax( {
		type : 'get',
		url : '../getAllPageType',
		dataType : 'json',
		async : false,
		success : function(data) {
			var html = '';
			for ( var i in data) {
				var o = data[i];
				html += '<option value="' + o.pageTypeId + '">' + o.typeName + '</option>';
			}
			html = '<option value="-1">请选择</option>' + html;
			$('#pageTypeQuery').html(html);
			$('#pageTypeQuery').selectpicker('refresh');
			$('#pageTypeInsert').html(html);
			$('#pageTypeInsert').selectpicker('refresh');
			$('#pageTypeUpdate').html(html);
			$('#pageTypeUpdate').selectpicker('refresh');
			$('#menuTypeInsert').html(html);
			$('#menuTypeInsert').selectpicker('refresh');
		},
		error : function() {
			toastr.error('获取信息失败');
		}
	});
}

/**
 * 页面信息
 * @param {Object} pageNumber
 * @param {Object} pageSize
 */
function pageQuery() {
	var pageName = $('#pageNameQuery').val();
	var pageDesc = $('#pageDescQuery').val();
	var preDeptId = $('#prePageId').val();
	
	var pageTypeId = $('#pageTypeQuery').selectpicker('val');
	$.ajax( {
		type : 'get',
		url : '../blurryPage',
		data : {
			pageName : pageName,
			pageDesc : pageDesc,
			preDeptId : preDeptId,
			pageTypeId : pageTypeId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				initPageInfoTable(data.data);
			}
		},
		error : function(value) {
			toastr.error('获取信息失败');
		}
	});
}

/**
 * 格式化显示 页面信息
 * @param {Object} data
 */
function initPageInfoTable(value) {

	var source = {
		dataType : "json",
		dataFields : [ {
			name : 'pageId',
			type : 'number'
		}, {
			name : 'pageName',
			type : 'string'
		}, {
			name : 'prePageId',
			type : 'number'
		}, {
			name : 'url',
			type : 'string'
		}, {
			name : 'description',
			type : 'string'
		}, {
			name : 'icon',
			type : 'string'
		} ],
		hierarchy : {
			keyDataField : {
				name : 'pageId'
			},
			parentDataField : {
				name : 'prePageId'
			}
		},
		id : 'pageId',
		localData : value
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#pageInfoTable").jqxTreeGrid( {
		width : '99%',
		source : dataAdapter,
		sortable : true,
		ready : function() {
			$("#pageInfoTable").jqxTreeGrid('expandRow', '0');
		},
		columns : [ {
			text : '名称',
			dataField : 'pageName',
			width : '20%'
		}, {
			text : '路径',
			dataField : 'url',
			width : '20%'
		}, {
			text : '描述',
			dataField : 'description',
			width : '20%'
		}, {
			text : '图标',
			dataField : 'icon',
			width : '25%'
		}, {
			text : '操作',
			cellsalign : 'left',
			cellsrenderer : operate,
			events : 'operateEvents',
			width : '15%'
		} ]
	});

	$('#pageInfoTable').on('rowSelect', function(event) {
		var args = event.args;
		var row = args.row;
		var id = row.pageId;
		$('#pageTableId').val(id);
		if (row.level !== 0) {
		}
	});

}

/**
 * 操作：显示信息、显示删除
 * @param {Object} value
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function operate(value, row, index) {
	return [ '<span class="glyphicon glyphicon-edit" onclick="showPageInfo()" style="color:#f0ad4e; cursor:pointer"></span>'
		+ 	'&nbsp;&nbsp;&nbsp;'
		+   '<span class="glyphicon glyphicon-trash" onclick="deletePage()" style="color:#f0ad4e; cursor:pointer"></span>' ]
			.join('');
}
/**
 * 删除页面信息
 * @param {Object} data
 */
function deletePage(pageId) {
	pageId = $('#pageTableId').val();
	if (!pageId) {
		toastr.error('请选择页面!');
		return;
	}
	swal( {
		title : "删除页面?",
		text : "你确定要删除这个页面吗？",
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
				url : '../deletePage',
				data : {
					pageId : pageId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag == 0) {
						pageQuery();
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
			swal('取消', '页面没有删除', 'error');
		}
	});
	$.messager.confirm('删除页面', '确定删除该页面吗?', function(result) {
		if (result) {

		}
	});
}

/**
 * 打开插入对话框
 * @param {Object} roleId
 */
function pageInsert() {
	$('#prePageId').val(0);//新增时候，将上级ID置为0
	var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 3px;">' + '请选择' + '</div>';
	$('#dropDownButton2').jqxDropDownButton('setContent', dropDownContent);
	$('#pageMessageInsert').modal( {
		backdrop : 'static'
	});
}

/**
 * 插入 菜单
 */
function insertPage() {
	var prePageId = $('#prePageId').val();
	if (prePageId == '-1') {
		toastr.warning('请选择上级菜单');
		return;
	}
	var pageName = $('#pageNameInsert').val();
	if (!pageName) {
		toastr.warning('请输入菜单名称');
		return;
	}
	var pageUrl = $('#pageURLInsert').val();
	if (!pageUrl) {
		toastr.warning('请输入菜单路径');
		return;
	}
	var pageIcon = $('#pageIconInsert').val();
	var pageOrder = $('#pageOrderCodeInsert').val();
	var pageDesc = $('#pageDescInsert').val();
	var pageTypeId = $('#pageTypeInsert').selectpicker('val');
	$.ajax( {
		type : 'post',
		url : '../addPage',
		data : {
			prePageId : prePageId,
			pageName : pageName,
			url : pageUrl,
			pageTypeId : pageTypeId,
			pageIcon : pageIcon,
			pageOrder : pageOrder,
			pageDesc : pageDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				closePageInsertModal();
				pageQuery();
				toastr.success('添加菜单成功');
			}
		},
		error : function() {
			toastr.error('添加失败');
		}
	});
}
/**
 * 关闭插入对话框
 * @param {Object} roleId
 */
function closePageInsertModal() {
	$('#pageMessageInsert').modal('hide');
	$('#pagePerInsert').selectpicker('val', '-1');
	$('#pageNameInsert').val('');
	$('#pageURLInsert').val('');
	$('#pageIconInsert').val('');
	$('#pageOrderInsert').val('');
	$('#pageDescInsert').val('');
	$('#pageTypeInsert').selectpicker('val', '-1');
}
/**
 * 显示菜单信息 对话框
 */
function showPageInfo(pageId) {
	pageId = $('#pageTableId').val();
	if (!pageId) {
		toastr.warning('请选择菜单');
		return;
	}
	$.ajax( {
		type : 'post',
		url : '../getPageById',
		data : {
			pageId : pageId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			}
			var obj = data.data;
			$('#pageId').val(obj.pageId);
			$('#prePageId').val(obj.prePageId);
			
			//需要根据prePageId查询pageName，从而给下拉框赋值
			if(obj.prePageId != 0 && obj.prePageId != null){
			$.ajax( {
				type : 'post',
				url : '../getPageById',
				data : {
					pageId : obj.prePageId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag < 0) {
						toastr.warning(data.message);
						return;
					}
					var obj = data.data;
					var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 3px;">' + obj.pageName + '</div>';
		            $('#dropDownButton3').jqxDropDownButton('setContent', dropDownContent);
				},
				error : function() {
					toastr.error('获取角色信息失败!');
				}
			});} else {
				var dropDownContent = '<div style="position: relative; margin-left: 3px; margin-top: 3px;">' + '请选择' + '</div>';
		        $('#dropDownButton3').jqxDropDownButton('setContent', dropDownContent);
			}
			
			$('#pageNameUpdate').val(obj.pageName);
			$('#pageURLUpdate').val(obj.url);
			$('#pageIconUpdate').val(obj.icon);
			$('#pageOrderCodeUpdate').val(obj.orderCode);
			$('#pageDescUpdate').val(obj.description);
			$('#pageTypeUpdate').selectpicker('val', obj.pageTypeId);
			$('#pageMessage').modal( {
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
function updatePageMessage() {
	var pageId = $('#pageId').val();
	if (!pageId) {
		toastr.warning('请选择菜单');
		return;
	}
	var prePageId = $('#pagePreUpdate').selectpicker('val');
	if (prePageId == '-1') {
		toastr.warning('请选择上级菜单');
		return;
	}
	var pageName = $('#pageNameUpdate').val();
	if (!pageName) {
		toastr.warning('请输入菜单名称');
		return;
	}
	var pageUrl = $('#pageURLUpdate').val();
	if (!pageUrl) {
		toastr.warning('请输入菜单路径');
		return;
	}
	var pageIcon = $('#pageIconUpdate').val();
	var pageOrder = $('#pageOrderCodeUpdate').val();
	var pageDesc = $('#pageDescUpdate').val();
	var pageTypeId = $('#pageTypeUpdate').selectpicker('val');
	$.ajax( {
		type : 'post',
		url : '../editPage',
		data : {
			pageId : pageId,
			prePageId : prePageId,
			pageName : pageName,
			url : pageUrl,
			pageTypeId : pageTypeId,
			pageIcon : pageIcon,
			pageOrder : pageOrder,
			pageDesc : pageDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				pageQuery();
				closePageMessageoModal();
				toastr.success('更新菜单信息成功');
			}
		},
		error : function() {
			toastr.warning('更新失败');
		}
	});
}
/**
 * 隐藏 角色信息对话框
 */
function closePageMessageoModal() {
	$('#pageMessage').modal('hide');
	$('#pagePerUpdate').selectpicker('val', '-1');
	$('#pageNameUpdate').val('');
	$('#pageURLUpdate').val('');
	$('#pageIconUpdate').val('');
	$('#pageOrderUpdate').val('');
	$('#pageDescUpdate').val('');
	$('#pageTypeUpdate').selectpicker('val', '-1');
}
