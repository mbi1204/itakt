/*
autor: IMB
fecha: 28/06/2018
obs  : modelo de la tabla  vtVtaSusp Encabezado de la Orden
*/
export class vtOrden{
    
    
 
    constructor( 
        public cCveCia:string,
        public iFolioSusp:number,
        public dtFecha:string,
        public iSucursal:number,
        public cCveUsuario:string,
        public cTipoTrans:string,
        public cEstado:string,
        public deSubtotal:number,
        public deImpuesto:number,
        public deDescuento:number,
        public deImporte:number,
        public deTotArticulos:number,
        public cCliente:string,
        public lCredito:boolean,
        public iMonID:number,
        public deTipoCambio:number,
        public dtFHora:string,
        public lFacturar:boolean,
        public iAlmacen:number,
        public dtCreado:string,
        public dtModificado:string,
        public cUSuario:string,
        public iFolRef:number,
        public cObs:string,
        public iNivelP:number, 
        public lVtaDirecta:boolean,
        public cEntregarA:string,
        public iLocalID:number, 
        public cTienda:string,
        public lLlevar:boolean,
        public cMesa:string,
        public iComensales:number, 
        public iCortesia:number, 
        public iIDDiario:number, 
        public cPartidaR:string,
        public cNombreR:string,
        public cRazonID:string,
        public cUsuAbre:string,
        public cNomAbre:string,
        public dtTerminal:string)
        {}

      
}