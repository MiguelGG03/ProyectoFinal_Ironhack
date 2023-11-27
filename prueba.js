import {mezclarArray} from './extras/mezclarArray.js'
import {emojiBanderas} from './emojiBanderas.js'

/*
* SELECTORES DEL DOM
*/

const empezarBtn = document.querySelector('.empezar-boton')
const plantilla = document.querySelector('#plantilla-casilla')
const tablero = document.querySelector('.tabla')

const fargmento = document.createDocumentFragment()

empezarBtn.addEventListener('click', empezarJuego)

function empezarJuego() {
    tablero.innerHTML = '';
    crearTablero()
}

function crearTablero() {
    const arrayCopia = [...emojiBanderas];
    const arrayMezclado = [];

    for (let i = 0; i < 8; i++) {
        const indiceAleatorio = Math.floor(Math.random() * arrayCopia.length);
        const elementoAleatorio = arrayCopia[indiceAleatorio];

        arrayMezclado.push(elementoAleatorio);
        arrayCopia.splice(indiceAleatorio, 1);
    }

    const arrayMezcladoConParjas = [...arrayMezclado, ...arrayMezclado];
    
    console.log(arrayMezcladoConParjas);

    emojiBanderas.forEach((emoji) => {
        const casilla = crearCasilla(emoji);
        fargmento.append(casilla);
    })
    tablero.append(fargmento);
}

function crearCasilla({id, emoticono}) {
    const casilla = plantilla.content.cloneNode(true);
    casilla.querySelector('.casilla').dataset.identity = id;
    casilla.querySelector('.casilla__vuelta').textContent = emoticono;
    return casilla;
}
