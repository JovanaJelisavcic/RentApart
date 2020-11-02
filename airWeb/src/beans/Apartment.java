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
	private int id;
	private String type;
	private String roomCap;
	private int guestsCap;
	private Location location;
	private Date[] freeDates;
	private Map<Date,Boolean> availability;
	private User host;
	private Comment[] comments;
	private Image[] images;
	private float price;
	private LocalTime checkin;
	private LocalTime checkout;
	private boolean status;
	private Amenitie[] amenities;
	private Reservation[] reservations;
	
	
	
	public Apartment(int id, String type, String roomCap, int guestsCap,
			Location location, Date[] freeDates,
			Map<Date, Boolean> availability, User host, Comment[] comments,
			Image[] images, float price, LocalTime checkin, LocalTime checkout,
			boolean status, Amenitie[] amenities, Reservation[] reservations) {
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
	public String getRoomCap() {
		return roomCap;
	}
	public void setRoomCap(String roomCap) {
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
	public Amenitie[] getAmenities() {
		return amenities;
	}
	public void setAmenities(Amenitie[] amenities) {
		this.amenities = amenities;
	}
	public Reservation[] getReservations() {
		return reservations;
	}
	public void setReservations(Reservation[] reservations) {
		this.reservations = reservations;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	
	
}
