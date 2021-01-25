package dao;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import beans.Apartment;
import beans.Reservation;
import beans.User;

public class UserDAO {
	
	private String ctx;
	
	private Map<String, User> users = new HashMap<>();
	

	private static FileWriter fileWrite;
	private static FileReader fileReader;	

	
	
	public UserDAO() {
		
	}
	
	public UserDAO(String contextPath) {
		ctx=contextPath;
		loadUsers(contextPath);
		System.out.println("loaded users");
		users.forEach((username,user) -> System.out.println(username+" : "+user));
	}
	
	public User find(String username, String password) {
		if (!users.containsKey(username)) {
			return null;
		}
		User user = users.get(username);
		if (!user.getPassword().equals(password)) {
			return null;
		}
		return user;
	}
	
	public boolean checkUnique(String username) {
		if (!users.containsKey(username)) {
			return true;
		}
		else
		return false;
	}
	
	public  boolean saveUser(User user) 
    {  	
    	   users.put(user.getUsername(), user);
    	   if(writeDown(convertUsers())){
    		   return true;}
    	   else return false;
    	      	   

    }
	
	public Collection<User> findAll() {
		return users.values();
	}

	@SuppressWarnings("unchecked")
	private void loadUsers(String contextPath) {
			JSONParser parser = new JSONParser();
			try {				
				Object obj = parser.parse(new FileReader(contextPath + "/assets/jsons/adminsinfo.json"));
				System.out.println("first reading:"+contextPath + "/assets/jsons/adminsinfo.json");
				JSONArray usersList = (JSONArray) obj;
				usersList.forEach( user -> parseUserObject( (JSONObject) user ) );
				
				
			} catch (Exception e) {
				e.printStackTrace();
			} finally{
				 if (fileReader != null) try { fileReader.close(); } catch (IOException ignore) {ignore.printStackTrace();}
			}
	}
	
	 private  void parseUserObject(JSONObject user) 
	    {
	        
	        JSONObject userObject = (JSONObject) user.get("user");	
	        String firstName = (String) userObject.get("firstName");    	        
	        String lastName = (String) userObject.get("lastName");  	       
	        String sex = (String) userObject.get("sex");  	        
	        String username = (String) userObject.get("username");    	        
	        String password = (String) userObject.get("password");          
	        String role = (String) userObject.get("role"); 
	        users.put(username, new User(firstName, lastName, sex, username, password, role));
	    }
	 

	public boolean changeUser(User user) {

		if(user.getNewPass().isEmpty()){
			users.remove(user.getUsername());
			if(saveUser(user)){
			return true;
			} else return false;
		}else {
			user.setPassword(user.getNewPass());
			users.remove(user.getUsername());
			if(saveUser(user)){
				return true;
				} else return false;
		}
	}
	
	@SuppressWarnings("unchecked")
	private boolean writeDown(JSONArray users){
        try {

        	fileWrite = new FileWriter(ctx+"/assets/jsons/adminsinfo.json", false);
        	System.out.println("write here:"+ctx + "/assets/jsons/adminsinfo.json");
        	fileWrite.write(users.toJSONString());
        	users.forEach(v->System.out.println(v));
        	  
 
        } catch (IOException e) {
            e.printStackTrace();
            return false;
 
        } finally {
            if (fileWrite != null) try { fileWrite.close(); } catch (IOException ignore) {ignore.printStackTrace();}
        }
		return true;
        
		
	}
	
	@SuppressWarnings("unchecked")
	private JSONArray convertUsers(){
		JSONArray convertedUsers = new JSONArray();
		
		 users.forEach((username,user) ->{
		 
		//final way object should look
	        JSONObject obj = new JSONObject();
	        //here I'll put the info about the user
	        JSONObject userOb=new JSONObject();

	        userOb.put("username", user.getUsername());
	        userOb.put("password", user.getPassword());
	        userOb.put("firstName", user.getFirstName());
	        userOb.put("lastName", user.getLastName());
	        userOb.put("sex", user.getSex());
	        userOb.put("role", user.getRole());
	        
	        obj.put("user", userOb);
	        convertedUsers.add(obj);
	        
		 }); 
		
		return convertedUsers;
		
		
	}

	public User findUser(String username) {
		User user = users.get(username);
		return user;
		
	}

	public void fillReservationInUsers(Map<Integer, Reservation> reservations) {
		for (Map.Entry<String, User> entry : users.entrySet()) {
			   User user =  entry.getValue();
			   if(user.getRole().equals("guest")){
			   ArrayList<Reservation> reservationsUsers = new ArrayList<>();
			     for (Reservation reservation : reservations.values()) {
			    	 
				   if (reservation.getGuest().getUsername().equals(user.getUsername())){
					   reservationsUsers.add(reservation);
				   }
				}
			   
			   user.setReservations(reservationsUsers);
			}
			
		}
		System.out.println("loaded reservations into users ");
		users.forEach((id,user) -> System.out.println("id"+" : "+id + "," +"reservations"+" : "+user.getReservations()));
	}

	public void addReservation(Reservation reservation) {
		User oldValue = reservation.getGuest();
		User newValue = oldValue;
		newValue.addReservation(reservation);
		users.replace(oldValue.getUsername(), oldValue, newValue);
		
		
	}

	public void removeReservation(Reservation reservation) {
		User oldValue = reservation.getGuest();
		User newValue = oldValue;
		newValue.removeReservation(reservation);
		users.replace(oldValue.getUsername(), oldValue, newValue);
	}

	public void fillApartmentsInHosts(Map<Integer, Apartment> apartments) {
		for (Map.Entry<String, User> entry : users.entrySet()) {
			   User user =  entry.getValue();
			   if(user.getRole().equals("host")){
			   ArrayList<Apartment> apartmentsUsers = new ArrayList<>();
			     for (Apartment apartment : apartments.values()) {
			    	 
				   if (apartment.getHost().getUsername().equals(user.getUsername())){
					   apartmentsUsers.add(apartment);
				   }
				}
			   
			   user.setApartments(apartmentsUsers);
			}
			
		}
		System.out.println("loaded apartments into hosts ");
		users.forEach((id,user) -> System.out.println("id"+" : "+id + "," +"apartments"+" : "+user.getApartments()));
		
	}
	 	
	
}

