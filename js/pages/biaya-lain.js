const mod='biaya-lain';

$.fn.resetForms=function(){
   // $('#form-add-new')[0].reset();
    //$('#id-notice-content').hide();
    
    var table_url='backend/?data='+mod;
    $.ajax({
	url:table_url,
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.log(dx[0]['waktu']);
	    $('#id_waktu').html(dx[0]['waktu']);
	    $('#id_ppn').html(dx[0]['ppn']);
	    $('#id_service').html(dx[0]['service']);

	    $('#btn-mod-edit').attr('data-waktu',dx[0]['waktu']);
	    $('#btn-mod-edit').attr('data-ppn',dx[0]['ppn']);
	    $('#btn-mod-edit').attr('data-service',dx[0]['service']);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
};


$.fn.resetForms();

$("#dialog-edit").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 270,
    autoOpen: false
});


$('#btn-mod-edit').on('click',function(){
    //console.log('hahahah');
    let twaktu=$(this).attr('data-waktu');
    let tppn=$(this).attr('data-ppn');
    let tservice=$(this).attr('data-service');

    $('#txppn_edit').val(tppn);
    $('#txservice_edit').val(tservice);
    $('#txwaktu_edit').val(twaktu);

    $("#dialog-edit").dialog('option', 'buttons', {
        "Submit" : function() {
	    let ppn=$('#txppn_edit').val();
	    let service=$('#txservice_edit').val();
	    let waktu=$('#txwaktu_edit').val();

	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    //fdata.append('act','edit');
	    //must be an addnew method, it only get the last inserted data
	    fdata.append('act','addnew');
	    fdata.append('waktu',waktu);
	    fdata.append('ppn',ppn);
	    fdata.append('service',service);
	    console.log('ppn: '+ppn+'\n');
	    console.log('service: '+service+'\n');
	    console.log('waktu: '+waktu+'\n');
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
