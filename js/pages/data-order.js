const mod="data-order";
var table_url='backend/?data='+mod;
$.ajax({
    url:table_url,
    method:'GET',
    success:function(resp){
	let dx=JSON.parse(resp);
	//console.table(dx);
	let div='';
	for(let x in dx){
	    if(dx[x]['status']=='KOSONG'){
		div+='<div class="sub-menu-tables" data-nomor="'+dx[x]['nomor']+'">';
		div+='<center>';
		div+='<strong>'+dx[x]['nomor']+'</strong>';
		div+='<br/>';
		div+='<img src="images/data-meja.png"/>';
		div+='<br/>';
		div+='<small>'+dx[x]['status']+'</small>';
		div+='</center>';
		div+='</div>';
	    }else{
		div+='<div class="sub-menu-tables" data-nomor="'+dx[x]['nomor']+'" style="border:1px solid red;">';
		div+='<center>';
		div+='<strong>'+dx[x]['nomor']+'</strong>';
		div+='<br/>';
		div+='<img src="images/meja-terisi.png"/>';
		div+='<br/>';
		div+='<small>'+dx[x]['status']+'</small>';
		div+='</center>';
		div+='</div>';
	    }
	}
	$('#id_tbody').html(div);
    },
    error:function(xhr,status,error){
	console.log('getting data error');
    }    
});


$('#content').on('click','.sub-menu-tables',function(){
    let nomor=$(this).attr('data-nomor');
    console.log('Nomor: '+nomor);
    $('#txnomor').val(nomor);
    $('#form-meja')[0].submit();
});

