const mod='ubah-order';
console.log(mod);

$("#dialog-edit").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 600,
    height: 400,
    autoOpen: false
});

$.fn.resetForms=function(){
    $('#id-notice-content').hide();
    $.ajax({
        url:'backend/?data='+mod,
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);

	    let td='',i=0;
	    for(let x in dx){
		i++;
		//td+='';
		td+='<tr>';
		//td+='<td class="txcenter">'+i+'</td>';
		td+='<td class="txcenter">'+dx[x]['meja']+'</td>';
		//td+='<td class="txcenter">'+dx[x]['waktu']+'</td>';
		td+='<td>'+dx[x]['produks']+'</td>';
		td+='<td class="txcenter"><button class="btnubah" data-meja="'+dx[x]['meja']+'" >&larr;</button></td>';
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
    let meja=$(this).attr('data-meja');
    console.log('Edit meja: '+meja);

    //bof kirim data
    //let datax=JSON.stringify(data_dipilih);
    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','show');
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
	    console.log('hasil dari server');
	    let dx=JSON.parse(resp);	    
	    //console.table(dx);
	    //console.log(resp);
	    let td='',i=0;
	    for(let x in dx){
		i++;
		//td+='';
		td+='<tr>';
		td+='<td class="txcenter">'+i+'</td>';
		td+='<td class="txcenter">'+dx[x]['id']+'</td>';
		td+='<td>'+dx[x]['nama']+'</td>';
		td+='<td class="txcenter">'+dx[x]['jumlah']+'</td>';
		td+='<td class="txcenter">'+dx[x]['harga']+'</td>';	
		td+='<td class="txcenter">'+dx[x]['bungkus']+'</td>';
		td+='<td class="txcenter"><button class="btndel" data-meja="'+dx[x]['meja']+'" >&times;</button>&nbsp;';
		td+='<button class="btnmin" data-meja="'+dx[x]['meja']+'" >&minus;</button><td/>';
		td+='</tr>';
	    }

	    $('#id_ubahtbody').html(td);
	    $("#dialog-edit").dialog("open");
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    //eof kirim data
});
