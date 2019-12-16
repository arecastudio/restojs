$(document).ready(function () {
    const mod="login-user";
    $('#notif').hide();

    $('#id_username').focus();

    $('#id_username').on("keypress", function(e) {
        if (e.keyCode == 13) {
            //alert("Enter pressed");
	    $('#id_password').focus();
            return false; // prevent the button click from happening
        }
    });

    $('#id_password').on("keypress", function(e) {
        if (e.keyCode == 13) {
            //alert("Enter pressed");
	    $('#id_btnlogin').trigger('click');
            return false; // prevent the button click from happening
        }
    });
    
    
    $('#id_btnlogin').on('click',function(){
	//console.log(mod);
	let uname=$('#id_username').val();
	let upass=$('#id_password').val();	

	if (uname.trim()!='' && upass.trim()!=''){
	    //console.log('user name: '+uname.trim());
	    //console.log('user pass: '+upass.trim());

	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','auth');
	    fdata.append('username',uname.trim());
	    fdata.append('password',upass.trim());

	    //console.log(fdata);

	    $.ajax({
		url:'backend/?',
		method:'POST',
		data:fdata,
		contentType:false,
		cache:false,
		processData:false,
		//contentType: 'multipart/form-data',
		success:function(resp){
		    let dx=JSON.parse(resp);
		    //console.table(dx);
		    //console.log(resp);
		    if(dx['status']=='success'){
			//window.location.replace(dx['url']);//this will clear the PHP session
			//window.location.assign(dx['url']);//will keep the PHP session
			window.location.href=dx['url'];//will keep the PHP session
		    }else{
			$('#notif').html(dx['msg']);
			$('#notif').show();
		    }
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });
	    
	}
    });
    
});

