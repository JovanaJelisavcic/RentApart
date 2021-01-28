$(document).ready(function() {

activeApartments=[];
inactiveApartments= [];
apartsToSort=[];
amenities=null;
    //fetch reservations
    $.ajax({
        url: "rest/apartments/getHostApartments",
        type: "GET",
        contentType: 'application/json',
        success: function(response) {
  
            	
            		response.forEach(divideApartments);
            		
            		if(activeApartments.length>0){
            		activeApartments.forEach(drawHostApart);
            		apartsToSort=activeApartments;
            		$("#hostApartmentsPart").show();
            		$("#hostApartments").show();

            		//filter
            				//get amenities
            				if(amenities==null){
            					$.ajax({
            						url : "rest/apartments/getAmenities",
            						type: "GET",
            						contentType: 'application/json',
            						success: function (response) {
            							 //fetch all amenities
            							amenities =response;
            							for (i = 0; i < amenities.length; i++) {
            								/*filters
            								 *  <div class="checkbox">
            						             		 <label><input type="checkbox" class="icheck"> Application</label>
            						            </div>*/
            								
            								var amenityFilter = $(document.createElement('div'));
            								$(amenityFilter).attr('class', 'checkbox');
            								
            								var amenityFilterLabel = $(document.createElement('label'));
            								
            								
            								var amenityFilterInput = $(document.createElement('input'));
            								$(amenityFilterInput).attr('type', 'checkbox');
            								$(amenityFilterInput).attr('class', 'icheck amenityClass');
            								$(amenityFilterInput).attr('id', "amenity-"+amenities[i]["id"]);
            								
            								$(amenityFilterLabel).append(amenityFilterInput);
            								$(amenityFilterLabel).append(amenities[i]["amenitie"]);
            								$(amenityFilter).append(amenityFilterLabel);
            								$("#amenitiesFilters").append(amenityFilter);   
            									      
            								
            							}
            						},
            						error: function (response) {
            							alert("There's been a mistake, check your connection");
            						}
            					});
            				}
            				

            				
            				$("#applyFilterApartms").click(function(event){
								   activeApartments.forEach(returnDisplay);
								   if($("#room").is(':checked') && $("#place").is(':checked')){							
									}else if($("#room").is(':checked')){
										activeApartments.forEach(filterRoom);							
									}else if($("#place").is(':checked')){
										activeApartments.forEach(filterWholePlace);							
									}
								   
								   
								   var amenitiesForFilter = [];
								   
								   $(".amenityClass:checkbox").each(function(){
									    var $this = $(this);

									    if($this.is(":checked")){
									    	amenitiesForFilter.push($this.attr("id"));
									    }
									});
								  
								   if(amenitiesForFilter.length!=0){
									   activeApartments.forEach(function (item, index) {
										    filterByAmenities(amenitiesForFilter, item, index)
									   });
									}
								   fillSortAparts();
								  
            				});
            				
            				
           				 //sort utils
        				      var sort = $(document.createElement('button'));
        				      $(sort).attr('class', 'book-btn pull-right');
        				      $(sort).attr('margin', '10px 10px 10px 10px');
        				      $(sort).append("sort by price ");
        				      $(sort).append("<small id=\"orderApart\">asc<small>");
        				      $(sort).click(function() {
        				    	  	if($("#orderApart").text()=="asc"){
        				    	  		apartsToSort.sort(function(a,b){
        				    	  		    return a.price - b.price;
        				    	  		  });
        				    	  		$("#orderApart").text("desc");
        				    	  		$("#hostApartments").empty();
        				    	  		apartsToSort.forEach(drawHostApart);		
        								$("#hostApartments").show();
        				    	  	}else{
        				    	  		apartsToSort.sort(function(a,b){
        				    	  		    return b.price - a.price;
        				    	  		  });
        				    	  		$("#orderApart").text("asc");
        				    	  		$("#hostApartments").empty();
        				    	  		apartsToSort.forEach(drawHostApart);		
        								$("#hostApartments").show();
        				    	  	}
        				    	});
        				      $("#apartmentsToolbar").append(sort);
        				      
        				     
            		
            		}else {
            			var titleReserv = $(document.createElement('h4'));
    					$(titleReserv).attr('class', 'text-center'); 
    					$(titleReserv).text('You don\'t have any active apartments'); 
    					$("#hostApartments").append(titleReserv);
            		}
            		
            		if(inactiveApartments.length>0){
            			inactiveApartments.forEach(drawHostApart);
                		$("#hostApartmentsPart").show();
                		$("#inactiveApartments").show();
                		$("#titleinactive").show();
                		}else {
                			var titleReserv = $(document.createElement('h4'));
        					$(titleReserv).attr('class', 'card-title'); 
        					$(titleReserv).text('You don\'t have any inactive apartments'); 
        					$("#inactiveApartments").append(titleReserv);
                		}
            	    
            		
            
        },
        error: function(data, textStatus, xhr) {
            alert(data.responseText);
        }
    });

    function drawHostApart(apartment){
    	var container = $(document.createElement('div'));
		$(container).attr('class', 'col-md-4 col-sm-6 pass-filter');
		$(container).attr('id', 'apartment'+apartment["id"]);
	
		
		var single_package = $(document.createElement('div'));
		$(single_package).attr('class', 'single-package-item'); 
		$(container).append(single_package);
		
		var img = document.createElement('img');
		$(img).css('width', '370px'); 
		$(img).css('height', '300px');
        img.src = 'assets/images/places/'+apartment['images'][0]; 
        $(single_package).append(img);
		
		var single_package_txt = $(document.createElement('div'));
		$(single_package_txt).attr('class', 'single-package-item-txt'); 
		$(single_package).append(single_package_txt);
		
		var city_name = $(document.createElement('h3'));
		$(city_name).append( apartment['location']["adress"]["street"]); 
		
		var price = $(document.createElement('span'));
		$(price).attr('class', 'pull-right'); 
		$(price).append("$"+apartment['price']); 
		$(city_name).append(price);
		
		var razmak = $(document.createElement('br'));
		$(city_name).append(razmak);
		$(city_name).append(apartment['location']["adress"]["place"]);
		
		$(single_package_txt).append(city_name);
		
		var packages_para = $(document.createElement('div'));
		$(packages_para).attr('class', 'packages-para'); 
		$(single_package_txt).append(packages_para);
		
		
	//PRVI P
		var simple_p = $(document.createElement('p'));
		$(packages_para).append(simple_p);
		
		var span1 = $(document.createElement('span'));
		$(simple_p).append(span1);
		
		var i1 = $(document.createElement('i'));
		$(i1).attr('class', 'fa fa-angle-right');
		$(i1).append(apartment['type']);
		$(span1).append(i1);
		
		
		var i2 = $(document.createElement('i'));
		$(i2).attr('class', 'fa fa-angle-right');
		$(i2).append(" "+apartment['roomCap']+" rooms");
		$(span1).append(i2);
		
		var i3 = $(document.createElement('i'));
		$(i3).attr('class', 'fa fa-angle-right');
		$(i3).append("up to "+apartment['guestsCap']+" guests");
		$(span1).append(i3);
			
		
		
		//DRUGI P
		var simple_p1 = $(document.createElement('p'));
		$(packages_para).append(simple_p1);
		
		var span11 = $(document.createElement('span'));
	//	$(span11).append( apartment['amenities[0]']); 
		$(simple_p1).append(span11);
		
		var i;
		for (i = 0; i < apartment['amenities'].length; i++) {
			if (i === 3) { break; }
			var i11 = $(document.createElement('i'));
			$(i11).attr('class', 'fa fa-angle-right');
			$(i11).append(apartment['amenities'][i]['amenitie']);
			$(span11).append(i11);
			
		}
		
							
		
		//packages review
		var packages_review = $(document.createElement('div'));
		$(packages_review).attr('class', 'packages-review'); 
		$(single_package_txt).append(packages_review);
		
		var simple_p3 = $(document.createElement('p'));
		$(packages_review).append(simple_p3);
		
		
		//stars
		
		
		
		for (i = 0; i <apartment['stars']; i++) {
			var s1 = $(document.createElement('i'));
			$(s1).attr('class', 'fa fa-star');
			$(simple_p3).append(s1);
			}
		
		
		var span2 = $(document.createElement('span'));
		commNum = Object.keys(apartment['comments']).length;
		$(span2).append( commNum+" comments"); 
		$(simple_p3).append(span2);
		
		
		//aboutbtn
		
		var morebtn = $(document.createElement('div'));
		$(morebtn).attr('class', 'about-btn'); 
		$(single_package_txt).append(morebtn);
		
		var basbtn = $(document.createElement('button'));
		$(basbtn).attr('class', 'about-view packages-btn'); 
		$(basbtn).append("see more");
		
		$(basbtn).click(function(){
		  sessionStorage.apartForDetail = JSON.stringify(apartment);
		  location.replace("hostApartmentDetail.html");
		  return false;
		  
		});
		$(morebtn).append(basbtn);
		
		var changeBtn = $(document.createElement('button'));
		$(changeBtn).attr('class', 'about-view packages-btn'); 
		$(changeBtn).append("change");
		
		$(changeBtn).click(function(){
		  
		});
		$(morebtn).append(changeBtn);
		
		var deleteBtn = $(document.createElement('button'));
		$(deleteBtn).attr('class', 'about-view packages-btn delete-btn'); 
		$(deleteBtn).attr('id', 'delete-'+apartment["id"]); 
		$(deleteBtn).append("delete");
		 $(deleteBtn).click(function(){
	    	  $.ajax({
					url : "rest/apartments/deleteApartment",
					type: "POST",
					data: $.param({apartmentId :apartment["id"] }),
					contentType: 'application/json',
					success: function (response) {
						
					},
					error: function (response) {
						alert("There's been a mistake, check your connection");
					}
				});
			});
		
		$(morebtn).append(deleteBtn);
		
		if(apartment["status"]){
			$("#hostApartments").append(container);
		}else $("#inactiveApartments").append(container);
		
		
				
	
    }
    
    function divideApartments(apartment){
    			if(apartment["status"]){
    				activeApartments.push(apartment);
    			}else inactiveApartments.push(apartment);
    }
    
    
	function filterWholePlace(apartment){
		if(apartment["type"].toUpperCase() != "WHOLE PLACE"){
			
			$('#apartment'+apartment["id"]).removeClass("pass-filter");
			$('#apartment'+apartment["id"]).addClass("no-pass-filter");
		}
	}
	
	function filterRoom(apartment){
		if(apartment["type"].toUpperCase() != "PRIVATE ROOM"){
			
			$('#apartment'+apartment["id"]).removeClass("pass-filter");
			$('#apartment'+apartment["id"]).addClass("no-pass-filter");
		}
	}
	
	function returnDisplay(apartment){

		$('#apartment'+apartment["id"]).removeClass("no-pass-filter");
		$('#apartment'+apartment["id"]).addClass("pass-filter");
			
	}
	
	function filterByAmenities(amenitiesForFilter, apartment, index){
		var passes = true;
		var amnts = [];
		for(var j=0; j<apartment["amenities"].length; j++){
			amnts.push("amenity-"+apartment["amenities"][j]["id"]);
		}

		for(var i=0; i<amenitiesForFilter.length; i++){
			if(!amnts.includes(""+amenitiesForFilter[i])){
				passes=false;
			}	
		}
		if(passes!=true){
			$('#apartment'+apartment["id"]).removeClass("pass-filter");
			$('#apartment'+apartment["id"]).addClass("no-pass-filter");
		}	
	}
	
	function fillSortAparts(){
		var ids=[];
		   $("div").find('.pass-filter').each(function(){
			   apid=$(this).attr('id');
			   apid=apid.slice(9);
			   ids.push(apid);
		   });
		   apartsToSort = activeApartments.filter(function(apart){
			 chS=""+apart["id"];
			return ids.includes(chS); 
		});
		
	}
	
});