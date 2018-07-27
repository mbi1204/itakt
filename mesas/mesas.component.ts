import { Component, OnInit } from "@angular/core";
import {ctMesaService} from '../service/mesas.service'; 
import {ctMesas} from '../model/ctMesas';
import 'nativescript-localstorage';

import {SESSION ,FECHA } from '../service/global';
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
    public _cTiempo    :any;
    
   

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
    pintaBoton(iMesa){
        var viMesa: any;
        viMesa   = this._ctMesasHArray.find(cMesa=>cMesa.iMesa == iMesa );
        switch (viMesa.iEstatusMesa) {
            case 1:{
                let myStyles = {
                    'background-color': 'red',
            }; 
            return myStyles;
            }
            case 2: { this._cTiempo = "00:00:00";
                let myStyles = {
                    'background-color': 'gray',
            }; 
            return myStyles;
            } 
            case 3: { this._cTiempo = "00:00:01"
                let myStyles = { 
                    'background-color': 'greenyellow', 
            }; 
            return myStyles;
            } 
        }
    }

    pintaTiempo(iMesa){

        var viMesa: any;
        viMesa   = this._ctMesasHArray.find(cMesa=>cMesa.iMesa == iMesa );
        if(viMesa.iEstatusMesa == 2){
            this._cTiempo = "00:00:00";
        }
        if(viMesa.iEstatusMesa != 2){

            var fecC = new Date(viMesa.dtCreado);
            var fecA = new Date(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
            var vdTTot = new Date();
           

            

            vdTTot.setHours(fecA.getHours()-fecC.getHours(),
                            fecA.getMinutes() -fecC.getMinutes(),
                            fecA.getSeconds()-fecC.getSeconds());
                                    
                                   
            var vdHoraT = vdTTot.getHours()   < 10 ? "0" + vdTTot.getHours(): vdTTot.getHours();
            var vdMinT  = vdTTot.getMinutes() < 10 ? "0" + vdTTot.getMinutes(): vdTTot.getMinutes();
            var vdSegT  = vdTTot.getSeconds() < 10 ? "0" + vdTTot.getSeconds(): vdTTot.getSeconds();
            var deTieFin = vdHoraT + ":" + vdMinT + ":" + vdSegT;
                    
            this._cTiempo = deTieFin;            
            //this._cTiempo = "00:00:01";
        }
        
    }
    regresaMesa(cMesa:string, iMesaID:number): void {
        SESSION.g_cMesa= cMesa;
        SESSION.g_iMesa= iMesaID;
        console.log("valor en session: --> " + SESSION.g_cMesa);
    }
    
    
    
} 
 