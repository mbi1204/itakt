import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import * as platform from  'platform';
import { AppComponent } from "./app.component";
import { ItemService } from "./item/item.service";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";
import { from } from "rxjs/internal/observable/from";
import { LoginComponent} from "./login/login.component";
import { MesasComponent } from "./mesas/mesas.component";
import { HomeComponent } from "./home/home.component";
import { HomeComponent2 } from "./home2/home2.component";
import { NOrdenComponent} from "./orden/nueva.component";
import { DetalleComponent} from "./ordenDet/vtOrdenDet.component";

@NgModule({
    bootstrap: [
        AppComponent  
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
    ],
    declarations: [
        AppComponent,         
        ItemsComponent,
        ItemDetailComponent,
        LoginComponent,
        HomeComponent,
        
        MesasComponent,
       
        NOrdenComponent,
        DetalleComponent
        
    ],
    providers: [
        ItemService,
        { provide: 'platform', useValue: platform },
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
