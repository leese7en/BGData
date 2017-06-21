/**
 * Created by se7en on 2017/8/3.
 */

/**
 * 获取menu
 */
$(document).ready(function() {
	toastr.options.positionClass = 'toast-top-center';
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
	var nowtime = new Date().getTime();
	$('#beginTimeQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 360, 'yyyy-MM'));
	$('#endTimeQuery').find('input').val(utils.dateFormat(nowtime + 3600000 * 24 * 150, 'yyyy-MM'));
	getCity();

});
/**
 * 获取盟市 信息
 */
function getCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			var option = '';
			for ( var i in data) {
				option += '<option value="' + data[i].id + '">' + data[i].cityName + '</option>';
			}
			option = '<option value="">请选择</option>' + option;
			$('#cityId').html(option);
			$('#cityId').selectpicker('refresh');
			$('#cityIdQuery').html(option);
			$('#cityIdQuery').selectpicker('refresh');
			$('#cityIdUpdate').html(option);
			$('#cityIdUpdate').selectpicker('refresh');
			getIndustryGroup();
		},
		error : function() {

		}
	});
}

/**
 * 获取 集团信息
 */
function getIndustryGroup() {
	$.ajax( {
		type : 'get',
		url : '../getIndustryGroup',
		dataType : 'json',
		success : function(data) {
			var option = '';
			for ( var i in data) {
				option += '<option value="' + data[i].id + '">' + data[i].groupName + '</option>';
			}
			option = '<option value="-1">请选择</option>' + option;
			$('#groupId').html(option);
			$('#groupId').selectpicker('refresh');
			$('#groupIdQuery').html(option);
			$('#groupIdQuery').selectpicker('refresh');
			$('#groupIdUpdate').html(option);
			$('#groupIdUpdate').selectpicker('refresh');
			queryPowerUnitfo();
		},
		error : function() {

		}
	});
}
/**
 * 获取方案信息
 */
function queryPowerUnitfo() {
	var powerName = $('#powerNameQuery').val();
	var cityId = $('#cityIdQuery option:selected').val();
	var groupId = $('#groupIdQuery option:selected').val();
	var beginTimeQuery = $('#beginTimeQuery').find('input').val();
	var endTimeQuery = $('#endTimeQuery').find('input').val();
	$
			.ajax( {
				url : '../queryPowerUnitInfo',
				type : 'get',
				data : {
					powerName : powerName,
					cityId : cityId,
					groupId : groupId,
					beginTime : beginTimeQuery,
					endTime : endTimeQuery
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag < 0) {
						toastr.warning(data.message);
						return;
					} else {
						var value = data.data;
						var html = '';
						for ( var i in value) {
							var o = value[i];
							html += '<tr><td>'
									+ (parseInt(i) + 1)
									+ '</td><td>'
									+ o.psName
									+ '</td><td>'
									+ o.unit
									+ '</td><td>'
									+ o.cityName
									+ '</td><td>'
									+ (o.groupName ? o.groupName : '')
									+ '</td><td>'
									+ o.installed
									+ '</td><td>'
									+ o.rectificationDate
									+ '</td><td>'
									+ o.productionDate
									+ '</td>'
									+ '<td><button class="btn btn-success glyphicon glyphicon-info-sign" type="button" onclick="showPowerUnit('
									+ o.programId
									+ ')"></button></td><td><button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="deletePowerUnit('
									+ o.programId + ')"></button></td></tr>'
						}
						$('#powerUnitInfo tbody').html(html);
					}
				},
				error : {

				}
			});
}

/**
 * 关闭新增机组对话框
 */
function deletePowerUnit(programId) {
	if (!programId) {
		toastr.error('请选择机组!');
		return;
	}
	swal( {
		title : "删除机组?",
		text : "你确定要删除这个机组吗？",
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
				type : 'get',
				url : '../deletePowerUnitInfo',
				data : {
					powerUnitId : programId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag < 0) {
						swal("删除机组失败!", "删除失败了!", "error");
					} else {
						swal("删除机组成功!", "删除成功了!", "success");
						queryPowerUnitfo();
					}
				},
				error : function() {

				}
			});

		} else {
			swal("取消", "角色没有删除", "error");
		}
	});
}
/**
 * 查看机组信息
 * @param {Object} programId
 */
function showPowerUnit(programId) {
	if (!programId) {
		toastr.error('请选择机组!');
		return;
	}
	$.ajax( {
		type : 'get',
		url : '../queryPowerUnitInfoById',
		data : {
			powerUnitId : programId
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				var value = data.data;
				$('#programId').val(programId);
				$('#powerNameUpdate').val(value.psName);
				$('#cityIdUpdate').selectpicker('val', value.cityId);
				$('#cityIdUpdate').selectpicker('render');
				$('#groupIdUpdate').selectpicker('val', value.groupId);
				$('#groupIdUpdate').selectpicker('render');
				$('#flagUpdate').selectpicker('val', value.flag);
				$('#flagUpdate').selectpicker('render');
				$('#powerUnitCodeUpdate').val(value.unit);
				$('#powerUnitInstalledUpdate').val(value.installed);
				$('#rectificationDate').find('input').val(value.rectificationDate);
				$('#productionDate').find('input').val(value.productionDate);
				$('#updatePowerUnitModel').modal( {
					backdrop : 'static'
				});
			}
		},
		error : function() {

		}
	});
}

/**
 * 显示新增机组的对话框
 */
function insertPowerUnitModel() {
	$('#insertPowerUnitModel').modal( {
		backdrop : 'static'
	});
}
/**
 * 关闭对话框
 */
function closeInsertPowerUnitModal() {
	$('#insertPowerUnitModel').modal('hide');
}

/**
 * 关闭对话框
 */
function closeUpdatePowerUnitModal() {
	$('#updatePowerUnitModel').modal('hide');
}
/**
 * 关闭新增机组对话框
 */
function insertPowerUnit() {
	var powerCode = $('#powerCode').val();
	if (!powerCode || powerCode == '') {
		toastr.warning('电厂编码不能为空');
		return;
	}
	var test = /^\d{3}$/;
	if(!test.test(powerCode)){
		toastr.warning('电厂编码为12位的数字');
		return;
	}
	var powerName = $('#powerName').val();
	if (!powerName || powerName == '') {
		toastr.warning('电厂名称不能为空');
		return;
	}
	var match = /[\^%|&@"'<>()\+\0x0d\0x0a,;=?$\\]+/g;
	if (match.test(powerName)){
		toastr.warning('电厂名称不符合规范');
		return;
	}
	var cityId = $('#cityId option:selected').val();
	if (!cityId || cityId == '-1') {
		toastr.warning('请选择盟市');
		return;
	}
	var groupId = $('#groupId option:selected').val();
	if (!groupId || groupId == '-1') {
		toastr.warning('请选择集团');
		return;
	}
	var powerUnitCode = $('#powerUnitCode').val();
	if (!powerUnitCode || powerUnitCode == '') {
		toastr.warning('机组编码不能为空');
		return;
	}
	var test = /^[0-9]*$/;
	if(!test.test(powerUnitCode)){
		toastr.warning('机组编码只能为数字');
		return;
	}
	var powerUnitInstalled = $('#powerUnitInstalled').val();
	if (!powerUnitInstalled || powerUnitInstalled == '') {
		toastr.warning('装机容量不能为空');
		return;
	}
	var test = /^[0-9]*$/;
	if(!test.test(powerUnitInstalled)){
		toastr.warning('装机容量只能为数字');
		return;
	}
	var powerUnitDate = $('#powerUnitDate').find('input').val();
	if (!powerUnitDate || powerUnitDate == '') {
		toastr.warning('投产时间不能为空');
		return;
	}

	$.ajax( {
		url : '../insertPowerInfo',
		type : 'post',
		data : {
			psCode : powerCode,
			psName : powerName,
			cityId : cityId,
			groupId : groupId,
			unit : powerUnitCode,
			installed : powerUnitInstalled,
			rectificationDate : powerUnitDate,
			productionDate : powerUnitDate,
			flag : 2
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				queryPowerUnitfo();
				toastr.success('添加成功');
				$('#insertPowerUnitModel').modal('hide');
			}
		},
		error : {

		}
	});
}
/**
 * 关闭新增机组对话框
 */
function updatePowerUnit() {
	


	
	var programId = $('#programId').val();
	if (!programId) {
		toastr.warning('请选择机组');
		return;
	}
	var powerName = $('#powerNameUpdate').val();
	if (!powerName || powerName == '') {
		toastr.warning('电厂名称不能为空');
		return;
	}
	
	var match = /[\^%|&@"'<>()\+\0x0d\0x0a,;=?$\\]+/g;
	if (match.test(powerName)){
		toastr.warning('电厂名称不符合规范');
		return;
	}
	var cityId = $('#cityIdUpdate').selectpicker('val');
	if (!cityId || cityId == '-1') {
		toastr.warning('请选择盟市');
		return;
	}
	var groupId = $('#groupIdUpdate').selectpicker('val');
	if (!groupId || groupId == '-1') {
		toastr.warning('请选择集团');
		return;
	}
	var powerUnitCode = $('#powerUnitCodeUpdate').val();
	if (!powerUnitCode || powerUnitCode == '') {
		toastr.warning('机组编码不能为空');
		return;
	}
	var test = /^[0-9]*$/;
	if(!test.test(powerUnitCode)){
		toastr.warning('机组编码只能为数字');
		return;
	}
	var powerUnitInstalled = $('#powerUnitInstalledUpdate').val();
	if (!powerUnitInstalled || powerUnitInstalled == '') {
		toastr.warning('装机容量不能为空');
		return;
	}
	var test = /^[0-9]*$/;
	if(!test.test(powerUnitInstalled)){
		toastr.warning('装机容量只能为数字');
		return;
	}

	var rectificationDate = $('#rectificationDate').find('input').val();
	if (!rectificationDate || rectificationDate == '') {
		toastr.warning('整改时间不能为空');
		return;
	}
	var productionDate = $('#productionDate').find('input').val();
	if (!productionDate || productionDate == '') {
		toastr.warning('投产时间不能为空');
		return;
	}
	if (rectificationDate > productionDate) {
		toastr.warning('整改日期不能早于投产日期');
		return;
	}
	var flagUpdate = $('#flagUpdate').selectpicker('val');
	$.ajax( {
		url : '../updatePowerUnitInfo',
		type : 'post',
		data : {
			powerUnitId : programId,
			psName : powerName,
			cityId : cityId,
			groupId : groupId,
			unit : powerUnitCode,
			installed : powerUnitInstalled,
			rectificationDate : rectificationDate,
			productionDate : productionDate,
			flag : flagUpdate

		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				queryPowerUnitfo();
				toastr.success('更新成功');
				$('#insertPowerUnitModel').modal('hide');
			}
		},
		error : {

		}
	});
}