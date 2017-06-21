/**
 * Created by se7en on 2015/12/2.
 */


$(document).ready(function() {
	if (window != top) {
		top.location.href = location.href;
	}
	$(".name").css("background-image", "url(images/a1.png)");
	$(".password").css("background-image", "url(images/p1.png)");
	$("#name").focus(function() {
		$("#name").css("border-color", "#0070bc");
	});
	$("#name").blur(function() {
		$("#name").css("border-color", "#ccc");
	});
	$("#name").focus(function() {
		$(".name").css("background-image", "url(images/a2.png)");
	});
	$("#name").blur(function() {
		$(".name").css("background-image", "url(images/a1.png)");
	});

	$("#passwd").focus(function() {
		$("#passwd").css("border-color", "#0070bc");
	});
	$("#passwd").blur(function() {
		$("#passwd").css("border-color", "#ccc");
	});
	$("#passwd").focus(function() {
		$(".password").css("background-image", "url(images/p2.png)");
	});
	$("#passwd").blur(function() {
		$(".password").css("background-image", "url(images/p1.png)");
	});
});


document.onkeydown = function(e) {
	var event = e || window.event;
	var code = event.keyCode || event.which || event.charCode;
	if (code == 13) {
		login();
	}
}
/**
 * 清空数据
 */
function cleardata() {
	$('#name').val('');
	$('#passwd').val('');
}