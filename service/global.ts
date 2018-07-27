/*
autor: imendoza@sinergitec.com
fecha: 25/06/2018
obs  : variables globales para servicio
*/

var today = new Date();
var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

/*URL de conexion servicio rest*/
export const GLOBAL = {
    URL: 'http://192.168.2.204:8810/itakt/rest/itaktService/',
    
};

/*variables de la session*/
export const SESSION = {
    g_cCveCIA     : 'MFELIZ',
    g_ctEmpleado  : null,    
    g_vtOden      : null,
    g_cMesa       : null,
    g_iMesa       : null,    
    

};

/*fecha today */
export const FECHA= {
  g_hoy : today.getDate() + '-' +  meses  [today.getMonth()] + '-' +today.getFullYear(),
};

