package dao;

import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import beans.Amenity;

public class AmenityDAO {

    //private String ctx;
	
	private Map<Integer, Amenity> amenities = new HashMap<>();
	
	private static FileReader fileReader;	


	public AmenityDAO() {
		
	}
	
	public AmenityDAO(String contextPath) {
		loadAmenities(contextPath);
		System.out.println("loaded amenities");
		amenities.forEach((id,amenity) -> System.out.println("id"+" : "+id + "," +"amenity"+" : "+amenity.getAmenitie()));
	}
	
	
	public Amenity findAmenity(int amenityID) {
		return amenities.get(amenityID);

	}


	@SuppressWarnings("unchecked")
	private void loadAmenities(String contextPath) {
			JSONParser parser = new JSONParser();
			try {				
				Object obj = parser.parse(new FileReader(contextPath + "/assets/jsons/amenities.json"));
				System.out.println("first reading:"+contextPath + "/assets/jsons/amenities.json");
				JSONArray amenityList = (JSONArray) obj;
				amenityList.forEach( amenity -> parseUserObject( (JSONObject) amenity ) );
				
				
			} catch (Exception e) {
				e.printStackTrace();
			} finally{
				 if (fileReader != null) try { fileReader.close(); } catch (IOException ignore) {ignore.printStackTrace();}
			}
	}
	

	private  void parseUserObject(JSONObject amenity) 
	    {

	        JSONObject amenityObject = (JSONObject) amenity.get("amenity");
	
	        int id = Integer.parseInt((String) amenityObject.get("numId"));    	        
	        String name = (String) amenityObject.get("name");
	        amenities.put(id,new Amenity(id, name));
	    }

	

	 	
}

