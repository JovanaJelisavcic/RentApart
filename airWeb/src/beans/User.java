package beans;


import java.io.Serializable;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonBackReference;



public class User implements Serializable {
	private static final long serialVersionUID = 6640936480584723344L;
	
	private String firstName;
	private String lastName;
	private String sex;
	private String username;
	private String password;
	private String role;
	private String newPass="";
	@JsonBackReference
	private ArrayList<Apartment> apartments;  
	@JsonBackReference
	private ArrayList<Reservation> reservations; //samo za goste 
	
	
	

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
	
	
	public ArrayList<Apartment> getApartments() {
		return apartments;
	}

	public void setApartments(ArrayList<Apartment> apartments) {
		this.apartments = apartments;
	}

	public ArrayList<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Reservation> reservationsUsers) {
		this.reservations = reservationsUsers;
	}
	
	public void addReservation(Reservation reservation) {
		reservations.add(reservation);
		
	}
	
	public void removeReservation(Reservation reservation) {
		reservations.remove(reservation);
	}
	
	public void changeApartment(Apartment apartment) {
		Apartment old= null;
		for(Apartment a: apartments){
			if(a.getId()==apartment.getId())
				old=a;
		}
		apartments.remove(old);
		apartments.add(apartment);
		
	}
	

	//in json format
	@Override
	public String toString() {
		StringBuffer finalString=new StringBuffer("{ \"firstName\" : ").append("\""+this.firstName+"\"")
                .append(", \"lastName\" : ").append("\""+this.lastName+"\"")
                .append(", \"sex\" : ").append("\""+this.sex+"\"")
                .append(", \"username\" : ").append("\""+this.username+"\"")
                .append(", \"password\" : ").append("\""+this.password+"\"")
                .append(", \"role\" : ").append("\""+this.role+ "\"");
		if(reservations!=null){
		finalString.append(", \"reservations\" : [ ");
		for(int i=0; i<this.reservations.size(); i++){
			Reservation reservation= reservations.get(i);
			finalString.append(" \""+reservation+"\" ,");
		}
		finalString.deleteCharAt(finalString.lastIndexOf(","));
		finalString.append("]");}
		
		 String realfinal = finalString.append("}").toString();
		 return realfinal;
	}

	

	

	

}