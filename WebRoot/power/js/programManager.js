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
		format : 'yyyy-mm-dd',
		autoclose : true,
		minView : 'month',
		todayHighlight : true,
		todayBtn : true,
		forceParse : false,
		allowInputToggle : true
	});
	var nowtime = new Date().getTime();
	$('#beginTimeQuery').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM-dd'));
	$('#endTimeQuery').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM-dd'));
	queryProgramInfo();
	getCity();
	getIndustryGroup();
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
			$('#cityId').html(option);
			$('#cityId').selectpicker('refresh');
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
			$('#groupId').html(option);
			$('#groupId').selectpicker('refresh');
		},
		error : function() {

		}
	});
}
/**
 * 获取方案信息
 */
function queryProgramInfo() {
	var programName = $('#programNameQuery').val();
	var programUser = $('#programUserQuery').val();
	var programDesc = $('#programDescQuery').val();
	var beginTimeQuery = $('#beginTimeQuery').find('input').val();
	var endTimeQuery = $('#endTimeQuery').find('input').val();
	$
			.ajax( {
				url : '../queryProgramInfo',
				type : 'get',
				data : {
					programName : programName,
					programUser : programUser,
					programDesc : programDesc,
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
									+ o.programName
									+ '</td><td>'
									+ o.programUser
									+ '</td><td>'
									+ o.programDesc
									+ '</td><td>'
									+ o.createDate
									+ '</td>'
									+ '<td><button class="btn btn-success glyphicon glyphicon-info-sign" type="button" onclick="showProgram('
									+ o.programId
									+ ')"></button></td><td><button class="btn btn-danger glyphicon glyphicon-remove" type="button" onclick="deleteProgram('
									+ o.programId + ')"></button></td></tr>'
						}
						$('#programInfo tbody').html(html);
					}
				},
				error : {

				}
			});
}

/**
 * 关闭新增机组对话框
 */
function deleteProgram(programId) {
	if (!programId) {
		toastr.error('请选择方案!');
		return;
	}
	swal( {
		title : "删除方案?",
		text : "你确定要删除这个方案吗？",
		type : "warning",
		showCancelButton : true,
		confirmButtonColor : '#DD6B55',
		confirmButtonText : '确定删除!',
		cancelButtonText : "取消!",
		closeOnConfirm : false,
		closeOnCancel : false
	}, function(isConfirm) {
		if (isConfirm) {
			$.ajax( {
				type : 'get',
				url : '../deleteProgramFullView',
				data : {
					programId : programId
				},
				dataType : 'json',
				success : function(data) {
					var flag = data.flag;
					if (flag < 0) {
						swal("删除方案失败!", "删除失败了!", "error");
					} else {
						swal("删除方案成功!", "删除成功了!", "success");
						queryProgramInfo();
					}
				},
				error : function() {

				}
			});

		} else {
			swal("取消", "方案没有删除", "error");
		}
	});
}
/**
 * 查看方案
 * @param {Object} programId
 */
function showProgram(programId) {
	window.location.href = 'program.html?programId=' + programId;
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
 * 关闭新增机组对话框
 */
function insertPowerUnit() {
	var powerCode = $('#powerCode').val();
	if (!powerCode || powerCode == '') {
		toastr.warning('电厂编码不能为空');
		return;
	}
	var powerName = $('#powerName').val();
	if (!powerName || powerName == '') {
		toastr.warning('电厂名称不能为空');
		return;
	}
	var cityId = $('#cityId option:selected').val();
	var groupId = $('#groupId option:selected').val();
	var powerUnitCode = $('#powerUnitCode').val();
	if (!powerUnitCode || powerUnitCode == '') {
		toastr.warning('机组编码不能为空');
		return;
	}
	var powerUnitInstalled = $('#powerUnitInstalled').val();
	if (!powerUnitInstalled || powerUnitInstalled == '') {
		toastr.warning('装机容量不能为空');
		return;
	}
	var powerUnitDate = $('#powerUnitDate').find('input').val();
	if (!powerUnitDate || powerUnitDate == '') {
		toastr.warning('投产时间不能为空');
		return;
	}

	$.ajax( {
		url : '../insertPowerInfo',
		type : 'get',
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
				toastr.success('添加成功');
				$('#insertPowerUnitModel').modal('hide');
			}
		},
		error : {

		}
	});
}