var mod="his-batal";

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
$('#id_tampilan').html('');

let opt='';
for(let x in array_bulan){
    opt+='<option value="'+x+'">'+array_bulan[x]+'</option>';    
}
$('#id_optbulan').html(opt);



$.ajax({
    //url:'backend/?data='+mod,
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
