var roleIdQuery = -1;

$(document).ready(function() {
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		startView : 'year',
		minView : 'year',
		todayHighlight : true,
		todayBtn : true,
		forceParse : false,
		allowInputToggle : true
	});
	initPagination();
	toastr.options.positionClass = 'toast-top-center';
	queryCity();
	queryPSType();
	baseInfoQuery();
});

/**
 * 格式化分页组件
 */
function initPagination() {
	var pp = $('#psPagination');
	pp.pagination( {
		pageSize : 20,
		pageList : [ 20, 100, 200, 500, 1000 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
			baseInfoQuery(pageNumber, pageSize);
		}
	});
}

/**
 * 查询基本信息
 */
function baseInfoQuery(pageNumber, pageSize) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	var psName = $('#psNameQuery').val();
	var cityId = $('#psCityQuery').selectpicker('val');
	var psType = $('#psTypeQuery').selectpicker('val');
	$
			.ajax( {
				type : 'post',
				url : '../blurryBaseInfo',
				data : {
					psName : psName,
					cityId : cityId,
					psType : psType,
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
						html += '<tr><td>'
								+ (parseInt(i) + 1)
								+ '</td><td>'
								+ obj.psName
								+ '</td><td>'
								+ obj.cityName
								+ '</td><td>'
								+ obj.industryTypeName
								+ '</td>'
								+ '<td>'
								+ obj.subjectionRelationName
								+ '</td>'
								+ '<td>'
								+ obj.valleyName
								+ '</td>'
								+ '<td>'
								+ obj.longitude
								+ '</td><td>'
								+ obj.latitude
								+ '</td><td>'
								+ obj.ifThirtyTenthousandkilowat
								+ '</td><td><button class="btn btn-info glyphicon glyphicon-info-sign" type="button" onclick="showReliable('
								+ obj.psCode + ')"></button></td></tr>';
					}
					$('#psTable tbody').html(html);
					$('#psPagination').pagination( {
						total : value.data.count
					});
				},
				error : function() {
					toastr.error('获取信息失败!');
				}
			});
}
/**
 * 查询盟市信息
 */
function queryCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			var html = '<option value="-1">请选择</option>';
			for ( var i in data) {
				var o = data[i];
				html += '<option value="' + o.id + '">' + o.cityName + '</option>';
			}
			$('#psCityQuery').html(html);
			$('#psCityQuery').selectpicker('refresh');
		},
		error : function() {

		}
	});
}

/**
 * 获取 企业类型
 */
function queryPSType() {
	$.ajax( {
		type : 'get',
		url : '../getPSType',
		dataType : 'json',
		success : function(data) {
			var html = '<option value="-1">请选择</option>';
			for ( var i in data) {
				var o = data[i];
				html += '<option value="' + o.psType + '">' + o.psType + '</option>';
			}
			$('#psTypeQuery').html(html);
			$('#psTypeQuery').selectpicker('refresh');
		},
		error : function() {

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
function showReliable(psCode) {
	psCode = psCode;
	$('#reliablePsCode').val(psCode);
	$('#reliableMessage').modal( {
		backdrop : 'static'
	});
}
/**
 * 关闭对话框
 */
function closeReliableMessageModal() {
	$('#reliableMessage').modal('hide');
	$('#reliablePsCode').val('');
}

/**
 * 添加系统菜单
 */
function insertReliableMessage() {
	var psCode = $('#reliablePsCode').val();
	var beginDate = $('#beginDate').find('input').val();
	var endDate = $('#endDate').find('input').val();
	$.ajax( {
		type : 'post',
		url : '../addPSReliable',
		data : {
			psCode : psCode,
			beginDate : beginDate,
			endDate : endDate
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.error(data.message);
			} else {
				toastr.success('添加成功');
				$('#reliableMessage').modal('hide');
				closeReliableMessageModal();
			}
		},
		error : function() {
			toastr.error('添加失败');
		}
	});
}
