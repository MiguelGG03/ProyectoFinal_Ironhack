import {emojiBanderas} from './emojiBanderas.js';
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

function iniciarJuego() {
    reiniciarJuego();
    crearTabla();
    intervaloTiempo = setInterval(actualizarTiempo , 1000);
    /*establece un temporizador para llamar a la función actualizarTiempo cada segundo. */
}

function reiniciarJuego() {
    tabla.innerHTML = '';
    /*Reinicia la tabla*/
    clearInterval(intervaloTiempo);
    /*Reinicia el temporizador*/
    tiempoTotal = 0;
    elementoTiempo.textContent = tiempoTotal;
    puntuacionContador = 0;
    elementoPuntuacion.textContent = puntuacionContador;
    /*Reinicia el contador de puntuación*/
    finalizarVisualizacion.classList.add('hide');
    /*Oculta el mensaje de finalización*/
}

function crearTabla() {
    const arrayRandom = crearArrayAleatorioDesdeOtro(emojiBanderas);
    const arrayAleatorioConDuplicados = [...arrayRandom, ...arrayRandom];
    /* ...arrayRandom es para descomponer los elementos del array */

    const arrayMezclado = mezclarArray(arrayAleatorioConDuplicados);
    /*Mezcla el array*/

    arrayMezclado.forEach((emoji) => {
        const casilla = crearCasilla(emoji);
        fragmento.append(casilla);
    });

    tabla.append(fragmento);
}

function crearArrayAleatorioDesdeOtro(arrayACopiar, longitudMaxima = 8) {
    const arrayClonado = [...arrayACopiar];
    const arrayAleatorio = [];

    for (let i = 0; i < longitudMaxima; i++) {
        const indiceAleatorio = Math.floor(Math.random() * arrayClonado.length);
        const elementoAleatorio = arrayClonado[indiceAleatorio];

        arrayAleatorio.push(elementoAleatorio);
        arrayClonado.splice(indiceAleatorio, 1);
    }
    return arrayAleatorio;
}

function crearCasilla({id , emoji}) {
    const casilla = plantilla.content.cloneNode(true);
    casilla.querySelector('.casilla').dataset.identity = id;
    casilla.querySelector('.casilla__vuelta').textContent = emoji;
    return casilla;
}

function girarCasilla(evento) {
    const casilla = evento.target.closest('.casilla');
    if (casilla && casillasGiradas.length < 2 && !card.classList.contains('girada')){
        casilla.classList.add('girada');
        casillasGiradas.push(casilla);

        if (casillasGiradas.length === 2) {
            revisarCoincidencia();
            finalizarSiNoCoincide();
        }
    }
}

function finalizarSiNoCoincide() {
    const numeroDeMatches = board.querySelectorAll('.match').length;
}

function revisarCoincidencia() {
    null;
}


function match() {
    null;
}



function actualizarContadorPuntuacion(puntuacion){
    elementoPuntuacion.textContent = puntuacionContador+=puntuacion;
}

function actualizarTiempo(){
    tiempoTotal++;
    elementoTiempo.textContent = tiempoTotal;
}