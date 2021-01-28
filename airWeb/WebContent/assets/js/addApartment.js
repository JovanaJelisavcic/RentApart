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
	    	 $("#validError").hide();
	    		var j;
	    		var checkins = [];
	    	    var checkouts = [];
	    	for (j = 1; j <= k; j++) {
	    	 checkins.push(($('input[name="check_in'+j+'"]').val()));
	    	 checkouts.push(($('input[name="check_out'+j+'"]').val()));
	    	}
	    	var passes= true;
	    	if(k!=1){
	    		if(validatePeriods(checkins,checkouts)){
	    		}else passes=false;
	    	} 
	    	
	    	if(passes){
	    	    var freeDates=[];
	    	      for(var r=0; r<k; r++){
	    	    	  freeDates.push({begin: checkins[r], end : checkouts[r]});
	    	      }
	    	    
	    	      var amenities = [];
				   $(".amenityClass:checkbox").each(function(){
					    var $this = $(this);
					    if($this.is(":checked")){
					    	amenities.push($this.attr("id"));
					    }
					});
	    	      var formData = new FormData();
	    	      formData.append('state', $('input[name="state"]').val());
	    	      formData.append('street', $('input[name="street"]').val());
	    	      formData.append('place', $('input[name="city"]').val());
	    	      formData.append('postalCode', $('input[name="postalCode"]').val());
	    	      formData.append('checkout', $('input[name="checkout"]').val());
	    	      formData.append('checkin', $('input[name="checkin"]').val());
	    	      formData.append('price', $('input[name="price"]').val());
	    	      formData.append('guestCap', $('input[name="guestCap"]').val());
	    	      formData.append('roomCap', $('input[name="roomCap"]').val());
	    	      formData.append('type', $('input[type=radio][name=form-field-radio]:checked').val());
	    	      formData.append('place', $('input[name="city"]').val());
	    	      formData.append('postalCode', $('input[name="postalCode"]').val());
	    	      formData.append('images', $('#images').prop('files')); 
	    	      formData.append('freeDates', freeDates);
	    	      formData.append('amenities', amenities);
	    	      
	      $.ajax({
	        url: "rest/apartments/postApartment",
	        type: "POST",
	        data: formData,
	        processData: false,
	        contentType: false,
	        cache: false,
	        success: function(response) {
	        	location.replace("http://localhost:8080/airWeb/hostApp.html");
	        },
	        error: function(data, textStatus, xhr) {
	        	$("#validError").text("Saving was unsuccessfull");
	    		$("#validError").show();
	        }
	      });
	    	}else{
	    		$("#validError").text("Dates have to be sequential in all periods");
	    		$("#validError").show();
	    	}
	    }
	  });
 
 
 		function validatePeriods(checkins, checkouts){
	   var m;
	   var paz =true;
	    for(m=1; m<k;m++){
	    	var o =m+1;
	    	var mbsec = Date.parse(checkins[o]);
	    	begsec =new Date(mbsec);
	    	var mefs = Date.parse(checkouts[m]);
	    	efs=new Date (mefs);
	    	var mbfs = Date.parse(checkins[m]);
	    	bfs=new Date (mbfs);
	    	if(begsec > efs ){
	    		paz=false;
	    	}
	    	if(bfs > efs ){
	    		paz=false;
	    	}
	    	
	    	
	    }
	    return paz;
 		}
 
 
});