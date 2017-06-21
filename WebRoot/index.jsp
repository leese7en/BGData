<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML>
<html>
	<head>
		<base href="<%=basePath%>">
		<title>环保大数据</title>
		<!-- 用于设定禁止浏览器从本地的缓存中调阅页面内容, 设定后一旦离开网页就无法从Cache中再调出 -->
		<meta http-equiv="pragma" content="no-cache"/>
		<!-- 设定网页的到期时间,一旦网页过期,必须到服务器上重新传输 -->
		<meta http-equiv="expires" content="0"/>
		<link href="css/login/login.css" rel="stylesheet" type="text/css"/>
	</head>

	<body onload="document.getElementById('name').focus();">
		<div class="wrap">
			<div class="header">
				<h2>
					生态环境大数据
				</h2>
			</div>
			<div class="login_box">
				<div class="form">
					<form id="loginAction" action="login" method="post">
						<h1>
							欢迎使用生态环境大数据决策分析应用系统
						</h1>
						<ul>
							<li>
								<div class="r_con">
									<i class="name"></i>
									<input id="name" name="userName" type="text" value="tp"
										placeholder="用户名" class="text" />
								</div>
							</li>
							<li>
								<div class="r_con">
									<i class="password"></i>
									<input id="passwd" name="password" type="password"
										value="123456" placeholder="密码" class="text" />
								</div>
							</li>
							<li>
								<div class="r_con">

								</div>
							</li>
							<li class="btn_box">
								<div class="r_con">
									<input name="提交" type="button" class="btn" value="立即登录"
										onclick="this.form.submit()">
								</div>
							</li>
							<li class="tip">
								<p>

								</p>
							</li>
						</ul>
					</form>
				</div>
				<img src="images/login.png">
			</div>
					</div>
					<p class="copyright" style="position:fixed;bottom:20px;width:100%;text-align:center;">
				技术支持：上海麦杰科技股份有限公司
			</p>
	</body>
	<script type="text/javascript" src="js/jquery-1.9.1.min.js">
</script>
		<script type="text/javascript" src="js/login/login.js">
</script>
</html>
