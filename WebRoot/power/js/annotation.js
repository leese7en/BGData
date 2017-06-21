/**
 * Created by se7en on 2016/2/4.
 */
/**
 * 查询盟市信息
 */
$(document).ready(function(){
	$('.form_datetime').datetimepicker( {
		language : 'zh-CN',
		format : 'yyyy-mm',
		autoclose : true,
		startView : 'year',
		minView : 'year',
		todayHighlight : true,
		todayBtn : true,
		forceParse:false,
		allowInputToggle : true
	});
	initDate();
	initAnnotationTable();
	
	$('#eviewPoint').combobox({
		onChange:function(){
			eGetCityOrGroup();
		}
	});
	
	$('#addviewPoint').combobox({
		data : [{"id" : 1, "name" : "集团"}, {"id":2, "name":"盟市"}],
		valueField : 'id',
		textField : 'name',
		onChange : function(){
			getCityOrGroup();
		}  
	});
	$('#addpollOrSulfur').combobox({
		data : [{"id" : 1, "name" : "污染物"}, {"id":2, "name":"硫分"}],
		valueField : 'id',
		textField : 'name',
		onChange : function(){
			queryPoll();
		}  
	});
	
	queryAnotationData();
});

function getCityOrGroup(){
	if($('#addviewPoint').combobox('getValue')==2){
		queryCity();
	}
	else{
		queryGroup();
	}
}

function queryGroup(){
	//alert(55555);
	$.ajax({
		type: 'get',
		url: '../getIndustryGroup',
		dataType: 'json',
		success: function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.groupName = '请选择';
			value.unshift(o);
			$('#addgroupOrCity').combobox({
				valueField : 'id',
				textField : 'groupName',
				data : value
			});
			$('#addgroupOrCity').combobox('setValue', '-1');
		},
		error: function(){

		}
	});
}
function queryCity() {
	$.ajax({
		type: 'get',
		url: '../getZoneCity',
		dataType: 'json',
		success: function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.cityName = '请选择';
			value.unshift(o);
			$('#addgroupOrCity').combobox({
				valueField : 'id',
				textField : 'cityName',
				data : value
			});
			$('#addgroupOrCity').combobox('setValue', '-1');
		},
		error: function() {
			
		}
	});
}
function queryPoll(){
	if($('#addpollOrSulfur').combobox('getValue')==1){
		$('#addpollutant').combobox({ 
			data:[{id:'SO2',value:'SO2'},{id:'NOx',value:'NOx'},{id:'dust',value:'烟尘'}], 
			valueField:'id', 
			textField:'value' 
			}); 
	}
	else{
		$('#addpollutant').combobox({ 
			data:[{id:'liufen',value:'硫分'}], 
			valueField:'id', 
			textField:'value' 
		}); 
	}
}

/**
 * 污染源json对象
 */
/*var pollJson=[{id:'SO2',value:'SO2'},{id:'NOx',value:'NOx'},{id:'dust',value:'烟尘'}];
var liufenJson={id:'liufen',value:'硫分'};*/

function initAnnotationTable() {
	$("#annotationTable").datagrid('hideColumn', 'groupName');
	//数据一览
	$('#annotationTable').datagrid( {
		onRowContextMenu : function(e, rowIndex, rowData) { //右键时触发事件
				//三个参数：e里面的内容很多，真心不明白，rowIndex就是当前点击时所在行的索引，rowData当前行的数据
				e.preventDefault(); //阻止浏览器捕获右键事件
				$(this).datagrid("clearSelections"); //取消所有选中项
				$(this).datagrid("selectRow", rowIndex); //根据索引选中该行
				$('#editAnnotation').menu('show', {
					left : e.pageX,
					top : e.pageY
				}).data('id', rowData.ID);
			}
		});

	$("#editAnnotation").menu( {
		onClick : function(item) {
		    var row = $('#annotationTable').datagrid('getSelected');
		    var id = row.id;
		    var name = item.name;
			if (name == 'basic') {
				annotationInfo(id);
			}else if (name == 'delete') {
				deleteAnnotation(id);
			}
		    
		}
	});
	
	
	var p = $('#annotationTable').datagrid('getPager');
	$(p).pagination( {
		pageSize : 20,
		pageList : [ 20, 50, 100, 200 ],//可以设置每页记录条数的列表
		beforePageText : '第',//页数文本框前显示的汉字
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示 {from} - {to} 条记录   共 {total} 条记录',
		onSelectPage : function(pageNumber, pageSize) {
		queryAnotationData(pageNumber, pageSize);
		}
	});
	
};

function deleteAnnotation(id){
	$.messager.confirm('删除批注', '<div style="height:50px;line-height:50px;margin-left:20px;">你确定删除批注吗？</div>', function (result) {
        if (result) {
           $.ajax({
				type:'post',
				url:'../deleteAnnotation',
				data:{
					id:id
				},
				dataType:'json',
				success:function(data){
					var flag = data.flag;
					if(flag==0){
						queryAnotationData();
						$.messager.alert('提示信息','<span class="mes">删除成功!</span>','提示信息');
					}
					else{
						$.messager.alert('提示信息',data.Message,'提示信息');
					}
				},
				error:function(){
					$.messager.alert('提示信息','<span class="mess">删除失败!</span>','提示信息');
				}
			});	
        }
    });
}


function eGetCityOrGroup(){
	//alert(111111);
	if($('#eviewPoint').combobox('getValue')==2){
		eQueryCity();
	}
	else{
		eQueryGroup();
	}
}

function eQueryGroup(){
	$.ajax({
		type: 'get',
		url: '../getIndustryGroup',
		dataType: 'json',
		success: function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.groupName = '请选择';
			value.unshift(o);
			$('#egroupOrCity').combobox({
				valueField : 'id',
				textField : 'groupName',
				data : value
			});
			$('#egroupOrCity').combobox('setValue', '-1');
		},
		error: function(){

		}
	});
}
/**
 * 编辑页面查询
 */
function eQueryCity() {
	$.ajax({
		type: 'get',
		url: '../getZoneCity',
		dataType: 'json',
		success: function(data) {
			var value = data;
			var o = new Object();
			o.id = '-1';
			o.cityName = '请选择';
			value.unshift(o);
			$('#egroupOrCity').combobox({
				valueField : 'id',
				textField : 'cityName',
				data : value
			});
			$('#egroupOrCity').combobox('setValue', '-1');
		},
		error: function() {
			
		}
	});
}

/**
 * 根据条件查询批注信息
 */
function queryAnotationData(pageNumber, pageSize) {
	//alert(groupIdOrCityId);
	var beginTime = $('#beginTime').find('input').val();
	var endTime = $('#endTime').find('input').val();
	if (beginTime > endTime){
		$.messager.alert("提示信息", "<div style='height:50px;line-height:50px;margin-left:20px;'>结束时间不能早于开始时间</div>","info");
		return;
	}
	var viewPoint = $('#viewPoint').combobox('getValue');
	var pollOrSulfur = $('#pollOrSulfur').combobox('getValue');
	var grid = $('#annotationTable');
	var options = grid.datagrid('getPager').data("pagination").options;
	if (!pageNumber) {
		pageNumber = options.pageNumber;
	}
	if (!pageSize) {
		pageSize = options.pageSize;
	}
	if (!pageNumber) {
		pageNumber = 1;
	}
	if (!pageSize) {
		pageSize = 20;
	}
	$.ajax( {
		type : 'get',
		url : '../getAnnotation',
		data:{
			beginTime:beginTime,
			endTime:endTime,
			viewPoint:viewPoint,
			pollOrSulfur:pollOrSulfur,
			pageNumber : pageNumber,
			pageSize : pageSize
		},
		dataType : 'json',
		success : function(data) {
			$('#annotationTable').datagrid('loadData',data);
			if(data.rows[0].groupName==null){
				$("#annotationTable").datagrid('hideColumn', 'groupName');
				$("#annotationTable").datagrid('showColumn', 'cityName');
			}
			if(data.rows[0].cityName==null){
				$("#annotationTable").datagrid('hideColumn', 'cityName');
				$("#annotationTable").datagrid('showColumn', 'groupName');
			}
		},
		error : function() {
				
		}
	});
}
function formatMonth(val){
	if(val != null){
		return val.slice(-2);
	}
}

function formatPollutant(val){
	if(val=="liufen"){
		return "硫分";
	}else if(val=="dust"){
		return "烟尘";
	}
	else{
		return val;
	}
}
/**
 * 添加批注信息弹出框
 */
function anotationInsert(){
	var data1 = $('#addviewPoint').combobox('getData');
	 $("#addviewPoint ").combobox('select',data1[0].id);
	var data2 = $('#addpollOrSulfur').combobox('getData');
	 $("#addpollOrSulfur ").combobox('select',data2[0].id);
	 var nowtime = new Date().getTime();
	 $('#addtime').datetimespinner('setValue', utils.dateFormat(nowtime, 'yyyy-MM-dd'));
	$('#addAnotationDialog').show();
	$('#addAnotationDialog').dialog({
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		title :'添加批注信息',
		top : 80,
		buttons : [{
			text : '提交',
				handler : function() {
				addAnotation();
			}
		}, {
			text : '取消',
			handler : function() {
				$('#addpollOrSulfur').combobox('setValue', '');
				$('#addpollutant').combobox('setValue', '');
				$('#addviewPoint').combobox('setValue', '');
				$('#addgroupOrCity').combobox('setValue', '');
				$('#addtime').datetimespinner('setValue', '');
				$('#addcontent').val('');
				$('#addAnotationDialog').dialog('close');
			}
		} ]
	});
}

/**
 * 添加批注信息
 */
function addAnotation(){
	var pollOrSulfur = $('#addpollOrSulfur').combobox('getValue');
	var viewPoint=$('#addviewPoint').combobox('getValue');
	var pollutant=$('#addpollutant').combobox('getValue');
	var groupIdOrCityId = $('#addgroupOrCity').combobox('getValue');
	var time =$('#addtime').val();
	var content =$('#addcontent').val();
	$.ajax({
		type:'post',
		title:'添加批注',
		url:'../addAnotation',
		data:{
			pollOrSulfur:pollOrSulfur,
			pollutant:pollutant,
			viewPoint:viewPoint,
			groupIdOrCityId:groupIdOrCityId,
			time:time,
			content:content
		},
		dataType:'json',
		success:function(data){
			var flag = data.flag;
			if(flag==0){
				$.messager.alert('提示信息','<span class="mes">添加成功</span>','提示信息');
				$('#addpollOrSulfur').combobox('setValue', '');
				$('#addpollutant').combobox('setValue', '');
				$('#addviewPoint').combobox('setValue', '');
				$('#addgroupOrCity').combobox('setValue', '');
				$('#addtime').datetimespinner('setValue', '');
				$('#addcontent').val('');
				$('#addAnotationDialog').dialog('close');
			}
			else{
				$.messager.alert('error',data.Message,'error');
			}
		},
		error:function(){
			$.messager.alert('提示信息','<span class="mess">添加失败</span>','提示信息');
		}
	});	
}
/**
 * 批注基本信息页面
 * @return
 */
function annotationInfo(id){
	//alert(id);
	$('#editAnnotationDialog').show();
	//getPageTypeById(id);
	$.ajax({
		url:'../getAnnotationById',
		type:'post',
		data:{
			id:id
	    },
	    dataType:'json',
	    success:function(data){
	    	$('#epollOrSulfur').combobox('setValue',data.pollOrSulfur);
	    	$('#eviewPoint').combobox('setValue',data.groupOrCity);
	    	$('#etime').datetimespinner('setValue', data.month);
	    	$('#econtent').val(data.content);
	    	
	    	$("#epollOrSulfur").combobox({
	    		data:[{id:'1',value:'污染物'},{id:'2',value:'硫分'}], 
    			valueField:'id', 
    			textField:'value',
    			onLoadSuccess : function(data2){
	    	    	$('#epollOrSulfur').combobox('setValue',data.pollOrSulfur);
	    	    },
	    		onChange: function (n,o) {
	    		   if(n == "1"){
	    			   $('#epollutant').combobox({ 
	   	    			data:[{id:'SO2',value:'SO2'},{id:'NOx',value:'NOx'},{id:'dust',value:'烟尘'}], 
	   	    			valueField:'id', 
	   	    			textField:'value',
	   	    			onLoadSuccess : function(data1){
	   		    	    	$('#epollutant').combobox('setValue',data.pollutant);
	   		    	    }
	   	    		}); 
	    		   }else{
	    			   $('#epollutant').combobox({ 
	   	    			data:[{id:'liufen',value:'硫分'}], 
	   	    			valueField:'id', 
	   	    			textField:'value',
	   	    			onLoadSuccess : function(data2){
	   		    	    	$('#epollutant').combobox('setValue',data.pollutant);
	   		    	    }
	   	    		});
	    		   }
	    		}

	    		});
	    	
	    	/*if($('#epollOrSulfur').combobox('getValue')==1){
	    		$('#epollutant').combobox({ 
	    			data:[{id:'SO2',value:'SO2'},{id:'NOx',value:'NOx'},{id:'dust',value:'烟尘'}], 
	    			valueField:'id', 
	    			textField:'value',
	    			onLoadSuccess : function(data1){
		    	    	$('#epollutant').combobox('setValue',data.pollutant);
		    	    }
	    		}); 
	    	}
	    	else{
	    		$('#epollutant').combobox({ 
	    			data:[{id:'liufen',value:'硫分'}], 
	    			valueField:'id', 
	    			textField:'value',
	    			onLoadSuccess : function(data2){
		    	    	$('#epollutant').combobox('setValue',data.pollutant);
		    	    }
	    		}); 
	    	}*/
	    	$('#eviewPoint').combobox({ 
    			data:[{id:'2',value:'盟市'},{id:'1',value:'电力集团'}], 
    			valueField:'id', 
    			textField:'value',
    			onLoadSuccess : function(){
	    		     $('#eviewPoint').combobox('disable');
	    	    	$('#eviewPoint').combobox('setValue',data.groupOrCity);
	    	    },onChange: function (n,o) {
	    	    	if(n == "1"){
	    	    		$('#egroupOrCity').combobox({
	    		    	    url:'../getIndustryGroup',
	    		    	    valueField:'id',
	    		    	    textField:'groupName',
	    		    	    onLoadSuccess : function(data3){
	    		    	    	$('#egroupOrCity').combobox('setValue',data.groupIdOrCityId);
	    		    	    }
	    		    	});
	    	    	}else{
	    	    		$('#egroupOrCity').combobox({
	    		    	    url:'../getZoneCity',
	    		    	    valueField:'id',
	    		    	    textField:'cityName',
	    		    	    onLoadSuccess : function(data4){
	    		    	    	$('#egroupOrCity').combobox('setValue',data.groupIdOrCityId);
	    		    	    }
	    		    	});
	    	    	}
	    	    }
	    	    
    		});
	    	
	    	/*if($('#eviewPoint').combobox('getValue')=='1'){
	    		$('#egroupOrCity').combobox({
		    	    url:'../getIndustryGroup',
		    	    valueField:'id',
		    	    textField:'groupName',
		    	    onLoadSuccess : function(data3){
		    	    	$('#egroupOrCity').combobox('setValue',data.groupIdOrCityId);
		    	    }
		    	});
	    	}else{
	    		$('#egroupOrCity').combobox({
		    	    url:'../getZoneCity',
		    	    valueField:'id',
		    	    textField:'cityName',
		    	    onLoadSuccess : function(data4){
		    	    	$('#egroupOrCity').combobox('setValue',data.groupIdOrCityId);
		    	    }
		    	});
	    	}*/
	    	
	    },
	    error:function(){
	    	$.messager.alert('提示信息','<div style="height:50px;line-height:50px;margin-left:20px;">数据加载失败</div>','error');
	    }
	});
	$('#editAnnotationDialog').dialog({
		collapsible : false,
		minimizable : false,
		maximizable : false,
		draggable : true,
		modal : true,
		title:'批注信息编辑',
		top : 80,
		width:550,
		height:410,
		buttons : [ {
			text : '提交',
			handler : function() {
				editAnnotation(id);
			}
		}, {
			text : '取消',
			handler : function() {
				$('#editAnnotationDialog').dialog('close');
			}
		} ]
	});
}
/**
 * 编辑批注信息
 * @param date
 * @returns {String}
 */
function editAnnotation(id){
	var pollOrSulfur = $('#epollOrSulfur').combobox('getValue');
	var pollutant = $('#epollutant').combobox('getValue');
	var viewPoint = $('#eviewPoint').combobox('getValue');
	var groupIdOrCityId = $('#egroupOrCity').combobox('getValue');
	var time=$('#etime').datetimespinner('getValue');
	var content =$('#econtent').val();
	$.ajax( {
		type : 'post',
		url : '../editAnnotation',
		data : {
		    id : id,
		    pollutant:pollutant,
		    pollOrSulfur:pollOrSulfur,
		    viewPoint : viewPoint,
		    groupIdOrCityId : groupIdOrCityId,
		    time:time,
		    content : content
		},
		dataType : 'json',
		success : function(data) {
			var flag = data.flag;
			if (flag == 0) {
				$.messager.alert('提示信息', '<span class="mes">编辑成功</span>', '提示信息');
				$('#annotationTable').datagrid('reload');
				$('#editAnnotationDialog').dialog('close');
				queryAnotationData();
			}
		},
		error : function() {
			$.messager.alert('提示信息', '<span class="mess">编辑失败</span>', '提示信息');
		}
	});
}
		
/* * 日期格式化
 * @param {Object} date
 * @return {TypeName} 
 */
function myformatter(date) {
	if (!date) {
		return '';
	}
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	return y + '-' + (m < 10 ? ('0' + m) : m);
}

/**
 * 格式化日期选择框
 * @param {Object} s
 * @return {TypeName} 
 */
function myparser(s) {
	if (!s) {
		return null;
	}
	var ss = s.split('-');
	var y = parseInt(ss[0], 10);
	var m = parseInt(ss[1], 10);
	if (!isNaN(y) && !isNaN(m)) {
		return new Date(y, m - 1, 1);
	} else {
		return new Date();
	}
}
/**
 * 初始化日期控件
 */
function initDate() {
	var nowtime = new Date().getTime();
	$('#beginTime').find('input').val(utils.dateFormat(nowtime - 3600000 * 24 * 30, 'yyyy-MM'));
	$('#endTime').find('input').val(utils.dateFormat(nowtime, 'yyyy-MM'));
	$('.form_datetime').datetimepicker('update')

}

/**
 *  格式化 时间间隔
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 *//*
function formatNumber(val,row,index){
	if(val){
		return '<font color="green">'+val.toFixed(2)+'</font>';
	}else{
		return '<font color="green">0.00</font>';
	}
}

*//**
 *  格式化 时间间隔
 * @param {Object} val
 * @param {Object} row
 * @param {Object} index
 * @return {TypeName} 
 *//*
function formatSulfur(val,row,index){
	if(val){
		return '<font color="green">'+val.toFixed(2)+'%</font>';
	}else{
		return '<font color="green">0.00%</font>';
	}
	
}*/


