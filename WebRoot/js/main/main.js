/**
 * Created by se7en on 2015/12/2.
 */

var currentPage = 0;
var pageSize = 5;
var menuParentCount = 0;
/**
 * 菜单集合
 */
var menuObj = new Object();

/**
 * 获取menu
 */
$(document).ready(function() {
	toastr.options.positionClass = 'toast-top-center';
	getCurrentUser();
	getResources();

	/**
	 * 打开历史变迁
	 */
	//	$("#Home").click();
	});

/**
 * 用户登录
 */
function getResources() {
	$('[data-toggle="offcanvas"]').click();
	$
			.ajax( {
				type : 'get',
				url : 'getMenus',
				dataType : 'json',
				success : function(value) {
					var html = '<li class="has-sub"> <a href="javascript:void(0);"><span>导航选中演示</span><i class="fa fa-caret-right fa-fw pull-right"></i></a>' + '<ul class="sub-menu"> <li><a href="left1.html"><i class="fa fa-circle-o fa-fw"></i>&nbsp;left1</a></li><li>' + '<a href="left2.html"><i class="fa fa-circle-o fa-fw"></i>&nbsp;left2</a></li> <li><a href="left3.html">' + '<i class="fa fa-circle-o fa-fw"></i>&nbsp;left3</a></li> </ul></li>'
					var menu = '';
					for ( var i in value) {
						var obj = value[i];
						var url = '';
						if (obj.path) {
							url = obj.path;
						}
						menu = '';
						//如果是父级节点
						if (obj.pId == 0) {
							//是否显示
							menu = '<li class="dropdown messages-menu"><a href="#" class="dropdown-toggle" data-toggle="dropdown" onclick="mainMenuClick('
									+ obj.id + ')"> <i class="' + obj.icon + '"></i> ' + obj.name + '</a></li>';
							$('#userMenuPage').find('.user-menu').before(menu);
						} else {
							if (!url) {
								menu = '<li class="treeview" pId="menu_'
										+ obj.pId
										+ '"><a href="#"> <i class="'
										+ (obj.icon ? obj.icon : 'fa fa-list')
										+ '"></i> <span>'
										+ obj.name
										+ '</span> <span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i> </span> </a>';
								menu += ' <ul class="treeview-menu" id="menu_' + obj.id + '"></ul></li>';
								$('#userMenu').append(menu);
							} else {
								menu = ' <li><a href="#" url="' + obj.path + '"><i class="fa fa-circle-o"></i>'
										+ obj.name + '</a></li>';
								$('#menu_' + obj.pId).append(menu);
							}
						}
					}
					$('#userMenu .treeview').hide();

					$('.sidebar-menu a').click(function(e) {
						var obj = $(this);
						var url = $(obj).attr('url');
						if (url) {
							$('#contentIfream').attr('src', url + '?times=' + new Date().getTime());
						}
					});
				},
				error : function() {
					console.log('获取资源出错');
				}
			});
}

/**
 * 主菜单 点击事件
 * @param {Object} val
 */
function mainMenuClick(val) {
	var pId = 'menu_' + val;
	$('#userMenu .treeview').hide();
	$('[pid="' + pId + '"]').show();
}

function getCurrentUser() {
	$.ajax( {
		type : 'get',
		url : 'getCurrentUser',
		cache : false,
		dataType : 'json',
		success : function(data) {
			var userName = data.userName;
			$('#userName').html(' ' + userName + ' ');
			$('#userId').val(data.userId);
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
function userInfo() {
	// 弹出添加框
	$('#userInfo').modal( {
		backdrop : 'static'
	});
}
function closeUpdateUserModal() {
	// 关闭modal窗口
	$('#userInfo').modal('hide');
	$('#password').val('');
	$('#newPass').val('');
	$('#newPassAgain').val('');
}

/**
 * 更新用户密码信息
 */
function changePassword() {
	var userId = $('#userId').val();
	if (!userId) {
		toastr.warning('当前信息失效，请重新登录');
		return;
	}
	var oldPassword = $('#password').val();
	if (!oldPassword || oldPassword.trim().length < 6 || oldPassword.length > 12) {
		toastr.warning('密码位数介于6到12');
		return;
	}
	var newPasswd = $('#newPass').val();
	if (!newPasswd || newPasswd.trim().length > 12 || newPasswd.trim().length < 6) {
		toastr.warning('密码位数介于6到12');
		return;
	}
	var newPasswdA = $('#newPassAgain').val();
	if (newPasswd.trim() != newPasswdA.trim()) {
		toastr.warning('两次密码不一样');
		return;
	}
	$.ajax( {
		type : 'post',
		url : 'changePassword',
		data : {
			userId : userId,
			pass : oldPassword,
			passNew : newPasswd,
			passAgain : newPasswdA
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag < 0) {
				toastr.warning(data.message);
				return;
			} else {
				toastr.success('更新密码成功');
				closeUpdateUserModal();
			}
		},
		error : function() {
			toastr.error('更新密码失败');
		}
	});
}
var pageInitModule = (function(mod) {
	mod.setCarousel = function() {
		try {
			$('.carousel').hammer().on('swipeleft', function() {
				$(this).carousel('next');
			});
			$('.carousel').hammer().on('swiperight', function() {
				$(this).carousel('prev');
			});
		} catch (e) {
			console.log("you mush import hammer.js and jquery.hammer.js to let the carousel can be touched on mobile");
		}
	};
	mod.setWidth = function() {
		if ($(window).width() < 768) {
			$(".sidebar").css( {
				left : 220
			});
			$(".all").css( {
				marginLeft : 0
			});
		} else {
			$(".sidebar").animate( {
				left : 0
			});
			$(".all").animate( {
				marginLeft : 220
			});
		}
	};
	mod.setScrollToTop = function() {
		var top = $(window).scrollTop();
		if (top < 60) {
			$('#goTop').hide();
		} else {
			$('#goTop').show();
		}
	};
	mod.setSidebar = function() {
		$('[data-target="sidebar"]').click(function() {
			var asideleft = $(".sidebar").offset().left;
			if (asideleft == 0) {
				$(".sidebar").animate( {
					left : -180
				});
				$(".all").animate( {
					marginLeft : 25
				});
				$('#closeOrOpen').attr('state', '0');
				$('#closeOrOpen').removeClass(' icon-double-angle-left').addClass(' icon-double-angle-right');
			} else {
				$(".sidebar").animate( {
					left : 0
				});
				$(".all").animate( {
					marginLeft : 205
				});
				$('#closeOrOpen').attr('state', '1');
				$('#closeOrOpen').removeClass(' icon-double-angle-right').addClass(' icon-double-angle-left');
			}
		});
		$(".has-sub>a").click(function() {
			$(this).parent().siblings().find(".sub-menu").slideUp();
			$(this).parent().find(".sub-menu").slideToggle();
		})
		var _strcurrenturl = window.location.href.toLowerCase();
		$(".navbar-nav a[href],.sidebar a[href]").each(function() {
			var href = $(this).attr("href").toLowerCase();
			var isActive = false;
			$(".breadcrumb>li a[href]").each(function(index) {
				if (href == $(this).attr("href").toLowerCase()) {
					isActive = true;
					return false;
				}
			})
			if (_strcurrenturl.indexOf(href) > -1 || isActive) {
				$(this).parent().addClass("active");
				if ($(this).parents("ul").attr("class") == "sub-menu") {
					//					$(this).parents("ul").slideDown();
				$(this).parents(".has-sub").addClass("active");
			}
		}
	}	)
	}
	return mod;
})(window.pageInitModule || {});
