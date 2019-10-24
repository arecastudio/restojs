const mod="data-pelunasan-detail";
const txnomor_meja=$('#txnomor-meja').val();
var public_grand_total=0;

//$('.table-datax').DataTable();
//$('#id_btnlunaskan').attr('disabled','true');
//$('#id_btnlunaskan').removeAttr('disabled');

function formatDesimal(nilai){
    nilai+='';
    let val=nilai.split(',').join();

    vals=val.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g),",");
    return vals;
}

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
		dt+='<td align="right">'+formatDesimal(dx['pesanan'][d]['harga'])+'</td>';
		dt+='<td align="right">'+dx['pesanan'][d]['jumlah']+'</td>';
		total=parseInt(dx['pesanan'][d]['harga'])*parseInt(dx['pesanan'][d]['jumlah']);
		grandtotal+=total;
		dt+='<td align="right">'+formatDesimal(total)+'</td>';
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
	    public_grand_total=grandtotal;	    

	    $('#id_tbody').html(dt);
	    $('#id_txgtotal').html('Rp. '+(grandtotal));
	    $('#id_txbmeja').html('Rp. '+dx['tarif']);
	    $('#id_txbilang').html(terbilang(grandtotal));
	    val=''+grandtotal;
	    vals=formatDesimal(val);
	    $('#id_kembali').html('-'+vals)
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
	$('#id_btnpastetunai').removeAttr('disabled');
    }else{
	$('#id_txtunai').val('0');
	$('#id_txtunai').attr('disabled','true');
	$('#id_btnpastetunai').attr('disabled','true');	
    }

    $('#id_txtunai').trigger('keyup');
    $.fn.updateKembali();
    
});

$('#id_cnontunai').on('click',function(){
    let _status=$(this).is(':checked');
    console.log('tunai: '+_status);

    if(_status==true){
	$('#id_txnontunai').removeAttr('disabled');
	$('#id_txnoedc').removeAttr('disabled');
	$('#id_optbank').removeAttr('disabled');	
	$('#id_btnpastenontunai').removeAttr('disabled');
    }else{
	$('#id_txnontunai').val('0');
	$('#id_txnontunai').attr('disabled','true');
	$('#id_txnoedc').val('');
	$('#id_txnoedc').attr('disabled','true');
	$('#id_optbank').val('');
	$('#id_optbank').attr('disabled','true');
	$('#id_btnpastenontunai').attr('disabled','true');
    }

    $('#id_txnontunai').trigger('keyup');
    $.fn.updateKembali();

});


$('#id_btnpastetunai').on('click',function(){
    let ntun=$('#id_txnontunai').val().split(',').join('');
    console.log(ntun);
    let hasil=public_grand_total-parseInt(ntun);
    $('#id_txtunai').val(hasil);
    $('#id_txtunai').trigger('keyup');
});

$('#id_btnpastenontunai').on('click',function(){
    let tun=$('#id_txtunai').val().split(',').join('');
    console.log(tun);
    let hasil=public_grand_total-parseInt(tun);
    $('#id_txnontunai').val(hasil);
    $('#id_txnontunai').trigger('keyup');
});

$('#id_txtunai').on('keyup',function(){
    let val1=$(this).val().split(',').join('');
    let val2=$('#id_txnontunai').val().split(',').join('');
    let vals=parseInt(val1)+parseInt(val2);
    let res=vals-public_grand_total;
    console.log('nontunai: '+res);
    val=''+res;
    vals=formatDesimal(val);
    $('#id_kembali').html(vals);
});

$('#id_txnontunai').on('keyup',function(){
    let val1=$(this).val().split(',').join('');
    let val2=$('#id_txtunai').val().split(',').join('');
    let vals=parseInt(val1)+parseInt(val2);
    let res=vals-public_grand_total;
    console.log('tunai: '+res);
    val=''+res;
    vals=formatDesimal(val);
    $('#id_kembali').html(vals);
});

$('#id_kembali').on('DOMSubtreeModified',function(){
    $.fn.updateKembali();
});


$.fn.updateKembali=function(){
    let val=$('#id_kembali').text().split(',').join('');
    if(parseInt(val)>=0){
	$('#id_btnlunaskan').removeAttr('disabled');
    }else{
	$('#id_btnlunaskan').attr('disabled','true');
    }

    //val='2000';

    //vals=val.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g),",");
    //console.log('lunaskan: '+vals);    
}

$('#id_btnlunaskan').on('click',function(){
    let total=''+public_grand_total;
    //vals=total.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g),",");
    vals=formatDesimal(total);
    console.log('button lunaskan clicked: '+vals);
    //console.log('test fungsi: '+formatDesimal('2500000'));
});
