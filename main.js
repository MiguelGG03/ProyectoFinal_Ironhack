import {emojiBanders} from './emojiBanderas.js';
import {mezclarArray} from '-/extras/mezclarArray.js';

/*
SELECTORES DOM
*/

const empezarBoton = document.querySelector('.empezar-boton');
const plantilla = document.querySelector('#plantilla-casilla');
const fragmento = document.createDocumentFragment();
const tabla = document.querySelector('.tabla');
const elementoPuntuacion = document.querySelector('.elemento__tabla-puntuacion');
const elementoTiempo = document.querySelector('.elemento__tabla-tiempo');
const finalizarVisualizacion = document.querySelector('.finalizar-visualizacion');

const casillasGiradas = [];
let puntuacionContador = 0;
let tiempoTotal = 0;
let intervaloTiempo = null;

empezarBoton.addEventListener('click', /*Aqui va la funcion para empezar*/);
tabla.addEventListener('click', /*Aqui va la funcion para girar las casillas*/);