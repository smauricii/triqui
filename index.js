//
const ESTADO = document.querySelector('.notificacion'),
  ESTADO_JUEGO = ["", "", "", "", "", "", "", "", ""],
  PROBABILIDAD_GANAR = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]],
  MENSAJE_REINICIAR ="para jugar de nuevo oprime reiniciar",
  MENSAJE_GANAR = () => `El jugador ${jActual} ha ganado, ${MENSAJE_REINICIAR}`.fontcolor("green"),
  EMPATE = () => `Empate, ${MENSAJE_REINICIAR}`.fontcolor("red"),
  TURNO = () => `Turno del jugador ${jActual.fontcolor("purple")}`.fontcolor("blue");
//
let juegoActivo= true,
    jActual = "O"
//
const main = function () {
  pantallaEstado(TURNO());
  listeners();
};

function listeners() {
  document.querySelector(".contenedor-total").addEventListener("click", clickCelda);
  document.querySelector(".reiniciar").addEventListener("click", reiniciarJuego);
}

function pantallaEstado(mensaje) {
  ESTADO.innerHTML = mensaje;
}

function reiniciarJuego() {
  juegoActivo = true;
  jActual = "X";
  estadoReinicio();
  pantallaEstado(TURNO());
  document.querySelectorAll(".arreglo-triqui").forEach((cell) => (cell.innerHTML = ""));
}

function clickCelda(clickedCeldaEvento ) {
  const celdaClick = clickedCeldaEvento.target;//detecta cada click
  if (celdaClick.classList.contains("arreglo-triqui")) {
    const indiceClick = Array.from(celdaClick.parentNode.children).indexOf(celdaClick);//detecta donde se ha dado click por medio de la clase HTML
    if (ESTADO_JUEGO[indiceClick] !== "" || !juegoActivo) {
      return false;
    }
    celdaJugada(celdaClick, indiceClick);
    validacionResultado();//valida los 3 estados del juego
  }
}

function celdaJugada(celdaClick, indiceClick) {
  ESTADO_JUEGO[indiceClick] = jActual; // Agrega en la posición correspondiente el valor ya sea "X" u "O" en el estado actual del juego
  celdaClick.innerHTML = jActual; // Agrega en el HTML el valor del jugador
}

function validacionResultado() {
  let rondaGanada = false;
  for (let i = 0; i < PROBABILIDAD_GANAR.length; i++) {
    // Itera cada uno de las posibles combinaciones ganadores
    const condicionGanar = PROBABILIDAD_GANAR[i]; // Guarda la combinación por ejemplo: [0, 1, 2]
    let posicion1 = ESTADO_JUEGO[condicionGanar[0]],
      posicion2 = ESTADO_JUEGO[condicionGanar[1]],
      posicion3 = ESTADO_JUEGO[condicionGanar[2]]; // Almacena el valor del estado actual del juego según las posiciones de winCondition

    if (posicion1 === "" || posicion2 === "" || posicion3 === "") {
      continue; // Si hay algún valor vacio nadie ha ganado aún
    }
    if (posicion1 === posicion2 && posicion2 === posicion3) {
      rondaGanada = true; // Si todas las posiciones coinciden entonces, dicho jugador ha ganado la partida
      break;
    }
  }
  if (rondaGanada) {//si la ronda ganada es true solo se muestra la ronda ganada con el jugador y termina el juego
    pantallaEstado(MENSAJE_GANAR());
    juegoActivo = false;
    return;
  }

  let rondaEmpate = !ESTADO_JUEGO.includes(""); // Si todas las celdas tienen valor y la sentencia anterior fue falsa entonces es empate
  if (rondaEmpate) {
    pantallaEstado(EMPATE());
    juegoActivo = false;
    return;
  }

  cambioJugdor();
}

function cambioJugdor() {
  jActual = jActual === "X" ? "O" : "X";
  pantallaEstado(TURNO());
}

function estadoReinicio() {
  let i = ESTADO_JUEGO.length;
  while (i--) {
    ESTADO_JUEGO[i] = "";
  }
}

main()