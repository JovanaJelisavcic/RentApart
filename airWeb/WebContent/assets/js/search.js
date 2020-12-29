$(document).ready(function() {
	$("#searchButton").click(function(event){
		  $("#searchResults").hide();
		  $("#searchItems").empty();
		  var location = $('input[name="location"]').val();
		  var guests = $('input[name="guests"]').val();
		  var minRooms = $('input[name="minRooms"]').val();
		  var maxRooms = $('input[name="maxRooms"]').val();
		$.ajax({
			url : "rest/apartments/getApartments",
			type: "GET",
			data:$.param({location: location, guests: guests, minRooms : minRooms, maxRooms : maxRooms}),
			contentType: 'application/json',
			success: function (response) {
				
				response.forEach(function(apartment) {
	
					var container = $(document.createElement('div'));
					$(container).attr('class', 'col-md-4 col-sm-6'); 
					$(container).css('max-height', '750px');
					$(container).css('max-width', '500px');
				
					
					var single_package = $(document.createElement('div'));
					$(single_package).attr('class', 'single-package-item'); 
					$(container).append(single_package);
					
					var img = document.createElement('img'); 
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
					
					var s1 = $(document.createElement('i'));
					$(s1).attr('class', 'fa fa-star');
					$(simple_p3).append(s1);
					
					var s2 = $(document.createElement('i'));
					$(s2).attr('class', 'fa fa-star');
					$(simple_p3).append(s2);
					
					var s3 = $(document.createElement('i'));
					$(s3).attr('class', 'fa fa-star');
					$(simple_p3).append(s3);
					
					var s4 = $(document.createElement('i'));
					$(s4).attr('class', 'fa fa-star');
					$(simple_p3).append(s4);
					
					var s5 = $(document.createElement('i'));
					$(s5).attr('class', 'fa fa-star');
					$(simple_p3).append(s5);
					
					var span2 = $(document.createElement('span'));
					commNum = Object.keys(apartment.comments).length;
					$(span2).append( commNum+" comments"); 
					$(simple_p3).append(span2);
					
					
					//aboutbtn
					
					var morebtn = $(document.createElement('div'));
					$(morebtn).attr('class', 'about-btn'); 
					$(single_package_txt).append(morebtn);
					
					var basbtn = $(document.createElement('button'));
					$(basbtn).attr('class', 'about-view packages-btn'); 
					$(basbtn).append("see more");
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
					});		
				$("#searchResults").show();
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
});
