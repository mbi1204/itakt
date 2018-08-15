/*
autor: IMB
fecha: 02/08/2018
obs  : modelo de la tabla ctGrupo
*/

export class ctGrupo{
    constructor(public cCveCia: string,
                public iGrupoID:number,
                public cDescripcion:string,
                public cImagen:string,
                public lActivo:boolean,
                public dtCreado:Date,
                public dtModificado:Date,
                public cUsuario:string,
                public iColor:number,
    ){}
}