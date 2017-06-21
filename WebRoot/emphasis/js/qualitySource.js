/**
 * 初始化
 */
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
	var nowtime = new Date().getTime();
	$('#queryime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM'));
	queryCity();

});

/**
 * 获取盟市信息
 */
function queryCity() {
	$.ajax( {
		type : 'get',
		url : '../getCity',
		dataType : 'json',
		success : function(data) {
			var value = data;
			$('#queryCity').selectpicker('val', 'NOx');
			queryInfo();
		},
		error : function() {
		}
	});
}

/**
 * 获取信息
 */
function queryInfo() {

}