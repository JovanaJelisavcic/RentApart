$(document).ready(function() {
	var amenities= null;
	var apartments=[];
	var sortAparts=[];
	//search utils
	$("#searchButton").click(function(event){
		  $("#searchResults").hide();
		  $("#searchItems").empty();
		  $("#searchToolbar").empty();
		  var location = $('input[name="location"]').val();
		  var guests = $('input[name="guests"]').val();
		  var minRooms = $('input[name="minRooms"]').val();
		  var maxRooms = $('input[name="maxRooms"]').val();
		  var budget = $('input[name="price"]').val();
		  var check_in = $('input[name="check_in"]').val();
		  var check_out = $('input[name="check_out"]').val();

		  //budget range
		  f = budget.indexOf("$");
		  l = budget.lastIndexOf("$");
		  lower = budget.slice(f, l);
		  upper = budget.slice(l, budget.length+1);
		  lower = lower.slice(1,lower.length+1);
		  lower = lower.slice(lower,lower.indexOf("-"));
		  lower = lower.trim();
		  upper = upper.slice(1,upper.length+1);
		  upper = upper.trim();
		  //date conversion
		  if((check_in!="" && check_out=="") || (check_in=="" && check_out!="") ){
			  check_in="one";
		  }else if (check_in=="" && check_out=="") {
			 check_in="both";
		  } else{
		  check_in = new Date(check_in);
		  check_out = new Date(check_out);
          check_in = check_in.toISOString();
          check_out = check_out.toISOString();
		  }
		  //fetch apartments
		$.ajax({
			url : "rest/apartments/getApartments",
			type: "GET",
			data:$.param({location: location, guests: guests, minRooms : minRooms, maxRooms : maxRooms, lower : lower, upper : upper, check_in: check_in, check_out : check_out}),
			contentType: 'application/json',
			success: function (response) {
				//get amenities
				apartments= response;
				sortAparts= apartments;
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
								$(amenityFilterInput).attr('id', amenities[i]["id"]);
								
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
				      //sort utils
				      var sort = $(document.createElement('button'));
				      $(sort).attr('class', 'book-btn pull-right');
				      $(sort).append("sort by price ");
				      $(sort).append("<small id=\"order\">asc<small>");
				      $(sort).click(function() {
				    	  	if($("#order").text()=="asc"){
				    	  		sortAparts.sort(function(a,b){
				    	  		    return a.price - b.price;
				    	  		  });
				    	  		$("#order").text("desc");
				    	  		$("#searchItems").empty();
				    	  		sortAparts.forEach(drawResult);		
								$("#searchResults").show();
				    	  	}else{
				    	  		sortAparts.sort(function(a,b){
				    	  		    return b.price - a.price;
				    	  		  });
				    	  		$("#order").text("asc");
				    	  		$("#searchItems").empty();
				    	  		sortAparts.forEach(drawResult);		
								$("#searchResults").show();
				    	  	}
				    	});
				      $("#searchToolbar").append(sort);
				      
				      //draw everything
				      apartments.forEach(drawResult);		
				   $("#searchResults").show();
				   
				   //filter handle
				   $("#applyFilterButton").click(function(event){
					   apartments.forEach(returnDisplay);
					   if($("#room").is(':checked') && $("#place").is(':checked')){
							//response.forEach(returnDisplay);							
						}else if($("#room").is(':checked')){
							apartments.forEach(filterRoom);							
						}else if($("#place").is(':checked')){
							apartments.forEach(filterWholePlace);							
						}
					   
					   
					   var amenitiesForFilter = [];
					   
					   $(".amenityClass:checkbox").each(function(){
						    var $this = $(this);

						    if($this.is(":checked")){
						    	amenitiesForFilter.push($this.attr("id"));
						    }
						});
					  
					   if(amenitiesForFilter.length!=0){
						   apartments.forEach(function (item, index) {
							    filterByAmenities(amenitiesForFilter, item, index)
						   });
						}
					   alert("dodje");
					     fillSortAparts();
					});
		    },
		    error: function(data, textStatus, xhr) {
	        	var text = data.responseText;
	        	 
	        	var errorLab = $(document.createElement('div'));
				$(errorLab).attr('class', 'col-md-4 col-sm-6');
				$(errorLab).css("color","#ff0000");
				$(errorLab).css("margin","5px");
				$(errorLab).css("margin-left","350px");
				$(errorLab).css("padding","5px");
				$(errorLab).css("border-style","solid");
				$(errorLab).css("border-width","2px");
				$(errorLab).css("border-radius","5px");
				$(errorLab).css("border-color","#ff0000");
				$(errorLab).css("font-size","larger");
				$(errorLab).text(data.responseText); 
				$("#searchItems").append(errorLab);
				$("#searchResults").show();
	        	   	 
	        }
	});
});
	
	function drawResult(apartment) {
		
		//results
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
		  window.open("apartmDetail.html","_blank");
		  return false;
		  
		});
		$(morebtn).append(basbtn);
		
		
		
		$("#searchItems").append(container);
		
		
		/*
		<div class="col-md-4 col-sm-6"> DONE
		<div class="single-package-item">DONE
			<img src="assets/images/packages/p1.jpg" alt="package-place"> DONE!
			<div class="single-package-item-txt"> DONE
				<h3>italy <span class="pull-right">$499</span> DONE
				</h3>DONE
				<div class="packages-para">DONE
					<p>DONE
						<span>
							<i class="fa fa-angle-right"></i> 5 daays 6 nights
						</span> DONE
						<i class="fa fa-angle-right"></i>  5 star accomodation DONE
					</p> DONE
					<p>
						<span>
							<i class="fa fa-angle-right"></i>  transportation
						</span>
						<i class="fa fa-angle-right"></i>  food facilities
					 </p>
				</div><!--/.packages-para--> done
				<div class="packages-review">
					<p>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i>
						<i class="fa fa-star"></i> DONE
						<span>2544 review</span>
					</p>
				</div><!--/.packages-review-->
				<div class="about-btn">
					<button  class="about-view packages-btn">
						book now
					</button>
				</div><!--/.about-btn-->
			</div><!--/.single-package-item-txt-->
		</div><!--/.single-package-item-->

	</div><!--/.col-->
*/
		
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
			amnts.push(""+apartment["amenities"][j]["id"]);
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
		sortAparts = apartments.filter(function(apart){
			 chS=""+apart["id"];
			return ids.includes(chS); 
		});

	}
	
});
