const mod='ubah-order';
console.log(mod);

$("#dialog-edit").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 700,
    height: 500,
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
		td+='<td class="txcenter"><button class="btndel" data-meja="'+dx[x]['meja']+'" data-id="'+dx[x]['id']+'" data-produk="'+dx[x]['produk_id']+'" data-bungkus="'+dx[x]['bungkus']+'" data-jumlah="'+dx[x]['jumlah']+'" >&times;</button>&nbsp;';
		td+='<button class="btnmin" data-meja="'+dx[x]['meja']+'" data-id="'+dx[x]['id']+'" data-produk="'+dx[x]['produk_id']+'" data-bungkus="'+dx[x]['bungkus']+'" data-jumlah="'+dx[x]['jumlah']+'" >&minus;</button><td/>';
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


$('#id_ubahtbody').on('click','.btndel',function(){
    let meja=$(this).attr('data-meja');
    let id=$(this).attr('data-id');
    let produk=$(this).attr('data-produk');
    let bungkus=$(this).attr('data-bungkus');
    
    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','del');
    fdata.append('meja',meja);
    fdata.append('id',id);
    fdata.append('produk_id',produk);
    fdata.append('bungkus',bungkus);

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
	    console.log(resp);
	    //update id_ubahtbody
	    $('#dialog-edit').dialog("close");
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    //eof kirim data
    $.fn.resetForms();
});


$('#id_ubahtbody').on('click','.btnmin',function(){
    let meja=$(this).attr('data-meja');
    let id=$(this).attr('data-id');
    let produk=$(this).attr('data-produk');
    let bungkus=$(this).attr('data-bungkus');
    let jumlah=$(this).attr('data-jumlah');
    jumlah=parseInt(jumlah);
    if(jumlah>1){
	jumlah--;
    }
    console.log('jumlah: '+jumlah);
    
    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','min');
    fdata.append('meja',meja);
    fdata.append('id',id);
    fdata.append('produk_id',produk);
    fdata.append('bungkus',bungkus);
    fdata.append('jumlah',jumlah);

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
	    console.log(resp);
	    //update id_ubahtbody
	    $('#dialog-edit').dialog("close");
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    //eof kirim data
    $.fn.resetForms();
});
