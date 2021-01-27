$(document).ready(function() {

 var amenities=null;
 $('[data-toggle="datepicker"]').datepicker();
 
 var k =1;
 
 $("#addPeriod").click(function(event){
	 
	 		k++;
	    var row = $(document.createElement('div'));
		$(row).attr('class', 'row'); 
		$("#periods").append(row); 
		//checkin
		var incol = $(document.createElement('div'));
		$(incol).attr('class', 'col-lg-2 col-md-3 col-sm-4'); 
		$(row).append(incol);
		
		var intab = $(document.createElement('div'));
		$(intab).attr('class', 'single-tab-select-box'); 
		$(incol).append(intab);
		
		var inh = $(document.createElement('h5'));
		$(inh).append('Start of a free period'); 
		$(intab).append(inh);
		
		var intavel = $(document.createElement('div'));
		$(intavel).attr('class', 'travel-check-icon'); 
		$(intab).append(intavel);
		
		var ininput = $(document.createElement('input'));
		$(ininput).attr('class', 'form-control'); 
		$(ininput).attr('type', 'text'); 
		$(ininput).attr('name', 'check_in'+k);
		$(ininput).attr('id', 'check_in'+k); 
		$(ininput).attr('data-toggle', 'datepicker'); 
		$(ininput).attr('placeholder', '02/01/2021'); 
		$(intavel).append(ininput);
			
		//checkout
		var outcol = $(document.createElement('div'));
		$(outcol).attr('class', 'col-lg-2 col-md-3 col-sm-4'); 
		$(row).append(outcol);
		
		var outtab = $(document.createElement('div'));
		$(outtab).attr('class', 'single-tab-select-box'); 
		$(outcol).append(outtab);
		
		var outh = $(document.createElement('h5'));
		$(outh).append('End of a free period'); 
		$(outtab).append(outh);
		
		var outravel = $(document.createElement('div'));
		$(outravel).attr('class', 'travel-check-icon'); 
		$(outtab).append(outravel);
		
		var outinput = $(document.createElement('input'));
		$(outinput).attr('class', 'form-control'); 
		$(outinput).attr('type', 'text'); 
		$(outinput).attr('name', 'check_out'+k); 
		$(outinput).attr('id', 'check_out'+k); 
		$(outinput).attr('data-toggle', 'datepicker'); 
		$(outinput).attr('placeholder', '02/06/2021'); 
		$(outravel).append(outinput);
		 $('[data-toggle="datepicker"]').datepicker();
		$("#periods").append(row);
	 
 	});
 	
 if(amenities==null){
		$.ajax({
			url : "rest/apartments/getAmenities",
			type: "GET",
			contentType: 'application/json',
			success: function (response) {
				 
				amenities =response;
				for (i = 0; i < amenities.length; i++) {
					
					var amenityFilter = $(document.createElement('div'));
					$(amenityFilter).attr('class', 'checkbox');
					
					var amenityFilterLabel = $(document.createElement('label'));
					
					
					var amenityFilterInput = $(document.createElement('input'));
					$(amenityFilterInput).attr('type', 'checkbox');
					$(amenityFilterInput).attr('class', 'icheck amenityClass');
					$(amenityFilterInput).attr('id', amenities[i]["id"]);
					
					$(amenityFilterLabel).append(amenityFilterInput);
					$(amenityFilterLabel).append(amenities[i]["amenitie"]);
					$(amenityFilter).append(amenityFilterLabel);
					$("#amenitiesAvailable").append(amenityFilter);
					
				}
			},
			error: function (response) {
				alert("There's been a mistake, check your connection");
			}
		});
	}
 
	$('#addApartForm').ajaxForm(function() { 
    }); 
	
	jQuery.validator.addMethod(
			  "regex",
			   function(value, element, regexp) {
			       if (regexp.constructor != RegExp)
			          regexp = new RegExp(regexp);
			       else if (regexp.global)
			          regexp.lastIndex = 0;
			          return this.optional(element) || regexp.test(value);
			   },"has to be whole positive non zero number"
			);
	
	jQuery.validator.addMethod("greaterThan", 
			function(value, element, params) {

			    if (!/Invalid|NaN/.test(new Date(value))) {
			        return new Date(value) > new Date($(params).val());
			    }

			    return isNaN(value) && isNaN($(params).val()) 
			        || (Number(value) > Number($(params).val())); 
			},'Must be greater than begin date and last period end date');
 
 $("#addApartForm").validate({  	
		rules: {
			roomCap: {
				required : true,
				regex : "^$|^[1-9]\\d*$"
			},
			guestCap :{
				required : true,
				regex : "^$|^[1-9]\\d*$"
			},
			street : "required",
			city : "required",
			postalCode: "required",
			state : "required",
			price : {
				required : true,
				regex : "^$|^[1-9]\\d*$"
			},
			checkin : "required",
			checkout: "required",
			check_in1 : {
				required : true,
			},
			check_out1 : {
				required : true,
			    greaterThan: check_in1
			}

		},
	    submitHandler: function(form) {
	    		var j;
	    		var checkins = [];
	    	    var checkouts = [];
	    	for (j = 1; j <= k; j++) {
	    	 checkins.push(new Date($('input[name="check_in'+j+'"]').val()));
	    	 checkouts.push(new Date($('input[name="check_out'+j+'"]').val()));
	    	}
	    	alert(checkins);
	    	var passes= true;
	    	if(k!=1){
	    		if(validatePeriods(checkins,checkouts)){
	    		}else passes=false;
	    	} 
	    	
	    	if(passes){
	    		alert("passed");
	      $.ajax({
	        url: "rest/apartments/postApartment",
	        type: "POST",
	        data: $.param({
	      }),
	        contentType: 'application/json',
	        success: function(response) {
	        	alert("woooo");
	        },
	        error: function(data, textStatus, xhr) {
	        	alert("boooo");
	        }
	      });
	    	}else{//sta ako ne prodje valid
	    		alert("passnot");
	    	}
	    }
	  });
 
 
 		function validatePeriods(checkins, checkouts){
	   var m;
	   
	    for(m=1; m<k;m++){
	    	var o =m+1;
	    	alert("");
	    	if(checkouts[o]<new Date (checkins[m])){
	    		alert("comes");
	    		return false;
	    	}	
	    }
	    return true;
 		}
 
 
});