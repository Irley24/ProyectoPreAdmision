import {preguntasCine,preguntasGeografia} from './preguntas.js'

let radioOne = document.getElementById("option-one");
let radioTwo = document.getElementById("option-two");
let radioThree = document.getElementById("option-three");
let respuesta = "";
let enviar = document.getElementById("enviar");
let categoria = "";
let puntos = 0;
let preguntaActual = "";
let player = "";
let puntaje = document.getElementById("puntaje-actual");

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

document.getElementById('comenzar').addEventListener('click', ()=>comenzar())

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

document.getElementById('volver').addEventListener('click', ()=>volverAJugar())
//recargar pagina para volver a jugar
function volverAJugar() {
  window.location.reload();
}


//verificar respuesta en base a la posicion en el arreglo y comparar si la posicion actual es la ultima
function verificarRespuesta() {
  let gameOver = false
  if (categoria == "cine") {
    if (respuesta == preguntasCine[preguntaActual].opcionCorrecta) {
      puntos = puntos + preguntasCine[preguntaActual].puntos;
      
    } else {
      puntos = puntos - preguntasCine[preguntaActual].puntos;
      
    }
    preguntasCine[preguntaActual].resuelto = true;
    if (preguntaActual != preguntasCine.length - 1) {
      cargarPreguntaCine();
     
    } else {
      document.getElementById("trivia").style.display = "none";
      document.getElementById("resultado").style.display = "block";
      gameOver=true
    }
  } else {
    if (respuesta == preguntasGeografia[preguntaActual].opcionCorrecta) {
      puntos = puntos + preguntasGeografia[preguntaActual].puntos;
      
    } else {
      puntos = puntos - preguntasGeografia[preguntaActual].puntos;
      
    }
    preguntasGeografia[preguntaActual].resuelto = true;
    if (preguntaActual != preguntasGeografia.length - 1) {
      cargarPreguntaGeografia();
    } else {
      document.getElementById("trivia").style.display = "none";
      document.getElementById("resultado").style.display = "block";
      gameOver=true
    }
  }
  mostrarPuntaje(gameOver);
}

function mostrarPuntaje(gameOver=false) {
      document.getElementById("puntaje-actual").innerHTML = (gameOver?"Ganaste ":"Tienes: ") + puntos + " Puntos";
  
}

//mostrar la pantalla principal
function cargaInicial() {
  document.getElementById("game").style.display = "none";
  document.getElementById("trivia").style.display = "none";
  document.getElementById("resultado").style.display = "none";
}

//busca en el arreglo correspondiente, la primera pregunta que no este resuelta
function cargarPreguntaCine() {
  let iterador = 0;
  let verificador = false;
  while (!verificador) {
    if (!preguntasCine[iterador].resuelto) {
      preguntaActual = iterador;
      document.getElementById("pregunta").innerHTML =
        preguntasCine[iterador].pregunta;
      document.getElementById("option-one").value =
        preguntasCine[iterador].opcion1;
      document.getElementById("label-option-one").innerHTML =
        preguntasCine[iterador].opcion1;
      document.getElementById("option-two").value =
        preguntasCine[iterador].opcion2;
      document.getElementById("label-option-two").innerHTML =
        preguntasCine[iterador].opcion2;
      document.getElementById("option-three").value =
        preguntasCine[iterador].opcion3;
      document.getElementById("label-option-three").innerHTML =
        preguntasCine[iterador].opcion3;

      verificador = true;
    }
    iterador++;
  }
}

//busca en el arreglo correspondiente, la primera pregunta que no este resuelta
function cargarPreguntaGeografia() {
  let iterador = 0;
  let verificador = false;
  while (!verificador) {
    if (!preguntasGeografia[iterador].resuelto) {
      preguntaActual = iterador;
      document.getElementById("pregunta").innerHTML =
        preguntasGeografia[iterador].pregunta;
      document.getElementById("option-one").value =
        preguntasGeografia[iterador].opcion1;
      document.getElementById("label-option-one").innerHTML =
        preguntasGeografia[iterador].opcion1;
      document.getElementById("option-two").value =
        preguntasGeografia[iterador].opcion2;
      document.getElementById("label-option-two").innerHTML =
        preguntasGeografia[iterador].opcion2;
      document.getElementById("option-three").value =
        preguntasGeografia[iterador].opcion3;
      document.getElementById("label-option-three").innerHTML =
        preguntasGeografia[iterador].opcion3;

      verificador = true;
    }
    iterador++;
  }
}

// seleccionar la categoria por medio de un evento en el radiobutton, concatenar la categoria actual y llamar la carga del arreglo de la categoria elegida.
//al estar en la categoria elegida se esconden las demas pantallas
const seleccionarCategoria = (e) => {
  categoria = e.target.value;
  document.getElementById("contenedor-categorias").style.display = "none";
  document.getElementById("categoria-actual").innerHTML = "Categoria: " + categoria.toUpperCase();
  if (categoria == "cine") {
    radioGeografia.checked = false;
    cargarPreguntaCine();
  } else {
    radioCine.checked = false;
    cargarPreguntaGeografia();
  }

  document.getElementById("trivia").style.display = "flex";
};

let radioCine = document.getElementById("categoriaCine");
let radioGeografia = document.getElementById("categoriaGeografia");

radioCine.addEventListener("change", seleccionarCategoria);
radioGeografia.addEventListener("change", seleccionarCategoria);

window.onload = cargaInicial();