package services;




import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;


import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;

import beans.Apartment;
import dao.AmenityDAO;
import dao.ApartmentDAO;
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
	}
	
	
	
	    @GET
	    @Path("getApartments")
	    @Consumes("application/json;charset=utf-8" )
	    @Produces("application/json;charset=utf-8")
	    public Response getApartments(@Context HttpServletRequest request)
	    {
	        
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
	
}
