var mod="laporan-transaksi";

array_bulan={
    1:'Januari',
    2:'Februari',
    3:'Maret',
    4:'April',
    5:'Mei',
    6:'Juni',
    7:'Juli',
    8:'Agustus',
    9:'September',
    10:'Oktober',
    11:'November',
    12:'Desember',
};

$('.txtanggal').datepicker();
$('.txtanggal').datepicker('option','dateFormat','yy-mm-dd');


$('#notifikasi').hide();
//console.log(array_bulan[1]);
$('#id_tampilan').html('');

let opt='';
for(let x in array_bulan){
    opt+='<option value="'+x+'">'+array_bulan[x]+'</option>';    
}
$('#id_optbulan').html(opt);


$('#id_btnshow').on('click',function(){
    $('#notifikasi').show();
    //let tahun=$('#id_opttahun').val();
    //let bulan=$('#id_optbulan').val();
    
    let tawal=$('#txtawal').val();
    let takhir=$('#txtakhir').val();
    let nama_file_xls='laporan_pajak_'+tawal+'_'+takhir;
    
    //console.log('Tahun: '+tahun+', Bulan: '+bulan);
    $('#id_tampilan').html('');

    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','show');
    //fdata.append('tahun',tahun);
    //fdata.append('bulan',bulan);
    fdata.append('tawal',tawal);
    fdata.append('takhir',takhir);

    //console.log(fdata);

    $.ajax({
	url:'backend/?',
	method:'POST',
	data:fdata,
	contentType:false,
	cache:false,
	processData:false,
	//contentType: 'multipart/form-data',
	success:function(resp){
	    //console.log('message: '+resp);
	    $('#notifikasi').hide();
	    let dx=JSON.parse(resp);
	    //console.table(dx);
	    let tr='',i=0,_ppn=0;
	    for(let x in dx){
		_ppn+=parseInt(dx[x]['ppn']);
		i++;
		tr+='<tr>';
		tr+='<td align="right">'+i+'</td>';
		tr+='<td align="center">'+dx[x]['id']+'</td>';
		tr+='<td align="right">'+dx[x]['ftanggal']+'</td>';		
		tr+='<td align="right">'+dx[x]['total_ppn']+'</td>';
		tr+='<td align="right">'+dx[x]['total_non_ppn']+'</td>';
		tr+='<td align="right">'+dx[x]['ppn']+'</td>';
//.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")		
		//td+='<td align="right">'+_ppn.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'</td>';
		tr+='<td align="right">'+_ppn+'</td>';
		tr+='</tr>';
	    }
	    //$('#id_tbody').html(tr);
	    let tabel='<table border="1" class="table-datax" id="'+nama_file_xls+'" style="border-collapse:collapse;"><thead><tr><th>#</th><th>Trx ID</th><th>Tanggal</th><th>Total Harga Termasuk PPN</th><th>Total Harga Tanpa PPN</th><th>PPN 10%</th><th>Jml PPN</th></tr></thead><tbody>';
	    tabel+=tr;
	    tabel+='</tbody></table>';
	    $('#id_tampilan').html(tabel);
	    ExportTable();
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    
});


$.ajax({
    url:'backend/?data='+mod,
    method:'GET',
    success:function(resp){	
	let dx=JSON.parse(resp);
	//console.log(dx);
	let tahuns='';
	for(let x in dx){
	    tahuns+='<option value="'+dx[x]['tahun']+'">'+dx[x]['tahun']+'</option>';
	}
	$('#id_opttahun').html(tahuns);
    },
    error:function(xhr,status,error){
	console.log('getting data error');
    }    
});


$('#id_btnPrint').on('click',function(){
    console.log('Print Raporan Tax');
    //$('#id_tableTex').tableExport();
});


function ExportTable(){
    $("table").tableExport({
	headers: true,                      // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
	footers: true,                      // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
	//formats: ["xlsx", "csv", "txt"],    // (String[]), filetype(s) for the export, (default: ['xlsx', 'csv', 'txt'])
	formats: ["xls"],
	filename: "id",                     // (id, String), filename for the downloaded file, (default: 'id')
	bootstrap: false,                   // (Boolean), style buttons using bootstrap, (default: true)
	exportButtons: true,                // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
	position: "top",                 // (top, bottom), position of the caption element relative to table, (default: 'bottom')
	ignoreRows: null,                   // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
	ignoreCols: null,                   // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
	trimWhitespace: true,               // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
	RTL: false,                         // (Boolean), set direction of the worksheet to right-to-left (default: false)
	sheetname: "id"   
    });
}
