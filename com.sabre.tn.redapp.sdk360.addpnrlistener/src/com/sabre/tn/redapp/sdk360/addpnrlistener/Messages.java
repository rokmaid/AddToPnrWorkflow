package com.sabre.tn.redapp.sdk360.addpnrlistener;

import com.sabre.edge.platform.core.nls.EdgeNLS;

public class Messages extends EdgeNLS {
	
	
	private static final String MESSAGES_FILE_NAME = "messages";
	
	
	static {
    	initializeMessages(MESSAGES_FILE_NAME, Messages.class);
    }
	
	
	public static String hint_label ;
	public static String error_message_label ;

}
