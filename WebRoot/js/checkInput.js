/*
utils for check user input
*/


var inputLength = 64;
//input only can be numbers and check length
function onlyNumberAndLength(input, name){
   var reg = new RegExp("^[0-9]*$");    
    if(!reg.test(input)){
		$.messager.alert('提示', name + '输入必须是数字！', 'info');
		return false;
    }else{
        if(input.length > inputLength){
		$.messager.alert('提示', name + '长度不能大于'+inputLength+"!", 'info');
		return false;
		}
	}
    return true;
}

//input only can be Chinese and check length
function onlyChineseAndLength(input, name ){
    var reg = new RegExp("^[\u4e00-\u9fa5]+$");    
    if(!reg.test(input)){
		$.messager.alert('提示',name +  '输入必须是中文！', 'info');
		return false;
    }else{
        if(input.length > inputLength){
		$.messager.alert('提示', name + '长度不能大于' +inputLength+"!", 'info');
		return false;
		}
	} 
    return true;
}


//input only alphabet and check length
function onlyAlphabetAndLength(input,name){
    var reg = new RegExp("^[A-Za-z]+$");    
    if(!reg.test(input)){
		$.messager.alert('提示', name + '输入必须是字母！', 'info');
		return false;
    }else{
        if(input.length > inputLength){
		$.messager.alert('提示', name + '长度不能大于'+inputLength+"!", 'info');
		return false;
		}
	}
    return true;
}

//input can be Chinese , number and constrict length
function onlyChineseAndNumbersAndLength(input, name){
    var reg = new RegExp("^[\u4e00-\u9fa50-9]+$");    
    if(!reg.test(input)){
		$.messager.alert('提示', name + '输入必须是中文和数字', 'info');
		return false;
    }else{
        if(input.length > inputLength){
		$.messager.alert('提示', name + '长度不能大于'+inputLength+"!", 'info');
		return false;
		}
	}
    return true;
}

//input can be Chinese ,alphabet and constrict input length
function  onlyChineseAndAlphabet(input, name ){
    var reg = new RegExp("^[\u4e00-\u9fa5A-Za-z]+$");    
    if(!reg.test(input)){
		$.messager.alert('提示', name + '输入必须是中文和字母', 'info');
		return false;
    }else{
        if(input.length > inputLength){
		$.messager.alert('提示',name +  '长度不能大于'+inputLength+"!", 'info');
		return false;
		}
	}
    return true;
}

//input can be numbers ,alphabet and constrict input length
function onlyNumbersAndAlphabet(input, name){
    var reg = new RegExp("^[A-Za-z0-9]+$");    
    if(!reg.test(input)){
		$.messager.alert('提示', name + '输入必须是数字和字母！', 'info');
		return false;
    }else{
        if(input.length > inputLength){
		$.messager.alert('提示', name + '长度不能大于'+inputLength+"!", 'info');
		return false;
		}
	}
    return true;
}

//input can be all just check length
function onlyCheckLength(input, name){
        if(input.length > inputLength){
		$.messager.alert('提示', name +'长度不能大于'+inputLength+"!", 'info');
		return false;
		}
        return true;
}

//input can be all just check date ****-**-**
function onlyCheckDateMonth(input){
	var reg = new RegExp("[0-9]{4}-[0-9]{2}");    
    if(!reg.test(input) || !input.trim().length == 7){
		$.messager.alert('提示', '日期格式必须为 xxxx - xx ', 'info');
		return false;
    }
    return true;
}


//input can be all just check date ****-**
function onlyCheckDateDay(input){
	var reg = new RegExp("[0-9]{4}-[0-9]{2}-[0-9]{2}");    
    if(!reg.test(input) || !input.trim().length == 10){
		$.messager.alert('提示', '日期格式必须为 xxxx - xx - xx ', 'info');
		return false;
    }
    return true;
}

function checkYear(input){
	var reg = new RegExp("[1-9][0-9]{3}");
	if (!reg.test(input)){
		$.messager.alert('提示', '请输入正确年份格式,如：2012', 'info')
		return false
	}
	return true
}

$(document).ready(function() {
	var nowtime = new Date().getTime();
	$('.form_datetime').find('input').blur(function() {
		if (!onlyCheckDateMonth($(this).val())) {
			$(this).val(utils.dateFormat(nowtime, 'yyyy-MM'))
			$(this).parent('.form_datetime').datetimepicker('update')
		}
	})
})

/**
 * easyui textbox 统一验证长度
 * @return
 */
function checkAllLength(){
	 $(".easyui-textbox").textbox({
		onChange:function(){
		 onlyCheckLength($(this).val(),'');
    }})
}