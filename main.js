import Horario from "./JS/Horario.js";
import Nodo from "./JS/Nodo.js";
import Materia from "./JS/Materia.js";

const coloresPastel = [
  "#FFD1DC", // Rosa pastel
  "#FFEBB7", // Amarillo pastel
  "#B7E4FF", // Azul claro pastel
  "#C6E2FF", // Celeste pastel
  "#D5C6E0", // Lavanda pastel
  "#A1E8AF", // Verde menta pastel
  "#F7C8E2", // Rosa lavanda pastel
  "#FFE5B4", // Durazno pastel
  "#B0E0E6", // Azul polvo pastel
  "#D8BFD8"  // Lila pastel
];

const $horarioTabla = document.getElementById("horario-tabla");

const test = new Horario(coloresPastel,9);

const caclulo = new Nodo(100,3,new Materia("calc","xd"),[[1,2],[2,2]]);
const caclulo2 = new Nodo(300,3,new Materia("calc2","xd"),[[1,2],[2,2]]);
const fisica = new Nodo(200,3,new Materia("fis","xd"),[[1,3],[3,2]]);

// Horario [10 x 6] [Hora , Dia]
// const matriz = Array.from({ length: 6 }, () => Array(10).fill(5));

test.agregar(caclulo)
test.agregar(fisica)
test.agregar(caclulo2)
//test.eliminar(100)

//test.dibujarTabla()

test._printLista()
