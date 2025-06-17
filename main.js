import Horario from "./JS/Horario.js";
import Nodo from "./JS/Nodo.js";
import Materia from "./JS/Materia.js";

//MARK: Clases DOM

class ItemDom {
  /**
   * Clase auxiliar para controlar la informacion mostrada en la UI del horario
   * 
   * @param {Boolean} isEmpty: Boolean indicating if the cell is empty.
   * @param {Materia} data: The Materia data object.
   * @param {String} nombre: Name of the subject.
   * @param {String} grupo: Group of the subject.
   * @param {Element} btnInfo: Button to show info about the subject.
   * @param {Element} btnBorrar: Button to remove the subject.
  */
  constructor(){
    this.isEmpty = true;
    this.data = null;
    this.nombre = "Materia";
    this.grupo = "Grupo";
    this.btnInfo = document.createElement('button');
    this.btnBorrar = document.createElement('button');
  }

  /**
   * Metodo para agregar los datos de una materia
   * @param {Materia} data: Los datos de la materia
  */ 
  addMateria(data){
    this.isEmpty = false;
    this.data = data;
    this.nombre = data.nombre;
    this.grupo = data.grupo;

    this.btnInfo.addEventListener('click',function(){
      console.log(data);
    });

    this.btnBorrar.addEventListener('click',function(){
      console.log('borrar');
    });
  }

  /**
   * Metodo que renderiza la informacion de la casilla del horario
   * @returns Div Element
   */
  render(){
    const div = document.createElement('div');

    const nombreElem = document.createElement('span');
    nombreElem.textContent = this.nombre;
    div.appendChild(nombreElem);

    const grupoElem = document.createElement('span');
    grupoElem.textContent = this.grupo;
    div.appendChild(grupoElem);

    div.appendChild(this.btnInfo);
    div.appendChild(this.btnBorrar);
    return div;
  }
}

// Horario [10 x 6] [Hora , Dia]
class TablaDom {
  /**
   * Clase que gestiona la UI del horario en el DOM
   * 
   * @param {Element} tabla: Elemento Tabla del DOM.
  */
  constructor(tabla){
    this.$tabla = tabla;
  }

  /**
   * Metodo que dibuja la tabla segun los datos del horario
   * 
   * @param {Array[Materia]} datos: Lista de Materias
  */
  dibujar(datos){
    this.$tabla.innerHTML = "";
    const auxTabla = Array.from({ length: 10 }, () => Array.from({ length: 6 }, () => new ItemDom()));

    datos.forEach(nodo => {
      nodo.posiciones.forEach( ([hora,dia]) => {
        auxTabla[hora][dia].addMateria(nodo.data);
      });
    });
    
    console.table(auxTabla)

    for (let hora = 0; hora < auxTabla.length; hora++) {
      const fila = document.createElement("tr");
      for (let dia = 0; dia < auxTabla[hora].length; dia++) {
        const celda = document.createElement("td");
        
        celda.appendChild(auxTabla[hora][dia].render())
        
        fila.appendChild(celda);
      }
      this.$tabla.appendChild(fila);
    }
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

$btnCrearMateria.addEventListener('click',function(){
  dialog.showModal();
});

btnAdd.addEventListener("click", function(){
  const fechas = [];
  dateContainer.querySelectorAll("div").forEach( div =>{
    fechas.push({
      day: div.querySelector('select[name="day"]').value,
      start: div.querySelector('input[name="start"]').value,
      end: div.querySelector('input[name="end"]').value
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
  dialog.close();
  GLOBAL_MATERIAS.push[data];
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

  // Label Start
  const labelStart = document.createElement("label");
  labelStart.setAttribute("for", "start");
  labelStart.textContent = "Start time:";

  // Input Start
  const inputStart = document.createElement("input");
  inputStart.type = "time";
  inputStart.id = "start";
  inputStart.name = "start";

  // Label End
  const labelEnd = document.createElement("label");
  labelEnd.setAttribute("for", "end");
  labelEnd.textContent = "End time:";

  // Input End
  const inputEnd = document.createElement("input");
  inputEnd.type = "time";
  inputEnd.id = "end";
  inputEnd.name = "end";

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
  div.appendChild(inputStart);
  div.appendChild(labelEnd);
  div.appendChild(inputEnd);
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