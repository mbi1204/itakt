import { Component, OnInit } from "@angular/core";
import {ctMesaService} from '../service/mesas.service'; 
import {ctMesas} from '../model/ctMesas';

import {SESSION  } from '../service/global';
import {ctMesaHService} from '../service/mesasHist.service'; 
import {vtMesaHist} from '../model/vtMesaHist';
import { Background } from "tns-core-modules/ui/styling/background";
import { backgroundColorProperty } from "tns-core-modules/ui/page/page";
import { timeProperty } from "tns-core-modules/ui/time-picker/time-picker";

@Component({
    selector: "ns-listaMesas",
    moduleId: module.id,
    templateUrl: "./mesas.component.html",
   // styleUrls: ["./mesas.component.css"],
    providers: [ctMesaService, ctMesaHService]
})
export class MesasComponent implements OnInit {
    public _ctMesasObj:ctMesas;
    public _ctMesasArray:Array<ctMesas> = [];
    public _ctMesasHObj:vtMesaHist;
    public _ctMesasHArray:Array<vtMesaHist> = [];
    public _cFecha     :string;
    

    constructor( private _Service: ctMesaService, private _ServiceH: ctMesaHService) {}    

    
    ngOnInit():void{
        console.log("mesas.component.ts");
        var respuesta: any;
        var lista: any  ;
        var Error: any;
        var Mensaje: any;
               
        

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

        
        
        this._ServiceH.getctMesasH("mfeliz",  1 ).subscribe((result) => {    
            respuesta = result.body;
            console.log("men hist: ->" + respuesta);
            Error   = respuesta.response.oplError;
            Mensaje = respuesta.response.opcMensage;

            if (Error == 'true'){
                alert(Mensaje);
            }else {
                lista = respuesta.response.tt_vtMesaHist.tt_vtMesaHist;
                
                lista.forEach(itemH=>{ 
                    this._ctMesasHObj = new vtMesaHist(
                    itemH.cCveCia,
                    itemH.iSucursal,
                    itemH.iMesa,
                    itemH.iPartida,
                    itemH.dtFechaHist,
                    itemH.iEstatusMesa,
                    itemH.cUsuario,
                    itemH.dtCreado,
                    itemH.dtModificado,
            ); 
            this._ctMesasHArray.push(this._ctMesasHObj);
            
        }); 
        
        
        }
        
        }, (error) => {
            console.log("result");
            console.log(error);
            
        });
        
          
    }
    regresaMesa(mesa:string): void {
        SESSION.g_cMesa=mesa;
        console.log("valor en session: --> " + SESSION.g_cMesa);
    }

    
    
    pintaBoton(imesa){
        {
            var viMesa: any;
            viMesa  = this._ctMesasHArray.find(cMesa=>cMesa.iMesa == imesa);
            
            
            
            switch (viMesa.iEstatusMesa) {                
                case 1:{
                    let myStyles = {
                        'background-color': 'red',      
                                       
                    };
                return myStyles;
                }
                case 2:{
                    let myStyles = {
                        'background-color': 'gray',
                        
                    };
                return myStyles;
                }
                case 3: {
                    let myStyles = {
                        'background-color': 'greenyellow', 
                        regresaTiempo() {
                
                        }

                    };
                return myStyles;
                } 
            } 
        }   
        
    }

    
    
}
