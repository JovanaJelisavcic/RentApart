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
	    	//location
	    	System.out.println(" location: " + request.getParameter("location"));
	    	String location = request.getParameter("location");
	    	ApartmentDAO apartmentDAO = (ApartmentDAO) ctx.getAttribute("apartmentDAO");
	    	Collection<Apartment> aparts=apartmentDAO.getByLocation(location);
	    	System.out.println("by location filter: " + aparts.toString());
	    	//guests
	    	Collection<Apartment> apartsGuests=apartmentDAO.getByGuestsNum((Integer.parseInt(request.getParameter("guests"))));
	    	System.out.println("by guests filter: " + apartsGuests.toString());
	    	//rooms
	    	Collection<Apartment> apartsRooms=apartmentDAO.getByRoomsNum(Integer.parseInt(request.getParameter("minRooms")),Integer.parseInt(request.getParameter("maxRooms")) );
	    	System.out.println("by rooms filter: " + apartsRooms.toString());

	    
			if (aparts.isEmpty()) {	
				return Response.status(400).entity("No apartments on that location").build();
			} else{
				//ovaj deo lagano moye da ne valja
			return Response.status(200).entity(aparts).build();
			}
	    }
	
}
