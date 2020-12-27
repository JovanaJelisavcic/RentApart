$(document).ready(function() {
	$("#searchButton").click(function(event){
		  $("#searchResults").hide();
		  var location = $('input[name="location"]').val();
		$.ajax({
			url : "rest/apartments/getApartments",
			type: "GET",
			data:$.param({location: location}),
			contentType: 'application/json',
			success: function (response) {
				
				response.forEach(function(apartment) {
					alert("Successful load of apartments data example:"+apartment['id']);
	
					var container = $(document.createElement('div'));
					$(container).attr('class', 'col-md-4 col-sm-6'); 
					
					var single_package = $(document.createElement('div'));
					$(single_package).attr('class', 'single-package-item'); 
					$(container).append(single_package);
					
					var img = document.createElement('img'); 
		            img.src = 'assets/images/packages/p1.jpg'; 
		            $(single_package).append(img);
					
					var single_package_txt = $(document.createElement('div'));
					$(single_package_txt).attr('class', 'single-package-item-txt'); 
					$(single_package).append(single_package_txt);
					
					var city_name = $(document.createElement('h3'));
					$(city_name).append( apartment['id'] ); //treba ime posle cu  
					
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
					$(span1).append("5 daays 6 nights"); 
					$(simple_p).append(span1);
					
					var i1 = $(document.createElement('i'));
					$(i1).attr('class', 'fa fa-angle-right');
					$(span1).append(i1);
					
					
					var i2 = $(document.createElement('i'));
					$(i2).attr('class', 'fa fa-angle-right');
					$(simple_p).append(i2);
					
					$(simple_p).append( " 5 star accomodation");
					
					
					
					
					
					//DRUGI P
					var simple_p1 = $(document.createElement('p'));
					$(packages_para).append(simple_p1);
					
					var span11 = $(document.createElement('span'));
					$(span11).append( "transportation"); 
					$(simple_p1).append(span11);
					
					var i11 = $(document.createElement('i'));
					$(i11).attr('class', 'fa fa-angle-right');
					$(span11).append(i11);
					
					
					var i21 = $(document.createElement('i'));
					$(i21).attr('class', 'fa fa-angle-right');
					$(simple_p1).append(i21);
					$(simple_p1).append( " food facilities");
					
					
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
					$(span2).append( "2335 reviews"); 
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
	        	alert(text);    	 
	        }
	});
});
});
