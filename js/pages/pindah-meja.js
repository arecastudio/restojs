const mod='pindah-meja';
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
    $('#id_optmeja_kosong').html('<option value="">Pilih</option>');
    
    var table_url='backend/?data='+mod;
    $.ajax({
        url:table_url,
        method:'GET',
        success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);
	    let td='';
	    for(let x in dx['terisi']){
		td+='<option value="'+dx['terisi'][x]['meja']+'">';
		td+=dx['terisi'][x]['meja'];
		td+='</option>';
	    }
	    $('#id_optmeja').append(td);
	    
	    td='';
	    for(let x in dx['kosong']){
		td+='<option value="'+dx['kosong'][x]['meja']+'">';
		td+=dx['kosong'][x]['meja'];
		td+='</option>';
	    }
	    $('#id_optmeja_kosong').append(td);
	    
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}


$.fn.resetForms();



$('#id_btntutup').on('click',function(){
    let meja_awal=$('#id_optmeja').val();
    let meja_akhir=$('#id_optmeja_kosong').val();

    if(meja_awal!='' && meja_awal!=''){
	let msg="Yakin untuk pindah meja ini?";
	msg+="<table>";
	msg+="<tr><td>Dari Meja</td><td>"+meja_awal+"</td></tr>";
	msg+="<tr><td>Ke Meja</td><td>"+meja_akhir+"</td></tr>";
	msg+="</table>";

	$('#msg-delete').html(msg);	 

	$("#dialog-delete").dialog('option', 'buttons', {
            "Submit" : function() {

		let fdata=new FormData();
		fdata.append('mod',mod);
		fdata.append('act','edit');
		fdata.append('meja_awal',meja_awal);
		fdata.append('meja_akhir',meja_akhir);

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
