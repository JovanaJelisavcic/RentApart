package beans;

import java.io.Serializable;
public class Adress implements Serializable {

		/**
	 * 
	 */
	private static final long serialVersionUID = -1732379327787863647L;
		private String street;
		private String place;
		private String postalCode;
		private String state;
		
		
		public Adress(String street, String place, String postalCode, String state) {
			super();
			this.street = street;
			this.place = place;
			this.postalCode = postalCode;
			this.setState(state);
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
		public String getPostalCode() {
			return postalCode;
		}
		public void setPostalCode(String postalCode) {
			this.postalCode = postalCode;
		}
		
		public String getState() {
			return state;
		}

		public void setState(String state) {
			this.state = state;
		}
		
		//in json format
		@Override
		public String toString() {
			return new StringBuffer("{ \"street\" : ").append("\""+this.street+"\"")
	                .append(", \"place\" : ").append("\""+this.place+"\"")
	                .append(", \"postalCode\" : ").append("\""+this.postalCode+"\"")
	                .append(", \"state\" : ").append("\""+this.state+"\"")
	                .append("}").toString();
		}

		
}
