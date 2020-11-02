package beans;

import java.io.Serializable;

public class Amenitie implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 6124381409760733063L;
	private int id;
	private String amenitie;
	
	
	
	public Amenitie(int id, String amenitie) {
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
}
