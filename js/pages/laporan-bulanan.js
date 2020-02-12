const mod="laporan-bulanan";

function ExportTable(){
    $("#id_table_rekap_transaksi_bulanan").tableExport({
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

$('#tb-daily').hide();
$('#notifikasi').hide();
$('#box-chart').hide();

$('#btn-show').on('click',function(){
    let jenis=$("input:radio[name=radio-type]:checked").val();
    //console.log('Jenisnya: '+jenis);
    $('#id_grandtotal').text('0');

    $('#notifikasi').show();
    //$('#box-chart').hide();

    let data={};
    let fdata=new FormData();

    if(jenis=='harian'){
	$('#span-harian').css('display','inline');
	//harus reset hingga di tabel
	$('#txtawal').val('');
	$('#txtakhir').val('');
	$('#span-bulanan').css('display','none');

	let txtrx=$('#txtrx').val();
	//console.log('Tanggal: '+txtrx);

	data={
	    'mod':mod,
	    'act':'harian',
	    'tanggal':txtrx,
	}
	fdata.append('mod',mod);
	fdata.append('act','harian');
	fdata.append('tanggal',txtrx);
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
	    'mod':mod,
	    'act':'bulanan',
	    'tawal':tawal,
	    'takhir':takhir,
	}
	fdata.append('mod',mod);
	fdata.append('act','bulanan');
	fdata.append('tawal',tawal);
	fdata.append('takhir',takhir);
    }

    //console.log(data);
    //console.log('mod data: '+mod);
    $.ajax({
	url:'backend/?',
	method:'POST',
	data:fdata,
	contentType:false,
	cache:false,
	processData:false,
	//contentType: 'multipart/form-data',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    
	    //console.table(dx['data_tabel']);
	    
	    //$('#id-notice-content').show();
	    $('#notifikasi').hide();
	    $('#box-chart').show();

	    //chart
	    let persen100=0;
	    let dkat=[];
	    for(let x in dx['data_kategori']){
		dkat[x]={		    
		    y:parseInt(dx['data_kategori'][x]['total']),
		    label:dx['data_kategori'][x]['kategori']
		};
		persen100+=parseInt(dx['data_kategori'][x]['jml']);
	    }

	    //console.table(dx['data_kategori']);
	    //console.log('total: '+persen100);

	    let jkat=[],psen=0;
	    for(let x in dx['data_favorite']){
		psen=parseInt(dx['data_favorite'][x]['jml'])/persen100;
		jkat[x]={		    
		    y:psen*100,
		    label:dx['data_favorite'][x]['kategori']
		};
	    }
	    //console.table(jkat);
	    
	    let trfx=[];
	    for(let x in dx['data_traffic']){		
		trfx[x]={		    
		    x:parseInt(dx['data_traffic'][x]['jam']),
		    y:parseInt(dx['data_traffic'][x]['jml'])
		};
	    }

	    //console.table(trfx);
	    

	    //chart
	    var chart = new CanvasJS.Chart("chartContainer", {
		animationEnabled: true,
		theme: "light2", // "light1", "light2", "dark1", "dark2"
		title:{
		    text: "Top 10 Sales",
		    fontWeight:'normal',
		},
		axisY: {
		    title: "Jumlah (Rp.)"
		},
		data: [{        
		    type: "column",  
		    showInLegend: true, 
		    legendMarkerColor: "grey",
		    legendText: "Menu Hidangan",
		    dataPoints: dkat
		}]
	    });
	    chart.render();
	    //console.log('chart loaded.');
	    var pie = new CanvasJS.Chart("pieContainer", {
		animationEnabled: true,
		title: {
		    text: "Top 10 Most Ordered",
		    fontWeight:'normal',
		},
		data: [{
		    type: "pie",
		    startAngle: 240,
		    yValueFormatString: "##0.00\"%\"",
		    indexLabel: "{label} {y}",
		    dataPoints: jkat
		}]
	    });
	    pie.render();

	    var peakx = new CanvasJS.Chart("peakContainer", {
		animationEnabled: true,
		title:{
		    text: "Jumlah Transaksi per Jam"
		},
		axisX:{
		    //valueFormatString: "DD MMM"
		},
		axisY: {
		    title: "Number of Trx",
		    includeZero: false,
		    scaleBreaks: {
			autoCalculate: true
		    }
		},
		data: [{
		    type: "line",
		    //xValueFormatString: "DD MMM",
		    color: "#F08080",
		    dataPoints: trfx
		}]
	    });
	    peakx.render();
	    //chart

	    let td='',i=0,gtotal=0,bungkus='&times;';;
	    for(let x in dx['data_tabel']){
		i++;
		td+='';
		td+='<tr>';
		td+='<td align="right">'+i+'&nbsp;</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['trx']+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['meja']+'</td>';
		td+='<td>'+dx['data_tabel'][x]['menu']+'</td>';
		td+='<td align="right">'+dx['data_tabel'][x]['fharga']+'</td>';
		td+='<td align="right">'+dx['data_tabel'][x]['jumlah']+'</td>';
		td+='<td align="right">'+dx['data_tabel'][x]['ftotal']+'</td>';
		if(dx['data_tabel'][x]['bungkus']=='TIDAK'){
		    bungkus='&times;';
		}else{
		    bungkus='&#10004;';
		}
		td+='<td align="center">'+bungkus+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['jam']+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['op']+'</td>';
		td+='<td align="center">'+dx['data_tabel'][x]['kategori']+'</td>';
		//td+='<td align="center">'+dx['data_tabel'][x]['diskon']+'&nbsp;%</td>';
		td+='</tr>';
		gtotal+=parseInt(dx['data_tabel'][x]['total']);
	    }
	    /*td+='<tr>';
	    td+='<th colspan="4" align="right">Grand Total (Rp.):</th>';
	    td+='<th colspan="3" align="right">'+gtotal+'</th>';
	    td+='<th colspan="5">&nbsp;</th>';
	    td+='</tr>';*/
	    $('#id_tbody').html(td);


	    td='';i=0,grandtotal=0;
	    let [tdHarga,tdJumlah,tdTotal,tdDiskon,tdTMeja,tdGTotal]=Array(6).fill(0);//assign all variable with 0 by Array Fill method
	    
	    for(let x in dx['data_rekap']){
		i++;
		td+='';
		td+='<tr>';
		td+='<td align="right">'+i+'&nbsp;</td>';
		td+='<td align="center">'+dx['data_rekap'][x]['jam']+'</td>';
		td+='<td align="center">'+dx['data_rekap'][x]['id']+'</td>';
		td+='<td align="center">'+dx['data_rekap'][x]['meja']+'</td>';
		td+='<td align="right">'+dx['data_rekap'][x]['fharga']+'</td>';tdHarga+=parseInt(dx['data_rekap'][x]['harga']);
		td+='<td align="right">'+dx['data_rekap'][x]['jumlah']+'</td>';tdJumlah+=parseInt(dx['data_rekap'][x]['jumlah']);
		td+='<td align="right">'+dx['data_rekap'][x]['ftotal']+'</td>';tdTotal+=parseInt(dx['data_rekap'][x]['total']);
		td+='<td align="right">'+dx['data_rekap'][x]['diskon']+'&nbsp;%</td>';tdDiskon+=parseInt(dx['data_rekap'][x]['diskon']);
		td+='<td align="right">'+dx['data_rekap'][x]['ftarif_meja']+'</td>';tdTMeja+=parseInt(dx['data_rekap'][x]['tarif_meja']);
		td+='<td align="right">'+dx['data_rekap'][x]['fgtotal']+'</td>';tdGTotal+=parseInt(dx['data_rekap'][x]['gtotal']);
		grandtotal+=parseInt(dx['data_rekap'][x]['gtotal']);
	    }
	    //additional for Online Recap Summary
	    td+='<tr height="50" valign="middle">';
	    td+='<td align="center" colspan="4"><strong>Summary</strong></td>';
	    td+='<td align="right">'+formatDesimal(tdHarga)+'</td>';
	    td+='<td align="right">'+formatDesimal(tdJumlah)+'</td>';
	    td+='<td align="right">'+formatDesimal(tdTotal)+'</td>';
	    td+='<td align="center">'+formatDesimal(tdDiskon)+'</td>';
	    td+='<td align="right">'+formatDesimal(tdTMeja)+'</td>';
	    td+='<td align="right">'+formatDesimal(tdGTotal)+'</td>';
	    td+='</tr>';	    
	    
	    $('#id_tbody_rekap').html(td);
	    $('#id_grandtotal').text(formatDesimal(grandtotal));

	    //tbody_daily
	    //console.table(dx['data_harian']);
	    td='';i=0;
	    let [tdoJumlah,tdoGTotal]=Array(2).fill(0);//assign all variable with 0 by Array Fill method
	    
	    for(let x in dx['data_harian']){
		i++;
		td+='';
		td+='<tr>';
		td+='<td align="right">'+i+'&nbsp;</td>';
		td+='<td align="center">'+dx['data_harian'][x]['tgl']+'</td>';
		td+='<td align="center">'+dx['data_harian'][x]['fjml_order']+'</td>';tdoJumlah+=parseInt(dx['data_harian'][x]['jml_order']);
		td+='<td align="center">'+dx['data_harian'][x]['fgtotal']+'</td>';tdoGTotal+=parseInt(dx['data_harian'][x]['gtotal']);
	    }
	    //additional for Online Recap Summary
	    td+='<tr height="50" valign="middle">';
	    td+='<td align="center" colspan="2"><strong>Summary</strong></td>';	    
	    td+='<td align="right">'+formatDesimal(tdoJumlah)+'</td>';	    
	    td+='<td align="right">'+formatDesimal(tdoGTotal)+'</td>';
	    td+='</tr>';
	    $('#id_tbody_daily').html(td);
	    //ExportTable();
	    
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    
});

$.fn.showResult=function(){
    let jenis=$("input:radio[name=radio-type]:checked").val();
    //console.log('Jenisnya: '+jenis);
    $('#id_tbody').html('');
    $('#id_tbody_rekap').html('');
    $('#id_tbody_daily').html('');
    $('#box-chart').hide();

    if(jenis=='harian'){
	$('#span-harian').css('display','inline');
	//harus reset hingga di tabel
	$('#txtawal').val('');
	$('#txtakhir').val('');
	$('#span-bulanan').css('display','none');
	$('#tb-daily').hide();
    }else{
	//reset hingga di tabel
	$('#txtrx').val('');
	$('#span-harian').css('display','none');	
	$('#span-bulanan').css('display','inline');
	$('#tb-daily').show();
    }
}

$('.rtype').on('click',function(){    
    //let jenis=$(this).val();
    $.fn.showResult();
});

window.onload=function(){
    $.fn.showResult();
}
