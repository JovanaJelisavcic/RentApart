package services;




import java.util.Collection;

import javax.annotation.PostConstruct;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
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
	    @Consumes(MediaType.APPLICATION_JSON)
	    @Produces(MediaType.APPLICATION_JSON)
	    public Response getApartments(@Context HttpServletRequest request)
	    {
	    	
	    	
	    	if(request.getParameter("location").isEmpty() && request.getParameter("guests").isEmpty()
	    			&& request.getParameter("minRooms").isEmpty()
	    			&& request.getParameter("maxRooms").isEmpty()
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
	    		//dates
	    		//budget
	    		if (apartsWhole.isEmpty()) {	
	    			return Response.status(400).entity("We don't have anything like that in offer").build();
	    		} else{
	    			return Response.status(200).entity(apartsWhole).build();
			}
	    	}
	    }
	
}
