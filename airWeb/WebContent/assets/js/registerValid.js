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
      var newPass ="";
      var role = "guest"
      $.ajax({
        url: "rest/begin/register",
        type: "POST",
        data: $.param({
        	username: username,
        	password: password,
            firstName: firstName,
            lastName: lastName,
            sex: sex,
            newPass : newPass,
            role : role
      }),
        contentType: 'application/json',
        success: function(response) {
        	if(sessionStorage.getItem("apartForDetail")!="null"){
				sessionStorage.user = username;
				location.replace("http://localhost:8080/airWeb/apartmDetail.html");
			}else{
			sessionStorage.user = username;
			location.replace("http://localhost:8080/airWeb/app.html");
			}
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
