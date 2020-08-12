$(document).ready(function() {
	$('#login-form').submit(function(event) {
		event.preventDefault();
		let username = $('input[name="username"]').val();
		let password = $('input[name="password"]').val();
		$('#error').hide();
		$.post({
			url: 'rest/login',
			data: JSON.stringify({username: username, password: password}),
			contentType: 'application/json',
			success: function(user) {
				alert( "Handler for .success() called." )
				$('#success').text('Login Successful');
				$("#success").show();
			},
			error: function(message) {
				alert( "Handler for .error() called." )
				$('#error').text(message);
				$("#error").show();
			}
		});
	});
});
