package beans;

import java.util.Calendar;
import java.util.Date;
import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonManagedReference;


public class Reservation implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6081143477453774459L;
	public enum Status {
		  CREATED,
		  REFUSED,
		  GIVEUP,
		  ACCEPTED,
		  DONE
		}
	/*@JsonIdentityInfo(
			  generator = ObjectIdGenerators.PropertyGenerator.class, 
			  property = "reservationID")*/
	private int reservationID;
	@JsonManagedReference
	private Apartment apartment;
	private Date beginDate;
	private int numOfNights;
	private int totalPrice;
	private String message;
	@JsonManagedReference
	private User guest;
	private Status status;
	

	
	
	public Reservation(int reservationID,Apartment apartment, Date beginDate, int numOfNights,
			int totalPrice, String message, User guest, String status) {
		super();
		this.reservationID = reservationID;
		this.apartment = apartment;
		this.beginDate = beginDate;
		this.numOfNights = numOfNights;
		this.totalPrice = totalPrice;
		this.message = message;
		this.guest = guest;
		setStatus(status);
	}
	
	
	public Apartment getApartment() {
		return apartment;
	}
	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}
	public Date getBeginDate() {
		return beginDate;
	}
	public void setBeginDate(Date beginDate) {
		this.beginDate = beginDate;
	}
	public int getNumOfNights() {
		return numOfNights;
	}
	public void setNumOfNights(int numOfNights) {
		this.numOfNights = numOfNights;
	}
	public int getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public User getGuest() {
		return guest;
	}
	public void setGuest(User guest) {
		this.guest = guest;
	}
	public Status getStatus() {
		return status;
	}
	/*  CREATED,
		  REFUSED,
		  GIVEUP,
		  ACCEPTED,
		  DONE*/
	public void setStatus(String status) {
		switch(status.toUpperCase()) {
		  case "DONE":
		    this.status=Status.DONE;
		    break;
		  case "REFUSED":
			    this.status=Status.REFUSED;
			    break;
		  case "GIVEUP":
			    this.status=Status.GIVEUP;
			    break;
		  case "ACCEPTED":
			    this.status=Status.ACCEPTED;
			    break;
		  default:
			  this.status=Status.CREATED;
		}
	}
	
	//in json format
		@Override
		public String toString() {
			return new StringBuffer("{ \"apartment\" : ").append("\""+this.apartment.getId()+"\"")
	                .append(", \"numOfNights\" : ").append("\""+this.numOfNights+"\"")
	                .append(", \"beginDate\" : ").append("\""+this.beginDate+"\"")
	                .append(", \"totalPrice\" : ").append("\""+this.totalPrice+"\"")
	                .append(", \"message\" : ").append("\""+this.message+"\"")
	                .append(", \"status\" : ").append("\""+this.status+"\"")
	                .append(", \"guest\" : ").append("\""+this.guest.getUsername()+"\"")
			        .append(", \"id\" : ").append("\""+this.reservationID+"\"").append("}").toString();   
		}


		public int getReservationID() {
			return reservationID;
		}


		public void setReservationID(int reservationID) {
			this.reservationID = reservationID;
		}


		public Date getEndDate() {
			
				Calendar cal = Calendar.getInstance();
				cal.setTime( beginDate );
				cal.add( Calendar.DATE, numOfNights );
		        Date endDate = cal.getTime();
				return endDate;
		
		}
}
