import {Injectable} from '@angular/core';
import {GLOBAL} from "./global";
import { HttpClient , HttpHeaders } from "@angular/common/http";



@Injectable()
export class vtOrdenCService{

    public url:string;

   constructor(public _http :HttpClient) {
       this.url = GLOBAL.URL;
       
    }

    getOrdenC(ipcCveCia :string , ipcMesa: string){
        
        
        let headers = new HttpHeaders({
            "AuthKey": "",
            "AuthToken": "",
            "Content-Type": "application/json",
            "ipcCveCia": ipcCveCia,
            "ipcMesa": ipcMesa,
         });
        console.log("headers" + headers);
        return this._http.get(this.url + 'vtOrdenEnc/'  , { observe: 'response',   headers: headers });
    }




}