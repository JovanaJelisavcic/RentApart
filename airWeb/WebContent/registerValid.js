$(document).ready(function() {
  $("#registerForm").validate({
    rules: {
      firstname: "required",
      lastname: "required",
      username: "required",
      password: {
        required: true,
        minlength: 6
      }
    },
    // Specify validation error messages
    messages: {
      firstname: "Please enter your first name",
      lastname: "Please enter your last name",
      password: {
        required: "Please provide a password",
        minlength: "Your password must be at least 6 characters long"
      },
      username: "Please enter a username"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
    	form.submit();
    }
  });
});