import {Module} from 'sabre-ngv-core/modules/Module';
import {ExtensionPointService} from 'sabre-ngv-xp/services/ExtensionPointService';
import {getService} from "./Context";
import {HintXPConfig} from 'sabre-ngv-hints/HintXPConfig';
import {LayerService} from 'sabre-ngv-core/services/LayerService';
import {addPNRDialog} from './views/addPNRDialog';


export class Main extends Module {

      // this should be the same as defined on the Java Side 
  static  HINT_ACTION_CODE:string = "com.sabre.tn.redapp.sdk360.hintactioncode";

    init(): void {
        super.init();
        // initialize your module here

        const xp :ExtensionPointService = getService(ExtensionPointService); 


        xp.addConfig(Main.HINT_ACTION_CODE,new HintXPConfig( ()=>{

        
          let layerservice :LayerService = getService(LayerService);

         let dialog:addPNRDialog = new addPNRDialog();

         let options ={

         title:'add missing information to the PNR ',
         cssClass: 'dn-panel add-to-pnr-modal',
         actions: [

            {caption: 'Cancel',
              actionName: 'cancel',
              type: 'secondary',
              className: 'app.common.views.Button'
            },
           {
            caption: 'Submit',
              actionName: 'submit',
              type: 'success',
              className: 'app.common.views.Button'

           } 


         ]

         }

          layerservice.showInModal(dialog,options);



        } )) ; 



    }
}
