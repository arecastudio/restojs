const mod='laporan-pemasukan';

//console.log(mod);

const tanggal='2018-12-20';

$.fn.resetForms=function(){
    console.log(tanggal);
    //$('#sp_tanggal').html(tanggal);

    $.ajax({
	url:'backend/?data='+mod,
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);
	    //console.log(dx['grand_total']);
	    //console.table(dx['data_rekap']);
	    //console.table(dx['data_kategori']);

	    let tgl=dx['tanggal'];
	    $('#sp_tanggal').html(tgl);

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
		    dataPoints: dkat/*[      
			{ y: 300878, label: "Venezuela" },
			{ y: 266455,  label: "Saudi" },
			{ y: 169709,  label: "Canada" },
			{ y: 158400,  label: "Iran" },
			{ y: 142503,  label: "Iraq" },
			{ y: 101500, label: "Kuwait" },
			{ y: 97800,  label: "UAE" },
			{ y: 80000,  label: "Russia" }
		    ]*/
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
		    dataPoints: jkat/*[
			{y: 79.45, label: "Google"},
			{y: 7.31, label: "Bing"},
			{y: 7.06, label: "Baidu"},
			{y: 4.91, label: "Yahoo"},
			{y: 1.26, label: "Others"}
		    ]*/
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
		    dataPoints: trfx/*[
			{ x: new Date(2017, 0, 1), y: 610 },
			{ x: new Date(2017, 0, 2), y: 680 },
			{ x: new Date(2017, 0, 3), y: 690 },
			{ x: new Date(2017, 0, 4), y: 700 },
			{ x: new Date(2017, 0, 5), y: 710 },
			{ x: new Date(2017, 0, 6), y: 658 },
			{ x: new Date(2017, 0, 7), y: 734 },
			{ x: new Date(2017, 0, 8), y: 963 },
			{ x: new Date(2017, 0, 9), y: 847 },
			{ x: new Date(2017, 0, 10), y: 853 },
			{ x: new Date(2017, 0, 11), y: 869 },
			{ x: new Date(2017, 0, 12), y: 943 },
			{ x: new Date(2017, 0, 13), y: 970 },
			{ x: new Date(2017, 0, 14), y: 869 },
			{ x: new Date(2017, 0, 15), y: 890 },
			{ x: new Date(2017, 0, 16), y: 930 },
			{ x: new Date(2017, 0, 17), y: 1850 },
			{ x: new Date(2017, 0, 18), y: 1905 },
			{ x: new Date(2017, 0, 19), y: 1980 },
			{ x: new Date(2017, 0, 20), y: 1858 },
			{ x: new Date(2017, 0, 21), y: 1034 },
			{ x: new Date(2017, 0, 22), y: 963 },
			{ x: new Date(2017, 0, 23), y: 847 },
			{ x: new Date(2017, 0, 24), y: 853 },
			{ x: new Date(2017, 0, 25), y: 869 },
			{ x: new Date(2017, 0, 26), y: 943 },
			{ x: new Date(2017, 0, 27), y: 970 },
			{ x: new Date(2017, 0, 28), y: 869 },
			{ x: new Date(2017, 0, 29), y: 890 },
			{ x: new Date(2017, 0, 30), y: 930 },
			{ x: new Date(2017, 0, 31), y: 750 }
		    ]*/
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
		td+='<td align="center">'+dx['data_tabel'][x]['diskon']+'&nbsp;%</td>';
		td+='</tr>';
		gtotal+=parseInt(dx['data_tabel'][x]['total']);
	    }
	    /*td+='<tr>';
	    td+='<th colspan="4" align="right">Grand Total (Rp.):</th>';
	    td+='<th colspan="3" align="right">'+gtotal+'</th>';
	    td+='<th colspan="5">&nbsp;</th>';
	    td+='</tr>';*/
	    $('#id_tbody').html(td);


	    td='';i=0;
	    for(let x in dx['data_rekap']){
		i++;
		td+='';
		td+='<tr>';
		td+='<td align="right">'+i+'&nbsp;</td>';
		td+='<td align="center">'+dx['data_rekap'][x]['jam']+'</td>';
		td+='<td align="center">'+dx['data_rekap'][x]['id']+'</td>';
		td+='<td align="center">'+dx['data_rekap'][x]['meja']+'</td>';
		td+='<td align="right">'+dx['data_rekap'][x]['fharga']+'</td>';
		td+='<td align="right">'+dx['data_rekap'][x]['jumlah']+'</td>';
		td+='<td align="right">'+dx['data_rekap'][x]['ftotal']+'</td>';
		td+='<td align="right">'+dx['data_rekap'][x]['diskon']+'&nbsp;%</td>';
		td+='<td align="right">'+dx['data_rekap'][x]['ftarif_meja']+'</td>';
		td+='<td align="right">'+dx['data_rekap'][x]['fgtotal']+'</td>';
	    }
	    $('#id_tbody_rekap').html(td);
	    
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    
};


$.fn.resetForms();


//chart
window.onload = function () {






    
 }

//$.fn.loadChart();
