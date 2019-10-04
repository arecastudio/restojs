$.fn.resetForms=function(){
    $.ajax({
	url:'backend/?data=logout',
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    window.location.replace(dx['url']);
	},
	error:function(xhr,status,error){
            console.log('getting data error');
	}
    });
}

$.fn.resetForms();
