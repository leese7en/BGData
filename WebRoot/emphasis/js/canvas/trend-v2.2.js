
//***************************************自动提示控件结束******************************************************

var trend_canvas = null;
function opTrend() {
    this.canvas_context = null;
    this.canvasX = 0;
    this.canvasY = 0;
    this.canvasWidth = 400;
    this.canvasHeight = 300;
    this.drawLineType = 0;// 画曲线类型，（暂定0为当前时间曲线，即曲线会跟随时间平移，1为固定时间区间内画曲线）
    this.colors = ['#FF0000', '#FFFF00', '#00FF00', '#6666E1', '#00FFFF',
        '#FF00FF', '#FF007B', '#804000', '#FFAFAF', '#99CC00', '#FFC800',
        '#CCFFFF', '#695D61', '#00EBA3', '#8540FF', '#FF9900'],
        this.from = null;
    this.to = null;
    this.currentFrom = null;
    this.current = null;
    this.dotcount = 0;
    this.interval = 1000;// 更新频率
    this.dateType = 4;// 日期格式化类型，具体内容参考画图工具设置
    this.playing = true;// 曲线是否动态播放
    this.trendObjs = new trendUtilMap();// 趋势组
    this.trendArray = new Array();

    this.margin_top = 10;// 趋势内部面板与边框上下间隔
    this.margin_bottom = 40;// 趋势内部面板与边框下间隔
    this.margin_padding = 40;// 趋势内部面板与边框左右的间隔
    this.margin_lineStyle = 0;// 外边框样式
    this.margin_fillColor = 'white';// 外边框前景色
    this.margin_fillBackColor = 'white';// 外边框后景色
    this.margin_lineWidth = 1;// 外边框线宽度
    this.margin_lineColor = 'black';// 外边框线颜色
    this.margin_type = 1;// 背景框填充样式
    this.margin_fillStyleFirst = 0;
    this.margin_fillStyleSecond = 0;
    this.margin_fillStyleThird = 0;

    this.widthRatioA = 15;
    this.widthRatioB = 16;// 趋势区域所占整体宽度为widthRatioA/widthRatioB，上下限所占（B-A）/B

    this.innerBorder_lineWidth = 1;// 内边框线宽
    this.innerBorder_lineStyle = 0;// 内边框样式
    this.innerBorder_color = 'black';// 内边框颜色

    this.xaxisHeight = 40;// x轴刻度高度
    this.xAxisScaleCount = 5;// 刻度个数
    this.timeFontColor = 'black';// 时间字体颜色
    this.timeFontSize = 12;// 时间刻度字体

    this.trend_backLineCount = 10;// 背景线条数
    this.trend_bgLineColor = 'black';// 背景线颜色
    this.trend_bgLineWidth = 0.5;// 背景线宽
    this.trend_bgLineStyle = 3;// 背景线样式
    this.trend_bgColor = 'white';// 趋势面板背景色

    this.isComponents = true;
    this.promptMsg = "数据正在加载中，请稍侯……";

    this.rightMessageBackgroundColor = 'white';// 上下限信息背景色

    // 添加趋势
    this.addTrendMap = function (name, lines) {// 添加趋势
        this.trendObjs.put(name, lines);
    };
    this.addTrend = function (line) {
        this.trendArray.push(line);
    };
    this.repaint = function (name) {// 重绘
        this.from = this.getTimeFromString(this.from);
        this.to = this.getTimeFromString(this.to);
        // this.from = new Date(this.from);
        // this.to = new Date(this.to);
        this.draw();
        this.drawTrend(name);
        this.update(name);
    };
    /**
     * 绘制画布
     */
    this.draw = function () {
        // 清除整个画布
        this.canvas_context.clearRect(this.canvasX, this.canvasY,
            this.canvasWidth + this.margin_padding * 2,
            this.canvasHeight + this.margin_top
            + this.margin_bottom);
        // 背景
        this.borderRect.draw(this);
        // 绘制趋势背景区域
        this.trendRect.draw(this);
        // 绘制背景线
        this.trendBackLine.draw(this);
        // 绘制x轴刻度及时间
        this.canvasXAxis.draw(this);
        this.rightMessage.draw(this);
    };

    this.drawTrend = function (name) {
        // 图形趋势
        var temp = 0, objs = this.trendObjs.get(name);
        if (objs) {
            for (var j = 0; j < objs.length; j++) {
                objs[j].draw();
                temp += (this.canvasHeight) / 20;
                objs[j].drawRightMessage(temp);
            }
        }
        // 组件趋势
        if (!this.isComponents) {
            if (this.trendArray.length > 0) {
                objs = this.trendArray;
                for (var j = 0; j < objs.length; j++) {
                    objs[j].draw();
                    temp += (this.canvasHeight) / 20;
                    objs[j].drawRightMessage(temp);
                }
            }
            if (this.trendArray.length > 0) {
                objs = this.trendArray;
                for (var j = 0; j < objs.length; j++) {
                    objs[j].drawAlarmLine();
                }
            }
            this.drawPrompt(this.promptMsg);
            this.promptMsg = "";
        }
    };

    /**
     * 更新变更坐标
     */
    this.update = function (name) {
        if (this.playing) {
            var objs = this.trendObjs.get(name);
            if (objs) {
                for (var j = 0; j < objs.length; j++) {
                    objs[j].update();
                }
            }
            if (this.trendArray.length > 0 && !this.isComponents) {
                objs = this.trendArray;
                for (var j = 0; j < objs.length; j++) {
                    objs[j].update();
                }
            }
        }
    };
    /**
     * 数据加载信息
     *
     * @param {}
     *            str
     */
    this.drawPrompt = function (str) {
        this.canvas_context.fillStyle = "red";
        this.canvas_context.font = "15px 宋体";
        this.canvas_context.fillText(str, this.canvasX + this.canvasWidth
            / this.widthRatioB * this.widthRatioA / 2,
            this.canvasY + this.canvasHeight / 2);
    };
    /**
     * 更新X轴坐标时间
     */
    this.updateTime = function () {
        this.from = new Date(this.from.getTime() + this.interval);
        this.to = new Date(this.to.getTime() + this.interval);
    };
    this.init = function () {
        this.from = this.getTimeFromString(this.from);
        this.to = this.getTimeFromString(this.to);
        var play = this.setIntervalFun(this.interval);
    };
    this.clear = function () {
        this.trendObjs = new trendUtilMap();
        this.trendArray = new Array();
    };
    this.setIntervalFun = function (interval) {
        var play = setInterval(function () {
            this.draw();
            this.update();
        }, interval);
        return play;
    };
    /**
     * 字符串转时间
     *
     * @param {}
     *            target
     * @return {}
     */
    this.getTimeFromString = function (target) {
        var str = target.toString();
        str = str.replace(/-/g, "/");
        var oDate1 = new Date(str);
        return oDate1;
    };
    /**
     * 日期格式化
     *
     * @param {}
     *            _format_index
     * @return {String}
     */
    this.getDateFormat = function (_format_index) {
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
    };
    /**
     * 趋势对象
     *
     * @param data
     * @returns
     */
    this.trendObj = function () {
        this.opTrend = new opTrend();
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
            var y = this.opTrend.canvasY + this.opTrend.canvasHeight + this.opTrend.margin_top;
            this.opTrend.canvas_context.beginPath();
            this.opTrend.canvas_context.strokeStyle = this.color;
            this.opTrend.canvas_context.lineWidth = this.lineWidth;
            if (this.data != null && this.data.length > 1 && !this.hide) {
                this.opTrend.repaintLine(this.data, y, this.color, this.lineWidth,
                    this.type, this.topLimit, this.lowLimit);
            } else if (this.trendData != null) {
                this.data = this.opTrend.drawLineAndGenerateData(this.trendData, y,
                    this.color, this.lineWidth, this.type, this.topLimit,
                    this.lowLimit, this.hide);
                this.trendData = null;
            }
        }
        // 绘制限高限低线
        this.drawAlarmLine = function () {
            var y = this.opTrend.canvasY + this.opTrend.canvasHeight
                + this.opTrend.margin_top;
            var x1 = this.opTrend.canvasX + this.opTrend.margin_padding, x2 = this.opTrend.canvasX
                + this.opTrend.canvasWidth
                * this.opTrend.widthRatioA
                / this.opTrend.widthRatioB + this.opTrend.margin_padding;
            var height = 16, tempH = 4, tempW = 2;
            if (this.alarmTop != null && this.alarmTop != ""
                && !this.hide) {
                var width = this.opTrend.canvas_context.measureText(this.alarmTop).width * 1.2;

                var yy = this.opTrend.getCanvasY(this.alarmTop,
                    this.topLimit, this.lowLimit);
                yy = this.opTrend.drawLineLimit(yy, y);
                trend_funStyle.drawDashedLine(x1 + width, yy, x2
                    - width, yy, 2, this.lineWidth, this.color, this.opTrend.canvas_context);

                this.opTrend.canvas_context.globalAlpha = 0.6;
                this.opTrend.canvas_context.fillStyle = this.color;
                this.opTrend.canvas_context.fillRect(x1, yy - height / 2, width,
                    height);
                this.opTrend.canvas_context.fillRect(x2 - width, yy - height / 2,
                    width, height);
                this.opTrend.canvas_context.globalAlpha = 1;
                this.opTrend.canvas_context.fillStyle = this.color;
                this.opTrend.canvas_context.font = "12px 宋体";
                this.opTrend.canvas_context.fillText(this.alarmTop, x1 + tempW, yy
                    + tempH);
                this.opTrend.canvas_context.fillText(this.alarmTop,
                    x2 - width + tempW, yy + tempH);
            }
            if (this.alarmLow != null && this.alarmLow != ""
                && !this.hide) {
                var width = this.opTrend.canvas_context.measureText(this.alarmLow).width * 1.2;
                var yy = this.opTrend.getCanvasY(this.alarmLow,
                    this.topLimit, this.lowLimit);
                yy = this.opTrend.drawLineLimit(yy, y);
                trend_funStyle.drawDashedLine(x1 + width, yy, x2
                    - width, yy, 2, this.lineWidth, this.color, this.opTrend.canvas_context);
                this.opTrend.canvas_context.globalAlpha = 0.6;
                this.opTrend.canvas_context.fillStyle = this.color;
                this.opTrend.canvas_context.fillRect(x1, yy - height / 2, width,
                    height);
                this.opTrend.canvas_context.fillRect(x2 - width, yy - height / 2,
                    width, height);
                this.opTrend.canvas_context.globalAlpha = 1;
                this.opTrend.canvas_context.fillStyle = this.color;
                this.opTrend.canvas_context.font = "12px 宋体";
                this.opTrend.canvas_context.fillText(this.alarmLow, x1 + tempW, yy
                    + tempH);
                this.opTrend.canvas_context.fillText(this.alarmLow,
                    x2 - width + tempW, yy + tempH);
            }
        },
            // 绘制右边上下限图形及文字
            this.drawRightMessage = function (temp) {
                var x = this.opTrend.canvasX + this.opTrend.canvasWidth
                    + this.opTrend.margin_padding - this.opTrend.canvasWidth
                    / this.opTrend.widthRatioB;
                y = this.opTrend.canvasY + this.opTrend.margin_top,
                    width = this.opTrend.canvasWidth / this.opTrend.widthRatioB,
                    height = this.opTrend.canvasHeight, side = height / 35,
                    x1 = x + width / this.opTrend.widthRatioB,
                    y1 = y + temp, y2 = y + height - temp;
                this.opTrend.canvas_context.fillStyle = this.color;
                this.opTrend.canvas_context.fillRect(x1, y1, side, side);
                this.opTrend.canvas_context.fillRect(x1, y2, side, side);
                this.opTrend.canvas_context.font = opTrend.timeFontSize + "px Verdana";
                var t = Math.round(this.topLimit), l = Math
                    .round(this.lowLimit);
                this.opTrend.canvas_context.fillText(t, x1 + side * 1.5, y1 + side);
                this.opTrend.canvas_context.fillText(l, x1 + side * 1.5, y2 + side);

            },
            // 每次间隔更新坐标
            this.update = function () {
                var timeWidth = this.opTrend.to.getTime()
                    - this.opTrend.from.getTime();
                if (this.data.length > 10) {
                    if (this.data[0][0] + timeWidth < this.opTrend.from
                            .getTime()) {
                        this.data.remove(0);
                    }
                }
            }

        // 实时添加动态数据
        this.addPoint = function (arr) {
            this.data.push(arr);
        };
    };
    /**
     * 背景框
     */
    this.borderRect = {
        draw: function (opTrend) {
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
            trend_funStyle.drawRect(dashedRect, opTrend.canvas_context);
        }
    };
    /**
     * 背景线
     */
    this.trendBackLine = {
        draw: function (opTrend) {
            var x = opTrend.canvasX + opTrend.margin_padding, y = opTrend.canvasY
                + opTrend.margin_top, targetHeight = opTrend.canvasHeight, temp = targetHeight
                / opTrend.trend_backLineCount;
            for (var i = 0; i < opTrend.trend_backLineCount - 1; i++) {
                trend_funStyle.drawDashedLine(x, temp + y, opTrend.canvasWidth
                    + x - opTrend.canvasWidth / opTrend.widthRatioB, temp
                    + y, opTrend.trend_bgLineStyle,
                    opTrend.trend_bgLineWidth, opTrend.trend_bgLineColor, opTrend.canvas_context);
                temp += targetHeight / opTrend.trend_backLineCount;
            }
        }
    };
    /**
     * 趋势画布
     */
    this.trendRect = {
        draw: function (opTrend) {
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
            trend_funStyle.drawRect(dashedRect, opTrend.canvas_context);
        }
    };
    /**
     * x轴刻度对象
     */
    this.canvasXAxis = {
        time: 0,
        scale: {
            lineHeight: 5,

            draw: function (opTrend) {
                try {
                    var y = opTrend.canvasY + opTrend.canvasHeight
                        + opTrend.margin_top, temp = (opTrend.canvasWidth - (opTrend.canvasWidth / opTrend.widthRatioB))
                        / opTrend.xAxisScaleCount, xTemp = 0;
                    opTrend.canvas_context.fillStyle = opTrend.timeFontColor;
                    for (var i = 0; i < opTrend.xAxisScaleCount + 1; i++) {
                        var _x = xTemp + opTrend.canvasX
                            + opTrend.margin_padding;
                        if (i != 0 && i < opTrend.xAxisScaleCount) {
                            trend_funStyle.drawDashedLine(_x, y, _x + 0.1,
                                (opTrend.canvasY + opTrend.margin_top),
                                opTrend.trend_bgLineStyle,
                                opTrend.trend_bgLineWidth,
                                opTrend.trend_bgLineColor,
                                opTrend.canvas_context);
                        }

                        opTrend.canvas_context.font = opTrend.timeFontSize + "px Verdana";
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
                        opTrend.canvas_context.fillText(hms, _x, y + this.lineHeight * 2);
                        opTrend.canvas_context.fillText(ymd, _x, y + this.lineHeight * 4);
                        xTemp += temp;
                    }
                    opTrend.canvas_context.stroke();
                } catch (e) {
                    console.log(e);
                }
            }

        },
        // 绘制背景框
        draw: function (opTrend) {
            this.scale.draw(opTrend);
        }
    };
    /**
     * 画板上下限区域
     *
     * @type
     */
    this.rightMessage = {
        draw: function (opTrend) {
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
            trend_funStyle.drawRect(dashedRect, opTrend.canvas_context);
        }
    };
    /**
     * 获取画布x坐标
     *
     * @param target
     * @returns {Number}
     */
    this.getCanvasX = function (target) {
        var result = null, interval = target - this.from.getTime();
        result = this.getXProportion() * interval;
        return result;
    };
    /**
     * 获取画布y坐标
     *
     * @param target
     * @param top
     * @param low
     * @returns {Number}
     */
    this.getCanvasY = function (target, top, low) {
        var interval = target - low, res = this.canvasHeight
            + this.canvasY + this.margin_top
            - this.getYProportion(top, low) * interval;
        return res;
    };
    /**
     * 获取X轴比例
     *
     * @returns {Number}
     */
    this.getXProportion = function () {
        var timeWidth = this.to.getTime() - this.from.getTime();
        return (this.canvasWidth - this.canvasWidth / this.widthRatioB)
            / timeWidth;
    };
    /**
     * 获取Y轴比例
     *
     * @returns {Number}
     */
    this.getYProportion = function (top, low) {
        var valueHeight = top - low;
        return (this.canvasHeight) / valueHeight;
    };
    /**
     * 根据坐标获取时间
     *
     * @param xx
     * @returns
     */
    this.getTimeFromX = function (xx) {
        var result = this.from.getTime()
            + xx
            * (this.to.getTime() - this.from.getTime())
            / (this.canvasWidth - this.canvasWidth
            / this.widthRatioB);
        return result;
    };
    /**
     * 根据时间获取游标值
     *
     * @param {}
     *            time
     * @return {}
     */
    this.getValueFromTime = function (time) {
        var arr = new Array(), objs = this.trendArray;
        value = null;
        for (var f = 0; f < objs.length; f++) {
            var data = objs[f].data;
            if (!data) {
                arr.push("N/A");
            } else {
                var index = this.getDataIndexFromTime(data, time);// 获取数据集中和时间最近的一点
                value = this.calcYaxisValue(index, objs[f].type, data, time);
                arr.push(value);
            }
        }
        return arr;
    };
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
    this.calcYaxisValue = function (index, type, data, time) {
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
                    return yy.toFixed(2);
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
    };
    /**
     * 遍历数据组取时间点相近的数据的位置
     *
     * @param data
     * @param time
     * @returns {Array}
     */
    this.getDataIndexFromTime = function (data, time) {
        var count = 0;
        if (data) {
            for (var d = 0; d < data.length; d++) {
                var tm = Math.round(data[d][0]), temp = time - tm;
                if (temp <= 500 && temp >= -500) {
                    count = d;
                    break;
                } else if (tm > time) {
                    count = d - 1;
                    break;
                }
            }
        }
        return count;
    };
    /**
     * 初次画曲线并且生成x,y数组
     *
     * @param data
     * @param top
     * @param low
     * @param y
     * @returns {Array}
     */
    this.drawLineAndGenerateData = function (data, y, color, lineWidth, type, top,
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
            this.repaintLine(newData, y, color, lineWidth, type, top, low);
        }
        return newData;
    };
    /**
     * 曲线坐标变更后重绘曲线
     *
     * @param data
     * @param y
     * @param color
     * @param lineWidth
     */
    this.repaintLine = function (data, y, color, lineWidth, type, top, low) {
        if (type == 'DX') {
            data = this.getDXDataFromOldData(data);
        }

        this.canvas_context.lineWidth = lineWidth;
        this.canvas_context.strokeStyle = color;
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var xx = this.getCanvasX(data[i][0]) + this.canvasX
                    + this.margin_padding, yy = data[i][1], rightX = this.canvasX
                    + this.canvasWidth
                    * this.widthRatioA
                    / this.widthRatioB + this.margin_padding;
                if (yy == null && i + 1 < data.length) {
                    var x1 = this.getCanvasX(data[i + 1][0])
                        + this.canvasX + this.margin_padding;
                    if (x1 > rightX)
                        x1 = rightX;
                    var y1 = this.getCanvasY(data[i + 1][1], top, low);
                    y1 = this.drawLineLimit(y1, y);
                    this.canvas_context.moveTo(x1, y1);
                } else {
                    if (yy != null) {
                        yy = this.getCanvasY(yy, top, low);
                        yy = this.drawLineLimit(yy, y);
                        if (xx > rightX)
                            xx = rightX;
                        this.canvas_context.lineTo(xx, yy);
                    }
                }
            }
            this.canvas_context.stroke();
        }
    };
    /**
     * 数据转换为DX曲线数据
     *
     * @param data
     * @returns {Array}
     */
    this.getDXDataFromOldData = function (data) {
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
                } else {
                    newData.push(data[i]);
                }
            }
        }
        return newData;
    };
    /**
     * 修正曲线超出上下屏时坐标
     *
     * @param n
     * @param limit
     * @returns
     */
    this.drawLineLimit = function (n, limit) {
        if (n >= limit) {
            n = limit;
        } else if (n < this.canvasY + this.margin_top) {
            n = this.canvasY + this.margin_top;
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
    drawRect: function (obj, canvas_context) {
        var grd = null;
        switch (obj.fillType) {
            case 0:
                canvas_context.fillStyle = "white";
                trend_funStyle.drawBorderRect(obj, canvas_context);
                break;
            case 1:
                if (obj.fcolor == null || obj.fcolor == undefined)
                    obj.fcolor = "white";
                canvas_context.fillStyle = obj.bcolor;
                trend_funStyle.drawBorderRect(obj, canvas_context);
                break;
            case 2:
                canvas_context.fillStyle = obj.bcolor;
                trend_funStyle.drawBorderRect(obj, canvas_context);
                trend_funStyle.drawBgStyle(obj, canvas_context);
                break;
            case 3:
                grd = trend_funStyle.drawBgColorChange(obj, canvas_context);
                canvas_context.fillStyle = grd;
                trend_funStyle.drawBorderRect(obj, canvas_context);
                break;
        }
    },
    /**
     * 背景色渐变
     */
    drawBgColorChange: function (obj, canvas_context) {
        var grd = null;
        switch (obj.secondParam) {
            case 0:
                grd = canvas_context.createLinearGradient(0, obj.y, 0, obj.height
                    + obj.y);
                break;
            case 1:
                grd = canvas_context.createLinearGradient(obj.x, 0,
                    obj.width + obj.x, 0);
                break;
            case 2:
                grd = canvas_context.createLinearGradient(obj.x, obj.y, obj.width
                    + obj.x, obj.height + obj.y);
                break;
            case 3:
                grd = canvas_context.createLinearGradient(obj.x, obj.height + obj.y,
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
    drawBgStyle: function (obj, canvas_context) {
        var a = 6, b = 8;
        switch (obj.firstParam) {
            case 0:// 横线
                trend_funStyle.drawLine4Lateral(a, obj, canvas_context);
                break;
            case 1:// 纵线
                trend_funStyle.drawLine4Longitudinal(a, obj, canvas_context);
                break;
            case 2:// 横纵交叉线
                trend_funStyle.drawLine4Lateral(a, obj, canvas_context);
                trend_funStyle.drawLine4Longitudinal(a, obj, canvas_context);
                break;
            case 3:// 横线
                trend_funStyle.drawLine4Lateral(a / 2, obj, canvas_context);
                break;
            case 4:// 纵线
                trend_funStyle.drawLine4Longitudinal(a / 2, obj, canvas_context);
                break;
            case 5:// 纵横交叉线
                trend_funStyle.drawLine4Lateral(a / 2, obj, canvas_context);
                trend_funStyle.drawLine4Longitudinal(a / 2, obj, canvas_context);
                break;
            case 6:// k = 1
                trend_funStyle.drawLine4beveled(b, obj, canvas_context);
                break;
            case 7:// k = -1
                trend_funStyle._drawLine4beveled(b, obj, canvas_context);
                break;
            case 8:// 交叉线
                trend_funStyle.drawLine4beveled(b, obj, canvas_context);
                trend_funStyle._drawLine4beveled(b, obj, canvas_context);
                break;
            case 9:// k = 1
                trend_funStyle.drawLine4beveled(b / 2, obj, canvas_context);
                break;
            case 10:// k = -1
                trend_funStyle._drawLine4beveled(b / 2, obj, canvas_context);
                break;
            case 11:// 交叉线
                trend_funStyle.drawLine4beveled(b / 2, obj, canvas_context);
                trend_funStyle._drawLine4beveled(b / 2, obj, canvas_context);
                break;
            case 12:// 波浪线
                trend_funStyle.drawWavesLine(obj);
                break;
            case 13:// 砖块线
                trend_funStyle.drawBrickBG(obj);
                break;
            case 14:// 横线虚线
                trend_funStyle.drawDashedLine4BGLateral(a, obj, canvas_context);
                break;
            case 15:// 纵向虚线
                trend_funStyle.drawDashedLine4BGLongitudinal(a, obj, canvas_context);
                break;
        }
    },

    /**
     * 画纵线
     *
     * @param temp
     * @param obj
     */
    drawLine4Longitudinal: function (temp, obj, canvas_context) {
        var count = temp;
        while ((obj.x + count) < obj.width + obj.x) {
            trend_funStyle.drawDashedLine(obj.x + count, obj.y, obj.x + count,
                obj.y + obj.height, 0, 1, obj.fcolor, canvas_context);
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
    drawLine4Lateral: function (temp, obj, canvas_context) {
        var count = temp;
        while ((obj.y + count) < obj.height + obj.y) {
            trend_funStyle.drawDashedLine(obj.x, obj.y + count, obj.x
                + obj.width, obj.y + count, 0, 1, obj.fcolor, canvas_context);
            count += temp;
        }
    },
    /**
     * 画斜线 k = -1 TODO width<height 情况未处理
     *
     * @param temp
     * @param obj
     */
    drawLine4beveled: function (temp, obj, canvas_context) {
        var count = temp;
        var flag = 0;
        while ((obj.y + count) <= obj.height + obj.y) {
            trend_funStyle.drawDashedLine(obj.x, obj.y + count, obj.x + count,
                obj.y, 0, 1, obj.fcolor, canvas_context);
            count += temp;
        }
        ;
        flag = count - temp;
        count = temp;
        while (obj.x + flag + count < obj.x + obj.width) {
            trend_funStyle.drawDashedLine(obj.x + count, obj.y + obj.height,
                obj.x + flag + count, obj.y, 0, 1, obj.fcolor, canvas_context);
            count += temp;
        }
        ;

        count = temp;
        while (obj.y + obj.height - count > obj.y) {
            trend_funStyle.drawDashedLine(obj.x + obj.width - count, obj.y
                + obj.height, obj.x + obj.width,
                obj.y + obj.height - count, 0, 1, obj.fcolor, canvas_context);
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
    _drawLine4beveled: function (temp, obj, canvas_context) {
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
                + flag, obj.y + obj.height, 0, 1, obj.fcolor, canvas_context);
            count += temp;
        }
        ;
        count = temp;
        while (obj.y + obj.height - count > obj.y) {
            trend_funStyle.drawDashedLine(obj.x + obj.width - count, obj.y,
                obj.x + obj.width, obj.y + count, 0, 1, obj.fcolor, canvas_context);
            count += temp;
        }
        ;
    },
    /**
     * 画矩形边框（虚线样式）
     *
     * @param obj
     */
    drawBorderRect: function (obj, canvas_context) {
        canvas_context.fillRect(obj.x, obj.y, obj.width, obj.height);
        trend_funStyle.drawDashedLine(obj.x, obj.y, obj.x, obj.y + obj.height,
            obj.lineStyle, obj.lineWidth, obj.color, canvas_context);
        trend_funStyle.drawDashedLine(obj.x + obj.width, obj.y, obj.x
            + obj.width, obj.y + obj.height, obj.lineStyle, obj.lineWidth,
            obj.color, canvas_context);
        trend_funStyle.drawDashedLine(obj.x, obj.y, obj.x + obj.width, obj.y,
            obj.lineStyle, obj.lineWidth, obj.color, canvas_context);
        trend_funStyle.drawDashedLine(obj.x, obj.y + obj.height, obj.x
            + obj.width, obj.y + obj.height, obj.lineStyle, obj.lineWidth,
            obj.color, canvas_context);
    },
    /**
     * 背景横向虚线
     */
    drawDashedLine4BGLateral: function (temp, obj, canvas_context) {
        var count = temp;
        while ((obj.y + count) < obj.height + obj.y) {
            trend_funStyle.drawDashedLine(obj.x, obj.y + count, obj.x
                + obj.width, obj.y + count, 1, 1, obj.fcolor, canvas_context);
            count += temp;
            var yy = obj.y + count;
            if (yy >= obj.height + obj.y) {
                yy = obj.height + obj.y;
            }
            ;
            trend_funStyle.drawDashedLine(obj.x + temp, yy, obj.x + obj.width,
                yy, 1, 1, obj.fcolor, canvas_context);
            count += temp;
        }
        ;
    },
    /**
     * 背景纵向虚线
     *
     * @param temp,obj
     */
    drawDashedLine4BGLongitudinal: function (temp, obj, canvas_context) {
        var count = temp;
        while ((obj.x + count) < obj.width + obj.x) {
            trend_funStyle.drawDashedLine(obj.x + count, obj.y, obj.x + count,
                obj.y + obj.height, 1, 1, obj.fcolor, canvas_context);
            count += temp;
            var xx = obj.x + count;
            if (xx >= obj.width + obj.x) {
                xx = obj.width + obj.x;
            }
            ;
            trend_funStyle.drawDashedLine(xx, obj.y + temp, xx, obj.y
                + obj.height, 1, 1, obj.fcolor, canvas_context);
            count += temp;
        }
        ;
    },
    /**
     * 画波浪线
     */
    drawWavesLine: function (obj, canvas_context) {
        var tempX = 0, tempY = 0, temp = 5;
        while (tempY < obj.height - temp) {
            while (tempX < obj.width) {
                trend_funStyle.drawDashedLine(obj.x + tempX, obj.y + tempY,
                    obj.x + tempX + temp, obj.y + tempY + temp, 0, 1,
                    obj.fcolor, canvas_context);
                trend_funStyle.drawDashedLine(obj.x + tempX + temp, obj.y
                    + tempY + temp, obj.x + tempX + 2 * temp,
                    obj.y + tempY, 0, 1, obj.fcolor, canvas_context);
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
    drawBrickBG: function (obj, canvas_context) {
        var temp = 7, tempX = 0, tempY = 0;
        trend_funStyle.drawLine4Lateral(temp, obj);
        while (tempY < obj.height - temp) {
            while (tempX + temp < obj.width) {
                trend_funStyle.drawDashedLine(obj.x + tempX, obj.y + tempY,
                    obj.x + tempX, obj.y + tempY + temp, 0, 1, obj.fcolor, canvas_context);
                trend_funStyle.drawDashedLine(obj.x + tempX + temp, obj.y
                    + tempY + temp, obj.x + tempX + temp, obj.y + tempY + 2
                    * temp, 0, 1, obj.fcolor, canvas_context);
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
    drawDashedLine: function (x, y, x2, y2, type, lw, color, canvas_context) {
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
        canvas_context.lineWidth = lw;
        canvas_context.lineCap = flag;
        canvas_context.beginPath();
        canvas_context.strokeStyle = color;
        canvas_context.dashedLine(x, y, x2, y2, dashGapArray);
        canvas_context.stroke();
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
