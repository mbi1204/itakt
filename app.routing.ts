import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { from } from "rxjs/internal/observable/from";
import { ItemsComponent } from "./item/items.component";
import { ItemDetailComponent } from "./item/item-detail.component";

import { LoginComponent} from "./login/login.component";
import { MesasComponent } from "./mesas/mesas.component";
import { HomeComponent } from "./home/home.component";
import { HomeComponent2 } from "./home2/home2.component";



const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component:LoginComponent},
    { path: "mesas", component:MesasComponent},
    { path: "home",  component:HomeComponent}, 
    { path: "home2",  component:HomeComponent2}, 
    { path: "items", component: ItemsComponent },
    { path: "item/:id", component: ItemDetailComponent },
  
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }