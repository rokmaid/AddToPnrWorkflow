import {PnrAdd} from 'sabre-ngv-app/app/widgets/pnrAdd/views/PnrAdd';
import {PnrAddSubmitter} from 'sabre-ngv-app/app/widgets/pnrAdd/models/PnrAddSubmitter'; 
import {cf} from '../Context';


export class addPNRDialog extends PnrAdd {


    constructor(){
        super();
    }

 selfCancelAction() {
        super.triggerOnEventBus('close-modal');
    }


 selfSubmitAction(){

    if (super._validateForm()) {
        let submitter = new PnrAddSubmitter({form: this}); 
        submitter.submit()
            .done(() => {
                    console.log("PNR Information has been added") ;

                    /*
                    Send command to end pnr 

                    */
                   cf('ER').send(); 
                }
            )
            .fail(() => {
                console.log("Error occurred"); (5)
            });
        super.triggerOnEventBus('close-modal');
    }


    }



}