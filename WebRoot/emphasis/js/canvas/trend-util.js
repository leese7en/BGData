var trend_Util = {
        colorHex: function (target) {
            var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
            var that = target;
            if (/^(rgba|RGBA)/.test(that)) {
                var aColor = that.replace(/(?:\(|\)|rgba|RGBA)*/g, "").split(",");
                var strHex = "#";
                for (var i = 0; i < aColor.length - 1; i++) {
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
                    for (var i = 0; i < aNum.length; i += 1) {
                        numHex += (aNum[i] + aNum[i]);
                    }
                    return numHex;
                }
            } else {
                return that;
            }
        },
        trendRedraw: function (objTrendGroup) {
            var colors = trend_Util.getNewTrendColorsAndRanges(objTrendGroup);
            if (colors && colors.length > 1) {
                for (var index = 0; index < colors.length; index++) {
                    if (colors[index]) {
                        objTrendGroup.trendChartColors[index] = colors[index];
                    }
                }
            }
            var checkboxs = document.getElementsByName(objTrendGroup.pointsTable + "_trendCheckBox");
            for (var i = 0; i < checkboxs.length; i++) {
                var trObj = document.getElementById(checkboxs[i].id);
                var pname = trObj.cells[1].innerHTML;
                var ranges = objTrendGroup.trendConfigInfoMap.get(pname);
                // 数据
                if (objTrendGroup.opTrend.trendArray) {
                    for (var j = 0; i < objTrendGroup.opTrend.trendArray.length; j++) {
                        if (pname == objTrendGroup.opTrend.trendArray[j].pointName) {
                            objTrendGroup.opTrend.trendArray[j].color = objTrendGroup.colorMap
                                .get(pname);
                            objTrendGroup.opTrend.trendArray[j].topLimit = ranges[0];
                            objTrendGroup.opTrend.trendArray[j].lowLimit = ranges[1];
                            objTrendGroup.opTrend.trendArray[j].alarmTop = ranges[2];
                            objTrendGroup.opTrend.trendArray[j].alarmLow = ranges[3];
                            objTrendGroup.opTrend.trendArray[j].lineWidth = ranges[4];
                            break;
                        }
                    }
                }
            }
            objTrendGroup.opTrend.repaint(objTrendGroup.defaultTrendString);
        },
        isNull: function (obj) {
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
        dateFormat: function (time, format) {
            var t = new Date(time), tf = function (i) {
                return (i < 10 ? '0' : '') + i
            }
            return format.replace(/yyyy|yy|MM|dd|HH|mm|ss/g, function (a) {
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
        initProperties: function (from, to, width, height, objTrendGroup) {
            if (!this.isNull(width) && !this.isNull(height)) {
                objTrendGroup.trendDialogWidth = width;
                objTrendGroup.trendDialogHeight = height;
            } else {
                var h = document.documentElement.clientHeight;
                var w = document.documentElement.clientWidth;
                if (objTrendGroup.isDialog) {
                    h = h * 4 / 5;
                    w = w * 3 / 4;
                }
                objTrendGroup.trendDialogWidth = w;
                objTrendGroup.trendDialogHeight = h;
            }
        },
        /**
         * 清空点组和刷新标记
         */
        clearDefaultString: function (obj, objTrendGroup) {
            // $("#pointsTable").empty();
            objTrendGroup.defaultTrendString = new Array();
            objTrendGroup.trendConfigInfoMap = new trendUtilMap();
            objTrendGroup.colorMap = new trendUtilMap();
            objTrendGroup.opTrend.trendArray = new Array();
        },
        /**
         * 获取对象在页面的位置
         *
         * @param obj
         * @returns {Array}
         */
        getPosition: function (obj) {
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
        getCanvasPos: function (e, objTrendGroup) {
            var canvas = document.getElementById(objTrendGroup.trendcontainer)
            var arrayXY = trend_Util.getPosition(canvas), pointX = e.pageX
                - arrayXY[0], pointY = canvas.height / 2 - 80;
            var posX = e.pageX - arrayXY[0];
            if ((pointX + 175) > canvas.width) {
                posX = canvas.width - 175;
            }
            return [pointX, pointY, posX];
        },
        /**
         * 绘制游标值及游标线
         *
         * @param {}
         *            xys
         */
        drawVernier: function (xys, objTrendGroup) {
            objTrendGroup.opTrend.repaint(objTrendGroup.defaultTrendString);
            // 数据
            var objs = objTrendGroup.opTrend.trendArray, pointX = xys[0], pointY = xys[1], posX = xys[2];
            objTrendGroup.canvas_context.globalAlpha = 0.8;
            objTrendGroup.canvas_context.fillStyle = "#aea7a7";
            objTrendGroup.canvas_context.fillRect(posX, pointY, 175, 15 + 20 * objs.length);
            objTrendGroup.canvas_context.globalAlpha = 1;

            objTrendGroup.canvas_context.beginPath();
            objTrendGroup.canvas_context.strokeStyle = objTrendGroup.opTrend.trend_bgLineColor;
            objTrendGroup.canvas_context.lineWidth = 1;
            objTrendGroup.canvas_context.moveTo(pointX + 0.8, 0 + 0.8);
            objTrendGroup.canvas_context.lineTo(pointX + 0.8, objTrendGroup.opTrend.canvasHeight + 0.8);
            objTrendGroup.canvas_context.stroke();
            var time = new Date(objTrendGroup.opTrend.getTimeFromX(pointX + 0.8)).getTime(), ymd = trend_Util
                .dateFormat(new Date(time), objTrendGroup.formatString);
            objTrendGroup.canvas_context.save();
            objTrendGroup.canvas_context.fillStyle = "black";
            objTrendGroup.canvas_context.font = "bold 15px 宋体";
            objTrendGroup.canvas_context.fillText(ymd, posX, pointY + 15);
            var arr = objTrendGroup.opTrend.getValueFromTime(time), tempHeight = 30;
            for (var f = 0; f < objs.length; f++) {
                objTrendGroup.canvas_context.fillStyle = objs[f].color;
                objTrendGroup.canvas_context.fillText(arr[f], posX + 10, pointY + tempHeight + 20
                    * (f));
            }
            objTrendGroup.canvas_context.restore();
        },

        /**
         * 为canvas 设置click 事件
         * @param objTrendGroup
         */
        setCanvasClick: function (objTrendGroup) {
            var rightX = objTrendGroup.opTrend.canvasX + objTrendGroup.opTrend.canvasWidth
                * objTrendGroup.opTrend.widthRatioA / objTrendGroup.opTrend.widthRatioB
                + objTrendGroup.opTrend.margin_padding;
            $("#" + objTrendGroup.trendcontainer).bind({
                click: function (e) {
                    var xys = trend_Util.getCanvasPos(e, objTrendGroup);
                    if (parseInt(xys[0]) <= parseInt(rightX)) {
                        trend_Util.drawVernier(xys, objTrendGroup);
                    }
                }
            });
        },
        /**
         * 为整体canvas添加事件
         */
        setCanvasFun: function (objTrendGroup) {
            var clickBeginX = 0, downflag = false, moveflag = false, from = null, to = null;
            var rightX = objTrendGroup.opTrend.canvasX + objTrendGroup.opTrend.canvasWidth
                * objTrendGroup.opTrend.widthRatioA / objTrendGroup.opTrend.widthRatioB
                + objTrendGroup.opTrend.margin_padding;
            $("#" + objTrendGroup.trendcontainer)
                .bind(
                {
                    mousedown: function (e) {
                        downflag = true;
                        var xys = trend_Util.getCanvasPos(e, objTrendGroup), pointX = xys[0];
                        clickBeginX = pointX;
                        from = new Date(objTrendGroup.opTrend.getTimeFromX(pointX));
                    },
                    mouseup: function (e) {
                        downflag = false;
                        var xys = trend_Util.getCanvasPos(e, objTrendGroup);
                        if (parseInt(xys[0]) >= parseInt(rightX)) {
                            xys[0] = parseInt(rightX);
                        }
                        objTrendGroup.mouseLeaveXY = xys;
                        if (moveflag) {
                            objTrendGroup.opTrend.from = from;
                            objTrendGroup.opTrend.to = to;
                            from = trend_Util.dateFormat(from,
                                objTrendGroup.formatString);
                            to = trend_Util.dateFormat(to,
                                objTrendGroup.formatString);
                            $("#trend_to").attr("value", to);
                            $("#trend_from").attr("value", from);
                            objTrendGroup.trend_getData4CheckboxFlag = true;
                            objTrendGroup
                                .addTrend(
                                objTrendGroup.defaultTrendString,
                                from, to, false);
                        }
                        moveflag = false;
                    },
                    mousemove: function (e) {
                        var xys = trend_Util.getCanvasPos(e, objTrendGroup);
                        if (parseInt(xys[0]) >= parseInt(rightX)) {
                            xys[0] = parseInt(rightX);
                        }
                        var width = parseInt(xys[0]) - clickBeginX;
                        if (downflag
                            && (parseInt(xys[0]) <= parseInt(rightX))) {
                            objTrendGroup.opTrend
                                .repaint(objTrendGroup.defaultTrendString);
                            if (width >= 10) {
                                moveflag = true;
                                objTrendGroup.canvas_context.globalAlpha = 0.4;
                                objTrendGroup.canvas_context.fillStyle = objTrendGroup.opTrend.trend_bgLineColor;
                                objTrendGroup.canvas_context.fillRect(clickBeginX, 0,
                                    width, objTrendGroup.opTrend.canvasHeight);
                                objTrendGroup.canvas_context.globalAlpha = 1;
                                to = new Date(objTrendGroup.opTrend
                                    .getTimeFromX(xys[0]));
                                objTrendGroup.mouseLeaveXY = new Array();
                            }
                        }
                    }
                });
        }
        ,

        /**
         * 设置控件事件
         * @param objTrendGroup
         */
        setControlsFun: function (objTrendGroup) {
            $("#" + objTrendGroup.pointsTable + " input[type='hidden']").change(function () {
                objTrendGroup.trendRedraw();

            });

            $("#" + objTrendGroup.pointsTable + " .pointEdit").change(function () {
                objTrendGroup.trendRedraw();
            });

            $("#" + objTrendGroup.pointsTable + " .pointEdit").bind("onnkeydown", function () {
                trend_Util.upAndDownListener(null, objTrendGroup);
            });

            $("#" + objTrendGroup.pointsTable + " input[type='checkbox']").click(function () {
                trend_Util.checkBoxSelected4Hide(objTrendGroup)
            });
        }
        ,
        /**
         * 设置曲线表格背景色
         */
        setTrendBgColor: function (objTrendGroup) {
            $.each(objTrendGroup.defaultTrendString, function (i, name) {
                var colorId = "#" + objTrendGroup.pointsTable + " #" + objTrendGroup.trendTableInputColor[i];
                $(colorId).mouseover(function () {
                    jscolor.install();
                });
            });
        }
        ,
        /**
         * 获取被选中的点名
         */
        getCheckedNames: function (objTrendGroup) {
            // 数组克隆
            objTrendGroup.chcekdPointNames = new Array();
            objTrendGroup.chcekdPointNames = objTrendGroup.defaultTrendString
                .slice(0);
            var checkboxs = $("#" + objTrendGroup.pointsTable + " input[name='" + objTrendGroup.pointsTable + "_trendCheckBox']");
            //document.getElementsByName("trendCheckBox");
            for (var i = 0; i < checkboxs.length; i++) {
                if (!checkboxs[i].checked) {
                    var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
                    //				this.trendGroup.chcekdPointNames.push(pn);
                    var index = objTrendGroup.chcekdPointNames.indexOf(pn);
                    objTrendGroup.chcekdPointNames.splice(index, 1);
                }
            }
        }
        ,
        /**
         * checkbox是否选中
         *
         * @param {}
         *            name
         * @return {}
         */
        isChecked: function (name, objTrendGroup) {
            var checkedFlag = "";
            if (objTrendGroup.chcekdPointNames.length == 0) {
                checkedFlag = "checked";
            } else {
                if (objTrendGroup.trend_getData4CheckboxFlag) {
                    for (var j = 0; j < objTrendGroup.chcekdPointNames.length; j++) {
                        if (name == objTrendGroup.chcekdPointNames[j]) {
                            checkedFlag = "checked";
                            break;
                        }
                    }
                } else {
                    checkedFlag = "checked";
                }
            }
            return checkedFlag;
        }
        ,
        checkDouble: function (obj, precision, scale) {
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
                    obj.value = objValue.substring(obj.value.length - precision,
                        obj.value.length);
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
                    obj.value = objValue.substring(dotIndex - precision, dotIndex)
                        + objValue.substring(dotIndex);
                    objValue = obj.value;
                }

                dotIndex = objValue.indexOf("\.");
                var realScale = objValue.length - (dotIndex + 1);
                if (realScale - scale > 0) {
                    // 保证小数点右边最多sacle位；
                    obj.value = objValue.substring(0, objValue.length
                        - (realScale - scale));
                    objValue = obj.value;
                }
            }
        }
        ,
        /**
         * 表格上下限变更监听
         *
         * @param {}
         *            obj
         */
        upAndDownListener: function (obj, objTrendGroup) {
            var ev = document.all ? window.event : arguments[0] ? arguments[0]
                : event;
            if (ev.keyCode == 13) {
                this.checkDouble(obj);
                objTrendGroup.trendRedraw();
                ev.returnValue = false;
            }
        }
        ,
        /**
         * 根据参数获取日期
         *
         * @param {}
         *            count
         * @return {}
         */
        getParameter4Time: function (count, objTrendGroup) {
            var temp = 1000 * 60 * 60 * 24;
            var time = $("#trend_to").val().replace(/-/g, "/");
            var result;
            if (!trend_Util.isNull(time)) {
                result = trend_Util.dateFormat(new Date(time).getTime() - temp
                    * count, objTrendGroup.formatString);
            } else {
                result = trend_Util.dateFormat(new Date().getTime() - temp * count,
                    objTrendGroup.formatString);
            }
            return result;
        }
        ,

        /**
         * 检测点名是否重复
         *
         * @param {}
         *            names
         * @return {Boolean}
         */
        checkNameRE: function (names, objTrendGroup) {

            var flag = false;
            var length = objTrendGroup.defaultTrendString.length;
            for (var j = 0; j < names.length; j++) {
                for (var i = 0; i < length; i++) {
                    if (objTrendGroup.defaultTrendString[i] == names[j]) {
                        flag = true;
                    }
                }
                if (i == length) {
                    objTrendGroup.defaultTrendString.push(names[j]);
                }
            }
            return flag;
        }
        ,
        /**
         * 检测点名是否重复
         * @param {Object} name 传递的参数只有一个
         * @return {TypeName}
         */
        checkNameREOne: function (name, objTrendGroup) {
            for (var i = 0; i < objTrendGroup.defaultTrendString.length; i++) {
                if (objTrendGroup.defaultTrendString[i] == name) {
                    return true;
                }
            }
        }
        ,
        /**
         * 停止刷新
         */
        stopFlush: function (objTrendGroup) {
            for (var i = 0; i < objTrendGroup.trendStopFlushFlags.length; i++) {
                clearInterval(objTrendGroup.trendStopFlushFlags[i]);
            }
            clearInterval(objTrendGroup.history);
        }
        ,
        /**
         * checkbox 操作（全选反选）
         */
        checkboxSelected: function (objTrendGroup) {
            var checkboxs = document.getElementsByName(objTrendGroup.pointsTable + "_trendCheckBox");
            for (var i = 0; i < checkboxs.length; i++) {
                var e = checkboxs[i];
                e.checked = !e.checked;
            }
            trend_Util.checkBoxSelected4Hide(objTrendGroup);
        }
        ,

        /**
         * 全选
         * @param objTrendGroup
         */
        trendColumnAll: function (objTrendGroup) {
            var checkboxs = document.getElementsByName(objTrendGroup.pointsTable + "_trendCheckBox"), names = [], length = checkboxs.length, ids = [];
            if (objTrendGroup.opTrend.trendArray) {
                for (var i = 0; i < length; i++) {
                    if (!checkboxs[i].checked) {
                        checkboxs[i].checked = true;
                    }
                }
            }
            trend_Util.checkBoxSelected4Hide(objTrendGroup);
        }
        ,

        /**
         * 反选
         * @param objTrendGroup
         */
        trendColumnOther: function (objTrendGroup) {
            var checkboxs = document.getElementsByName(objTrendGroup.pointsTable + "_trendCheckBox"), names = [], length = checkboxs.length, ids = [];
            if (objTrendGroup.opTrend.trendArray) {
                for (var i = 0; i < length; i++) {
                    checkboxs[i].checked = !checkboxs[i].checked;
                }
            }
            trend_Util.checkBoxSelected4Hide(objTrendGroup);
        }
        ,


        /**
         * 删除
         * @param objTrendGroup
         */
        trendColumnDelete: function (objTrendGroup) {
            var checkboxs = document.getElementsByName(objTrendGroup.pointsTable + "_trendCheckBox"), names = [], length = checkboxs.length, ids = [];
            if (objTrendGroup.opTrend.trendArray) {
                for (var i = 0; i < length; i++) {
                    if (checkboxs[i].checked) {
                        ids.push(checkboxs[i].id);
                        var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
                        objTrendGroup.trendConfigInfoMap.remove(pn);
                        objTrendGroup.colorMap.remove(pn);
                        for (var j = 0; j < objTrendGroup.opTrend.trendArray.length; j++) {
                            if (pn == objTrendGroup.opTrend.trendArray[j].pointName) {
                                objTrendGroup.opTrend.trendArray.remove(j);
                            }
                        }
                    } else {
                        var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
                        names.push(pn);
                    }
                }
            }
            objTrendGroup.defaultTrendString = new Array();
            objTrendGroup.defaultTrendString = names;
            for (var i = 0; i < ids.length; i++) {
                $('tr').remove('tr[id=' + ids[i] + ']');
            }
            if (objTrendGroup.defaultTrendString.length == 0) {
                trend_Util.stopFlush(objTrendGroup);
                trend_Util.clearDefaultString(this, objTrendGroup);
            }
            objTrendGroup.setHtmlCss();
            objTrendGroup.opTrend.repaint(names);
        }
        ,
        /**
         * 清空
         * @param objTrendGroup
         */
        trendColumnClear: function (objTrendGroup) {
            var checkboxs = document.getElementsByName(objTrendGroup.pointsTable + "_trendCheckBox"), names = [], length = checkboxs.length, ids = [];
            if (objTrendGroup.opTrend.trendArray) {
                for (var i = 0; i < length; i++) {
                    ids.push(checkboxs[i].id);
                    var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
                    objTrendGroup.trendConfigInfoMap.remove(pn);
                    objTrendGroup.colorMap.remove(pn);
                    for (var j = 0; j < objTrendGroup.opTrend.trendArray.length; j++) {
                        if (pn == objTrendGroup.opTrend.trendArray[j].pointName) {
                            objTrendGroup.opTrend.trendArray.remove(j);
                        }
                    }
                }
            }
            for (var i = 0; i < ids.length; i++) {
                $('tr').remove('tr[id=' + ids[i] + ']');
            }
            trend_Util.stopFlush(objTrendGroup);
            trend_Util.clearDefaultString(this, objTrendGroup);
            objTrendGroup.setHtmlCss();
            objTrendGroup.opTrend.repaint(names);
        }
        ,
        /**
         * 获取表格中趋势的颜色和上下限
         *
         * @return {}
         */
        getNewTrendColorsAndRanges: function (objTrendGroup) {
            // 获取自定义的颜色
            var trendRedrawNewColors = new Array();
            //defaultTrendGrtrendConfigInfoMapsMap = new trendUtilMap();
            objTrendGroup.colorMap = new trendUtilMap();

            var table = document.getElementById(objTrendGroup.pointsTable), rs = table.rows.length;

            for (var i = 1; i < rs; i++) {
                var ranges = new Array(), name = table.rows[i].cells[1].innerHTML, tv = table.rows[i].cells[6].childNodes[0].value, bv = table.rows[i].cells[7].childNodes[0].value, alarmTop = table.rows[i].cells[8].childNodes[0].value, alarmLow = table.rows[i].cells[9].childNodes[0].value, lineWidth = table.rows[i].cells[10].childNodes[0].value;
                ranges.push(tv);
                ranges.push(bv);
                ranges.push(alarmTop);
                ranges.push(alarmLow);
                ranges.push(lineWidth);
                objTrendGroup.trendConfigInfoMap.put(name, ranges);

                var color = "#" + table.rows[i].cells[2].childNodes[1].value;
                trendRedrawNewColors.push(color);
                objTrendGroup.colorMap.put(name, color);
            }
            return trendRedrawNewColors;
        }
        ,
        /**
         * 删除数组中的重复元素
         *
         * @param {}
         *            array
         * @return {}
         */
        removeArraySameElement: function (array) {
            for (var i = 0; i < array.length; i++) {
                for (var j = i + 1; j < array.length; j++) {
                    if (array[i] == array[j]) {
                        // alert("输入内容包含重复点名！");
                        array = trend_Util.removeElement(j, array);// 删除指定下标的元素
                        i = -1;
                        break;
                    }
                }
            }
            return array;
        }
        ,
        /**
         * 移除数组对象
         *
         * @param {}
         *            index
         * @param {}
         *            array
         * @return {}
         */
        removeElement: function (index, array) {
            if (index >= 0 && index < array.length) {
                for (var i = index; i < array.length; i++) {
                    array[i] = array[i + 1];
                }
                array.length = array.length - 1;
            }
            return array;
        }
        ,
        /**
         * checkbox隐藏曲线
         */
        checkBoxSelected4Hide: function (objTrendGroup) {
            var checkboxs = document.getElementsByName(objTrendGroup.pointsTable + "_trendCheckBox");
            //$("#"+objTrendGroup.pointsTable +" checkbox[name='trendCheckBox'] ");
            //document.getElementsByName("trendCheckBox");
            for (var i = 0; i < checkboxs.length; i++) {
                var trObj = document.getElementById(checkboxs[i].id), pn = trObj.cells[1].innerHTML;
                if (checkboxs[i].checked) {
                    for (var j = 0; j < objTrendGroup.opTrend.trendArray.length; j++) {
                        if (objTrendGroup.opTrend.trendArray[j].pointName == pn) {
                            objTrendGroup.opTrend.trendArray[j].hide = false;
                            break;
                        }
                    }
                } else {
                    for (var j = 0; j < objTrendGroup.opTrend.trendArray.length; j++) {
                        if (objTrendGroup.opTrend.trendArray[j].pointName == pn) {
                            objTrendGroup.opTrend.trendArray[j].hide = true;
                            break;
                        }
                    }
                }
            }
            objTrendGroup.opTrend.repaint(objTrendGroup.defaultTrendString);
        }
        ,
        /**
         * 获取服务器时间
         */
        getServerTime: function () {
            var time = new Date().getTime();
            $.ajax({
                url: 'serverTime_getServerTime',
                type: 'GET',
                cache:false,
                datatype: 'json',
                success: function (data) {
                    /**
                     * 判断对应的键值是否有对应的数据
                     */
                    if (data) {
                        time = data;
                    }
                }
            });
            return time;
        }
    }
    ;