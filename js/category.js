$(document).ready(function(){

    console.log('ready brooo...');

    
    var token=$("input[name='csrfmiddlewaretoken']").val();
    
    $('#id_btn_reset').click(function(){
	//$('#id_name').val('');
	//$('#id_description').val('');
	$('#id_form_categories')[0].reset();
	console.log('form has been reseted');
    });

    var data_of_table='<tr><td>90909</td><td>90909</td><td>90909</td><td>90909</td><td>90909</td></tr>';

    
    $('#tbody-data').html(data_of_table);

    $('#id_btn_submit').click(function(){
	console.log('form has been submited');
	
	var input_name=$('#id_name').val();
	var input_description=$('#id_description').val();
	var input_types=$('#id_types').val();

	var data={
	    'name':input_name,
	    'description':input_description,
	    'types':input_types,
	}

	console.log('data: '+JSON.stringify(data));

	$.ajax({
	    url:'categories',
	    method:'POST',
	    headers:{
		"X-CSRFToken":token
	    },
	    data:data,
	    success:function(resp){
		console.log('submitting success');
	    },
	    error:function(xhr,status,error){
		console.log('submitting error');
	    }
	});
    });
});
