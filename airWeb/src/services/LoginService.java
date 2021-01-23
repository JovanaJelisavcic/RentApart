package services;



import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

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
		if (ctx.getAttribute("userDAO") == null) {
	    	String contextPath = ctx.getRealPath("/");
			ctx.setAttribute("userDAO", new UserDAO(contextPath));
		}
		
	}
	
	
	
	    @GET
	    @Path("login")
	    @Consumes("application/json;charset=utf-8" )
	    @Produces("application/json;charset=utf-8")
	    public Response getMsg(@Context HttpServletRequest request)
	    {
	    	
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
		String payloadRequest = null;
		try {
			payloadRequest = getBody(request);
		} catch (IOException e) {
			e.printStackTrace();
		}
		User newUser= retreiveInfo(payloadRequest);
		if (!userDao.checkUnique(newUser.getUsername())) {
			return Response.status(400).entity("Username already taken!").build();
		}
		if(!userDao.saveUser(newUser)) {
			return Response.status(400).entity("Registration unsuccessful").build();			
		}
		request.getSession().setAttribute("user", newUser);
		return Response.status(200).build();
	}
	
	@POST
	@Path("changeProfile")
	@Consumes("application/json;charset=utf-8" )
    @Produces("application/json;charset=utf-8")
	public Response changeProfile(@Context HttpServletRequest request) {
		User oldInfo =(User) request.getSession().getAttribute("user");	
		UserDAO userDao = (UserDAO) ctx.getAttribute("userDAO");
		String payloadRequest = null;
		try {
			payloadRequest = getBody(request);
		} catch (IOException e) {
			e.printStackTrace();
		}
		User changed= retreiveInfo(payloadRequest);
		if (changed.getPassword().equals(oldInfo.getPassword())) { 
			if(!userDao.changeUser(changed)) {
				return Response.status(400).entity("Saving changes unsuccessful").build();			
			}else{
			request.getSession().setAttribute("user", changed);
			return Response.status(200).build();}		
		}else
			return Response.status(400).entity("Wrong password!").build();
		
	}
	
	private User retreiveInfo(String payloadRequest) {
		ArrayList<String> params = new ArrayList<>();
		//username=administer&password=58fk4d&firstName=JOvana&lastName=Doe&sex=male&newPass=s&role=admin
		System.out.println("register/changeuser request"+payloadRequest);
		String[]  pairs=  payloadRequest.split("&");
		for(int i=0; i<pairs.length ; i++){
		String[] keys=pairs[i].split("=");
		for(String st : keys){
		params.add(st);
		}
		
		}
		//String firstName, String lastName, String sex, String username, String password, String role, String newPass
		if(params.size()==14)
			return new User(params.get(5),params.get(7),params.get(9),params.get(1),params.get(3),params.get(13), params.get(11) );
		else return new User(params.get(5),params.get(7),params.get(9),params.get(1),params.get(3),params.get(12), "");
		//System.out.println("username" + params.get(1)+ "password"+ params.get(3)+"name"+ params.get(5)+"surn"+ params.get(7)+ "sex"+ params.get(9)+"newpass"+ null+"role"+params.get(11));

		
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

