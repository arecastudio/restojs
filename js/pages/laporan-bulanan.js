const mod="laporan-bulanan";

$('.txtanggal').datepicker();
$('.txtanggal').datepicker('option','dateFormat','yy-mm-dd');

$('#btn-show').on('click',function(){
    let jenis=$("input:radio[name=radio-type]:checked").val();
    console.log('Jenisnya: '+jenis);

    let data={};

    if(jenis=='harian'){
	$('#span-harian').css('display','inline');
	//harus reset hingga di tabel
	$('#txtawal').val('');
	$('#txtakhir').val('');
	$('#span-bulanan').css('display','none');

	let txtrx=$('#txtrx').val();
	//console.log('Tanggal: '+txtrx);

	data={
	    'act':'harian',
	    'tanggal':txtrx,
	}
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
	    'act':'bulanan',
	    'tawal':tawal,
	    'takhir':takhir,
	}
    }

    console.log(data);
    
});

$.fn.showResult=function(){
    let jenis=$("input:radio[name=radio-type]:checked").val();
    console.log('Jenisnya: '+jenis);

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
