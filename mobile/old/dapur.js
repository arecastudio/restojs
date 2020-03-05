const mod='dapur';
console.log(mod);


var elem = document.querySelector('.grid');
var msnry = new Masonry( elem, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 200
});

// element argument can be a selector string
//   for an individual element
var msnry = new Masonry( '.grid', {
    // options
});

const headerByTime=(time)=>{
    let r='<tr class="theader">';
    time=parseInt(time);
    if(time>=60){
	r='<tr class="theader" style="background-color:#aa0000;">';
    }else if(time>=50 && time<60){
	r='<tr class="theader" style="background-color:#cc0000;">';
    }else if(time>=40 && time<50){
	r='<tr class="theader" style="background-color:#ff0000;">';
    }else if(time>=30 && time<40){
	r='<tr class="theader" style="background-color:#aaaa00;">';
    }else if(time>=20 && time<30){
	r='<tr class="theader" style="background-color:#cccc00;">';
    }else if(time>=10 && time<20){
	r='<tr class="theader" style="background-color:#ffff00;">';
    }else{
	r='<tr class="theader">';
    }

    return r
}

const countDown=(time)=>{
    time=parseInt(time);
    let r='Pesan '+time+' menit lalu';
    if(time>=60){
	r='Pesan 1 jam ~';
    }else if(time<1){
	r='Pesanan baru';
    }
    return r;
}

var i=0;
function getData(){
    i++;
    console.log('i: '+i);

    let fdata=new FormData();
    fdata.append('mod',mod);
    fdata.append('act','show');

    $.ajax({
	url:'../backend/?',
	//url:'http://192.168.0.1/restojs/backend/?',
	method:'POST',
	data:fdata,
	contentType:false,
	cache:false,
	processData:false,
	//contentType: 'multipart/form-data',
	success:function(resp){
	    console.log('hasil dari server');
	    let dx=JSON.parse(resp);
	    //console.table(dx);
	    //console.log(resp);

	    let dt='',i=0,bungkus='&times;';kat='';
	    for(let x in dx){
		if(dx[x]['antri'].length>0){
		    i++;
		    dt+='';
		    //dt+='<div class="box">';
		    dt+='<div class="grid-item">';
		    dt+='<div class="title"><strong style="font-size:20px;">Meja '+dx[x]['meja']+'</strong> - '+countDown(dx[x]['run_time'])+'</div>';
		    //dt+='<hr/>';
		    dt+='<div class="menux">';
		    dt+='<table class="tbl" border="1">';
		    //dt+='<tr class="theader">';
		    dt+=headerByTime(dx[x]['run_time']);
		    dt+='<th>Menu</th>';
		    dt+='<th>Jml</th>';
		    dt+='<th>Bgks</th>';
		    //dt+='<th>Baru</th>';
		    //dt+='<th>Kat</th>';
		    dt+='</tr>';
		    for(let xx in dx[x]['antri']){
			bungkus='&times;';
			if(dx[x]['antri'][xx]['baru']=='0'){
			    dt+='<tr>';
			}else{
			    dt+='<tr class="baru">';
			}
			if(dx[x]['antri'][xx]['kategori']=='MAKAN'){
			    dt+='<td class="makan tx-right">'+dx[x]['antri'][xx]['nama']+'</td>';
			}else{
			    dt+='<td class="minum tx-right">'+dx[x]['antri'][xx]['nama']+'</td>';
			}
			
			dt+='<td class="tx-right"><strong>'+dx[x]['antri'][xx]['jumlah']+'</strong>&nbsp;</td>';
			if(dx[x]['antri'][xx]['bungkus']!='TIDAK'){
			    //bungkus='<strong>&#10004;</strong>';
			    bungkus='<img class="icon" src="assets/images/checked.png">';
			}
			dt+='<td class="tx-center">'+bungkus+'</td>';
			//dt+='<td class="tx-center">'+dx[x]['antri'][xx]['baru']+'</td>';
			//dt+='<td class="tx-center">'+dx[x]['antri'][xx]['kategori']+'</td>';
			dt+='</tr>';
		    }
		    dt+='</table>';
		    dt+='</div>';
		    dt+='</div>';
		}		    
	    }
	    //$('#id_tbody').html(dt);
	    $('#id_tbody').html('');
	    //$('.grid').html(dt);
	    //$("#id_tbody").append(dt).masonry( 'reload' );


	    var mediaItemContainer = $( '#id_tbody' );
	    mediaItemContainer.masonry( {
		columnWidth:  10,
		itemSelector: '.grid-item',
		//untuk matikan animasi
		transitionDuration: 0
	    } );
	    //$( mediaItemContainer ).prepend( '<div class="item">foo</div>' );
	    $( mediaItemContainer ).prepend( dt );
	    $( mediaItemContainer ).masonry( 'reloadItems' );
	    $( mediaItemContainer ).masonry( 'layout' );
	    
	    
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    
    
}

getData();



setInterval(function(){    
    getData();    
}, 2000);


