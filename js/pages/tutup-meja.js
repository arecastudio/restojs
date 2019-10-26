const mod='tutup-meja';
console.log(mod);

$("#dialog-delete").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 300,
    autoOpen: false
});


$.fn.resetForms=function(){

    $('#id_optmeja').html('<option value="">Pilih</option>');
    
    var table_url='backend/?data='+mod;
    $.ajax({
        url:table_url,
        method:'GET',
        success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);
	    let td='';
	    for(let x in dx){
		td+='<option value="'+dx[x]['meja']+'">';
		td+=dx[x]['meja'];
		td+='</option>';
	    }
	    $('#id_optmeja').append(td);
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}


$.fn.resetForms();



$('#id_btntutup').on('click',function(){
    let meja=$('#id_optmeja').val();

    if(meja!=''){
	let msg="Yakin untuk tutup meja ini?";
	msg+="<table>";
	msg+="<tr><td>Nomor Meja</td><td>"+meja+"</td></tr>";
	msg+="</table>";

	$('#msg-delete').html(msg);	 

	$("#dialog-delete").dialog('option', 'buttons', {
            "Submit" : function() {

		let fdata=new FormData();
		fdata.append('mod',mod);
		fdata.append('act','delete');
		fdata.append('meja',meja);

		$.ajax({
		    url:'backend/?',
		    method:'POST',
		    data:fdata,
		    contentType:false,
		    cache:false,
		    processData:false,
		    //contentType: 'multipart/form-data',
		    success:function(resp){
			//console.log('hasil dari server');
			//let dx=JSON.parse(resp);	    
			//console.table(dx);
			console.log(resp);
			$.fn.resetForms();
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
    }
    	 
});
