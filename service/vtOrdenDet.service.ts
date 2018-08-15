import {Injectable} from '@angular/core';
import {GLOBAL} from "./global";
import { HttpClient , HttpHeaders } from "@angular/common/http";



@Injectable()
export class vtOrdenDetService{

    public url:string;

   constructor(public _http :HttpClient) {
       this.url = GLOBAL.URL;
       
    }

    getOrdenDet(ipcCveCia :string , ipcFolio :string){
        console.log("ifolio" + ipcFolio);

        let headers = new HttpHeaders({
            "AuthKey": "",
            "AuthToken": "",
            "Content-Type": "application/json",
            "ipcCveCia": ipcCveCia,
            "ipcFolio": ipcFolio,
         });
        
        return this._http.get(this.url + 'vtOrdenDet/'  , { observe: 'response',   headers: headers });
    }




}