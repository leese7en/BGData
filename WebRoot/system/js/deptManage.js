var marginLeft = -15;
$(document).ready(function() {
	toastr.options.positionClass = 'toast-top-center';
	deptQuery();
	getPrePage();
});

function initDeptTable(value) {
	var source = {
		dataType : "json",
		dataFields : [ {
			name : 'deptId',
			type : 'number'
		}, {
			name : 'deptName',
			type : 'string'
		}, {
			name : 'preDeptId',
			type : 'number'
		}, {
			name : 'description',
			type : 'string'
		} ],
		hierarchy : {
			keyDataField : {
				name : 'deptId'
			},
			parentDataField : {
				name : 'preDeptId'
			}
		},
		id : 'deptId',
		localData : value
	};
	var dataAdapter = new $.jqx.dataAdapter(source);
	$("#deptInfoTable").jqxTreeGrid( {
		width : '99%',
		source : dataAdapter,
		sortable : true,
		ready : function() {
			$("#deptInfoTable").jqxTreeGrid('expandRow', '0');
		},
		columns : [ {
			text : '部门名称',
			dataField : 'deptName',
			width : '20%'
		}, {
			text : '描述',
			dataField : 'description',
			width : '40%'
		}, {
			text : '信息',
			cellsalign : 'left',
			cellsrenderer : operateInfo,
			events : 'operateEvents',
			width : '20%'
		}, {
			text : '删除',
			cellsalign : 'left',
			cellsrenderer : operateDelete,
			events : 'operateEvents',
			width : '20%'
		} ]
	});

	$('#deptInfoTable').on('rowSelect', function(event) {
		var args = event.args;
		var row = args.row;
		var id = row.deptId;
		$('#deptTableId').val(id);
		if (row.level !== 0) {
		}
	});
}
/**
 * 显示信息
 * @param {Object} value
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function operateInfo(value, row, index) {
	return [ '<button class="btn btn-info glyphicon glyphicon-info-sign" type="button" onclick="showDeptInfo()"></button>' ]
			.join('');
}
/**
 * 显示删除
 * @param {Object} value
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 */
function operateDelete(value, row, index) {
	return [ '<button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="deleteDept()"></button>' ]
			.join('');
}

/**
 * 获取上级菜单
 * @param {Object} key
 */
function getPrePage() {
	$.ajax( {
		type : 'post',
		url : '../getAllDept',
		dataType : 'json',
		async : false,
		success : function(data) {
			var html = '';
			html = buildTree(data, html);
			html = '<option value="-1">请选择</option>' + html;
			$('#prePageQuery').html(html);
			$('#prePageQuery').selectpicker('refresh');
			$('#deptPreUpdate').html(html);
			$('#deptPreUpdate').selectpicker('refresh');
			$('#deptPreInsert').html(html);
			$('#deptPreInsert').selectpicker('refresh');
		},
		error : function() {
		}
	});
}
/**
 * 构建树
 * @param {Object} data
 * @param {Object} html
 * @return {TypeName} 
 */
function buildTree(data, html) {
	for ( var i in data) {
		var o = data[i];
		if (o.preDeptId == 0) {
			marginLeft = -15;
			html += ' <option value = "' + o.deptId + '" style="margin-left:' + marginLeft + 'px;" > ' + o.deptName
					+ '</option>';
			var childs = o.children;
			if (childs && childs.length > 0) {
				marginLeft += 10;
				var str = '';
				html += buildTreeChild(childs, str);
			}
		}
	}
	return html;
}
/**
 * 构建树节点
 * @param {Object} data
 * @param {Object} html
 * @return {TypeName} 
 */
function buildTreeChild(data, html) {
	for ( var i in data) {
		var o = data[i];
		html += ' <option value = "' + o.deptId + '" style="margin-left:' + marginLeft + 'px;" > ' + o.deptName
				+ '</option>';
		var childs = o.children;
		if (childs && childs.length > 0) {
			marginLeft += 10;
			return buildTreeChild(childs, html);
		}
	}
	return html;
}
/**
 * 查询用户信息
 */
function deptQuery() {
	var deptName = $('#deptNameQuery').val();
	var deptDesc = $('#deptDescQuery').val();
	$.ajax( {
		type : 'post',
		url : '../blurryDept',
		data : {
			deptName : deptName,
			deptDesc : deptDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				var value = data.data;
				initDeptTable(value);
			}
		},
		error : function() {
			toastr.error('获取部门户信息失败');
		}
	});
}

/**
 * 构建tree
 * @param {Object} data
 */
function buildTreeGrid(data, html) {
	for ( var i in data) {
		var o = data[i];
		if (o.preDeptId == 0) {
			var cla = 'class="treegrid-' + o.deptId;
			cla += '"'
			html += ' <tr '
					+ cla
					+ ' ><td>'
					+ o.deptName
					+ '</td><td>'
					+ o.description
					+ '</td><td><button class="btn btn-info glyphicon glyphicon-info-sign" type="button" onclick="showDeptInfo('
					+ o.deptId
					+ ')"></button></td><td><button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="deleteDept('
					+ o.deptId + ')"></button></td></tr>';
			var childs = o.children;
			if (childs && childs.length > 0) {
				marginLeft += 10;
				var str = '';
				html += buildTreeGridChild(childs, str);
			}
		}
	}
	return html;
}
/**
 * 获取树节点的孩子
 * @param {Object} data
 * @param {Object} html
 * @return {TypeName} 
 */
function buildTreeGridChild(data, html) {
	for ( var i in data) {
		var o = data[i];
		var cla = 'class="treegrid-' + o.deptId;
		cla += ' treegrid-parent-' + o.preDeptId;
		cla += '"'
		html += ' <tr '
				+ cla
				+ ' ><td>'
				+ o.deptName
				+ '</td><td>'
				+ o.description
				+ '</td><td><button class="btn btn-info glyphicon glyphicon-info-sign" type="button" onclick="showDeptInfo('
				+ o.deptId
				+ ')"></button></td><td><button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="deleteDept('
				+ o.deptId + ')"></button></td></tr>';
		var childs = o.children;
		if (childs && childs.length > 0) {
			marginLeft += 10;
			return buildTreeGridChild(childs, html);
		}
	}
	return html;
}

/**
 * 显示添加部门信息对话框
 */
function insertDeptModel() {
	$('#deptMessageInsert').modal( {
		backdrop : 'static'
	});
}
/**
 * 关闭对话框
 */
function closeDeptInsertModal() {
	$('#deptMessageInsert').modal('hide');
	$('#deptPreInsert').selectpicker('val', '-1');
	$('#deptNameInsert').val('');
	$('#deptDescInsert').val('');
}

/**
 * 添加部门
 */
function insertDept() {
	var deptPreId = $('#deptPreInsert').selectpicker('val');
	var deptName = $('#deptNameInsert').val();
	var deptDesc = $('#deptDescInsert').val();
	$.ajax( {
		type : 'post',
		url : '../addDept',
		data : {
			deptPreId : deptPreId,
			deptName : deptName,
			deptDesc : deptDesc
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.error(data.message);
			} else {
				toastr.success('添加成功');
				deptQuery();
				closeDeptInsertModal();
			}
		},
		error : function() {
			toastr.error('添加失败');
		}
	});
}
/**
 * 获取展示信息
 * @param {Object} deptId
 */
function showDeptInfo(deptId) {
	deptId = $('#deptTableId').val();
	if (!deptId) {
		toastr.warning('请选择部门');
		return;
	}
	$('#deptId').val(deptId);
	$.ajax( {
		type : 'get',
		url : '../getDeptById',
		data : {
			deptId : deptId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				var value = data.data;
				$('#deptNameUpdate').val(value.deptName);
				$('#deptDescUpdate').val(value.description);
				$('#deptPreUpdate').selectpicker('val', value.preDeptId);
				$('#deptMessage').modal( {
					backdrop : 'static'
				});
			}
		},
		error : function() {
		}
	});

}
/**
 * 更新部门信息
 */
function updateDeptMessage() {
	var deptId = $('#deptId').val();
	if (!deptId) {
		toastr.warning('请选择部门');
		return;
	}
	var deptName = $('#deptNameUpdate').val();
	if (!deptName) {
		toastr.warning('请输入部门名称');
		return;
	}
	var deptDesc = $('#deptDescUpdate').val();
	var deptPreId = $('#deptPreUpdate').selectpicker('val');
	$.ajax( {
		type : 'post',
		url : '../updateDept',
		data : {
			deptId : deptId,
			deptName : deptName,
			deptDesc : deptDesc,
			deptPreId : deptPreId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				deptQuery();
				closeDeptMessageoModal();
				toastr.success('更新成功');
			}
		},
		error : function() {
		}
	});
}
/**
 * 关闭对话框
 */
function closeDeptMessageoModal() {
	$('#deptMessage').modal('hide');
	$('#deptPreUpdate').selectpicker('val', '-1');
	$('#deptNameUpdate').val('');
	$('#deptDescUpdate').val('');
}
/**
 * 删除部门
 */
function deleteDept(deptId) {
	deptId = $('#deptTableId').val();
	if (!deptId) {
		toastr.error('请选择部门!');
		return;
	}
	swal( {
		title : "删除部门?",
		text : "你确定要删除这个部门吗？",
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
				url : '../deleteDept',
				data : {
					deptId : deptId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag < 0) {
						swal('错误', data.message, 'error');
					} else {
						deptQuery();
						swal('成功', '删除成功', 'success');
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