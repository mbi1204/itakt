import { Component, OnInit  } from "@angular/core";

import 'nativescript-localstorage';

import {vtOrdenDetService} from '../service/vtOrdenDet.service'; 
import {vtOrdenCService}   from "~/service/vtOrdenC.service";


import {vtOrdenDet} from "~/model/vtOrdenDet";
import {ctEmpleado} from "../model/ctEmpleado";
import {vtOrden}    from "~/model/vtOrden";

import {SESSION ,FECHA } from '../service/global';

import { ImageSource, fromBase64, fromFile,fromData } from "tns-core-modules/image-source";
import {Router,ActivatedRoute,Params} from '@angular/router';

import { ItemEventData } from "ui/list-view"; 
import * as Toast from "nativescript-toast";

@Component({
    selector: "ns-home",     
    moduleId: module.id,                 
    templateUrl: "../home/home.component.html",
    styleUrls:  ["../home/home.component.css"] ,
    providers: [vtOrdenDetService, vtOrdenCService],  
    
   
})


export class DetalleComponent implements OnInit {
    
   

    public _vtDetalleObj:vtOrdenDet;
    public _vtDetalleArray:Array<vtOrdenDet> = [];
    public _vtFolio:string;
    public _cDesc:string;
    public _iPartida:number;
    public _deImporte:number;
    public _cEstado:string;
    public _cNombre:string;
    public _ctEmpleado:ctEmpleado;
    public _image      :ImageSource; 
    
    public _deArtTotal :number;
    public _deDescuento:number;
    public _deImpTotal :number;
    public _cFecha:string;
    public _cMesa:string;
    public _cMesero:string;
    public _iComensal:number;
    public _iOrden:string;
    public _vtOrdenCObj:vtOrden;
    public _vtOrdenCArray:Array<vtOrden> = [];

    
    
    constructor( private _Service: vtOrdenDetService, private _ServiceC: vtOrdenCService) {     
    }
    
    

    ngOnInit(): void{
        console.log("detalle.component.ts");
             
        var respuesta: any;
        var lista: any  ;
        var Error: any;
        var Mensaje: any;
       
        this._Service.getOrdenDet(SESSION.g_cCveCIA, SESSION.g_iOrden).subscribe((result) => { 
            respuesta = result.body;
            console.log("mensaje->" + respuesta);
            Error   = respuesta.response.oplError;
            Mensaje = respuesta.response.opcError;       
           
            if (Error == 'true'){
                alert(Mensaje);
            }else {                                        
                lista = respuesta.response.tt_vtVtaSuspDet.tt_vtVtaSuspDet;

                lista.forEach(item=>{ 
                    this._vtDetalleObj = new vtOrdenDet(
                        item.cCveCia,
                        item.iFolioSusp,
                        item.iPartida,
                        item.iComensal,
                        item.dtFecha,
                        item.iSucursal,
                        item.cUsuarioV,     
                        item.cTipoTrans,    
                        item.cEstado,       
                        item.cCodRazon,     
                        item.cCliente,
                        item.iArticulo,
                        item.cArticulo,     
                        item.iSubProd,
                        item.cDescripcion,  
                        item.dePrecio,
                        item.deImpuesto,
                        item.deValorImp,
                        item.dePrecVta,
                        item.deDescuento,
                        item.dePorcDesc,
                        item.dePrecioUnit,
                        item.deCantidad,
                        item.deImporte,
                        item.cUDF1,
                        item.deUDF1,
                        item.cUDF2,                        
                        item.deUDF2,
                        item.cUDF3,
                        item.deUDF3,
                        item.lEsDev,
                        item.iFolVtaO,
                        item.iOServID,
                        item.dtCreado,
                        item.dtModificado,
                        item.cUsuario,
                        item.cObs,
                        item.cEntregarA,
                        item.lLlevar,
                        item.cCompartir,
                        item.iTermino,
                        item.dtFHora,
                        item.iImpresora,
                        item.lLibre,
                        item.vcMesa,
                        item.iCortesia,
                        item.iIDDiario,
                        item.cPartidaR,
                        item.cNombreR,
                        item.cRazonID,
                        item.cTipoDesc,
                        item.iCOrigen,
                        item.iCDestino,
                        item.deTCantidad,
                        item.lTraspaso,
                        item.iGrupo,
                        item.lCancelado,
                        item.deCantDesc,
                        item.deCantCanc,
                        item.cUsuOrdena,
                        item.cNomOrdena,
                        item.cUsuCancela,
                        item.cNomCancela,
                        item.cUsuCortesia,
                        item.cNomCortesia,
                        item.cUsuCambPre,
                        item.cNomCambPre,
                        item.cUsuDesc,
                        item.cNomDesc,
                        item.dtTermina,
                        item.dtCortesia,
                        item.dtCancela,
                        item.dtCambioP,
                        item.dtDescuento,
                        item.lLibera,); 

                    this._vtDetalleArray.push(this._vtDetalleObj);
                }); 
            } 
        }, (error) => {
            console.log("result");
            console.log(error);
        });   

        

        this._ServiceC.getOrdenC(SESSION.g_cCveCIA , SESSION.g_cMesa).subscribe((result) => { 
            respuesta = result.body;
            console.log("mensaje->" + respuesta);
            Error   = respuesta.response.oplError;
            Mensaje = respuesta.response.opcError;      
            
                
            if (Error == 'true'){
                alert(Mensaje);
            }else {
                lista = respuesta.response.tt_vtVtaSusp.tt_vtVtasusp;
                
                
                                
                lista.forEach(item=>{ 
                    this._vtOrdenCObj = new vtOrden(
                        item.cCveCia,
                        item.iFolioSusp,
                        item.dtFecha,
                        item.iSucursal,
                        item.cCveUsuario,
                        item.cTipoTrans,
                        item.cEstado,
                        item.deSubtotal,
                        item.deImpuesto,
                        item.deDescuento,
                        item.deImporte,
                        item.deTotArticulos,
                        item.cCliente,
                        item.lCredito,
                        item.iMonID,
                        item.deTipoCambio,
                        item.dtFHora,
                        item.lFacturar,
                        item.iAlmacen,
                        item.dtCreado,
                        item.dtModificado,
                        item.cUSuario,
                        item.iFolRef,
                        item.cObs,
                        item.iNivelP, 
                        item.lVtaDirecta,
                        item.cEntregarA,
                        item.iLocalID, 
                        item.cTienda,
                        item.lLlevar,
                        item.cMesa,
                        item.iComensales, 
                        item.iCortesia, 
                        item.iIDDiario, 
                        item.cPartidaR,
                        item.cNombreR,
                        item.cRazonID,
                        item.cUsuAbre,
                        item.cNomAbre,
                        item.dtTerminal,
                    ); 
                    
                    this._vtOrdenCArray.push(this._vtOrdenCObj);
                                           
                }); 
            } 
        }

        , (error) => {
            console.log("result");
            console.log(error);
        });
        
                       
    }
    
    onItemTap(args: ItemEventData) : void{
        
        SESSION.g_iPartida = this._vtDetalleArray[args.index].iPartida;
        
    }  
    calculaTotal(iPartida){
        var viTotal: any;
        viTotal   = this._vtDetalleArray.find(cMesa=>cMesa.iPartida == iPartida );
        this._deImporte = viTotal.dePrecVta * viTotal.deCantidad;
        
        
        if(viTotal.cEstado == ""){
            this._cEstado = "A";
        }
        else if(viTotal.cEstado == "Ordenado"){  
            this._cEstado = "O";
        }   
        
        
    }
    totEnc(){
        if (SESSION.g_vtOden != null){
           
            var viTotalEnc: any;
            viTotalEnc = this._vtOrdenCArray.find(cMesa=>cMesa.iFolioSusp ==  (SESSION.g_iOrden) );
            
            
            this._ctEmpleado =  SESSION.g_ctEmpleado;
            this._image = fromBase64(this._ctEmpleado.bImagen);
            this._image.toBase64String( "jpg", 100);                     
            this._deArtTotal  = viTotalEnc.deTotArticulos; // SESSION.g_vtOden.deTotArticulos;
            this._deDescuento = viTotalEnc.deDescuento; //SESSION.g_vtOden.deDescuento;
            this._deImpTotal  = viTotalEnc.deImporte;   //SESSION.g_vtOden.deImporte;
            this._cFecha  = FECHA.g_hoy;
            this._cMesa   = SESSION.g_cMesa;
            this._cMesero = SESSION.g_vtOden.cCveUsuario;
            this._iComensal = viTotalEnc.iComensales;
            this._iOrden    = String (viTotalEnc.iIDDiario) + "/" + String (viTotalEnc.iFolioSusp)      ;
            

            this._cNombre = this._ctEmpleado.cNombre    + ' ' +
                            this._ctEmpleado.cApellidoP + ' ' +  
                            this._ctEmpleado.cApellidoM ;
            
        } 

    }
    pintaOrden(cEstado){
        var viOrden: any;
        var viOrdenes: any;
        var viTotalEnc: any;


        viOrden   =  this._vtOrdenCArray.find(cMesa=>cMesa.cMesa ==  String(SESSION.g_iMesa) );
        viOrdenes =  this._vtOrdenCArray.find(cMesa=>cMesa.cMesa ==  String(SESSION.g_iMesa) );
        viTotalEnc = this._vtOrdenCArray.find(cMesa=>cMesa.iFolioSusp ==  (SESSION.g_iOrden) );
        
        this._iOrden  = viTotalEnc.iIDDiario + "/" + viTotalEnc.iFolioSusp;
        this._cMesero = viOrden.cUSuario
        this._iComensal = viTotalEnc.iComensales;
        

        switch (cEstado) {
            case "PENDIENTE":{
                let myStyles = {
                    'background-color': 'greenyellow',
            }; 
            return myStyles;
            }
            case "IMPRESO": { 
                let myStyles = {
                    'background-color': 'red',
            }; 
            return myStyles;
            } 
        }
    }
    recuperaOrden(viFolioSusp){
        SESSION.g_iOrden = String(viFolioSusp);
        var viOrden: any;
        var viOrdenes: any;
        viOrden   =  this._vtOrdenCArray.find(cMesa=>cMesa.iFolioSusp ==  (viFolioSusp) );
        viOrdenes =  this._vtOrdenCArray.find(cMesa=>cMesa.iFolioSusp ==  (viFolioSusp) );
        Toast.makeText("Orden Seleccionada " + viOrden.iIDDiario + "/" + viOrden.iFolioSusp).show() ;
        
    }
   
    
}

