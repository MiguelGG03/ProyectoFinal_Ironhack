import {mezclarArray} from './extras/mezclarArray.js'
import {emojisJuego} from './emojisJuego.js'

/*
* SELECTORES DEL DOM
*/

const empezarBtn = document.querySelector('.empezar-boton');
const plantilla = document.querySelector('#plantilla-casilla');
const tablero = document.querySelector('.tabla');
const elementoPuntuacion = document.querySelector('.puntuacion-elemento__tabla-puntuacion');
const elementoTiempo = document.querySelector('.tiempo-elemento__tabla-puntuacion');
const finalizarVisualizacion = document.querySelector('.finalizar-visualizacion');

const casillasGiradas = [];
let puntuacion = 0;
let tiempoTotal = 0;
let tiempoIntervalo = null;

const fargmento = document.createDocumentFragment();

empezarBtn.addEventListener('click', empezarJuego);
tablero.addEventListener('click', girarCasilla);

function empezarJuego() {
    reiniciarPartida();
    crearTablero();
    tiempoIntervalo = setInterval(actualizarTiempo, 1000);
}

function reiniciarPartida() {
    tablero.innerHTML = '';
    clearInterval(tiempoIntervalo);
    tiempoTotal = 0;
    elementoTiempo.textContent = tiempoTotal;
    puntuacion = 0;
    elementoPuntuacion.textContent = puntuacion;
    finalizarVisualizacion.classList.add('ocultar');
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
    if (casilla && casillasGiradas.length < 2 && !casilla.classList.contains('girada')) {
        casilla.classList.add('girada');
        casillasGiradas.push(casilla);
        if (casillasGiradas.length === 2) {
            revisarMatch();
            acabarSiNoMasMatches();
        }
    }
}

function acabarSiNoMasMatches() {
    const numeroDeParejas = tablero.querySelectorAll('.match').length;
    if (numeroDeParejas === 16) {
        finalizarVisualizacion.classList.remove('ocultar');
    }
}


function revisarMatch() {
    const [casilla1, casilla2] = casillasGiradas.map((casilla) => casilla.dataset.identity);
    if (casilla1 === casilla2) {
        casillasGiradas.forEach((casilla) => {
            casilla.classList.add('match');
        });
        (casillasGiradas.length = 0);
        puntuacion = puntuacion + 3;
        elementoPuntuacion.textContent = puntuacion;
    }
    else {
        setTimeout(() => {
            casillasGiradas.forEach((casilla) => {
                casilla.classList.remove('girada');
            });
            (casillasGiradas.length = 0);
        }, 1000);
        puntuacion = puntuacion - 1;
        elementoPuntuacion.textContent = puntuacion;
    }
}

function actualizarTiempo() {
    tiempoTotal = tiempoTotal + 1;
    elementoTiempo.textContent = tiempoTotal;
}
