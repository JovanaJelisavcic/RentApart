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
import beans.Amenity;
import beans.Apartment;
import beans.Comment;
import beans.Location;
import beans.User;

public class ApartmentDAO {

    //private String ctx;
	
	private Map<Integer, Apartment> apartments = new HashMap<>();
	
	private static FileReader fileReader;	
	private UserDAO users;
	private AmenityDAO amenitiesDAO;

	public ApartmentDAO() {
		//if you're using this initialize users
	}
	
	public ApartmentDAO(String contextPath, UserDAO userDAO, AmenityDAO amenityDAO) {
		//ctx=contextPath;
		users = userDAO;
		amenitiesDAO = amenityDAO;
		loadApartments(contextPath);
		System.out.println("loaded apartments");
		apartments.forEach((id,apartment) -> System.out.println(id+" : "+apartment));
	}
	
	
	public Collection<Apartment> findAll() {
		return apartments.values();
	}
	//moze biti i grad i drzava
	public Collection<Apartment> getByLocation(String location) {
		Collection<Apartment> apartsByLocation = new ArrayList<>();
		for (Apartment apartment : apartments.values()) {
		    if (apartment.getLocation().getAdress().getPlace().toUpperCase().equals(location.toUpperCase()))
		    	apartsByLocation.add(apartment);
		}
		if (apartsByLocation.isEmpty()){
			for (Apartment apartment : apartments.values()) {
			    if (apartment.getLocation().getAdress().getState().toUpperCase().equals(location.toUpperCase()))
			    	apartsByLocation.add(apartment);
			}
		}
		return apartsByLocation;
	}
	
	public Collection<Apartment> getByGuestsNum(int guestsNum) {
		Collection<Apartment> apartsByGuests = new ArrayList<>();
		for (Apartment apartment : apartments.values()) {
		    if (apartment.getGuestsCap()==guestsNum)
		    	apartsByGuests.add(apartment);
		}
		return apartsByGuests;
	}

	public Collection<Apartment> getByRoomsNum(int minRooms, int maxRooms) {
		Collection<Apartment> apartsByRooms = new ArrayList<>();
		for (Apartment apartment : apartments.values()) {
		    if (apartment.getRoomCap()>=minRooms && apartment.getRoomCap()<=maxRooms )
		    	apartsByRooms.add(apartment);
		}
		return apartsByRooms;
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
	

	@SuppressWarnings("unchecked")
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


	        JSONArray amenitiesArray = (JSONArray) apartmentObject.get("amenities");
	        amenitiesArray.forEach(am -> {System.out.println(am);});
	        
	        ArrayList<Amenity> amenities = new ArrayList<Amenity>();
	        if (!amenitiesArray.isEmpty()){	
	        		for(int i= 0; i<amenitiesArray.size(); i++){
	        			    String amenityID = (String) amenitiesArray.get(i);	      
	        			    Amenity amenityObj = amenitiesDAO.findAmenity( Integer.valueOf(amenityID));
	        				amenities.add(amenityObj);
	        		}
	        }
	        System.out.println(amenities.toString());
	        
	        apartments.put(id, new Apartment(id, type, roomCap, guestCap, location, null,
	    			null, hostObject, comments,
	    			images, pricePerNight, checkin, checkout,
	    			 statusB, amenities, null));
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
        String state = (String) locationObject.get("state");
        return new Location(gWidth, gLength, new Adress(street,place,postalCode,state));
		 
	}

	

	
	 

	 	
}
