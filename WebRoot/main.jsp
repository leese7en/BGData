<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<link rel="icon" href="images/bigdata.png" />
		<title>大数据 |分析应用</title>
		<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
		<link rel="stylesheet" href="js/bootstrap-3.3.5/css/bootstrap.min.css">
		<link href="js/toastr/toastr.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="css/awesome/font-awesome.min.css">
		<link rel="stylesheet" href="css/awesome/ionicons.min.css" />
		<link rel="stylesheet" href="js/AdminLTE/css/AdminLTE.min.css">
		<link rel="stylesheet" href="js/AdminLTE/css/skins/skin-blue.min.css">
		<link href="css/index/main.css" rel="stylesheet" type="text/css" />
	</head>
	<body class="hold-transition skin-blue sidebar-mini">
		<div class="wrapper">
			<header class="main-header">
			<a class="logo" style="background-color:#26272d;"> <span class="logo-mini"><b>OP</b>DT</span> <span class="logo-lg"><b>麦杰大数据分析应用</b>
			</span> </a>
			<nav class="navbar navbar-static-top" role="navigation" style="background-color:black;">
			<a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"> <span class="sr-only">Toggle
					navigation</span> </a>
			<div class="navbar-custom-menu">
				<ul class="nav navbar-nav" id = "userMenuPage">
					<li class="dropdown user user-menu">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown"> <img src="js/AdminLTE/img/user2-160x160.jpg"
								class="user-image" alt="User Image"> <span id = "userName" class="hidden-xs">李洪灯</span>
								<input type = "hidden" id = "userId"/>
								 </a>
						<ul class="dropdown-menu">
							<li class="header">
								<p>
									我是测试人员，有问题不要找我！
									<br/> 
									找我也不给解决！！！
								</p>
							</li>
							<li class="user-body">
								<div class="row">
									<div class="col-xs-4 text-center">
										<a href="#">Followers</a>
									</div>
									<div class="col-xs-4 text-center">
										<a href="#">Sales</a>
									</div>
									<div class="col-xs-4 text-center">
										<a href="#">Friends</a>
									</div>
								</div>
							</li>
							<li class="user-footer">
								<div class="row">
									<div class="col-xs-4 text-center">
										<a href="#" onclick="userInfo()" class="btn btn-default btn-flat">Profile</a>
									</div>
									<div class="col-xs-4 text-center">
										<a href="top-right3.html" class="btn btn-default btn-flat">Help</a>
									</div>
									<div class="col-xs-4 text-center">
										<a href="#" onclick="exit()" class="btn btn-default btn-flat">Sign out</a>
									</div>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			</nav>
			</header>
			<aside class="main-sidebar">
			<section class="sidebar">
			<ul class="sidebar-menu" id = "userMenu">
			</ul>
			</section>
			</aside>
			<div class="content-wrapper">
				<div class="content-wrapper" style="position:absolute;left:0px;top:50px;right:0;bottom:50px;overflow-y:auto;">
				    <iframe id="contentIfream" name="contentIfream" src="power/change.html"
				            style="width: 100%;height: 99%;overflow-y:auto;"></iframe>
				</div>
			</div>
			<div class="control-sidebar-bg"></div>
		</div>
		<script src="js/jquery-1.9.1.min.js">
</script>
		<script src="js/bootstrap-3.3.5/js/bootstrap.min.js">
</script>
		<script src="js/AdminLTE/js/app.min.js">
</script>
<script src="js/toastr/toastr.min.js">
</script>
<script src="js/main/main.js">
</script>
	</body>
</html>
