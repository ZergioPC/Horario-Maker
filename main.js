import Horario from "./JS/Horario.js";
import Nodo from "./JS/Nodo.js";
import Materia from "./JS/Materia.js";
import { ItemDom, TablaDom } from "./JS/DomClasses.js";

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

const GLOBAL_MATERIAS = []

const $horarioTabla = document.getElementById("horario-tabla");
const $btnCrearMateria = document.getElementById("btnCrearMateria");
const $ulMateriasList = document.getElementById("listMaterias");


//MARK: Crear Materia

const dialog =  document.getElementById("formAddMateria");
const nombre = document.getElementById("addMatNombre");
const grupo = document.getElementById("addMatGrupo");
const btnDate = document.getElementById("addMatBtnFecha");
const dateContainer = document.getElementById("addMatFechas");
const btnAdd = document.getElementById("addConfirm");
const btnCancel = document.getElementById("addCancel");

let logicalError = false;

$btnCrearMateria.addEventListener('click',function(){
  dialog.showModal();
});

btnAdd.addEventListener("click", function(){
  try{
    const fechas = [];
    dateContainer.querySelectorAll("div").forEach( div =>{
      const dayData = div.querySelector('select[name="day"]').value;
      const startData = div.querySelector('select[name="Start"]').value;
      const endData = div.querySelector('select[name="End"]').value;
      if (Number(startData) <= Number(endData)) {
        throw new Error(
          "La horas de inicio deben ser menores a las horas en que finalizan"
        );
      }
      fechas.push({
        day: dayData,
        start: startData,
        end: endData
      });
    });
    const data = [
      nombre.value,
      grupo.value,
      fechas
    ];
    nombre.value = '';
    grupo.value = '';
    dateContainer.innerHTML = "";
    GLOBAL_MATERIAS.push(data);
    dialog.close();
  }catch(e){
    console.log(e.message);
  }
  console.log(GLOBAL_MATERIAS);
});

btnCancel.addEventListener("click", function(){
  dialog.close();
});

btnDate.addEventListener("click", function(e){
  // Label Day
  const labelDay = document.createElement("label");
  labelDay.setAttribute("for", "day");
  labelDay.textContent = "Day of the week:";

  // Select Day
  const selectDay = document.createElement("select");
  const listDays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes","Sabado"];
  selectDay.id = "day";
  selectDay.name = "day";
  listDays.forEach(day => {
    const option = document.createElement("option");
    option.textContent = day;
    option.setAttribute('value', listDays.indexOf(day));
    selectDay.appendChild(option);
  });

  //Label Start
  const labelStart = document.createElement("label");
  labelStart.setAttribute("for", "start");
  labelStart.textContent = "Start time:";

  // Select Start
  const listTime = [
    "6:00 am to 7:00 am",
    "7:00 am to 8:00 am",
    "8:00 am to 9:00 am",
    "9:00 am to 10:00 am",
    "10:00 am to 11:00 am",
    "11:00 am to 12:00 pm",
    "12:00 pm to 1:00 pm",
    "1:00 pm to 2:00 pm",
    "2:00 pm to 3:00 pm",
    "3:00 pm to 4:00 pm",
    "4:00 pm to 5:00 pm",
    "5:00 pm to 6:00 pm"
  ];

  const selectStart = document.createElement("select");
  selectStart.id = "Start";
  selectStart.name = "Start";
  listTime.forEach(hora => {
    const option = document.createElement("option");
    option.textContent = hora;
    option.setAttribute('value', listTime.indexOf(hora));
    selectStart.appendChild(option);
  });

  // Label End
  const labelEnd = document.createElement("label");
  labelEnd.setAttribute("for", "end");
  labelEnd.textContent = "End time:";

  // Input End
  const selectEnd = document.createElement("select");
  selectEnd.id = "End";
  selectEnd.name = "End";
  listTime.forEach(hora => {
    const option = document.createElement("option");
    option.textContent = hora;
    option.setAttribute('value', listTime.indexOf(hora));
    selectEnd.appendChild(option);
  });

  // Button borrar
  const btnBorrar = document.createElement("button");
  btnBorrar.textContent = "borrar";
  btnBorrar.addEventListener('click',function(){
    this.parentNode.remove();
  });

  const div = document.createElement('div');
  div.appendChild(labelDay);
  div.appendChild(selectDay);
  div.appendChild(labelStart);
  div.appendChild(selectStart);
  div.appendChild(labelEnd);
  div.appendChild(selectEnd);
  div.appendChild(btnBorrar);

  dateContainer.appendChild(div);
});
/* 
const test = new Horario(coloresPastel,9);
const testDom = new TablaDom($horarioTabla);

const caclulo = new Nodo(100,3,new Materia("calc","xd"),[[1,2],[2,2]]);
const caclulo2 = new Nodo(300,3,new Materia("calc2","xd"),[[1,2],[2,2]]);
const fisica = new Nodo(200,3,new Materia("fis","xd"),[[1,3],[3,2]]);


test.agregar(caclulo)
test.agregar(fisica)
test.agregar(caclulo2)
//test.eliminar(100)

testDom.dibujar(test.materias)
//test._printLista()
*/