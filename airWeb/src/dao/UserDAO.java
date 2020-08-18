package dao;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;


import java.util.Collection;
import java.util.HashMap;



import java.util.Map;

import beans.User;




public class UserDAO {
	
	
	
	private Map<String, User> users = new HashMap<>();
	

	
	public UserDAO() {
		
	}
	
	public UserDAO(String contextPath) {
		loadUsers(contextPath);
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
        //ovde ce biti mozda dodavanje u txt fajl i plus u users collection
		//takodje sve hendlovanje treba da ide u posebne fje
       //user.writeInFile();
       users.put(user.getUsername(), user);
       if(users.containsKey(user.getUsername())){
       return true;
       }else return false;
    }
	
	public Collection<User> findAll() {
		return users.values();
	}

	@SuppressWarnings("unchecked")
	private void loadUsers(String contextPath) {
			JSONParser parser = new JSONParser();
			try {
				Object obj = parser.parse(new FileReader(contextPath + "/adminsinfo.json"));
	 
				JSONArray usersList = (JSONArray) obj;
				usersList.forEach( user -> parseUserObject( (JSONObject) user ) );
	
			} catch (Exception e) {
				e.printStackTrace();
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
	 
	 
	 
	
	
	
}

