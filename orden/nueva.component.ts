import { Component, OnInit, Inject } from "@angular/core";
import "nativescript-localstorage";
import { vtOrden } from "../model/vtOrden";
import { SESSION } from "../service/global";
import {vtOrdenService}  from '../service/vtOrden.service';
import { ctEmpleado } from "../model/ctEmpleado";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { TNSFancyAlert } from "nativescript-fancyalert";
import * as Toast from "nativescript-toast";

@Component({
  selector: "nueva-orden",
  moduleId: module.id,
  templateUrl: "./nueva.component.html",
  providers: [vtOrdenService ]
})
export class NOrdenComponent implements OnInit {
  public iComensales: number = 1;
  public _cCveCia: string;
  public _cCveEmp: string;
  public _vtOrden: vtOrden;
  public _vtOrdenN :vtOrden;
  public _iMesa: string;
  

  constructor(
    private _vtOrdenService: vtOrdenService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._cCveCia = SESSION.g_cCveCIA;
    this._cCveEmp = SESSION.g_ctEmpleado.cCveEmp;
    this._iMesa =   SESSION.g_iMesa; //Id de la Mesa
  }

  creaOrden() {

    var resultado, error, mensaje, tt_nuevos;

   
   
        //crea objeto de la orden

        this._vtOrden = new vtOrden(
          this._cCveCia /*c cCveCia*/,
          0 /*iFolioSusp :number*/,
          null /*dtFecha :string*/,
          1 /* iSucursal :number*/,
          this._cCveEmp /* cCveUsuario :string*/,
          "VENTA" /* cTipoTrans :string*/,
          "PENDIENTE" /*cEstado :string*/,
          0.0 /*deSubtotal :number*/,
          0.0 /* deImpuesto :number*/,
          0.0 /* deDescuento :number*/,
          0.0 /*deImporte :number*/,
          0.0 /*deTotArticulos :number*/,
          "01" /*cCliente :string*/,
          false /* lCredito :boolean*/,
          1 /*iMonID :number*/,
          1 /*deTipoCambio :number*/,
          null /* dtFHora :string*/,
          true /* lFacturar :boolean*/,
          1 /* iAlmacen :number*/,
          null /* dtCreado :string*/,
          null /*dtModificado: string*/,
          this._cCveEmp /*cUSuario :string*/,
          0 /* iFolRef :number*/,
          "" /* cObs:    string*/,
          1 /* iNivelP :number*/,
          true /* lVtaDirecta :boolean*/,
          "" /* cEntregarA :string*/,
          0 /* iLocalID :number*/,
          "" /* cTienda :string*/,
          false /* lLlevar: boolean*/,
          this._iMesa /* cMesa:string*/,
          this.iComensales /* iComensales :number*/,
          0 /* iCortesia :number*/,
          0 /* iIDDiario :number*/,
          "" /* cPartidaR :string*/,
          "" /* cNombreR :string*/,
          "" /* cRazonID :string*/,
          "" /* cUsuAbre :string*/,
          "" /* cNomAbre :string*/,
          null /* dtTerminal :string*/
        );
        
        this._vtOrdenService.PostCrearOrden("SISIMB", this._vtOrden).subscribe(
          result => {
            resultado = result.body;
            error = resultado.response.oplError;
            mensaje = resultado.response.opcMensage;

            console.log(resultado);

            if (error == "true") {
             /* dialogs.alert(mensaje).then(() => {
                console.log(mensaje);
              });*/
              TNSFancyAlert.showError("Error!", "" , mensaje);

            } else {
              ///todo bien 
              //crear el objeto de la nueva orden
                           
              tt_nuevos = resultado.response.ds_Nuevos.ds_Nuevos.tt_Nuevos[0];
              
              this._vtOrdenN = new vtOrden(
                 tt_nuevos.cCveCia         /*cCveCia*/,
                 tt_nuevos.iFolioSusp      /*iFolioSusp :number*/,
                 tt_nuevos.dtFecha         /*dtFecha :string*/,
                 tt_nuevos.iSucursal       /* iSucursal :number*/,
                 tt_nuevos.cCveUsuario     /* cCveUsuario :string*/,
                 tt_nuevos.cTipoTrans      /* cTipoTrans :string*/,
                 tt_nuevos.cEstado         /*cEstado :string*/,
                 tt_nuevos.deSubtotal      /*deSubtotal :number*/,
                 tt_nuevos.deImpuesto      /* deImpuesto :number*/,
                 tt_nuevos.deDescuento     /* deDescuento :number*/,
                 tt_nuevos.deImporte       /*deImporte :number*/,
                 tt_nuevos.deTotArticulos  /*deTotArticulos :number*/,
                 tt_nuevos.cCliente        /*cCliente :string*/,
                 tt_nuevos.lCredito        /* lCredito :boolean*/,
                 tt_nuevos.iMonID          /*iMonID :number*/,
                 tt_nuevos.deTipoCambio    /*deTipoCambio :number*/,
                 tt_nuevos.dtFHora         /*dtFHora :string*/,
                 tt_nuevos.lFacturar       /*lFacturar :boolean*/,
                 tt_nuevos.iAlmacen        /*iAlmacen :number*/,
                 tt_nuevos.dtCreado        /*dtCreado :string*/,
                 tt_nuevos.dtModificado    /*dtModificado: string*/,
                 tt_nuevos.cUSuario        /*cUSuario :string*/,
                 tt_nuevos.iFolRef         /*iFolRef :number*/,
                 tt_nuevos.cObs            /*cObs:    string*/,
                 tt_nuevos.iNivelP         /*iNivelP :number*/,
                 tt_nuevos.lVtaDirecta     /*lVtaDirecta :boolean*/,
                 tt_nuevos.cEntregarA      /*cEntregarA :string*/,
                 tt_nuevos.iLocalID        /*iLocalID :number*/,
                 tt_nuevos.cTienda         /*cTienda :string*/,
                 tt_nuevos.lLlevar         /*lLlevar: boolean*/,
                 tt_nuevos.cMesa           /*cMesa:string*/,
                 tt_nuevos.iComensales     /*iComensales :number*/,
                 tt_nuevos.iCortesia       /*iCortesia :number*/,
                 tt_nuevos.iIDDiario       /*iIDDiario :number*/,
                 tt_nuevos.cPartidaR       /*cPartidaR :string*/,
                 tt_nuevos.cNombreR        /*cNombreR :string*/,
                 tt_nuevos.cRazonID        /*cRazonID :string*/,
                 tt_nuevos.cUsuAbre        /*cUsuAbre :string*/,
                 tt_nuevos.cNomAbre        /*cNomAbre :string*/,
                 tt_nuevos.dtTerminal      /*dtTerminal :string*/
              );
              
              console.log (this._vtOrdenN.iFolioSusp);

              SESSION.g_vtOden = this._vtOrdenN;

              Toast.makeText("Orden creada" + " " +  this._vtOrdenN.iFolioSusp + "/" + this._vtOrdenN.iIDDiario  ).show() ;

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
        );   
  } // creaOrden() 

}
