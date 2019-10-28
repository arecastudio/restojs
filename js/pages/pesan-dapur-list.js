const mod="pesan-dapur-list";

//$('.money').toLocaleString();
console.log(mod);

$("#dialog-edit").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 270,
    autoOpen: false
});

$.fn.resetForms=function(){
    //$('#form-add-new')[0].reset();
    $('#id-notice-content').hide();

    var table_url='backend/?data='+mod;
    $.ajax({
        url:table_url,
        method:'GET',
        success:function(resp){
	    let dx=JSON.parse(resp);	    
	    //console.table(dx);
	    let td='',i=0;
	    for(let x in dx){
		i++;
		td+='<tr>';
		td+='<td>'+i+'</td>';
		td+='<td>'+dx[x]['meja']+'</td>';
		td+='<td>'+dx[x]['nama']+'</td>';
		td+='<td>'+dx[x]['jumlah']+'</td>';		
		td+='<td>'+dx[x]['jam']+'</td>';
		td+='<td class="txcenter">'+dx[x]['bungkus']+'</td>';
		if(dx[x]['status_siap']=='SDH'){
		    td+='<td class="txsudah">'+dx[x]['status_siap']+'</td>';
		}else{
		    td+='<td class="txbelum">'+dx[x]['status_siap']+'</td>';
		}		
		td+='<td class="txcenter"><button class="btnubah" title="Ubah status" data-produkid="'+dx[x]['id']+'" data-pesananid="'+dx[x]['pesanan_id']+'" data-meja="'+dx[x]['meja']+'" data-bungkus="'+dx[x]['bungkus']+'">&#8630;</button></td>';
		td+='</tr>';
	    }
	
	    $('#id_tbody').html(td);
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}


$.fn.resetForms();


$('#id_tbody').on('click','.btnubah',function(){
    let produk_id=$(this).attr('data-produkid');
    let pesanan_id=$(this).attr('data-pesananid');
    let meja=$(this).attr('data-meja');
    let bungkus=$(this).attr('data-bungkus');

    console.log('------------------------------------');
    console.log('produk_id: '+produk_id);
    console.log('pesanan_id: '+pesanan_id);
    console.log('meja: '+meja);
    console.log('bungkus: '+bungkus);


    $("#dialog-edit").dialog('option', 'buttons', {
        "Submit" : function() {

	    let updatedSiap=$('#optsiap_edit').val();
	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','ubah');
	    fdata.append('produk_id',produk_id);
	    fdata.append('pesanan_id',pesanan_id);
	    fdata.append('meja',meja);
	    fdata.append('bungkus',bungkus);
	    fdata.append('batal','TIDAK');
	    fdata.append('siap',updatedSiap);
	    
	    $.ajax({
		url:'backend/?',
		method:'POST',
		data:fdata,
		contentType:false,
		cache:false,
		processData:false,
		//contentType: 'multipart/form-data',
		success:function(resp){
		    //console.log(resp);
		    let dx=JSON.parse(resp);
		    console.table(dx);

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
    $("#dialog-edit").dialog("open");
    
});
