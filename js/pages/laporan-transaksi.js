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


//console.log(array_bulan[1]);

let opt='';
for(let x in array_bulan){
    opt+='<option value="'+x+'">'+array_bulan[x]+'</option>';    
}
$('#id_optbulan').html(opt);


$('#id_btnshow').on('click',function(){
    let tahun=$('#id_opttahun').val();
    let bulan=$('#id_optbulan').val();

    console.log('Tahun: '+tahun+', Bulan: '+bulan);
});
