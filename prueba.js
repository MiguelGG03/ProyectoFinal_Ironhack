import {mezclarArray} from './extras/mezclarArray.js'
import {emojisJuego} from './emojisJuego.js'

/*
* SELECTORES DEL DOM
*/

const empezarBtn = document.querySelector('.empezar-boton');
const plantilla = document.querySelector('#plantilla-casilla');
const tablero = document.querySelector('.tabla');

const casillasGiradas = [];

const fargmento = document.createDocumentFragment();

empezarBtn.addEventListener('click', empezarJuego);
tablero.addEventListener('click', girarCasilla);

function empezarJuego() {
    tablero.innerHTML = '';
    crearTablero()
}

function crearTablero() {
    const arrayAleatorio = crearArrayRandomDesdeOtro(emojisJuego)
    const arrayAleatorioConMatches = [...arrayAleatorio, ...arrayAleatorio];

    const arrayMezclado = mezclarArray(arrayAleatorioConMatches);


    arrayMezclado.forEach((emoji) => {
        const casilla = crearCasilla(emoji);
        fargmento.append(casilla);
    })
    tablero.append(fargmento);
}

function crearArrayRandomDesdeOtro(arrayCopiar , numeroDeElementos = 8) {
    const arrayCopia = [...arrayCopiar];
    const arrayMezclado = [];

    for (let i = 0; i < numeroDeElementos; i++) {
        const indiceAleatorio = Math.floor(Math.random() * arrayCopia.length);
        const elementoAleatorio = arrayCopia[indiceAleatorio];

        arrayMezclado.push(elementoAleatorio);
        arrayCopia.splice(indiceAleatorio, 1);
    }

    return arrayMezclado;
}

function crearCasilla({id, emoticono}) {
    const casilla = plantilla.content.cloneNode(true);
    casilla.querySelector('.casilla').dataset.identity = id;
    casilla.querySelector('.casilla__vuelta').textContent = emoticono;
    return casilla;
}

function girarCasilla(evento) {
    const casilla = evento.target.closest('.casilla');
    if (casilla && casillasGiradas.length < 2) {
        casilla.classList.add('girada');
        casillasGiradas.push(casilla);
        if (casillasGiradas.length === 2) {
            if (casillasGiradas[0].dataset.identity === casillasGiradas[1].dataset.identity) {
                casillasGiradas.forEach((casilla) => {
                    casilla.classList.add('match');
                });
            (casillasGiradas.length = 0);
            }
            else{
                setTimeout(() => {
                    casillasGiradas.forEach((casilla) => {
                        casilla.classList.remove('girada');
                    });
                    (casillasGiradas.length = 0);
                } ,1000);
            }
        }
        
    }
}