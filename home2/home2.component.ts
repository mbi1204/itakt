import { Component,OnInit, Inject } from "@angular/core";
import { isAndroid}         from 'platform';
import 'nativescript-localstorage';
import { inject } from "@angular/core/src/di/injector";
import { platformBrowser } from "@angular/platform-browser/src/browser";

@Component({
    selector: "ns-home2",
    moduleId: module.id,
    templateUrl: "./home2.component.html",
    styleUrls:  ["./home2.component.css"]
})
export class HomeComponent2 implements OnInit {
  
    public usuario :any;
   constructor(
      

   ) {}

    ngOnInit(): void {
        let LS = require( "nativescript-localstorage" );
        
        console.log (LS.getItem('session'));

        this.usuario = LS.getItem('session');
     
    }

    
}

