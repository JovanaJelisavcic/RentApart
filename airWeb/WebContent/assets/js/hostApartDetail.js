$(document).ready(function() {

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
		
		
		var removeB = $(document.createElement('button'));
		$(removeB).attr('class', 'btn btn-light');
		(removeB).append('Hide');
		$(commDiv).append(removeB);
		
		
		
		$(commLi).append(commDiv);
		$("#messagesListDetail").append(commLi);
		}
	}
	

	
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
	
	//close for users
	if(sessionStorage.user!=null){
		$("#closeDetail").css("visibility", "visible");
		$("#closeDetail").click(function(event){
		location.replace("http://localhost:8080/airWeb/hostApp.html");
	});
	}
	
	
	
	
});