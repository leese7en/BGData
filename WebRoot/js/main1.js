// /**
//  * Created by se7en on 2015/11/3.
//  */
// /**
//  * 定义时间间隔 ，当间隔时间达到60000时，重新调用后台获取时间
//  */
// var timeInterval = 0;
// /**
//  * 当前时间
//  */
// var nowTime = 0;
// /**
//  * 获取服务器时间
//  */

// var setting = {
//     data: {
//         simpleData: {
//             enable: true
//         }
//     },
//     callback: {
//         onClick: menuClick
//     }
// };

// $(document).ready(function () {
//         refreshMenu();
//         getCurrentUser();
//         var href = 'demo/changedemo.html';
//         initTab();

//         var tt = $('#tabs');
//         var content = '<iframe scrolling="auto" frameborder="0" style="width:100%;height:99.5%;" src="' + href + ' "></iframe>';
//         tt.tabs('add', {
//             title: '首页',
//             closable: true,
//             content: content
//         });
//     });

// /**
//  *刷新菜单
//  */
// function refreshMenu() {
//     $.ajax({
//         type: 'get',
//         url: 'getMenus',
//         cache: false,
//         dataType: 'json',
//         success: function (data) {
//             $.fn.zTree.init($("#userMenu"), setting, data);
//         },
//         error: function () {
//             console.log('加载菜单失败！')
//         }
//     });
// }

// function getCurrentUser() {
//     $.ajax({
//         type: 'get',
//         url: 'getCurrentUser',
//         cache: false,
//         dataType: 'json',
//         success: function (data) {
//             var userName = data.userName;
//             $('#username').html(userName);
//         }
//     });
// }

// /**
//  * 点击菜单的时候执行
//  * @param title
//  * @param href
//  */
// function addTab(title, href) {
//     var tt = $('#tabs');
//     if (tt.tabs('exists', title)) {//如果tab已经存在,则选中并刷新该tab
//         tt.tabs('select', title);
//     } else {
//         if (href) {
//             var content = '<iframe scrolling="auto" frameborder="0" style="width:100%;height:99.5%;" src="' + href + ' "></iframe>';
//         } else {
//             var content = '未实现';
//         }
//         tt.tabs('add', {
//             title: title,
//             closable: true,
//             content: content
//         });
//     }
// }
// /**
//  * 刷新tab
//  * @cfg
//  *example: {tabTitle:'tabTitle',url:'refreshUrl'}
//  *如果tabTitle为空，则默认刷新当前选中的tab
//  *如果url为空，则默认以原来的url进行reload
//  */
// function refreshTab(cfg) {
//     var refresh_tab = cfg.tabTitle ? $('#tabs').tabs('getTab', cfg.tabTitle) : $('#tabs').tabs('getSelected');
//     if (refresh_tab && refresh_tab.find('iframe').length > 0) {
//         var _refresh_ifram = refresh_tab.find('iframe')[0];
//         var refresh_url = cfg.url ? cfg.url : _refresh_ifram.src;
//         //_refresh_ifram.src = refresh_url;
//         _refresh_ifram.contentWindow.location.href = refresh_url;
//     }
// }

// function menuClick(event, treeId, treeNode, clickFlag) {
//     if (treeNode.path != '') {
//         addTab(treeNode.name, treeNode.path);
//     }

// }

// function initTab(){
// 	tabClose();
// 	tabCloseEven();
// }

// function tabClose()
// {
// 	/*双击关闭TAB选项卡*/
// 	// $(".tabs-inneri").live('dblclick',function(){ 
// 	// 	var subtitle = $(this).children(".tabs-closable").text();
// 	// 	$('#tabs').tabs('close',subtitle);
// 	// })
// 	$(document).on('dblclick', '.tabs-inneri', function(){ 
// 		var subtitle = $(this).children(".tabs-closable").text();
// 		$('#tabs').tabs('close',subtitle);
// 	})
// 	/*为选项卡绑定右键*/
// 	// $(".tabs-inner").live('contextmenu',function(e){
// 	// 	$('#mm').menu('show', {
// 	// 		left: e.pageX,
// 	// 		top: e.pageY
// 	// 	});

// 	// 	var subtitle =$(this).children(".tabs-closable").text();

// 	// 	$('#mm').data("currtab",subtitle);
// 	// 	$('#tabs').tabs('select',subtitle);
// 	// 	return false;
// 	// });
// 	$(document).on('contextmenu', '.tabs-inner', function(e){
// 		$('#mm').menu('show', {
// 			left: e.pageX,
// 			top: e.pageY
// 		});

// 		var subtitle =$(this).children(".tabs-closable").text();

// 		$('#mm').data("currtab",subtitle);
// 		$('#tabs').tabs('select',subtitle);
// 		return false;
// 	});
// }
// //绑定右键菜单事件
// function tabCloseEven()
// {
// 	//刷新
// 	$('#mm-tabupdate').click(function(){
// 		var currTab = $('#tabs').tabs('getSelected');
// 		var url = $(currTab.panel('options').content).attr('src');
// 		$('#tabs').tabs('update',{
// 			tab:currTab,
// 			options:{
// 				content:createFrame(url)
// 			}
// 		})
// 	})
// 	//关闭当前
// 	$('#mm-tabclose').click(function(){
// 		var currtab_title = $('#mm').data("currtab");
// 		$('#tabs').tabs('close',currtab_title);
// 	})
// 	//全部关闭
// 	$('#mm-tabcloseall').click(function(){
// 		$('.tabs-inner span').each(function(i,n){
// 			var t = $(n).text();
// 			$('#tabs').tabs('close',t);
// 		});
// 	});
// 	//关闭除当前之外的TAB
// 	$('#mm-tabcloseother').click(function(){
// 		$('#mm-tabcloseright').click();
// 		$('#mm-tabcloseleft').click();
// 	});
// 	//关闭当前右侧的TAB
// 	$('#mm-tabcloseright').click(function(){
// 		var nextall = $('.tabs-selected').nextAll();
// 		if(nextall.length==0){
// 			return false;
// 		}
// 		nextall.each(function(i,n){
// 			var t=$('a:eq(0) span',$(n)).text();
// 			$('#tabs').tabs('close',t);
// 		});
// 		return false;
// 	});
// 	//关闭当前左侧的TAB
// 	$('#mm-tabcloseleft').click(function(){
// 		var prevall = $('.tabs-selected').prevAll();
// 		if(prevall.length==0){
// 			return false;
// 		}
// 		prevall.each(function(i,n){
// 			var t=$('a:eq(0) span',$(n)).text();
// 			$('#tabs').tabs('close',t);
// 		});
// 		return false;
// 	});

// 	//退出
// 	$("#mm-exit").click(function(){
// 		$('#mm').menu('hide');
// 	})
// }

/**
 * Created by se7en on 2015/12/2.
 */

var currentPage = 0;
var pageSize = 5;
var menuParentCount = 0;

/**
 * 获取menu
 */
$(document).ready(function() {
	getCurrentUser();
	getResources();
	var height = $(window).height() - 75;
	$('#iframe_subpage').attr('height', height + 'px');
	$(window).resize(function() {
		var height = $(window).height() - 75;
		$('#iframe_subpage').attr('height', height + 'px');
	});
	$('#tabs').addtabs({
		'close': true
	});
	//打开历史变迁
	$("#Home").click();
});

/**
 * 用户登录
 */
function getResources() {
	$.ajax({
		type: 'get',
		url: 'getMenus',
		dataType: 'json',
		success: function(data) {
			var value = data;
			var menu = '';
			for (var i in value) {
				var obj = value[i];
				var url = '';
				if (obj.path) {
					url = obj.path;
				}
				menu = '';
				//如果是父级节点
				if (obj.pId == 0) {
					//是否显示
					if (menuParentCount < pageSize) {
						menu = '<li><a id ="menu_' + obj.id + '" class="menuGroup menu_' + menuParentCount + '" href="#" addtabs="' + obj.id + '" url="' + obj.path + '">' + obj.name + '</a></li>';
					} else {
						menu = '<li><a id ="menu_' + obj.id + '" class="menuGroup menu_' + menuParentCount + '" href="#" addtabs="' + obj.id + '" url="' + obj.path + '" style="display:none">' + obj.name + '</a></li>';
					}
					menuParentCount++;
					$('#menuGroup').append(menu);
				} else {
					menu = '<li ><a id ="menu_' + obj.id + '" href="#" addtabs="' + obj.id + '" url="' + obj.path + '">' + obj.name + '</a></li>';
					var menuParID = '#menu_' + obj.pId;
					var parentObj = $(menuParID).parent();
					if (parentObj.find('ul').length < 1) {
						$(menuParID).parent().addClass('dropdown').append('<ul></ul>').find('ul').addClass('dropdown-menu');
						$(menuParID).attr('data-toggle', 'dropdown').append(' <b class="caret"></b>');
						$(menuParID).removeAttr('addtabs').removeAttr('url');
					}
					$(menuParID).parent().find('ul').append(menu);
				}
				//如果是多级菜单则移出dropdwon   class，增加dropdown-submenu  class
				$('.dropdown .dropdown').removeClass('dropdown').addClass('dropdown-submenu');
				//移除子菜单的下面a 标签的data-toggle 属性、dropdown-toggle class 、移除 class 为caret的标签
				$('.dropdown .dropdown-submenu a').removeAttr('data-toggle').removeClass('dropdown-toggle').find('b').remove(
					'.caret');
			}

			// }
			// else {
			//     console.log('获取资源出错:' + data.Message);
			// }
			if (menuParentCount < pageSize) {
				$('.menuLeft').hide();
				$('.menuRight').hide();
			}
		},
		error: function() {
			console.log('获取资源出错');
		}
	});
}

function getCurrentUser() {
	$.ajax({
		type: 'get',
		url: 'getCurrentUser',
		cache: false,
		dataType: 'json',
		success: function(data) {
			var userName = data.userName;
			$('#username').html(userName);
		}
	});
}

/**
 * 退出登录
 */
function exit() {
	window.location.href = 'logOut';
}
/**
 *如果菜单过多则添加向左移动事件
 */
function menuLeft() {
	var menus = $('#menuGroup .menuGroup');
	var length = menus.length - pageSize - 1;
	if (currentPage < length) {
		var hiddenId = '#menuGroup .menu_' + (currentPage);
		var showId = '#menuGroup .menu_' + (currentPage + pageSize);
		$(hiddenId).hide(200);
		$(showId).show(200);
		currentPage++;
	}
}

/**
 * 如果菜单过多则添加向右移动的事件
 */
function menuRight() {
	var menus = $('#menuGroup .menuGroup');
	if (currentPage > 0) {
		var showId = '#menuGroup .menu_' + (currentPage - 1);
		var hiddenId = '#menuGroup .menu_' + (currentPage + pageSize - 1);
		$(showId).show(200);
		$(hiddenId).hide(200);
		currentPage--;
	}
}

/**
 * 显示标签页
 * @param name
 * @param url
 */
function showMenu(name, url) {
	if (url) {
		$('#iframe_subpage').attr('src', url);
	}
}

/**
 * 编辑用户信息
 */
// function userInfo() {
//     // 弹出添加框
//     $('#userInfo').modal({
//         backdrop: 'static'
//     });
//     $.ajax({
//         type: 'get',
//         url: '/getUserInfo',
//         dataType: 'json',
//         success: function (data) {
//             var flag = data.Flag;
//             if (flag == 0) {
//                 editUserInfo(data);
//             }
//         },
//         error: function () {
//         }
//     })
// }
// function closeUpdateUserModal() {
//     // 关闭modal窗口
//     $('#userInfo').modal('hide');
//     $('#userId').val('');
//     $('#userName').val('');
//     $('#userNickName').val('');
//     $('#userDesc').val('');
//     $('#password').val('');
//     $('#newPass').val('');
//     $('#newPassAgain').val('');
// }
/**
 * 显示用户信息框
 * @param value
 */
// function editUserInfo(data) {
//     var value = data.Data;
//     $('#userId').val(value.ID);
//     $('#userName').val(value.Name);
//     $('#userNickname').val(value.NickName);
//     $('#userDesc').val(value.Desc);
// }
/**
 * 更新用户信息
 */
// function updateUserInfo() {
//     var userId = $('#userId').val();
//     var nickName = $('#userNickname').val();
//     var desc = $('#userDesc').val();
//     $.ajax({
//         type: 'post',
//         url: '/updateUserBasic',
//         data: {
//             userId: userId,
//             nickName: nickName,
//             desc: desc
//         },
//         dataType: 'json',
//         success: function (data) {
//             var flag = data.Flag;
//             if (flag == 0) {
//                 //$.messager.alert('info', '更新用户信息成功', 'info');
//                 alert('更新用户信息成功');
//                 closeUpdateUserModal();
//             }
//             else {
//                 /*  $.messager.alert('error', data.Message, 'error');*/
//                 alert(data.Message);
//             }
//         },
//         error: function () {
//         }
//     });
// }
/**
 * 更新用户密码信息
 */
// function changePassword() {
//     var userId = $('#userId').val();
//     var oldPassword = $('#password').val();
//     if (!oldPassword || oldPassword.trim().length < 6 || oldPassword.length > 12) {
//         //$.messager.alert('error', '密码位数介于6到12', 'error');
//         alert('密码位数介于6到12');
//         return;
//     }
//     var newPasswd = $('#newPass').val();
//     if (!newPasswd || newPasswd.trim().length > 12 || newPasswd.trim().length < 6) {
//         //$.messager.alert('error', '密码位数介于6到12', 'error');
//         alert('密码位数介于6到12');
//         return;
//     }
//     var newPasswdA = $('#newPassAgain').val();
//     if (newPasswd.trim() != newPasswdA.trim()) {
//         //$.messager.alert('error', '两次密码不一样', 'error');
//         alert('两次密码不一样');
//         return;
//     }
//     $.ajax({
//         type: 'post',
//         url: '/changePassword',
//         data: {
//             userId: userId,
//             pass: oldPassword,
//             passNew: newPasswd,
//             passAgain: newPasswdA
//         },
//         dataType: 'json',
//         success: function (data) {
//             var flag = data.Flag;
//             if (flag == 0) {
//                 //$.messager.alert('info', '更新密码成功', 'info');
//                 alert('更新密码成功');
//                 closeUpdateUserModal();
//             }
//             else {
//                 //$.messager.alert('error', data.Message, 'error');
//                 alert(data.Message);
//             }
//         },
//         error: function () {
//         }
//     });
// }