const mod="kategori-menu";

$.fn.resetForms=function(){
    $('#form-add-new')[0].reset();
    $('#id-notice-content').hide();

    var table_url='backend/?data='+mod;
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

    let jenis_menu="<option value='MAKAN'>MAKAN</option>";
    jenis_menu+="<option value='MINUM'>MINUM</option>";
    $('.opt-jenis-menu').html(jenis_menu);
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
            let kategori=$('#txkategori').val();
            let jenis=$('#optjenis').val();
	    
            data={
                'mod':mod,
                'act':'addnew',
                'kategori':kategori,
                'jenis':jenis,
            };

            console.log(data);

            $.ajax({
                url:'backend/?',
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
    let tkategori=$(this).attr('data-kategori');
    let tjenis=$(this).attr('data-jenis');
    let tid=$(this).attr('data-id');

    //$('#txid_edit').val(tid);
    $('#txkategori_edit').val(tkategori);
    $('#optjenis_edit').val(tjenis);

    $("#dialog-edit").dialog('option', 'buttons', {
        "Submit" : function() {
            //let id=$('#txid_edit').val();
            let kategori=$('#txkategori_edit').val();
            let jenis=$('#optjenis_edit').val();

            data={
                'mod':mod,
                'act':'edit',
                'id':tid,
                'kategori':kategori,
                'jenis':jenis,
            };

            console.log(data);

            $.ajax({
                url:'backend/?',
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
    let tkategori=$(this).attr('data-kategori');
    let tjenis=$(this).attr('data-jenis');
    let tid=$(this).attr('data-id');

    let msg="Yakin untuk hapus data ini?";
    msg+="<table>";
    msg+="<tr><td>ID</td><td>"+tid+"</td></tr>";
    msg+="<tr><td>Kategori</td><td>"+tkategori+"</td></tr>";
    msg+="<tr><td>Jenis</td><td>"+tjenis+"</td></tr>";
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
                url:'backend/?',
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
