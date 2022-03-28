const mod="data-menu";

$('.money').simpleMoneyFormat();

$.fn.resetForms=function(){
    $('#form-add-new')[0].reset();
    $('#id-notice-content').hide();
    $('.img-preview').attr('src','images/no-image-available.png');

    var table_url='backend/?data='+mod;
    $.ajax({
        url:table_url,
	method:'GET',
	success:function(resp){

	    let dx=JSON.parse(resp);
	    //console.table(dx);

	    let td='',i=0
	    for(let x in dx){
		i++;
		td+='';
		td+='<tr>';
		td+='<td align="center">'+i+'</td>';
		td+='<td>'+dx[x]['nama']+'</td>';
		td+='<td align="center">'+dx[x]['kategori']+'</td>';
		td+='<td align="right">'+dx[x]['fharga']+'</td>';
		td+='<td align="center"><a href="foto/'+dx[x]['gambar']+'" target="_blank" title="Klik di sini untul melihat gambar ukuran penuh !">Lihat</a></td>';
		td+='<td align="center"><button class="btn-mod-edit" data-id="'+dx[x]['id']+'" data-nama="'+dx[x]['nama']+'" data-kategori="'+dx[x]['kategori']+'" data-harga="'+dx[x]['harga']+'" data-gambar="'+dx[x]['gambar']+'" data-kategoriid="'+dx[x]['kategori_id']+'">Edit</button></td>';
		//td+='<td align="center">'+dx[x]['id']+'</td>';
		td+='<td align="center"><button class="btn-mod-delete" data-id="'+dx[x]['id']+'" data-nama="'+dx[x]['nama']+'" data-kategori="'+dx[x]['kategori']+'" data-harga="'+dx[x]['harga']+'" data-gambar="'+dx[x]['gambar']+'" data-kategoriid="'+dx[x]['kategori_id']+'">Hapus</button></td>';
		td+='</tr>';
	    }
	    
	    $('#id_tbody').html(td);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });

    var opt_url='backend/?data=opt-kat-menu';
    $.ajax({
        url:opt_url,
	method:'GET',
	success:function(resp){
	    $('.optkat-menu').html(resp);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });	 	 
}

$.fn.resetForms();

$('#txfilter').on('keyup',function(){
    let val=$(this).val();
    console.log(val);
    //alert('fungsi sedang dalam pengembangan !');
});     

$("#dialog-add-new").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 550,
    height: 450,
    autoOpen: false
});

$("#dialog-edit").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 550,
    height: 450,
    autoOpen: false
});

$("#dialog-delete").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 450,
    autoOpen: false
});

$('#btn-add-new').click(function(){
    $.fn.resetForms();
    $("#dialog-add-new").dialog('option', 'buttons', {
        "Submit" : function() {
	    let nama=$('#txnama').val();
	    let kategori=$('#optkategori').val();
	    let harga=$('#txharga').val().replace(',','');
	    //let gambar=$('#flgambar').val();
	    let gambar=$('#flgambar').prop('files')[0];

	    data={
		'mod':mod,
		'act':'addnew',
		'nama':nama,
		'kategori':kategori,
		'harga':harga,
	    };

	    fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','addnew');
	    fdata.append('nama',nama);
	    fdata.append('kategori',kategori);
	    fdata.append('harga',harga);
	    //fdata.append('gambar',gambar);
	    
	    if($('#flgambar')[0].files.length){
		if (gambar['type']!='image/jpeg' && gambar['type']!='image/png'){
		    console.log('bukan gambar');
		    
		}else{
		    if(gambar['size']>500000){
			console.log('gambar lebih besar dari 500KB');
		    }else{
			console.log('foto perfect !');
			data['gambar']=gambar;
			fdata.append('gambar',gambar);
		    }
		}		     
	    }
	    
	    console.log(data);
	    
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
    //$.fn.resetForms();
    let tid=$(this).attr('data-id');
    let tnama=$(this).attr('data-nama');
    let tharga=$(this).attr('data-harga');
    let tgambar=$(this).attr('data-gambar');
    let tkatid=$(this).attr('data-kategoriid');

    $('#txid_edit').val(tid);
    $('#txnama_edit').val(tnama);
    $('#txharga_edit').val(tharga);
    //$('#txgambar_edit').val(tgambar);
    $('#preview_edit').attr('src','foto/'+tgambar);
    $('#optkategori_edit').val(tkatid);

    $("#dialog-edit").dialog('option', 'buttons', {
        "Submit" : function() {
	    //let id=tid;
	    let nama=$('#txnama_edit').val();
	    let kategori=$('#optkategori_edit').val();
	    let harga=$('#txharga_edit').val().replace(',','');
	    //let gambar=$('#flgambar').val();
	    let gambar=$('#flgambar_edit').prop('files')[0];

	    data={
		'mod':mod,
		'act':'edit',
		'id':tid,
		'nama':nama,
		'kategori':kategori,
		'harga':harga,
	    };

	    fdata=new FormData();		 
	    fdata.append('mod',mod);
	    fdata.append('act','edit');
	    fdata.append('id',tid);
	    fdata.append('nama',nama);
	    fdata.append('kategori',kategori);
	    fdata.append('harga',harga);
	    //fdata.append('gambar',gambar);
	    
	    if($('#flgambar_edit')[0].files.length){
		if (gambar['type']!='image/jpeg' && gambar['type']!='image/png'){
		    console.log('bukan gambar');
		    
		}else{
		    if(gambar['size']>500000){
			console.log('gambar lebih besar dari 500KB');
		    }else{
			console.log('foto perfect !');
			data['gambar']=gambar;
			fdata.append('gambar',gambar);
		    }
		}		     
	    }
	    
	    console.log(data);

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
    let tid=$(this).attr('data-id');
    let tnama=$(this).attr('data-nama');
    let tharga=$(this).attr('data-harga');
    let tgambar=$(this).attr('data-gambar');
    let tkat=$(this).attr('data-kategori');

    let msg="Yakin untuk hapus data ini?";
    msg+="<table>";
    msg+="<tr><td>Nama</td><td>"+tnama+"</td></tr>";
    msg+="<tr><td>Harga</td><td>"+tharga+"</td></tr>";
    msg+="<tr><td>Kategori</td><td>"+tkat+"</td></tr>";
    msg+="<tr><td colspan=\"2\"><img width=\"200px\" height=\"200px\" src=\"foto/"+tgambar+"\" /></td></tr>";
    msg+="</table>";

    $('#msg-delete').html(msg);	 

    $("#dialog-delete").dialog('option', 'buttons', {
        "Submit" : function() {

	    data={
		'mod':mod,
		'act':'delete',
		'id':tid,
	    };

	    fdata=new FormData();		 
	    fdata.append('mod',mod);
	    fdata.append('act','delete');
	    fdata.append('id',tid);

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
