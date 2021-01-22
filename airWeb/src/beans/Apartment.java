package beans;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@JsonIdentityInfo(
		  generator = ObjectIdGenerators.PropertyGenerator.class, 
		  property = "id")
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
	private ArrayList<TPeriod> unavailability;
	private User host;
	private ArrayList<Comment> comments;
	private int stars;
	private ArrayList<String> images;
	private int price;
	private String checkin;
	private String checkout;
	private boolean status;
	private ArrayList<Amenity> amenities;
	@JsonBackReference
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
		sortDates(freeDates);
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
		this.unavailability = setUpUnavailability();
		sortDates(unavailability);
		this.availability = this.freeDates;
	}
	
	/*var unavailableDates = [
	                        {begin: '2021-01-19', end: '2021-01-21'},
	                        {begin: '2021-01-25', end: '2021-01-30'},
	                        {begin: '2021-02-01', end: '2021-02-03'}
	                    ];*/
	private ArrayList<TPeriod> setUpUnavailability() {
		ArrayList<TPeriod> busyPeriods = new ArrayList<>();
        //year end
		Calendar calendarEnd = new GregorianCalendar(2021,12,31);
		Date yearEnd = calendarEnd.getTime();
		for(int i = 0 ; i < freeDates.size()-1; i++){
			busyPeriods.add(new TPeriod(tommorow(freeDates.get(i).getEnd()),yesterday(freeDates.get(i+1).getBegin())));
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
	
	private void sortDates(ArrayList<TPeriod> dates) {
		Collections.sort(dates, new Comparator<TPeriod>(){
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
	
	public ArrayList<TPeriod> getUnavailability() {
		return unavailability;
	}

	public void addUnavailability(ArrayList<TPeriod> reserved) {
		unavailability.addAll(reserved);
		sortDates(unavailability);	
	}

	public void changeAvailability(ArrayList<TPeriod> reserved) {

		for (Iterator<TPeriod> reservation = reserved.iterator(); reservation.hasNext(); ) {
			ArrayList<TPeriod> putback = new ArrayList<>();
			TPeriod reserve = reservation.next();
			for (Iterator<TPeriod> iterator = availability.iterator(); iterator.hasNext(); ) {
				TPeriod available = iterator.next();
			    if (reserve.getBegin().after(yesterday(available.getBegin())) && reserve.getEnd().before(tommorow(available.getEnd()))) {
			    	iterator.remove();
			    	if(!reserve.getBegin().equals(available.getBegin()))
			    	putback.add(new TPeriod(available.getBegin(), yesterday(reserve.getBegin())));
			    	if(!reserve.getEnd().equals(available.getEnd()))
			    	putback.add(new TPeriod(tommorow(reserve.getEnd()), available.getEnd()));
			    }
			}
			availability.addAll(putback);
		}
		sortDates(availability);
	}


	public ArrayList<TPeriod> getAvailability() {
		return availability;
	}

	public void setAvailability(ArrayList<TPeriod> availability) {
		this.availability = availability;
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
			
			
            String realfinal = finalString.append("}").toString();
			
			return realfinal;
	                              
	                
		}

		

		

		
	
}
