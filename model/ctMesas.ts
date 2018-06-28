/*
autor: AndrosOHG
fecha: 27/06/2018
obs  : modelo de la tabla mesas 
*/
export class ctMesas{
    constructor(public cCveCia :string,
                public iSucursal:number,
                public iMesa :number,
                public cMesa:string,
                public cObs:string,
                public lActiva:boolean,
                public deColumn:number,
                public deRow:number,
                public deWidth:number,
                public deHeight:number,
                public deX:number,
                public deY:number,
                public iArea:number,
                public iComensales:number,
                public cUsuario:string,
                public dtCreado:Date,
                public dtModificado:Date

            ){}
}