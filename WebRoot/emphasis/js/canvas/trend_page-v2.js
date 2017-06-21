var defaultTrendGroup = {
	pointType : "plot",// span-->等间距，plot-->绘图值
	isDialog : false, // 是否弹出窗引用
	trendExportPicURL : "../../trendExport_export",// 导出服务
	defaultTrendServerName : "../../trend_getData",// 数据服务
	flushInterval : 1000,// 刷新间隔
	formatString : 'yyyy-MM-dd HH:mm:ss',
	defaultTrendString : new Array(),// 点名组
	history : "history",//历史回放
	trendIntervalId : 0,
	trendStopFlushFlags : new Array(),// 趋势停止标记

	trendDialogWidth : 770,
	trendDialogHeight : 400,

	trendDialogRealHeight : document.documentElement.clientHeight * 9 / 10,
	trendDialogRealWidth : document.documentElement.clientWidth * 8 / 9,

	trendDialogMaxHeight : document.documentElement.clientHeight - 10,
	trendDialogMaxWidth : document.documentElement.clientWidth - 10,
	trendTableInputColor : [],// 颜色选择器InputID
	trendDialogNormalHeight : document.documentElement.clientHeight * 4 / 5,
	trendDialogNormalWidth : document.documentElement.clientWidth * 3 / 4,

	dialogState : "min",
	linePointCount : 1600,// 曲线点数
	trendLineWidth : 1,
	trend_getData4CheckboxFlag : false,

	mouseLeaveXY : new Array(),// 记录鼠标离开画布时的坐标
	trendTotleCount : 8,// 曲线个数
	trendIdFlags : [],// 趋势当前值
	trendColorFlags : [],// 趋势表格颜色ID
	trendTableCheckBoxId : [],// checkBoxID(TR-ID)
	trendYaxisCount : [],// 存放y轴数组
	chcekdPointNames : [], // 存放checkbox选中的点名
	trendConfigInfoMap : new trendUtilMap(),// 初始化上下限Map

	colorMap : new trendUtilMap(),// 初始化颜色Map
	descMap : new trendUtilMap(),// 初始化描述Map
	pointTypeMap : new trendUtilMap(),
	trendChartColors : [ '#FF0000', '#FFFF00', '#00FF00', '#6666E1', '#00FFFF', '#FF00FF', '#FF007B', '#804000',
			'#FFAFAF', '#99CC00', '#FFC800', '#CCFFFF', '#695D61', '#00EBA3', '#8540FF', '#FF9900' ],// 颜色初始化赋值
	/**
	 * 初始化属性
	 *
	 * @param {}
	 *            from
	 * @param {}
	 *            to
	 * @param {}
	 *            playing
	 * @param {}
	 *            width
	 * @param {}
	 *            height
	 */

	initProperties : function(from, to, width, height, current) {
		if (!trend_Util.isNull(from)) {
			opTrend.from = from;
		}
		if (!trend_Util.isNull(to)) {
			opTrend.to = to;
		}
		// 表格高度
		// $("#pointsMessage").css({height:tableHeight});
		// 边框设置
		opTrend.margin_top = 0;
		opTrend.margin_bottom = 25;
		opTrend.margin_padding = 0;
		opTrend.xAxisScaleCount = 5;// x刻度
		opTrend.trend_backLineCount = 5;

		var _width = defaultTrendGroup.trendDialogWidth - 50;
		var _bounds = [ 0, 0, _width, (defaultTrendGroup.trendDialogHeight - 100) / 10 * 7 ];
		opTrend.canvasX = parseInt(_bounds[0]);
		opTrend.canvasY = parseInt(_bounds[1]);
		opTrend.canvasWidth = parseInt(_bounds[2] - opTrend.margin_padding * 2);
		opTrend.canvasHeight = parseInt(_bounds[3] - opTrend.margin_top - opTrend.margin_bottom);

		opTrend.trend_bgColor = "black";
		opTrend.trend_bgLineColor = "white";
		opTrend.innerBorder_color = "white";
		opTrend.isComponents = false;
	},

	/**
	 * 趋势的对外入口
	 *
	 * @param {}
	 *            names
	 * @param {}
	 *            from
	 * @param {}
	 *            to
	 * @param {}
	 *            playing
	 * @param {}
	 *            width
	 * @param {}
	 *            height
	 */
	addName : function(names, from, to, width, height, current) {
		trend_Util.initProperties(from, to, width, height);
		this.initProperties(from, to, width, height, current);
		var playing = false;
		if (trend_Util.isNull(from) && trend_Util.isNull(to)) {
			playing = true;
		}
		// 点信息
		// 初始化页面布局
		this.assignment4ID();
		trend_Util.stopFlush();
		var str = new Array();
		str = names.split(",");
		// 去出数组中的重复元素
		str = trend_Util.removeArraySameElement(str);
		if (this.defaultTrendString.length == 0) {
			if (!trend_Util.checkNameRE(str)) {
				for ( var i = 0; i < str.length; i++) {
					if (this.defaultTrendString.length < this.trendTotleCount) {
						this.defaultTrendString.push(str[i]);
					} else {
						break;
					}
				}
			}
			this.addTrend(this.defaultTrendString, from, to, playing, current);
		} else if (this.defaultTrendString.length < this.trendTotleCount) {
			if (trend_Util.checkNameRE(str)) {
				alert("点名重复，请选择其他点名！");
				this.addTrend(this.defaultTrendString, from, to, playing, current);
			} else {
				for ( var i = 0; i < str.length; i++) {
					if (this.defaultTrendString.length < this.trendTotleCount) {
						this.defaultTrendString.push(str[i]);
					} else {
						break;
					}
				}
				this.addTrend(this.defaultTrendString, from, to, playing, current);
			}
		} else if (this.defaultTrendString.length >= this.trendTotleCount) {
			alert("最多只允许" + this.trendTotleCount + "条趋势共存！");
			return;
		}
		this.setHtmlCss();
	},
	reloadData : function(names, from, to, playing, at, ab, current) {
		// 清空数据表格

		var pointInfo = null;
		// 设置table 内容
		$
				.ajax( {
					url : defaultTrendGroup.defaultTrendServerName,
					type : 'get',
					cache : false,
					async : false,
					data : {
						flag : 'getPointsMessage',
						pointCount : defaultTrendGroup.linePointCount,
						pointType : defaultTrendGroup.pointType,
						pn : encodeURI(encodeURI(names))
					},
					dataType : 'json',
					success : function(data2) {
						pointInfo = data2;
						$("#pointsTable").empty();
						$("#pointsTable").append(
								'<tr id="tableTitle">' + '<td width="5%"  nowrap="nowrap"></td>'
										+ '<td width="20%" nowrap="nowrap">点名</td>'
										+ '<td width="5%"  nowrap="nowrap">颜色</td>'
										+ '<td width="10%" nowrap="nowrap">当前值</td>'
										+ '<td width="30%" nowrap="nowrap">描述</td>'
										+ '<td width="5%"  nowrap="nowrap">单位</td>'
										+ '<td width="5%"  nowrap="nowrap">上限</td>'
										+ '<td width="5%"  nowrap="nowrap">下限</td>'
										+ '<td width="5%"  nowrap="nowrap">限高</td>'
										+ '<td width="5%"  nowrap="nowrap">限低</td>'
										+ '<td width="5%"  nowrap="nowrap">线宽</td></tr>');
						$
								.each(
										names,
										function(i, name) {
											var bv = null, tv = null, lw = null, arr = defaultTrendGroup.trendConfigInfoMap
													.get(name);
											if (arr) {
												bv = arr[1];
												tv = arr[0];
												/**
												 * 修改获取到的点的量程 和 表格修改的量程对应
												 * @param {Object} data
												 */
												pointInfo[i].TV = tv;
												pointInfo[i].BV = bv;
											} else {
												tv = pointInfo[i].TV;
												bv = pointInfo[i].BV;
											}
											if (at || trend_Util.isNull(at)) {
												at = "";
											}
											if (ab || trend_Util.isNull(ab)) {
												ab = "";
											}
											try {
												lw = arr[4];
											} catch (e) {
												lw = 1;
											}
											var checkedFlag = trend_Util.isChecked(name);
											$("#pointsTable")
													.append(
															'<tr id='
																	+ defaultTrendGroup.trendTableCheckBoxId[i]
																	+ ' >'
																	+ '<td><input onclick="trend_Util.checkBoxSelected4Hide()" '
																	+ checkedFlag
																	+ ' id='
																	+ defaultTrendGroup.trendTableCheckBoxId[i]
																	+ ' type="checkbox" name="trendCheckBox"></td>'
																	+ '<td nowrap="nowrap">'
																	+ data2[i].name
																	+ '</td>'
																	+ '<td>'
																	+ '<input id="'
																	+ defaultTrendGroup.trendTableInputColor[i]
																	+ '"'
																	+ 'style="BACKGROUND-COLOR: '
																	+ defaultTrendGroup.trendChartColors[i]
																	+ '"'
																	+ 'size=4 class="color {valueElement:'
																	+ defaultTrendGroup.trendColorFlags[i]
																	+ '}">'
																	+ '<input onchange="defaultTrendGroup.trendRedraw()" id="'
																	+ defaultTrendGroup.trendColorFlags[i]
																	+ '" type="hidden" value='
																	+ defaultTrendGroup.trendChartColors[i].replace(
																			"#", "")
																	+ '>'
																	+ '</td>'
																	+ '<td id="'
																	+ defaultTrendGroup.trendIdFlags[i]
																	+ '"></td>'
																	+ '<td nowrap="nowrap">'
																	+ data2[i].ED
																	+ '</td>'
																	+ '<td>'
																	+ data2[i].EU
																	+ '</td>'
																	+ '<td><input onchange="defaultTrendGroup.trendRedraw()" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
																	+ 'value='
																	+ tv
																	+ ' size=6></td>'
																	+ '<td><input onchange="defaultTrendGroup.trendRedraw()" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
																	+ 'value='
																	+ bv
																	+ ' size=6></td>'

																	+ '<td><input onchange="defaultTrendGroup.trendRedraw()" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
																	+ 'value="'
																	+ at
																	+ '" size=6></td>'
																	+ '<td><input onchange="defaultTrendGroup.trendRedraw()" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
																	+ 'value="'
																	+ ab
																	+ '" size=6></td>'
																	+ '<td><input onchange="defaultTrendGroup.trendRedraw()" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
																	+ 'value="' + lw + '" size=6></td>' + '</tr>');
										});

						// 数据
						var objs = opTrend.trendArray;
						if (trend_Util.isNull(objs) || objs.length != names.length) {
							$.getJSON(defaultTrendGroup.defaultTrendServerName + '?pn=' + encodeURI(encodeURI(names))
									+ '&flag=getData' + '&from=' + from + '&to=' + to + '&isCanvas=true' + '&time='
									+ new Date().getTime(), function(dataTemp) {
								opTrend.trendArray = new Array();
								var data = dataTemp.value;
								$.each(names, function(i, name) {
									var pointMessage = pointInfo[i], t1 = new opTrend.trendObj();
									t1.pointName = pointMessage.name, color = null;
									if (color != null) {
										t1.color = color;
									} else {
										t1.color = defaultTrendGroup.trendChartColors[i];
									}
									t1.lineWidth = 1;
									t1.topLimit = pointMessage.TV;
									t1.lowLimit = pointMessage.BV;
									t1.type = pointMessage.pnType;
									t1.trendData = data[i];
									t1.alarmTop = at;
									t1.alarmLow = ab;// 限低
										//判断当前的 趋势是否被选中 是否在趋势图中显示
										if (trend_Util.isChecked(name) == '') {
											t1.hide = true;
										}
										opTrend.addTrend(t1);
									});
								opTrend.from = trend_Util.dateFormat(dataTemp.from, defaultTrendGroup.formatString);
								if (!current) {
									opTrend.to = trend_Util.dateFormat(dataTemp.to, defaultTrendGroup.formatString);
								}
								opTrend.repaint(names);
							});
						} else {
							$.getJSON(defaultTrendGroup.defaultTrendServerName + '?pn=' + encodeURI(encodeURI(names))
									+ '&flag=getData' + '&from=' + from + '&to=' + to + '&isCanvas=true' + '&time='
									+ new Date().getTime(), function(dataTemp) {
								opTrend.from = trend_Util.dateFormat(dataTemp.from, defaultTrendGroup.formatString);
								if (!current) {
									opTrend.to = trend_Util.dateFormat(dataTemp.to, defaultTrendGroup.formatString);
								}
								var data = dataTemp.value;
								for ( var i = 0; i < names.length; i++) {
									opTrend.trendArray[i].data = null;
									if (names[i] == opTrend.trendArray[i].pointName) {
										opTrend.trendArray[i].trendData = data[i];
										opTrend.repaint(names);
									}
								}
							});
						}
						if (playing) {
							opTrend.playing = playing;
							defaultTrendGroup.getDyData();
						}
						if (current) {
							var toTime = new Date(to);
							opTrend.currentFrom = opTrend.from;
							opTrend.to = current;
							opTrend.current = opTrend.to;
							defaultTrendGroup.history = setInterval(function() {
								if (opTrend.to.getTime() != toTime.getTime()) {
									opTrend.updateTime();
									trend_Util.showHistory(opTrend.to);
									opTrend.repaint(names);
									opTrend.current = opTrend.to;
									opTrend.currentFrom = opTrend.from;
									if (defaultTrendGroup.mouseLeaveXY.length != 0) {
										trend_Util.drawVernier(defaultTrendGroup.mouseLeaveXY);
									}
								} else {
									opTrend.from = from;
									opTrend.to = to;
									clearInterval(defaultTrendGroup.history);
								}
							}, defaultTrendGroup.flushInterval);
						}
						trend_Util.setCanvasFun();
						trend_Util.setTrendBgColor();// 为表格颜色绑定触发函数
						trend_Util.checkBoxSelected4Hide();
					}
				});
	},

	/**
	 * 添加趋势入口
	 *
	 * @param {}
	 *            names
	 * @param {}
	 *            from
	 * @param {}
	 *            to
	 * @param {}
	 *            playing
	 */
	addTrend : function(names, from, to, playing, current) {
		opTrend.promptMsg = "数据正在加载中，请稍侯……";
		$("#trend_container").unbind();
		// 颜色数组增加颜色
		var cls = this.trendChartColors;
		for ( var j = 0; j < names.length; j++) {
			var col = cls[Math.floor(Math.random() * cls.length + 1)];
			this.trendChartColors.push(col);
		}
		opTrend.interval = defaultTrendGroup.flushInterval;// 获取interval
		// 趋势停止刷新
		trend_Util.stopFlush();

		if (this.isDialog) {
			this.showDialog();
		} else {
			this.setHtmlCss();
		}
		if (!trend_Util.isNull(from)) {
			$("#trend_from").attr("value", from);
		} else {
			$("#trend_from").attr("value", '');
		}
		if (!trend_Util.isNull(to)) {
			$("#trend_to").attr("value", to);
		} else {
			$("#trend_to").attr("value", '');
		}
		trend_Util.getCheckedNames();
		trend_Util.getNewTrendColorsAndRanges();
		this.reloadData(names, from, to, playing, null, null, current);
	},
	getDyData : function() {
		var names = defaultTrendGroup.defaultTrendString;
		defaultTrendGroup.trendIntervalId = setInterval(function() {
			$.getJSON(defaultTrendGroup.defaultTrendServerName + '?flag=getDyData&pn=' + encodeURI(encodeURI(names))
					+ '&time=' + new Date().getTime(), function(data) {
				for ( var i = 0; i < names.length; i++) {
					for ( var j = 0; j < opTrend.trendArray.length; j++) {
						if (names[i] == opTrend.trendArray[j].pointName) {
							if (trend_Util.isNull(data[i])) {
								$("#" + defaultTrendGroup.trendIdFlags[i]).text("N/A");
							} else {
								if (data[i].y == null) {
									$("#" + defaultTrendGroup.trendIdFlags[i]).text("");
								} else {
									$("#" + defaultTrendGroup.trendIdFlags[i]).text(data[i].y);
								}
								var arr = new Array();
								arr[0] = data[i].x;
								// 防止时间轴与曲线不对应
					if (parseInt(data[i].x) > opTrend.to.getTime()) {
						opTrend.to = new Date(parseInt(data[i].x));
					}
					arr[1] = data[i].y;
					opTrend.trendArray[j].addPoint(arr);
				}
			}
		}
	}
}			);
			opTrend.updateTime();
			opTrend.repaint(names);
			if (defaultTrendGroup.mouseLeaveXY.length != 0) {
				trend_Util.drawVernier(defaultTrendGroup.mouseLeaveXY);
			}
		}, defaultTrendGroup.flushInterval);
		defaultTrendGroup.trendStopFlushFlags.push(defaultTrendGroup.trendIntervalId);
	},
	showDialog : function() {
		// 表格上端
	var tableHtml = '<div id="buttonDivId" style="font:normal 10px/1.8em Arial, Helvetica, sans-serif;">'
			+ '<div align="right" id="buttonleft">'
			+ '<button id="oneday" onclick="defaultTrendGroup.shortCutSearch(24)">实时</button>'
			+ '<button id="threeDay" onclick="defaultTrendGroup.shortCutSearch(1)">1天</button>'
			+ '<button id="threeDay" onclick="defaultTrendGroup.shortCutSearch(3)">3天</button>'
			+ '<button id="sevenDay" onclick="defaultTrendGroup.shortCutSearch(5)">5天</button>'
			+ '<button id="fifteenDay" onclick="defaultTrendGroup.shortCutSearch(7)">7天</button>'
			+ '<button id="fifteenDay" onclick="defaultTrendGroup.shortCutSearch(30)">30天</button>'
			+ '</div>'
			+ '</div>'
			+
			// 点信息表格

			'<div id="pointsMessage" style="overflow:auto;overFlow-x:hidden;">'
			+ '<table id="pointsTable" border="1px" cellspacing="0px"'
			+ 'bordercolor="#C0C0C0" style="font:normal 10px/1.8em Arial, Helvetica, sans-serif;">'
			+ '</table>'
			+ '</div>'
			+
			// 表格下端
			'<div id = "buttonRight" >'
			+ '<div style="float:right">'
			+ '开始：<input id="trend_from" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})">'
			+ '结束：<input id="trend_to" onfocus="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\'})">'
			+ '<button id="trend_search" onclick="defaultTrendGroup.searchHistory()">查询</button>'
			+ '<button id="buttonCheckBox" onclick="trend_Util.checkboxSelected()">全选/反选</button>'
			+ '<button id="buttonDelete" onclick="trend_Util.trendColumnDelete()">删除</button>'
			+ '<div id="ShowTip" name="ShowTip" style=" position:absolute;display:none;width:170px;left:50px;background-color: white" align="left" ></div>'
			+ '</div>'
			+ '<div style="float:left;margin-top:1px">'
			+ '测点：<input type="text" style="width:160px;" id="ShowText" onkeyup="javascript:if ( this.value!=""){ ShowTip(); } else { HideTTip(); }'
			+ ' onblur="javascript:setTimeout(HideTTip,300);"' + ' ondblclick="javascript:ShowTip();"' + ' /> '
			+ '</div>' + '</div>' + '<canvas id="trend_container"></canvas>';

	$('#pointsTrend').html(tableHtml);
	$('#pointsTrend').show();
	$('#pointsTrend').dialog( {
		title : '趋势图',
		minWidth : 500,
		minHeight : 350,
		collapsible : true,
		minimizable : false,
		maximizable : true,
		maximized : false,
		draggable : true,
		width : document.documentElement.clientWidth * 3 / 4 + 5,
		height : document.documentElement.clientHeight * 4 / 5 + 5,
		onOpen : function(event, ui) {
			defaultTrendGroup.trendDialogRealHeight = document.documentElement.clientHeight * 4 / 5;
			defaultTrendGroup.trendDialogRealWidth = document.documentElement.clientWidth * 3 / 4;
			defaultTrendGroup.setHtmlCss();
		},
		onClose : function(event, ui) {
			trend_Util.stopFlush();
			trend_Util.clearDefaultString();
		},
		onResize : function(width, height) {
			defaultTrendGroup.trendDialogRealWidth = $(this).width() + 25;
			defaultTrendGroup.trendDialogRealHeight = $(this).height() + 35;
			defaultTrendGroup.setHtmlCss();
		}
	});

	this.setHtmlCss();
	var _canvas = document.getElementById('trend_container');
	var canvas_context = _canvas.getContext('2d');
	trend_canvas = canvas_context;
},
// 初始化id
	assignment4ID : function() {
		for ( var i = 1; i <= defaultTrendGroup.trendTotleCount; i++) {
			var currentValue = "currentValue" + i, bgColor = "bgColor" + i, inputFlag = "inputFlag" + i, trendCheckBox = "trendCheckBox"
					+ i;
			defaultTrendGroup.trendIdFlags.push(currentValue);
			defaultTrendGroup.trendColorFlags.push(bgColor);
			defaultTrendGroup.trendTableInputColor.push(inputFlag);
			defaultTrendGroup.trendTableCheckBoxId.push(trendCheckBox);
		}
	},
	/**
	 * 获取窗口最大尺寸
	 */
	getDialogSize : function() {
		this.trendDialogMaxHeight = document.documentElement.clientHeight - 10;
		this.trendDialogMaxWidth = document.documentElement.clientWidth - 10;
		this.trendDialogNormalHeight = document.documentElement.clientHeight * 4 / 5;
		this.trendDialogNormalWidth = document.documentElement.clientWidth * 3 / 4;
	},
	/**
	 * 设置样式
	 */
	setHtmlCss : function() {
		this.trendDialogWidth = this.trendDialogRealWidth;
		this.trendDialogHeight = this.trendDialogRealHeight;
		var row = this.defaultTrendString.length;
		var width2;
		var width1 = this.trendDialogWidth - 32;

		var tableHeight = row * 28 + 30;
		var tableHeightLimit = this.trendDialogRealHeight / 10 * 3;
		var _canvas = document.getElementById('trend_container');
		var canvas_context = _canvas.getContext('2d');
		if (tableHeight < tableHeightLimit) {
			width2 = this.trendDialogWidth - 32;
		} else {
			tableHeight = tableHeightLimit;
			width2 = this.trendDialogWidth - 32;
		}
		var trendHeight = (this.trendDialogHeight - 100) - tableHeight - 22;
		trend_canvas = canvas_context;
		_canvas.width = width1;
		_canvas.height = trendHeight + 22;
		opTrend.canvasWidth = width1;
		opTrend.canvasHeight = trendHeight;
		ShowTip();
		$("#buttonDivId").css( {
			width : width1
		});
		$("#buttonLeft").css( {
			width : width1 * 0.4,
			float : "right"
		});
		$("#buttonRight").css( {
			width : width1,
			float : "left"
		});
		$("#pointsMessage").css( {
			width : width1,
			height : tableHeight
		});
		$("#pointsTable").css( {
			width : width2,
			height : tableHeight,
			font : "normal 10px/1.8em Arial, Helvetica, sans-serif"
		});
	},
	/**
	 * 趋势重绘
	 */
	trendRedraw : function() {
		var colors = trend_Util.getNewTrendColorsAndRanges();
		if (colors && colors.length > 1) {
			for ( var index = 0; index < colors.length; index++) {
				if (colors[index]) {
					this.trendChartColors[index] = colors[index];
				}
			}
		}
		var checkboxs = document.getElementsByName("trendCheckBox");
		for ( var i = 0; i < checkboxs.length; i++) {
			var trObj = document.getElementById(checkboxs[i].id);
			var pname = trObj.cells[1].innerHTML;
			var ranges = defaultTrendGroup.trendConfigInfoMap.get(pname);
			// 数据
	if (opTrend.trendArray) {
		for ( var j = 0; i < opTrend.trendArray.length; j++) {
			if (pname == opTrend.trendArray[j].pointName) {
				opTrend.trendArray[j].color = defaultTrendGroup.colorMap.get(pname);
				opTrend.trendArray[j].topLimit = ranges[0];
				opTrend.trendArray[j].lowLimit = ranges[1];
				opTrend.trendArray[j].alarmTop = ranges[2];
				opTrend.trendArray[j].alarmLow = ranges[3];
				opTrend.trendArray[j].lineWidth = ranges[4];
				break;
			}
		}
	}
}
opTrend.repaint(this.defaultTrendString);
},
/**
 * 时间快捷键查询
 *
 * @param {}
 *            flag
 */
shortCutSearch : function(flag) {
this.trend_getData4CheckboxFlag = true;
// var time = trend_Util.dateFormat(new
	// Date(),defaultTrendGroup.formatString);
	var time = $("#trend_to").val();
	//暂不做修改
	if (trend_Util.isNull(time)) {
		time = trend_Util.dateFormat(new Date(trend_Util.getServerTime()), defaultTrendGroup.formatString);
	}
	switch (flag) {
	case 1:
		var oneDay = trend_Util.getParameter4Time(1);
		defaultTrendGroup.addTrend(defaultTrendGroup.defaultTrendString, oneDay, time, false);
		$("#trend_to").attr("value", time);
		$("#trend_from").attr("value", oneDay);
		break;
	case 3:
		var threeDay = trend_Util.getParameter4Time(3);
		defaultTrendGroup.addTrend(defaultTrendGroup.defaultTrendString, threeDay, time, false);
		$("#trend_to").attr("value", time);
		$("#trend_from").attr("value", threeDay);
		break;
	case 5:
		var fiveDay = trend_Util.getParameter4Time(5);
		defaultTrendGroup.addTrend(defaultTrendGroup.defaultTrendString, fiveDay, time, false);
		$("#trend_to").attr("value", time);
		$("#trend_from").attr("value", fiveDay);
		break;
	case 7:
		var sevenDay = trend_Util.getParameter4Time(7);
		defaultTrendGroup.addTrend(defaultTrendGroup.defaultTrendString, sevenDay, time, false);
		$("#trend_to").attr("value", time);
		$("#trend_from").attr("value", sevenDay);
		break;
	case 15:
		var fiftheenDay = trend_Util.getParameter4Time(15);
		defaultTrendGroup.addTrend(defaultTrendGroup.defaultTrendString, fiftheenDay, time, false);
		$("#trend_to").attr("value", time);
		$("#trend_from").attr("value", fiftheenDay);
		break;
	case 30:
		var thirtyDay = trend_Util.getParameter4Time(30);
		defaultTrendGroup.addTrend(defaultTrendGroup.defaultTrendString, thirtyDay, time, false);
		$("#trend_to").attr("value", time);
		$("#trend_from").attr("value", thirtyDay);
		break;
	case 24:
		trend_Util.searchCurrent();
		break;
	}
},
/**
 * 查询历史
 */
searchHistory : function() {
	// alert("page_v2");
	this.trend_getData4CheckboxFlag = true;
	var minDate = $('#trend_from').val(), maxDate = $('#trend_to').val(), regS = new RegExp("-", "gi"), from = minDate
			.replace(regS, "/"), to = maxDate.replace(regS, "/"), bd = new Date(Date.parse(from)), ed = new Date(Date
			.parse(to));
	if (bd > ed) {
		alert("开始时间必须小于结束时间！");
	} else {
		this.addTrend(this.defaultTrendString, minDate, maxDate, false);
	}
}

};

var trend_Util = {
	colorHex : function(target) {
		var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
		var that = target;
		if (/^(rgba|RGBA)/.test(that)) {
			var aColor = that.replace(/(?:\(|\)|rgba|RGBA)*/g, "").split(",");
			var strHex = "#";
			for ( var i = 0; i < aColor.length - 1; i++) {
				var hex = Number(aColor[i]).toString(16);
				if (hex === "0") {
					hex += hex;
				}
				strHex += hex;
			}
			if (strHex.length !== 7) {
				strHex = that;
			}
			return strHex;
		} else if (reg.test(that)) {
			var aNum = that.replace(/#/, "").split("");
			if (aNum.length === 6) {
				return that;
			} else if (aNum.length === 3) {
				var numHex = "#";
				for ( var i = 0; i < aNum.length; i += 1) {
					numHex += (aNum[i] + aNum[i]);
				}
				return numHex;
			}
		} else {
			return that;
		}
	},
	isNull : function(obj) {
		if (obj == null) {
			return true;
		} else if (obj == "") {
			return true;
		} else if (undefined == obj) {
			return true;
		} else {
			return false;
		}
	},
	/**
	 * 日期格式化
	 *
	 * @param {}
	 *            time
	 * @param {}
	 *            format
	 * @return {}
	 */
	dateFormat : function(time, format) {
		var t = new Date(time), tf = function(i) {
			return (i < 10 ? '0' : '') + i
		}
		return format.replace(/yyyy|yy|MM|dd|HH|mm|ss/g, function(a) {
			switch (a) {
			case 'yy':
				return tf((t.getFullYear() + "").substr(2, 3));
				break;
			case 'yyyy':
				return tf(t.getFullYear());
				break;
			case 'MM':
				return tf(t.getMonth() + 1);
				break;
			case 'mm':
				return tf(t.getMinutes());
				break;
			case 'dd':
				return tf(t.getDate());
				break;
			case 'HH':
				return tf(t.getHours());
				break;
			case 'ss':
				return tf(t.getSeconds());
				break;
			}
		});
	},
	/***************************************************************************
	 * 趋势弹出窗组件调用************************************** /** 初始化属性
	 *
	 * @param {}
	 *            from
	 * @param {}
	 *            to
	 * @param {}
	 *            width
	 * @param {}
	 *            height
	 */
	initProperties : function(from, to, width, height) {
		if (!this.isNull(width) && !this.isNull(height)) {
			defaultTrendGroup.trendDialogWidth = width;
			defaultTrendGroup.trendDialogHeight = height;
		} else {
			var h = document.documentElement.clientHeight;
			var w = document.documentElement.clientWidth;
			if (defaultTrendGroup.isDialog) {
				h = h * 4 / 5;
				w = w * 3 / 4;
			}
			defaultTrendGroup.trendDialogWidth = w;
			defaultTrendGroup.trendDialogHeight = h;
		}
	},
	/**
	 * 清空点组和刷新标记
	 */
	clearDefaultString : function() {

		defaultTrendGroup.defaultTrendString = new Array();
		defaultTrendGroup.trendConfigInfoMap = new trendUtilMap();
		defaultTrendGroup.colorMap = new trendUtilMap();
		opTrend.trendArray = new Array();
	},
	/**
	 * 获取对象在页面的位置
	 *
	 * @param obj
	 * @returns {Array}
	 */
	getPosition : function(obj) {
		var topValue = 0, leftValue = 0, height = 0, arr = new Array();
		while (obj) {
			leftValue += obj.offsetLeft;
			topValue += obj.offsetTop;
			height = obj.height;
			obj = obj.offsetParent;
		}
		arr.push(leftValue);
		arr.push(topValue);
		arr.push(height);
		return arr;
	},
	/**
	 * 获取canvas容器坐标
	 *
	 * @param e
	 * @returns {Array}
	 */
	getCanvasPos : function(e) {
		var canvas = document.getElementById("trend_container")
		var arrayXY = trend_Util.getPosition(canvas), pointX = e.pageX - arrayXY[0], pointY = canvas.height / 2 - 50;

		var posX = e.pageX - arrayXY[0];
		if ((pointX + 175) > canvas.width) {
			posX = canvas.width - 175;
		}
		return [ pointX, pointY, posX ];
	},
	/**
	 * 绘制游标值及游标线
	 *
	 * @param {}
	 *            xys
	 */
	drawVernier : function(xys) {

		var rightX = opTrend.canvasX + opTrend.canvasWidth * opTrend.widthRatioA / opTrend.widthRatioB
				+ opTrend.margin_padding;

		var objs = opTrend.trendArray, pointX = xys[0], pointY = xys[1], posX = xys[2];

		if (pointX > (rightX - 5)) {
			return;
		}
		opTrend.repaint(defaultTrendGroup.defaultTrendString);
		// 数据
		trend_canvas.globalAlpha = 0.8;
		trend_canvas.fillStyle = "#aea7a7";
		trend_canvas.fillRect(posX, pointY, 175, 15 + 20 * objs.length);
		trend_canvas.globalAlpha = 1;

		trend_canvas.beginPath();
		trend_canvas.strokeStyle = opTrend.trend_bgLineColor;
		trend_canvas.lineWidth = 1;
		trend_canvas.moveTo(pointX, 0 + 0.8);
		trend_canvas.lineTo(pointX, opTrend.canvasHeight + 0.8);
		trend_canvas.stroke();
		var time = new Date(opTrend.getTimeFromX(pointX)).getTime(), ymd = trend_Util.dateFormat(new Date(time),
				defaultTrendGroup.formatString);
		trend_canvas.save();
		trend_canvas.fillStyle = "black";
		trend_canvas.font = "bold 15px 宋体";
		trend_canvas.fillText(ymd, posX, pointY + 15);
		var arr = opTrend.getValueFromTime(time), tempHeight = 30;
		for ( var f = 0; f < objs.length; f++) {
			trend_canvas.fillStyle = objs[f].color;
			trend_canvas.fillText(arr[f], posX + 10, pointY + tempHeight + 20 * (f));
		}
		trend_canvas.restore();
	},
	/**
	 * 为整体canvas添加事件
	 */
	setCanvasFun : function() {
		var clickBeginX = 0, downflag = false, moveflag = false, from = null, to = null;
		var rightX = opTrend.canvasX + opTrend.canvasWidth * opTrend.widthRatioA / opTrend.widthRatioB
				+ opTrend.margin_padding;
		$("#trend_container").bind( {
			click : function(e) {
				var xys = trend_Util.getCanvasPos(e);
				if (parseInt(xys[0]) <= parseInt(rightX)) {
					trend_Util.drawVernier(xys);
				}
			},
			mousedown : function(e) {
				downflag = true;
				var xys = trend_Util.getCanvasPos(e), pointX = xys[0];
				clickBeginX = pointX;
				from = new Date(opTrend.getTimeFromX(pointX));
			},
			mouseup : function(e) {
				downflag = false;
				var xys = trend_Util.getCanvasPos(e);
				if (parseInt(xys[0]) >= parseInt(rightX - 5)) {
					xys[0] = parseInt(rightX - 5);
				}
				defaultTrendGroup.mouseLeaveXY = xys;
				if (moveflag) {
					opTrend.from = from;
					opTrend.to = to;
					from = trend_Util.dateFormat(from, defaultTrendGroup.formatString);
					to = trend_Util.dateFormat(to, defaultTrendGroup.formatString);
					$("#trend_to").attr("value", to);
					$("#trend_from").attr("value", from);
					defaultTrendGroup.trend_getData4CheckboxFlag = true;
					defaultTrendGroup.addTrend(defaultTrendGroup.defaultTrendString, from, to, false);
				}
				moveflag = false;
			},
			mousemove : function(e) {
				var xys = trend_Util.getCanvasPos(e);
				if (parseInt(xys[0]) >= parseInt(rightX)) {
					xys[0] = parseInt(rightX);
				}
				var width = parseInt(xys[0]) - clickBeginX;
				if (downflag && (parseInt(xys[0]) <= parseInt(rightX))) {
					opTrend.repaint(defaultTrendGroup.defaultTrendString);
					if (width >= 10) {
						moveflag = true;
						trend_canvas.globalAlpha = 0.4;
						trend_canvas.fillStyle = opTrend.trend_bgLineColor;
						trend_canvas.fillRect(clickBeginX, 0, width, opTrend.canvasHeight);
						trend_canvas.globalAlpha = 1;
						to = new Date(opTrend.getTimeFromX(xys[0]));
						defaultTrendGroup.mouseLeaveXY = new Array();
					}
				}
			}
		});
	},
	/**
	 * 显示历史回放实时数据
	 */
	showHistory : function(time) {
		var objs = opTrend.trendArray;
		var arr = opTrend.getValueFromTime(time);
		for ( var i = 0; i < objs.length; i++) {
			$("#" + defaultTrendGroup.trendIdFlags[i]).text(arr[i]);
		}
	},
	/**
	 * 设置曲线表格背景色
	 */
	setTrendBgColor : function() {
		$.each(defaultTrendGroup.defaultTrendString, function(i, name) {
			var colorId = "#" + defaultTrendGroup.trendTableInputColor[i];
			$(colorId).mouseover(function() {
				jscolor.install();
			});
		});
	},
	/**
	 * 获取被选中的点名
	 */
	getCheckedNames : function() {
		// 数组克隆
		defaultTrendGroup.chcekdPointNames = new Array();
		defaultTrendGroup.chcekdPointNames = defaultTrendGroup.defaultTrendString.slice(0);
		var checkboxs = document.getElementsByName("trendCheckBox");
		for ( var i = 0; i < checkboxs.length; i++) {
			if (!checkboxs[i].checked) {
				var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
				//				defaultTrendGroup.chcekdPointNames.push(pn);
				var index = defaultTrendGroup.chcekdPointNames.indexOf(pn);
				defaultTrendGroup.chcekdPointNames.splice(index, 1);
			}
		}
	},
	/**
	 * checkbox是否选中
	 *
	 * @param {}
	 *            name
	 * @return {}
	 */
	isChecked : function(name) {
		var checkedFlag = "";
		if (defaultTrendGroup.chcekdPointNames.length == 0) {
			checkedFlag = "checked";
		} else {
			if (defaultTrendGroup.trend_getData4CheckboxFlag) {
				for ( var j = 0; j < defaultTrendGroup.chcekdPointNames.length; j++) {
					if (name == defaultTrendGroup.chcekdPointNames[j]) {
						checkedFlag = "checked";
						break;
					}
				}
			} else {
				checkedFlag = "checked";
			}
		}
		return checkedFlag;
	},
	checkDouble : function(obj, precision, scale) {
		// 如果未空直接返回；
		var objValue = obj.value;
		if (objValue == null || objValue.length == 0)
			return;
		// 将所有非数字，非"."去掉；
		if (objValue.match(/[^-0-9\.]+/)) {
			obj.value = objValue.replace(/[^-0-9\.]+/, "");
			objValue = obj.value;
		}
		// 小数点最多一个，超过一个，保留第一个；
		if (objValue.indexOf(".") != objValue.lastIndexOf(".")) {
			obj.value = objValue.dotClear();
			objValue = obj.value;
		}
		// 去掉首位多余的0；
		if (objValue.match(/^0+$/)) {
			obj.value = objValue.replace(/^0+$/, "0");
			objValue = obj.value;
		} else if (objValue.match(/^0+/)) {
			obj.value = objValue.replace(/^0+/, "");
			objValue = obj.value;
		}
		if (!objValue.match(/\./)) {
			// 如果没有小数点
			if (objValue.length - precision > 0) {
				// 最大长度precision
				obj.value = objValue.substring(obj.value.length - precision, obj.value.length);
				objValue = obj.value;
			}
		} else {
			// 有小数点；
			var dotIndex = objValue.indexOf("\.");
			if (dotIndex === 0) {
				// 如果小数点在首位，前面加0
				obj.value = "0" + objValue;
				objValue = obj.value;
			}

			dotIndex = objValue.indexOf("\.");
			if (dotIndex - precision > 0) {
				// 保证小数点左边最多 precision位；(超出的话向左移动小数点)
				obj.value = objValue.substring(dotIndex - precision, dotIndex) + objValue.substring(dotIndex);
				objValue = obj.value;
			}

			dotIndex = objValue.indexOf("\.");
			var realScale = objValue.length - (dotIndex + 1);
			if (realScale - scale > 0) {
				// 保证小数点右边最多sacle位；
				obj.value = objValue.substring(0, objValue.length - (realScale - scale));
				objValue = obj.value;
			}
		}
	},
	/**
	 * 表格上下限变更监听
	 *
	 * @param {}
	 *            obj
	 */
	upAndDownListener : function(obj) {
		var ev = document.all ? window.event : arguments[0] ? arguments[0] : event;
		if (ev.keyCode == 13) {
			this.checkDouble(obj);
			defaultTrendGroup.trendRedraw();
			ev.returnValue = false;
		}
	},
	/**
	 * 根据参数获取日期
	 *
	 * @param {}
	 *            count
	 * @return {}
	 */
	getParameter4Time : function(count) {
		var temp = 1000 * 60 * 60 * 24;
		var time = $("#trend_to").val().replace(/-/g, "/");
		var result;
		if (!trend_Util.isNull(time)) {
			result = trend_Util.dateFormat(new Date(time).getTime() - temp * count, defaultTrendGroup.formatString);
		} else {
			result = trend_Util.dateFormat(new Date().getTime() - temp * count, defaultTrendGroup.formatString);
		}
		return result;
	},

	/**
	 * 检测点名是否重复
	 *
	 * @param {}
	 *            names
	 * @return {Boolean}
	 */
	checkNameRE : function(names) {
		for ( var i = 0; i < defaultTrendGroup.defaultTrendString.length; i++) {
			for ( var j = 0; j < names.length; j++) {
				if (defaultTrendGroup.defaultTrendString[i] == names[j]) {
					return true;
				}
			}
		}
	},
	/**
	 * 检测点名是否重复
	 * @param {Object} name 传递的参数只有一个
	 * @return {TypeName}
	 */
	checkNameREOne : function(name) {
		for ( var i = 0; i < defaultTrendGroup.defaultTrendString.length; i++) {
			if (defaultTrendGroup.defaultTrendString[i] == name) {
				return true;
			}
		}
	},
	/**
	 * 停止刷新
	 */
	stopFlush : function() {
		for ( var i = 0; i < defaultTrendGroup.trendStopFlushFlags.length; i++) {
			clearInterval(defaultTrendGroup.trendStopFlushFlags[i]);
		}
		clearInterval(defaultTrendGroup.history);
	},
	/**
	 * checkbox 操作（全选反选）
	 */
	checkboxSelected : function() {
		var checkboxs = document.getElementsByName("trendCheckBox");
		for ( var i = 0; i < checkboxs.length; i++) {
			var e = checkboxs[i];
			e.checked = !e.checked;
		}
		trend_Util.checkBoxSelected4Hide();
	},

	/**
	 * checkbox删除
	 */
	trendColumnDelete : function() {
		var checkboxs = document.getElementsByName("trendCheckBox"), names = [], length = checkboxs.length, ids = [];
		if (opTrend.trendArray) {
			for ( var i = 0; i < length; i++) {
				if (checkboxs[i].checked) {
					ids.push(checkboxs[i].id);
					var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
					defaultTrendGroup.trendConfigInfoMap.remove(pn);
					defaultTrendGroup.colorMap.remove(pn);
					for ( var j = 0; j < opTrend.trendArray.length; j++) {
						if (pn == opTrend.trendArray[j].pointName) {
							opTrend.trendArray.remove(j);
						}
					}
				} else {
					var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
					names.push(pn);
				}
			}
		}
		defaultTrendGroup.defaultTrendString = new Array();
		defaultTrendGroup.defaultTrendString = names;
		for ( var i = 0; i < ids.length; i++) {
			$('tr').remove('tr[id=' + ids[i] + ']');
		}
		if (defaultTrendGroup.defaultTrendString.length == 0) {
			trend_Util.stopFlush();
			trend_Util.clearDefaultString();
		}
		defaultTrendGroup.setHtmlCss();
		opTrend.repaint(names);
	},
	/**
	 * 获取表格中趋势的颜色和上下限
	 *
	 * @return {}
	 */
	getNewTrendColorsAndRanges : function() {
		// 获取自定义的颜色
		var trendRedrawNewColors = new Array();
		defaultTrendGrtrendConfigInfoMapsMap = new trendUtilMap();
		defaultTrendGroup.colorMap = new trendUtilMap();
		var table = document.getElementById("pointsTable"), rs = table.rows.length;
		for ( var i = 1; i < rs; i++) {
			var ranges = new Array(), name = table.rows[i].cells[1].innerHTML, tv = table.rows[i].cells[6].childNodes[0].value, bv = table.rows[i].cells[7].childNodes[0].value, alarmTop = table.rows[i].cells[8].childNodes[0].value, alarmLow = table.rows[i].cells[9].childNodes[0].value, lineWidth = table.rows[i].cells[10].childNodes[0].value;
			ranges.push(tv);
			ranges.push(bv);
			ranges.push(alarmTop);
			ranges.push(alarmLow);
			ranges.push(lineWidth);
			defaultTrendGroup.trendConfigInfoMap.put(name, ranges);

			var color = "#" + table.rows[i].cells[2].childNodes[1].value;
			trendRedrawNewColors.push(color);
			defaultTrendGroup.colorMap.put(name, color);
		}
		return trendRedrawNewColors;
	},
	/**
	 * 删除数组中的重复元素
	 *
	 * @param {}
	 *            array
	 * @return {}
	 */
	removeArraySameElement : function(array) {
		for ( var i = 0; i < array.length; i++) {
			for ( var j = i + 1; j < array.length; j++) {
				if (array[i] == array[j]) {
					// alert("输入内容包含重复点名！");
	array = trend_Util.removeElement(j, array);// 删除指定下标的元素
	i = -1;
	break;
}
}
}
return array;
},
/**
 * 移除数组对象
 *
 * @param {}
 *            index
 * @param {}
 *            array
 * @return {}
 */
removeElement : function(index, array) {
if (index >= 0 && index < array.length) {
for ( var i = index; i < array.length; i++) {
array[i] = array[i + 1];
}
array.length = array.length - 1;
}
return array;
},
/**
 * checkbox隐藏曲线
 */
checkBoxSelected4Hide : function() {
var checkboxs = document.getElementsByName("trendCheckBox");
for ( var i = 0; i < checkboxs.length; i++) {
var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
if (checkboxs[i].checked) {
for ( var j = 0; j < opTrend.trendArray.length; j++) {
	if (opTrend.trendArray[j].pointName == pn) {
		opTrend.trendArray[j].hide = false;
		break;
	}
}
} else {
for ( var j = 0; j < opTrend.trendArray.length; j++) {
	if (opTrend.trendArray[j].pointName == pn) {
		opTrend.trendArray[j].hide = true;
		break;
	}
}
}
}
opTrend.repaint(defaultTrendGroup.defaultTrendString);
},
/**
 * 获取服务器时间
 */
getServerTime : function() {
var time = new Date().getTime();
$.ajax( {
url : '../../getServerTime',
type : 'GET',
datatype : 'json',
async : true,
success : function(data) {
/**
 * 判断对应的键值是否有对应的数据
 */
if (data) {
time = data;
}
}
});
return time;
},
/**
 * 当点击实时按钮时做处理
 */
searchCurrent : function() {
var that = this;
$.ajax( {
url : '../../getServerTime',
type : 'GET',
cache : false,
datatype : 'json',
success : function(data) {
var temp = 1000 * 60 * 10;
var cur = that.dateFormat(parseInt(data) - temp, defaultTrendGroup.formatString);
var to = that.dateFormat(parseInt(data), defaultTrendGroup.formatString);
opTrend.from = cur;
opTrend.to = to;
defaultTrendGroup.addTrend(defaultTrendGroup.defaultTrendString, cur, to, true);
$("#trend_to").attr("value", '');
$("#trend_from").attr("value", '');
}
});
}
};