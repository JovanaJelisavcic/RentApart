package beans;

import java.io.Serializable;

public class Comment implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8623309115934285200L;
	private User guest;
	private Apartment apartment;
	private String comment;
	private int stars;
	private boolean status;
	
	
	public User getGuest() {
		return guest;
	}
	public void setGuest(User guest) {
		this.guest = guest;
	}
	public Apartment getApartment() {
		return apartment;
	}
	public void setApartment(Apartment apartment) {
		this.apartment = apartment;
	}
	public String getComment() {
		return comment;
	}
	public void setComment(String comment) {
		this.comment = comment;
	}
	public int getStars() {
		return stars;
	}
	public void setStars(int stars) {
		this.stars = stars;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	

}
