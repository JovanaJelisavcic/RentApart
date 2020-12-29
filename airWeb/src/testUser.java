

import dao.UserDAO;



public class testUser {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		UserDAO users = new UserDAO("C:\\Users\\jelis\\git\\web2020\\airWeb\\src");
		System.out.println(users.findAll());
		
	//	ApartmentDAO apartments = new ApartmentDAO("C:\\Users\\jelis\\git\\web2020\\airWeb\\src");
	//.out.println(apartments.findAll());
	}

}
