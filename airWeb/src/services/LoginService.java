package services;



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












import beans.User;
import dao.UserDAO;

@Path("begin")
public class LoginService {
	
	@Context
	ServletContext ctx;
	
	public LoginService() {
		
	}
	
	@PostConstruct
	// ctx polje je null u konstruktoru, mora se pozvati nakon konstruktora (@PostConstruct anotacija)
	public void init() {
		// Ovaj objekat se instancira vi�e puta u toku rada aplikacije
		// Inicijalizacija treba da se obavi samo jednom
		System.out.println("ovde sam init");
		if (ctx.getAttribute("userDAO") == null) {
			System.out.println("ovde sam bio null");
	    	String contextPath = ctx.getRealPath("/");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
		
	}
	
	
	
	    @POST
	    @Path("login")
	    @Consumes(MediaType.APPLICATION_JSON)
	    public Response getMsg(@Context HttpServletRequest request)
	    {
	    	System.out.println("ovde sam login");
	    	UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
			User loggedUser = userDao.find(request.getParameter("username"), request.getParameter("password"));
			if (loggedUser == null) {
				return Response.status(400).entity("Invalid username and/or password").build();
			}
			request.getSession().setAttribute("user", loggedUser);
			return Response.status(200).build();
	    }
	
	
	
	@POST
	@Path("logout")
	@Consumes(MediaType.APPLICATION_JSON)
	public void logout(@Context HttpServletRequest request) {
		request.getSession().invalidate();
	}
	
	@GET
	@Path("currentUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User login(@Context HttpServletRequest request) {
		return (User) request.getSession().getAttribute("user");
	}
	

	@POST
	@Path("register")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response register(@Context HttpServletRequest request) {
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");		
		if (!userDao.checkUnique(request.getParameter("username"))) {
			return Response.status(400).entity("Username already taken!").build();
		}
		User user = new User(request.getParameter("firstName"),request.getParameter("lastName"),request.getParameter("sex"),request.getParameter("username"), request.getParameter("password"), "guest", "");
		if(!userDao.saveUser(user)) {
			return Response.status(400).entity("Registration unsuccessful").build();			
		}
		request.getSession().setAttribute("user", user);
		return Response.status(200).build();
	}
	
	@POST
	@Path("changeProfile")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response changeProfile(@Context HttpServletRequest request) {
		User oldInfo =(User) request.getSession().getAttribute("user");	
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		User changed = new User(request.getParameter("firstName"),request.getParameter("lastName"),request.getParameter("sex"),request.getParameter("username"), request.getParameter("password"), request.getParameter("role"), request.getParameter("newPass"));
		if (changed.getPassword().equals(oldInfo.getPassword())) { 
			if(!userDao.changeUser(changed)) {
				return Response.status(400).entity("Saving changes unsuccessful").build();			
			}else{
			request.getSession().setAttribute("user", changed);
			return Response.status(200).build();}		
		}else
			return Response.status(400).entity("Wrong password!").build();
		
	}
}

