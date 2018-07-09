/*
autor: AndrosOHG
fecha: 27/06/2018
obs  : modelo de la tabla mesas 
*/
export class vtMesaHist{
    constructor(public cCveCia :string,
                public iSucursal:number,
                public iMesa :number,
                public iPartida:number,
                public dtFechaHist:Date,
                public iEstatusMesa:number,
                public cUsuario:string,
                public dtCreado:Date,
                public dtModificado:Date

            ){}
}