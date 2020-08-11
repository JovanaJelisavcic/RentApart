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
				$('#success').text('Login Successful');
				$("#success").show();
			},
			error: function(message) {
				$('#error').text(message);
				$("#error").show();
			}
		});
	});
});
