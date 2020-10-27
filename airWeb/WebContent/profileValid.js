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
        var uname = $("#username").text();
        var username = uname.replace('@','');
        var password = $('input[name="password"]').val();
        var firstName = $('input[name="firstname"]').val();
        var lastName = $('input[name="lastname"]').val();
        var sex = $('input[type=radio][name=gender]:checked').val();
        var newPassword = $('input[name="newpassword"]').val();
        var role = $("#role").text();
        
        
        

        $.ajax({
          url: "rest/changeProfile",
          type: "POST",
          data: JSON.stringify({
            	username: username,
            	password: password,
                firstName: firstName,
                lastName: lastName,
                sex: sex,
                newPass : newPassword,
                role : role
          }),
          contentType: 'application/json',
          success: function(response) {
        	  $("#errorLab").hide();
        	  $("#passchange").hide();
        	  $('input[name=password').val('');
        	  $("#successLab").css("color","#2da873");
        	  $("#successLab").css("margin","5px");
        	  $("#successLab").css("border-style","solid");
        	  $("#successLab").css("border-width","2px");
        	  $("#successLab").css("border-radius","5px");
        	  $("#successLab").css("border-color","#2da873");
        	  $("#successLab").css("font-size","larger");
		      $("#successLab").text("Successfully changed your profile info");
		      $("#successLab").show();
          },
          error: function(data, textStatus, xhr) {
        	  
        	  if(data.responseText.includes("password")){
        	  $("#successLab").hide();
        	  $("#passchange").hide();
        	  $('input[name=password').val('');
        	  $("#errorLab").css("color","#ff0000");
		      $("#errorLab").text(data.responseText); 
		      $("#errorLab").show();
        	  }else {
        		  $("#errorLab").hide();
        		  $("#passchange").hide();
        		  $('input[name=password').val('');
        		  $("#successLab").css("color","#ff0000");
            	  $("#successLab").css("margin","5px");
            	  $("#successLab").css("padding","5px");
            	  $("#successLab").css("border-style","solid");
            	  $("#successLab").css("border-width","2px");
            	  $("#successLab").css("border-radius","5px");
            	  $("#successLab").css("border-color","#ff0000");
            	  $("#successLab").css("font-size","larger");
    		      $("#successLab").text(data.responseText); 
    		      $("#successLab").show();
        	  }
          }
        }); 
    }
  });

});