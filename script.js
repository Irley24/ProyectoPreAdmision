import { preguntasCine, preguntasGeografia } from "./preguntas.js";

let radioOne = document.getElementById("option-one");
let radioTwo = document.getElementById("option-two");
let radioThree = document.getElementById("option-three");
let respuesta = "";
let enviar = document.getElementById("enviar");
let categoria = "";
let puntos = 0;
let preguntaActual;
let ultima = false;
let player = "";
let puntaje = document.getElementById("puntaje-actual");
let correcto = document.getElementById("correcto");

//Para marcar solo una opcion de respuesta
radioOne.addEventListener("change", (e) => {
  radioTwo.checked = false;
  radioThree.checked = false;
  respuesta = e.target.value;
});

radioTwo.addEventListener("change", (e) => {
  radioOne.checked = false;
  radioThree.checked = false;
  respuesta = e.target.value;
});

radioThree.addEventListener("change", (e) => {
  radioTwo.checked = false;
  radioOne.checked = false;
  respuesta = e.target.value;
});
// limpiar radiobutton para siguiente pregunta
function limpiar() {
  radioTwo.checked = false;
  radioOne.checked = false;
  radioThree.checked = false;
}
//evento del boton enviar para verificar respuesta elegida y verificar si hay radiobutton chequeado
enviar.addEventListener("click", () => {
  if (!radioOne.checked && !radioTwo.checked && !radioThree.checked) {
    alert("¡Debes seleccionar un opcion valida!");
  } else {
    verificarRespuesta();
    limpiar();
  }
});

document.getElementById("comenzar").addEventListener("click", () => comenzar());

//verifica que haya un nombre escrito y si es asi, comienza el juego, al iniciar esconde los demas elementos de la pagina
function comenzar() {
  let nombre = document.getElementById("nombre").value;
  if (!nombre) {
    alert("Debes colocar tu nombre!!");
  } else {
    player = nombre;
    document.getElementById("jugador").innerHTML = "Bienvenida, " + nombre;
    document.getElementById("inicio").style.display = "none";
    document.getElementById("game").style.display = "flex";
  }
}

document
  .getElementById("volver")
  .addEventListener("click", () => volverAJugar());
//recargar pagina para volver a jugar
function volverAJugar() {
  window.location.reload();
}

function buscaryActualizarPorId(id, arr) {
  arr.forEach((elem) => {
    if (elem.id == id) {
      elem.resuelto = true;
      return;
    }
  });
}

//verificar respuesta en base a la posicion en el arreglo y comparar si la posicion actual es la ultima
function verificarRespuesta() {
  let gameOver = false;
  let correcta = respuesta == preguntaActual.opcionCorrecta;
  correcto.innerHTML = correcta
    ? "¡RESPUESTA CORRECTA!"
    : "¡RESPUESTA INCORRECTA!";
  if (correcta) {
    puntos += preguntaActual.puntos;
  }
  buscaryActualizarPorId(
    preguntaActual.id,
    categoria == "cine" ? preguntasCine : preguntasGeografia
  );

  if (!ultima) {
    setTimeout(() => {
      correcto.innerHTML = "";
      cargarNuevaPregunta();
    }, 1000);
  } else {
    document.getElementById("trivia").style.display = "none";
    document.getElementById("resultado").style.display = "block";
    gameOver = true;
  }
  mostrarPuntaje(gameOver);
}

function mostrarPuntaje(gameOver = false) {
  document.getElementById("puntaje-actual").innerHTML =
    (gameOver ? "Ganaste " : "Tienes: ") + puntos + " Puntos";
}

//mostrar la pantalla principal
function cargaInicial() {
  document.getElementById("game").style.display = "none";
  document.getElementById("trivia").style.display = "none";
  document.getElementById("resultado").style.display = "none";
}

function cargarNuevaPregunta() {
  let preguntasSinResolver =
    categoria == "cine"
      ? preguntasCine.filter((pregunta) => !pregunta.resuelto)
      : preguntasGeografia.filter((pregunta) => !pregunta.resuelto);
  if (preguntasSinResolver.length == 1) {
    ultima = true;
  }
  let ramdomPosition = Math.floor(Math.random() * preguntasSinResolver.length);
  let nuevaPregunta = preguntasSinResolver[ramdomPosition];
  preguntaActual = nuevaPregunta;
  document.getElementById("pregunta").innerHTML = nuevaPregunta.pregunta;
  document.getElementById("option-one").value = nuevaPregunta.opcion1;
  document.getElementById("label-option-one").innerHTML = nuevaPregunta.opcion1;
  document.getElementById("option-two").value = nuevaPregunta.opcion2;
  document.getElementById("label-option-two").innerHTML = nuevaPregunta.opcion2;
  document.getElementById("option-three").value = nuevaPregunta.opcion3;
  document.getElementById("label-option-three").innerHTML =
    nuevaPregunta.opcion3;
}

// seleccionar la categoria por medio de un evento en el radiobutton, concatenar la categoria actual y llamar la carga del arreglo de la categoria elegida.
//al estar en la categoria elegida se esconden las demas pantallas
const seleccionarCategoria = (e) => {
  categoria = e.target.value;
  document.getElementById("contenedor-categorias").style.display = "none";
  document.getElementById("categoria-actual").innerHTML =
    "Categoria: " + categoria.toUpperCase();
  if (categoria == "cine") {
    radioGeografia.checked = false;
  } else {
    radioCine.checked = false;
  }
  cargarNuevaPregunta();
  document.getElementById("trivia").style.display = "flex";
};

let radioCine = document.getElementById("categoriaCine");
let radioGeografia = document.getElementById("categoriaGeografia");

radioCine.addEventListener("change", seleccionarCategoria);
radioGeografia.addEventListener("change", seleccionarCategoria);

window.onload = cargaInicial();
