const mod="data-order-langsung";
var table_url='backend/?data='+mod;
$.ajax({
    url:table_url,
    method:'GET',
    success:function(resp){
	$('#id_tbody').html(resp);
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

