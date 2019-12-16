const mod="reprint-order";
console.log(mod);

$('.txtanggal').datepicker();
$('.txtanggal').datepicker('option','dateFormat','yy-mm-dd');

$.fn.resetForms=function(){
    
    $('#id_optmeja').html('<option value="">Pilih</option>');
    
    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','show');
    
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

	    let ed='',j=0;
	    for(let e in dx){
		j++;
		ed+='<option value="'+dx[e]['meja']+'">';
		ed+=dx[e]['meja'];
		ed+='</option>';
	    }
	    $('#id_optmeja').append(ed);
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}

$.fn.resetForms();


$('#id_btnproses').on('click',function(){    
    let nomor=$('#id_optmeja').val();
    
    if(nomor!=''){
	let fdata=new FormData();
	fdata.append('mod',mod);
	fdata.append('act','reprint');
	fdata.append('meja',nomor);

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
