import { Component,OnInit, Inject } from "@angular/core";
import 'nativescript-localstorage';
import {vtOrden} from '../model/vtOrden'; 
import {SESSION ,FECHA } from '../service/global';
import {ctEmpleado} from "../model/ctEmpleado";

import { TNSFancyAlert } from "nativescript-fancyalert";
import {Router,ActivatedRoute,Params} from '@angular/router';
import { ImageSource, fromBase64, fromFile,fromData } from "tns-core-modules/image-source";


@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:  ["./home.component.css"]  
})
export class HomeComponent implements OnInit { 
   public _cFecha     :string;
   public _ctEmpleado :ctEmpleado;
   public _cCveCia    :string;   
   public _cNombre    :string;
   public _iMesa      :number;
   public _cMesa      :String;
   public _image      :ImageSource; 
   public _vtOrden    :vtOrden;
   public _iComensal  :number;
   public _iOrden     :string;

   
   constructor( private _router:Router ) {}

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
            this._vtOrden   =  SESSION.g_vtOden;   
            this._iComensal = this._vtOrden.iComensales;
            this._iOrden    = String (this._vtOrden.iFolioSusp)  + "/" +  String (this._vtOrden.iIDDiario)   ;           

        }               
   
    }

   
    
}


