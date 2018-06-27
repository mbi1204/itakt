import { Component, OnInit } from "@angular/core";
import {ctMesaService} from '../service/ctMesa.service'; 

@Component({
    selector: "ns-listaMesas",
    moduleId: module.id,
    templateUrl: "./mesas.component.html",
    providers: [ctMesaService]
})
export class MesaComponent implements OnInit {
   
    constructor( private _Service: ctMesaService) { }
    

    ngOnInit(): void {

        var respuesta     : any;
        var lista : any  ;
        var Error: any;
        var Mensaje : any;

        this._Service.getctMesas("mfeliz", "true").subscribe((result) => {       
            
     

       respuesta = result.body;
       console.log(respuesta);
       Error   = respuesta.response.oplError;
       Mensaje = respuesta.response.opcMensage;

       console.log("error->"  + " " +  Error);
       console.log("mensaje->" + " " + Mensaje);
       if (Error == 'true'){
           alert(Mensaje);
       }else {
        lista = respuesta.response.tt_ctMesa.tt_ctMesa;
        
       
        

        lista.forEach(registro=>{ 
         console.log(registro.iMesa  + " " + registro.cMesa);
         
        }); 

       }
       
      
          
         }, (error) => {
            console.log("result");
            console.log(error);
            
         });
     
    
    }
    
}