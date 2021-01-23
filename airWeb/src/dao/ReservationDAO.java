package dao;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import beans.Apartment;
import beans.Reservation;
import beans.User;

public class ReservationDAO {
	
    private Map<Integer, Reservation> reservations = new HashMap<>();
    
    private static FileWriter fileWrite;
	private static FileReader fileReader;	
	private String ctx;
	
	private UserDAO users;
	private ApartmentDAO apartments;

	public ReservationDAO() {
		
	}
	
	public ReservationDAO(String contextPath,UserDAO userDAO,ApartmentDAO apartmentDAO) {
		ctx = contextPath;
		users = userDAO;
		apartments=apartmentDAO;
		loadReservations(contextPath);
		apartments.fillReservationsInApartments(reservations);
		users.fillReservationInUsers(reservations);
		System.out.println("loaded reservations ");
		reservations.forEach((id,reservation) -> System.out.println("id"+" : "+id + "," +"reservation"+" : "+reservation));

	}
	
	
	

	public Reservation findReservation(int reservationID) {
		return reservations.get(reservationID);

	}


	@SuppressWarnings("unchecked")
	private void loadReservations(String contextPath) {
			JSONParser parser = new JSONParser();
			try {				
				Object obj = parser.parse(new FileReader(contextPath + "/assets/jsons/reservations.json"));
				System.out.println("first reading:"+contextPath + "/assets/jsons/reservations.json");
				JSONArray reservationsList = (JSONArray) obj;
				reservationsList.forEach( reservation -> parseReservationObject( (JSONObject) reservation ) );
				
				
			} catch (Exception e) {
				e.printStackTrace();
			} finally{
				 if (fileReader != null) try { fileReader.close(); } catch (IOException ignore) {ignore.printStackTrace();}
			}
	}
	
//{"reservation" : {"reservationID":1,"apartmentID": "1",
//"beginDate": "2021-01-05T05:00:00.000Z", "totalPrice": "204", "numOfNights": "2",
//"message" : "", "guest": "ninasfoodart", "status" : "done"}}
	private  void parseReservationObject(JSONObject reservation) 
	    {

	        JSONObject reservationObject = (JSONObject) reservation.get("reservation");
	
	        int id = Integer.parseInt((String) reservationObject.get("reservationID"));
	        
	        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
	          Date begin = null;
			try {
				begin = simpleDateFormat.parse((String) reservationObject.get("beginDate"));
			} catch (ParseException e) {
				e.printStackTrace();
			}
			
			int totalPrice = Integer.parseInt((String) reservationObject.get("totalPrice"));
			int numOfNights = Integer.parseInt((String) reservationObject.get("numOfNights"));
	        String message = (String) reservationObject.get("message");
	        
	        String guest = (String) reservationObject.get("guest");
	        User guestObject = users.findUser(guest);
	        
	        int apartmentID = Integer.parseInt((String) reservationObject.get("apartmentID"));
	        Apartment apartObject = apartments.findApartmentByID(apartmentID);
	        
	        String status = (String) reservationObject.get("status");    
	        reservations.put(id,new Reservation(id,apartObject, begin, numOfNights,
	    			 totalPrice, message, guestObject, status));
	    }

	public boolean saveReservation(Reservation reservation) {
		  reservations.put(reservation.getReservationID(), reservation);
   	   if(writeDown(convertReservations())){
   		   users.addReservation(reservation);
   		   apartments.addReservation(reservation);
   		   return true;}
   	   else return false;

	}
	
	@SuppressWarnings("unchecked")
	private boolean writeDown(JSONArray reservations){
        try {

        	fileWrite = new FileWriter(ctx+"/assets/jsons/reservations.json", false);
        	System.out.println("write here:"+ctx + "/assets/jsons/reservations.json");
        	fileWrite.write(reservations.toJSONString());
        	reservations.forEach(v->System.out.println(v));
        	
        	  
 
        } catch (IOException e) {
            e.printStackTrace();
            return false;
 
        } finally {
            if (fileWrite != null) try { fileWrite.close(); } catch (IOException ignore) {ignore.printStackTrace();}
        }
		return true;
        
		
	}
	
	@SuppressWarnings("unchecked")
	private JSONArray convertReservations(){
		JSONArray convertedReservations = new JSONArray();
		
		 reservations.forEach((id,reservation) ->{
		 
		//final way object should look
	        JSONObject obj = new JSONObject();
	        //here I'll put the info about the user
	        JSONObject reservOb=new JSONObject();

	        reservOb.put("reservationID", reservation.getReservationID());
	        reservOb.put("apartmentID", reservation.getApartment().getId());
	        reservOb.put("beginDate", reservation.getBeginDate());
	        reservOb.put("totalPrice", reservation.getTotalPrice());
	        reservOb.put("numOfNights", reservation.getNumOfNights());
	        reservOb.put("message", reservation.getMessage());
	        reservOb.put("guest", reservation.getGuest().getUsername());
	        reservOb.put("status", reservation.getStatus().toString());
	        
	        obj.put("reservation", reservOb);
	        convertedReservations.add(obj);
	        
		 }); 
		
		return convertedReservations;
		
		
	}


}
