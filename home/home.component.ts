import { Component,OnInit, Inject} from "@angular/core";
import { ItemEventData } from "ui/list-view"; 
import 'nativescript-localstorage';
import {vtOrden} from '../model/vtOrden'; 
import {vtOrdenDet} from '../model/vtOrdenDet'; 
import {vtOrdenMod} from '../model/vtOrdenMod';

import {SESSION ,FECHA } from '../service/global';
import {ctEmpleado} from "../model/ctEmpleado";


import {vtOrdenCService} from '../service/vtOrdenC.service'; 
import {vtOrdenDetService} from '../service/vtOrdenDet.service'; 
import {vtOrdenModService} from '../service/vtOrdenMod.service';

import { TNSFancyAlert } from "nativescript-fancyalert";
//import {Router,ActivatedRoute,Params} from '@angular/router';
import {Router} from '@angular/router';
import { ImageSource, fromBase64, fromFile,fromData } from "tns-core-modules/image-source";

import * as Toast from "nativescript-toast";
//import { GestureEventData } from "tns-core-modules/ui/gestures/gestures";


@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:  ["./home.component.css"] ,
    providers: [vtOrdenCService, vtOrdenDetService, vtOrdenModService] ,
    
})
export class HomeComponent implements OnInit { 
    public myItems: Array<vtOrdenDet>;
    
    
   public _vtOrdenCObj:vtOrden;
   public _vtOrdenCArray:Array<vtOrden> = [];
   public _vtDetalleObj:vtOrdenDet;
   public _vtDetalleArray:Array<vtOrdenDet> = [];
   public _vtDetalleMod:vtOrdenMod;
   public _vtDetModArray:Array<vtOrdenMod> = [];

   public _cFecha     :string;
   public _ctEmpleado :ctEmpleado;
   public _cCveCia    :string;   
   public _cNombre    :string;
   public _iMesa      :number;
   public _cMesa      :string;
   public _image      :ImageSource; 
   public _vtOrden    :vtOrden;
   public _iComensal  :number;
   public _iOrden     :string;
   public _iCuentas   :string;
   public _iOrdenes   :string;
   public _FolioSusp  :string;
   public _cMesero    :string;
   public _deArtTotal :number;
   public _deDescuento:number;
   public _deImpTotal :number;
   public _deImporte:number;
   public _cEstado:string;
   public _iPartida:number;
   public _tiempo:string;
   public selectedOption: string = "";
   public prop: string = "Item 1";
   selectedIndex: number;

   
   
   constructor( private _router:Router, private _Service:vtOrdenCService, 
                private _ServiceD: vtOrdenDetService, private _ServiceMod:vtOrdenModService) {}
    
    ngOnInit(): void {
        
        if  (SESSION.g_ctEmpleado == null) {
            TNSFancyAlert.showError("Error!", ""  , "error en la carga de la session del empleado");            
            this._router.navigate(["/login"]);
        }

       this._ctEmpleado =  SESSION.g_ctEmpleado;
       this. _cFecha    =  FECHA.g_hoy;
       this._image = fromBase64(this._ctEmpleado.bImagen);
       this._image.toBase64String( "jpg", 100);

       this._cNombre = this._ctEmpleado.cNombre    + ' ' +
                       this._ctEmpleado.cApellidoP + ' ' +  
                       this._ctEmpleado.cApellidoM ;
        
        if (SESSION.g_cMesa != null){ 
            this._cMesa     =  SESSION.g_cMesa; 
        }                                            
        
        //si existe orden 
        if (SESSION.g_vtOden != null){
            this._vtOrden =  SESSION.g_vtOden;   
            this._iComensal = 0;
            this._iOrden    = String (this._vtOrden.iFolioSusp)  + "/" +  String (this._vtOrden.iIDDiario);
        } 

            /*Busca encabezado de la venta*/
            var respuesta: any;
            var lista: any  ;
            var Error: any;
            var Mensaje: any;
                   
            
            this._Service.getOrdenC(SESSION.g_cCveCIA , SESSION.g_cMesa).subscribe((result) => { 
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
                        SESSION.g_vtOden = this._vtOrdenCObj;
                        this._vtOrdenCArray.push(this._vtOrdenCObj);
                                               
                    }); 
                } 
            }
            
            , (error) => {
                console.log("result");
                console.log(error);
            });    

            
    } 

    /*Identifica el estatus de la cuenta y lo asigna*/
    pintaOrden(cEstado){
        var viOrden: any;
        var viOrdenes: any;
        
        viOrden   =  this._vtOrdenCArray.find(cMesa=>cMesa.cMesa ==  String(SESSION.g_iMesa));
        viOrdenes =  this._vtOrdenCArray.find(cMesa=>cMesa.cMesa ==  String(SESSION.g_iMesa));
    
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

        var respuesta:any;
        var lista:any  ;
        var Error:any;
        var Mensaje:any;
        var viOrden:any;
        var viOrdenes:any;
        this._vtDetalleArray = []; 


        SESSION.g_iOrden = String(viFolioSusp);
        
        viOrden   =  this._vtOrdenCArray.find(cMesa=>cMesa.iFolioSusp ==  (viFolioSusp) );
        viOrdenes =  this._vtOrdenCArray.find(cMesa=>cMesa.iFolioSusp ==  (viFolioSusp) );
        this._iOrden  = viOrden.iIDDiario + "/" + viOrden.iFolioSusp;

        Toast.makeText("Orden Seleccionada " + viOrden.iIDDiario + "/" + viOrden.iFolioSusp).show() ;

        /*Busca el detalle de la orden*/
        this._ServiceD.getOrdenDet(SESSION.g_cCveCIA, SESSION.g_iOrden).subscribe((result) => { 
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
                        item.deImpDesc,
                        item.deCantCan,
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
        var viTotalEnc: any;
        viTotalEnc = this._vtOrdenCArray.find(cMesa=>cMesa.iFolioSusp == (viFolioSusp) );
        this._iComensal = viTotalEnc.iComensales;
        this._iOrden    = String (viTotalEnc.iIDDiario) + "/" + String (viTotalEnc.iFolioSusp);
        this._deArtTotal  = viTotalEnc.deTotArticulos; 
        this._deDescuento = viTotalEnc.deDescuento; 
        this._deImpTotal  = viTotalEnc.deImporte; 
        this._cMesero     = viTotalEnc.cCveUsuario;    
    }     
    /*Realiza calculos del detalle por partida en la lista*/
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
    
    /*Recupera la partida del articulo*/
   /* onItemTap(args: ItemEventData) : void{
        this._vtDetModArray = [];
        SESSION.g_iPartida = this._vtDetalleArray[args.index].iPartida;
        this._iPartida = this._vtDetalleArray[args.index].iPartida; 
        
        var respuesta:any;
        var lista:any  ;
        var Error:any;
        var Mensaje:any;
        console.log("sigo funcionando" + " " + SESSION.g_iPartida );
        /*Busca si el platillo tiene modificadores
        this._ServiceMod.getOrdenMod(SESSION.g_cCveCIA, SESSION.g_iOrden, String(this._iPartida)).subscribe((result) => { 
            respuesta = result.body;
            console.log("mensaje->" + respuesta);
            Error   = respuesta.response.oplError;
            Mensaje = respuesta.response.opcError;       
            
            if (Error == 'true'){
                alert(Mensaje);
            }else {                                        
                lista = respuesta.response.tt_vtVtaSuspMod.tt_vtVtaSuspMod;
                
                lista.forEach(item=>{ 
                    this._vtDetalleMod = new vtOrdenMod(
                        item.cCveCia,
                        item.iFolioSusp,
                        item.iPartidaArt,
                        item.iPartida,
                        item.cModSubC,
                        item.iComensal,
                        item.cArticulo,   
                        item.iModArt,   
                        item.cModArt,
                        item.iCantMod,   
                        item.lSubProducto,   
                        item.cUsuario,
                        item.dtCreado,   
                        item.dtModificado,
                        ); 

                    this._vtDetModArray.push(this._vtDetalleMod);
                }); 
            } 
        }, (error) => {
            console.log("result");
            console.log(error);
        });     
    }    */
/*identifica la partida seleccionada*/
selectMenu(i, iPartida:any) {
    this.selectedIndex = i;
   
    this._vtDetModArray = [];
        SESSION.g_iPartida = iPartida;
        this._iPartida = iPartida; 
        
        var respuesta:any;
        var lista:any  ;
        var Error:any;
        var Mensaje:any;
        
        /*Busca si el platillo tiene modificadores**/
        this._ServiceMod.getOrdenMod(SESSION.g_cCveCIA, SESSION.g_iOrden, String(this._iPartida)).subscribe((result) => { 
            respuesta = result.body;
            console.log("mensaje->" + respuesta);
            Error   = respuesta.response.oplError;
            Mensaje = respuesta.response.opcError;       
            
            if (Error == 'true'){
                alert(Mensaje);
            }else {                                        
                lista = respuesta.response.tt_vtVtaSuspMod.tt_vtVtaSuspMod;
                
                lista.forEach(item=>{ 
                    this._vtDetalleMod = new vtOrdenMod(
                        item.cCveCia,
                        item.iFolioSusp,
                        item.iPartidaArt,
                        item.iPartida,
                        item.cModSubC,
                        item.iComensal,
                        item.cArticulo,   
                        item.iModArt,   
                        item.cModArt,
                        item.iCantMod,   
                        item.lSubProducto,   
                        item.cUsuario,
                        item.dtCreado,   
                        item.dtModificado,
                        ); 

                    this._vtDetModArray.push(this._vtDetalleMod);
                }); 
            } 
        }, (error) => {
            console.log("result");
            console.log(error);
        });     
    }



    /*Muestra informacion de la partida en el detalle*/
    onDoubleTap() {
                      
        var viEnc: any;
        var viDet: any;
        var viMod: any;
        var viCantC: any;

        var vcLlevar: any;
        var vcLibera:string;
        var vcEstado:string;
        var vcEstatus:string;
        var modificadores:string;
        
        viEnc = this._vtOrdenCArray.find(viOrden=>viOrden.iFolioSusp == (SESSION.g_iOrden));
        viDet = this._vtDetalleArray.find(viOrden=>viOrden.iPartida == (this._iPartida));
        

        if(this._vtDetModArray.find(viOrden=>viOrden.iPartidaArt == (this._iPartida))){
            
            viMod = this._vtDetModArray.find(viOrden=>viOrden.iPartidaArt == (this._iPartida));
            var viPartida = viMod.iPartidaArt;
            modificadores = "";

            this._vtDetModArray = this._vtDetModArray.filter(function(dato){
            if(dato.iPartidaArt == viPartida){
                if (modificadores == ""){
                    modificadores = dato.cModArt;
                } else {
                    modificadores = modificadores + "," + dato.cModArt;
                }
                
            }else{
                
                return true;
            }
            });  
        }
        else{
            modificadores = "-";
        }
        if (viEnc.lLlevar == false){
            vcLlevar = "No";
        }else{
            vcLlevar = "Si"
        }

        if(viDet.lLibera == true){ 
            vcLibera= "LIBERADO"
        }  else {
            vcLibera= "ORDENADO"
        } 
    
        /*Busca el estatus del platillo y lo asigna*/
        if (viDet.cEstado == "") {
            vcEstado = "-" + "\n"+ "Cancelados: " +  viDet.deCantCan;      
        }  

        if(viDet.lCancelado && (viDet.deCantidad - viDet.deCantCan == 0) ){
           
            if(viDet.cEstado == "Ordenado") {      

                    viDet  = this._vtDetalleArray.find(cMesa=>cMesa.iPartida == SESSION.g_iPartida  );
                var fecC   = new Date(viDet.dtCreado);
                var fecA   = new Date(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
                var vdTTot = new Date();
                var vdFCan = new Date(viDet.dtCancela);
                
                vdTTot.setHours(fecA.getHours()-fecC.getHours(),
                                fecA.getMinutes() -fecC.getMinutes(),
                                fecA.getSeconds()-fecC.getSeconds());
                
                var vdtFCan  = (vdFCan.getHours() + ":" + vdFCan.getMinutes() + ":" + vdFCan.getSeconds());                                
                var vdtTO    = (fecC.getHours()   + ":" + fecC.getMinutes()   + ":" + fecC.getSeconds());         
                var vdHoraT  = vdTTot.getHours()   < 10 ? "0" + vdTTot.getHours():   vdTTot.getHours();
                var vdMinT   = vdTTot.getMinutes() < 10 ? "0" + vdTTot.getMinutes(): vdTTot.getMinutes();
                var vdSegT   = vdTTot.getSeconds() < 10 ? "0" + vdTTot.getSeconds(): vdTTot.getSeconds();
                
                var deTieFin = vdHoraT + ":" + vdMinT + ":" + vdSegT;;
                
                
                this._tiempo = deTieFin;
                vcEstado = "Cancelado, Ordenado por: " + viDet.cNomOrdena + ", Solicitud: " + vcLibera + ", Ordenado: " + vdtTO + ", Tiempo Ordenado: " + this._tiempo + " minutos" 
                           + "\n"+ "Cancela: "+ viDet.cNomCancela + " " + vdtFCan +  "\n" + "Cancelados: " + viDet.deCantCan;
            }
        }else if(viDet.cEstado == "Ordenado") {      

                viDet = this._vtDetalleArray.find(cMesa=>cMesa.iPartida == SESSION.g_iPartida  );
                var fecC = new Date(viDet.dtCreado);
                var fecCO = new Date(viDet.dtCortesia);
                var fecA = new Date(new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0]);
                var vdTTot = new Date();
                
                
                vdTTot.setHours(fecA.getHours()-fecC.getHours(),
                                fecA.getMinutes() -fecC.getMinutes(),
                                fecA.getSeconds()-fecC.getSeconds());
                
                var vdtTO    = (fecC.getHours() + ":" + fecC.getMinutes() + ":" + fecC.getSeconds());         
                var vdHoraT  = vdTTot.getHours()   < 10 ? "0" + vdTTot.getHours(): vdTTot.getHours();
                var vdMinT   = vdTTot.getMinutes() < 10 ? "0" + vdTTot.getMinutes(): vdTTot.getMinutes();
                var vdSegT   = vdTTot.getSeconds() < 10 ? "0" + vdTTot.getSeconds(): vdTTot.getSeconds();
                var deTieFin = vdHoraT + ":" + vdMinT + ":" + vdSegT;;

                
                this._tiempo = deTieFin;
                vcEstado = "Ordenado, Ordenado por: " + viDet.cNomOrdena + ", Solicitud: " + vcLibera + ", Ordenado: " + vdtTO + ", Tiempo Ordenado: " + this._tiempo 
                         + " minutos" + "\n"+ "Cancelados: " + viDet.deCantCan;
                
                if (viDet.cTipoDesc == "CO"){
                    var vdtTC    = (fecCO.getHours() + ":" + fecCO.getMinutes() + ":" + fecCO.getSeconds());   
                    vcEstado = vcEstado + "\n" + "Aplica Cortesía: " + viDet.cNomCortesia + ", " + vdtTC;
                }
        }else if(viDet.cEstado == "Terminado"){
        

        }

        /*Crea el mensaje de informacion*/
        TNSFancyAlert.showInfo("INFORMACION", "Abrio orden: "  + viEnc.cNomAbre + ", Orden: "  + viEnc.iFolioSusp + ", Llevar: " + vcLlevar + "\n" +
                                "Registrados: "  + viDet.deCantidad +  "\n" +
                                "Modif: " + modificadores + ", " +  viDet.cCompartir + ", " + viDet.cObs + "\n" +
                                "Estado: " + vcEstado + "\n",
                                //",Cancelados: " + viCantC.deCantCan, 
                                "ACEPTAR"  );
    }
    
    
}
 
