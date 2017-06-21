// ********************** 自动提示框开始*******************************
var _key;
var timeout;
String.prototype.trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, "");
};

String.prototype.replaceAll = function (pattern, str) {
    return this.replace(new RegExp(pattern, "gm"), str);
};
function ShowTip() {
    document.getElementById("ShowTip").onmouseleave = function () {
        document.getElementById("ShowTip").style.display = "none";
    }

    document.onclick = function () {
        document.getElementById("ShowTip").style.display = "none";
    }

    document.getElementById("ShowText").ondblclick = function (e) {
        _key = (e == null) ? event.keyCode : e.which
        if (_key != 39 && _key != 40 && _key != 37 && _key != 38 && _key != 13
            && _key != 17) {

            // 创建ajax调用  ，并且判断两个输入点之间的时间间隔当时间间隔小于200毫秒时，才会进行ajax调用，减少调用次数
            /**
             * 设置延迟调用 ，减少交互
             *
             * 考虑到200 毫秒延迟过高，使用100毫秒
             */
            clearTimeout(timeout);
            timeout = setTimeout(delayCall, 100);
        }
    }

    document.getElementById("ShowText").onkeyup = function (e) {
        _key = (e == null) ? event.keyCode : e.which
        if (_key != 39 && _key != 40 && _key != 37 && _key != 38 && _key != 13
            && _key != 17) {
            /**
             * 设置延迟调用 ，减少交互
             */
            clearTimeout(timeout);
            timeout = setTimeout(delayCall, 200);
        }
    }

    /**
     * 构造延迟调用的函数
     */
    delayCall = function () {
        document.getElementById("ShowTip").style.display = "";
        document.getElementById("ShowTip").innerHTML = "<img src='../images/ajax-loader.gif'>&nbsp;正在获取提示...";

        // 创建ajax调用  ，并且判断两个输入点之间的时间间隔当时间间隔小于200毫秒时，才会进行ajax调用，减少调用次数
        clearTimeout(timeout);

        timeout = setTimeout(VCreateAjax("*.trend", BackArray, "KeyWord="
            + document.getElementById("ShowText").value.trim()), 200);
    }

    /**
     * 回车键按下
     * @param {Object} e
     * @return {TypeName}
     */
    document.onkeyup = function (e) {
        _key = (e == null) ? event.keyCode : e.which
        if (_key == 13) {
            var pointnametext = document.getElementById("ShowText").value
                .split(":")[0];
            if (pointnametext && pointnametext.trim() != "") {
                if (!trend_Util.checkNameREOne(pointnametext.trim()
                        .toUpperCase())) {
                    $
                        .ajax({
                            url: 'pointMessage_checkedPointExist',
                            data: 'KeyWord=' + pointnametext.trim(),
                            type: 'POST',
                            cache: false,
                            datatype: 'json',
                            success: function (data) {
                                var json = eval('(' + data + ')');
                                /**
                                 * 判断对应的键值是否有对应的数据
                                 */
                                if (json.numFlag == 1) {
                                    /**
                                     * 如果当前键值和点能完全对应上
                                     */
                                    if (json.existFlag == 1) {
                                        defaultTrendGroup
                                            .addName(pointnametext
                                                .trim(), $(
                                                "#trend_from")
                                                .val(), $(
                                                "#trend_to").val(),
                                            null, null,
                                            opTrend.current);
                                        document.getElementById("ShowText").value = "";
                                    }
                                    /**
                                     * 有模糊的点名，但不能完全对应上
                                     */
                                    else {
                                        return;
                                    }
                                }
                                /**
                                 * 点名不存在
                                 */
                                else {
                                    alert("点名不存在");
                                    document.getElementById("ShowText").value = "";
                                }
                            }
                        });
                } else {
                    alert("点名重复，请选择其他点");
                    document.getElementById("ShowText").value = "";
                    return;
                }
            }
        }
    }
}

function HideTip() {
    var _key;
    document.onkeyup = function (e) {
        _key = (e == null) ? event.keyCode : e.which
        if (_key != 39 && _key != 40 && _key != 37 && _key != 38 && _key != 13
            && _key != 17) {
            document.getElementById("ShowTip").style.display = "none";
        }
    }
}

function HideTTip() {
    document.getElementById("ShowTip").style.display = "none";
}
// ********************** 显示隐藏Tip层 ************************************* //

// ********************** Ajax初始化函数 IE7.0 **********************//
function VCreateAjax(VUrl, VBack, VVar) {
    http_request_name = false;
    if (window.XMLHttpRequest) {// Mozilla, Safari,...
        http_request_name = new XMLHttpRequest();
    }
    if (window.ActiveXObject) { // IE
        try {
            http_request_name = new ActiveXObject("Msxml3.XMLHTTP");
        } catch (e) {
            try {
                http_request_name = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http_request_name = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                }
            }
        }
        if (http_request_name.overrideMimeType) {
            http_request_name.overrideMimeType('text/html');
        }
    }

    if (!http_request_name) {
        document.getElementById("ShowTip").innerHTML = "<img src='../images/Icon_warning_01.gif' border='0'>&nbsp;不能创建XMLHTTP对象,请升级您的浏览器或操作系统！";
        return false;
    }
    http_request_name.onreadystatechange = VBack;
    http_request_name.open('POST', VUrl, true); // 这里用GET方法传递参数，不然会出现完成该操作所需的数据还不可使用的页面错误
    http_request_name.setRequestHeader('Content-type',
        'application/x-www-form-urlencoded');
    http_request_name.send(VVar);

}

// ********************************回调函数************************************
function BackArray() {
    if (http_request_name.readyState == 4) {
        if (http_request_name.status == 200) {
            // 返回VCreateAjax 的URL 的Tip2.jsp的资源
            var resSource = http_request_name.responseText;
            if (resSource != "") {
                document.getElementById("ShowTip").innerHTML = "";
                var strSplits = resSource.split('|');
                var DIVStr = "";
                var FormatStr = "";
                var sum = strSplits.length - 1;
                var elementText = document.getElementById("ShowText").value;
                // 搜索有内容
                if (sum > 1) {
                    for (var i = 1; i < sum; i++)// cut 0, and the end element
                    {
                        FormatStr = strSplits[i].replace(elementText
                            .toUpperCase(), "<b><font color='red'>"
                            + elementText.toUpperCase() + "</font></b>")
                        DIVStr += "<div id='"
                            + i
                            + "' class='pointSelect' hideFocus style='cursor:pointer;line-height:20px;' onmousemove='FocusOP("
                            + i + "," + sum + ");' onmouseout='UFocusOP("
                            + i + ");' onclick='ClickInner(\""
                            + strSplits[i] + "\");'>" + FormatStr
                            + "</div>";
                    }
                    document.getElementById("ShowTip").innerHTML = DIVStr;

                    var i = 1;
                    var maxid = strSplits.length - 1;

                    FocusOP(i, maxid);
                    document.onkeydown = function (e) {
                        _key = (e == null) ? event.keyCode : e.which
                        // ///////////向下
                        if (_key == 39 || _key == 40) {
                            UFocusOP(i);
                            i = i + 1;
                            if (i > maxid - 1) {
                                i = 1;
                            }
                            FocusOP(i, maxid);
                        }

                        // ///////////向上
                        else if (_key == 37 || _key == 38) {
                            UFocusOP(i);
                            i = i - 1;
                            if (i < 1) {
                                i = maxid - 1;
                            }
                            FocusOP(i, maxid);
                        }
                        // 回车且弹出框显示有内容
                        if (_key == 13
                            && document.getElementById("ShowTip").style.display != "none") {
                            if (document.getElementById(i)) {
                                if (window.XMLHttpRequest) {
                                    document.getElementById("ShowText").value = document
                                        .getElementById(i).textContent;
                                } else {
                                    document.getElementById("ShowText").value = document
                                        .getElementById(i).innerText;
                                }
                                document.getElementById("ShowTip").style.display = "none";
                            } else {
                                alert("点名不存在");
                                document.getElementById("ShowTip").style.display = "none";
                                document.getElementById("ShowText").value = "";
                            }
                        }
                    }// end key down
                }//
            } else {
                // alert("无数据...");
                document.getElementById("ShowTip").style.display = "none";
            }
        } else {
            // alert("6");
            document.getElementById("ShowTip").innerHTML = "<img src='../images/Icon_warning_01.gif'>&nbsp;找不到您想要的点！！";
        }
    }
}

// 获取焦点
function FocusOP(OPP, VNum) {
    // 清除其它焦点
    for (M = 1; M < VNum; M++) {
        document.getElementById(M).focus = false;
        document.getElementById(M).style.background = "white";
    }
    document.getElementById(OPP).focus = true;
    document.getElementById(OPP).style.background = "#a9e4e9";// change to

}
// 失去焦点
function UFocusOP(EID) {
    // alert(EID + " UFocusOP ");
    document.getElementById(EID).focus = false;
    document.getElementById(EID).style.background = "#FFFFFF";

}

// 单击注入值
function ClickInner(strValue) {
    document.getElementById("ShowText").value = strValue;
    document.getElementById("ShowTip").style.display = "none";
}

//***************************************自动提示控件结束******************************************************

var trend_canvas = null;
var opTrend = {
    canvasX: 0,
    canvasY: 0,
    canvasWidth: 400,
    canvasHeight: 300,
    drawLineType: 0,// 画曲线类型，（暂定0为当前时间曲线，即曲线会跟随时间平移，1为固定时间区间内画曲线）
    colors: ['#FF0000', '#FFFF00', '#00FF00', '#6666E1', '#00FFFF',
        '#FF00FF', '#FF007B', '#804000', '#FFAFAF', '#99CC00', '#FFC800',
        '#CCFFFF', '#695D61', '#00EBA3', '#8540FF', '#FF9900'],
    from: null,
    to: null,
    currentFrom: null,
    current: null,
    dotcount: 0,
    interval: 1000,// 更新频率
    dateType: 4,// 日期格式化类型，具体内容参考画图工具设置
    playing: true,// 曲线是否动态播放
    trendObjs: new trendUtilMap(),// 趋势组
    trendArray: new Array(),
    numberFormat: 2,
    margin_top: 10,// 趋势内部面板与边框上下间隔
    margin_bottom: 40,// 趋势内部面板与边框下间隔
    margin_padding: 40,// 趋势内部面板与边框左右的间隔
    margin_lineStyle: 0,// 外边框样式
    margin_fillColor: 'white',// 外边框前景色
    margin_fillBackColor: 'white',// 外边框后景色
    margin_lineWidth: 1,// 外边框线宽度
    margin_lineColor: 'black',// 外边框线颜色
    margin_type: 1,// 背景框填充样式
    margin_fillStyleFirst: 0,
    margin_fillStyleSecond: 0,
    margin_fillStyleThird: 0,

    widthRatioA: 10,
    widthRatioB: 11,// 趋势区域所占整体宽度为widthRatioA/widthRatioB，上下限所占（B-A）/B

    innerBorder_lineWidth: 1,// 内边框线宽
    innerBorder_lineStyle: 0,// 内边框样式
    innerBorder_color: 'black',// 内边框颜色

    xaxisHeight: 40,// x轴刻度高度
    xAxisScaleCount: 5,// 刻度个数
    timeFontColor: 'black',// 时间字体颜色
    timeFontSize: 12,// 时间刻度字体

    trend_backLineCount: 10,// 背景线条数
    trend_bgLineColor: 'black',// 背景线颜色
    trend_bgLineWidth: 0.5,// 背景线宽
    trend_bgLineStyle: 3,// 背景线样式
    trend_bgColor: 'white',// 趋势面板背景色

    isComponents: true,
    promptMsg: "数据正在加载中，请稍侯……",

    rightMessageBackgroundColor: 'white',// 上下限信息背景色

    // 添加趋势
    addTrendMap: function (name, lines) {// 添加趋势
        this.trendObjs.put(name, lines);
    },
    addTrend: function (line) {
        this.trendArray.push(line);
    },
    repaint: function (name) {
        // 重绘
        this.from = opTrend.getTimeFromString(this.from);
        this.to = opTrend.getTimeFromString(this.to);
        // this.from = new Date(this.from);
        // this.to = new Date(this.to);
        opTrend.draw();
        opTrend.drawTrend(name);
        opTrend.update(name);
    },
    /**
     * 绘制画布
     */
    draw: function () {
        // 清除整个画布
        trend_canvas.clearRect(opTrend.canvasX, opTrend.canvasY,
            opTrend.canvasWidth + opTrend.margin_padding * 2,
            opTrend.canvasHeight + opTrend.margin_top
            + opTrend.margin_bottom);
        // 背景
        opTrend.borderRect.draw();
        // 绘制趋势背景区域
        opTrend.trendRect.draw();
        // 绘制背景线
        opTrend.trendBackLine.draw();
        // 绘制x轴刻度及时间
        opTrend.canvasXAxis.draw();
        opTrend.rightMessage.draw();
    },

    drawTrend: function (name) {
        // 图形趋势
        var temp = 0, objs = opTrend.trendObjs.get(name);
        if (objs) {
            for (var j = 0; j < objs.length; j++) {
                objs[j].draw();
                temp += (opTrend.canvasHeight) / 20;
                objs[j].drawRightMessage(temp);
            }
        }
        // 组件趋势
        if (!opTrend.isComponents) {
            if (opTrend.trendArray.length > 0) {
                objs = opTrend.trendArray;
                for (var j = 0; j < objs.length; j++) {
                    objs[j].draw();
                    temp += (opTrend.canvasHeight) / 20;
                    objs[j].drawRightMessage(temp);
                }
            }
            if (opTrend.trendArray.length > 0) {
                objs = opTrend.trendArray;
                for (var j = 0; j < objs.length; j++) {
                    objs[j].drawAlarmLine();
                }
            }
            this.drawPrompt(opTrend.promptMsg);
            opTrend.promptMsg = "";
        }
    },

    /**
     * 更新变更坐标
     */
    update: function (name) {
        if (opTrend.playing) {
            var objs = opTrend.trendObjs.get(name);
            if (objs) {
                for (var j = 0; j < objs.length; j++) {
                    objs[j].update();
                }
            }
            if (opTrend.trendArray.length > 0 && !opTrend.isComponents) {
                objs = opTrend.trendArray;
                for (var j = 0; j < objs.length; j++) {
                    objs[j].update();
                }
            }
        }
    },
    /**
     * 数据加载信息
     *
     * @param {}
     *            str
     */
    drawPrompt: function (str) {
        trend_canvas.fillStyle = "red";
        trend_canvas.font = "15px 宋体";
        trend_canvas.fillText(str, opTrend.canvasX + opTrend.canvasWidth
            / opTrend.widthRatioB * opTrend.widthRatioA / 2,
            opTrend.canvasY + opTrend.canvasHeight / 2);
    },
    /**
     * 更新X轴坐标时间
     */
    updateTime: function () {
        opTrend.from = new Date(opTrend.from.getTime() + opTrend.interval);
        opTrend.to = new Date(opTrend.to.getTime() + opTrend.interval);
    },
    init: function () {
        this.from = opTrend.getTimeFromString(this.from);
        this.to = opTrend.getTimeFromString(this.to);
        var play = this.setIntervalFun(this.interval);
    },
    clear: function () {
        this.trendObjs = new trendUtilMap();
        this.trendArray = new Array();
    },
    setIntervalFun: function (interval) {
        var play = setInterval(function () {
            opTrend.draw();
            opTrend.update();
        }, interval);
        return play;
    },
    /**
     * 字符串转时间
     *
     * @param {}
     *            target
     * @return {}
     */
    getTimeFromString: function (target) {
        var str = target.toString();
        str = str.replace(/-/g, "/");
        var oDate1 = new Date(str);
        return oDate1;
    },
    /**
     * 日期格式化
     *
     * @param {}
     *            _format_index
     * @return {String}
     */
    getDateFormat: function (_format_index) {
        switch (_format_index) {
            case 0:
                return "mm:ss";
            case 1:
                return "mm";
            case 2:
                return "hh";
            case 3:
                return "hh:mm:ss";
            case 4:
                return "yyyy-MM-dd hh:mm:ss";
            case 5:
                return "yyyy-MM-dd";
            case 6:
                return "MM-dd";
            case 7:
                return "MM-dd-yy";
            case 8:
                return "EEE";
        }
    },
    /**
     * 趋势对象
     *
     * @param data
     * @returns
     */
    trendObj: function () {
        this.pointName = null;
        this.type = null;
        this.lineWidth = 1;
        this.topLimit = 100;// 上限
        this.lowLimit = 0;// 下限
        this.alarmTop = null;// 限高
        this.alarmLow = null;// 限低
        this.hide = false;
        this.color = "red";
        this.data = new Array(), this.trendData = new Array();
        // 绘制曲线
        this.draw = function () {
            var y = opTrend.canvasY + opTrend.canvasHeight + opTrend.margin_top;
            trend_canvas.beginPath();
            trend_canvas.strokeStyle = this.color;
            trend_canvas.lineWidth = this.lineWidth;
            if (this.data != null && this.data.length > 1 && !this.hide) {
                opTrend.repaintLine(this.data, y, this.color, this.lineWidth, this.type, this.topLimit, this.lowLimit);
            } else if (this.trendData != null) {
                this.data = opTrend.drawLineAndGenerateData(this.trendData, y,
                    this.color, this.lineWidth, this.type, this.topLimit,
                    this.lowLimit, this.hide);
                this.trendData = null;
            }
        }
        // 绘制限高限低线
        this.drawAlarmLine = function () {
            var y = opTrend.canvasY + opTrend.canvasHeight
                + opTrend.margin_top;
            var x1 = opTrend.canvasX + opTrend.margin_padding, x2 = opTrend.canvasX
                + opTrend.canvasWidth
                * opTrend.widthRatioA
                / opTrend.widthRatioB + opTrend.margin_padding;
            var height = 16, tempH = 4, tempW = 2;
            if (this.alarmTop != null && this.alarmTop != ""
                && !this.hide) {
                var width = trend_canvas.measureText(this.alarmTop).width * 1.2;

                var yy = opTrend.getCanvasY(this.alarmTop,
                    this.topLimit, this.lowLimit);
                yy = opTrend.drawLineLimit(yy, y);
                trend_funStyle.drawDashedLine(x1 + width, yy, x2
                    - width, yy, 2, this.lineWidth, this.color);

                trend_canvas.globalAlpha = 0.6;
                trend_canvas.fillStyle = this.color;
                trend_canvas.fillRect(x1, yy - height / 2, width,
                    height);
                trend_canvas.fillRect(x2 - width, yy - height / 2,
                    width, height);
                trend_canvas.globalAlpha = 1;
                trend_canvas.fillStyle = this.color;
                trend_canvas.font = "12px 宋体";
                trend_canvas.fillText(this.alarmTop, x1 + tempW, yy
                    + tempH);
                trend_canvas.fillText(this.alarmTop,
                    x2 - width + tempW, yy + tempH);
            }
            if (this.alarmLow != null && this.alarmLow != ""
                && !this.hide) {
                var width = trend_canvas.measureText(this.alarmLow).width * 1.2;
                var yy = opTrend.getCanvasY(this.alarmLow,
                    this.topLimit, this.lowLimit);
                yy = opTrend.drawLineLimit(yy, y);
                trend_funStyle.drawDashedLine(x1 + width, yy, x2
                    - width, yy, 2, this.lineWidth, this.color);
                trend_canvas.globalAlpha = 0.6;
                trend_canvas.fillStyle = this.color;
                trend_canvas.fillRect(x1, yy - height / 2, width,
                    height);
                trend_canvas.fillRect(x2 - width, yy - height / 2,
                    width, height);
                trend_canvas.globalAlpha = 1;
                trend_canvas.fillStyle = this.color;
                trend_canvas.font = "12px 宋体";
                trend_canvas.fillText(this.alarmLow, x1 + tempW, yy
                    + tempH);
                trend_canvas.fillText(this.alarmLow,
                    x2 - width + tempW, yy + tempH);
            }
        },
            // 绘制右边上下限图形及文字
            this.drawRightMessage = function (temp) {
                var x = opTrend.canvasX + opTrend.canvasWidth
                    + opTrend.margin_padding - opTrend.canvasWidth
                    / opTrend.widthRatioB;
                y = opTrend.canvasY + opTrend.margin_top,
                    width = opTrend.canvasWidth / opTrend.widthRatioB,
                    height = opTrend.canvasHeight, side = height / 35,
                    x1 = x + width / opTrend.widthRatioB,
                    y1 = y + temp, y2 = y + height - temp;
                trend_canvas.fillStyle = this.color;
                trend_canvas.fillRect(x1, y1, side, side);
                trend_canvas.fillRect(x1, y2, side, side);
                trend_canvas.font = opTrend.timeFontSize + "px Verdana";
                var t = Math.round(this.topLimit), l = Math
                    .round(this.lowLimit);
                trend_canvas.fillText(t, x1 + side * 1.5, y1 + side);
                trend_canvas.fillText(l, x1 + side * 1.5, y2 + side);

            },
            // 每次间隔更新坐标
            this.update = function () {
                var timeWidth = opTrend.to.getTime()
                    - opTrend.from.getTime();
                if (this.data.length > 10) {
                    if (this.data[0][0] + timeWidth < opTrend.from
                            .getTime()) {
                        this.data.remove(0);
                    }
                }
            }

        // 实时添加动态数据
        this.addPoint = function (arr) {
            this.data.push(arr);
        };
    },
    /**
     * 背景框
     */
    borderRect: {
        draw: function () {
            var width = opTrend.canvasWidth + opTrend.margin_padding * 2, height = opTrend.canvasHeight
                + opTrend.margin_bottom + opTrend.margin_top;
            var dashedRect = {
                x: opTrend.canvasX,
                y: opTrend.canvasY,
                width: width,
                height: height,
                lineStyle: opTrend.margin_lineStyle,
                fillType: opTrend.margin_type,
                lineWidth: opTrend.margin_lineWidth,
                color: opTrend.margin_lineColor,
                fcolor: opTrend.margin_fillColor,
                bcolor: opTrend.margin_fillBackColor,
                firstParam: opTrend.margin_fillStyleFirst,
                secondParam: opTrend.margin_fillStyleSecond,
                thirdParam: opTrend.margin_fillStyleThird
            };
            trend_funStyle.drawRect(dashedRect);
        }
    },
    /**
     * 背景线
     */
    trendBackLine: {
        draw: function () {
            var x = opTrend.canvasX + opTrend.margin_padding, y = opTrend.canvasY
                + opTrend.margin_top, targetHeight = opTrend.canvasHeight, temp = targetHeight
                / opTrend.trend_backLineCount;
            for (var i = 0; i < opTrend.trend_backLineCount - 1; i++) {
                trend_funStyle.drawDashedLine(x, temp + y, opTrend.canvasWidth
                    + x - opTrend.canvasWidth / opTrend.widthRatioB, temp
                    + y, opTrend.trend_bgLineStyle,
                    opTrend.trend_bgLineWidth, opTrend.trend_bgLineColor);
                temp += targetHeight / opTrend.trend_backLineCount;
            }
            ;
        }
    },
    /**
     * 趋势画布
     */
    trendRect: {
        draw: function () {
            var x = opTrend.canvasX + opTrend.margin_padding, y = opTrend.canvasY
                + opTrend.margin_top, width = opTrend.canvasWidth
                - opTrend.canvasWidth / opTrend.widthRatioB, height = opTrend.canvasHeight;
            var dashedRect = {
                x: x,
                y: y,
                width: width,
                height: height,
                lineStyle: opTrend.innerBorder_lineStyle,
                fillType: 1,
                lineWidth: opTrend.innerBorder_lineWidth,
                color: opTrend.innerBorder_color,
                fcolor: null,
                bcolor: opTrend.trend_bgColor
            };
            trend_funStyle.drawRect(dashedRect);
        }
    },
    /**
     * x轴刻度对象
     */
    canvasXAxis: {
        time: 0,
        scale: {
            lineHeight: 5,

            draw: function () {
                try {
                    var y = opTrend.canvasY + opTrend.canvasHeight
                        + opTrend.margin_top, temp = (opTrend.canvasWidth - (opTrend.canvasWidth / opTrend.widthRatioB))
                        / opTrend.xAxisScaleCount, xTemp = 0;
                    trend_canvas.fillStyle = opTrend.timeFontColor;
                    for (var i = 0; i < opTrend.xAxisScaleCount + 1; i++) {
                        var _x = xTemp + opTrend.canvasX
                            + opTrend.margin_padding;
                        if (i != 0 && i < opTrend.xAxisScaleCount) {
                            trend_funStyle.drawDashedLine(_x, y, _x + 0.1,
                                (opTrend.canvasY + opTrend.margin_top),
                                opTrend.trend_bgLineStyle,
                                opTrend.trend_bgLineWidth,
                                opTrend.trend_bgLineColor);
                        }

                        trend_canvas.font = opTrend.timeFontSize + "px Verdana";
                        var time = new Date(opTrend.getTimeFromX(xTemp))
                            .getTime(), ymd = "", hms = "";
                        if (opTrend.dateType == 4) {
                            ymd = trend_Util.dateFormat(new Date(time),
                                "yy-MM-dd");
                            hms = trend_Util.dateFormat(new Date(time),
                                "HH:mm:ss");
                        } else {
                            hms = trend_Util.dateFormat(new Date(time), opTrend
                                .getDateFormat(opTrend.dateType));
                        }
                        ;
                        trend_canvas.fillText(hms, _x, y + this.lineHeight * 2);
                        trend_canvas.fillText(ymd, _x, y + this.lineHeight * 4);
                        xTemp += temp;
                    }
                    ;
                    trend_canvas.stroke();
                } catch (e) {
                    console.log(e);
                }
            }

        },
        // 绘制背景框
        draw: function () {
            this.scale.draw();
        }
    },
    /**
     * 画板上下限区域
     *
     * @type
     */
    rightMessage: {
        draw: function () {
            var x = opTrend.canvasX + opTrend.canvasWidth
                + opTrend.margin_padding - opTrend.canvasWidth
                / opTrend.widthRatioB, y = opTrend.canvasY
                + opTrend.margin_top, width = opTrend.canvasWidth
                / opTrend.widthRatioB, height = opTrend.canvasHeight;

            var dashedRect = {
                x: x,
                y: y,
                width: width,
                height: height,
                lineStyle: opTrend.innerBorder_lineStyle,
                fillType: 1,
                lineWidth: opTrend.innerBorder_lineWidth,
                color: opTrend.innerBorder_color,
                fcolor: null,
                bcolor: opTrend.trend_bgColor
            };
            trend_funStyle.drawRect(dashedRect);
        }
    },
    /**
     * 获取画布x坐标
     *
     * @param target
     * @returns {Number}
     */
    getCanvasX: function (target) {
        var result = null, interval = target - opTrend.from.getTime();
        result = opTrend.getXProportion() * interval;
        return result;
    },
    /**
     * 获取画布y坐标
     *
     * @param target
     * @param top
     * @param low
     * @returns {Number}
     */
    getCanvasY: function (target, top, low) {
        var interval = target - low, res = opTrend.canvasHeight
            + opTrend.canvasY + opTrend.margin_top
            - opTrend.getYProportion(top, low) * interval;
        return res;
    },
    /**
     * 获取X轴比例
     *
     * @returns {Number}
     */
    getXProportion: function () {
        var timeWidth = opTrend.to.getTime() - opTrend.from.getTime();
        return (opTrend.canvasWidth - opTrend.canvasWidth / opTrend.widthRatioB)
            / timeWidth;
    },
    /**
     * 获取Y轴比例
     *
     * @returns {Number}
     */
    getYProportion: function (top, low) {
        var valueHeight = top - low;
        return (opTrend.canvasHeight) / valueHeight;
    },
    /**
     * 根据坐标获取时间
     *
     * @param xx
     * @returns
     */
    getTimeFromX: function (xx) {
        var result = opTrend.from.getTime()
            + xx
            * (opTrend.to.getTime() - opTrend.from.getTime())
            / (opTrend.canvasWidth - opTrend.canvasWidth
            / opTrend.widthRatioB);
        return result;
    },
    /**
     * 根据时间获取游标值
     *
     * @param {}
     *            time
     * @return {}
     */
    getValueFromTime: function (time) {
        var arr = new Array(), objs = opTrend.trendArray;
        value = null;
        for (var f = 0; f < objs.length; f++) {
            var data = objs[f].data;
            if (!data) {
                arr.push("N/A");
            } else {
                var index = this.getDataIndexFromTime(data, time, objs[f].type);// 获取数据集中和时间最近的一点
                value = this.calcYaxisValue(index, objs[f].type, data, time);
                arr.push(value);
            }
        }
        return arr;
    },
    /**
     * 计算游标值
     *
     * @param {}
     *            index
     * @param {}
     *            type
     * @param {}
     *            data
     * @param {}
     *            time
     * @return {String}
     */
    calcYaxisValue: function (index, type, data, time) {
        if (type == "AX" || type == "R8") {
            try {
                var xy1 = data[index], x1 = 0, y1 = 0, x2 = 0, y2 = 0;
                if (xy1 && xy1[1] != null) {
                    x1 = xy1[0];
                    y1 = xy1[1];
                } else {
                    return "N/A";
                }
                index = index + 1;
                var xy2 = data[index];
                if (xy2 && xy2[1] != null) {
                    x2 = xy2[0];
                    y2 = xy2[1];
                } else {
                    return "N/A";
                }

                var k = (y2 - y1) / (x2 - x1), b = y1 - k * x1;
                if (x2 - x1 > 0) {
                    var yy = k * time + b;
                    return yy.toFixed(opTrend.numberFormat);
                } else {
                    return "N/A";
                }
            } catch (e) {
                console.log(e.message);
                return "N/A";
            }
        } else {
            try {
                var t = data[index][1];
                var t1 = data[index + 1][1];
                if (t != null && t1 != null) {
                    return t;
                } else {
                    return "N/A";
                }
            } catch (e) {
                console.log(e.message);
                return "N/A";
            }
        }
    },
    /**
     * 遍历数据组取时间点相近的数据的位置
     *
     * @param data
     * @param time
     * @returns {Array}
     */
    getDataIndexFromTime: function (data, time, type) {
        var count = 0;
        if (data) {
            for (var d = 0; d < data.length; d++) {
                var tm = Math.round(data[d][0]), temp = time - tm;
                if (type == "AX" || type == "R8") {
                    if (temp <= 1000 && temp > 0) {
                        count = d;
                        break;
                    } else if (tm > time) {
                        count = d - 1;
                        break;
                    }
                } else {
                    if (temp <= 500 && temp >= -500) {
                        count = d;
                        break;
                    } else if (tm > time) {
                        count = d - 1;
                        break;
                    }
                }
            }
        }
        return count;
    },
    /**
     * 初次画曲线并且生成x,y数组
     *
     * @param data
     * @param top
     * @param low
     * @param y
     * @returns {Array}
     */
    drawLineAndGenerateData: function (data, y, color, lineWidth, type, top,
                                       low, isHide) {
        // data,top,low,y,type
        var newData = new Array();
        for (var i = 0; i < data.length; i++) {
            var xys = new Array();
            xys[0] = data[i].x;
            if (data[i].y == null) {
                xys[1] = null;
            } else {
                xys[1] = data[i].y;
            }
            newData.push(xys);
        }
        if (!isHide) {
            opTrend.repaintLine(newData, y, color, lineWidth, type, top, low);
        }
        return newData;
    },
    /**
     * 曲线坐标变更后重绘曲线
     *
     * @param data
     * @param y
     * @param color
     * @param lineWidth
     */
    repaintLine: function (data, y, color, lineWidth, type, top, low) {
        if (type == 'DX') {
            data = opTrend.getDXDataFromOldData(data);
        }
        trend_canvas.lineWidth = lineWidth;
        trend_canvas.strokeStyle = color;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                //修正回放趋势时，右侧有多余的趋势线
                if (data[i][0] > opTrend.to.getTime()) {
                    continue;
                }
                var xx = opTrend.getCanvasX(data[i][0]) + opTrend.canvasX + opTrend.margin_padding,
                    yy = data[i][1], rightX = opTrend.canvasX + opTrend.canvasWidth * opTrend.widthRatioA / opTrend.widthRatioB + opTrend.margin_padding;
                if (yy == null && i + 1 < data.length) {
                    var x1 = opTrend.getCanvasX(data[i + 1][0]) + opTrend.canvasX + opTrend.margin_padding;
                    if (x1 > rightX)
                        x1 = rightX;
                    var y1 = opTrend.getCanvasY(data[i + 1][1], top, low);
                    y1 = opTrend.drawLineLimit(y1, y);
                    trend_canvas.moveTo(x1, y1);
                } else {
                    if (yy != null) {
                        yy = opTrend.getCanvasY(yy, top, low);
                        yy = opTrend.drawLineLimit(yy, y);
                        if (xx > rightX)
                            xx = rightX;
                        trend_canvas.lineTo(xx, yy);
                    }
                }
            }
            trend_canvas.stroke();
        }
    },
    /**
     * 数据转换为DX曲线数据
     *
     * @param data
     * @returns {Array}
     */
    getDXDataFromOldData: function (data) {
        var newData = new Array();
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                if (i + 1 < data.length) {
                    newData.push(data[i]);
                    if (data[i][1] != null && data[i + 1][1] != null) {
                        var arr = new Array();
                        arr[0] = data[i + 1][0];
                        arr[1] = data[i][1];
                        newData.push(arr);
                    }
                    ;
                } else {
                    newData.push(data[i]);
                }
                ;
            }
            ;
        }
        return newData;
    },
    /**
     * 修正曲线超出上下屏时坐标
     *
     * @param n
     * @param limit
     * @returns
     */
    drawLineLimit: function (n, limit) {
        if (n >= limit) {
            n = limit;
        } else if (n < opTrend.canvasY + opTrend.margin_top) {
            n = opTrend.canvasY + opTrend.margin_top;
        }
        ;
        return n;
    }
};

// --------------------------------------------------------------------------------------
var trend_funStyle = {
    /**
     * 画矩形 obj --> x,y,width,height,lineStyle,lineWidth,color,fcolor,bcolor……
     */
    drawRect: function (obj) {
        var grd = null;
        switch (obj.fillType) {
            case 0:
                trend_canvas.fillStyle = "white";
                trend_funStyle.drawBorderRect(obj);
                break;
            case 1:
                if (obj.fcolor == null || obj.fcolor == undefined)
                    obj.fcolor = "white";
                trend_canvas.fillStyle = obj.bcolor;
                trend_funStyle.drawBorderRect(obj);
                break;
            case 2:
                trend_canvas.fillStyle = obj.bcolor;
                trend_funStyle.drawBorderRect(obj);
                trend_funStyle.drawBgStyle(obj);
                break;
            case 3:
                grd = trend_funStyle.drawBgColorChange(obj);
                trend_canvas.fillStyle = grd;
                trend_funStyle.drawBorderRect(obj);
                break;
        }
        ;
    },
    /**
     * 背景色渐变
     */
    drawBgColorChange: function (obj) {
        var grd = null;
        switch (obj.secondParam) {
            case 0:
                grd = trend_canvas.createLinearGradient(0, obj.y, 0, obj.height
                    + obj.y);
                break;
            case 1:
                grd = trend_canvas.createLinearGradient(obj.x, 0,
                    obj.width + obj.x, 0);
                break;
            case 2:
                grd = trend_canvas.createLinearGradient(obj.x, obj.y, obj.width
                    + obj.x, obj.height + obj.y);
                break;
            case 3:
                grd = trend_canvas.createLinearGradient(obj.x, obj.height + obj.y,
                    obj.width + obj.x, obj.y);
                break;
        }
        switch (obj.thirdParam) {
            case 0:
                grd.addColorStop(0, obj.bcolor);
                grd.addColorStop(1, obj.fcolor);
                break;
            case 1:
                grd.addColorStop(0, obj.fcolor);
                grd.addColorStop(1, obj.bcolor);
                break;
            case 2:
                grd.addColorStop(0, obj.bcolor);
                grd.addColorStop(0.5, obj.fcolor);
                grd.addColorStop(1, obj.bcolor);
                break;
            case 3:
                grd.addColorStop(0, obj.fcolor);
                grd.addColorStop(0.5, obj.bcolor);
                grd.addColorStop(1, obj.fcolor);
                break;
        }
        return grd;
    },
    /**
     * 背景图案
     */
    drawBgStyle: function (obj) {
        var a = 6, b = 8;
        switch (obj.firstParam) {
            case 0:// 横线
                trend_funStyle.drawLine4Lateral(a, obj);
                break;
            case 1:// 纵线
                trend_funStyle.drawLine4Longitudinal(a, obj);
                break;
            case 2:// 横纵交叉线
                trend_funStyle.drawLine4Lateral(a, obj);
                trend_funStyle.drawLine4Longitudinal(a, obj);
                break;
            case 3:// 横线
                trend_funStyle.drawLine4Lateral(a / 2, obj);
                break;
            case 4:// 纵线
                trend_funStyle.drawLine4Longitudinal(a / 2, obj);
                break;
            case 5:// 纵横交叉线
                trend_funStyle.drawLine4Lateral(a / 2, obj);
                trend_funStyle.drawLine4Longitudinal(a / 2, obj);
                break;
            case 6:// k = 1
                trend_funStyle.drawLine4beveled(b, obj);
                break;
            case 7:// k = -1
                trend_funStyle._drawLine4beveled(b, obj);
                break;
            case 8:// 交叉线
                trend_funStyle.drawLine4beveled(b, obj);
                trend_funStyle._drawLine4beveled(b, obj);
                break;
            case 9:// k = 1
                trend_funStyle.drawLine4beveled(b / 2, obj);
                break;
            case 10:// k = -1
                trend_funStyle._drawLine4beveled(b / 2, obj);
                break;
            case 11:// 交叉线
                trend_funStyle.drawLine4beveled(b / 2, obj);
                trend_funStyle._drawLine4beveled(b / 2, obj);
                break;
            case 12:// 波浪线
                trend_funStyle.drawWavesLine(obj);
                break;
            case 13:// 砖块线
                trend_funStyle.drawBrickBG(obj);
                break;
            case 14:// 横线虚线
                trend_funStyle.drawDashedLine4BGLateral(a, obj);
                break;
            case 15:// 纵向虚线
                trend_funStyle.drawDashedLine4BGLongitudinal(a, obj);
                break;
        }
    },

    /**
     * 画纵线
     *
     * @param temp
     * @param obj
     */
    drawLine4Longitudinal: function (temp, obj) {
        var count = temp;
        while ((obj.x + count) < obj.width + obj.x) {
            trend_funStyle.drawDashedLine(obj.x + count, obj.y, obj.x + count,
                obj.y + obj.height, 0, 1, obj.fcolor);
            count += temp;
        }
        ;
    },
    /**
     * 画横线
     *
     * @param temp
     * @param obj
     */
    drawLine4Lateral: function (temp, obj) {
        var count = temp;
        while ((obj.y + count) < obj.height + obj.y) {
            trend_funStyle.drawDashedLine(obj.x, obj.y + count, obj.x
                + obj.width, obj.y + count, 0, 1, obj.fcolor);
            count += temp;
        }
        ;
    },
    /**
     * 画斜线 k = -1 TODO width<height 情况未处理
     *
     * @param temp
     * @param obj
     */
    drawLine4beveled: function (temp, obj) {
        var count = temp;
        var flag = 0;
        while ((obj.y + count) <= obj.height + obj.y) {
            trend_funStyle.drawDashedLine(obj.x, obj.y + count, obj.x + count,
                obj.y, 0, 1, obj.fcolor);
            count += temp;
        }
        ;
        flag = count - temp;
        count = temp;
        while (obj.x + flag + count < obj.x + obj.width) {
            trend_funStyle.drawDashedLine(obj.x + count, obj.y + obj.height,
                obj.x + flag + count, obj.y, 0, 1, obj.fcolor);
            count += temp;
        }
        ;

        count = temp;
        while (obj.y + obj.height - count > obj.y) {
            trend_funStyle.drawDashedLine(obj.x + obj.width - count, obj.y
                + obj.height, obj.x + obj.width,
                obj.y + obj.height - count, 0, 1, obj.fcolor);
            count += temp;
        }
        ;
    },
    /**
     * 画斜线 k = 1 TODO width<height 情况未处理
     *
     * @param temp
     * @param obj
     */
    _drawLine4beveled: function (temp, obj) {
        var count = temp;
        var flag = 0;
        while ((obj.y + count) <= obj.height + obj.y) {
            trend_funStyle.drawDashedLine(obj.x, obj.y + obj.height - count,
                obj.x + count, obj.y + obj.height, 0, 1, obj.fcolor);
            count += temp;
        }
        ;
        flag = count - temp;
        count = temp;
        while (obj.x + flag + count < obj.x + obj.width) {
            trend_funStyle.drawDashedLine(obj.x + count, obj.y, obj.x + count
                + flag, obj.y + obj.height, 0, 1, obj.fcolor);
            count += temp;
        }
        ;
        count = temp;
        while (obj.y + obj.height - count > obj.y) {
            trend_funStyle.drawDashedLine(obj.x + obj.width - count, obj.y,
                obj.x + obj.width, obj.y + count, 0, 1, obj.fcolor);
            count += temp;
        }
        ;
    },
    /**
     * 画矩形边框（虚线样式）
     *
     * @param obj
     */
    drawBorderRect: function (obj) {
        trend_canvas.fillRect(obj.x, obj.y, obj.width, obj.height);
        trend_funStyle.drawDashedLine(obj.x, obj.y, obj.x, obj.y + obj.height,
            obj.lineStyle, obj.lineWidth, obj.color);
        trend_funStyle.drawDashedLine(obj.x + obj.width, obj.y, obj.x
            + obj.width, obj.y + obj.height, obj.lineStyle, obj.lineWidth,
            obj.color);
        trend_funStyle.drawDashedLine(obj.x, obj.y, obj.x + obj.width, obj.y,
            obj.lineStyle, obj.lineWidth, obj.color);
        trend_funStyle.drawDashedLine(obj.x, obj.y + obj.height, obj.x
            + obj.width, obj.y + obj.height, obj.lineStyle, obj.lineWidth,
            obj.color);
    },
    /**
     * 背景横向虚线
     */
    drawDashedLine4BGLateral: function (temp, obj) {
        var count = temp;
        while ((obj.y + count) < obj.height + obj.y) {
            trend_funStyle.drawDashedLine(obj.x, obj.y + count, obj.x
                + obj.width, obj.y + count, 1, 1, obj.fcolor);
            count += temp;
            var yy = obj.y + count;
            if (yy >= obj.height + obj.y) {
                yy = obj.height + obj.y;
            }
            ;
            trend_funStyle.drawDashedLine(obj.x + temp, yy, obj.x + obj.width,
                yy, 1, 1, obj.fcolor);
            count += temp;
        }
        ;
    },
    /**
     * 背景纵向虚线
     *
     * @param temp,obj
     */
    drawDashedLine4BGLongitudinal: function (temp, obj) {
        var count = temp;
        while ((obj.x + count) < obj.width + obj.x) {
            trend_funStyle.drawDashedLine(obj.x + count, obj.y, obj.x + count,
                obj.y + obj.height, 1, 1, obj.fcolor);
            count += temp;
            var xx = obj.x + count;
            if (xx >= obj.width + obj.x) {
                xx = obj.width + obj.x;
            }
            ;
            trend_funStyle.drawDashedLine(xx, obj.y + temp, xx, obj.y
                + obj.height, 1, 1, obj.fcolor);
            count += temp;
        }
        ;
    },
    /**
     * 画波浪线
     */
    drawWavesLine: function (obj) {
        var tempX = 0, tempY = 0, temp = 5;
        while (tempY < obj.height - temp) {
            while (tempX < obj.width) {
                trend_funStyle.drawDashedLine(obj.x + tempX, obj.y + tempY,
                    obj.x + tempX + temp, obj.y + tempY + temp, 0, 1,
                    obj.fcolor);
                trend_funStyle.drawDashedLine(obj.x + tempX + temp, obj.y
                    + tempY + temp, obj.x + tempX + 2 * temp,
                    obj.y + tempY, 0, 1, obj.fcolor);
                tempX += 2 * temp;
            }
            ;
            tempX = 0;
            tempY += temp;
        }
        ;
    },
    /**
     * 背景砖块图案
     *
     * @param obj
     */
    drawBrickBG: function (obj) {
        var temp = 7, tempX = 0, tempY = 0;
        trend_funStyle.drawLine4Lateral(temp, obj);
        while (tempY < obj.height - temp) {
            while (tempX + temp < obj.width) {
                trend_funStyle.drawDashedLine(obj.x + tempX, obj.y + tempY,
                    obj.x + tempX, obj.y + tempY + temp, 0, 1, obj.fcolor);
                trend_funStyle.drawDashedLine(obj.x + tempX + temp, obj.y
                    + tempY + temp, obj.x + tempX + temp, obj.y + tempY + 2
                    * temp, 0, 1, obj.fcolor);
                tempX += 2 * temp;
            }
            ;
            tempX = 0;
            tempY += 2 * temp;
        }
        ;
    },
    /**
     * 画虚线
     *
     * @param x,y,x2,y2,type,lw,color
     */
    drawDashedLine: function (x, y, x2, y2, type, lw, color) {
        if (color == null || color == undefined)
            color = "black";
        if (lw == null || lw == undefined)
            lw = 1;
        var dashGapArray = [];
        var flag = "butt";
        switch (type) {
            case 0:
                dashGapArray = [20000];
                flag = "square";
                break;
            case 1:
                dashGapArray = [8];
                break;
            case 2:
                dashGapArray = [4];
                break;
            case 3:
                dashGapArray = [3];
                break;
            case 4:
                dashGapArray = [2];
                break;
            case 5:
                dashGapArray = [11, 2, 2, 11];
                break;
            case 6:
                dashGapArray = [12, 3];
                break;
            case 7:
                dashGapArray = [2, 12, 2, 4];
                break;
            case 8:
                dashGapArray = [2, 2, 2, 2, 14, 12, 2, 2];
                break;
            case 9:
                dashGapArray = [11, 11, 2];
                break;
            case 10:
                dashGapArray = [4, 10];
                break;
            case 11:
                dashGapArray = [6, 10];
                break;
            case 12:
                dashGapArray = [8, 10];
                break;
            case 13:
                dashGapArray = [10, 9, 3, 10];
                break;
            case 14:
                dashGapArray = [30, 12, 6, 12];
                break;
        }
        trend_canvas.lineWidth = lw;
        trend_canvas.lineCap = flag;
        trend_canvas.beginPath();
        trend_canvas.strokeStyle = color;
        trend_canvas.dashedLine(x, y, x2, y2, dashGapArray);
        trend_canvas.stroke();
    }
};

// -----------------------------------------------------------------------------
// js map 函数
function trendUtilMap() {
    var struct = function (key, value) {
        this.key = key;
        this.value = value;
    };

    var put = function (key, value) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                this.arr[i].value = value;
                return;
            }
            ;
        }
        ;
        this.arr[this.arr.length] = new struct(key, value);
    };

    var get = function (key) {
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[i].key === key) {
                return this.arr[i].value;
            }
            ;
        }
        ;
        return null;
    };

    var remove = function (key) {
        var v;
        for (var i = 0; i < this.arr.length; i++) {
            v = this.arr.pop();
            if (v.key === key) {
                continue;
            }
            ;
            this.arr.unshift(v);
        }
        ;
    };

    var size = function () {
        return this.arr.length;
    };

    var isEmpty = function () {
        return this.arr.length <= 0;
    };
    this.arr = new Array();
    this.get = get;
    this.put = put;
    this.remove = remove;
    this.size = size;
    this.isEmpty = isEmpty;
}
Array.prototype.remove = function (dx) {
    if (isNaN(dx) || dx > this.length) {
        return false;
    }
    ;
    for (var i = 0, n = 0; i < this.length; i++) {
        if (this[i] != this[dx]) {
            this[n++] = this[i];
        }
        ;
    }
    ;
    this.length -= 1;
};
if (window.CanvasRenderingContext2D
    && CanvasRenderingContext2D.prototype.lineTo) {
    CanvasRenderingContext2D.prototype.dashedLine = function (x, y, x2, y2,
                                                              dashArray) {
        var temp = 0.1;
        if (!dashArray)
            dashArray = [10, 5];
        var dashCount = dashArray.length;
        this.moveTo(x + temp, y + temp);

        var dx = (x2 - x), dy = (y2 - y);
        var slope = dx ? dy / dx : 1e15;
        var distRemaining = Math.sqrt(dx * dx + dy * dy);
        var dashIndex = 0, draw = true;
        while (distRemaining >= 0.1 && dashIndex < 10000) {
            var dashLength = dashArray[dashIndex++ % dashCount];
            if (dashLength == 0)
                dashLength = 0.001; // Hack for Safari
            if (dashLength > distRemaining)
                dashLength = distRemaining;
            var xStep = Math
                .sqrt(dashLength * dashLength / (1 + slope * slope));
            x += xStep;
            y += slope * xStep;
            this[draw ? 'lineTo' : 'moveTo'](x + temp, y + temp);
            distRemaining -= dashLength;
            draw = !draw;
        }
        // Ensure that the last segment is closed for proper stroking
        this.moveTo(0, 0);
    }
}
