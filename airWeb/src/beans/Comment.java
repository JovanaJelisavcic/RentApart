package beans;

import java.io.Serializable;

public class Comment implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8623309115934285200L;
	private User guest;
	private String comment;
	private int stars;
	private boolean status;
	
	
	
	public Comment(User guest, String comment, int stars,
			boolean status) {
		super();
		this.guest = guest;
		this.comment = comment;
		this.stars = stars;
		this.status = status;
	}
	
	public User getGuest() {
		return guest;
	}
	public void setGuest(User guest) {
		this.guest = guest;
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
