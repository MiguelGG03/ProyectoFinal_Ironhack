import {emojiBanderas} from './emojiBanderas.js';
import {mezclarArray} from './extras/mezclarArray.js';

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
    tiempoTotal = setInterval(actualizarTiempo , 1000);
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
        // Genera un índice aleatorio dentro del rango actual de arrayClonado.
        const indiceAleatorio = Math.floor(Math.random() * arrayClonado.length);
        // Obtiene el elemento correspondiente al índice aleatorio.
        const elementoAleatorio = arrayClonado[indiceAleatorio];
        // Agrega el elemento aleatorio a arrayAleatorio.
        arrayAleatorio.push(elementoAleatorio);
        // Elimina el elemento seleccionado del arrayClonado.
        arrayClonado.splice(indiceAleatorio, 1);
    }
    /* Este bucle realiza una operación de muestreo aleatorio sin reemplazo.
    Recorre un bucle desde 0 hasta longitudMaxima (exclusivo).
    En cada iteración, elige aleatoriamente un índice dentro del rango actual de arrayClonado.
    Luego, extrae el elemento correspondiente a ese índice y lo agrega a arrayAleatorio.
    Además, elimina el elemento seleccionado del arrayClonado para evitar duplicados.*/
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
            finalizarSiNoMasMatches();
        }
    }
}

function finalizarSiNoMasMatches() {
    /*verifica si hay exactamente 16 elementos en el documento con la clase "match".
    Si es así, realiza algunas acciones, como mostrar un elemento con el ID 
    "finalizarVisualizacion" y detener un temporizador.*/
    const numeroDeMatches = board.querySelectorAll('.match').length;
    if (numeroDeMatches === 16) {
        finalizarVisualizacion.classList.remove('hide');
        clearInterval(tiempoTotal);
    }
}

function revisarCoincidencia() {
// Extrae las identidades de las dos casillas giradas del array casillasGiradas
const [primeraCasilla, segundaCasilla] = casillasGiradas.map(
    (casilla) => casilla.dataset.identity
);

// Compara las identidades de las dos casillas giradas
if (primeraCasilla === segundaCasilla) {
    // Si las identidades son iguales, las marca como 'match'
    casillasGiradas.forEach((casilla) => {
        casilla.classList.add('match');
    });
    // Limpia el array casillasGiradas
    casillasGiradas.length = 0;
    // Incrementa la puntuación en 1
    actualizarContadorPuntuacion(1);
} else {
    // Si las identidades no son iguales, se ejecuta después de 1000ms (1 segundo)
    setTimeout(() => {
        // Voltea las casillas nuevamente (elimina la clase 'girada')
        casillasGiradas.forEach((casilla) => {
            casilla.classList.remove('girada');
        });
        // Limpia el array casillasGiradas
        casillasGiradas.length = 0;
    }, 1000);
    // Decrementa la puntuación en 1
    actualizarContadorPuntuacion(-1);
}
}

function actualizarContadorPuntuacion(puntuacion){
    elementoPuntuacion.textContent = puntuacionContador+=puntuacion;
}


function actualizarTiempo(){
    tiempoTotal++;
    elementoTiempo.textContent = tiempoTotal;
}