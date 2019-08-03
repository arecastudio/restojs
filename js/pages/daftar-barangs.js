const mod="daftar-barangs";
var chk_data=[];
$('.tanggal').datepicker();
$('.tanggal').datepicker('option','dateFormat','yy-mm-dd');

$.fn.resetForms=function(){
    chk_data=[];
    $('#id_tbody').html('');
};

$("#dialog-edit").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 270,
    autoOpen: false
});

$('#id_btn_show').on('click',function(){
    let tawal=$('#id_txtawal').val();
    let takhir=$('#id_txtakhir').val();
    let sort=$("input:radio[name=rdsort]:checked").val();

    //console.log('tanggal awal: '+tawal);
    //console.log('tanggal akhir: '+takhir);

    //reset array
    //chk_data=[];
    $.fn.resetForms();

    var table_url='backend/?data='+mod+'&awal='+tawal+'&akhir='+takhir+'&sort='+sort;
    $.ajax({
	url:table_url,
	method:'GET',
	success:function(resp){
	    let dx=JSON.parse(resp);
	    //console.table(dx);

	    let i=0,td='';
	    for(let x in dx){
		i++;
		td+='<tr>';
		td+='<td align="center">'+i+'</td>';
		td+='<td align="center"><a href="#" class="lnkdetail" title="Klik untuk lihat detail !">'+dx[x]['faktur_id']+'</a></td>';	
		td+='<td align="center">'+dx[x]['waktu']+'</td>';
		td+='<td align="center">'+dx[x]['waktu_lunas']+'</td>';
		td+='<td align="center">'+dx[x]['meja_nomor']+'</td>';
		td+='<td align="right">'+dx[x]['jumlah']+'</td>';
		td+='<td align="right">'+dx[x]['ftotal']+'</td>';
		//td+='<td align="center">'+dx[x]['operator']+'</td>';
		td+='<td align="center"><input type="checkbox" class="chk-koreksi" data-faktur="'+dx[x]['faktur_id']+'" data-total="'+dx[x]['total']+'" /></td>';
		td+='</tr>';
	    }
	    $('#id_tbody').html(td);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
    
});


$('#id_tbody').on('change','.chk-koreksi',function(){
    let faktur=$(this).attr('data-faktur');
    let total=$(this).attr('data-total');    
    if($(this).is(':checked')){
	//console.log(faktur);
	chk_data.push({'faktur':faktur,'total':total});
    }else{
	//chk_data.slice({'faktur':faktur,'total':total});
	for(let x=0;x<chk_data.length;x++){
	    if(chk_data[x]['faktur']==faktur){
		chk_data.splice(x,1);
	    }
	}
    }
    //console.table(chk_data);
});

$('#id_btn_koreksi').on('click',function(){
    let data='',i=0,gtotal=0;
    if(chk_data.length>0){
	for(let x in chk_data){
	    i++;
	    gtotal+=parseInt(chk_data[x]['total']);
	    data+='faktur:'+chk_data[x]['faktur']+'<br/>'
	    data+='total:'+chk_data[x]['total']+'<br/>'
	}
    }
    $('#id_view_koreksi').html('Dipilih: '+i+' transaksi<br/>Total: Rp. '+gtotal);

    $("#dialog-edit").dialog('option', 'buttons', {
        "Submit" : function() {

	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','edit');
	    //fdata.append('arraydata',chk_data);
	    fdata.append('arraydata',JSON.stringify(chk_data));
	    
	    console.log(fdata);

	    $.ajax({
		url:'backend/?',
		method:'POST',
		data:fdata,
		contentType:false,
		cache:false,
		processData:false,
		//contentType: 'multipart/form-data',
		success:function(resp){
		    console.log('message: '+resp);
		    //console.table(resp);
		    $.fn.resetForms();
		    //$('#id-notice-content').html(resp);
		    //$('#id-notice-content').show();
		    
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });

	    //$('#form-edit')[0].reset();
	    $(this).dialog("close");
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });
    $("#dialog-edit").dialog("open");
});
