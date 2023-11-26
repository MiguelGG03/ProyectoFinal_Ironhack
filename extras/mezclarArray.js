// El export me ha dicho como se usa el ChatBox de Ironhack

export function mezclarArray(array) {
    for(let i = array.length - 1; i > 0 ; i--) {
        const indiceAleatorio = Math.floor(Math.random() * (i + 1));
        const elementoAleatorio = array[indiceAleatorio];
        array[indiceAleatorio] = array[i];
        array[i] = elementoAleatorio
    }
    
}