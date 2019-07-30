const mod="data-pelunasan-detail";
const txnomor_meja=$('#txnomor-meja').val();

//$('.table-datax').DataTable();

$.fn.resetForms=function(){
    var table_url='backend/?data='+mod+'&nomor='+txnomor_meja;
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
	    
	    console.log(data_json);
	    console.table(data_json);
	    
	    //$.fn.showTableData();

	    let data='',i=0,gtotal=0,nomor_order='',biaya_meja='';
	    for(let x in data_json){
		i++;
		gtotal+=parseInt(data_json[x]['total']);
		data+='<tr>';
		data+='<td align="right">'+i+'&nbsp;</td>';
		data+='<td>'+data_json[x]['nama']+'</td>';
		data+='<td align="right">'+data_json[x]['fharga']+'</td>';
		data+='<td align="right">'+data_json[x]['jumlah']+'</td>';
		data+='<td align="right">'+data_json[x]['ftotal']+'</td>';
		//data+='<td align="center">'+data_json[x]['bungkus']+'</td>';
		data+='<td align="center">'+data_json[x]['waktu']+'</td>';
		data+='<td align="center">'+data_json[x]['operator']+'</td>';
		data+='</tr>';
		nomor_order=data_json[x]['pesanan_id'];
		biaya_meja=data_json[x]['biaya_meja'];
	    }
	    let fgtotal="";
	    if(i>0){
		//ada data
		fgtotal=gtotal.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		biaya_meja=biaya_meja.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
		data+='<tr>';
		data+='<th colspan="3" align="right"><strong>Grand Total</strong></th>';
		data+='<th colspan="2" align="right" class="money"><strong>'+fgtotal+'</strong></th>';
		data+='<th colspan="2" align="right">&nbsp;</th>';
		data+='</tr>';
	    }
	    $('#id_txgtotal').html('Rp. '+fgtotal);
	    $('#id_txbmeja').html('Rp. '+biaya_meja);
	    $('#id_txbilang').html('<br/>'+terbilang(gtotal)+' Rupiah');
	    $('#nomor-order').html(', Nomor Order: '+nomor_order);

	    $('#id_tbody_menu').html(data);
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}

$.fn.resetForms();
console.log('data-pelunasan-detail');
$('.money').simpleMoneyFormat();
