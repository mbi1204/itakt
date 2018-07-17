/*
autor: imendoza@sinergitec.com
fecha: 02/07/2018
obs  : servicio relacionado al login
*/
import {Injectable} from '@angular/core';
import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse ,HttpParams } from "@angular/common/http";
import {GLOBAL} from './global';
import {vtOrden} from '../model/vtOrden'; 

@Injectable()
export class vtOrdenService {
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.URL;
    }

    /**
     * Crear una orden
     */
    PostCrearOrden(usuario: string , _vtOrden: vtOrden){

        var tt_Nuevos = [_vtOrden];

          // set headers here e.g.
          let headers = new HttpHeaders({
            "AuthKey": "",
            "AuthToken": "",
            "Content-Type": "application/json",
         });

        // peticion 
        let request  =   JSON.stringify({
            "request":
            {
                "ipcUsuario": usuario,
                "ds_Nuevos": { tt_Nuevos }              
                
            }
          });

          console.log(request);
        
          return this._http.post(this.url + 'vtOrden/',  request , {observe: 'response' ,  headers: headers });

    }
}