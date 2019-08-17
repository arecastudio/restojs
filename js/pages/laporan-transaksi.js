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

$('#notifikasi').hide();
//console.log(array_bulan[1]);

let opt='';
for(let x in array_bulan){
    opt+='<option value="'+x+'">'+array_bulan[x]+'</option>';    
}
$('#id_optbulan').html(opt);


$('#id_btnshow').on('click',function(){
    $('#notifikasi').show();
    let tahun=$('#id_opttahun').val();
    let bulan=$('#id_optbulan').val();

    console.log('Tahun: '+tahun+', Bulan: '+bulan);

    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','show');
    fdata.append('tahun',tahun);
    fdata.append('bulan',bulan);

    console.log(fdata);

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

	    let td='',i=0,_ppn=0;
	    for(let x in dx){
		_ppn+=parseInt(dx[x]['ppn']);
		i++;
		td+='<tr>';
		td+='<td align="right">'+i+'</td>';
		td+='<td align="center">'+dx[x]['id']+'</td>';
		td+='<td align="right">'+dx[x]['ftanggal']+'</td>';		
		td+='<td align="right">'+dx[x]['ftotal_ppn']+'</td>';
		td+='<td align="right">'+dx[x]['ftotal_non_ppn']+'</td>';
		td+='<td align="right">'+dx[x]['fppn']+'</td>';
//.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")		
		td+='<td align="right">'+_ppn.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")+'</td>';
		td+='</tr>';
	    }
	    $('#id_tbody').html(td);
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
	console.log(dx);
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
