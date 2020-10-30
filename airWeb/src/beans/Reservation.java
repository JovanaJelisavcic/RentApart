package beans;

import java.util.Date;
import java.io.Serializable;

public class Reservation implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 6081143477453774459L;
	enum Status {
		  CREATED,
		  REFUSED,
		  GIVEUP,
		  ACCEPTED,
		  DONE
		}
	
	private Apartment apartment;
	private Date beginDate;
	private int numOfNights;
	private float totalPrice;
	private String message;
	private User guest;
	private Status status;
	

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
	public float getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(float totalPrice) {
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
	public void setStatus(Status status) {
		this.status = status;
	}
}
