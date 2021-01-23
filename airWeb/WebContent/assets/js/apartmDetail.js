$(document).ready(function() {
	$("#reservationError").hide();
	var apartment = JSON.parse(sessionStorage.apartForDetail);
	
	//imgs
	$("#myCarousel-2").attr('class', 'carousel slide');
	$("#apartDetailImgs").attr('class', 'carousel-indicators');
	
	for (i = 0; i < apartment['images'].length; i++) {
		var imgLi = $(document.createElement('li'));
		$(imgLi).attr('data-target', '#myCarousel-2');
		$(imgLi).attr('data-slide-to', ""+i);
		$("#apartDetailImgs").append(imgLi);
	}
	$("#apartDetailImgsInner").attr('class', 'carousel-inner');
	for (i = 0; i < apartment['images'].length; i++) {
		var imgInner = $(document.createElement('div'));
		$(imgInner).attr('class', 'item'); 
		var imgInnerSrc = $(document.createElement('img'));
		$(imgInnerSrc).attr('src', 'assets/images/places/'+apartment['images'][i]);
		$(imgInnerSrc).attr('class', 'img-responsive');
		$(imgInnerSrc).css('width', '700px'); 
		$(imgInnerSrc).css('height', '400px');
		$(imgInner).append(imgInnerSrc);
		
		$("#apartDetailImgsInner").append(imgInner);

	}
	$('.carousel-indicators li:first').addClass('active');
	$('.carousel-inner div:first').addClass('active');
	
	
	var aRrow1 = $(document.createElement('a'));
	$(aRrow1).attr('class', 'left carousel-control');
	$(aRrow1).attr('href', "#myCarousel-2");
	$(aRrow1).attr('data-slide', "prev");
	
	
	var arSpan1 = $(document.createElement('span'));
	$(arSpan1).attr('class', 'glyphicon glyphicon-chevron-left');
	$(aRrow1).append(arSpan1);
	
	$("#myCarousel-2").append(aRrow1);
	
	
	var aRrow2 = $(document.createElement('a'));
	$(aRrow2).attr('class', 'right carousel-control');
	$(aRrow2).attr('href', "#myCarousel-2");
	$(aRrow2).attr('data-slide', "next");
	
	var arSpan2 = $(document.createElement('span'));
	$(arSpan2).attr('class', 'glyphicon glyphicon-chevron-right');
	$(aRrow2).append(arSpan2);
	
	$("#myCarousel-2").append(aRrow2);

	/*<div id="myCarousel-2" class="carousel slide">
                        <ol class="carousel-indicators" id="apartDetailImgs">
                            <li data-target="#myCarousel-2" data-slide-to="0" class=""></li>
                            <li data-target="#myCarousel-2" data-slide-to="1" class="active"></li>
                            <li data-target="#myCarousel-2" data-slide-to="2" class=""></li>
                        </ol>
                        <div class="carousel-inner"  apartDetailImgsInner>
                            <!-- Slide 1 -->
                            <div class="item active">
                                <img src="https://via.placeholder.com/700x400/FFB6C1/000000" class="img-responsive" alt="" />
                            </div>
                            <!-- Slide 2 -->
                            <div class="item">
                                <img src="https://via.placeholder.com/700x400/87CEFA/000000" class="img-responsive" alt="" />
                            </div>
                            <!-- Slide 3 -->
                            <div class="item">
                                <img src="https://via.placeholder.com/700x400/B0C4DE/000000" class="img-responsive" alt="" />
                            </div>
                        </div>
                        <a class="left carousel-control" href="#myCarousel-2" data-slide="prev"> <span class="glyphicon glyphicon-chevron-left"></span> </a>
                        <a class="right carousel-control" href="#myCarousel-2" data-slide="next"> <span class="glyphicon glyphicon-chevron-right"></span> </a>
                    </div>*/
	
	//location
	$('#locationDetailInfo').text(apartment['location']["adress"]["street"] + ", "+apartment['location']["adress"]["place"]);
	
	//price
	$('#priceDetail').text("$"+apartment['price']);
	
	
	
	
	
	//host stars comments info
	var nRed = $(document.createElement('br'));
	
	var hostDetail = $(document.createElement('span'));
	$(hostDetail).attr('class', 'small');
	$(hostDetail).text("Hosted by "+apartment['host']['username']);
	$('#locationDetailInfo').append(nRed);
	$('#locationDetailInfo').append(hostDetail);
	var nRed2 = $(document.createElement('br'));
	$('#locationDetailInfo').append(nRed2);
	
	
	for (i = 0; i <apartment['stars']; i++) {
		var sD1 = $(document.createElement('i'));
		$(sD1).attr('class', 'fa fa-star fa-2x text-primary');
		$('#locationDetailInfo').append(sD1);
		}
	
	var raymak = $(document.createElement('span'));
	$('#locationDetailInfo').append(raymak);
	

	var commentsDetail = $(document.createElement('p'));
	$(commentsDetail).attr('class', 'small');
	commNumD = Object.keys(apartment['comments']).length;
	$(commentsDetail).text(" "+commNumD+" comments");
	$('#locationDetailInfo').append(commentsDetail);
	
	/*              <span class="small"></span>
    <i class="fa fa-star fa-2x text-primary"></i>
    <i class="fa fa-star fa-2x text-primary"></i>
    <i class="fa fa-star fa-2x text-primary"></i>
    <i class="fa fa-star fa-2x text-primary"></i>
    <i class="fa fa-star fa-2x text-muted"></i>
    <a href="javascript:void(0);">109 customer reviews</a>*/
	
	//type and number of rooms
	
	$('#Apartmentype').text(apartment['type']);
	$('#NumGuestsDetail').text(apartment['guestsCap']+" guests");
	
	
	//comments

	for (i = 0; i < apartment['comments'].length; i++) {
		if(apartment['comments'][i]['status']){
		var commLi = $(document.createElement('li'));
		$(commLi).attr('class', 'clearfix');
		
		
		var imgCommLi = $(document.createElement('img'));
		$(imgCommLi).attr('src', 'assets/images/home/alfred.jpeg');
		$(imgCommLi).attr('class', 'avatar');
		$(commLi).append(imgCommLi);
		
		var commDiv = $(document.createElement('div'));
		$(commDiv).attr('class', 'post-comments');
		
		var pDivLiMeta = $(document.createElement('p'));
		$(pDivLiMeta).attr('class', 'meta');
		
		var aMeta = $(document.createElement('a'));
		$(aMeta).text(apartment['comments'][i]['guest']['username']+ " says : ");
		$(pDivLiMeta).append(aMeta);
		
		var starsHolder = $(document.createElement('i'));
		$(starsHolder).attr('class', 'pull-right');
		
		var loopBorder = apartment['comments'][i]['stars'];
		for (j = 0; j <loopBorder; j++) {
			var commentStar = $(document.createElement('i'));
			$(commentStar).attr('class', 'fa fa-star fa-2x text-primary small');
			$(starsHolder).append(commentStar);
			}
		
		$(pDivLiMeta).append(starsHolder);
		$(commDiv).append(pDivLiMeta);
		
		var pDivLiText = $(document.createElement('p'));
		$(pDivLiText).text(apartment['comments'][i]['comment']);
		
		$(commDiv).append(pDivLiText);
		
		$(commLi).append(commDiv);
		$("#messagesListDetail").append(commLi);
		}
	}
	
	
	
	
/*             
				<li class="clearfix">
				  <img src="https://bootdey.com/img/Content/user_1.jpg" class="avatar" alt="">
				  <div class="post-comments">
				      <p class="meta"> <a href="#">JohnDoe</a> says : 
				      			<i class="pull-right">
				      			<i class="fa fa-star fa-2x text-primary"></i>
                				<i class="fa fa-star fa-2x text-primary"></i>
                				<i class="fa fa-star fa-2x text-primary"></i>
                				<i class="fa fa-star fa-2x text-primary"></i>
                				<i class="fa fa-star fa-2x text-muted"></i>
				      			</i></p>
				      <p>
				          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
				          Etiam a sapien odio, sit amet
				      </p>
				  </div>
				</li>
				*/
	
	
	//more details
	
	var numOfRooms = $(document.createElement('dt'));
	$(numOfRooms).append("Number of rooms");
	$('#apartmentDetail').append(numOfRooms);
	
	var numberRooms = $(document.createElement('dd'));
	$(numberRooms).append(apartment['roomCap']+ " rooms");
	$('#apartmentDetail').append(numberRooms);
	
	var br1 = $(document.createElement('br'));
	$('#apartmentDetail').append(br1);
	
	var checkIn = $(document.createElement('dt'));
	$(checkIn).append("CHECK IN");
	$('#apartmentDetail').append(checkIn);
	
	var chInTime = $(document.createElement('dd'));
	$(chInTime).text(apartment['checkin']);
	$('#apartmentDetail').append(chInTime);
	
	var br2 = $(document.createElement('br'));
	$('#apartmentDetail').append(br2);
	
	var checkOut = $(document.createElement('dt'));
	$(checkOut).append("CHECK OUT");
	$('#apartmentDetail').append(checkOut);
	
	var chOutTime = $(document.createElement('dd'));
	$(chOutTime).text(apartment['checkout']);
	$('#apartmentDetail').append(chOutTime);
	
	var br3 = $(document.createElement('br'));
	$('#apartmentDetail').append(br3);
	
	
	//amenities
	
	var amns = $(document.createElement('dt'));
	$(amns).append("Amenities");
	$('#amenitiesDetail').append(amns);
	
	for (i = 0; i < apartment['amenities'].length; i++) {
		var am = $(document.createElement('dd'));
		$(am).text(apartment['amenities'][i]['amenitie']);
		$('#amenitiesDetail').append(am);
		
	}
	
	
	/*
	<dt>Number of rooms</dt>
    <dd>8</dd>
    <br />

    <dt>Check in time</dt>
    <dd>10PM</dd>
    <br />
    
    <dt>Check out time</dt>
    <dd>15PM</dd>
    <br />
    
    <dt>Amenities</dt>
    <dd>TV</dd>
    <dd>Free Wifi</dd>
    <dd>Free Parking</dd>
    <dd>Fridge</dd>
    <dd>High chair</dd>
  
	*/
	
	//availability
	
	var unavailableDates = [];

	apartment['unavailability'].forEach(function (date) {

		unavailableDates.push({
				begin: date['begin'],
				end: date['end']
			});
		
	});
	
	
	
	$('#calendar').availabilityCalendar(unavailableDates);
	var date= null;	
	$("#calendarTable").selectable({
		  filter: "td:not(.unavailable)",
		  selected: function(event, ui) {
			 // var innerDate = Date.parse($(".ui-selected").text()+" "+$('#monthLabel').text());
			  var innerDate = new Date($(".ui-selected").text()+" "+$('#monthLabel').text());
			  if($(".ui-selected").hasClass( "unavailable") || $(".ui-selected").hasClass( "ex-month")){
					 $(".ui-selected").removeClass( "ui-selected");
			  }else	if(innerDate <=  new Date()){
					$(".ui-selected").removeClass( "ui-selected");
			  }else if($(".ui-selected").length>1){
				    $(".ui-selected").removeClass( "ui-selected");
			  }else date=innerDate;
		  },
		  unselected: function(event, ui) {
			 date=null;
		  }
	});
	
	 $("#reservationError").css("color","#ff0000");
  	  $("#reservationError").css("margin","150px");
  	  $("#reservationError").css("padding","5px");
  	  $("#reservationError").css("border-style","solid");
  	  $("#reservationError").css("border-width","2px");
  	  $("#reservationError").css("border-radius","5px");
  	  $("#reservationError").css("border-color","#ff0000");
  	  $("#reservationError").css("font-size","larger");
	 
  
	 //makeReservation button
  	const regex = new RegExp('^[1-9]\\d*$');
	$("#makeReservationButton").click(function(event){
		var numNights = $('input[name="days"]').val();
		var message = $('input[name="message"]').val();
		//validation
			if(date==null){
   		      $("#reservationError").text("You have to pick one date from the calendar"); 
   		      $("#reservationError").show();
			}else if(numNights==null || numNights=="" ){
				$("#reservationError").text("You have to type in the number of nights you'll stay"); 
	   		    $("#reservationError").show();
			}else if(!regex.test(numNights)){
				$("#reservationError").text("The number of nights has to be a whole number bigger than 0"); 
	   		    $("#reservationError").show();
			}else {
				//action
				$("#reservationError").hide();
				if(sessionStorage.user==null){
				    location.replace("http://localhost:8080/airWeb/login.html");
				}else{
					
					var finalDate =date.toISOString();
					 $.ajax({
					        url: "rest/apartments/reservate",
					        type: "POST",
					        data: $.param({
					        	date: finalDate,
					        	numOfNights: numNights,
					            username : sessionStorage.user,
					            apartmID : apartment["id"],
					             message: message
					      }),
					        contentType: 'application/json',
					        success: function(response) {
					        	$("#reservationError").css("border-color","#2da873");
					        	$("#reservationError").css("color","#2da873");
					        	$("#reservationError").text("Reservation successful!"); 
					   		    $("#reservationError").show();
					        },
					        error: function(data, textStatus, xhr) {
					        	$("#reservationError").text(data.responseText); 
					   		    $("#reservationError").show();
					        }
					      });
				}
				
			}
			//alert(date+" "+$('input[name="days"]').val()+ " "+ $('input[name="message"]').val() );
			//window.location.href='login.html';

	});
	//close for users
	$("#closeDetail").hide();
	if(sessionStorage.user!=null){
		$("#closeDetail").show();
		$("#closeDetail").click(function(event){
		location.replace("http://localhost:8080/airWeb/app.html");
	});
	}
	
	
	
	
});