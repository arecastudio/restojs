const mod='ubah-order';
console.log(mod);

$.fn.resetForms=function(){
    $.ajax({
        url:'backend/?data='+mod,
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);

	    let td='',i=0;
	    for(let x in dx){
		i++;
		//td+='';
		td+='<tr>';
		//td+='<td class="txcenter">'+i+'</td>';
		td+='<td class="txcenter">'+dx[x]['meja']+'</td>';
		//td+='<td class="txcenter">'+dx[x]['waktu']+'</td>';
		td+='<td>'+dx[x]['produks']+'</td>';
		td+='<td class="txcenter"><button class="btnubah" data-meja="'+dx[x]['meja']+'" >&larr;</button></td>';
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

$('#id_tbody').on('click','.btnubah',function(){
    let meja=$(this).attr('data-meja');
    console.log(meja);
});
