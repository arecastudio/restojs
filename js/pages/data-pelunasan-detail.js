const mod="data-pelunasan-detail";
const txnomor_meja=$('#txnomor-meja').val();

//$('.table-datax').DataTable();
//$('#id_btnlunaskan').attr('disabled','true');
//$('#id_btnlunaskan').removeAttr('disabled');

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

	    let ed='',j=0;
	    for(let e in dx['edc']){
		j++;
		ed+='<option value="'+dx['edc'][e]['id']+'">';
		ed+=dx['edc'][e]['nama'];
		ed+='</option>';
	    }
	    $('#id_optbank').append(ed);

	    let dt='',i=0,total=0,grandtotal=0;
	    for(let d in dx['pesanan']){
		i++;
		dt+='<tr>';
		//dt+='<td>'+dx['pesanan'][d]['produk_id']+'</td>';
		dt+='<td align="center">'+i+'</td>';
		dt+='<td>'+dx['pesanan'][d]['nama']+'</td>';
		dt+='<td align="right">'+dx['pesanan'][d]['harga']+'</td>';
		dt+='<td align="right">'+dx['pesanan'][d]['jumlah']+'</td>';
		total=parseInt(dx['pesanan'][d]['harga'])*parseInt(dx['pesanan'][d]['jumlah']);
		grandtotal+=total;
		dt+='<td align="right">'+total+'</td>';
		if(dx['pesanan'][d]['bungkus']=='TIDAK'){
		    bungkus='&times;';
		}else{
		    bungkus='&#10004;';
		}
		dt+='<td align="center">'+bungkus+'</td>';
		//dt+='<td align="center">'+dx['pesanan'][d]['bungkus']+'</td>';
		dt+='<td align="center">'+dx['pesanan'][d]['operator']+'</td>';
		dt+='</tr>';
	    }

	    grandtotal=grandtotal+parseInt(dx['tarif']);

	    $('#id_tbody').html(dt);
	    $('#id_txgtotal').html('Rp. '+(grandtotal));
	    $('#id_txbmeja').html('Rp. '+dx['tarif']);
	    $('#id_txbilang').html(terbilang(grandtotal));
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}

$.fn.resetForms();
console.log('data-pelunasan-detail');
$('.money').simpleMoneyFormat();


$('#id_ctunai').on('click',function(){
    let _status=$(this).is(':checked');
    console.log('tunai: '+_status);

    if(_status==true){
	$('#id_txtunai').removeAttr('disabled');
    }else{
	$('#id_txtunai').val('0');
	$('#id_txtunai').attr('disabled','true');
    }
});

$('#id_cnontunai').on('click',function(){
    let _status=$(this).is(':checked');
    console.log('tunai: '+_status);

    if(_status==true){
	$('#id_txnontunai').removeAttr('disabled');
	$('#id_txnoedc').removeAttr('disabled');
	$('#id_optbank').removeAttr('disabled');
    }else{
	$('#id_txnontunai').val('0');
	$('#id_txnontunai').attr('disabled','true');
	$('#id_txnoedc').val('');
	$('#id_txnoedc').attr('disabled','true');
	$('#id_optbank').val('');
	$('#id_optbank').attr('disabled','true');
    }
});
