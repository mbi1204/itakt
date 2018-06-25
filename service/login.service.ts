/*
autor: imendoza@sinergitec.com
fecha: 25/06/2018
obs  : servicio relacionado al login
*/
import {Injectable} from '@angular/core';
import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse ,HttpParams } from "@angular/common/http";
import {GLOBAL} from './global';

@Injectable()
export class LoginService {
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.URL;
    }

    /**
     * obtener acceso al sistema atravez del metodo post regresando el objeto del empleado
     */
    PostLogin(usuario:string , password:string){

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
                "ipcCveEmp"   :usuario,
                "ipcPassword" :password
            }
          });

          console.log(request);
        
          return this._http.post(this.url + 'login/',  request , {observe: 'response' ,  headers: headers });

    }
}