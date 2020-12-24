package dao;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;





import beans.Adress;
import beans.Apartment;
import beans.Comment;
import beans.Location;
import beans.User;

public class ApartmentDAO {

    private String ctx;
	
	private Map<Integer, Apartment> apartments = new HashMap<>();
	
	private static FileReader fileReader;	
	private UserDAO users;

	public ApartmentDAO() {
		//if you're using this initialize users
	}
	
	public ApartmentDAO(String contextPath) {
		ctx=contextPath;
		users = new UserDAO();
		loadApartments(contextPath);
		System.out.println("loaded apartments");
		apartments.forEach((id,apartment) -> System.out.println(id+" : "+apartment));
	}
	
	
	public Collection<Apartment> findAll() {
		return apartments.values();
	}

	@SuppressWarnings("unchecked")
	private void loadApartments(String contextPath) {
			JSONParser parser = new JSONParser();
			try {				
				Object obj = parser.parse(new FileReader(contextPath + "/assets/jsons/apartments.json"));
				System.out.println("first reading:"+contextPath + "/assets/jsons/apartments.json");
				JSONArray apartmentList = (JSONArray) obj;
				apartmentList.forEach( apartment -> parseUserObject( (JSONObject) apartment ) );
				
				
			} catch (Exception e) {
				e.printStackTrace();
			} finally{
				 if (fileReader != null) try { fileReader.close(); } catch (IOException ignore) {ignore.printStackTrace();}
			}
	}
	
	 @SuppressWarnings({ "null" })
	private  void parseUserObject(JSONObject apartment) 
	    {
		
		 /*

"images":["bed1.jpg", "bathroom1.jpg"],
"amenities":["1", "3", "7", "18"]}}*/
	        JSONObject apartmentObject = (JSONObject) apartment.get("apartment");
	        //simple objects
	        int id = Integer.parseInt((String) apartmentObject.get("id"));    	        
	        String type = (String) apartmentObject.get("type");  	       
	        int roomCap = Integer.parseInt((String) apartmentObject.get("roomCap"));  	        
	        int guestCap = Integer.parseInt((String) apartmentObject.get("guestCap"));    	        
	        float pricePerNight = Float.parseFloat((String) apartmentObject.get("pricePerNight")); 
	        String checkin = (String) apartmentObject.get("checkin");
	        String checkout = (String) apartmentObject.get("checkout");
	        //status 
	        String status = (String) apartmentObject.get("status");
	        boolean statusB;
	        if (status.equals("active")) 
	        	statusB=true;
	        else statusB=false;
	        //location 
	        JSONObject locationObject = (JSONObject) apartmentObject.get("location");
	        Location location = parseLocationObject(locationObject);
	        //host
	        String host = (String) apartmentObject.get("host");
	        User hostObject = users.findUser(host);
	        //comments
	        JSONArray commentsArray = (JSONArray) apartmentObject.get("comments");
	        ArrayList<Comment> comments = new ArrayList<Comment>();
	        if (!commentsArray.isEmpty()){      		
	        		@SuppressWarnings("unchecked")
	        		Iterator<JSONObject> objectIterator =  commentsArray.iterator();
	        		while(objectIterator.hasNext()) {
	        				JSONObject object = objectIterator.next();
	        				Comment comment = parseComment( object);
	        				comments.add(comment);
	        		}
	        }
	        //images
	        JSONArray imagesArray = (JSONArray) apartmentObject.get("images");
	        ArrayList<String> images = new ArrayList<String>();
	        if (!imagesArray.isEmpty()){
	        			for(int i= 0; i<imagesArray.size(); i++){
	        					String image = (String) imagesArray.get(i);	 
	        					images.add(image);
	        			}
	        }

	      //amenities
	       /* JSONArray amenitiesArray = (JSONArray) apartmentObject.get("amenities");
	        ArrayList<Integer> amenities = null;
	        if (!imagesArray.isEmpty()){	
	        		for(int i= 0; i<=amenitiesArray.size(); i++){
	        			    Integer image = (Integer) amenitiesArray.get(i);
	        				amenities.add(image);
	        		}
	        }*/

	        apartments.put(id, new Apartment(id, type, roomCap, guestCap, location, null,
	    			null, hostObject, comments,
	    			images, pricePerNight, checkin, checkout,
	    			 statusB, null, null));
	    }

	private Comment parseComment(JSONObject comment) {
        String user = (String) comment.get("user");
        User userObject = users.findUser(user);
        String commentString = (String) comment.get("comment");  	       
        int stars = Integer.parseInt((String) comment.get("stars"));  	        
        String status = (String) comment.get("status");
        boolean statusB;
        if (status.equals("active")) 
        	statusB=true;
        else statusB=false;
        
        Comment commentReady = new Comment(userObject,commentString, stars, statusB);
		return commentReady;	
	}


	private Location parseLocationObject(JSONObject locationObject) {
		float gWidth = Float.parseFloat((String) locationObject.get("gWidth"));
        float gLength = Float.parseFloat((String) locationObject.get("gLength"));
        String street = (String) locationObject.get("street");
        String place = (String) locationObject.get("place");
        String postalCode = (String) locationObject.get("postalCode");
        return new Location(gWidth, gLength, new Adress(street,place,postalCode));
		 
	}
	 

	 	
}
