import { Component, OnInit } from "@angular/core";
import {ctMesaService} from '../service/mesas.service'; 
import {ctMesas} from '../model/ctMesas';

@Component({
    selector: "ns-listaMesas",
    moduleId: module.id,
    templateUrl: "./mesas.component.html",
    providers: [ctMesaService]
})
export class MesasComponent implements OnInit {
    public _ctMesasObj:ctMesas;
    public _ctMesasArray:Array<ctMesas> = [];
   
    constructor( private _Service: ctMesaService) { }    

    ngOnInit():void{
        var respuesta     : any;
        var lista : any  ;
        var Error: any;
        var Mensaje : any;

        this._Service.getctMesas("mfeliz", "true").subscribe((result) => { 
            respuesta = result.body;
            console.log("mensaje->" + respuesta);
            Error   = respuesta.response.oplError;
            Mensaje = respuesta.response.opcMensage;       

            if (Error == 'true'){
                alert(Mensaje);
            }else {
                lista = respuesta.response.tt_ctMesa.tt_ctMesa;

                lista.forEach(item=>{ 
                    this._ctMesasObj = new ctMesas(
                        item.cCveCia,
                        item.iSucursal,
                        item.iMesa,
                        item.cMesa,
                        item.cObs,
                        item.lActiva,
                        item.deColumn,
                        item.deRow,
                        item.deWidth,
                        item.deHeight,
                        item.deX,
                        item.deY,
                        item.iArea,
                        item.iComensales,
                        item.cUsuario,
                        item.dtCreado,
                        item.dtModificado,
                    ); 
                    this._ctMesasArray.push(this._ctMesasObj,
                    
                    );
                    this._ctMesasArray.sort((a,b)=>a.deRow - b.deRow);
                }); 
            }
        }, (error) => {
            console.log("result");
            console.log(error);
            
         });
    }
}
