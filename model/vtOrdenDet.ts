/*
autor: AndrosOHG
fecha: 06/08/2018
obs  : modelo de la tabla  vtVtaSusp Detalle de la Orden
*/
export class vtOrdenDet{

 
    constructor( 
        public cCveCia:string,
        public iFolioSusp:number,
        public iPartida:number,
        public iComensal:number,
        public dtFecha:string,
        public iSucursal:number,
        public cUsuarioV:string,     //*
        public cTipoTrans:string,    //*
        public cEstado:string,       //*
        public cCodRazon:string,     //*
        public cCliente:string,
        public iArticulo:number,
        public cArticulo:number,
        public iSubProd:number,
        public cDescripcion:string,  
        public dePrecio:number,
        public deImpuesto:number,
        public deValorImp:number,
        public dePrecVta:number,
        public deDescuento:number,
        public dePorcDesc:number,
        public dePrecioUnit:number,
        public deCantidad:number,
        public deImporte:number,
        public cUDF1:string,
        public deUDF1:number,
        public cUDF2:string,                        
        public deUDF2:number,
        public cUDF3:string,
        public deUDF3:number,
        public lEsDev:boolean,
        public iFolVtaO:number,
        public iOServID:number,
        public dtCreado:string,
        public dtModificado:string,
        public cUsuario:string,
        public cObs:string,
        public cEntregarA:string,
        public lLlevar:boolean,
        public cCompartir:string,
        public iTermino:number,
        public dtFHora:string,
        public iImpresora:number,
        public lLibre:boolean,
        public vcMesa:string,
        public iCortesia:number,
        public iIDDiario:number,
        public cPartidaR:string,
        public cNombreR:string,
        public cRazonID:string,
        public cTipoDesc:string,
        public iCOrigen:number,
        public iCDestino:number,
        public iTCantidad:number,
        public lTraspaso:boolean,
        public iGrupo:number,
        public lCancelado:boolean,
        public deCantDesc:number,
        public deImpDesc:number,
        public deCantCan:number,
        public cUsuOrdena:string,
        public cNomOrdena:string,
        public cUsuCancela:string,
        public cNomCancela:string,
        public cUsuCortesia:string,
        public cNomCortesia:string,
        public cUsuCambPre:string,
        public cNomCambPre:string,
        public cUsuDesc:string,
        public cNomDesc:string,
        public dtTermina:string,
        public dtCortesia:string,
        public dtCancela:string,
        public dtCambioP:string,
        public dtDescuento:string,
        public lLibera:boolean)
        {}
        
        
    }
   