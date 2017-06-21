
function defaultTrendGroup() {
    this.trendcontainer = 'trend_container';
    this.opTrend = new opTrend();
    this.canvas_context = null;
    this.pointsTable = 'pointsTable';
    this.pointType = "plot";// span-->等间距，plot-->绘图值
    this.isDialog = false; // 是否弹出窗引用
    this.trendExportPicURL = "trendExport_export";// 导出服务
    this.defaultTrendServerName = "trend_getData";// 数据服务
    this.flushInterval = 1000;// 刷新间隔
    this.formatString = 'yyyy-MM-dd HH:mm:ss';
    this.defaultTrendString = new Array();// 点名组
    this.history = "history";//历史回放
    this.trendIntervalId = 0;
    this.trendStopFlushFlags = new Array();// 趋势停止标记

    this.trendDialogWidth = 770;
    this.trendDialogHeight = 400;

    this.trendDialogRealHeight= document.documentElement.clientHeight * 9 / 10,
    this.trendDialogRealWidth= document.documentElement.clientWidth * 8 / 9,

    this.trendDialogMaxHeight= document.documentElement.clientHeight - 10,
    this.trendDialogMaxWidth= document.documentElement.clientWidth - 10,
    this.trendDialogNormalHeight= document.documentElement.clientHeight * 4 / 5,
    this.trendDialogNormalWidth= document.documentElement.clientWidth * 3 / 4,

    this.dialogState = "min";
    this.linePointCount = 1600;// 曲线点数
    this.trendLineWidth = 1;
    this.trend_getData4CheckboxFlag = false;

    this.mouseLeaveXY = new Array();// 记录鼠标离开画布时的坐标
    this.trendTotleCount = 8;// 曲线个数
    this.trendIdFlags = [];// 趋势当前值
    this.trendColorFlags = [];// 趋势表格颜色ID
    this.trendTableInputColor = [];// 颜色选择器InputID
    this.trendTableCheckBoxId = [];// checkBoxID(TR-ID)
    this.trendYaxisCount = [];// 存放y轴数组
    this.chcekdPointNames = []; // 存放checkbox选中的点名
    this.trendConfigInfoMap = new trendUtilMap();// 初始化上下限Map

    this.colorMap = new trendUtilMap();// 初始化颜色Map
    this.descMap = new trendUtilMap();// 初始化描述Map
    this.pointTypeMap = new trendUtilMap();
    this.trendChartColors = ['#FF0000', '#FFFF00', '#00FF00', '#6666E1', '#00FFFF',
        '#FF00FF', '#FF007B', '#804000', '#FFAFAF', '#99CC00', '#FFC800',
        '#CCFFFF', '#695D61', '#00EBA3', '#8540FF', '#FF9900'];// 颜色初始化赋值
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

    this.initProperties = function (from, to, width, height, current) {
        if (trend_Util.isNull(from)) {
            from = new Date(trend_Util.getServerTime() - 1000 * 60 * 10);
            this.opTrend.from = from;
            from = trend_Util.dateFormat(from, this.formatString);
        } else {
            this.opTrend.from = from;
        }
        if (trend_Util.isNull(to)) {
            to = new Date(trend_Util.getServerTime());
            this.opTrend.to = to;
            to = trend_Util.dateFormat(to, this.formatString);
        } else {
            this.opTrend.to = to;
        }
        // 表格高度
        // $("#pointsMessage").css({height:tableHeight});
        // 边框设置
        this.opTrend.margin_top = 0;
        this.opTrend.margin_bottom = 25;
        this.opTrend.margin_padding = 0;
        this.opTrend.xAxisScaleCount = 5;// x刻度
        this.opTrend.trend_backLineCount = 5;

        var _width = this.trendDialogWidth - 50;
        var _bounds = [0, 0, _width,
            (this.trendDialogHeight - 100) / 10 * 7];
        this.opTrend.canvasX = parseInt(_bounds[0]);
        this.opTrend.canvasY = parseInt(_bounds[1]);
        this.opTrend.canvasWidth = parseInt(_bounds[2] - this.opTrend.margin_padding * 2);
        this.opTrend.canvasHeight = parseInt(_bounds[3] - this.opTrend.margin_top
            - this.opTrend.margin_bottom);

        this.opTrend.trend_bgColor = "black";
        this.opTrend.trend_bgLineColor = "white";
        this.opTrend.innerBorder_color = "white";
        this.opTrend.isComponents = false;
        console.log("trendConfigInfoMap：" + this.trendConfigInfoMap);

    };

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
    this.addName = function (names, from, to, width, height, current) {
        trend_Util.initProperties(from, to, width, height, this);
        this.initProperties(from, to, width, height, current);

        var playing = false;
        if (trend_Util.isNull(from) && trend_Util.isNull(to)) {
            playing = true;
        }
        // 点信息
        // 初始化页面布局
        this.assignment4ID();

        var str = new Array();
        str = names.split(",");
        // 去出数组中的重复元素
        str = trend_Util.removeArraySameElement(str);
        if (this.defaultTrendString.length == 0) {
            if (!trend_Util.checkNameRE(str, this)) {
                for (var i = 0; i < str.length; i++) {
                    if (this.defaultTrendString.length < this.trendTotleCount) {
                        this.defaultTrendString.push(str[i]);
                    } else {
                        break;
                    }
                }
            }
            this.addTrend(this.defaultTrendString, from, to, playing, current);
        } else if (this.defaultTrendString.length < this.trendTotleCount) {
            if (trend_Util.checkNameRE(str, this)) {
                alert("点名重复，请选择其他点名！");
                this.addTrend(this.defaultTrendString, from, to, playing,
                    current);
            } else {
                for (var i = 0; i < str.length; i++) {
                    if (this.defaultTrendString.length < this.trendTotleCount) {
                        this.defaultTrendString.push(str[i]);
                    } else {
                        break;
                    }
                }
                this.addTrend(this.defaultTrendString, from, to, playing,
                    current);
            }
        } else if (this.defaultTrendString.length >= this.trendTotleCount) {
            alert("最多只允许" + this.trendTotleCount + "条趋势共存！");
            return;
        }
        this.setHtmlCss();
    };

    // --------------------------------------KNS接口-------------------------------------------------
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
    this.addName_KNS = function (names, from, to, at, ab) {
        trend_Util.initProperties(from, to, '', '', this);
        this.initProperties(from, to, '', '');
        var playing = false;
        if (trend_Util.isNull(from) && trend_Util.isNull(to)) {
            playing = true;
        }
        // 点信息
        // 初始化页面布局
        this.assignment4ID();

        var str = new Array();
        str = names.split(",");
        // 去出数组中的重复元素
        str = trend_Util.removeArraySameElement(str);
        if (this.defaultTrendString.length == 0) {
            if (!trend_Util.checkNameRE(str, this)) {
                for (var i = 0; i < str.length; i++) {
                    if (this.defaultTrendString.length < this.trendTotleCount) {
                        this.defaultTrendString.push(str[i]);
                    } else {
                        break;
                    }
                }
            }
            this.addTrend_KNS(this.defaultTrendString, from, to, playing, at,
                ab);
        } else if (this.defaultTrendString.length < this.trendTotleCount) {
            if (trend_Util.checkNameRE(str, this)) {
                alert("点名重复，请选择其他点名！");
            } else {
                for (var i = 0; i < str.length; i++) {
                    if (this.defaultTrendString.length < this.trendTotleCount) {
                        this.defaultTrendString.push(str[i]);
                    } else {
                        break;
                    }
                }
                this.addTrend_KNS(this.defaultTrendString, from, to, playing,
                    at, ab);
            }
        } else if (this.defaultTrendString.length >= this.trendTotleCount) {
            alert("最多只允许" + this.trendTotleCount + "条趋势共存！");
            return;
        }
    };
    this.reloadData = function (names, from, to, playing, at, ab, current) {
        var that = this;
        // 清空数据表格
        $("#" + that.pointsTable).empty();
        var pointInfo = null;
        // 设置table 内容
        $
            .getJSON(
            that.defaultTrendServerName
            + '?flag=getPointsMessage&pointCount='
            + that.linePointCount
            + '&pointType=' + that.pointType
            + '&pn=' + encodeURI(encodeURI(names)) + '',
            function (data2) {
                pointInfo = data2;
                $("#" + that.pointsTable)
                    .append(
                    '<tr id="tableTitle">'
                    + '<td width="5%"  nowrap="nowrap"></td>'
                    + '<td width="20%" nowrap="nowrap">点名</td>'
                    + '<td width="5%"  nowrap="nowrap">颜色</td>'
                    + '<td width="10%" nowrap="nowrap" style="display: none">当前值</td>'
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
                    function (i, name) {
                        var bv = null, tv = null, lw = null, arr = that.trendConfigInfoMap
                            .get(name);
                        var thatTemp = that;
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
                        var checkedFlag = trend_Util
                            .isChecked(name, that);
                        $("#" + that.pointsTable)
                            .append(
                            '<tr id='
                            + that.trendTableCheckBoxId[i]
                            + ' >'
                            + '<td><input '
                            + checkedFlag
                            + ' id='
                            + that.trendTableCheckBoxId[i]
                            + ' type="checkbox" name="' +
                            that.pointsTable
                            + '_trendCheckBox"></td>'
                            + '<td nowrap="nowrap">'
                            + data2[i].name
                            + '</td>'
                            + '<td>'
                            + '<input id="'
                            + that.trendTableInputColor[i]
                            + '"'
                            + 'style="BACKGROUND-COLOR: '
                            + that.trendChartColors[i]
                            + '"'
                            + 'size=4 class="color {valueElement:'
                            + that.trendColorFlags[i]
                            + '}">'
                            + '<input id="'
                            + that.trendColorFlags[i]
                            + '" class="pointHidden" type="hidden" value='
                            + that.trendChartColors[i]
                                .replace(
                                "#",
                                "")
                            + '>'
                            + '</td>'
                            + '<td id="'
                            + that.trendIdFlags[i]
                            + ' "></td>'
                            + '<td nowrap="nowrap" style="display: none">'
                            + data2[i].ED
                            + '</td>'
                            + '<td>'
                            + data2[i].EU
                            + '</td>'
                            + '<td><input  class ="pointEdit" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
                            + 'value='
                            + tv
                            + ' size=6></td>'
                            + '<td><input  class ="pointEdit" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
                            + 'value='
                            + bv
                            + ' size=6></td>'

                            + '<td><input  class ="pointEdit" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
                            + 'value="'
                            + at
                            + '" size=6></td>'
                            + '<td><input  class ="pointEdit" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
                            + 'value="'
                            + ab
                            + '" size=6></td>'
                            + '<td><input  class ="pointEdit" onkeydown="trend_Util.upAndDownListener(this)" style="border:0px;border-bottom-style:none;border-top-style:none;border-left-style:none;border-right-style:none;font:normal 10px/1.8em Arial, Helvetica, sans-serif;"'
                            + 'value="'
                            + lw
                            + '" size=6></td>'
                            + '</tr>');
                    });

                // 数据
                var objs = that.opTrend.trendArray;
                if (trend_Util.isNull(objs)
                    || objs.length != names.length) {


                    $
                        .getJSON(
                        that.defaultTrendServerName
                        + '?pn='
                        + names
                        + '&flag=getData'
                        + '&from='
                        + from
                        + '&to='
                        + to
                        + '&isCanvas=true',
                        function (data) {
                            that.opTrend.trendArray = new Array();
                            $
                                .each(
                                names,
                                function (i,
                                          name) {

                                    var pointMessage = pointInfo[i], t1 = new that.opTrend.trendObj();
                                    t1.opTrend = that.opTrend;
                                    t1.pointName = pointMessage.name,
                                        color = null;
                                    if (color != null) {
                                        t1.color = color;
                                    } else {
                                        t1.color = that.trendChartColors[i];
                                    }
                                    t1.lineWidth = 1;
                                    t1.topLimit = pointMessage.TV;
                                    t1.lowLimit = pointMessage.BV;
                                    t1.type = pointMessage.pnType;
                                    t1.trendData = data[i];
                                    t1.alarmTop = at;
                                    t1.alarmLow = ab;// 限低
                                    //判断当前的 趋势是否被选中 是否在趋势图中显示
                                    if (trend_Util
                                            .isChecked(name, that) == '') {
                                        t1.hide = true;
                                    }
                                    that.opTrend
                                        .addTrend(t1);
                                });
                            that.opTrend.repaint(names);
                        });

                } else {
                    if (!trend_Util.isNull(from)) {
                        that.opTrend.from = from;
                    }
                    ;
                    if (!trend_Util.isNull(to)) {
                        that.opTrend.to = to;
                    }
                    $
                        .getJSON(
                        that.defaultTrendServerName
                        + '?pn='
                        + names
                        + '&flag=getData'
                        + '&from='
                        + from
                        + '&to='
                        + to
                        + '&isCanvas=true',
                        function (data) {
                            for (var i = 0; i < names.length; i++) {
                                that.opTrend.trendArray[i].data = null;
                                if (names[i] == that.opTrend.trendArray[i].pointName) {
                                    that.opTrend.trendArray[i].trendData = data[i];
                                    that.opTrend
                                        .repaint(names);
                                }
                            }
                        });
                }
                if (playing) {
                    that.opTrend.playing = playing;
                    that.getDyData();
                }
                if (current) {
                    var toTime = new Date(to);
                    if (that.opTrend.currentFrom) {
                        that.opTrend.from = that.opTrend.currentFrom;
                    }
                    that.opTrend.currentFrom = that.opTrend.from;
                    that.opTrend.to = current;
                    that.opTrend.current = that.opTrend.to;
                    that.history = setInterval(
                        function () {
                            if (that.opTrend.to.getTime() != toTime
                                    .getTime()) {
                                that.opTrend.updateTime();
                                that.opTrend.repaint(names);
                                that.opTrend.current = that.opTrend.to;
                                that.opTrend.currentFrom = that.opTrend.from;
                                if (that.mouseLeaveXY.length != 0) {
                                    trend_Util
                                        .drawVernier(that.mouseLeaveXY, that);
                                }
                            } else {
                                that.opTrend.from = from;
                                that.opTrend.to = to;
                                clearInterval(that.history);
                            }
                        }, that.flushInterval);
                }
                trend_Util.setCanvasClick(that);
                trend_Util.setCanvasFun(that);
                trend_Util.setControlsFun(that);
                trend_Util.setTrendBgColor(that);// 为表格颜色绑定触发函数
                trend_Util.checkBoxSelected4Hide(that);
            });
    };

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
    this.addTrend_KNS = function (names, from, to, playing, at, ab) {
        this.opTrend.promptMsg = "数据正在加载中，请稍侯……";
        $("#" + this.trendcontainer).unbind();
        // 颜色数组增加颜色
        var cls = this.trendChartColors;
        for (var j = 0; j < names.length; j++) {
            var col = cls[Math.floor(Math.random() * cls.length + 1)];
            this.trendChartColors.push(col);
        }
        if (!trend_Util.isNull(from)) {
            $("#trend_from").attr("value", from);
        }
        if (!trend_Util.isNull(to)) {
            $("#trend_to").attr("value", to);
        }
        this.opTrend.interval = this.flushInterval;// 获取interval
        // 趋势停止刷新
        trend_Util.stopFlush(this);
        if (this.isDialog) {
            this.showDialog();
        } else {
            this.setHtmlCss();
        }
        trend_Util.getCheckedNames(this);
        trend_Util.getNewTrendColorsAndRanges(this);
        this.reloadData(names, from, playing, to, at, ab);
    };
    // ------------------------------------------------------------------------------------

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
    this.addTrend = function (names, from, to, playing, current) {
        names = trend_Util.removeArraySameElement(names);
        this.opTrend.promptMsg = "数据正在加载中，请稍侯……";
        $("#" + this.trendcontainer).unbind();
        // 颜色数组增加颜色

        var cls = this.trendChartColors;
        for (var j = 0; j < names.length; j++) {
            var col = cls[Math.floor(Math.random() * cls.length + 1)];
            this.trendChartColors.push(col);
        }

        this.opTrend.interval = this.flushInterval;// 获取interval

        // 趋势停止刷新
        trend_Util.stopFlush(this);

        if (this.isDialog) {
            this.showDialog();
        } else {
            this.setHtmlCss();
        }
        if (!trend_Util.isNull(from)) {
            $("#trend_from").attr("value", from);
        }
        else {
            $("#trend_from").attr("value", '');
        }
        if (!trend_Util.isNull(to)) {
            $("#trend_to").attr("value", to);
        } else {
            $("#trend_to").attr("value", '');
        }
        trend_Util.getCheckedNames(this);
        trend_Util.getNewTrendColorsAndRanges(this);

        this.reloadData(names, from, to, playing, null, null, current);
    };

    this.getDyData = function () {
        var that = this;
        var names = that.defaultTrendString;
        that.trendIntervalId = setInterval(
            function () {
                $
                    .getJSON(
                    that.defaultTrendServerName
                    + '?flag=getDyData&pn='
                    + encodeURI(encodeURI(names)) + '',
                    function (data) {
                        for (var i = 0; i < names.length; i++) {
                            for (var j = 0; j < that.opTrend.trendArray.length; j++) {
                                if (names[i] == that.opTrend.trendArray[j].pointName) {
                                    if (trend_Util
                                            .isNull(data[i])) {
                                        $(
                                            "#"
                                            + that.trendIdFlags[i])
                                            .text("N/A");
                                    } else {
                                        if (data[i].y == null) {
                                            $(
                                                "#"
                                                + that.trendIdFlags[i])
                                                .text("");
                                        } else {
                                            $(
                                                "#"
                                                + that.trendIdFlags[i])
                                                .text(
                                                data[i].y);
                                        }
                                        var arr = new Array();
                                        arr[0] = data[i].x;
                                        // 防止时间轴与曲线不对应
                                        if (parseInt(data[i].x) > that.opTrend.to
                                                .getTime()) {
                                            that.opTrend.to = new Date(
                                                parseInt(data[i].x));
                                        }
                                        arr[1] = data[i].y;
                                        that.opTrend.trendArray[j]
                                            .addPoint(arr);
                                    }
                                }
                            }
                        }
                    });
                that.opTrend.updateTime();
                that.opTrend.repaint(names);
                if (that.mouseLeaveXY.length != 0) {
                    trend_Util.drawVernier(that.mouseLeaveXY, that);
                }
            }, that.flushInterval);
        that.trendStopFlushFlags
            .push(that.trendIntervalId);
    };
    this.showDialog = function () {

        var tableHtml = '<div id="totleDiv" style="overflow:auto;">'
            +
                // 表格上端
            '<div id="buttonDivId" style="font:normal 10px/1.8em Arial, Helvetica, sans-serif;">'
            + '<div align="right" id="buttonleft">'
            + '<button id="oneday" onclick="this.shortCutSearch(24)">实时</button>'
            + '<button id="threeDay" onclick="this.shortCutSearch(1)">1天</button>'
            + '<button id="threeDay" onclick="this.shortCutSearch(3)">3天</button>'
            + '<button id="sevenDay" onclick="this.shortCutSearch(5)">5天</button>'
            + '<button id="fifteenDay" onclick="this.shortCutSearch(7)">7天</button>'
            + '<button id="fifteenDay" onclick="this.shortCutSearch(30)">30天</button>'
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
            + '<button id="trend_search" onclick="this.searchHistory()">查询</button>'
            + '<button id="buttonCheckBox" onclick="trend_Util.checkboxSelected()">全选/反选</button>'
            + '<button id="buttonDelete" onclick="trend_Util.trendColumnDelete()">删除</button>'
            + '<div id="ShowTip" name="ShowTip" style=" position:absolute;display:none;width:170px;left:56px;" align="left" ></div>'
            + '</div>'
            + '<div style="float:left;margin-top:1px">'
            + '测点：<input type="text" style="width:160px" id="ShowText" onkeyup="javascript:if ( this.value!=""){ ShowTip(); } else { HideTTip(); }'
            + ' onblur="javascript:setTimeout(HideTTip,300);"'
            + ' ondblclick="javascript:ShowTip();"' + ' /> ' + '</div>'
            + '</div>' + '<canvas id="trend_container"></canvas>'
            + '</div>';

        $(tableHtml)
            .dialog(
            {
                title: '趋势图',
                id: 'trend_dialog',
                minWidth: 780,
                minHeight: 400,
                show: {
                    effect: 'drop',
                    direction: "up"
                },
                resizable: true,
                autoOpen: false,
                zIndex: 10000,
                width: document.documentElement.clientWidth * 3 / 4,
                height: document.documentElement.clientHeight * 4 / 5,
                open: function (event, ui) {
                    $("#totleDiv")
                        .dialog(
                        {
                            width: document.documentElement.clientWidth * 3 / 4,
                            height: document.documentElement.clientHeight * 4 / 5
                        });
                    this.trendDialogRealHeight = document.documentElement.clientHeight;
                    this.trendDialogRealWidth = document.documentElement.clientWidth;
                    this.setHtmlCss();
                    this.opTrend
                        .repaint(this.defaultTrendString);
                    var $dialog = $(this);
                    $(".ui-dialog-titlebar-close")
                        .replaceWith(
                        '<p class="ui-xlgwr">'
                        + '<span class="ui-icon ui-icon-minusthick">minusthick</span>'
                        + '<span class="ui-icon ui-icon-newwin">newwin</span>'
                        + '<span class="ui-icon ui-icon-extlink">extlink</span>'
                        + '<span class="ui-icon ui-icon-closethick">close</span></p>');
                    $(".ui-xlgwr>span")
                        .click(function () {
                            var spantext = $(this).text();
                            if (spantext == "extlink") {
                                if (window.screen) {// 判断浏览器是否支持window.screen判断浏览器是否支持screen
                                    this
                                        .getDialogSize();
                                    $dialog
                                        .dialog({
                                            position: [
                                                'left',
                                                'top'],
                                            width: this.trendDialogMaxWidth,
                                            height: this.trendDialogMaxHeight

                                        });

                                    this.trendDialogRealWidth = this.trendDialogMaxWidth;
                                    this.trendDialogRealHeight = this.trendDialogMaxHeight;
                                    this
                                        .setHtmlCss();
                                    this.opTrend
                                        .repaint(this.defaultTrendString);

                                } else {
                                    this
                                        .getDialogSize();
                                    $dialog
                                        .dialog({
                                            position: 'center',
                                            width: this.trendDialogMaxWidth,
                                            height: this.trendDialogMaxHeight
                                        });

                                    this.trendDialogRealWidth = this.trendDialogMaxWidth;
                                    this.trendDialogRealHeight = this.trendDialogMaxHeight;
                                    this
                                        .setHtmlCss();
                                    this.opTrend
                                        .repaint(this.defaultTrendString);

                                }

                            } else if (spantext == "minusthick") {
                                $dialog
                                    .dialog({
                                        position: [
                                            'left',
                                            'top'],
                                        width: 300,
                                        height: 50
                                    });
                            } else if (spantext == "close") {
                                $("#totleDiv").dialog('close');
                                this.dialogState = "min";

                            } else if (spantext == "newwin") {
                                this
                                    .getDialogSize();
                                $dialog
                                    .dialog({
                                        width: this.trendDialogNormalWidth,
                                        height: this.trendDialogNormalHeight

                                    });
                                $dialog.dialog({
                                    position: ['center']
                                });

                                this.trendDialogRealWidth = this.trendDialogNormalWidth;
                                this.trendDialogRealHeight = this.trendDialogNormalHeight;
                                this.setHtmlCss();
                                this.opTrend
                                    .repaint(this.defaultTrendString);

                            } else {
                                alert("请选择正确的图标,谢谢.");
                            }
                        });
                },
                close: function (event, ui) {
                    trend_Util.stopFlush();
                    trend_Util.clearDefaultString();
                },
                resize: function () {

                    this.trendDialogRealWidth = $(this)
                            .width() + 29;
                    this.trendDialogRealHeight = $(
                            this).height() + 40;
                    this.setHtmlCss();
                    this.opTrend
                        .repaint(this.defaultTrendString);
                },
                resizeStop: function () {
                    this.trendDialogRealWidth = $(this)
                            .width() + 29;
                    this.trendDialogRealHeight = $(
                            this).height() + 40;
                    // alert(this.trendDialogRealHeight);
                    this.setHtmlCss();
                    this.opTrend
                        .repaint(this.defaultTrendString);
                }

            });

        this.setHtmlCss();
        $("#totleDiv").dialog('open');
        var _canvas = document.getElementById(this.trendcontainer);
        var canvas_context = _canvas.getContext('2d');
        trend_canvas = canvas_context;
    };
    // 初始化id
    this.assignment4ID = function () {
        for (var i = 1; i <= this.trendTotleCount; i++) {
            var currentValue = this.pointsTable + "_currentValue" + i, bgColor = this.pointsTable + "_bgColor" + i, inputFlag = this.pointsTable + "_inputFlag"
                + i, trendCheckBox = this.pointsTable + "_trendCheckBox" + i;
            this.trendIdFlags.push(currentValue);
            this.trendColorFlags.push(bgColor);
            this.trendTableInputColor.push(inputFlag);
            this.trendTableCheckBoxId.push(trendCheckBox);
        }
    };
    /**
     * 获取窗口最大尺寸
     */
    this.getDialogSize = function () {
        this.trendDialogMaxHeight = document.documentElement.clientHeight - 10;
        this.trendDialogMaxWidth = document.documentElement.clientWidth - 10;
        this.trendDialogNormalHeight = document.documentElement.clientHeight * 4 / 5;
        this.trendDialogNormalWidth = document.documentElement.clientWidth * 3 / 4;
    };
    /**
     * 设置样式
     */
    this.setHtmlCss = function () {
        this.trendDialogWidth = this.trendDialogRealWidth;
        this.trendDialogHeight = this.trendDialogRealHeight;
        var row = this.defaultTrendString.length;
        var width2;
        var width1 = this.trendDialogWidth - 32;

        var tableHeight = row * 28 + 30;
        var tableHeightLimit = this.trendDialogRealHeight / 10 * 3;
        var _canvas = document.getElementById(this.trendcontainer);
        this.canvas_context = _canvas.getContext('2d');
        if (tableHeight < tableHeightLimit) {
            width2 = this.trendDialogWidth - 32;
        } else {
            tableHeight = tableHeightLimit;
            width2 = this.trendDialogWidth - 32;
        }
        var trendHeight = this.trendDialogHeight - 22;
        trend_canvas = this.canvas_context;
        this.opTrend.canvas_context = this.canvas_context;
        _canvas.width = width1;
        _canvas.height = trendHeight + 22;
        this.opTrend.canvasWidth = width1;
        this.opTrend.canvasHeight = trendHeight;
        $("#buttonDivId").css({
            width: width1
        });
        $("#buttonLeft").css({
            width: width1 * 0.4,
            float: "right"
        });
        $("#buttonRight").css({
            width: width1,
            float: "left"
        });
        $("#pointsMessage").css({
            width: width1,
            height: tableHeight
        });
        $("#pointsTable").css({
            width: width2,
            height: tableHeight,
            font: "normal 10px/1.8em Arial, Helvetica, sans-serif"
        });
    };
    /**
     * 趋势重绘
     */
    this.trendRedraw = function () {
        var colors = trend_Util.getNewTrendColorsAndRanges(this);
        if (colors && colors.length > 1) {
            for (var index = 0; index < colors.length; index++) {
                if (colors[index]) {
                    this.trendChartColors[index] = colors[index];
                }
            }
        }
        var checkboxs = $("#" + this.pointsTable + " input[name='" + this.pointsTable + "_trendCheckBox']");
        //document.getElementsByName("trendCheckBox");
        for (var i = 0; i < checkboxs.length; i++) {
            var trObj = $("#" + this.pointsTable + " #" + checkboxs[i].id)[0];
            //$("#"+this.pointsTable+ " #"+checkboxs[i].id);
            console.log("trObj:" + trObj);
            // document.getElementById(checkboxs[i].id);
            var pname = trObj.cells[1].innerHTML;
            var ranges = this.trendConfigInfoMap.get(pname);
            // 数据
            if (this.opTrend.trendArray) {
                for (var j = 0; i < this.opTrend.trendArray.length; j++) {
                    if (pname == this.opTrend.trendArray[j].pointName) {
                        this.opTrend.trendArray[j].color = this.colorMap
                            .get(pname);
                        this.opTrend.trendArray[j].topLimit = ranges[0];
                        this.opTrend.trendArray[j].lowLimit = ranges[1];
                        this.opTrend.trendArray[j].alarmTop = ranges[2];
                        this.opTrend.trendArray[j].alarmLow = ranges[3];
                        this.opTrend.trendArray[j].lineWidth = ranges[4];
                        break;
                    }
                }
            }
        }
        this.opTrend.repaint(this.defaultTrendString);
    };
    /**
     * 时间快捷键查询
     *
     * @param {}
     *            flag
     */
    this.shortCutSearch = function (flag) {
        var that = this;
        that.trend_getData4CheckboxFlag = true;
        // var time = trend_Util.dateFormat(new
        // Date(),defaultTrendGroup.formatString);
        var time = $("#trend_to").val();
        //暂不做修改
        if (trend_Util.isNull(time)) {
            time = trend_Util.dateFormat(new Date(trend_Util.getServerTime()),
                that.formatString);
        }
        switch (flag) {
            case 1:
                var oneDay = trend_Util.getParameter4Time(1, this);
                that.addTrend(that.defaultTrendString,
                    oneDay, time, false);
                $("#trend_to").attr("value", time);
                $("#trend_from").attr("value", oneDay);
                break;
            case 3:
                var threeDay = trend_Util.getParameter4Time(3, this);
                that.addTrend(that.defaultTrendString,
                    threeDay, time, false);
                $("#trend_to").attr("value", time);
                $("#trend_from").attr("value", threeDay);
                break;
            case 5:
                var fiveDay = trend_Util.getParameter4Time(5, this);
                that.addTrend(that.defaultTrendString,
                    fiveDay, time, false);
                $("#trend_to").attr("value", time);
                $("#trend_from").attr("value", fiveDay);
                break;
            case 7:
                var sevenDay = trend_Util.getParameter4Time(7, this);
                that.addTrend(that.defaultTrendString,
                    sevenDay, time, false);
                $("#trend_to").attr("value", time);
                $("#trend_from").attr("value", sevenDay);
                break;
            case 15:
                var fiftheenDay = trend_Util.getParameter4Time(15, this);
                that.addTrend(that.defaultTrendString,
                    fiftheenDay, time, false);
                $("#trend_to").attr("value", time);
                $("#trend_from").attr("value", fiftheenDay);
                break;
            case 30:
                var thirtyDay = trend_Util.getParameter4Time(30, this);
                that.addTrend(that.defaultTrendString,
                    thirtyDay, time, false);
                $("#trend_to").attr("value", time);
                $("#trend_from").attr("value", thirtyDay);
                break;
            case 24:
                var temp = 1000 * 60 * 10;
                var cur = trend_Util.dateFormat(trend_Util.getServerTime() - temp,
                    that.formatString);
                var to = trend_Util.dateFormat(trend_Util.getServerTime(),
                    that.formatString);
                that.addTrend(that.defaultTrendString, cur,
                    to, true);
                $("#trend_to").attr("value", '');
                $("#trend_from").attr("value", '');
                break;
        }
    };
    /**
     * 查询历史
     */
    this.searchHistory = function () {
        // alert("page_v2");
        this.trend_getData4CheckboxFlag = true;
        var minDate = $('#trend_from').val(), maxDate = $('#trend_to').val(), regS = new RegExp(
            "-", "gi"), from = minDate.replace(regS, "/"), to = maxDate
            .replace(regS, "/"), bd = new Date(Date.parse(from)), ed = new Date(
            Date.parse(to));
        if (bd > ed) {
            alert("开始时间必须小于结束时间！");
        } else {
            this.addTrend(this.defaultTrendString, minDate, maxDate, false);
        }
    }
};

