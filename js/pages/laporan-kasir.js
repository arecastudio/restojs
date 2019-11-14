const mod='laporan-kasir';

console.log(mod);

function ExportTable(){
    $("#id_table_rekap_transaksi_kasir").tableExport({
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
		    ttl=parseInt(dx['rekap'][x]['harga'])*parseInt(dx['rekap'][x]['jumlah']);
		    ttl=ttl+parseInt(dx['rekap'][x]['tarif_meja']);
		    td+='<td>'+formatDesimal(ttl)+'</td>';
		    td+='</tr>';
		}
		showLaporanRekap(td);
            },
            error:function(xhr,status,error){
		console.log('getting data error');
            }
	});	
    }
});

function showLaporanRekap(xd){
    td='<br/>';
    td+='<strong>Rekap Transaksi</strong>';
    td+='<div class="data-view">';
    td+='<table border="0" class="table-data" id="id_table_rekap_transaksi_kasir">';
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

    $('#id_rekap').html(td);

    ExportTable();
}
