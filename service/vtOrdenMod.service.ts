import {Injectable} from '@angular/core';
import {GLOBAL} from "./global";
import { HttpClient , HttpHeaders } from "@angular/common/http";



@Injectable()
export class vtOrdenModService{

    public url:string;

   constructor(public _http :HttpClient) {
       this.url = GLOBAL.URL;
       
    }

    getOrdenMod(ipcCveCia :string , ipiFolioSusp :string , ipiPartidaArt: string){
        
        let headers = new HttpHeaders({
            "AuthKey": "",
            "AuthToken": "",
            "Content-Type": "application/json",
            "ipcCveCia": ipcCveCia,
            "ipiFolioSusp": ipiFolioSusp,
            "ipiPartidaArt": ipiPartidaArt,
            
         });
        
        return this._http.get(this.url + 'vtOrdenMod/'  , { observe: 'response',   headers: headers });
    }




}