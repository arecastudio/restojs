const mod="pesan-dapur-list";

//$('.money').toLocaleString();
console.log(mod);

$.fn.resetForms=function(){
    //$('#form-add-new')[0].reset();
    $('#id-notice-content').hide();

    var table_url='backend/?data='+mod;
    $.ajax({
        url:table_url,
        method:'GET',
        success:function(resp){
	    let dx=JSON.parse(resp);	    
	    //console.table(dx);
	    let td='',i=0;
	    for(let x in dx){
		i++;
		td+='<tr>';
		td+='<td>'+i+'</td>';
		td+='<td>'+dx[x]['meja']+'</td>';
		td+='<td>'+dx[x]['nama']+'</td>';
		td+='<td>'+dx[x]['jumlah']+'</td>';		
		td+='<td>'+dx[x]['jam']+'</td>';
		td+='<td>'+dx[x]['jam_siap']+'</td>';
		td+='</tr>';
	    }
	
	    $('#id_tbody').html(td);
        },
        error:function(xhr,status,error){
            console.log('getting data error');
        }
    });
}


$.fn.resetForms();


