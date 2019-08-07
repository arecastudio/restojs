const mod="laporan-bulanan";

$('.txtanggal').datepicker();
$('.txtanggal').datepicker('option','dateFormat','yy-mm-dd');

$('#btn-show').on('click',function(){
    let jenis=$("input:radio[name=radio-type]:checked").val();
    //console.log('Jenisnya: '+jenis);

    let data={};
    let fdata=new FormData();

    if(jenis=='harian'){
	$('#span-harian').css('display','inline');
	//harus reset hingga di tabel
	$('#txtawal').val('');
	$('#txtakhir').val('');
	$('#span-bulanan').css('display','none');

	let txtrx=$('#txtrx').val();
	//console.log('Tanggal: '+txtrx);

	data={
	    'mod':mod,
	    'act':'harian',
	    'tanggal':txtrx,
	}
	fdata.append('mod',mod);
	fdata.append('act','harian');
	fdata.append('tanggal',txtrx);
    }else{
	//reset hingga di tabel
	$('#txtrx').val('');
	$('#span-harian').css('display','none');	
	$('#span-bulanan').css('display','inline');

	let tawal=$('#txtawal').val();
	let takhir=$('#txtakhir').val();
	//console.log('Tgl awal: '+tawal);
	//console.log('Tgl akhir: '+takhir);

	data={
	    'mod':mod,
	    'act':'bulanan',
	    'tawal':tawal,
	    'takhir':takhir,
	}
	fdata.append('mod',mod);
	fdata.append('act','bulanan');
	fdata.append('tawal',tawal);
	fdata.append('takhir',takhir);
    }

    //console.log(data);
    //console.log('mod data: '+mod);
    $.ajax({
	url:'backend/?',
	method:'POST',
	data:fdata,
	contentType:false,
	cache:false,
	processData:false,
	//contentType: 'multipart/form-data',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    
	    //console.table(dx['data_tabel']);
	    
	    //$('#id-notice-content').show();


	    let td='',i=0,gtotal=0,bungkus='&times;';;
	    for(let x in dx['data_tabel']){
		i++;
		td+='';
		td+='<tr>';
		td+='<td align="right">'+i+'&nbsp;</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['trx']+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['meja']+'</td>';
		td+='<td>'+dx['data_tabel'][x]['menu']+'</td>';
		td+='<td align="right">'+dx['data_tabel'][x]['fharga']+'</td>';
		td+='<td align="right">'+dx['data_tabel'][x]['jumlah']+'</td>';
		td+='<td align="right">'+dx['data_tabel'][x]['ftotal']+'</td>';
		if(dx['data_tabel'][x]['bungkus']=='TIDAK'){
		    bungkus='&times;';
		}else{
		    bungkus='&#10004;';
		}
		td+='<td align="center">'+bungkus+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['jam']+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['op']+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['kategori']+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['diskon']+'&nbsp;%</td>';
		td+='</tr>';
		gtotal+=parseInt(dx['data_tabel'][x]['total']);
	    }
	    /*td+='<tr>';
	    td+='<th colspan="4" align="right">Grand Total (Rp.):</th>';
	    td+='<th colspan="3" align="right">'+gtotal+'</th>';
	    td+='<th colspan="5">&nbsp;</th>';
	    td+='</tr>';*/
	    $('#id_tbody').html(td);
	    
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    
});

$.fn.showResult=function(){
    let jenis=$("input:radio[name=radio-type]:checked").val();
    //console.log('Jenisnya: '+jenis);
    $('#id_tbody').html('');

    if(jenis=='harian'){
	$('#span-harian').css('display','inline');
	//harus reset hingga di tabel
	$('#txtawal').val('');
	$('#txtakhir').val('');
	$('#span-bulanan').css('display','none');	
    }else{
	//reset hingga di tabel
	$('#txtrx').val('');
	$('#span-harian').css('display','none');	
	$('#span-bulanan').css('display','inline');
    }
}

$('.rtype').on('click',function(){    
    //let jenis=$(this).val();
    $.fn.showResult();
});

window.onload=function(){
    $.fn.showResult();
}
