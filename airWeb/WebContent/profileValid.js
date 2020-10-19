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
    	// event.preventDefault(); //prevent default action 
        var username = $('input[name="username"]').val();
        var password = $('input[name="password"]').val();
        var firstName = $('input[name="firstname"]').val();
        var lastName = $('input[name="lastname"]').val();
        var sex = $('input[type=radio][name=gender]:checked').val();

        $.ajax({
          url: "rest/changeProfile",
          type: "POST",
          data: JSON.stringify({
            username: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            sex: sex
          }),
          contentType: 'application/json',
          success: function(response) {
        	 alert("Success - changed profile info");
            location.replace("http://localhost:8080/airWeb/app.html");
          },
          error: function(data, textStatus, xhr) {
        	  alert(data.responseText);
          	/*var text = data.responseText;
          	 $("#uniqueError").text(text);
          	 $("#uniqueError").show();   */    	 
          }
        }); 
    }
  });

});