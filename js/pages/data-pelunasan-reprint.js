const mod="reprint";
console.log(mod);

$('.txtanggal').datepicker();
$('.txtanggal').datepicker('option','dateFormat','yy-mm-dd');


$('#id_btnproses').on('click',function(){
    let tanggal=$('#id_txtanggal').val();
    let nomor=$('#id_txnomor').val();
    
    if(nomor!='' && tanggal!=''){
	let fdata=new FormData();
	fdata.append('mod',mod);
	fdata.append('act','reprint');
	fdata.append('tanggal',tanggal);
	fdata.append('nomor',nomor);

	//console.log('tanggal: '+tanggal+', nomor: '+nomor);

	$.ajax({
	    url:'backend/?',
	    method:'POST',
	    data:fdata,
	    contentType:false,
	    cache:false,
	    processData:false,
	    //contentType: 'multipart/form-data',
	    success:function(resp){
		console.log('hasil dari server ');
		//let dx=JSON.parse(resp);	    
		//console.table(dx);
		console.log(resp);	
	    },
	    error:function(xhr,status,error){
		console.log('getting data error');
	    }
	});
	
    }
    
});
