$(document).ready(function() {
  $("#registerForm").validate({  	
	rules: {
		firstName: "required",
		lastName : "required",
		username : "required",
		password : "required",
		confirmPassword: {
            required: true,
            equalTo: "#password"
        }
	},
	messages: {
		confirmPassword: {
			equalTo: "Passwords don't match!"
	      }
	},
    submitHandler: function(form) {
     // event.preventDefault(); //prevent default action 
      var username = $('input[name="username"]').val();
      var password = $('input[name="password"]').val();
      var firstName = $('input[name="firstName"]').val();
      var lastName = $('input[name="lastName"]').val();
      var sex = $('input[type=radio][name=gender]:checked').val();

      $.ajax({
        url: "rest/begin/register",
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
          location.replace("http://localhost:8080/airWeb/app.html");
        },
        error: function(data, textStatus, xhr) {
        	var text = data.responseText;
        	 $("#uniqueError").text(text);
        	 $("#uniqueError").show();       	 
        }
      });
    }
  });
});
