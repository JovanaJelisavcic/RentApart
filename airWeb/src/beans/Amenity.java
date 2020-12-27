package beans;

import java.io.Serializable;

public class Amenity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6124381409760733063L;
	private int id;
	private String amenitie;
	
	
	
	public Amenity(int id, String amenitie) {
		super();
		this.id = id;
		this.amenitie = amenitie;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAmenitie() {
		return amenitie;
	}
	public void setAmenitie(String amenitie) {
		this.amenitie = amenitie;
	}
	
	//in json format
		@Override
		public String toString() {
			return new StringBuffer("{ \"id\" : ").append("\""+this.id+"\"")
	                .append(", \"amenitie\" : ").append("\""+this.amenitie+"\"")
	                .append("}").toString();
		}
}
