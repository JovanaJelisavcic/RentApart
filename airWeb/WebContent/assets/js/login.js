$(document).ready(function() {
	
	$("#loginform").submit(function(event){
		event.preventDefault(); //prevent default action 
		var username = $('input[name="usernameLogin"]').val();
		var password = $('input[name="passwordLogin"]').val();
		$.ajax({
			url : "rest/begin/login",
			type: "GET",
			data : $.param({ username: username, password : password}),
			contentType: 'application/json',
			success: function (response) {
				location.replace("http://localhost:8080/airWeb/app.html");
		    },
		    error: function (xhr, status, error) {
		    	 $("#errorLab").css("color","#cf180e");
		    	 $("#errorLab").text("Invalid password and/or username.");
		    	 
		    }
	});
});
});


	
	
	
	
	