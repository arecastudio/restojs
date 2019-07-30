const mod="data-meja";

$.fn.resetForms=function(){
    $('#form-add-new')[0].reset();
    $('#id-notice-content').hide();

    var table_url='backend/?data=meja';
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

    var opt_url='backend/?data=opt-meja-kat';
    $.ajax({
        url:opt_url,
	method:'GET',
	success:function(resp){
	    $('.opt-meja-kat').html(resp);
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
	    let nomor=$('#txnomor').val();
	    let jenis=$('#optjenis').val();
	    
	    data={
		'mod':mod,
		'act':'addnew',
		'nomor':nomor,
		'jenis':jenis,
	    };

	    console.log(data);

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
    //let tid=$(this).attr('data-id');
    let tnomor=$(this).attr('data-nomor');
    let tjenis=$(this).attr('data-jenis');
    let tkatid=$(this).attr('data-katid');

    //$('#txid_edit').val(tid);
    $('#txnomor_edit').val(tnomor);
    $('#optjenis_edit').val(tkatid);

    $("#dialog-edit").dialog('option', 'buttons', {
        "Submit" : function() {
	    //let id=$('#txid_edit').val();
	    let nomor=$('#txnomor_edit').val();
	    let jenis=$('#optjenis_edit').val();

	    data={
		'mod':mod,
		'act':'edit',
		//'id':id,
		'nomor':nomor,
		'jenis':jenis,
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
    let tnomor=$(this).attr('data-nomor');
    let tjenis=$(this).attr('data-jenis');

    let msg="Yakin untuk hapus data ini?";
    msg+="<table>";
    msg+="<tr><td>Nomor Meja</td><td>"+tnomor+"</td></tr>";
    msg+="<tr><td>Jenis</td><td>"+tjenis+"</td></tr>";
    msg+="</table>";

    $('#msg-delete').html(msg);	 

    $("#dialog-delete").dialog('option', 'buttons', {
        "Submit" : function() {

	    data={
		'mod':mod,
		'act':'delete',
		'nomor':tnomor,
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
	    $(this).dialog("close");
        },
        "Cancel" : function() {
            $(this).dialog("close");
        }
    });
    $("#dialog-delete").dialog("open");	 
});
