<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<link rel="icon" href="images/bigdata.png" />
		<!--bootstrap库-->
		<link href="css/bootstrap/bootstrap.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="css/font-awesome/css/font-awesome.min.css">
		<link rel="stylesheet" href="js/bootstrap-addtabs/css/bootstrap-addtabs.css" type="text/css" media="screen" />
		<link href="js/toastr/toastr.min.css" rel="stylesheet" />
		<!--jquery库-->
		<script type="text/javascript" src="js/jquery-1.9.1.min.js">
</script>
		<script src="js/bootstrap-3.3.5/js/bootstrap.min.js">
</script>
		<!--font-awesome字体库-->
		<link href="css/font-awesome.min.css" rel="stylesheet" />
		<!--页面加载进度条-->
		<link href="css/pace/dataurl.css" rel="stylesheet" />
		<script src="js/pace/pace.min.js">
</script>
		<!--平滑滚动到顶部库-->
		<script src="js/jquery.scrolltopcontrol/scrolltopcontrol.js" type="text/javascript">
</script>
		<!--主要写的jquery拓展方法-->
		<script src="js/jquery.extend.js" type="text/javascript">
</script>
		<script src="js/bootstrap-addtabs/js/bootstrap-addtabs.js">
</script>
<script src="js/toastr/toastr.min.js">
</script>
		<!--主要写的css代码-->
		<link href="css/main.css" rel="stylesheet" type="text/css" />
		<!--主要写的js代码-->
		<script src="js/main.js" type="text/javascript">
</script>
	</head>
	<body>
		<nav class="navbar navbar-inverse navbar-fixed-top" style="height:20px;">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle show pull-left" data-target="sidebar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="m.jsp">生态环境大数据分析应用示范平台</a>
			</div>
			<div id="navbar" class="collapse navbar-collapse">
				<ul class="nav navbar-nav navbar-right">
					<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><i
							class="fa fa-user fa-fw"></i><span id="userName"></span><span class="caret"></span>
						</a>
						<ul class="dropdown-menu" role="menu">
							<li>
								<a onclick="userInfo()">
									<i class="fa fa-sign-out fa-fw" ></i>&nbsp;修改密码
								</a>
							</li>
							<li class="divider"></li>
							<li>
								<a href="top-right3.html"><i class="fa fa-sign-out fa-fw"></i>&nbsp;帮助</a>
							</li>
							<li class="divider"></li>
							<li>
								<a onclick="exit()">
									<i class="glyphicon glyphicon-off" ></i>&nbsp;注销
								</a>
							</li>
						</ul>
					</li>
				</ul>
				<ul class="nav navbar-nav navbar-right" id="mainMenu">
					<li>
						<a href="#" class="glyphicon glyphicon-eye-open" style="margin-top: -3px;" id="Home" addtabs="Home"
							url="power/change.html">十二五建设成果</a>
					</li>
				</ul>
			</div>
		</div>
		</nav>
		<div class="container-fluid all" style="margin-left: 25px">
			<div class="sidebar" style="left: -180px;">
				<ul class="nav" id="childMenu">
				</ul>
				<i class="icon-double-angle-right icon-large" style="position: absolute; bottom: 60px; right: 15px;"
					id="closeOrOpen" state="0"></i>
			</div>
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
		</div>
<div class="modal fade in" id="userInfo" tabindex="-1" role="dialog" aria-hidden="true"
     style="z-index: 1100;">
    <div class="modal-dialog" style="width:400px;margin-top: 100px">
        <div class="modal-content">
            <div class="modal-header">
                <button class="close" type="button" aria-hidden="true" onclick="closeUpdateUserModal()">&times;</button>
                <h4 class="modal-title" id="point-title"> 修改密码 </h4>
            </div>
            <div class="modal-body">
                <input type="hidden" id="userId">
                <div>
                    <div class="tab-content">
                            <form class="form-horizontal" role="form" action="#" style="padding-top: 10px;">
                                <input type="hidden" id="driver_type">

                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="password">旧密码</label>

                                    <div class="col-md-8">
                                        <input type="password" class="form-control" id="password">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="newPass">新密码</label>

                                    <div class="col-md-8">
                                        <input type="password" class="form-control" id="newPass"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label" for="newPassAgain">密码确认</label>

                                    <div class="col-md-8">
                                        <input type="password" class="form-control" id="newPassAgain"/>
                                    </div>
                                </div>
                            </form>
                            <div class="modal-footer" style="text-align: center;">
                                <button class="btn btn-primary" type="button" onclick="changePassword()">提交
                                </button>
                                <button class="btn btn-default" type="button" onclick="closeUpdateUserModal()">取消
                                </button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
		<a href="#top" id="goTop"><i class="fa fa-angle-up fa-3x"></i>
		</a>
		
		
	</body>
</html>