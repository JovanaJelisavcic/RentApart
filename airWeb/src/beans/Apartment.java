package beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

public class Apartment implements Serializable{

	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5317933952482460532L;
	private int id;
	private String type;
	private int roomCap;
	private int guestsCap;
	private Location location;
	private ArrayList<Date> freeDates;
	private Map<Date,Boolean> availability;
	private User host;
	private ArrayList<Comment> comments;
	private ArrayList<String> images;
	private float price;
	private String checkin;
	private String checkout;
	private boolean status;
	private ArrayList<Amenity> amenities;
	private ArrayList<Reservation> reservations;
	
	
	
	public Apartment(int id, String type, int roomCap, int guestsCap,
			Location location, ArrayList<Date> freeDates,
			Map<Date, Boolean> availability, User host, ArrayList<Comment> comments,
			ArrayList<String> images, float price, String checkin, String checkout,
			boolean status, ArrayList<Amenity> amenities, ArrayList<Reservation> reservations) {
		super();
		this.id = id;
		this.type = type;
		this.roomCap = roomCap;
		this.guestsCap = guestsCap;
		this.location = location;
		this.freeDates = freeDates;
		this.availability = availability;
		this.host = host;
		this.comments = comments;
		this.images = images;
		this.price = price;
		this.checkin = checkin;
		this.checkout = checkout;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
	}
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getRoomCap() {
		return roomCap;
	}
	public void setRoomCap(int roomCap) {
		this.roomCap = roomCap;
	}
	public int getGuestsCap() {
		return guestsCap;
	}
	public void setGuestsCap(int guestsCap) {
		this.guestsCap = guestsCap;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public ArrayList<Date> getFreeDates() {
		return freeDates;
	}
	public void setFreeDates(ArrayList<Date> freeDates) {
		this.freeDates = freeDates;
	}
	public Map<Date, Boolean> getAvailability() {
		return availability;
	}
	public void setAvailability(Map<Date, Boolean> availability) {
		this.availability = availability;
	}
	public User getHost() {
		return host;
	}
	public void setHost(User host) {
		this.host = host;
	}
	public ArrayList<Comment> getComments() {
		return comments;
	}
	public void setComments(ArrayList<Comment> comments) {
		this.comments = comments;
	}
	public ArrayList<String> getImages() {
		return images;
	}
	public void setImages(ArrayList<String> images) {
		this.images = images;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getCheckin() {
		return checkin;
	}
	public void setCheckin(String checkin) {
		this.checkin = checkin;
	}
	public String getCheckout() {
		return checkout;
	}
	public void setCheckout(String checkout) {
		this.checkout = checkout;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public ArrayList<Amenity> getAmenities() {
		return amenities;
	}
	public void setAmenities(ArrayList<Amenity> amenities) {
		this.amenities = amenities;
	}
	public ArrayList<Reservation> getReservations() {
		return reservations;
	}
	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	//in json format
		@Override
		public String toString() {
			StringBuffer finalString= new StringBuffer("{ \"id\" : ").append("\""+this.id+"\"")
	                .append(", \"type\" : ").append("\""+this.type+"\"")
	                .append(", \"roomCap\" : ").append("\""+this.roomCap+"\"")
	                .append(", \"guestsCap\" : ").append("\""+this.guestsCap+"\"")
	                .append(", \"location\" : ").append("\""+this.location+"\"")
	                .append(", \"host\" : ").append("\""+this.host+"\"")
	                .append(", \"status\" : ").append("\""+this.status+"\"")
	                .append(", \"price\" : ").append("\""+this.price+ "\"");
			
			finalString.append(", \"images\" : [ ");
			for(int i=0; i<this.images.size(); i++){
				String image= images.get(i);
				finalString.append(" \""+image+"\" ,");
			}
			finalString.deleteCharAt(finalString.lastIndexOf(","));
			finalString.append("]");
			
			
			finalString.append(", \"amenities\" : [ ");
			for(int i=0; i<this.amenities.size(); i++){
				Amenity amenity= amenities.get(i);
				finalString.append(" \""+amenity+"\" ,");
			}
			finalString.deleteCharAt(finalString.lastIndexOf(","));
			finalString.append("]");
			
            String realfinal = finalString.append("}").toString();
			
			return realfinal;
	                              
	                
		}
	
}
