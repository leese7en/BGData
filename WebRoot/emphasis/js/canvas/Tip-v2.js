//// ********************** 显示隐藏Tip层 *******************************//
//var _key;
//
//function ShowTip() {
//	document.getElementById("ShowTip").onmouseleave = function() {
//		document.getElementById("ShowTip").style.display = "none";
//	}
//
//	document.onclick = function() {
//		document.getElementById("ShowTip").style.display = "none";
//	}
//
//	document.getElementById("ShowText").ondblclick = function(e) {
//		_key = (e == null) ? event.keyCode : e.which
//		if (_key != 39 && _key != 40 && _key != 37 && _key != 38 && _key != 13
//				&& _key != 17)// && document.getElementById("ShowText").value
//		// != "")
//		{
//			document.getElementById("ShowTip").style.display = "";
//			document.getElementById("ShowTip").innerHTML = "<img src='../images/ajax-loader.gif'>&nbsp;正在获取提示...";
//			VCreateAjax("*.trend", BackArray, "KeyWord="
//							+ document.getElementById("ShowText").value);
//		}
//	}
//
//	document.getElementById("ShowText").onkeyup = function(e) {
//		_key = (e == null) ? event.keyCode : e.which
//		if (_key != 39 && _key != 40 && _key != 37 && _key != 38 && _key != 13
//				&& _key != 17) {
//			document.getElementById("ShowTip").style.display = "";
//			document.getElementById("ShowTip").innerHTML = "<img src='../images/ajax-loader.gif'>&nbsp;正在获取提示...";
//			// 类似ajax的一个方法
//			VCreateAjax("*.trend", BackArray, "KeyWord="
//							+ document.getElementById("ShowText").value);
//		}
//	}
//	document.onkeyup = function(e) {
//		_key = (e == null) ? event.keyCode : e.which
//		if (_key == 13) {
//			var pointnametext = document.getElementById("ShowText").value;
//			if (trend_Util.checkPointNameIsExist(pointnametext)) {
//				defaultTrendGroup.addName(pointnametext);
//				document.getElementById("ShowText").value = "";
//			}
//		}
//	}
//
//}
//
//function HideTip() {
//	var _key;
//	document.onkeyup = function(e) {
//		_key = (e == null) ? event.keyCode : e.which
//		if (_key != 39 && _key != 40 && _key != 37 && _key != 38 && _key != 13
//				&& _key != 17) {
//			document.getElementById("ShowTip").style.display = "none";
//			// document.getElementById("ShowTip").style.visibility="hidden";
//		}
//	}
//}
//
//function HideTTip() {
//	document.getElementById("ShowTip").style.display = "none";
//	// document.getElementById("ShowTip").style.visibility="hidden";
//}
//// ********************** 显示隐藏Tip层 ************************************* //
//
//// ********************** Ajax初始化函数 IE7.0 **********************//
//function VCreateAjax(VUrl, VBack, VVar) {
//	http_request_name = false;
//	if (window.XMLHttpRequest) {// Mozilla, Safari,...
//		http_request_name = new XMLHttpRequest();
//	}
//	if (window.ActiveXObject) { // IE
//		try {
//			http_request_name = new ActiveXObject("Msxml3.XMLHTTP");
//		} catch (e) {
//			try {
//				http_request_name = new ActiveXObject("Msxml2.XMLHTTP");
//			} catch (e) {
//				try {
//					http_request_name = new ActiveXObject("Microsoft.XMLHTTP");
//				} catch (e) {
//				}
//			}
//		}
//		if (http_request_name.overrideMimeType) {
//			http_request_name.overrideMimeType('text/html');
//		}
//
//	}
//
//	if (!http_request_name) {
//		document.getElementById("ShowTip").innerHTML = "<img src='../images/Icon_warning_01.gif' border='0'>&nbsp;不能创建XMLHTTP对象,请升级您的浏览器或操作系统！";
//		return false;
//	}
//	http_request_name.onreadystatechange = VBack;
//	http_request_name.open('POST', VUrl, true); // 这里用GET方法传递参数，不然会出现完成该操作所需的数据还不可使用的页面错误
//	http_request_name.setRequestHeader('Content-type',
//			'application/x-www-form-urlencoded');
//	http_request_name.send(VVar);
//
//}
//
//// ********************************回调函数************************************
//function BackArray() {
//	if (http_request_name.readyState == 4) {
//		if (http_request_name.status == 200) {
//			// 返回VCreateAjax 的URL 的Tip2.jsp的资源
//			var resSource = http_request_name.responseText;
//			// alert(resSource);
//			if (resSource != "") {
//				document.getElementById("ShowTip").innerHTML = "";
//				var strSplits = resSource.split('|');
//				var DIVStr = "";
//				var FormatStr = "";
//				var sum = strSplits.length - 1;
//				var elementText = document.getElementById("ShowText").value;
//				// alert(sum);
//				// 搜索有内容
//				if (sum > 1) {
//					for (i = 1; i < sum; i++)// cut 0, and the end element
//					{
//						FormatStr = strSplits[i].replace(elementText,
//								"<b><font color='black'>" + elementText
//										+ "</font></b>")
//						DIVStr += "<div id='"
//								+ i
//								+ "' hideFocus style='cursor:pointer;line-height:20px;' onmousemove='FocusOP("
//								+ i + "," + sum + ");' onmouseout='UFocusOP("
//								+ i + ");' onclick='ClickInner(\""
//								+ strSplits[i] + "\");'>" + FormatStr
//								+ "</div>";
//					}
//
//					document.getElementById("ShowTip").innerHTML = DIVStr;
//
//					var i = 1;
//					maxid = strSplits.length - 2;
//
//					FocusOP(i, maxid);
//					document.onkeydown = function(e) {
//						if (e == null)// For IE
//						{
//							_key = event.keyCode;
//						} else// For FireFox and other
//						{
//							_key = e.which;
//						}
//
//						// ///////////向下
//						if (_key == 39 || _key == 40) {
//							UFocusOP(i);
//							i = i + 1;
//							if (i > maxid) {
//								i = 1;
//							}
//							FocusOP(i, maxid);
//						}
//
//						// ///////////向上
//						else if (_key == 37 || _key == 38) {
//							UFocusOP(i);
//							i = i - 1;
//							if (i < 1) {
//								i = maxid;
//							}
//							FocusOP(i, maxid);
//						}
//						// 回车且弹出框显示有内容
//						if (_key == 13
//								&& document.getElementById("ShowTip").style.display != "none") {
//							if (window.XMLHttpRequest) {
//								document.getElementById("ShowText").value = document
//										.getElementById(i).textContent;
//							} else {
//								document.getElementById("ShowText").value = document
//										.getElementById(i).innerText;
//							}
//							document.getElementById("ShowTip").style.display = "none";
//						}
//					}// end key down
//				}//
//			} else {
//				alert("the context is empty...");
//				document.getElementById("ShowTip").style.display = "none";
//			}
//		} else {
//			// alert("6");
//			document.getElementById("ShowTip").innerHTML = "<img src='../images/Icon_warning_01.gif'>&nbsp;找不到您想要的点！！";
//		}
//	}
//}
//
//// 获取焦点
//function FocusOP(OPP, VNum) {
//	// 清除其它焦点
//	for (M = 1; M < VNum; M++) {
//		document.getElementById(M).focus = false;
//		document.getElementById(M).style.background = "white";
//	}
//	document.getElementById(OPP).focus = true;
//	document.getElementById(OPP).style.background = "#a9e4e9";// change to
//
//}
//// 失去焦点
//function UFocusOP(EID) {
//	// alert(EID + " UFocusOP ");
//	document.getElementById(EID).focus = false;
//	document.getElementById(EID).style.background = "#FFFFFF";
//
//}
//
//// 单击注入值
//function ClickInner(strValue) {
//	document.getElementById("ShowText").value = strValue;
//	document.getElementById("ShowTip").style.display = "none";
//}
//
//function test() {
//	alert("hehe");
//}
