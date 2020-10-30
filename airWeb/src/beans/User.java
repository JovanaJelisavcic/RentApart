package beans;


import java.io.Serializable;

public class User implements Serializable {
	private static final long serialVersionUID = 6640936480584723344L;
	
	private String firstName;
	private String lastName;
	private String sex;
	private String username;
	private String password;
	private String role;
	private String newPass="";
	private Apartment[] apartments; //i za domacine i za iznajmljene
	private Reservation[] reservations; //samo za goste 
	
	
	

	public User() {
	}

	public User(String firstName, String lastName, String sex, String username, String password, String role, String newPass) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.sex = sex;
		this.username = username;
		this.password = password;
		this.role = role;
		this.newPass = newPass;
	}
	
	public User(String firstName, String lastName, String sex, String username, String password, String role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.sex = sex;
		this.username = username;
		this.password = password;
		this.role = role;
	}


	public String getFirstName() {
		return firstName;
	}

	public String getNewPass() {
		return newPass;
	}

	public void setNewPass(String newPass) {
		this.newPass = newPass;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	
	public Apartment[] getApartments() {
		return apartments;
	}

	public void setApartments(Apartment[] apartments) {
		this.apartments = apartments;
	}

	public Reservation[] getReservations() {
		return reservations;
	}

	public void setReservations(Reservation[] reservations) {
		this.reservations = reservations;
	}
	

	//in json format
	@Override
	public String toString() {
		return new StringBuffer("{ \"firstName\" : ").append("\""+this.firstName+"\"")
                .append(", \"lastName\" : ").append("\""+this.lastName+"\"")
                .append(", \"sex\" : ").append("\""+this.sex+"\"")
                .append(", \"username\" : ").append("\""+this.username+"\"")
                .append(", \"password\" : ").append("\""+this.password+"\"")
                .append(", \"role\" : ").append("\""+this.role+ "\"").append("}").toString();
	}

}