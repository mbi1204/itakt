/*
autor: imendoza@sinergitec.com
fecha: 07/08/2018
obs  : modelo de la tabla articulo
*/

export class ctArticulo{
    constructor(public cCveCia :string,
                public iArticulo:number,
                public cArticulo :string,
                public cDescripcion:string,
                public cDescripcionVta:string,
                public cCveAlterna:string,
                public cCveFabricante:string,
                public deMin:number,
                public deMax:number,
                public deCostoUltimo:number,
                public deCostoPromedio:number,
                public cCB:string,
                public cContenido:string,
                public cPais:string,
                public lActivo:boolean,
                public iLinea:number,
                public iMarcaID:number,
                public iEstatusID:number,
                public iClasificaID:number,
                public iUnidadC:number,
                public iUnidadV:number,
                public iGrupoID:number,
                public dtCreado:Date,
                public dtModificado:Date,
                public cUsuario:string,
                public cMarca:string,
                public cGrupo:string,
                public cUDF1:string,
                public cUDF2:string,
                public deUDF1:number,
                public deUDF2:number,
                public lInventariable:boolean,
                public cTipoCod:string,
                public deUCostoPEPS:number,
                public deCostoNeto:number,
                public cTiempoA:string,
                public cTiempoB:string,
                public cTiempoC:string,
                public cTiempoD:string


            ){}
}