/*
autor: AndrosOHG
fecha: 16/08/2018
obs  : modelo de la tabla  de modificadores de la Orden
*/
export class vtOrdenMod{

 
    constructor( 
        public cCveCia:string,
        public iFolioSusp:number,
        public iPartidaArt:number,
        public iPartida:number,
        public cModSubC:string,
        public iComensal:number,
        public cArticulo:string,
        public iModArt:number,
        public cModArt:string,
        public iCantMod:number,
        public lSubProducto:boolean,
        public cUsuario:string,
        public dtCreado:string,
        public dtModificado:string)
        {}
        
        
    }
   