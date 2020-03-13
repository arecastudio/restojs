var mod="his-hapus-order";

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

function formatDesimal(nilai){
    nilai+='';
    let val=nilai.split(',').join();

    vals=val.replace(new RegExp(/\B(?=(\d{3})+(?!\d))/g),",");
    return vals;
}

$('#notifikasi').hide();
//console.log(array_bulan[1]);
$('#id_tampilan').html('');

let opt='';
for(let x in array_bulan){
    opt+='<option value="'+x+'">'+array_bulan[x]+'</option>';    
}
$('#id_optbulan').html(opt);



$.ajax({
    //url:'backend/?data='+mod,
    //instead of creating another method, it's better to reuse another that provided before
    url:'backend/?data=laporan-transaksi',
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

$('#id_btnshow').on('click',function(){
    $('#notifikasi').show();
    let tahun=$('#id_opttahun').val();
    let bulan=$('#id_optbulan').val();
    //let nama_file_xls='laporan_pajak_'+tahun+'_'+bulan;

    //console.log('Tahun: '+tahun+', Bulan: '+bulan);
    $('#id_tampilan').html('');

    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','show');
    fdata.append('tahun',tahun);
    fdata.append('bulan',bulan);

    console.log(`bulan:${bulan},tahun:${tahun}`);

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
	    //let dx=JSON.parse(resp);
	    let dx=$.parseJSON (resp);
	    //console.table(dx);
	    let tr='',i=0,_ppn=0;
	    
	    for(let x in dx){	
		i++;
		tr+='<tr>';
		tr+='<td align="right">'+i+'</td>';
		tr+='<td align="center">'+dx[x]['operator']+'</td>';
		tr+='<td align="center">'+dx[x]['nomeja']+'</td>';		
		tr+='<td align="center">'+dx[x]['tanggal']+'</td>';
		tr+='<td>'+dx[x]['produk']+'</td>';
		tr+='<td align="right">'+formatDesimal(dx[x]['jumlah'])+'</td>';
		tr+='</tr>';
	    }
	    $('#id_tbody').html(tr);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    
});
