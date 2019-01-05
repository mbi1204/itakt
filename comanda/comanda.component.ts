import { Component,OnInit,  } from "@angular/core";
import { ctGrupo } from "../model/ctGrupo";
import { ctArticulo } from '../model/ctArticulo';
import { ctGrupoService} from "../service/ctGrupo.service";
import {ctArticuloService} from "../service/ctArticulo.service";

@Component({
    selector: "ns-comanda",
    moduleId: module.id,
    templateUrl: "./comanda.component.html",
    styleUrls:  ["./comanda.component.css"],  
    providers: [ctGrupoService, ctArticuloService]
})
export class ComandaComponent implements OnInit { 

    public _ctGrupo:ctGrupo;
    public _ctGrupos:Array<ctGrupo> = [];
    public _ctArticulo:ctArticulo;
    public _ctArticulos:Array<ctArticulo> =[];
    private _ctGrupoService: ctGrupoService;

    constructor(){

    }

    ngOnInit(): void {
        console.log ("ComandaComponent");

        //carga Menu -- tabla ctGrupo
        this.CargaMenu();

        //carga Articulos -- tabla ctArticulos
        this.CargaArticulo();
    }


    //Menu
    public CargaMenu(){

        var respuesta: any;
        var lista: any  ;
        var Error: any;
        var Mensaje: any;
               

        this._ctGrupoService.get("MFELIZ").subscribe(
            (result) => {  
                console.log("cargaMenu: ->" + respuesta);

                respuesta = result.body;
               
                Error   = respuesta.response.oplError;
                Mensaje = respuesta.response.opcMensage;
    
                if (Error == 'true'){
                    alert(Mensaje);
                }else {
                    lista = respuesta.response.tt_ctGrupo.tt_ctGrupo;
                    
                    lista.forEach(item=>{ 
                        this._ctGrupo = new ctGrupo(
                        item.cCveCia,
                        item.iGrupoID,
                        item.cDescripcion,
                        item.cImagen,
                        item.lActivo,
                        item.dtCreado,
                        item.dtModificado,
                        item.cUsuario,
                        item.iColor  ); 
                    });

                   //this._ctGrupos = null;
                   this._ctGrupos.push(this._ctGrupo);
               }

            }, (error)=>{
                console.log("error" + error);
                alert(error);                
            }
        );
    } //CargaMenu

    public CargaArticulo(){
        var respuesta: any;
        var lista: any  ;
        var Error: any;
        var Mensaje1: any;

        this._ctGrupoService.get("MFELIZ").subscribe(
            (result) => {  
                console.log("cargaMenu: ->" + respuesta);

                respuesta = result.body;
               
                Error   = respuesta.response.oplError;
                Mensaje1 = respuesta.response.opcMensage;
    
                if (Error == 'true'){
                    alert(Mensaje1);
                }else {
                    lista = respuesta.response.tt_ctArticulo.tt_ctArticulo;
                    
                    lista.forEach(item=>{
                        this._ctArticulo = new ctArticulo(
                            item.cCveCia,
                            item.iArticulo,
                            item.cArticulo,
                            item.cDescripcion,
                            item.cDescripcionVta,
                            item.cCveAlterna,
                            item.cCveFabricante,
                            item.deMin,
                            item.deMax,
                            item.deCostoUltimo,
                            item.deCostoPromedio,
                            item.cCB,
                            item.cContenido,
                            item.cPais,
                            item.lActivo,
                            item.iLinea,
                            item.iMarcaID,
                            item.iEstatusID,
                            item.iClasificaID,
                            item.iUnidadC,
                            item.iUnidadV,
                            item.iGrupoID,
                            item.dtCreado,
                            item.dtModificado,
                            item.cUsuario,
                            item.cMarca,
                            item.cGrupo,
                            item.cUDF1,
                            item.cUDF2,
                            item.deUDF1,
                            item.deUDF2,
                            item.lInventariable,
                            item.cTipoCod,
                            item.deUCostoPEPS,
                            item.deCostoNeto,
                            item.cTiempoA,
                            item.cTiempoB,
                            item.cTiempoC,
                            item.cTiempoD,
                        );
                     });
                }           
            }, (error)=>{
                console.log("error" + error);
                alert(error);                

            });
    }
}