import { Component,OnInit, Inject } from "@angular/core";
import { isAndroid}         from 'platform';
import 'nativescript-localstorage';
import { inject } from "@angular/core/src/di/injector";
import { platformBrowser } from "@angular/platform-browser/src/browser";

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls:  ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  
    public usuario :any;
   constructor(
      

   ) {}

    ngOnInit(): void {
        let LS = require( "nativescript-localstorage" );
        
        console.log (LS.getItem('session'));

        this.usuario = LS.getItem('session');
     
    }

    
}


