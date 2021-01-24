$(document).ready(function() {

		//fetch reservations
		$.ajax({
			url : "rest/apartments/getUserReservations",
			type: "GET",
			contentType: 'application/json',
			success: function (response) {
				
				if(response.length!=0){
					
					//sort
					//  <h4 class="card-title">Booking Requests</h4>
					var titleReserv = $(document.createElement('h4'));
					$(titleReserv).attr('class', 'card-title'); 
					$(titleReserv).text('Reservations'); 
					$("#sortReservations").append(titleReserv);
					
					var sortReserv = $(document.createElement('button'));
					$(sortReserv).attr('class', 'book-btn pull-right'); 
					$(sortReserv).attr('type', 'button'); 
					$(sortReserv).append("sort by price ");
					$(sortReserv).append("<small id=\"orderReserv\">asc<small>");
					
				      $(sortReserv).click(function() {
				    	  	if($("#orderReserv").text()=="asc"){
				    	  		response.sort(function(a,b){
				    	  		    return a.totalPrice - b.totalPrice;
				    	  		  });
				    	  		$("#orderReserv").text("desc");
				    	  		$("#reservationsList").empty();
				    	  		response.forEach(drawReservation);		
				    	  	}else{
				    	  		response.sort(function(a,b){
				    	  		    return b.totalPrice - a.totalPrice;
				    	  		  });
				    	  		$("#orderReserv").text("asc");
				    	  		$("#reservationsList").empty();
				    	  		response.forEach(drawReservation);		
				    	  	}
				    	});
				      $("#sortReservations").append(sortReserv);
					
					
				response.forEach(drawReservation);		
				}else{
					var titleReserv = $(document.createElement('h4'));
					$(titleReserv).attr('class', 'card-title'); 
					$(titleReserv).text('You haven\'t made no reservations yet'); 
					$("#sortReservations").append(titleReserv);
				}
			},
		    error: function(data, textStatus, xhr) {
	        	alert(data.responseText);
	        	
	        }
	});

	
		function drawReservation(reservation){
			
			
			//reservation
			var containerReserv = $(document.createElement('li'));
			$(containerReserv).attr('class', 'position-relative booking');
			
			var buttons = $(document.createElement('div'));
			$(buttons).attr('class', 'pull-right'); 
			$(containerReserv).append(buttons);
			
			if(reservation["status"].toUpperCase()=="ACCEPTED" || reservation["status"].toUpperCase()=="CREATED" ){
			var giveup = $(document.createElement('button'));
			$(giveup).attr('class', 'book-btn give-up-class'); 
			$(giveup).attr('type', 'button'); 
			$(giveup).attr('id', 'giveUp'+reservation['reservationID']); 
			$(giveup).css('margin-left', '10px');
			$(giveup).append("Give Up");
			$(buttons).append(giveup);
			$("#giveUp"+reservation['reservationID']).click(function(event){
				$.ajax({
					url : "rest/begin/giveUpOnReservation",
					type: "POST",
					data : $.param({ reservationID: reservation['reservationID']}),
					contentType: 'application/json',
					success: function (response) {
						alert("you gave up ");
				    },
				    error: function (response) {
				    	alert("dont ggive up ");
				    }
					});
				});
			}
			if(reservation["status"].toUpperCase()=="REFUSED" || reservation["status"].toUpperCase()=="DONE" ){
			var review = $(document.createElement('button'));
			$(review).attr('class', 'book-btn');
			$(review).attr('type', 'button'); 
			$(giveup).css('margin-right', '10px'); 
			$(review).append("Review");
			$(buttons).append(review);
			}
			var media = $(document.createElement('div'));
			$(media).attr('class', 'media'); 
			$(containerReserv).append(media);
			
			var imgReserve = document.createElement('div');
			$(imgReserve).attr('class', 'msg-img');
			$(media).append(imgReserve);
			
			var imga = document.createElement('img');
			$(imga).attr('class', 'msg-img');
			imga.src = 'assets/images/home/house.jpg'; 
			$(imgReserve).append(imga);
	        
			var mediabody = $(document.createElement('div'));
			$(mediabody).attr('class', 'media-body'); 
			$(media).append(mediabody);
			
			
			var h5 = $(document.createElement('h5'));
			$(h5).attr('class', 'mb-4'); 
			$(h5).text(reservation['apartment']['location']["adress"]["street"] + ", "+reservation['apartment']['location']["adress"]["place"]);
			$(mediabody).append(h5);
			
			var statusReserve = $(document.createElement('span'));
			$(statusReserve).attr('class', 'badge badge-primary mx-3');
			$(statusReserve).css('margin-left', '10px');
			$(statusReserve).append(reservation['status']);
			$(h5).append(statusReserve);
			
			
			var dates = $(document.createElement('div'));
			$(dates).attr('class', 'mb-3'); 
			$(dates).css('margin', '10px 10px 10px 10px');
			$(mediabody).append(dates);
			
			var date1 = $(document.createElement('span'));
			$(date1).attr('class', 'mr-2 d-block d-sm-inline-block mb-2 mb-sm-0'); 
			$(date1).append("Booking dates: ");
			$(dates).append(date1);
					
			var formattedDate = new Date(reservation['beginDate']); 
			var d = formattedDate.getDate();
			var m =  formattedDate.getMonth();
			m += 1;
			var y = formattedDate.getFullYear();

			var reserveBegin =d + "-" + m + "-" + y;
			
			
			var formattedEnd = new Date(reservation['endDate']); 
			var dd = formattedEnd.getDate();
			var mm =  formattedEnd.getMonth();
			mm += 1;
			var yy = formattedEnd.getFullYear();

			var reserveEnd =dd + "-" + mm + "-" + yy;
			
			
			var date2 = $(document.createElement('span'));
			$(date2).attr('class', 'bg-light-blue'); 
			$(date2).append(reserveBegin + " to "+reserveEnd+ "("+reservation["numOfNights"]+" nights)");
			$(dates).append(date2);
			
			
			var message = $(document.createElement('div'));
			$(message).attr('class', 'mb-3'); 
			$(message).css('margin', '10px 10px 10px 10px');
			$(mediabody).append(message);
			
			var message1 = $(document.createElement('span'));
			$(message1).attr('class', 'mr-2 d-block d-sm-inline-block mb-2 mb-sm-0'); 
			$(message1).append("Message: ");
			$(message).append(message1);
			
			var message2 = $(document.createElement('span'));
			$(message2).attr('class', 'bg-light-blue'); 
			$(message2).append(reservation['message']);
			$(message).append(message2);
			
			
			var prices = $(document.createElement('div'));
			$(prices).attr('class', 'mb-3'); 
			$(prices).css('margin', '10px 10px 10px 10px');
			$(mediabody).append(prices);
			
			var price1 = $(document.createElement('span'));
			$(price1).attr('class', 'mr-2 d-block d-sm-inline-block mb-2 mb-sm-0'); 
			$(price1).append("Total price: ");
			$(prices).append(price1);
			
			var price2 = $(document.createElement('span'));
			$(price2).attr('class', 'bg-light-blue'); 
			$(price2).append(reservation['totalPrice']+"$");
			$(prices).append(price2);
			
			
			
			var host = $(document.createElement('div'));
			$(host).attr('class', 'mb-3'); 
			$(host).css('margin', '10px 10px 10px 10px');
			$(mediabody).append(host);
			
			var host1 = $(document.createElement('span'));
			$(host1).attr('class', 'mr-2 d-block d-sm-inline-block mb-2 mb-sm-0'); 
			$(host1).append("Host: ");
			$(host).append(host1);
			
			var host2 = $(document.createElement('span'));
			$(host2).attr('class', 'bg-light-blue'); 
			$(host2).append(reservation['apartment']['host']['username']);
			$(host).append(host2);
			
			
			
			
			
			$("#reservationsList").append(containerReserv);
			/*
			  <li class="position-relative booking">
              <div class="media">
                  <div class="msg-img">
                      <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="">
                  </div>
                  <div class="media-body">
                      <h5 class="mb-4">Sunny Apartment <span class="badge badge-primary mx-3">Pending</span><span class="badge badge-danger">Unpaid</span></h5>
                      <div class="mb-3">
                          <span class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0">Booking Date:</span>
                          <span class="bg-light-blue">02.03.2020 - 04.03.2020</span>
                      </div>
                      <div class="mb-3">
                          <span class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0">Booking Details:</span>
                          <span class="bg-light-blue">2 Adults</span>
                      </div>
                      <div class="mb-3">
                          <span class="mr-2 d-block d-sm-inline-block mb-2 mb-sm-0">Price:</span>
                          <span class="bg-light-blue">$147</span>
                      </div>
                      <div class="mb-5">
                          <span class="mr-2 d-block d-sm-inline-block mb-1 mb-sm-0">Clients:</span>
                          <span class="border-right pr-2 mr-2">John Inoue</span>
                          <span class="border-right pr-2 mr-2"> john@example.com</span>
                          <span>123-563-789</span>
                      </div>
                      <a href="#" class="btn-gray">Send Message</a>
                  </div>
              </div>
              <div class="buttons-to-right">
                  <a href="#" class="btn-gray mr-2"><i class="far fa-times-circle mr-2"></i> Reject</a>
                  <a href="#" class="btn-gray"><i class="far fa-check-circle mr-2"></i> Approve</a>
              </div>
          </li>
*/
			
		}

	

});
