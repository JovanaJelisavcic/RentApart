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
				if(response.role=="guest"){
				
				if(sessionStorage.getItem("apartForDetail")!="null"){
					sessionStorage.user = username;
					location.replace("http://localhost:8080/airWeb/apartmDetail.html");
				}else{
					
				sessionStorage.user = username;
				location.replace("http://localhost:8080/airWeb/app.html");
				}
				}else if(response.role=="host"){
					sessionStorage.user = username;
					location.replace("http://localhost:8080/airWeb/hostApp.html");
				}
		    },
		    error: function (data, textStatus, xhr) {
		    	 $("#errorLab").css("color","#cf180e");
		    	 $("#errorLab").text(data.responseText);
		    	 
		    }
	});
});
});


	
	
	
	
	