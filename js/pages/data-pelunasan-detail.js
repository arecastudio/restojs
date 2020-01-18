const mod="data-pelunasan-detail";
const txnomor_meja=$('#txnomor-meja').val();
var public_grand_total_static=0;
var public_grand_total=0;
var public_data_pesan=[];
var home_url='http://localhost:8010/';
var global_discount=0;

//$('.table-datax').DataTable();
//$('#id_btnlunaskan').attr('disabled','true');
//$('#id_btnlunaskan').removeAttr('disabled');

function formatDesimal(nilai){
    nilai+='';
    let val=nilai.split(',').join();

    vals=val.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g),",");
    return vals;
}


$('#id_optdiskon').html(
    ()=>{
	let i=0,prs='';
	for(i=0;i<=70;i++){
	    prs+=`<option value=${i}>${i}</option>`;
	}
	return prs;
    }
);

$('#id_optdiskon').on('change',(e)=>{
    let nilai_diskon=parseInt(e.target.value);
    global_discount=nilai_diskon;
    //console.log(nilai_diskon+' OK');

    
    //$('#id_ctunai').trigger('click');
    //$('#id_cnontunai').trigger('click');

    //disable and reset tunai entry
    $('#id_txtunai').val('0');
    $('#id_txtunai').attr('disabled','true');
    $('#id_btnpastetunai').attr('disabled','true');
    $('#id_ctunai').prop('checked',false);

    //disable and reset non-tunai entry
    $('#id_txnontunai').val('0');
    $('#id_txnontunai').attr('disabled','true');
    $('#id_txnoedc').val('');
    $('#id_txnoedc').attr('disabled','true');
    $('#id_optbank').val('');
    $('#id_optbank').attr('disabled','true');
    $('#id_btnpastenontunai').attr('disabled','true');
    $('#id_cnontunai').prop('checked',false);


    let harga_diskon=public_grand_total_static-((nilai_diskon/100)*public_grand_total_static);
    public_grand_total=harga_diskon;
    //console.log(harga_diskon);

    $('#id_txgtotal').html(formatDesimal(harga_diskon));
    $('#id_txbilang').html(terbilang(harga_diskon));

    $('#id_kembali').html('-'+formatDesimal(harga_diskon))

    if(harga_diskon>=500000){
	$('#id_chkpotensial').prop('checked',true);
    }else{
	//$('#id_chkpotensial').removeAttr('checked');
	$('#id_chkpotensial').prop('checked',false);
    }

    
});


$("#dialog-success").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 300,
    autoOpen: false,
    close:function(){
	window.location.replace(home_url);
    },
    buttons:{
	/*'Re-print Struk':function(){
	    console.log('cetak struk OK !');
	},*/
	'Tutup':function(){
	    $(this).dialog('close');
	}
    }
});

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
	    //console.table(dx);

	    let ed='',j=0;
	    for(let e in dx['edc']){
		j++;
		ed+='<option value="'+dx['edc'][e]['nama']+'">';
		ed+=dx['edc'][e]['nama'];
		ed+='</option>';
	    }
	    $('#id_optbank').append(ed);

	    //public_data_pesan=dx['pesanan'];
	    let dt='',i=0,total=0,grandtotal=0;
	    for(let d in dx['pesanan']){
		public_data_pesan.push({
		    'pesanan_id':dx['pesanan'][d]['pesanan_id'],
                    'produk_id':dx['pesanan'][d]['produk_id'],
                    'nama':dx['pesanan'][d]['nama'],
                    'harga':dx['pesanan'][d]['harga'],
                    'kategori_id':dx['pesanan'][d]['karegori_id'],
                    'jumlah':dx['pesanan'][d]['jumlah'],
                    'waktu':dx['pesanan'][d]['waktu'],
                    'operator':dx['pesanan'][d]['operator'],
                    'bungkus':dx['pesanan'][d]['bungkus'],
                    'batal':dx['pesanan'][d]['batal'],
                    'status':dx['pesanan'][d]['status'],
                    'siap':dx['pesanan'][d]['siap'],
                    'waktu_siap':dx['pesanan'][d]['waktu_siap'],
		});
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
		dt+='<td align="center">'+dx['pesanan'][d]['siap']+'</td>';
		dt+='</tr>';
	    }
	    let just_total=grandtotal;

	    grandtotal=grandtotal+parseInt(dx['tarif']);
	    public_grand_total=grandtotal;
	    public_grand_total_static=grandtotal;

	    if(grandtotal>=500000){
		$('#id_chkpotensial').attr('checked','checked');
	    }else{
		$('#id_chkpotensial').removeAttr('checked');
	    }
	    
	    home_url=dx['url']+'?ref=payment';

	    $('#id_tbody').html(dt);
	    $('#id_txtotal').html(formatDesimal(just_total));
	    $('#id_txgtotal').html(formatDesimal(grandtotal));
	    $('#id_txbmeja').html(formatDesimal(dx['tarif']));
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
    let p_status=$('#id_chkpotensial').is(':checked');
    let potensial=0;
    if(p_status==true){
	potensial=1;
    }
    //vals=total.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g),",");
    vals=formatDesimal(total);
    console.log('button lunaskan clicked: '+vals+', arraylength: '+public_data_pesan.length+', potensial: '+p_status);
    //console.log('test fungsi: '+formatDesimal('2500000'));


    let datax=JSON.stringify(public_data_pesan);
    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','pay');
    fdata.append('data',datax);
    fdata.append('meja',txnomor_meja);
    fdata.append('biaya_meja',$('#id_txbmeja').text());
    fdata.append('tunai',$('#id_txtunai').val());
    fdata.append('nontunai',$('#id_txnontunai').val());
    fdata.append('bank',$('#id_optbank').val());
    fdata.append('edc',$('#id_txnoedc').val());
    fdata.append('grandtotal',public_grand_total);
    fdata.append('kembali',$('#id_kembali').text());
    fdata.append('potensial',potensial);
    fdata.append('discount',global_discount);

    $.ajax({
	url:'backend/?',
	method:'POST',
	data:fdata,
	contentType:false,
	cache:false,
	processData:false,
	//contentType: 'multipart/form-data',
	success:function(resp){
	    console.log('hasil dari server '+resp);
	    let dx=JSON.parse(resp);	    
	    //console.table(dx);
	    console.log(resp);
	    if(dx['error']=='0'){
		//window.location.replace(dx['url']);

		let msgs=dx['desc'];
		$('#msg-success').html(msgs);
		
		$('#dialog-success').dialog('open');

		
	    }else{
		console.log(dx['desc']);
	    }
	},
	error:function(xhr,status,error){
	    console.log('getting data error');

	    //$('#txnote').val('');	    
	    //$.fn.resetForms();	    
	}
    });
    

    //$('#dialog-success').dialog('open');
});
