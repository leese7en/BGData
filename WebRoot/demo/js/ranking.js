/**
 * 初始化
 */
$(document).ready(function() {
	getRanking();
	// init();
		selectYear();
	});

// function init(){
// 	  $('#emissionIntensity').datagrid('getPager').pagination({ 
// 	        pageSize: 6,//每页显示的记录条数，默认为10 
// 	        pageList: [6,10,15],//可以设置每页记录条数的列表 
// 	        beforePageText: '第',//页数文本框前显示的汉字 
// 	        afterPageText: '页    共 {pages} 页', 
// 	        displayMsg: '', 
// 	        onSelectPage: function (pageNumber, pageSize) {
// 		  getRanking(pageNumber, pageSize);
// 	            }
// 	    }); 
// 	  $('#emissionPerformance').datagrid('getPager').pagination({ 
// 	        pageSize: 6,//每页显示的记录条数，默认为10 
// 	        pageList: [6,10,15],//可以设置每页记录条数的列表 
// 	        beforePageText: '第',//页数文本框前显示的汉字 
// 	        afterPageText: '页    共 {pages} 页', 
// 	        displayMsg: '', 
// 	        onSelectPage: function (pageNumber, pageSize) {
// 		  getRanking(pageNumber, pageSize);
// 	            }
// 	    }); 
// 	  $('#coalConsumption').datagrid('getPager').pagination({ 
// 	        pageSize: 6,//每页显示的记录条数，默认为10 
// 	        pageList: [6,10,15],//可以设置每页记录条数的列表 
// 	        beforePageText: '第',//页数文本框前显示的汉字 
// 	        afterPageText: '页    共 {pages} 页', 
// 	        displayMsg: '', 
// 	        onSelectPage: function (pageNumber, pageSize) {
// 		  getRanking(pageNumber, pageSize);
// 	            }
// 	    }); 
// 	  $('#waterConsumption').datagrid('getPager').pagination({ 
// 	        pageSize: 6,//每页显示的记录条数，默认为10 
// 	        pageList: [6,10,15],//可以设置每页记录条数的列表 
// 	        beforePageText: '第',//页数文本框前显示的汉字 
// 	        afterPageText: '页    共 {pages} 页', 
// 	        displayMsg: '', 
// 	        onSelectPage: function (pageNumber, pageSize) {
// 		  getRanking(pageNumber, pageSize);
// 	            }
// 	    }); 
// }

/**
 * 获取数据
 * @return
 */
function getRanking(pageNumber, pageSize, year) {
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 6;
	}
	if (!year) {
		year = 2011;
	}
	$.ajax( {
		type : 'post',
		url : '../getRanking',
		data : {
			pageNumber : pageNumber,
			pageSize : pageSize,
			year : year
		},
		dataType : 'json',
		success : function(data) {
			$('#emissionIntensity').datagrid('loadData', data);
			$('#emissionPerformance').datagrid('loadData', data);
			$('#coalConsumption').datagrid('loadData', data);
			$('#waterConsumption').datagrid('loadData', data);
		},
		error : function() {
			$.messager.alert('error', '获取数据失败！', 'error');
		}
	});
}

function selectYear() {

	var data = $('#queryCountryPowerYear').combobox('setValue', '请选择');
	$("#queryCountryPowerYear").combobox( {
		onChange : function(n, o) {
			if (n == '请选择') {
				getRanking(1, 6, '2011');
			} else {
				getRanking(1, 6, n);
			}
		}
	});
}