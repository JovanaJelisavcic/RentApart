package beans;

import java.awt.Image;
import java.io.Serializable;
import java.time.LocalTime;
import java.util.Date;
import java.util.Map;

public class Apartment implements Serializable{

	
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -5317933952482460532L;
	private String type;
	private String roomCap;
	private String guestsCap;
	private Location location;
	private Date[] freeDates;
	private Map<Date,Boolean> availability;
	private String newPass="";
	private User host;
	private Comment[] comments;
	private Image[] images;
	private float price;
	private LocalTime checkin;
	private LocalTime checkout;
	private boolean status;
	private Map<Integer, String> amenities;
	private Reservation[] reservations;
	
	
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getRoomCap() {
		return roomCap;
	}
	public void setRoomCap(String roomCap) {
		this.roomCap = roomCap;
	}
	public String getGuestsCap() {
		return guestsCap;
	}
	public void setGuestsCap(String guestsCap) {
		this.guestsCap = guestsCap;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public Date[] getFreeDates() {
		return freeDates;
	}
	public void setFreeDates(Date[] freeDates) {
		this.freeDates = freeDates;
	}
	public Map<Date, Boolean> getAvailability() {
		return availability;
	}
	public void setAvailability(Map<Date, Boolean> availability) {
		this.availability = availability;
	}
	public String getNewPass() {
		return newPass;
	}
	public void setNewPass(String newPass) {
		this.newPass = newPass;
	}
	public User getHost() {
		return host;
	}
	public void setHost(User host) {
		this.host = host;
	}
	public Comment[] getComments() {
		return comments;
	}
	public void setComments(Comment[] comments) {
		this.comments = comments;
	}
	public Image[] getImages() {
		return images;
	}
	public void setImages(Image[] images) {
		this.images = images;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public LocalTime getCheckin() {
		return checkin;
	}
	public void setCheckin(LocalTime checkin) {
		this.checkin = checkin;
	}
	public LocalTime getCheckout() {
		return checkout;
	}
	public void setCheckout(LocalTime checkout) {
		this.checkout = checkout;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Map<Integer, String> getAmenities() {
		return amenities;
	}
	public void setAmenities(Map<Integer, String> amenities) {
		this.amenities = amenities;
	}
	public Reservation[] getReservations() {
		return reservations;
	}
	public void setReservations(Reservation[] reservations) {
		this.reservations = reservations;
	}
	
	
	
}
