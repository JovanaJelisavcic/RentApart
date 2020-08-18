package dao;


import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.FileReader;


import java.io.FileWriter;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import beans.User;




public class UserDAO {
	
	private String ctx;
	
	private Map<String, User> users = new HashMap<>();

	static private FileWriter file;
	
	public UserDAO() {
		
	}
	
	public UserDAO(String contextPath) {
		ctx=contextPath;
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
    	   users.put(user.getUsername(), user);
    	   if(!makeRoomForNoob(user)){
    		   return false;
    		  
    	   }else return true;
    	   

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
	 
	   private boolean makeRoomForNoob(User user){
		   JSONParser parser = new JSONParser();
		   JSONArray usersList = new JSONArray();
			try {
				Object obj = parser.parse(new FileReader(ctx + "/adminsinfo.json"));
	 
				 usersList = (JSONArray) obj;				 
				
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			}
			if(usersList!=null){
		   writeNoob(usersList, user);
		   return true;
			}else return false;		   
	    }

	@SuppressWarnings({ "unchecked" })
	private void writeNoob(JSONArray usersList, User user) {
		// TODO Auto-generated method stub
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
        
        usersList.add(obj);
        
        try {

        	file = new FileWriter(ctx+"\\adminsinfo.json", false);
            file.write(usersList.toJSONString());
            
 
        } catch (IOException e) {
            e.printStackTrace();
 
        } finally {
            if (file != null) try { file.close(); } catch (IOException ignore) {}
        }
	}
	 	
	
}

