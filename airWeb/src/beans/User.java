package beans;


import java.io.Serializable;

public class User implements Serializable {
	private static final long serialVersionUID = 6640936480584723344L;
	
	private String firstName;
	private String lastName;
	private String sex;
	private String username;
	private String password;
	private String role;
	
	
	public User() {
	}

	public User(String firstName, String lastName, String sex, String username, String password, String role) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.sex = sex;
		this.username = username;
		this.password = password;
		this.role = role;
	}



	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((sex == null) ? 0 : sex.hashCode());
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + ((password == null) ? 0 : password.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		result = prime * result + ((role == null) ? 0 : role.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (sex == null) {
			if (other.sex != null)
				return false;
		} else if (!sex.equals(other.sex))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		if (password == null) {
			if (other.password != null)
				return false;
		} else if (!password.equals(other.password))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		if (role == null) {
			if (other.role != null)
				return false;
		} else if (!role.equals(other.role))
			return false;
		return true;
		
	}

	//in json format
	@Override
	public String toString() {
		return new StringBuffer("{ \"firstName\" : ").append("\""+this.firstName+"\"")
                .append(", \"lastName\" : ").append("\""+this.lastName+"\"")
                .append(", \"sex\" : ").append("\""+this.sex+"\"")
                .append(", \"username\" : ").append("\""+this.username+"\"")
                .append(", \"password\" : ").append("\""+this.password+"\"")
                .append(", \"role\" : ").append("\""+this.role+ "\"").append("}").toString();
	}

}