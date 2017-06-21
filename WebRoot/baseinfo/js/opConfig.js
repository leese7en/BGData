/**
 * 初始化
 */
$(document).ready(function() {
	initTable();
	$("input", $(".easyui-textbox").next("span")).unbind('blur');
});

/**
 * 初始化表数据
 */
function initTable() {
	$.ajax( {
		type : 'get',
		url : '../connectInfo_get',
		dataType : 'json',
		cache : false,
		success : function(data) {
			$('#host').textbox('setValue', data.ip);
			$('#port').textbox('setValue', data.port);
			$('#userName').textbox('setValue', data.username);
			$('#connCount').textbox('setValue', data.number);
		},
		error : function() {
			$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">初始化数据失败失败</div>', '提示信息');
		}
	});
}

/**
 * 设置建立连接
 */

function save() {
	var host = $("#host").next('span').children('.textbox-text').val();
	var port = $("#port").next('span').children('.textbox-text').val();
	var userName = $("#userName").next('span').children('.textbox-text').val();
	var password = $("#password").next('span').children('.textbox-text').val();
	var connCount = $("#connCount").next('span').children('.textbox-text').val();
	var dt = new Date().getTime()
	$.ajax( {
		type : 'post',
		cache : false,
		url : '../connectInfo_set',
		data : {
			host : host,
			port : port,
			userName : userName,
			password : password,
			connCount : connCount,
			dt : dt
		},
		dataType : 'json',
		success : function(data) {
			$.messager.alert('提示', data.info, 'info');
		},
		error : function() {
			$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">连接失败</div>', '提示信息');
		}
	});
}

/**
 * 测试连接的情况
 */

function test() {
	var host = $("#host").next('span').children('.textbox-text').val();
	var port = $("#port").next('span').children('.textbox-text').val();
	var userName = $("#userName").next('span').children('.textbox-text').val();
	var password = $("#password").next('span').children('.textbox-text').val();
	var connCount = $("#connCount").next('span').children('.textbox-text').val();
	var dt = new Date().getTime()
	$.ajax( {
		type : 'post',
		cache : false,
		url : '../connectInfo_test',
		data : {
			host : host,
			port : port,
			userName : userName,
			password : password,
			connCount : connCount,
			dt : dt
		},
		dataType : 'json',
		success : function(data) {
			$.messager.alert('提示', data.info, 'info');
		},
		error : function() {
			$.messager.alert('提示信息', '<div style="height:50px;line-height:50px;margin-left:20px;">连接失败</div>', '提示信息');
		}
	});
}
