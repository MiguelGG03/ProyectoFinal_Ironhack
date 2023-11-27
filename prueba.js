import {mezclarArray} from './extras/mezclarArray.js'
import {emojiBanderas} from './emojiBanderas.js'

/*
* SELECTORES DEL DOM
*/

const empezarBtn = document.querySelector('.empezar-boton')
empezarBtn.addEventListener('click', empezarJuego)

function empezarJuego() {
    console.log('Empezar');
}