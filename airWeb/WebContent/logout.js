$(document).ready(function() {
	$("#logout").click(function(event){
		event.preventDefault(); //prevent default action 
		$.ajax({
			url : "rest/logout",
			type: "POST",
			contentType: 'application/json',
			success: function (response) {
				location.replace("http://localhost:8080/airWeb/login.html");
		    },
		    error: function (response) {
		    	alert("Unsuccessful logout");
		    }
	});
});
});


	
	
	
	
	