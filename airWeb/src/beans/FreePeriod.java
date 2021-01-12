package beans;

import java.io.Serializable;
import java.util.Date;

public class FreePeriod implements Serializable{ /**
	 * 
	 */
	private static final long serialVersionUID = 4641797356889458477L;
	private Date begin;
	private Date end;

	
	
	public FreePeriod(Date begin, Date end) {
		super();
		this.begin = begin;
		this.end = end;
	}
	

	public Date getBegin() {
		return begin;
	}


	public void setBegin(Date begin) {
		this.begin = begin;
	}


	public Date getEnd() {
		return end;
	}


	public void setEnd(Date end) {
		this.end = end;
	}

		@Override
		public String toString() {
			return new StringBuffer("{ \"begin\" : ").append("\""+this.begin+"\"")
	                .append(", \"end\" : ").append("\""+this.end+"\"")
	                .append("}").toString();
		}


}
