package beans;

import java.io.Serializable;
public class Adress implements Serializable {

		/**
	 * 
	 */
	private static final long serialVersionUID = -1732379327787863647L;
		private String street;
		private String place;
		private int postalCode;
		
		
		public Adress(String street, String place, int postalCode) {
			super();
			this.street = street;
			this.place = place;
			this.postalCode = postalCode;
		}
		
		public String getStreet() {
			return street;
		}
		public void setStreet(String street) {
			this.street = street;
		}
		public String getPlace() {
			return place;
		}
		public void setPlace(String place) {
			this.place = place;
		}
		public int getPostalCode() {
			return postalCode;
		}
		public void setPostalCode(int postalCode) {
			this.postalCode = postalCode;
		}
}
