import { Component, OnInit } from "@angular/core";
import { LoginService } from "../service/login.service";
import {Router,ActivatedRoute,Params} from '@angular/router';
import {ctEmpleado} from "../model/ctEmpleado";
import { SESSION } from '../service/global';
import * as dialogs from "ui/dialogs";
import { TNSFancyAlert } from "nativescript-fancyalert";
import * as Toast from "nativescript-toast";


@Component({
  selector: "ns-login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {
  public usuario: string;
  public password: string;
  public _ctEmpleado :ctEmpleado;
  
  constructor(private _Service: LoginService, 
              private _route:ActivatedRoute,
  private _router:Router) {}

  ngOnInit(): void {
    console.log("login.component.ts");
  }

  login(): void {
      var resultado, error, mensaje,tt_ctEmpleado;

     

    console.log('login()->'  + 'Usuario:' + this.usuario + 'Password' + this.password ); 
    this._Service.PostLogin(this.usuario, this.password).subscribe(
      result => {
        console.log(result);
      
        resultado = result.body;        
        error     = resultado.response.oplError;
        mensaje   = resultado.response.opcMensage;
        

        if (error == 'true'){
          /*dialogs.alert(mensaje).then(()=> {
            console.log(mensaje);
          });*/

          TNSFancyAlert.showError("Error!", "" , mensaje);

        }else {
          tt_ctEmpleado = resultado.response.tt_ctEmpleado.tt_ctEmpleado[0];


          this._ctEmpleado = new ctEmpleado
          (   tt_ctEmpleado.cCveCia ,
              tt_ctEmpleado.iEmpleado,
              tt_ctEmpleado.cCveEmp ,
              tt_ctEmpleado.cPassword,
              tt_ctEmpleado.cNombre,
              tt_ctEmpleado.cDireccion,
              tt_ctEmpleado.cTelefono1,
              tt_ctEmpleado.cTelefono2,
              tt_ctEmpleado.iPuestoEmpID,
              tt_ctEmpleado.cEmail,
              tt_ctEmpleado.cApellidoP,
              tt_ctEmpleado.cApellidoM,
              tt_ctEmpleado.bImagen,
              tt_ctEmpleado.cFoto,
              tt_ctEmpleado.lActivo,
              tt_ctEmpleado.dtIngreso,
              tt_ctEmpleado.cUsuario,
              tt_ctEmpleado.dtCreado,
              tt_ctEmpleado.dtModificado

        );
        
      
        if ( this._ctEmpleado == null) {
          TNSFancyAlert.showError("Error!", ""  , "error en la carga de la session del empleado");

          /*dialogs.alert("error en la carga de la session del empleado").then(()=> {

            console.log(mensaje);
          });*/
        } else {        
            SESSION.g_ctEmpleado = this._ctEmpleado; 
           //Debe quedar direccionado a mesas       
           //this._router.navigate(["/mesas"]);
           Toast.makeText("Bienvenido").show();           
           this._router.navigate(["/mesas"]);
           
        } 
      }        
               
      },
      error => {
        console.log(error);

        TNSFancyAlert.showError("Error!", ""  ,   error.message +   "\n" +
                                                  error.error._errors[0]._errorMsg + "\n" +
                                                  "Numero de Error" + " " +  error.error._errors[0]._errorNum);        

        
      }
    );
  }
}


