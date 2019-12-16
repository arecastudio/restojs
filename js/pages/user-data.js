const mod="user-data";
const mod_role="user-data-role";

$.fn.resetForms=function(){
    $('#form-add-new')[0].reset();
    $('#id-notice-content').hide();
    
    var table_url='backend/?data='+mod;
    $.ajax({
	url:table_url,
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);

	    let data='',i=0;
	    for(let x in dx){
		i++;
		data+='<tr>';
		data+='<td align="center">'+i+'&nbsp;</td>';
		data+='<td align="left">'+dx[x]['name']+'</td>';
		//data+='<td align="center">'+dx[x]['password']+'</td>';
		//data+='<td align="center">***</td>';
		data+='<td align="center">'+dx[x]['role']+'</td>';
		data+='<td align="center">';
		
		data+='<button class="btn-mod-edit" data-name="'+dx[x]['name']+'" data-pass="'+dx[x]['password']+'" data-role="'+dx[x]['role']+'" title="Edit">Edit</button>';
		if(dx[x]['role']!='admin'){
		    data+='&nbsp;';
		    data+='<button class="btn-mod-delete" data-name="'+dx[x]['name']+'" data-pass="'+dx[x]['password']+'" data-role="'+dx[x]['role']+'" title="Hapus">Hapus</button>';
		}		
		data+='</td>';
		data+='</tr>';
	    }
	    $('#id_tbody').html(data);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });//user-data

    
    $.ajax({
	url:'backend/?data='+mod_role,
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);

	    let data='',i=0;
	    data+='<option value="">----</option>';
	    for(let x in dx){
		i++;
		data+='<option value="'+dx[x]['id']+'">';
		data+=''+dx[x]['id'];
		data+='</option>';
	    }
	    $('.opt-role').html(data);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });//user-data-role
    
};


$.fn.resetForms();

$("#dialog-add-new").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 250,
    autoOpen: false
});

$("#dialog-edit").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 270,
    autoOpen: false
});

$("#dialog-delete").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 300,
    autoOpen: false
});

$('#btn-add-new').click(function(){
    $("#dialog-add-new").dialog('option', 'buttons', {
        "Submit" : function() {
            let name=$('#txnama').val();
	    let pass=$('#txpass').val();
	    let role=$('#opt_role').val();	    

	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','addnew');
	    fdata.append('name',name);
	    fdata.append('password',pass);
	    fdata.append('role',role);

	    console.log(fdata);

	    $.ajax({
		url:'backend/?',
		method:'POST',
		data:fdata,
		contentType:false,
		cache:false,
		processData:false,
		//contentType: 'multipart/form-data',
		success:function(resp){
		    console.log('message: '+resp);
		    $.fn.resetForms();
		    $('#id-notice-content').html(resp);
		    $('#id-notice-content').show();
		    
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });
	    
            $('#form-add-new')[0].reset();
            $(this).dialog("close");		  
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });
    $("#dialog-add-new").dialog("open");
});

$('#id_tbody').on('click','.btn-mod-edit',function(){
    let tname=$(this).attr('data-name');
    let tpass=$(this).attr('data-pass');
    let trole=$(this).attr('data-role');

    $('#txnama_edit').val(tname);
    $('#txpass_edit').val(tpass);
    $('#opt_role_edit').val(trole);

    $("#dialog-edit").dialog('option', 'buttons', {
        "Submit" : function() {
	    let name=$('#txnama_edit').val();
	    let pass=$('#txpass_edit').val();
	    let role=$('#opt_role_edit').val();

	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','edit');
	    fdata.append('name',name);
	    fdata.append('password',pass);
	    fdata.append('role',role);

	    console.log(fdata);

	    $.ajax({
		url:'backend/?',
		method:'POST',
		data:fdata,
		contentType:false,
		cache:false,
		processData:false,
		//contentType: 'multipart/form-data',
		success:function(resp){
		    console.log('message: '+resp);
		    $.fn.resetForms();
		    $('#id-notice-content').html(resp);
		    $('#id-notice-content').show();
		    
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });

	    $('#form-edit')[0].reset();
	    $(this).dialog("close");
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });
    $("#dialog-edit").dialog("open");	 
});

$('#id_tbody').on('click','.btn-mod-delete',function(){
    let name=$(this).attr('data-name');
    let role=$(this).attr('data-role');

    let msg="Yakin untuk hapus data ini?";
    msg+="<table>";
    msg+="<tr><td>Nama</td><td>"+name+"</td></tr>";
    msg+="<tr><td>Role</td><td>"+role+"</td></tr>";
    msg+="</table>";

    $('#msg-delete').html(msg);	 

    $("#dialog-delete").dialog('option', 'buttons', {
        "Submit" : function() {

	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','delete');
	    fdata.append('name',name);
	    //fdata.append('password',pass);
	    fdata.append('role',role);

	    console.log(fdata);

	    $.ajax({
		url:'backend/?',
		method:'POST',
		data:fdata,
		contentType:false,
		cache:false,
		processData:false,
		//contentType: 'multipart/form-data',
		success:function(resp){
		    console.log('message: '+resp);
		    $.fn.resetForms();
		    $('#id-notice-content').html(resp);
		    $('#id-notice-content').show();
		    
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });
	    
	    $(this).dialog("close");
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });
    $("#dialog-delete").dialog("open");	 
});
