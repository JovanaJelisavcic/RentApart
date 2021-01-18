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
	
	
	
	
	
	//host, stars, comments
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
	
	
});