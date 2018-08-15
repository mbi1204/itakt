import {Injectable} from '@angular/core';
import {GLOBAL} from "./global";
import { HttpClient , HttpHeaders } from "@angular/common/http";

@Injectable()
export class ctGrupoService{

    public url:string;

    constructor(public _http :HttpClient) {
        this.url = GLOBAL.URL;
        
     }

     get (ipcCveCia :string ){

        let headers = new HttpHeaders({
            "AuthKey": "",
            "AuthToken": "",
            "Content-Type": "application/json",
            "ipcCveCia": ipcCveCia,            
         });

        return this._http.get(this.url + 'ctGrupo/'  , { observe: 'response',   headers: headers });
     }
}