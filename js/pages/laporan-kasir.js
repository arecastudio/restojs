const mod='laporan-kasir';

console.log(mod);

function ExportTable(){

    $("#id_table_daily").tableExport({
	headers: true,
	footers: true,
	//formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
	formats: ["xls"],
	filename: "id",
	bootstrap: false,
	exportButtons: true,
	position: "top",
	ignoreRows: null,
	ignoreCols: null,
	trimWhitespace: true,
	RTL: false,
	sheetname: "id"   
    });
    
    $("#id_table_rekap").tableExport({
	headers: true,
	footers: true,
	//formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
	formats: ["xls"],
	filename: "id",
	bootstrap: false,
	exportButtons: true,
	position: "top",
	ignoreRows: null,
	ignoreCols: null,
	trimWhitespace: true,
	RTL: false,
	sheetname: "id"   
    });

    $("#id_table_detail").tableExport({
	headers: true,
	footers: true,
	//formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
	formats: ["xls"],
	filename: "id",
	bootstrap: false,
	exportButtons: true,
	position: "top",
	ignoreRows: null,
	ignoreCols: null,
	trimWhitespace: true,
	RTL: false,
	sheetname: "id"   
    });

    $("#id_table_rekap_online").tableExport({
	headers: true,
	footers: true,
	//formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
	formats: ["xls"],
	filename: "id",
	bootstrap: false,
	exportButtons: true,
	position: "top",
	ignoreRows: null,
	ignoreCols: null,
	trimWhitespace: true,
	RTL: false,
	sheetname: "id"   
    });

    $("#id_table_detail_online").tableExport({
	headers: true,
	footers: true,
	//formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
	formats: ["xls"],
	filename: "id",
	bootstrap: false,
	exportButtons: true,
	position: "top",
	ignoreRows: null,
	ignoreCols: null,
	trimWhitespace: true,
	RTL: false,
	sheetname: "id"   
    });
    
}

function formatDesimal(nilai){
    nilai+='';
    let val=nilai.split(',').join();

    vals=val.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g),",");
    return vals;
}

$('.txtanggal').datepicker();
$('.txtanggal').datepicker('option','dateFormat','yy-mm-dd');


$('#tb-daily').hide();
$('#notifikasi').hide()

//$('#txtrx').val('2018-12-30');

$('#txtrx').on('change',function(){
    $('#id_rekap').html('');
});

$('#txtawal').on('change',function(){
    $('#id_rekap').html('');
    $('#txtakhir').val('');
});

$('#txtakhir').on('change',function(){
    $('#id_rekap').html('');
});

$('#id_btnshow').on('click',function(){
    $('#id_rekap').html('');
    $('#notifikasi').show();
    let jenis=$("input:radio[name=radio-type]:checked").val();
    //let tanggal=$('#txtrx').val();
    //if(tanggal!=''){
    console.log(`jenis:${jenis}`);
    let fdata=new FormData();
    //fdata.append('mod',mod);
    //fdata.append('act','show');
    //fdata.append('tanggal',tanggal);


    if(jenis=='harian'){
	$('#span-harian').css('display','inline');
	//harus reset hingga di tabel
	$('#txtawal').val('');
	$('#txtakhir').val('');
	$('#span-bulanan').css('display','none');

	let txtrx=$('#txtrx').val();
	//console.log('Tanggal: '+txtrx);
	
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

	fdata.append('mod',mod);
	fdata.append('act','bulanan');
	fdata.append('tawal',tawal);
	fdata.append('takhir',takhir);
    }
    

    $.ajax({
	url:'backend/?',
	method:'POST',
	data:fdata,
	contentType:false,
	cache:false,
	processData:false,
	//contentType: 'multipart/form-data',
        success:function(resp){
	    $('#notifikasi').hide();
	    console.log(resp);
	    let dx=JSON.parse(resp);
	    console.table(dx);
	    //ONLINE-------------------------------------------------
	    let td='',i=0,ttl=0;
	    let [tdHarga,tdJumlah,tdTotal,tdDiskon,tdTMeja,tdGTotal]=Array(6).fill(0);//assign all variable with 0 by Array Fill method
	    
	    for(let x in dx['rekap']){
		i++;
		//td+='';
		td+='<tr>';
		td+='<td align="center">'+i+'</td>';
		td+='<td align="center">'+dx['rekap'][x]['jam']+'</td>';
		td+='<td align="center">'+dx['rekap'][x]['trx']+'</td>';
		td+='<td align="center">'+dx['rekap'][x]['meja']+'</td>';
		td+='<td align="right">'+dx['rekap'][x]['fharga']+'</td>';tdHarga+=parseInt(dx['rekap'][x]['harga']);
		td+='<td align="right">'+dx['rekap'][x]['jumlah']+'</td>';tdJumlah+=parseInt(dx['rekap'][x]['jumlah']);
		td+='<td align="right">'+dx['rekap'][x]['ftotal']+'</td>';tdTotal+=parseInt(dx['rekap'][x]['total']);
		td+='<td align="center">'+dx['rekap'][x]['diskon']+'</td>';tdDiskon+=parseInt(dx['rekap'][x]['diskon']);
		td+='<td align="right">'+dx['rekap'][x]['ftarif_meja']+'</td>';tdTMeja+=parseInt(dx['rekap'][x]['tarif_meja']);
		//ttl=parseInt(dx['rekap'][x]['harga'])*parseInt(dx['rekap'][x]['jumlah']);
		ttl=parseInt(dx['rekap'][x]['gtotal']);tdGTotal+=parseInt(dx['rekap'][x]['gtotal']);
		//ttl=ttl+parseInt(dx['rekap'][x]['tarif_meja']);
		td+='<td align="right">'+formatDesimal(ttl)+'</td>';
		td+='</tr>';
	    }
	    //additional for Online Recap Summary
	    td+='<tr height="50" valign="middle">';
	    td+='<td align="center" colspan="4"><strong>Summary</strong></td>';
	    td+='<td align="right">'+formatDesimal(tdHarga)+'</td>';
	    td+='<td align="right">'+formatDesimal(tdJumlah)+'</td>';
	    td+='<td align="right">'+formatDesimal(tdTotal)+'</td>';
	    td+='<td align="center">'+formatDesimal(tdDiskon)+'</td>';
	    td+='<td align="right">'+formatDesimal(tdTMeja)+'</td>';
	    td+='<td align="right">'+formatDesimal(tdGTotal)+'</td>';
	    td+='</tr>';

	    

	    let tx='',ttx=0;
	    i=0;		
	    for(let x in dx['detail']){
		i++;
		//td+='';
		tx+='<tr>';
		tx+='<td align="center">'+i+'</td>';		    
		tx+='<td>'+dx['detail'][x]['trx']+'</td>';
		tx+='<td>'+dx['detail'][x]['meja']+'</td>';
		tx+='<td>'+dx['detail'][x]['menu']+'</td>';
		tx+='<td>'+dx['detail'][x]['fharga']+'</td>';
		tx+='<td>'+dx['detail'][x]['jumlah']+'</td>';
		tx+='<td>'+dx['detail'][x]['ftotal']+'</td>';
		tx+='<td>'+dx['detail'][x]['bungkus']+'</td>';
		tx+='<td>'+dx['detail'][x]['jam']+'</td>';
		tx+='<td>'+dx['detail'][x]['op']+'</td>';
		tx+='<td>'+dx['detail'][x]['kategori']+'</td>';
		//tx+='<td>'+dx['detail'][x]['diskon']+'</td>';
		//ttx=parseInt(dx['detail'][x]['harga'])*parseInt(dx['detail'][x]['jumlah']);
		//ttx=ttl+parseInt(dx['detail'][x]['tarif_meja']);
		//tx+='<td>'+formatDesimal(ttx)+'</td>';
		tx+='</tr>';
	    }

	    //OFFLINE-------------------------------------------------
	    let tdo='';
	    /*i=0;
	      ttl=0;
	      for(let x in dx['rekap_online']){
	      i++;
	      //td+='';
	      tdo+='<tr>';
	      tdo+='<td>'+i+'</td>';
	      tdo+='<td>'+dx['rekap_online'][x]['jam']+'</td>';
	      tdo+='<td>'+dx['rekap_online'][x]['trx']+'</td>';
	      tdo+='<td>'+dx['rekap_online'][x]['meja']+'</td>';
	      tdo+='<td>'+dx['rekap_online'][x]['fharga']+'</td>';
	      tdo+='<td>'+dx['rekap_online'][x]['jumlah']+'</td>';
	      tdo+='<td>'+dx['rekap_online'][x]['ftotal']+'</td>';
	      tdo+='<td>'+dx['rekap_online'][x]['diskon']+'</td>';
	      tdo+='<td>'+dx['rekap_online'][x]['ftarif_meja']+'</td>';
	      //ttl=parseInt(dx['rekap_online'][x]['harga'])*parseInt(dx['rekap_online'][x]['jumlah']);
	      ttl=parseInt(dx['rekap_online'][x]['total']);
	      ttl=ttl+parseInt(dx['rekap_online'][x]['tarif_meja']);
	      tdo+='<td>'+formatDesimal(ttl)+'</td>';
	      tdo+='</tr>';
	      }*/

	    let txo='';
	    /*ttx=0;
	      i=0;		
	      for(let x in dx['detail_online']){
	      i++;
	      //td+='';
	      txo+='<tr>';
	      txo+='<td>'+i+'</td>';		    
	      txo+='<td>'+dx['detail_online'][x]['trx']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['meja']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['menu']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['fharga']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['jumlah']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['ftotal']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['bungkus']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['jam']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['op']+'</td>';
	      txo+='<td>'+dx['detail_online'][x]['kategori']+'</td>';
	      //txo+='<td>'+dx['detail_online'][x]['diskon']+'</td>';
	      //ttx=parseInt(dx['detail'][x]['harga'])*parseInt(dx['detail'][x]['jumlah']);
	      //ttx=ttl+parseInt(dx['detail'][x]['tarif_meja']);
	      //tx+='<td>'+formatDesimal(ttx)+'</td>';
	      txo+='</tr>';
	      }*/

	    if(jenis=='bulanan'){
		//tdo alihkan untuk data harian, bukan lagi laporan online
		tdo='';i=0;
		let [tdoJumlah,tdoGTotal]=Array(2).fill(0);//assign all variable with 0 by Array Fill method
		
		for(let x in dx['data_harian']){
		    i++;
		    tdo+='';
		    tdo+='<tr>';
		    tdo+='<td align="right">'+i+'&nbsp;</td>';
		    tdo+='<td align="center">'+dx['data_harian'][x]['tgl']+'</td>';
		    tdo+='<td align="right">'+dx['data_harian'][x]['fjml_order']+'</td>';tdoJumlah+=parseInt(dx['data_harian'][x]['jml_order']);
		    tdo+='<td align="right">'+dx['data_harian'][x]['fgtotal']+'</td>';tdoGTotal+=parseInt(dx['data_harian'][x]['gtotal']);
		}
		//additional for Online Recap Summary
		tdo+='<tr height="50" valign="middle">';
		tdo+='<td align="center" colspan="2"><strong>Summary</strong></td>';	    
		tdo+='<td align="right">'+formatDesimal(tdoJumlah)+'</td>';	    
		tdo+='<td align="right">'+formatDesimal(tdoGTotal)+'</td>';
		tdo+='</tr>';
		//$('#id_tbody_daily').html(td);
	    }
	    
	    
	    
	    showLaporanRekap(td,tx,tdo,txo);
        },
        error:function(xhr,status,error){
	    console.log('getting data error');
        }
    });	
    //}
});

function showLaporanRekap(xd,xt,xdo,xto){
    let jenis=$("input:radio[name=radio-type]:checked").val();
    
    td='<br/>';
    if(jenis=='bulanan'){
	td+='<div class="table-report" id="tb-daily">';
	td+='<strong>Transaksi Per-Hari</strong>';
	td+='<div class="data-view">';
	td+='<table border="0" class="table-data" id="id_table_daily">';
	td+='<thead>';
	td+='<tr>';
	td+='<th>#</th>';
	td+='<th>Tgl</th>';
	td+='<th>Jml Trx</th>';
	td+='<th>G. Total</th>';
	td+='</tr>';
	td+='</thead>';
	td+='<tbody id="id_tbody_daily">';
	td+=xdo;
	td+='</tbody>';
	td+='</table>';
	td+='</div>';
	td+='</div>';
	
	td+='<br/>';
    }
    
    
    //td+='<strong>Laporan Bekap</strong><hr/>';
    td+='<strong>Rekap Transaksi</strong>';
    td+='<div class="data-view">';
    td+='<table border="0" class="table-data" id="id_table_rekap">';
    td+='<thead>';
    td+='<tr>';
    td+='<th>#</th>';
    td+='<th>Jam</th>';
    td+='<th>Trx</th>';
    td+='<th>Meja</th>';
    td+='<th>Harga</th>';
    td+='<th>Jml</th>';
    td+='<th>Sub Total</th>';
    td+='<th>Disc %</th>';
    td+='<th>T. Meja</th>';
    td+='<th>Total</th>';
    td+='</tr>';
    td+='</thead>';
    td+='<tbody id="id_tbody_rekap">';
    td+=xd;
    td+='</tbody>';
    td+='</table>';
    td+='</div>';
    
    td+='<br/>';
    td+='<br/>';
    td+='<strong>Detail Transaksi</strong>';
    td+='<div class="data-view">';
    td+='<table border="0" class="table-data" id="id_table_detail">';
    td+='<thead>';
    td+='<tr>';
    td+='<th>#</th>';
    td+='<th>Trx</th>';
    td+='<th>Meja</th>';
    td+='<th>Menu</th>';
    td+='<th>Harga</th>';
    td+='<th>Jml</th>';
    td+='<th>Total</th>';
    td+='<th>Bngks</th>';
    td+='<th>Jam</th>';
    td+='<th>Pelayan</th>';
    td+='<th>Kategori</th>';
    //    td+='<th>Disc</th>';
    td+='</tr>';
    td+='</thead>';
    td+='<tbody id="id_tbody_detail">';
    td+=xt;
    td+='</tbody>';
    td+='</table>';
    td+='</div>';


    /*
      td+='<br/>';
      td+='<br/>';
      td+='<br/>';
      td+='<br/>';
      td+='<strong>Laporan Online</strong><hr/>';
      td+='<strong>Rekap Transaksi</strong>';
      td+='<div class="data-view">';
      td+='<table border="0" class="table-data" id="id_table_rekap_online">';
      td+='<thead>';
      td+='<tr>';
      td+='<th>#</th>';
      td+='<th>Jam</th>';
      td+='<th>Trx</th>';
      td+='<th>Meja</th>';
      td+='<th>Harga</th>';
      td+='<th>Jml</th>';
      td+='<th>Sub Total</th>';
      td+='<th>Disc</th>';
      td+='<th>T. Meja</th>';
      td+='<th>Total</th>';
      td+='</tr>';
      td+='</thead>';
      td+='<tbody id="id_tbody_rekap_online">';
      td+=xdo;
      td+='</tbody>';
      td+='</table>';
      td+='</div>';
      
      td+='<br/>';
      td+='<br/>';
      td+='<strong>Detail Transaksi</strong>';
      td+='<div class="data-view">';
      td+='<table border="0" class="table-data" id="id_table_detail_online">';
      td+='<thead>';
      td+='<tr>';
      td+='<th>#</th>';
      td+='<th>Trx</th>';
      td+='<th>Meja</th>';
      td+='<th>Menu</th>';
      td+='<th>Harga</th>';
      td+='<th>Jml</th>';
      td+='<th>Total</th>';
      td+='<th>Bngks</th>';
      td+='<th>Jam</th>';
      td+='<th>Pelayan</th>';
      td+='<th>Kategori</th>';
      td+='<th>Disc</th>';
      td+='</tr>';
      td+='</thead>';
      td+='<tbody id="id_tbody_detail_online">';
      td+=xto;
      td+='</tbody>';
      td+='</table>';
      td+='</div>';
    */
    

    $('#id_rekap').html(td);

    ExportTable();
}



$.fn.showResult=function(){
    let jenis=$("input:radio[name=radio-type]:checked").val();
    //console.log('Jenisnya: '+jenis);
    //$('#id_tbody').html('');
    //$('#id_tbody_rekap').html('');
    //$('#id_tbody_daily').html('');
    //$('#box-chart').hide();
    $('#id_rekap').html('');
    $('#id_caution').hide();
    if(jenis=='harian'){
	$('#span-harian').css('display','inline');
	//harus reset hingga di tabel
	$('#txtawal').val('');
	$('#txtakhir').val('');
	$('#span-bulanan').css('display','none');
	//$('#tb-daily').hide();
	$('#id_caution').hide();
    }else{
	//reset hingga di tabel
	$('#txtrx').val('');
	$('#span-harian').css('display','none');	
	$('#span-bulanan').css('display','inline');
	//$('#tb-daily').show();
	$('#id_caution').show();
    }
}

$('.rtype').on('click',function(){    
    //let jenis=$(this).val();
    $.fn.showResult();
});

window.onload=function(){
    $.fn.showResult();
}
