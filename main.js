import Horario from "./JS/Horario.js";
import Nodo from "./JS/Nodo.js";
import Materia from "./JS/Materia.js";
import { TimeSlotDom, TablaDom } from "./JS/DomClasses.js";

class LogicalHourError extends Error {  
  /**
   * Clase de error personalizado
   */
  constructor(mensaje, datos) {
    super(mensaje);
    this.datos = datos;      // payload con la info de colisión
  }
}

class EmptyDataError extends Error {  
  /**
   * Clase de error personalizado
   */
  constructor(mensaje,datos) {
    super(mensaje);
    this.datos = datos;      // payload con la info de colisión
  }
}

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
let GLOBAL_IdCounter = 0;

const HORARIOS_LIST = [new Horario(coloresPastel,30)];
let ACTUAL_HORARIO = 0;


//MARK: Main Tablas

function removeMateriaTablaDom(id){
  HORARIOS_LIST[ACTUAL_HORARIO].eliminar(id);
  $horarioTablaDom.dibujar(HORARIOS_LIST[ACTUAL_HORARIO].materias);
}

const $horarioTablaDom = new TablaDom(document.getElementById("horario-tabla"),removeMateriaTablaDom);
/* 
const test = new Horario(coloresPastel,9);


test.agregar(caclulo)
test.agregar(fisica)
test.agregar(caclulo2)
//test.eliminar(100)

$horarioTablaDom.dibujar(test.materias)
//test._printLista()
*/

$horarioTablaDom.dibujar([]);
//MARK: Aside
const $btnCrearMateria = document.getElementById("btnCrearMateria");
const $ulMateriasList = document.getElementById("listMaterias");

function removeMateriasListDom(idx){
  GLOBAL_MATERIAS.splice(idx,1);
  console.log(GLOBAL_MATERIAS);
  updateMateriasListDom()
}

function updateMateriasListDom(){
  $ulMateriasList.innerHTML = "";
  GLOBAL_MATERIAS.forEach((materia,index) => {
    const li = document.createElement('li');
    const btnAdd = document.createElement('button');
    const btnDelete = document.createElement('button');

    btnDelete.innerText = "x";
    btnDelete.addEventListener('click',function(){removeMateriasListDom(index)});
    btnAdd.innerText = materia.data.nombre;
    btnAdd.addEventListener('click', function(){
      try{
        HORARIOS_LIST[ACTUAL_HORARIO].agregar(GLOBAL_MATERIAS[index]);
        $horarioTablaDom.dibujar(HORARIOS_LIST[ACTUAL_HORARIO].materias);
      }catch(e){
        console.log(e);
      }
    });

    li.appendChild(btnAdd);
    li.appendChild(btnDelete);
    $ulMateriasList.appendChild(li);
  });
}
//MARK: POP-UP Materia

const dialogAddMat =  document.getElementById("formAddMateria");
const nombreAddMat = document.getElementById("addMatNombre");
const grupoAddMat = document.getElementById("addMatGrupo");
const creditosAddMat = document.getElementById("addMatCreditos");
const btnDateMat = document.getElementById("addMatBtnFecha");
const dateContainerMat = document.getElementById("addMatFechas");
const btnAddMat = document.getElementById("addConfirm");
const btnCancelMat = document.getElementById("addCancel");

// Convierte los datos del POP-UP en un objeto Nodo
function parseDataToNodos(data){
  const materia = new Materia(data[0],data[1]);
  const dias = [];
  data[2].forEach(fecha => {
    if(Number(fecha.start) === Number(fecha.end)){
      dias.push([Number(fecha.start),Number(fecha.day)]);
    }else{
      for (let i = Number(fecha.start); i <= Number(fecha.end); i++) {
        dias.push([i,Number(fecha.day)]);
      }
    }
  });
  return new Nodo(GLOBAL_IdCounter,Number(data[3]),materia,dias,coloresPastel[0]);
}

// Mostrar POP-UP de agregar materias
$btnCrearMateria.addEventListener('click',function(){
  dialogAddMat.showModal();
});

// Validar y enviar datos del POP-UP de agregar materias
btnAddMat.addEventListener("click", function(){
  try{
    if(nombreAddMat.value.trim() === ""){
      throw new EmptyDataError(
        "Ingrese el nombre de la Asignatura",
        nombreAddMat
      );
    }
    if(grupoAddMat.value.trim() === ""){
      throw new EmptyDataError(
        "Ingrese el nombre del Grupo",
        grupoAddMat
      );
    }
    if(Number(creditosAddMat.value) === 0){
      throw new EmptyDataError(
        "Los creditos deben ser mayores a 0",
        creditosAddMat
      );
    }
    if(dateContainerMat.querySelectorAll("div").length <= 0){
      throw new EmptyDataError(
        "No hay dias creados",
        btnDateMat
      );
    }
    
    const fechas = [];
    dateContainerMat.querySelectorAll("div").forEach( div =>{
      const dayData = div.querySelector('select[name="day"]').value;
      const startData = div.querySelector('select[name="Start"]').value;
      const endData = div.querySelector('select[name="End"]').value;
      if (Number(startData) > Number(endData)) {
        throw new LogicalHourError(
          "La horas de inicio deben ser menores a las horas en que finalizan",
          div
        );
      }
      fechas.push({
        day: dayData,
        start: startData,
        end: endData
      });
    });

    const data = [
      nombreAddMat.value,
      grupoAddMat.value,
      fechas,
      creditosAddMat.value
    ];
    
    const newData = parseDataToNodos(data);
    const seen = new Set();
    newData.posiciones.forEach((subArr, idx) => {
      const key = JSON.stringify(subArr);
      if (seen.has(key)) {
        throw new LogicalHourError(
          "Hay una franja que está colisionando con otra",
          dateContainerMat.querySelectorAll("div")[idx]);
        }
        seen.add(key);
      });
      
    nombreAddMat.value = '';
    grupoAddMat.value = '';
    dateContainerMat.innerHTML = "";
    GLOBAL_MATERIAS.push(newData);
    dialogAddMat.close();
    updateMateriasListDom();
  }catch(e){
    if (e instanceof LogicalHourError){
      //Tratar el div donde hay error de horario
      console.log(e.message);
      console.log(e.datos);
    }else if (e instanceof EmptyDataError){
      //Tratar el input donde hay error de formulario
      console.log(e.message);
      console.log(e.datos);
    }
  }
});

// Cerrar POP-UP de agregar materias
btnCancelMat.addEventListener("click", function(){
  dialogAddMat.close();
});

// Gestiona configuracion de agregar dias y horas del POP-UP de agregar materias
btnDateMat.addEventListener("click", function(e){
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

  dateContainerMat.appendChild(div);
});