package beans;

import java.io.Serializable;
import java.util.concurrent.ThreadLocalRandom;

public class Comment implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 8623309115934285200L;
	private int id;
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
		this.id = ThreadLocalRandom.current().nextInt(100, 1000000 + 1);
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
	//in json format
		@Override
		public String toString() {
			return new StringBuffer("{ \"guest\" : ").append("\""+this.guest+"\"")
	                .append(", \"comment\" : ").append("\""+this.comment+"\"")
	                .append(", \"stars\" : ").append("\""+this.stars+"\"")
	                .append(", \"status\" : ").append("\""+this.status+"\"")
	                .append("}").toString();
		}

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

}
