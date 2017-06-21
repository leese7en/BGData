<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>环保大数据</title>
		<link rel="stylesheet" href="css/bootstrap/bootstrap.min.menu.css">
		<link href="css/bootstrap/bootstrap-addtabs.css" rel="stylesheet">
		<link rel='stylesheet' href='css/zTree/zTreeStyle.css' />
		<link rel='stylesheet' href='css/main/main.css' />
	</head>
	<body>
		<nav class="navbar navbar-default navbar-fixed-top" style="min-height: 50px">
		<div class="container" style="float: left;">
			<div class="navbar-header" style="float: left;">
				<a class="navbar-brand" href="#" style="color: #fff; font-weight: bold; font-size: 16px; margin: 0 30px;">生态环境大数据分析应用示范平台
				</a>
			</div>
			<div id="navbar" class="collapse navbar-collapse" style="float: left;">
				<ul id="menuGroup" class="nav navbar-nav">
					<li class="menuGroup active">
						<a href="#" id="Home" addtabs="Home" url="power/change.html">历史变迁</a>
					</li>
				</ul>
			</div>
		</div>
		<ul class="navbar-right" style="margin-top: 10px; margin-right: 20px;">
			<li type="button" class="btn btn-primary btn-sm" onclick="userInfo()" style="margin-right: 8px;">
				<i class="glyphicon glyphicon-user"></i><span id="username" style="padding-right: 6px; padding-left: 8px;"></span>
				<!-- 用户名 -->
			</li>
			<li type="button" class="btn btn-default btn-sm" onclick="exit()" style="color: #fff;">
				<i class="glyphicon glyphicon-off"></i><span style="padding-right: 6px; color: #fff"></span> 退出
			</li>
		</ul>
		</nav>
		<div class="col-md-12">
			<div id="tabs">
				<!-- Nav tabs -->
				<ul class="nav nav-tabs" role="tablist">

				</ul>
				<!-- Tab panes -->
				<div class="tab-content">
				</div>
			</div>
		</div>
	</body>
	<script src="js/jquery-1.9.1.min.js">
</script>
	<script src="js/bootstrap.min.js">
</script>
	<script src="js/bootstrap-addtabs.js">
</script>
	<script src="js/jquery.ztree.core-3.5.js">
</script>
	<script src="js/main1.js">
</script>
</html>