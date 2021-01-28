$(document).ready(function () {
  var amenities = null;
  $('[data-toggle="datepicker"]').datepicker();

  var k = 1;

  $("#addPeriod").click(function (event) {
    k++;
    var row = $(document.createElement("div"));
    $(row).attr("class", "row");
    $("#periods").append(row);
    //checkin
    var incol = $(document.createElement("div"));
    $(incol).attr("class", "col-lg-2 col-md-3 col-sm-4");
    $(row).append(incol);

    var intab = $(document.createElement("div"));
    $(intab).attr("class", "single-tab-select-box");
    $(incol).append(intab);

    var inh = $(document.createElement("h5"));
    $(inh).append("Start of a free period");
    $(intab).append(inh);

    var intavel = $(document.createElement("div"));
    $(intavel).attr("class", "travel-check-icon");
    $(intab).append(intavel);

    var ininput = $(document.createElement("input"));
    $(ininput).attr("class", "form-control");
    $(ininput).attr("type", "text");
    $(ininput).attr("name", "check_in" + k);
    $(ininput).attr("id", "check_in" + k);
	$(ininput).attr("data-toggle", "datepicker");
	$(ininput).datepicker('setDate', "01/31/2021");
	let start_date = $('#check_out'+(k-1)).val();
	$(ininput).datepicker('setStartDate', start_date);
	
	var minDate = $(ininput).datepicker( "option", "minDate" );
	console.log(minDate);
    $(intavel).append(ininput);

    //checkout
    var outcol = $(document.createElement("div"));
    $(outcol).attr("class", "col-lg-2 col-md-3 col-sm-4");
    $(row).append(outcol);

    var outtab = $(document.createElement("div"));
    $(outtab).attr("class", "single-tab-select-box");
    $(outcol).append(outtab);

    var outh = $(document.createElement("h5"));
    $(outh).append("End of a free period");
    $(outtab).append(outh);

    var outravel = $(document.createElement("div"));
    $(outravel).attr("class", "travel-check-icon");
    $(outtab).append(outravel);

    var outinput = $(document.createElement("input"));
    $(outinput).attr("class", "form-control");
    $(outinput).attr("type", "text");
    $(outinput).attr("name", "check_out" + k);
    $(outinput).attr("id", "check_out" + k);
    $(outinput).attr("data-toggle", "datepicker");

	$(outinput).datepicker( "setDate", "10/12/2012" );
    $(outravel).append(outinput);
    $('[data-toggle="datepicker"]').datepicker(
		{
			minDate: "+1w"
		} 
	);
    $("#periods").append(row);
  });

  if (amenities == null) {
    $.ajax({
      url: "rest/apartments/getAmenities",
      type: "GET",
      contentType: "application/json",
      success: function (response) {
        amenities = response;
        for (i = 0; i < amenities.length; i++) {
          var amenityFilter = $(document.createElement("div"));
          $(amenityFilter).attr("class", "checkbox");

          var amenityFilterLabel = $(document.createElement("label"));

          var amenityFilterInput = $(document.createElement("input"));
          $(amenityFilterInput).attr("type", "checkbox");
          $(amenityFilterInput).attr("class", "icheck amenityClass");
          $(amenityFilterInput).attr("id", amenities[i]["id"]);

          $(amenityFilterLabel).append(amenityFilterInput);
          $(amenityFilterLabel).append(amenities[i]["amenitie"]);
          $(amenityFilter).append(amenityFilterLabel);
          $("#amenitiesAvailable").append(amenityFilter);
        }
      },
      error: function (response) {
        alert("There's been a mistake, check your connection");
      },
    });
  }

  $("#addApartForm").ajaxForm(function () {});

  jQuery.validator.addMethod(
    "regex",
    function (value, element, regexp) {
      if (regexp.constructor != RegExp) regexp = new RegExp(regexp);
      else if (regexp.global) regexp.lastIndex = 0;
      return this.optional(element) || regexp.test(value);
    },
    "has to be whole positive non zero number"
  );

  jQuery.validator.addMethod(
    "greaterThan",
    function (value, element, params) {
      if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) > new Date($(params).val());
      }

      return (
        (isNaN(value) && isNaN($(params).val())) ||
        Number(value) > Number($(params).val())
      );
    },
    "Must be greater than begin date and last period end date"
  );

  $("#addApartForm").validate({
    rules: {
      roomCap: {
        required: true,
        regex: "^$|^[1-9]\\d*$",
      },
      guestCap: {
        required: true,
        regex: "^$|^[1-9]\\d*$",
      },
      street: "required",
      city: "required",
      postalCode: "required",
      state: "required",
      price: {
        required: true,
        regex: "^$|^[1-9]\\d*$",
      },
      checkin: "required",
      checkout: "required",
      check_in1: {
        required: true,
      },
      check_out1: {
        required: true,
        greaterThan: check_in1,
      },
    },
    submitHandler: function (form) {
      $("#validError").hide();
      var j;
      var checkins = [];
      var checkouts = [];
      for (j = 1; j <= k; j++) {
        checkins.push($('input[name="check_in' + j + '"]').val());
        checkouts.push($('input[name="check_out' + j + '"]').val());
      }


        var freeDates = [];
        for (var r = 0; r < k; r++) {
          freeDates.push({ begin: checkins[r], end: checkouts[r] });
        }
        var amenities = [];
        $(".amenityClass:checkbox").each(function () {
          var $this = $(this);
          if ($this.is(":checked")) {
            amenities.push($this.attr("id"));
          }
        });
     
        var state= $('input[name="state"]').val();
        var street= $('input[name="street"]').val();
        var city= $('input[name="city"]').val();
        var postalCode= $('input[name="postalCode"]').val();
       var checkout = $('input[name="checkout"]').val();
        var checkin = $('input[name="checkin"]').val();
      var price = $('input[name="price"]').val();
       var guestCap =  $('input[name="guestCap"]').val();
       var roomCap = $('input[name="roomCap"]').val();
       
       var type =   $("input[type=radio][name=form-field-radio]:checked").val();
       


       var images= $("#images").prop("files");


        $.ajax({
          url: "rest/apartments/postApartment",
          type: "POST",
          data: $.param({state : state, street : street, city : city, postalCode : postalCode, 
        	  checkout: checkout, checkin : checkin, price : price, guestCap : guestCap, roomCap : roomCap,
        	  freeDates : freeDates, amenities : amenities }),
          success: function (response) {
            location.replace("http://localhost:8080/airWeb/hostApp.html");
          },
          error: function (data, textStatus, xhr) {
            $("#validError").text("Saving was unsuccessfull");
            $("#validError").show();
          },
        });
      
    },
  });

});
