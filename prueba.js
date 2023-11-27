import {mezclarArray} from './extras/mezclarArray.js'
import {emojiBanderas} from './emojiBanderas.js'

/*
* SELECTORES DEL DOM
*/

const empezarBtn = document.querySelector('.empezar-boton')
const plantilla = document.querySelector('#plantilla-casilla')
const tabla = document.querySelector('.tabla')

const fargmento = document.createDocumentFragment()

empezarBtn.addEventListener('click', empezarJuego)

function empezarJuego() {
    emojiBanderas.forEach((emoji) => {
        crearTabla(emoji.id, emoji.emoticono)
    })

    const casilla = crearCasilla(id, emoticono)

    fargmento.append(casilla);
    tabla.append(fargmento)
}

function crearCasilla(id, emoticono) {
    const casilla = plantilla.content.cloneNode(true);
    casilla.querySelector('.casilla').dataset.identity = id;
    casilla.querySelector('.casilla__vuelta').textContent = emoticono;
    return casilla;
}
