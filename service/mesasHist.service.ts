import {Injectable} from '@angular/core';
import {GLOBAL} from "./global";
import { HttpClient , HttpHeaders } from "@angular/common/http";



@Injectable()
export class ctMesaHService{

    public url:string;

   constructor(public _http :HttpClient) {
       this.url = GLOBAL.URL;
       
    }

    getctMesasH(ipcCveCia :string , ipiSucursal: number ){
       
        let headers = new HttpHeaders({
            "AuthKey": "",
            "AuthToken": "",
            "Content-Type": "application/json",
            "ipcCveCia": ipcCveCia,
            "ipiSucursal": "1" ,
         });

        return this._http.get(this.url + 'vtMesaHist/'  , { observe: 'response',   headers: headers });
    }




}