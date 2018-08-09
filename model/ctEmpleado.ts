/*
autor: imendoza@sinergitec.com
fecha: 25/06/2018
obs  : modelo de la tabla empleado 
*/

export class ctEmpleado{
    constructor(public cCveCia :string,
                public iEmpleado:number,
                public cCveEmp :string,
                public cPassword:string,
                public cNombre:string,
                public cDireccion:string,
                public cTelefono1:string,
                public cTelefono2:string,
                public iPuestoEmpID:number,
                public cEmail:string,
                public cApellidoP:string,
                public cApellidoM:string,
                public bImagen:string,
                public cFoto:string,
                public lActivo:boolean,
                public dtIngreso:Date,
                public cUsuario:String,
                public dtCreado:Date,
                public dtModificado:Date

            ){}
}