const mod='batal-lunas';
console.log(mod);

$('.txtanggal').datepicker();
$('.txtanggal').datepicker('option','dateFormat','yy-mm-dd');

$("#dialog-delete").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 300,
    autoOpen: false
});

$.fn.resetForms=function(){
    $('#id_txtanggal').val('');
    $('#id_tbody').html('');
}

$('#id_tbody').on('click','.btnbatal',function(){
    let id=$(this).attr('data-id');
    let meja=$(this).attr('data-meja');
    console.log(id);

    let msg="Yakin untuk hapus data ini?";
    msg+="<table>";
    msg+="<tr><td>Faktur</td><td class=\"txbold\">"+id+"</td></tr>";
    msg+="<tr><td>Meja</td><td class=\"txbold\">"+meja+"</td></tr>";
    msg+="</table>";

    $('#msg-delete').html(msg);

    //BOF process delete
    $("#dialog-delete").dialog('option', 'buttons', {
        "Submit" : function() {
	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','delete');
	    fdata.append('faktur_id',id);
	    fdata.append('meja',meja);

	    $.ajax({
		url:'backend/?',
		method:'POST',
		data:fdata,
		contentType:false,
		cache:false,
		processData:false,
		//contentType: 'multipart/form-data',
		success:function(resp){
		    //console.log('hasil dari server');
		    //let dx=JSON.parse(resp);	    
		    //console.table(dx);
		    console.log(resp);
		    $.fn.resetForms();
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });
	    
	    $(this).dialog("close");
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });
    $("#dialog-delete").dialog("open");
    //EOF process delete

    
});

$('#id_btntampilkan').on('click',function(){
    let tanggal=$('#id_txtanggal').val();
    if(tanggal!=''){
	let fdata=new FormData();
	fdata.append('mod',mod);
	fdata.append('act','show');
	fdata.append('tanggal',tanggal);

	$.ajax({
	    url:'backend/?',
	    method:'POST',
	    data:fdata,
	    contentType:false,
	    cache:false,
	    processData:false,
	    //contentType: 'multipart/form-data',
	    success:function(resp){
		//console.log('hasil dari server');
		let dx=JSON.parse(resp);	    
		//console.table(dx);
		//console.log(resp);

		let td='',i=0;
		for(let d in dx){
		    i++;
		    //td+='';
		    td+='<tr>';
		    td+='<td>'+i+'</td>';
		    td+='<td>'+dx[d]['faktur_id']+'</td>';
		    td+='<td class="txbold">'+dx[d]['meja']+'</td>';
		    td+='<td>'+dx[d]['jam']+'</td>';
		    td+='<td>'+dx[d]['jumlah']+'</td>';
		    td+='<td>'+dx[d]['bymeja']+'</td>';
		    td+='<td>'+dx[d]['grandtotal']+'</td>';
		    td+='<td><button class="btnbatal" data-id="'+dx[d]['faktur_id']+'" data-meja="'+dx[d]['meja']+'">&times;</button></td>';
		    td+='</tr>';
		}

		$('#id_tbody').html(td);
	    },
	    error:function(xhr,status,error){
		console.log('getting data error');
	    }
	});

    }    
});
