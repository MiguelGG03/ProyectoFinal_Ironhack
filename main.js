import {emojiBanders} from './emojiBanderas.js';
import {mezclarArray} from '-/extras/mezclarArray.js';

/*
SELECTORES DOM
*/

const empezarBoton = document.querySelector('.empezar-boton');
const plantilla = document.querySelector('#plantilla-casilla');
const fragmento = document.createDocumentFragment();
const tabla = document.querySelector('.tabla');
const elementoPuntuacion = document.querySelector('.puntuacion');