const mod='meja-kat';

$.fn.resetForms=function(){
    $('#form-add-new')[0].reset();
    $('#id-notice-content').hide();

    var table_url='backend/?data=meja-kat';
    $.ajax({
        url:table_url,
	method:'GET',
	success:function(resp){
	    $('#id_tbody').html(resp);
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });	 
}

$.fn.resetForms();

$("#dialog-add-new").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 250,
    autoOpen: false
});

$("#dialog-edit").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 270,
    autoOpen: false
});

$("#dialog-delete").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 300,
    autoOpen: false
});


$('#btn-add-new').click(function(){
    $("#dialog-add-new").dialog('option', 'buttons', {
        "Submit" : function() {

	    let nama=$('#txnama').val();
	    let tarif=$('#txtarif').val();

	    data={
		'mod':mod,
		'act':'addnew',
		'nama':nama,
		'tarif':tarif,
	    };

	    $.ajax({
		url:'backend/index.php',
		method:'POST',
		data:data,
		success:function(resp){
		    console.log('message: '+resp);
		    $.fn.resetForms();
		    $('#id-notice-content').html(resp);
		    $('#id-notice-content').show();
		    
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });		  		  

	    $('#form-add-new')[0].reset();
	    $(this).dialog("close");		  
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });

    $("#dialog-add-new").dialog("open");
});


$('#id_tbody').on('click','.btn-mod-edit',function(){
    let tid=$(this).attr('data-id');
    let tnama=$(this).attr('data-nama');
    let ttarif=$(this).attr('data-tarif');

    $('#txid_edit').val(tid);
    $('#txnama_edit').val(tnama);
    $('#txtarif_edit').val(ttarif);	 

    $("#dialog-edit").dialog('option', 'buttons', {
        "Submit" : function() {
	    let id=$('#txid_edit').val();
	    let nama=$('#txnama_edit').val();
	    let tarif=$('#txtarif_edit').val();

	    data={
		'mod':mod,
		'act':'edit',
		'id':id,
		'nama':nama,
		'tarif':tarif,
	    };

	    $.ajax({
		url:'backend/index.php',
		method:'POST',
		data:data,
		success:function(resp){
		    console.log('message: '+resp);
		    $.fn.resetForms();
		    $('#id-notice-content').html(resp);
		    $('#id-notice-content').show();
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });		  		  		

	    $('#form-edit')[0].reset();
	    $(this).dialog("close");
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });

    $("#dialog-edit").dialog("open");
    
});

$('#id_tbody').on('click','.btn-mod-delete',function(){
    let tid=$(this).attr('data-id');
    let tnama=$(this).attr('data-nama');
    let ttarif=$(this).attr('data-tarif');

    let msg="Yakin untuk hapus data ini?";
    msg+="<table>";
    msg+="<tr><td>ID</td><td>"+tid+"</td></tr>";
    msg+="<tr><td>Nama</td><td>"+tnama+"</td></tr>";
    msg+="<tr><td>Tarif</td><td>"+ttarif+"</td></tr>";
    msg+="</table>";

    $('#msg-delete').html(msg);	 

    $("#dialog-delete").dialog('option', 'buttons', {
        "Submit" : function() {

	    data={
		'mod':mod,
		'act':'delete',
		'id':tid,
	    };

	    $.ajax({
		url:'backend/index.php',
		method:'POST',
		data:data,
		success:function(resp){
		    console.log('message: '+resp);
		    $.fn.resetForms();
		    $('#id-notice-content').html(resp);
		    $('#id-notice-content').show();
		},
		error:function(xhr,status,error){
		    console.log('getting data error');
		}
	    });		  		  		

	    //$('#form-delete')[0].reset();
	    $(this).dialog("close");
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });

    $("#dialog-delete").dialog("open");
    
});
