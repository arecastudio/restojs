const mod="data-pelunasan-detail";
const txnomor_meja=$('#txnomor-meja').val();

//$('.table-datax').DataTable();

$.fn.resetForms=function(){
    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','show');
    fdata.append('meja',txnomor_meja);
    
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
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}

$.fn.resetForms();
console.log('data-pelunasan-detail');
$('.money').simpleMoneyFormat();
