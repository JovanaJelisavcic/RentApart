package beans;

import java.io.Serializable;
public class Location implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -6052383492925395031L;
	private int gWidth;
	private int gLength;
	private Adress adress;
	
	public int getgWidth() {
		return gWidth;
	}
	public void setgWidth(int gWidth) {
		this.gWidth = gWidth;
	}
	public int getgLength() {
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
