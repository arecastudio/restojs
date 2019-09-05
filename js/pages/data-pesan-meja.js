const mod="pesan-meja";

//$('.money').toLocaleString();
console.log(mod);

const txnomor_meja=$('#txnomor-meja').val();
var data_dipilih=[];
var data_dibungkus=[];
var data_json=[];

$.fn.showTableData=function(){
    let menux=$("input:radio[name=radiomenu]:checked").val();
    let tfilter=$('#txfilter-menu').val().trim().toLowerCase();
    console.log('JENIS: '+menux);

    let d='', i=0;
    for(let x in data_json){
	switch(menux){
	case 'MAKAN':
	    if(data_json[x]['jenis']=='MAKAN'){
		//create another derivative filter
		//for text search inside each of these
		if(tfilter.length>0){
		    if(data_json[x]['nama'].toLowerCase().includes(tfilter)){
			i++;
			d+='<tr>';
			d+='<td align="right">'+i+'&nbsp;</td>';
			d+='<td>'+data_json[x]['nama']+'</td>';
			d+='<td align="right">'+data_json[x]['fharga']+'</td>';
			d+='<td align="center"><button class="btn-mod-tambahkan" data-id="'+data_json[x]['id']+'" data-nama="'+data_json[x]['nama']+'" data-harga="'+data_json[x]['fharga']+'" title="Klik untuk menambahkan ke daftar pesanan !">&nearr;</button></td>';
			d+='</tr>';			
		    }
		}else{
		    i++;
		    d+='<tr>';
		    d+='<td align="right">'+i+'&nbsp;</td>';
		    d+='<td>'+data_json[x]['nama']+'</td>';
		    d+='<td align="right">'+data_json[x]['fharga']+'</td>';
		    d+='<td align="center"><button class="btn-mod-tambahkan" data-id="'+data_json[x]['id']+'" data-nama="'+data_json[x]['nama']+'" data-harga="'+data_json[x]['fharga']+'" title="Klik untuk menambahkan ke daftar pesanan !">&nearr;</button></td>';
		    d+='</tr>';
		}
	    }
	    break;
	case 'MINUM':
	    if(data_json[x]['jenis']=='MINUM'){
		if(tfilter.length>0){
		    if(data_json[x]['nama'].toLowerCase().includes(tfilter)){
			i++;
			d+='<tr>';
			d+='<td align="right">'+i+'&nbsp;</td>';
			d+='<td>'+data_json[x]['nama']+'</td>';
			d+='<td align="right">'+data_json[x]['fharga']+'</td>';
			d+='<td align="center"><button class="btn-mod-tambahkan" data-id="'+data_json[x]['id']+'" data-nama="'+data_json[x]['nama']+'" data-harga="'+data_json[x]['fharga']+'" title="Klik untuk menambahkan ke daftar pesanan !">&nearr;</button></td>';
			d+='</tr>';			
		    }
		}else{
		    i++;
		    d+='<tr>';
		    d+='<td align="right">'+i+'&nbsp;</td>';
		    d+='<td>'+data_json[x]['nama']+'</td>';
		    d+='<td align="right">'+data_json[x]['fharga']+'</td>';
		    d+='<td align="center"><button class="btn-mod-tambahkan" data-id="'+data_json[x]['id']+'" data-nama="'+data_json[x]['nama']+'" data-harga="'+data_json[x]['fharga']+'" title="Klik untuk menambahkan ke daftar pesanan !">&nearr;</button></td>';
		    d+='</tr>';
		}
	    }
	    break;
	default:
	    if(tfilter.length>0){
		if(data_json[x]['nama'].toLowerCase().includes(tfilter)){
		    i++;
		    d+='<tr>';
		    d+='<td align="right">'+i+'&nbsp;</td>';
		    d+='<td>'+data_json[x]['nama']+'</td>';
		    d+='<td align="right">'+data_json[x]['fharga']+'</td>';
		    d+='<td align="center"><button class="btn-mod-tambahkan" data-id="'+data_json[x]['id']+'" data-nama="'+data_json[x]['nama']+'" data-harga="'+data_json[x]['fharga']+'" title="Klik untuk menambahkan ke daftar pesanan !">&nearr;</button></td>';
		    d+='</tr>';			
		}
	    }else{
		i++;
		d+='<tr>';
		d+='<td align="right">'+i+'&nbsp;</td>';
		d+='<td>'+data_json[x]['nama']+'</td>';
		d+='<td align="right">'+data_json[x]['fharga']+'</td>';
		d+='<td align="center"><button class="btn-mod-tambahkan" data-id="'+data_json[x]['id']+'" data-nama="'+data_json[x]['nama']+'" data-harga="'+data_json[x]['fharga']+'" title="Klik untuk menambahkan ke daftar pesanan !">&nearr;</button></td>';
		d+='</tr>';
	    }
	}
    }
    $('#id_tbody_menu').html(d);
}

$.fn.resetForms=function(){
    //$('#form-add-new')[0].reset();
    //$('#id-notice-content').hide();

    var table_url='backend/?data='+mod;
    $.ajax({
        url:table_url,
        method:'GET',
        success:function(resp){
            //$('#id_tbody_menu').html(resp);
	    //karena returned value dari PHP adalah String
	    //maka perlu di-convert ke Array JSON
	    //untuk dapat diproses sebagai array ber-index
	    let x=JSON.parse(resp);
	    data_json=x;
	    //console.table(data_json);
	    $.fn.showTableData();
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}

$.fn.updatePesananTable=function(){
    $('#id_tbody_draft').html('');
    
    if(data_dipilih.length>0){
	let datax='';
	for(let x in data_dipilih){
	    datax+='<tr>';
	    datax+='<td>'+data_dipilih[x]['nama']+'</td>';
	    datax+='<td align="right">'+data_dipilih[x]['harga']+'</td>';	    
	    datax+='<td align="right"><span style="font-weight:bold;color:blue;" class="jml">'+data_dipilih[x]['jumlah']+'</span></td>';
	    datax+='<td align="center"><input type="checkbox" class="chk-bungkus" data-id="'+data_dipilih[x]['id']+'"/></td>';
	    datax+='<td align="center"><button class="btn-min" data-id="'+data_dipilih[x]['id']+'" data-index="'+x+'" title="Kurang">&minus;</button>';	    
	    datax+='&nbsp;<button class="btn-add" data-id="'+data_dipilih[x]['id']+'" data-index="'+x+'" title="Tambah">&plus;</button>';
	    datax+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn-del" data-id="'+data_dipilih[x]['id']+'" data-index="'+x+'" title="Hapus">&times;</button></td>';
	    datax+='</tr>';	    
	}
	$('#id_tbody_draft').append(datax);
    }

    if(data_dibungkus.length>0){
	let datax='';
	for(let x in data_dibungkus){
	    datax+='<tr>';
	    datax+='<td>'+data_dibungkus[x]['nama']+'</td>';
	    datax+='<td align="right">'+data_dibungkus[x]['harga']+'</td>';	    
	    datax+='<td align="right"><span style="font-weight:bold;color:blue;" class="jml">'+data_dibungkus[x]['jumlah']+'</span></td>';
	    datax+='<td align="center"><input type="checkbox" class="chk-bungkus" data-id="'+data_dibungkus[x]['id']+'" checked="checked" /></td>';
	    datax+='<td align="center"><button class="btn-min" data-id="'+data_dibungkus[x]['id']+'" data-index="'+x+'" title="Kurang">&minus;</button>';	    
	    datax+='&nbsp;<button class="btn-add" data-id="'+data_dibungkus[x]['id']+'" data-index="'+x+'" title="Tambah">&plus;</button>';
	    datax+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn-del" data-id="'+data_dibungkus[x]['id']+'" data-index="'+x+'" title="Hapus">&times;</button></td>';
	    datax+='</tr>';	    
	}
	$('#id_tbody_draft').append(datax);
    }
    

}

$.fn.resetForms();
$.fn.updatePesananTable();

$('#btn-kirim-pesanan').on('click',function(){
    let txnote=$('#txnote').val();
    console.log('Catatan tambahan:\n'+txnote);
    console.log(data_dipilih);

    $('#txnote').val('');
    data_dipilih=[];
    $.fn.resetForms();
    $.fn.updatePesananTable();
    //tampilkan modal info bahwa proses berhasil lalu redirect
    //window.open('?ref=jual');
});

$('input:radio[name=radiomenu]').on('click',function(){
    let s=$(this).val();
    console.log('Dipilih: '+s);
    $.fn.showTableData();
});

$('#txfilter-menu').on('keyup',function(){
    //let val=$(this).val();
    //console.log(val);
    $.fn.showTableData();
});

$('#id_tbody_menu').on('click','.btn-mod-tambahkan',function(){

    let tid=$(this).attr('data-id');
    let tnama=$(this).attr('data-nama');
    let tharga=$(this).attr('data-harga');

    if(data_dipilih.length>0){
	let sama=0;
	for(let x in data_dipilih){
	    if(data_dipilih[x]['id']==tid){
		sama=1;
		let j=data_dipilih[x]['jumlah'];
		j++;
		data_dipilih[x]['jumlah']=j;
	    }
	}
	
	if(sama==0){
	    data_dipilih.push({
		'id':tid,
		'nama':tnama,
		'harga':tharga,
		'jumlah':1,
	    });	    
	}else{
	    //console.log('ID '+tid+' exists !');
	}
    }else{
	data_dipilih.push({
	    'id':tid,
	    'nama':tnama,
	    'harga':tharga,
	    'jumlah':1,
	});
    }

    console.table(data_dipilih);
    $.fn.updatePesananTable();
});


$('#id_tbody_draft').on('click','.btn-add',function(){
    let id=$(this).attr('data-id');
    let index=$(this).attr('data-index');
    //console.log('ID: '+id);
    //console.log('Index: '+index);

    let j=data_dipilih[index]['jumlah'];
    j++;
    data_dipilih[index]['jumlah']=j;
    
    console.table(data_dipilih);
    $.fn.updatePesananTable();
});

$('#id_tbody_draft').on('click','.btn-min',function(){
    let id=$(this).attr('data-id');
    let index=$(this).attr('data-index');
    //console.log('ID: '+id);
    //console.log('Index: '+index);

    let j=data_dipilih[index]['jumlah'];
    if(j>1){
	j--;
	data_dipilih[index]['jumlah']=j;	
    }
    
    console.table(data_dipilih);
    $.fn.updatePesananTable();
});

$('#id_tbody_draft').on('click','.btn-del',function(){
    let id=$(this).attr('data-id');
    let index=$(this).attr('data-index');
    //console.log('ID: '+id);
    //console.log('Index: '+index);

    let j=data_dipilih[index]['jumlah'];
    j++;
    data_dipilih[index]['jumlah']=j;

    for(let x=0;x<data_dipilih.length;x++){
	if(data_dipilih[x]['id']==id){
	    data_dipilih.splice(x,1);
	}
    }
    
    console.table(data_dipilih);
    $.fn.updatePesananTable();
});


$('#id_tbody_draft').on('click','.chk-bungkus',function(){
    //deklarasi
    let id=$(this).attr('data-id');
    let _status=$(this).is(':checked');
    console.log('ID: '+id+'\nChecked: '+_status);
    let _nama='';
    let _harga='';
    let _jumlah='';
    //pindahkan dari array data_dipilih ke data_dibungkus vice versa
    if(_status==true){
	console.log('status-nya: '+status);
	let sama=0;
	let _jumlah_dibungkus=1;
	let index=null;
	//ambil data
	for(let x in data_dipilih){
	    if(data_dipilih[x]['id']==id){
		_nama=data_dipilih[x]['nama']
		_harga=data_dipilih[x]['harga']
		_jumlah=data_dipilih[x]['jumlah']
	    }
	}

	for(let x in data_dibungkus){
	    if(data_dibungkus[x]['id']==id){
		sama=1;
		_jumlah_dibungkus=data_dibungkus[x]['jumlah'];
		index=x;
	    }
	}

	if(sama!=0){
	    //_jumlah_dibungkus=0;
	    data_dibungkus[index]['jumlah']=parseInt(_jumlah)+parseInt(_jumlah_dibungkus);
	}else{
	    data_dibungkus.push({
		'id':id,
		'nama':_nama,
		'harga':_harga,
		'jumlah':_jumlah,
	    });
	}

	//let _grand_jml=parseInt(_jumlah)+parseInt(_jumlah_dibungkus);

	//keluarkan dari jumlah_dipilih
	let data_tmp=[];
	for(let x in data_dipilih){
	    if(data_dipilih[x]['id']!=id){
		data_tmp.push({
		    'id':data_dipilih[x]['id'],
		    'nama':data_dipilih[x]['nama'],
		    'harga':data_dipilih[x]['harga'],
		    'jumlah':data_dipilih[x]['jumlah'],
		});
	    }
	}

	data_dipilih=data_tmp;
	
    }

    //console.log('dibungkus');
    //console.table(data_dibungkus);
    //console.log('dipilih');
    //console.table(data_dipilih);
    //$.fn.updatePesananTable();
});
