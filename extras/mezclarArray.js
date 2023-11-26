// El export me ha dicho como se usa el ChatBox de Ironhack

export function mezclarArray(array) {
    for(let i = array.length - 1; i > 0 ; i--) {
        const indiceAleatorio = Math.floor(Math.random() * (i + 1));
        // Math.floor redondea hacia abajo para tener un número entero
        // Math.random() * (i + 1) me da un número entre 0 y i
        const elementoAleatorio = array[indiceAleatorio];
        array[indiceAleatorio] = array[i];
        array[i] = elementoAleatorio
        // elemento aleatorio es el elemento que está en la posición aleatoria
        // array[i] es el elemento que está en la posición i
    }

    return array;
}