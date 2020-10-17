$(document).ready(function() {
	
	$("#showPass").click(function(){
	    $("#passchange").show();
	  });
	
	
	$.ajax({
		url : "rest/currentUser",
		type: "GET",
		contentType: 'application/json',
		success: function (response) {
		    $('#username').text("@"+response.username);
		    $('#fullname').text(response.firstName+" "+response.lastName);
		    $('#role').text(response.role);
		    $('#firstname').attr('value', response.firstName);
		    $('#lastname').attr('value', response.lastName);
		    if(response.sex == "male"){
		    	$("[name=gender]").val(["male"]);}
		    else {$("[name=gender]").val(["female"]);}
	    },
	    error: function (response) {
	    	alert("Unsuccessful load of personal data. Check your connection!");
	    }
	});
	
	
	  
  
  $("form[name='changeProfile']").validate({
   
    rules: {
      
      firstname: "required",
      lastname: "required",
      password : "required",
	  confirmpassword: {
          required: false,
          equalTo: "#newpassword"
      }
    },
   
    messages: {
    	password: {
    		required: "We need your password for saving changes"
    	},
    	confirmpassword: {
			equalTo: "Passwords don't match!"
	      }
    },
  
    submitHandler: function(form) {
      form.submit();
    }
  });

});