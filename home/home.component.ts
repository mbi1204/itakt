import { Component,OnInit } from "@angular/core";
import { isAndroid}         from 'platform';
import 'nativescript-localstorage';


import { ViewChild } from "@angular/core";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:  ["./home.component.css"]
})
export class HomeComponent implements OnInit {
    /*Código adriana Vista principal*/
    public isAndroid : boolean;
    public usuario :any;
   constructor() {
       this.isAndroid = isAndroid;


    }
    ngOnInit(): void {
        let LS = require( "nativescript-localstorage" );
        
        console.log (LS.getItem('session'));

        this.usuario = LS.getItem('session');
     
    }

    
}