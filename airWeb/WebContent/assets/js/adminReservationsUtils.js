$(document).ready(function() {
    var reservations = null;
    var allResvrs = null;
    //fetch reservations
    $.ajax({
        url: "rest/apartments/getReservations",
        type: "GET",
        contentType: 'application/json',
        success: function(response) {
            reservations = response;
            allResvrs = response;
            $("#reservationTools").show();
                
            	
            	//sort
                var sortReserv = $(document.createElement('button'));
                $(sortReserv).attr('class', 'book-btn pull-right');
                $(sortReserv).attr('type', 'button');
                $(sortReserv).append("sort by price ");
                $(sortReserv).append("<small id=\"orderReserv\">asc<small>");

                $(sortReserv).click(function() {
                    if ($("#orderReserv").text() == "asc") {
                        reservations.sort(function(a, b) {
                            return a.totalPrice - b.totalPrice;
                        });
                        $("#orderReserv").text("desc");
                        $("#adminReservations").empty();
                        reservations.forEach(drawReservation);
                    } else {
                        reservations.sort(function(a, b) {
                            return b.totalPrice - a.totalPrice;
                        });
                        $("#orderReserv").text("asc");
                        $("#adminReservations").empty();
                        reservations.forEach(drawReservation);
                    }
                });

                $("#reservationTools").prepend(sortReserv);
                
                reservations.forEach(drawReservation);
                //search
                var searchReserv = $(document.createElement('input'));
                $(searchReserv).attr('id', 'searchInput');
                $(searchReserv).attr('class', 'pull-right');
                $(searchReserv).attr('margin', '10px 10px 10px 10px');
                $(searchReserv).attr('type', 'text');
                $(searchReserv).attr('placeholder', 'Search by guest username..');
                $("#reservationTools").prepend(searchReserv);

                $(searchReserv).keyup(function() {
                    var filter = $(this).val(),
                        count = 0;
                    if (filter != "") {
                        nameGuest = null;
                        $("#adminReservations").find("li").each(function() {
                            // If the list item does not contain the text phrase fade it out
                            if ($(this).find(".guest").text().search(new RegExp(filter, "i")) < 0) {
                                $(this).hide();
                                // Show the list item if the phrase matches and increase the count by 1
                            } else {
                                nameGuest = $(this).find(".guest").text();
                                reservations = reservations.filter(function(res) {
                                    return res["guest"]["username"].search(new RegExp(filter, "i")) >= 0;
                                });
                                $(this).show();
                                count++;
                            }
                        });
                    } else {
                        reservations = allResvrs;
                        $("#adminReservations").empty();
                        reservations.forEach(drawReservation);
                    }

                });
                
                
                //filter handle
				   $("#applyFilterRes").click(function(event){
					   helper=[];
					   represent=[];
					   if($("#created").is(':checked')){
						    helper= reservations.filter(function(res) {
                               return res["status"].toLowerCase()=="created";
                           });
	                       						
						}
					   
					   represent = $.merge(represent, helper);
					   helper=[];
					   if($("#accepted").is(':checked')){
						   helper = reservations.filter(function(res) {
	                               return res["status"].toLowerCase()=="accepted";
	                           });
		                       						
						}
					   represent = $.merge(represent, helper);
					   helper=[];
					   if($("#refused").is(':checked')){
						   helper = reservations.filter(function(res) {
	                               return res["status"].toLowerCase()=="refused";
	                           });
		                       						
						}
					   represent = $.merge(represent, helper);
					   helper=[];
					   if($("#giveup").is(':checked')){
						   helper = reservations.filter(function(res) {
	                               return res["status"].toLowerCase()=="giveup";
	                           });
		                       					
						}
					   represent = $.merge(represent, helper);
					   helper=[];
					   if($("#done").is(':checked')){
						   helper = reservations.filter(function(res) {
	                               return res["status"].toLowerCase()=="done";
	                           });
					   }
					   represent = $.merge(represent, helper);
					   if(represent.length>0){
						   $("#adminReservations").empty();
						   var filtered = represent.filter(function (el) {
							   return el!=null;
							 });
						   
						   filtered.forEach(drawReservation);
						   reservations=filtered;
					   }else{
						   $("#adminReservations").empty();
						   reservations=allResvrs;
						   reservations.forEach(drawReservation);
					   }
						      					
						   
	                        
	                        
							   
					      
					});
                


            
        },
        error: function(data, textStatus, xhr) {
            alert(data.responseText);
        }
    });


    function drawReservation(reservation) {

        //reservation


        var containerReserv = $(document.createElement('li'));
        $(containerReserv).attr('class', 'position-relative booking');

        var buttons = $(document.createElement('div'));
        $(buttons).attr('class', 'pull-right');
        $(containerReserv).append(buttons);


        var formattedDate = new Date(reservation['beginDate']);
        var d = formattedDate.getDate();
        var m = formattedDate.getMonth();
        m += 1;
        var y = formattedDate.getFullYear();

        var reserveBegin = d + "-" + m + "-" + y;


        var formattedEnd = new Date(reservation['endDate']);
        var dd = formattedEnd.getDate();
        var mm = formattedEnd.getMonth();
        mm += 1;
        var yy = formattedEnd.getFullYear();

        var reserveEnd = dd + "-" + mm + "-" + yy;

        var todaysDate = new Date();
        //3 DUGMETA

        

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
        $(h5).text(reservation['apartment']['location']["adress"]["street"] + ", " + reservation['apartment']['location']["adress"]["place"]);
        $(mediabody).append(h5);

        var statusReserve = $(document.createElement('span'));
        $(statusReserve).attr('class', 'badge badge-primary mx-3');
        $(statusReserve).css('margin-left', '10px');
        $(statusReserve).attr('id', "status-" + reservation['reservationID']);
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




        var date2 = $(document.createElement('span'));
        $(date2).attr('class', 'bg-light-blue');
        $(date2).append(reserveBegin + " to " + reserveEnd + "(" + reservation["numOfNights"] + " nights)");
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
        $(price2).append(reservation['totalPrice'] + "$");
        $(prices).append(price2);



        var host = $(document.createElement('div'));
        $(host).attr('class', 'mb-3');
        $(host).css('margin', '10px 10px 10px 10px');
        $(mediabody).append(host);

        var host1 = $(document.createElement('span'));
        $(host1).attr('class', 'mr-2 d-block d-sm-inline-block mb-2 mb-sm-0');
        $(host1).append("Guest: ");
        $(host).append(host1);

        var host2 = $(document.createElement('span'));
        $(host2).attr('class', 'bg-light-blue guest');
        $(host2).append(reservation['guest']['username']);
        $(host).append(host2);




        $("#adminReservations").append(containerReserv);
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