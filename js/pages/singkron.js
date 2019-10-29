const mod='singkron';
console.log(mod);

$.fn.resetForms=function(){
    $.ajax({
        url:'backend/?data='+mod,
	method:'GET',
	success:function(resp){
	    console.log(resp);
	    let dx=JSON.parse(resp);	    
	},
	error:function(xhr,status,error){
	    console.log('getting data error');
	}
    });
}

$("#dialog-delete").dialog({
    modal: true,
    bgiframe: true,
    resizable: false,
    width: 400,
    height: 300,
    autoOpen: false
});

$.fn.resetForms();


$('#id_btnproses').on('click',function(){
    
    let msg="Yakin untuk proses?";
    msg+="<table>";
    msg+="<tr><td>Proses ini mungkin memakan waktu beberapa lama, tunggu hingga selesai.</td></tr>";
    msg+="</table>";

    $('#msg-delete').html(msg);	 

    $("#dialog-delete").dialog('option', 'buttons', {
        "Submit" : function() {

	    let fdata=new FormData();
	    fdata.append('mod',mod);
	    fdata.append('act','sync');

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
		    //$.fn.resetForms();
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
