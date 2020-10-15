// Wait for the DOM to be ready
$(function() {
  // Initialize form validation on the registration form.
  // It has the name attribute "registration"
  $("form[name='changeProfile']").validate({
    // Specify validation rules
    rules: {
      // The key name on the left side is the name attribute
      // of an input field. Validation rules are defined
      // on the right side
      firstname: "required",
      lastname: "required",
      password : "required",
      newpassword: "required",
	  confirmpassword: {
          required: true,
          equalTo: "#newpassword"
      }
    },
    // Specify validation error messages
    messages: {
    	confirmpassword: {
			equalTo: "Passwords don't match!"
	      }
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});