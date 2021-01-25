package services;




import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;


import java.util.concurrent.ThreadLocalRandom;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import beans.Apartment;
import beans.Comment;
import beans.Reservation;
import beans.User;
import dao.AmenityDAO;
import dao.ApartmentDAO;
import dao.ReservationDAO;
import dao.UserDAO;

@Path("apartments")
public class ApartmentsService {
	
	@Context
	ServletContext ctx;
	
	public ApartmentsService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		
		if (ctx.getAttribute("userDAO") == null) {
	    	String contextPath = ctx.getRealPath("/");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
		if (ctx.getAttribute("amenityDAO") == null) {
	    	String contextPath = ctx.getRealPath("/");
			ctx.setAttribute("amenityDAO", new AmenityDAO(contextPath));
		}
		if (ctx.getAttribute("apartmentDAO") == null) {
	    	String contextPath = ctx.getRealPath("/");
			ctx.setAttribute("apartmentDAO", new ApartmentDAO(contextPath, (UserDAO) ctx.getAttribute("userDAO"), (AmenityDAO) ctx.getAttribute("amenityDAO")));
		}
		if (ctx.getAttribute("reservationDAO") == null) {
	    	String contextPath = ctx.getRealPath("/");
			ctx.setAttribute("reservationDAO", new ReservationDAO(contextPath, (UserDAO) ctx.getAttribute("userDAO"), (ApartmentDAO) ctx.getAttribute("apartmentDAO")));
		}
	}
	
	
	
	    @GET
	    @Path("getApartments")
	    @Consumes("application/json;charset=utf-8" )
	    @Produces("application/json;charset=utf-8")
	    public Response getApartments(@Context HttpServletRequest request)
	    {
	        System.out.println("search request");
	    	String response = validateRequest(request);
	    	if(response!=null) {
	    
	    				return Response.status(400).entity(response).build();
	    	}else{
	    	
	    		    int lower = Integer.parseInt(request.getParameter("lower"));
				    int upper = Integer.parseInt(request.getParameter("upper"));
				    
				    
	    			if(request.getParameter("location").isEmpty() && request.getParameter("guests").isEmpty()
	    						&& request.getParameter("minRooms").isEmpty()
	    						&& request.getParameter("maxRooms").isEmpty()
	    						&& lower==0 && upper==1000
	    						&& request.getParameter("check_in").equals("both")
	    						//&& begin.equals(new GregorianCalendar(2020, Calendar.JANUARY, 01))
	    						//&& end.equals(new GregorianCalendar(2020, Calendar.JANUARY, 02))
	    						){
	    				
	    								return Response.status(400).entity("You have to give us something to search by").build();
	    			}else{
	    			
	    		
	    						ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
	    						//active
	    						Collection<Apartment> apartsWhole = apartmentDAO.findActive();
	    						//location
	    						if (!request.getParameter("location").isEmpty()){
	    								System.out.println(" location: " + request.getParameter("location"));
	    								apartsWhole=apartmentDAO.getByLocation(request.getParameter("location"), apartsWhole);
	    						}
	    						//guests
	    						if(!request.getParameter("guests").isEmpty()){
	    								System.out.println("guests num: " + request.getParameter("guests"));
	    								apartsWhole=apartmentDAO.getByGuestsNum(Integer.parseInt(request.getParameter("guests")), apartsWhole);
	    						}
	    						//rooms
	    						if(!request.getParameter("minRooms").isEmpty() && !request.getParameter("maxRooms").isEmpty()){
	    								int rooMin = Integer.parseInt(request.getParameter("minRooms"));
	    								int rooMax = Integer.parseInt(request.getParameter("maxRooms"));
	    								System.out.println("by rooms: " + rooMin+ " and "+rooMax);
	    								apartsWhole=apartmentDAO.getByRoomsNum(rooMin, rooMax, apartsWhole);
	    						}
	    						//budget
	    						if(!(lower==0 && upper==1000)){
    								System.out.println("by budget: " + lower+ " and "+upper);
    								apartsWhole=apartmentDAO.getByBudget(lower, upper, apartsWhole);
    						    }
	    						//dates
	    						if(!request.getParameter("check_in").equals("both")){
	    							SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
	    					    	Date   begin = null, end = null;
	    					    	try {
	    								   begin       = format.parse ( request.getParameter("check_in") );
	    								   end       = format.parse ( request.getParameter("check_out") );
	    							} catch (ParseException e) {
	    								e.printStackTrace();
	    							}  
	    					    	if(begin.before(new Date()) || end.before(new Date()))
	    					    		return Response.status(400).entity("Dates have to be in the future").build();
	    							if(end.before(begin) || end.equals(begin))
	    								return Response.status(400).entity("Check in date has to be before check out date").build();
	    		
    								System.out.println("by dates: " + begin+ " and "+end);
    								apartsWhole=apartmentDAO.getByDates(begin, end, apartsWhole);
    						    }
	    						
	    						if (apartsWhole.isEmpty()) {	
	    							 
	    								return Response.status(400).entity("We don't have anything like that in offer").build();
	    						} else{
	    						
	    								return Response.status(200).entity(apartsWhole).build();
	    						}
	    			}
	    	}
	    }
	    
	    
	    @GET
		@Path("getAmenities")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response getAmenities(@Context HttpServletRequest request) {
	    	AmenityDAO amenityDAO = (AmenityDAO) ctx.getAttribute("amenityDAO");
			return Response.status(200).entity(amenityDAO.findAll()).build();
					
		}

		private String validateRequest(HttpServletRequest request) {
			if(!request.getParameter("location").toString().matches("^$|^[a-zA-Z]+(?:[\\s-][a-zA-Z]+)*$"))
				return "Destination can contain only letters";
			if(!request.getParameter("guests").toString().matches("^$|^[1-9]\\d*$") || !request.getParameter("minRooms").toString().matches("^$|^[1-9]\\d*$")
				||	!request.getParameter("maxRooms").toString().matches("^$|^[1-9]\\d*$"))
				return "Numbers must be typed in as numeric values, greater than 0";
		    int min = Integer.parseInt(request.getParameter("minRooms")+0);
		    int max = Integer.parseInt(request.getParameter("maxRooms")+0);
			if(min>max)
				return "Please type in both minumum and maximum values for room number, while maximum must be greater or equal to minimum";
			if(request.getParameter("check_in").equals("one"))
				return "We need both check in and check out date";
			if(request.getParameter("check_in").equals(""))
				return null;
			return null;
		}
		
		
		
		@POST
		@Path("reservate")
		@Consumes(MediaType.APPLICATION_JSON)
		public Response reservate(@Context HttpServletRequest request) {
			String payloadRequest = null;
			try {
				payloadRequest = getBody(request);
			} catch (IOException e) {
				e.printStackTrace();
			}
			System.out.println("reservation request: "+payloadRequest);
			Reservation reservation = retreiveInfo(payloadRequest);
			Apartment apartment = reservation.getApartment();
			if(apartment.checkAvailability(reservation.getBeginDate(), reservation.getNumOfNights())){
				ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservationDAO");
				if(!reservationDAO.saveReservation(reservation)) {
					return Response.status(400).entity("Reservation unsuccessful. Check your connection!").build();			
				}else return Response.status(200).build();
			}else
				return Response.status(400).entity("This appartment is occupied during that time. Check the calendar again!").build();
			
			
		}
		
		@GET
		@Path("getUserReservations")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response getUserReservations(@Context HttpServletRequest request) {
			User user = (User) request.getSession().getAttribute("user");
			if(!user.getRole().equals("guest")){
				return Response.status(403).build();
			}else{
			ArrayList<Reservation> reservs = user.getReservations();
		    return Response.status(200).entity(reservs).build();
			}
		}
		
		@GET
		@Path("getHostReservations")
		@Consumes(MediaType.APPLICATION_JSON)
		@Produces(MediaType.APPLICATION_JSON)
		public Response getHostReservations(@Context HttpServletRequest request) {
			User user = (User) request.getSession().getAttribute("user");
			if(!user.getRole().equals("host")){
				return Response.status(403).build();
			}else{
			ArrayList<Reservation> reservs = new ArrayList<>();
			for(Apartment apart : user.getApartments()){
					System.out.println(apart.getReservations());
					reservs.addAll(apart.getReservations());
			}
		    return Response.status(200).entity(reservs).build();
			}
		}
		
		@POST
		@Path("giveUpOnReservation")
		@Consumes(MediaType.APPLICATION_JSON)
		public Response giveUpOnReservation(@Context HttpServletRequest request) {
			String payloadRequest = null;
			try {
				payloadRequest = getBody(request);
			} catch (IOException e) {
				e.printStackTrace();
			}
			System.out.println("reservation request: "+payloadRequest);
			String[] keys=payloadRequest.split("=");
			ReservationDAO reservationDAO = (ReservationDAO) ctx.getAttribute("reservationDAO");
			if(!reservationDAO.giveUp(Integer.parseInt(keys[1]))){
				return Response.status(400).entity("Can't give up now. Check your connection").build();
			}else
			return Response.status(200).build();
			
		}
		
		@POST
		@Path("leaveAComment")
		@Consumes(MediaType.APPLICATION_JSON)
		public Response leaveAComment(@Context HttpServletRequest request) {
			String payloadRequest = null;
			try {
				payloadRequest = getBody(request);
			} catch (IOException e) {
				e.printStackTrace();
			}
			//comment=wefw&apartmantID=6&starsNum=3
			System.out.println("reservation request: "+payloadRequest);
			ArrayList<String> params = new ArrayList<>();
			String[]  pairs=  payloadRequest.split("&");
			for(int i=0; i<pairs.length ; i++){
				String[] keys=pairs[i].split("=");
				for(String st : keys){
				params.add(st);
				}
				}
		     String comment = params.get(1).replace("+", " ");
			Comment newComment = new Comment((User) request.getSession().getAttribute("user"), comment,Integer.parseInt(params.get(5)), true);
			ApartmentDAO apartments = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
			if(!apartments.addComment(newComment, Integer.parseInt(params.get(3)))) 
				return Response.status(400).entity("Comment wasn't added. Check your connection").build();
		    else
		        return Response.status(200).build();
			
			
		}
		
		
		//utils
		private Reservation retreiveInfo(String payloadRequest) {
			ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
			UserDAO userDAO = (UserDAO) ctx.getAttribute("userDAO");
			ArrayList<String> params = new ArrayList<>();
			payloadRequest =payloadRequest.replaceAll("%3A", ":");
			//date=2021-01-29T23%3A00%3A00.000Z&numOfNights=1&username=snalica&apartmID=8&message=
			String[]  pairs=  payloadRequest.split("&");
			for(int i=0; i<pairs.length ; i++){
			String[] keys=pairs[i].split("=");
			for(String st : keys){
			params.add(st);
			}
			}
			SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
	    	Date   begin = null;
	    	try {
				   begin       = format.parse ( params.get(1) );
			} catch (ParseException e) {
				e.printStackTrace();
			}  
	    	Apartment apartment = apartmentDAO.findApartmentByID(Integer.parseInt(params.get(7)));
	    	int totalPrice = (int) (apartment.getPrice()*Integer.parseInt(params.get(3)));
	    	User guest = userDAO.findUser(params.get(5));
			//int reservationID,Apartment apartment, Date beginDate, int numOfNights,
			//int totalPrice, String message, User guest, String status
			if(params.size()==10)
				return new Reservation( ThreadLocalRandom.current().nextInt(100, 1000000 + 1),apartment,begin,Integer.parseInt(params.get(3)),totalPrice,params.get(10),guest,"created");
			else return new Reservation(ThreadLocalRandom.current().nextInt(100, 1000000 + 1),apartment,begin,Integer.parseInt(params.get(3)),totalPrice,"",guest,"created");
		
			
		}

		public static String getBody(HttpServletRequest request) throws IOException {

		    String body = null;
		    StringBuilder stringBuilder = new StringBuilder();
		    BufferedReader bufferedReader = null;

		    try {
		        InputStream inputStream = request.getInputStream();
		        if (inputStream != null) {
		            bufferedReader = new BufferedReader(new InputStreamReader(inputStream));
		            char[] charBuffer = new char[128];
		            int bytesRead = -1;
		            while ((bytesRead = bufferedReader.read(charBuffer)) > 0) {
		                stringBuilder.append(charBuffer, 0, bytesRead);
		            }
		        } else {
		            stringBuilder.append("");
		        }
		    } catch (IOException ex) {
		        throw ex;
		    } finally {
		        if (bufferedReader != null) {
		            try {
		                bufferedReader.close();
		            } catch (IOException ex) {
		                throw ex;
		            }
		        }
		    }

		    body = stringBuilder.toString();
		    return body;
		}
	
}
