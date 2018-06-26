import { Component, OnInit } from "@angular/core";
import { LoginService } from "../service/login.service";
import {Router,ActivatedRoute,Params} from '@angular/router';
import 'nativescript-localstorage';

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
  constructor(private _Service: LoginService, 
              private _route:ActivatedRoute,
              private _router:Router) {}

  ngOnInit(): void {
    console.log("login.component.ts");
  }

  login(): void {
      var resultado, Error, Mensaje ;

      
    localStorage.clear();

    localStorage.setItem('session', 'Adriana diaz gonzalez');

  

    this._router.navigate(["/home"]);

    /*console.log('login()->'  + 'Usuario:' + this.usuario + 'Password' + this.password ); 
    this._Service.PostLogin(this.usuario, this.password).subscribe(
      result => {
        console.log(result);

        resultado = result.body;
        Error   = resultado.response.oplError;
        Mensaje = resultado.response.opcMensage;

        console.log("resultado" +  resultado);


        if (Error == "true"){
            alert(Mensaje);
        }else {
            this._router.navigate(["/home"]);
        }        
      },
      error => {
        console.log(error);
        alert(
          error.message +
            "\n" +
            error.error._errors[0]._errorMsg +
            "\n" +
            "Numero de Error" +
            " " +
            error.error._errors[0]._errorNum
        );
      }
    );*/
  }
}
