// Librería readline para interactuar con la consola
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para analizar una palabra y determinar su acentuación
function analizarPalabra(palabra) {
  const acentos = palabra.match(/[áéíóú]/g);
  const ultimaLetra = palabra[palabra.length - 1];
  const penultimaLetra = palabra[palabra.length - 2];

  if (acentos) {
    // Buscamos la posición del último acento
    const posicionAcento = palabra.lastIndexOf(acentos[acentos.length - 1]) + 1;
    // Dependiendo de la posición del acento y las letras finales, determinamos el tipo de acentuación
    if (posicionAcento === palabra.length && ultimaLetra.match(/[áéíóúns]/)) {
      return 'aguda.';
    } else if (posicionAcento === palabra.length - 1 && !penultimaLetra.match(/[aeiouáéíóúns]/)) {
      return 'llana o grave.';
    } else if (posicionAcento <= palabra.length - 2 && posicionAcento > palabra.length - 3) {
      return 'esdrújula.';
    } else if (posicionAcento <= palabra.length - 3) {
      return 'sobresdrújula.';
    }
  } else {
    return 'sin acento.';
  }
}

function solicitarPalabra() {
  readline.question('Ingresa una palabra para analizar (escribe EXIT para salir): ', (palabra) => {
    if (palabra.toUpperCase() === 'EXIT') {
      readline.close();
    } else {
      console.log(`La palabra "${palabra}" es ${analizarPalabra(palabra)}`);
      solicitarPalabra();
    }
  });
}

solicitarPalabra();
