import { Component, OnInit } from "@angular/core";
import 'nativescript-localstorage';

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:  ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    public usuario :any;
    constructor() { }

    ngOnInit(): void {
        let LS = require( "nativescript-localstorage" );
        
        console.log (LS.getItem('session'));

        this.usuario = LS.getItem('session');
     
    }
}