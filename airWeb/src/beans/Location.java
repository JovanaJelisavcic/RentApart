package beans;

import java.io.Serializable;
public class Location implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6052383492925395031L;
	private float gWidth;
	private float gLength;
	private Adress adress;
	
	
	
	public Location(int gWidth, int gLength, Adress adress) {
		super();
		this.gWidth = gWidth;
		this.gLength = gLength;
		this.adress = adress;
	}
	
	
	public float getgWidth() {
		return gWidth;
	}
	public void setgWidth(int gWidth) {
		this.gWidth = gWidth;
	}
	public float getgLength() {
		return gLength;
	}
	public void setgLength(int gLength) {
		this.gLength = gLength;
	}
	public Adress getAdress() {
		return adress;
	}
	public void setAdress(Adress adress) {
		this.adress = adress;
	}
}
