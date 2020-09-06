$(document).ready(function() {
    $("#registerForm").submit(function(event){
    	event.preventDefault(); //prevent default action 
		var username = $('input[name="username"]').val();
		var password = $('input[name="password"]').val();
		var firstName = $('input[name="firstName"]').val();
		var lastName = $('input[name="lastName"]').val();
		var sex = $('input[type=radio][name=gender]:checked').val();
		
		$.ajax({
			url : "rest/register",
			type: "POST",
			data : JSON.stringify({ username: username, password : password,
				firstName: firstName ,lastName: lastName, sex: sex }),
			contentType: 'application/json',
			success: function (response) {
				location.replace("http://localhost:8080/airWeb/app.html");
		    },
		    error: function (xhr, status, error) {
		    	 alert("Registration unsuccessful");
		    	 
		    }
	});
    });
});
	
	
	
	/*

  
  *
  *
  *
  *$("#registerForm").validate({
		debug: true,
		//more validation 
		submitHandler: function(form) {
			event.preventDefault(); //prevent default action 
			var username = $('input[name="username"]').val();
			var password = $('input[name="password"]').val();
			var firstName = $('input[name="firstName"]').val();
			var lastName = $('input[name="lastName"]').val();
			//sex missing
			
			$.ajax({
				url : "rest/register",
				type: "POST",
				data : JSON.stringify({ username: "youbetter", password : "workbi",
					firstName: "tch", lastName: "tessa", sex: "female" }),
				contentType: 'application/json',
				success: function (response) {
					location.replace("http://localhost:8080/airWeb/app.html");
			    },
			    error: function (xhr, status, error) {
			    	 alert("Registration unsuccessful front end");			    	 
			    }
		});
		}
	});*/
