/**
 * Created by se7en on 2015/12/16.
 */

var numberFormat = {
	numberDecimal : 2
};
/**
 * 根据获取到的资源权限信息，格式化资源树
 * @param selectedResources
 */
function formatResourcesTree(selectedResources) {
	var length = selectedResources.length;
	var oAuth = '';
	for ( var i = 0; i < length; i++) {
		var o = selectedResources[i];
		if (o.auth == 0) {
			var ooAuth = o.id;
			for ( var j = 0; j < length; j++) {
				var oo = selectedResources[j];
				if (oo.auth == 1 && oo.pId == o.id) {
					ooAuth += ('|' + oo.id)
				}
			}
			oAuth += (ooAuth + '$');
		}
	}
	return oAuth;
}

/**
 * js map 对象
 * @memberOf {TypeName} 
 * @return {TypeName} 
 */
function UtilMap() {
	var struct = function(key, value) {
		this.key = key;
		this.value = value;
	};

	var put = function(key, value) {
		for ( var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				this.arr[i].value = value;
				return;
			}
		}
		this.arr[this.arr.length] = new struct(key, value);
	};

	var get = function(key) {
		for ( var i = 0; i < this.arr.length; i++) {
			if (this.arr[i].key === key) {
				return this.arr[i].value;
			}
		}
		return null;
	};

	var remove = function(key) {
		var v;
		for ( var i = 0; i < this.arr.length; i++) {
			v = this.arr.pop();
			if (v.key === key) {
				continue;
			}
			this.arr.unshift(v);
		}
	};

	var size = function() {
		return this.arr.length;
	};

	var isEmpty = function() {
		return this.arr.length <= 0;
	};
	this.arr = new Array();
	this.get = get;
	this.put = put;
	this.remove = remove;
	this.size = size;
	this.isEmpty = isEmpty;
}

var utils = {
	formatString : 'yyyy-MM-dd HH:mm:ss',
	/**
	 * 格式化时间
	 * @param value
	 * @returns {string}
	 */
	formatTime : function(value) {
		var t = new Date(value), tf = function(i) {
			return (i < 10 ? '0' : '') + i;
		}
		return this.formatString.replace(/yyyy|yy|MM|dd|HH|mm|ss/g, function(a) {
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
			return (i < 10 ? '0' : '') + i;
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
	}
}
/**
 * 格式化年份处理
 */
function formatYear(beginYear) {
	if (!beginYear) {
		beginYear = 2011;
	}
	var year = new Date().getFullYear();

	var yearArray = new Array();
	var yearObject = null;
	for ( var i = 2011; i <= year; i++) {
		yearObject = new Object();
		yearObject.text = i;
		yearObject.value = i;
		yearArray.push(yearObject);
	}
	return yearArray;
}