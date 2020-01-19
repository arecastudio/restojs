const mod='laporan-kasir';

console.log(mod);

function ExportTable(){
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

//$('#txtrx').val('2018-12-30');

$('#txtrx').on('change',function(){
    $('#id_rekap').html('');
});

$('#id_btnshow').on('click',function(){
    let tanggal=$('#txtrx').val();
    if(tanggal!=''){
	console.log(tanggal);
	let fdata=new FormData();
	fdata.append('mod',mod);
	fdata.append('act','show');
	fdata.append('tanggal',tanggal);

	$.ajax({
	    url:'backend/?',
	    method:'POST',
	    data:fdata,
	    contentType:false,
	    cache:false,
	    processData:false,
	    //contentType: 'multipart/form-data',
            success:function(resp){
		console.log(resp);
		let dx=JSON.parse(resp);
		console.table(dx);
		//ONLINE-------------------------------------------------
		let td='',i=0,ttl=0;
		for(let x in dx['rekap']){
		    i++;
		    //td+='';
		    td+='<tr>';
		    td+='<td>'+i+'</td>';
		    td+='<td>'+dx['rekap'][x]['jam']+'</td>';
		    td+='<td>'+dx['rekap'][x]['trx']+'</td>';
		    td+='<td>'+dx['rekap'][x]['meja']+'</td>';
		    td+='<td>'+dx['rekap'][x]['fharga']+'</td>';
		    td+='<td>'+dx['rekap'][x]['jumlah']+'</td>';
		    td+='<td>'+dx['rekap'][x]['ftotal']+'</td>';
		    td+='<td>'+dx['rekap'][x]['diskon']+'</td>';
		    td+='<td>'+dx['rekap'][x]['ftarif_meja']+'</td>';
		    //ttl=parseInt(dx['rekap'][x]['harga'])*parseInt(dx['rekap'][x]['jumlah']);
		    ttl=parseInt(dx['rekap'][x]['total']);
		    ttl=ttl+parseInt(dx['rekap'][x]['tarif_meja']);
		    td+='<td>'+formatDesimal(ttl)+'</td>';
		    td+='</tr>';
		}

		let tx='',ttx=0;
		i=0;		
		for(let x in dx['detail']){
		    i++;
		    //td+='';
		    tx+='<tr>';
		    tx+='<td>'+i+'</td>';		    
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
		    tx+='<td>'+dx['detail'][x]['diskon']+'</td>';
		    //ttx=parseInt(dx['detail'][x]['harga'])*parseInt(dx['detail'][x]['jumlah']);
		    //ttx=ttl+parseInt(dx['detail'][x]['tarif_meja']);
		    //tx+='<td>'+formatDesimal(ttx)+'</td>';
		    tx+='</tr>';
		}

		//OFFLINE-------------------------------------------------
		let tdo='';
		i=0;
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
		    ttl=parseInt(dx['rekap_online'][x]['gtotal']);
		    //ttl=ttl+parseInt(dx['rekap_online'][x]['tarif_meja']);
		    tdo+='<td>'+formatDesimal(ttl)+'</td>';
		    tdo+='</tr>';
		}

		let txo='';
		ttx=0;
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
		}
		
		showLaporanRekap(td,tx,tdo,txo);
            },
            error:function(xhr,status,error){
		console.log('getting data error');
            }
	});	
    }
});

function showLaporanRekap(xd,xt,xdo,xto){
    td='<br/>';
    /*
    td+='<strong>Laporan Bekap</strong><hr/>';
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
    td+='<th>Disc</th>';
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
    td+='<th>Disc</th>';
    td+='</tr>';
    td+='</thead>';
    td+='<tbody id="id_tbody_detail">';
    td+=xt;
    td+='</tbody>';
    td+='</table>';
    td+='</div>';
*/


//    td+='<br/>';
//    td+='<br/>';
//    td+='<br/>';
//    td+='<br/>';
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
    td+='<th>Disc %</th>';
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
//    td+='<th>Disc</th>';
    td+='</tr>';
    td+='</thead>';
    td+='<tbody id="id_tbody_detail_online">';
    td+=xto;
    td+='</tbody>';
    td+='</table>';
    td+='</div>';

    
    

    $('#id_rekap').html(td);

    ExportTable();
}
