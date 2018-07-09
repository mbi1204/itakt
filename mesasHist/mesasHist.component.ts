import { Component, OnInit } from "@angular/core";
import {ctMesaHService} from '../service/mesasHist.service'; 
import {vtMesaHist} from '../model/vtMesaHist';

@Component({
    selector: "ns-listaMesas",
    moduleId: module.id,
    templateUrl: "./mesas.component.html",
    providers: [ctMesaHService]
})
export class MesasHComponent implements OnInit {

    public _ctMesasHObj:vtMesaHist;
    public _ctMesasHArray:Array<vtMesaHist> = [];
   
    constructor( private _Service: ctMesaHService) { }
    

    ngOnInit(): void {

        var respuesta     : any;
        var lista : any  ;
        var Error: any;
        var Mensaje : any;

        this._Service.getctMesasH("mfeliz", 1).subscribe((result) => {       
            
     

       respuesta = result.body;
       console.log(respuesta);
       Error   = respuesta.response.oplError;
       Mensaje = respuesta.response.opcMensage;

       console.log("error->"  + " " +  Error);
       console.log("mensaje->" + " " + Mensaje);
       if (Error == 'true'){
           alert(Mensaje);
       }else {
        lista = respuesta.response.tt_vtMesaHist.tt_vtMesaHist;
        
       
        

        lista.forEach(item=>{ 
            this._ctMesasHObj = new vtMesaHist(
                item.cCveCia,
                item.iSucursal,
                item.iMesa,
                item.iPartida,
                item.dtFechaHist,
                item.iEstatusMesa,
                item.cUsuario,
                item.dtCreado,
                item.dtModificado,
            ); 
            this._ctMesasHArray.push(this._ctMesasHObj
                
            );
        }); 
        //console.log("array" + this._ctMesasArray);

        console.log("arraantes del for");

        this._ctMesasHArray.forEach(element => {
            console.log(element.iEstatusMesa);
            
        });
       }
       
      console.log("fin");
          
         }, (error) => {
            console.log("result");
            console.log(this._ctMesasHArray);
            
         });
     
    
    }
    
}