/*
 jQWidgets v4.1.2 (2016-Apr)
 Copyright (c) 2011-2016 jQWidgets.
 License: http://jqwidgets.com/license/
 */

(function (a) {
    a.jqx.cssroundedcorners = function (b) {
        var c = {
            all: "jqx-rc-all",
            top: "jqx-rc-t",
            bottom: "jqx-rc-b",
            left: "jqx-rc-l",
            right: "jqx-rc-r",
            "top-right": "jqx-rc-tr",
            "top-left": "jqx-rc-tl",
            "bottom-right": "jqx-rc-br",
            "bottom-left": "jqx-rc-bl"
        };
        for (prop in c) {
            if (!c.hasOwnProperty(prop)) {
                continue
            }
            if (b == prop) {
                return c[ prop ]
            }
        }
    };
    a.jqx.jqxWidget("jqxButton", "", {});
    a.extend(a.jqx._jqxButton.prototype, {
        defineInstance: function () {
            var b = {
                cursor: "arrow",
                roundedCorners: "all",
                disabled: false,
                height: null,
                width: null,
                overrideTheme: false,
                enableHover: true,
                enableDefault: true,
                enablePressed: true,
                imgPosition: "center",
                imgSrc: "",
                imgWidth: 16,
                imgHeight: 16,
                value: null,
                textPosition: "",
                textImageRelation: "overlay",
                rtl: false,
                _ariaDisabled: false,
                _scrollAreaButton: false,
                template: "default",
                aria: {"aria-disabled": {name: "disabled", type: "boolean"}}
            };
            a.extend(true, this, b);
            return b
        }, _addImage: function (c) {
            var g = this;
            if (g.element.nodeName.toLowerCase() == "input" || g.element.nodeName.toLowerCase() == "button" || g.element.nodeName.toLowerCase() == "div") {
                if (!g._img) {
                    g.field = g.element;
                    if (g.field.className) {
                        g._className = g.field.className
                    }
                    var h = {title: g.field.title};
                    var i = null;
                    if (g.field.getAttribute("value")) {
                        var i = g.field.getAttribute("value")
                    } else {
                        if (g.element.nodeName.toLowerCase() != "input") {
                            var i = g.element.innerHTML
                        }
                    }
                    if (g.value) {
                        i = g.value
                    }
                    if (g.field.id.length) {
                        h.id = g.field.id.replace(/[^\w]/g, "_") + "_" + c
                    } else {
                        h.id = a.jqx.utilities.createId() + "_" + c
                    }
                    var b = a("<div></div>", h);
                    b[ 0 ].style.cssText = g.field.style.cssText;
                    b.css("box-sizing", "border-box");
                    var f = a("<img/>");
                    f[ 0 ].setAttribute("src", g.imgSrc);
                    f[ 0 ].setAttribute("width", g.imgWidth);
                    f[ 0 ].setAttribute("height", g.imgHeight);
                    b.append(f);
                    g._img = f;
                    var j = a("<span></span>");
                    if (i) {
                        j.html(i);
                        g.value = i
                    }
                    b.append(j);
                    g._text = j;
                    a(g.field).hide().after(b);
                    var e = g.host.data();
                    g.host = b;
                    g.host.data(e);
                    g.element = b[ 0 ];
                    g.element.id = g.field.id;
                    g.field.id = h.id;
                    if (g._className) {
                        g.host.addClass(g._className);
                        a(g.field).removeClass(g._className)
                    }
                    if (g.field.tabIndex) {
                        var d = g.field.tabIndex;
                        g.field.tabIndex = -1;
                        g.element.tabIndex = d
                    }
                } else {
                    g._img[ 0 ].setAttribute("src", g.imgSrc);
                    g._img[ 0 ].setAttribute("width", g.imgWidth);
                    g._img[ 0 ].setAttribute("height", g.imgHeight);
                    g._text.html(g.value)
                }
                if (!g.imgSrc) {
                    g._img.hide()
                } else {
                    g._img.show()
                }
                if (!g.value) {
                    g._text.hide()
                } else {
                    g._text.show()
                }
                g._positionTextAndImage()
            }
        }, _positionTextAndImage: function () {
            var k = this;
            var r = k.host.outerWidth();
            var q = k.host.outerHeight();
            var m = k.imgWidth;
            var v = k.imgHeight;
            if (k.imgSrc == "") {
                m = 0;
                v = 0
            }
            var f = k._text.width();
            var b = k._text.height();
            var i = 4;
            var c = 4;
            var l = 4;
            var n = 0;
            var u = 0;
            switch (k.textImageRelation) {
                case"imageBeforeText":
                case"textBeforeImage":
                    n = m + f + 2 * l + i + 2 * c;
                    u = Math.max(v, b) + 2 * l + i + 2 * c;
                    break;
                case"imageAboveText":
                case"textAboveImage":
                    n = Math.max(m, f) + 2 * l;
                    u = v + b + i + 2 * l + 2 * c;
                    break;
                case"overlay":
                    n = Math.max(m, f) + 2 * l;
                    u = Math.max(v, b) + 2 * l;
                    break
            }
            if (!k.width) {
                k.host.width(n);
                r = n
            }
            if (!k.height) {
                k.host.height(u);
                q = u
            }
            k._img.css("position", "absolute");
            k._text.css("position", "absolute");
            k.host.css("position", "relative");
            k.host.css("overflow", "hidden");
            var e = {};
            var z = {};
            var s = function (E, D, G, C, F) {
                if (D.width < C) {
                    D.width = C
                }
                if (D.height < F) {
                    D.height = F
                }
                switch (G) {
                    case"left":
                        E.style.left = D.left + "px";
                        E.style.top = D.top + D.height / 2 - F / 2 + "px";
                        break;
                    case"topLeft":
                        E.style.left = D.left + "px";
                        E.style.top = D.top + "px";
                        break;
                    case"bottomLeft":
                        E.style.left = D.left + "px";
                        E.style.top = D.top + D.height - F + "px";
                        break;
                    default:
                    case"center":
                        E.style.left = D.left + D.width / 2 - C / 2 + "px";
                        E.style.top = D.top + D.height / 2 - F / 2 + "px";
                        break;
                    case"top":
                        E.style.left = D.left + D.width / 2 - C / 2 + "px";
                        E.style.top = D.top + "px";
                        break;
                    case"bottom":
                        E.style.left = D.left + D.width / 2 - C / 2 + "px";
                        E.style.top = D.top + D.height - F + "px";
                        break;
                    case"right":
                        E.style.left = D.left + D.width - C + "px";
                        E.style.top = D.top + D.height / 2 - F / 2 + "px";
                        break;
                    case"topRight":
                        E.style.left = D.left + D.width - C + "px";
                        E.style.top = D.top + "px";
                        break;
                    case"bottomRight":
                        E.style.left = D.left + D.width - C + "px";
                        E.style.top = D.top + D.height - F + "px";
                        break
                }
            };
            var g = 0;
            var p = 0;
            var x = r;
            var j = q;
            var A = (x - g) / 2;
            var y = (j - p) / 2;
            var B = k._img;
            var o = k._text;
            var t = j - p;
            var d = x - g;
            g += c;
            p += c;
            x = x - c - 2;
            d = d - 2 * c - 2;
            t = t - 2 * c - 2;
            switch (k.textImageRelation) {
                case"imageBeforeText":
                    switch (k.imgPosition) {
                        case"left":
                        case"topLeft":
                        case"bottomLeft":
                            z = {left: g, top: p, width: g + m, height: t};
                            e = {left: g + m + i, top: p, width: d - m - i, height: t};
                            break;
                        case"center":
                        case"top":
                        case"bottom":
                            z = {left: A - f / 2 - m / 2 - i / 2, top: p, width: m, height: t};
                            e = {left: z.left + m + i, top: p, width: x - z.left - m - i, height: t};
                            break;
                        case"right":
                        case"topRight":
                        case"bottomRight":
                            z = {left: x - f - m - i, top: p, width: m, height: t};
                            e = {left: z.left + m + i, top: p, width: x - z.left - m - i, height: t};
                            break
                    }
                    s(B[ 0 ], z, k.imgPosition, m, v);
                    s(o[ 0 ], e, k.textPosition, f, b);
                    break;
                case"textBeforeImage":
                    switch (k.textPosition) {
                        case"left":
                        case"topLeft":
                        case"bottomLeft":
                            e = {left: g, top: p, width: g + f, height: t};
                            z = {left: g + f + i, top: p, width: d - f - i, height: t};
                            break;
                        case"center":
                        case"top":
                        case"bottom":
                            e = {left: A - f / 2 - m / 2 - i / 2, top: p, width: f, height: t};
                            z = {left: e.left + f + i, top: p, width: x - e.left - f - i, height: t};
                            break;
                        case"right":
                        case"topRight":
                        case"bottomRight":
                            e = {left: x - f - m - i, top: p, width: f, height: t};
                            z = {left: e.left + f + i, top: p, width: x - e.left - f - i, height: t};
                            break
                    }
                    s(B[ 0 ], z, k.imgPosition, m, v);
                    s(o[ 0 ], e, k.textPosition, f, b);
                    break;
                case"imageAboveText":
                    switch (k.imgPosition) {
                        case"topRight":
                        case"top":
                        case"topLeft":
                            z = {left: g, top: p, width: d, height: v};
                            e = {left: g, top: p + v + i, width: d, height: t - v - i};
                            break;
                        case"left":
                        case"center":
                        case"right":
                            z = {left: g, top: y - v / 2 - b / 2 - i / 2, width: d, height: v};
                            e = {left: g, top: z.top + i + v, width: d, height: t - z.top - i - v};
                            break;
                        case"bottomLeft":
                        case"bottom":
                        case"bottomRight":
                            z = {left: g, top: j - v - b - i, width: d, height: v};
                            e = {left: g, top: z.top + i + v, width: d, height: b};
                            break
                    }
                    s(B[ 0 ], z, k.imgPosition, m, v);
                    s(o[ 0 ], e, k.textPosition, f, b);
                    break;
                case"textAboveImage":
                    switch (k.textPosition) {
                        case"topRight":
                        case"top":
                        case"topLeft":
                            e = {left: g, top: p, width: d, height: b};
                            z = {left: g, top: p + b + i, width: d, height: t - b - i};
                            break;
                        case"left":
                        case"center":
                        case"right":
                            e = {left: g, top: y - v / 2 - b / 2 - i / 2, width: d, height: b};
                            z = {left: g, top: e.top + i + b, width: d, height: t - e.top - i - b};
                            break;
                        case"bottomLeft":
                        case"bottom":
                        case"bottomRight":
                            e = {left: g, top: j - v - b - i, width: d, height: b};
                            z = {left: g, top: e.top + i + b, width: d, height: v};
                            break
                    }
                    s(B[ 0 ], z, k.imgPosition, m, v);
                    s(o[ 0 ], e, k.textPosition, f, b);
                    break;
                case"overlay":
                default:
                    e = {left: g, top: p, width: d, height: t};
                    z = {left: g, top: p, width: d, height: t};
                    s(B[ 0 ], z, k.imgPosition, m, v);
                    s(o[ 0 ], e, k.textPosition, f, b);
                    break
            }
        }, createInstance: function (d) {
            var b = this;
            b._setSize();
            if (b.imgSrc != "" || b.textPosition != "" || (b.element.value && b.element.value.indexOf("<") >= 0) || b.value != null) {
                b.refresh();
                b._addImage("jqxButton")
            }
            if (!b._ariaDisabled) {
                b.host.attr("role", "button")
            }
            if (!b.overrideTheme) {
                b.host.addClass(b.toThemeProperty(a.jqx.cssroundedcorners(b.roundedCorners)));
                if (b.enableDefault) {
                    b.host.addClass(b.toThemeProperty("jqx-button"))
                }
                b.host.addClass(b.toThemeProperty("jqx-widget"))
            }
            b.isTouchDevice = a.jqx.mobile.isTouchDevice();
            if (!b._ariaDisabled) {
                a.jqx.aria(this)
            }
            if (b.cursor != "arrow") {
                if (!b.disabled) {
                    b.host.css({cursor: b.cursor})
                } else {
                    b.host.css({cursor: "arrow"})
                }
            }
            var g = "mouseenter mouseleave mousedown focus blur";
            if (b._scrollAreaButton) {
                var g = "mousedown"
            }
            if (b.isTouchDevice) {
                b.addHandler(b.host, a.jqx.mobile.getTouchEventName("touchstart"), function (h) {
                    b.isPressed = true;
                    b.refresh()
                });
                b.addHandler(a(document), a.jqx.mobile.getTouchEventName("touchend") + "." + b.element.id, function (h) {
                    b.isPressed = false;
                    b.refresh()
                })
            }
            b.addHandler(b.host, g, function (h) {
                switch (h.type) {
                    case"mouseenter":
                        if (!b.isTouchDevice) {
                            if (!b.disabled && b.enableHover) {
                                b.isMouseOver = true;
                                b.refresh()
                            }
                        }
                        break;
                    case"mouseleave":
                        if (!b.isTouchDevice) {
                            if (!b.disabled && b.enableHover) {
                                b.isMouseOver = false;
                                b.refresh()
                            }
                        }
                        break;
                    case"mousedown":
                        if (!b.disabled) {
                            b.isPressed = true;
                            b.refresh()
                        }
                        break;
                    case"focus":
                        if (!b.disabled) {
                            b.isFocused = true;
                            b.refresh()
                        }
                        break;
                    case"blur":
                        if (!b.disabled) {
                            b.isFocused = false;
                            b.refresh()
                        }
                        break
                }
            });
            b.mouseupfunc = function (h) {
                if (!b.disabled) {
                    if (b.isPressed || b.isMouseOver) {
                        b.isPressed = false;
                        b.refresh()
                    }
                }
            };
            b.addHandler(a(document), "mouseup.button" + b.element.id, b.mouseupfunc);
            try {
                if (document.referrer != "" || window.frameElement) {
                    if (window.top != null && window.top != window.self) {
                        var f = "";
                        if (window.parent && document.referrer) {
                            f = document.referrer
                        }
                        if (f.indexOf(document.location.host) != -1) {
                            var e = function (h) {
                                b.isPressed = false;
                                b.refresh()
                            };
                            if (window.top.document) {
                                b.addHandler(a(window.top.document), "mouseup", e)
                            }
                        }
                    }
                }
            } catch (c) {
            }
            b.propertyChangeMap.roundedCorners = function (h, j, i, k) {
                h.host.removeClass(h.toThemeProperty(a.jqx.cssroundedcorners(i)));
                h.host.addClass(h.toThemeProperty(a.jqx.cssroundedcorners(k)))
            };
            b.propertyChangeMap.disabled = function (h, j, i, k) {
                if (i != k) {
                    h.refresh();
                    h.host[ 0 ].disabled = k;
                    h.host.attr("disabled", k);
                    if (!k) {
                        h.host.css({cursor: h.cursor})
                    } else {
                        h.host.css({cursor: "default"})
                    }
                    a.jqx.aria(h, "aria-disabled", h.disabled)
                }
            };
            b.propertyChangeMap.rtl = function (h, j, i, k) {
                if (i != k) {
                    h.refresh()
                }
            };
            b.propertyChangeMap.template = function (h, j, i, k) {
                if (i != k) {
                    h.host.removeClass(h.toThemeProperty("jqx-" + i));
                    h.refresh()
                }
            };
            b.propertyChangeMap.theme = function (h, j, i, k) {
                h.host.removeClass();
                if (h.enableDefault) {
                    h.host.addClass(h.toThemeProperty("jqx-button"))
                }
                h.host.addClass(h.toThemeProperty("jqx-widget"));
                if (!h.overrideTheme) {
                    h.host.addClass(h.toThemeProperty(a.jqx.cssroundedcorners(h.roundedCorners)))
                }
                h._oldCSSCurrent = null;
                h.refresh()
            };
            if (b.disabled) {
                b.element.disabled = true;
                b.host.attr("disabled", true)
            }
        }, resize: function (c, b) {
            this.width = c;
            this.height = b;
            this._setSize()
        }, val: function () {
            var c = this;
            var b = c.host.find("input");
            if (b.length > 0) {
                if (arguments.length == 0 || typeof(value) == "object") {
                    return b.val()
                }
                b.val(value);
                c.refresh();
                return b.val()
            }
            if (arguments.length == 0 || typeof(value) == "object") {
                if (c.element.nodeName.toLowerCase() == "button") {
                    return a(c.element).text()
                }
                return c.element.value
            }
            c.element.value = arguments[ 0 ];
            if (c.element.nodeName.toLowerCase() == "button") {
                a(c.element).text(arguments[ 0 ])
            }
            c.refresh()
        }, _setSize: function () {
            var b = this;
            if (b.width != null && (b.width.toString().indexOf("px") != -1 || b.width.toString().indexOf("%") != -1)) {
                b.host.css("width", b.width)
            } else {
                if (b.width != undefined && !isNaN(b.width)) {
                    b.host.css("width", b.width)
                }
            }
            if (b.height != null && (b.height.toString().indexOf("px") != -1 || b.height.toString().indexOf("%") != -1)) {
                b.host.css("height", b.height)
            } else {
                if (b.height != undefined && !isNaN(b.height)) {
                    b.host.css("height", parseInt(b.height))
                }
            }
        }, _removeHandlers: function () {
            var b = this;
            b.removeHandler(b.host, "selectstart");
            b.removeHandler(b.host, "click");
            b.removeHandler(b.host, "focus");
            b.removeHandler(b.host, "blur");
            b.removeHandler(b.host, "mouseenter");
            b.removeHandler(b.host, "mouseleave");
            b.removeHandler(b.host, "mousedown");
            b.removeHandler(a(document), "mouseup.button" + b.element.id, b.mouseupfunc);
            if (b.isTouchDevice) {
                b.removeHandler(b.host, a.jqx.mobile.getTouchEventName("touchstart"));
                b.removeHandler(a(document), a.jqx.mobile.getTouchEventName("touchend") + "." + b.element.id)
            }
            b.mouseupfunc = null;
            delete b.mouseupfunc
        }, focus: function () {
            this.host.focus()
        }, destroy: function () {
            var b = this;
            b._removeHandlers();
            var c = a.data(b.element, "jqxButton");
            if (c) {
                delete c.instance
            }
            b.host.removeClass();
            b.host.removeData();
            b.host.remove();
            delete b.set;
            delete b.get;
            delete b.call;
            delete b.element;
            delete b.host
        }, render: function () {
            this.refresh()
        }, propertiesChangedHandler: function (d, b, c) {
            if (c && c.width && c.height && Object.keys(c).length == 2) {
                d._setSize();
                d.refresh()
            }
        }, propertyChangedHandler: function (b, c, e, d) {
            if (this.isInitialized == undefined || this.isInitialized == false) {
                return
            }
            if (d == e) {
                return
            }
            if (b.batchUpdate && b.batchUpdate.width && b.batchUpdate.height && Object.keys(b.batchUpdate).length == 2) {
                return
            }
            if (c == "textImageRelation" || c == "textPosition" || c == "imgPosition") {
                if (b._img) {
                    b._positionTextAndImage()
                } else {
                    b._addImage("jqxButton")
                }
            }
            if (c == "imgSrc" || c == "imgWidth" || c == "imgHeight" || c == "value") {
                b._addImage("jqxButton")
            }
            if (c == "width" || c == "height") {
                b._setSize();
                b.refresh()
            }
        }, refresh: function () {
            var c = this;
            if (c.overrideTheme) {
                return
            }
            var e = c.toThemeProperty("jqx-fill-state-focus");
            var i = c.toThemeProperty("jqx-fill-state-disabled");
            var b = c.toThemeProperty("jqx-fill-state-normal");
            if (!c.enableDefault) {
                b = ""
            }
            var h = c.toThemeProperty("jqx-fill-state-hover");
            var f = c.toThemeProperty("jqx-fill-state-pressed");
            var g = c.toThemeProperty("jqx-fill-state-pressed");
            if (!c.enablePressed) {
                f = ""
            }
            var d = "";
            if (!c.host) {
                return
            }
            c.host[ 0 ].disabled = c.disabled;
            if (c.disabled) {
                if (c._oldCSSCurrent) {
                    c.host.removeClass(c._oldCSSCurrent)
                }
                d = b + " " + i;
                if (c.template !== "default" && c.template !== "") {
                    d += " jqx-" + c.template;
                    if (c.theme != "") {
                        d += " jqx-" + c.template + "-" + c.theme
                    }
                }
                c.host.addClass(d);
                c._oldCSSCurrent = d;
                return
            } else {
                if (c.isMouseOver && !c.isTouchDevice) {
                    if (c.isPressed) {
                        d = g
                    } else {
                        d = h
                    }
                } else {
                    if (c.isPressed) {
                        d = f
                    } else {
                        d = b
                    }
                }
            }
            if (c.isFocused) {
                d += " " + e
            }
            if (c.template !== "default" && c.template !== "") {
                d += " jqx-" + c.template;
                if (c.theme != "") {
                    d += " jqx-" + c.template + "-" + c.theme
                }
            }
            if (d != c._oldCSSCurrent) {
                if (c._oldCSSCurrent) {
                    c.host.removeClass(c._oldCSSCurrent)
                }
                c.host.addClass(d);
                c._oldCSSCurrent = d
            }
            if (c.rtl) {
                c.host.addClass(c.toThemeProperty("jqx-rtl"));
                c.host.css("direction", "rtl")
            }
        }
    });
    a.jqx.jqxWidget("jqxLinkButton", "", {});
    a.extend(a.jqx._jqxLinkButton.prototype, {
        defineInstance: function () {
            this.disabled = false;
            this.height = null;
            this.width = null;
            this.rtl = false;
            this.href = null
        }, createInstance: function (d) {
            var c = this;
            this.host.onselectstart = function () {
                return false
            };
            this.host.attr("role", "button");
            var b = this.height || this.host.height();
            var e = this.width || this.host.width();
            this.href = this.host.attr("href");
            this.target = this.host.attr("target");
            this.content = this.host.text();
            this.element.innerHTML = "";
            this.host.append("<input type='button' class='jqx-wrapper'/>");
            var f = this.host.find("input");
            f.addClass(this.toThemeProperty("jqx-reset"));
            f.width(e);
            f.height(b);
            f.val(this.content);
            this.host.find("tr").addClass(this.toThemeProperty("jqx-reset"));
            this.host.find("td").addClass(this.toThemeProperty("jqx-reset"));
            this.host.find("tbody").addClass(this.toThemeProperty("jqx-reset"));
            this.host.css("color", "inherit");
            this.host.addClass(this.toThemeProperty("jqx-link"));
            f.css({width: e});
            f.css({height: b});
            var g = d == undefined ? {} : d[ 0 ] || {};
            f.jqxButton(g);
            if (this.disabled) {
                this.host[ 0 ].disabled = true
            }
            this.propertyChangeMap.disabled = function (h, j, i, k) {
                h.host[ 0 ].disabled = k;
                h.host.find("input").jqxButton({disabled: k})
            };
            this.addHandler(f, "click", function (h) {
                if (!this.disabled) {
                    c.onclick(h)
                }
                return false
            })
        }, onclick: function (b) {
            if (this.target != null) {
                window.open(this.href, this.target)
            } else {
                window.location = this.href
            }
        }
    });
    a.jqx.jqxWidget("jqxRepeatButton", "jqxButton", {});
    a.extend(a.jqx._jqxRepeatButton.prototype, {
        defineInstance: function () {
            this.delay = 50
        }, createInstance: function (e) {
            var c = this;
            var d = a.jqx.mobile.isTouchDevice();
            var b = !d ? "mouseup." + this.base.element.id : "touchend." + this.base.element.id;
            var f = !d ? "mousedown." + this.base.element.id : "touchstart." + this.base.element.id;
            this.addHandler(a(document), b, function (g) {
                if (c.timeout != null) {
                    clearTimeout(c.timeout);
                    c.timeout = null;
                    c.refresh()
                }
                if (c.timer != undefined) {
                    clearInterval(c.timer);
                    c.timer = null;
                    c.refresh()
                }
            });
            this.addHandler(this.base.host, f, function (g) {
                if (c.timer != null) {
                    clearInterval(c.timer)
                }
                c.timeout = setTimeout(function () {
                    clearInterval(c.timer);
                    c.timer = setInterval(function (h) {
                        c.ontimer(h)
                    }, c.delay)
                }, 150)
            });
            this.mousemovefunc = function (g) {
                if (!d) {
                    if (g.which == 0) {
                        if (c.timer != null) {
                            clearInterval(c.timer);
                            c.timer = null
                        }
                    }
                }
            };
            this.addHandler(this.base.host, "mousemove", this.mousemovefunc)
        }, destroy: function () {
            var c = a.jqx.mobile.isTouchDevice();
            var b = !c ? "mouseup." + this.base.element.id : "touchend." + this.base.element.id;
            var e = !c ? "mousedown." + this.base.element.id : "touchstart." + this.base.element.id;
            this.removeHandler(this.base.host, "mousemove", this.mousemovefunc);
            this.removeHandler(this.base.host, e);
            this.removeHandler(a(document), b);
            this.timer = null;
            delete this.mousemovefunc;
            delete this.timer;
            var d = a.data(this.base.element, "jqxRepeatButton");
            if (d) {
                delete d.instance
            }
            a(this.base.element).removeData();
            this.base.destroy();
            delete this.base
        }, stop: function () {
            clearInterval(this.timer);
            this.timer = null
        }, ontimer: function (b) {
            var b = new a.Event("click");
            if (this.base != null && this.base.host != null) {
                this.base.host.trigger(b)
            }
        }
    });
    a.jqx.jqxWidget("jqxToggleButton", "jqxButton", {});
    a.extend(a.jqx._jqxToggleButton.prototype, {
        defineInstance: function () {
            this.toggled = false;
            this.uiToggle = true;
            this.aria = {
                "aria-checked": {name: "toggled", type: "boolean"},
                "aria-disabled": {name: "disabled", type: "boolean"}
            }
        }, createInstance: function (c) {
            var b = this;
            b.base.overrideTheme = true;
            b.isTouchDevice = a.jqx.mobile.isTouchDevice();
            a.jqx.aria(this);
            b.propertyChangeMap.roundedCorners = function (d, f, e, g) {
                d.base.host.removeClass(d.toThemeProperty(a.jqx.cssroundedcorners(e)));
                d.base.host.addClass(d.toThemeProperty(a.jqx.cssroundedcorners(g)))
            };
            b.propertyChangeMap.toggled = function (d, f, e, g) {
                d.refresh()
            };
            b.propertyChangeMap.disabled = function (d, f, e, g) {
                d.base.disabled = g;
                d.refresh()
            };
            b.addHandler(b.base.host, "click", function (d) {
                if (!b.base.disabled && b.uiToggle) {
                    b.toggle()
                }
            });
            if (!b.isTouchDevice) {
                b.addHandler(b.base.host, "mouseenter", function (d) {
                    if (!b.base.disabled) {
                        b.refresh()
                    }
                });
                b.addHandler(b.base.host, "mouseleave", function (d) {
                    if (!b.base.disabled) {
                        b.refresh()
                    }
                })
            }
            b.addHandler(b.base.host, "mousedown", function (d) {
                if (!b.base.disabled) {
                    b.refresh()
                }
            });
            b.addHandler(a(document), "mouseup.togglebutton" + b.base.element.id, function (d) {
                if (!b.base.disabled) {
                    b.refresh()
                }
            })
        }, destroy: function () {
            this._removeHandlers();
            this.base.destroy()
        }, _removeHandlers: function () {
            this.removeHandler(this.base.host, "click");
            this.removeHandler(this.base.host, "mouseenter");
            this.removeHandler(this.base.host, "mouseleave");
            this.removeHandler(this.base.host, "mousedown");
            this.removeHandler(a(document), "mouseup.togglebutton" + this.base.element.id)
        }, toggle: function () {
            this.toggled = !this.toggled;
            this.refresh();
            a.jqx.aria(this, "aria-checked", this.toggled)
        }, unCheck: function () {
            this.toggled = false;
            this.refresh()
        }, check: function () {
            this.toggled = true;
            this.refresh()
        }, refresh: function () {
            var c = this;
            var h = c.base.toThemeProperty("jqx-fill-state-disabled");
            var b = c.base.toThemeProperty("jqx-fill-state-normal");
            if (!c.base.enableDefault) {
                b = ""
            }
            var g = c.base.toThemeProperty("jqx-fill-state-hover");
            var e = c.base.toThemeProperty("jqx-fill-state-pressed");
            var f = c.base.toThemeProperty("jqx-fill-state-pressed");
            var d = "";
            c.base.host[ 0 ].disabled = c.base.disabled;
            if (c.base.disabled) {
                d = b + " " + h;
                c.base.host.addClass(d);
                return
            } else {
                if (c.base.isMouseOver && !c.isTouchDevice) {
                    if (c.base.isPressed || c.toggled) {
                        d = f
                    } else {
                        d = g
                    }
                } else {
                    if (c.base.isPressed || c.toggled) {
                        d = e
                    } else {
                        d = b
                    }
                }
            }
            if (c.base.template !== "default" && c.base.template !== "") {
                d += " jqx-" + c.base.template;
                if (c.base.theme != "") {
                    d += " jqx-" + c.template + "-" + c.base.theme
                }
            }
            if (c.base.host.hasClass(h) && h != d) {
                c.base.host.removeClass(h)
            }
            if (c.base.host.hasClass(b) && b != d) {
                c.base.host.removeClass(b)
            }
            if (c.base.host.hasClass(g) && g != d) {
                c.base.host.removeClass(g)
            }
            if (c.base.host.hasClass(e) && e != d) {
                c.base.host.removeClass(e)
            }
            if (c.base.host.hasClass(f) && f != d) {
                c.base.host.removeClass(f)
            }
            if (!c.base.host.hasClass(d)) {
                c.base.host.addClass(d)
            }
        }
    })
})(jqxBaseFramework);