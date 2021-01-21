package beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.GregorianCalendar;

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
	private ArrayList<TPeriod> freeDates;
	private ArrayList<TPeriod> availability;
	private User host;
	private ArrayList<Comment> comments;
	private int stars;
	private ArrayList<String> images;
	private int price;
	private String checkin;
	private String checkout;
	private boolean status;
	private ArrayList<Amenity> amenities;
	private ArrayList<Reservation> reservations;
	
	
	
	public Apartment(int id, String type, int roomCap, int guestsCap,
			Location location, ArrayList<TPeriod> freeDates,
		    User host, ArrayList<Comment> comments,
			ArrayList<String> images, int price, String checkin, String checkout,
			boolean status, ArrayList<Amenity> amenities, ArrayList<Reservation> reservations) {
		super();
		this.id = id;
		this.type = type;
		this.roomCap = roomCap;
		this.guestsCap = guestsCap;
		this.location = location;
		this.freeDates = freeDates;
		this.host = host;
		this.comments = comments;
		this.images = images;
		this.price = price;
		this.checkin = checkin;
		this.checkout = checkout;
		this.status = status;
		this.amenities = amenities;
		this.reservations = reservations;
		this.stars = countStars();
		this.availability = setUpAvailability();
	}
	
	/*var unavailableDates = [
	                        {begin: '2021-01-19', end: '2021-01-21'},
	                        {begin: '2021-01-25', end: '2021-01-30'},
	                        {begin: '2021-02-01', end: '2021-02-03'}
	                    ];*/
	private ArrayList<TPeriod> setUpAvailability() {
		ArrayList<TPeriod> busyPeriods = new ArrayList<>();
		//year beggining
		Calendar calendar = new GregorianCalendar(2021,1,1);
		Date yearBegin = calendar.getTime();
        //year end
		Calendar calendarEnd = new GregorianCalendar(2021,12,31);
		Date yearEnd = calendarEnd.getTime();
		 
		sortFreeDates();
		for(int i = 0 ; i < freeDates.size()-1; i++){
			if(i==0){
			busyPeriods.add(new TPeriod(yearBegin,yesterday(freeDates.get(i).getBegin())));
			busyPeriods.add(new TPeriod(tommorow(freeDates.get(i).getEnd()),yesterday(freeDates.get(i+1).getBegin())));
			}else{
			busyPeriods.add(new TPeriod(tommorow(freeDates.get(i).getEnd()),yesterday(freeDates.get(i+1).getBegin())));
			}	
		}
		busyPeriods.add(new TPeriod(tommorow(freeDates.get(freeDates.size()-1).getEnd()),yearEnd));
		
		return busyPeriods;
	}

	private Date yesterday(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime( date );
		cal.add( Calendar.DATE, -1 );
        Date oneDayBefore = cal.getTime();
		return oneDayBefore;
	}
	
	private Date tommorow(Date date) {
		Calendar cal = Calendar.getInstance();
		cal.setTime( date );
		cal.add( Calendar.DATE, 1 );
        Date oneDayAfter = cal.getTime();;
		return oneDayAfter;
	}
	
	private void sortFreeDates() {
		Collections.sort(freeDates, new Comparator<TPeriod>(){
			public int compare(TPeriod t1, TPeriod t2){
				return t1.getBegin().compareTo(t2.getBegin());
			}
		});
	}

	private int countStars() {
		int sum = 0;
		for(int i=0; i<comments.size(); i++){
			sum+= comments.get(i).getStars();
	    }		
		return (int) Math.ceil(sum/comments.size());
	}

	public int getStars() {
		return stars;
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
	public ArrayList<TPeriod> getFreeDates() {
		return freeDates;
	}
	public void setFreeDates(ArrayList<TPeriod> freeDates) {
		this.freeDates = freeDates;
	}
	public ArrayList<TPeriod> getAvailability() {
		return availability;
	}
	public void setAvailability(ArrayList<TPeriod> availability) {
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
	public void setPrice(int price) {
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
	                .append(", \"price\" : ").append("\""+this.price+ "\"")
	                .append(", \"stars\" : ").append("\""+this.stars+ "\"")
	                .append(", \"checkIn\" : ").append("\""+this.checkin+ "\"")
	                .append(", \"checkOut\" : ").append("\""+this.checkout+ "\"");
			
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
			
			
			finalString.append(", \"freeDates\" : [ ");
			for(int i=0; i<this.freeDates.size(); i++){
				TPeriod freePeriod= freeDates.get(i);
				finalString.append(freePeriod);
			}
			finalString.deleteCharAt(finalString.lastIndexOf(","));
			finalString.append("]");
			
			
			finalString.append(", \"availability\" : [ ");
			for(int i=0; i<this.availability.size(); i++){
				TPeriod busyPeriod= availability.get(i);
				finalString.append(busyPeriod);
			}
			finalString.deleteCharAt(finalString.lastIndexOf(","));
			finalString.append("]");
			
            String realfinal = finalString.append("}").toString();
			
			return realfinal;
	                              
	                
		}
	
}
