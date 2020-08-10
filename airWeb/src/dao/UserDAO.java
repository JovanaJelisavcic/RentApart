package dao;

import org.apache.log4j.Logger;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
 







import java.io.FileReader;
import java.util.Collection;
import java.util.HashMap;



import java.util.Map;

import beans.User;




public class UserDAO {
	
	static Logger logger = Logger.getLogger(UserDAO.class);
	
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
				logger.info("we got into dao"); 
				
			
			} catch (Exception e) {
				e.printStackTrace();
			}
	}
	
	 private  void parseUserObject(JSONObject user) 
	    {
	        //Get employee object within list
	        JSONObject userObject = (JSONObject) user.get("user");
	      
	        //Get employee first name
	        String firstName = (String) userObject.get("firstName");    

	        //Get employee last name
	        String lastName = (String) userObject.get("lastName");  

	        //Get employee website name
	        String sex = (String) userObject.get("sex");  
	        //Get employee first name
	        String username = (String) userObject.get("username");    

	        //Get employee last name
	        String password = (String) userObject.get("password");  

	        //Get employee website name
	        String role = (String) userObject.get("role"); 
	        users.put(username, new User(firstName, lastName, sex, username, password, role));
	    }
}

