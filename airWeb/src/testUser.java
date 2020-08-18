import java.util.Collection;

import javax.ws.rs.core.Response;

import dao.UserDAO;
import beans.User;


public class testUser {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		UserDAO users = new UserDAO("C:\\Users\\jelis\\git\\web2020\\airWeb\\src");
		User j = new User("nina", "suknjaja", "female", "ninasfoodart", "slikajte", "guest");
		users.saveUser(j);
		
	}

}
