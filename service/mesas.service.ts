import {Injectable} from '@angular/core';
import {GLOBAL} from "./global";
import { HttpClient , HttpHeaders } from "@angular/common/http";



@Injectable()
export class ctMesaService{

    public url:string;

   constructor(public _http :HttpClient) {
       this.url = GLOBAL.URL;
       
    }

    getctMesas(ipcCveCia :string , iplTodos: string){
       
        let headers = new HttpHeaders({
            "AuthKey": "",
            "AuthToken": "",
            "Content-Type": "application/json",
            "ipcCveCia": ipcCveCia,
            "lTodos": iplTodos,
         });

        return this._http.get(this.url + 'ctMesa/'  , { observe: 'response',   headers: headers });
    }




}