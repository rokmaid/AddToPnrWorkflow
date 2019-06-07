package com.sabre.tn.redapp.sdk360.endpnrservice;

import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointButtonType;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointCommand;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointError;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointHint;
import com.sabre.stl.pos.srw.nextgen.flow.ext.v2.FlowExtPointResponseWrapper;
import com.sabre.stl.pos.srw.nextgen.redapp.travelitineraryread.rs.v1.RedAppTravelItinerary.RemarkInfo.Remark;
import com.sabre.stl.pos.srw.nextgen.redapp.travelitineraryread.rs.v1.RedAppTravelItineraryReadRs  ;
import com.sabre.tn.redapp.sdk360.addpnrlistener.Messages;

import static com.sabre.stl.pos.srw.nextgen.flow.ext.utils.FlowExtPointCommandUtils.addError;
import static com.sabre.stl.pos.srw.nextgen.flow.ext.utils.FlowExtPointErrorFactory.createMajorError;

public class ENDPnrServiceImp implements ENDPnrService {
	
	private static String HINT_ACTION_CODE= "com.sabre.tn.redapp.sdk360.hintactioncode"; 
	private static String HINT_BUTTON_LABEL ="Add Missing Info"  ; 
	
	

	@Override
	public FlowExtPointCommand execute(FlowExtPointCommand command) {
		// TODO Auto-generated method stub
		
		
	// if info  in the data model is missing show error with hint and end the flow 
		
		RedAppTravelItineraryReadRs tir = getTIRResponse(command) ;
		
		if(tir!=null) {
			
			if(! isRemarkPresent(tir)) {
				
				AddPNRHintError(command); 
			}
			
		}
		
	
		
		return command ;
	}
	
	
	
	private void AddPNRHintError(FlowExtPointCommand command) {
		
		FlowExtPointError extpointError = createMajorError(Messages.error_message_label); 
		
		FlowExtPointHint hint  =new FlowExtPointHint().withLabel(Messages.hint_label).withActionCode(HINT_ACTION_CODE).withButtonType(FlowExtPointButtonType.PRIMARY);
		
		extpointError.getHints().add(hint);
		
		addError(command, extpointError);
		
		
	}
	
	/*
	 * Get TIR Data Model
	 */
	
    private RedAppTravelItineraryReadRs getTIRResponse(FlowExtPointCommand extPointCommand){
    	
    	for (FlowExtPointResponseWrapper rsp :extPointCommand.getResponses()) {
			
    		
          if(rsp.getResponse().getStructure() instanceof RedAppTravelItineraryReadRs ){
        	  RedAppTravelItineraryReadRs  response = (RedAppTravelItineraryReadRs) rsp.getResponse().getStructure(); 
    			
    			return response; 
    			
    		}
    		
		}
    		
    	
    	
    return null ; 
    }
    
    /*
     * Check if historical remark is present in the pnr 
     */
    
    private boolean isRemarkPresent(RedAppTravelItineraryReadRs resp) {
    	
    	
    	if(resp.getTravelItinerary().getRemarkInfo()==null || resp.getTravelItinerary().getRemarkInfo().getRemark()==null) {
    		return false; 
    	}
    	
    	for(Remark r : resp.getTravelItinerary().getRemarkInfo().getRemark()) {
    		
    		if(r.getType().equals("Historical") && r.getText().equals("TEST") ) {
    			return true ; 
    		}
    		
    	}
    	
    	return false ; 
    	
    }

}
