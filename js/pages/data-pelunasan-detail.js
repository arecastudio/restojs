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

	    let dt='',i=0;
	    for(let d in dx){
		i++;
		dt+='<tr>';
		//dt+='<td>'+dx[d]['produk_id']+'</td>';
		dt+='<td>'+i+'</td>';
		dt+='<td>'+dx[d]['nama']+'</td>';
		dt+='<td>'+dx[d]['harga']+'</td>';
		dt+='<td>'+dx[d]['jumlah']+'</td>';
		dt+='<td>'+dx[d]['jumlah']+'</td>';
		dt+='<td>'+dx[d]['bungkus']+'</td>';
		dt+='<td>'+dx[d]['operator']+'</td>';
		dt+='</tr>';
	    }

	    $('#id_tbody').html(dt);
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}

$.fn.resetForms();
console.log('data-pelunasan-detail');
$('.money').simpleMoneyFormat();
