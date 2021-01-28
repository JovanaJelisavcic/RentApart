$(document).ready(function() {

allUsers=null;
searchedUsers= null;
    //fetch reservations
    $.ajax({
        url: "rest/apartments/getUsers",
        type: "GET",
        contentType: 'application/json',
        success: function(response) {
           
            	allUsers=response;
            	$("#adminUsersPart").show();
            	allUsers.forEach(drawGuests);
 
                //search
                var searchReserv = $(document.createElement('input'));
                $(searchReserv).attr('id', 'searchGuests');
                $(searchReserv).attr('class', 'pull-right');
                $(searchReserv).attr('margin', '10px 10px 10px 10px');
                $(searchReserv).attr('type', 'text');
                $(searchReserv).attr('placeholder', 'Search by guest username..');
                $("#usersToolbar").append(searchReserv);

                $(searchReserv).keyup(function() {
                    var filter = $(this).val(),
                        count = 0;
                    if (filter != "") {
                        nameGuest = null;
                        $("#usersList").find(".nearby-user").each(function() {
                            // If the list item does not contain the text phrase fade it out
                            if ($(this).find(".search-guest").text().search(new RegExp(filter, "i")) < 0) {
                                $(this).hide();
                                // Show the list item if the phrase matches and increase the count by 1
                            } else {
                                nameGuest = $(this).find(".search-guest").text();
                                searchedUsers = users.filter(function(us) {
                                    return us["username"].search(new RegExp(filter, "i")) >= 0;
                                
                                });
                                $(this).show();
                                count++;
                            }
                        });
                    } else {
                        $("#usersList").empty();
                        allUsers.forEach(drawGuests);
                        searchedUsers=null;
                    }

                });
                
                
                	//filter handle
				   $("#resetSex").click(function(event){
					   $("#usersList").empty();
                       users=searchedUsers!=null? searchedUsers : allUsers ;
                       users.forEach(drawGuests); 
                       $('input[id=female]').prop('checked', false);
                       $('input[id=male]').prop('checked', false);
					});
				   $("input[name=sexFilter]").on("change", function () {
				        var item = this;
				        users=searchedUsers!=null? searchedUsers : allUsers ;
	                        
				        if (item.id == "male"){
				        
				        	 users = users.filter(function(us) {
	                               return us["sex"].toLowerCase()=="male";
	                           });
		                        $("#usersList").empty();
		                        users.forEach(drawGuests);
				        } 
				        else if (item.id == "female"){
				        	 users = users.filter(function(us) {
	                               return us["sex"].toLowerCase()=="female";
	                           });
		                        $("#usersList").empty();
		                        users.forEach(drawGuests);
				        }
				    });
				   
						   
				   
                


            
        },
        error: function(data, textStatus, xhr) {
            alert(data.responseText);
        }
    });


    function drawGuests(guest) {
/*              <div class="nearby-user">
                <div class="row">
                  <div class="col-md-2 col-sm-2">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="user" class="profile-photo-lg">
                  </div>
                  <div class="col-md-7 col-sm-7">
                    <h5><a href="#" class="profile-link">Sophia Page</a></h5>
                    <p>Software Engineer</p>
                    <p class="text-muted">500m away</p>
                  </div>
                  <div class="col-md-3 col-sm-3">
                    <button class="btn btn-primary pull-right">Add Friend</button>
                  </div>
                </div>
              </div>*/
    	var oneUser = $(document.createElement('div'));
		$(oneUser).attr('class', 'nearby-user'); 
		$("#usersList").append(oneUser);
		
		
		var rowUser = $(document.createElement('div'));
		$(rowUser).attr('class', 'row'); 
		$(oneUser).append(rowUser);
		
		var colUser = $(document.createElement('div'));
		$(colUser).attr('class', 'col-md-2 col-sm-2'); 
		$(rowUser).append(colUser);
		
		var imgUser = $(document.createElement('img'));
		$(imgUser).attr('src','assets/images/home/alfred.jpeg');
		$(imgUser).css('height','70px');
		$(imgUser).css('width','60px');
		$(colUser).append(imgUser);
		
		var col2User = $(document.createElement('div'));
		$(col2User).attr('class', 'col-md-7 col-sm-7'); 
		$(rowUser).append(col2User);
		
		var nameUser = $(document.createElement('h5'));
		$(nameUser).attr('class', 'profile-link');
		$(nameUser).append(guest['firstName'] + " " + guest['lastName']);
		$(col2User).append(nameUser);
		
		var usernameU = $(document.createElement('p'));
		$(usernameU).attr('class', 'search-guest');
		$(usernameU).append(guest['username']);
		$(col2User).append(usernameU);
		
		var sexUser = $(document.createElement('p'));
		$(sexUser).attr('class', 'text-muted');
		$(sexUser).append(guest['sex']);
		$(col2User).append(sexUser);
		
		
       

    }

   



});