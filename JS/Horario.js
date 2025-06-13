import Nodo from "./Nodo.js";
import Materia from "./Materia.js";

class MateriaColisionError extends Error {  
  /**
   * Clase de error personalizado
   */
  constructor(mensaje, datos) {
    super(mensaje);
    this.datos = datos;      // payload con la info de colisión
  }
}

class Horario{
  /**
   * Clase que controla globalmente la logica del Horario (Creacion, dibujado, anexión de materias, etc) 
   * @param {Array[Materia]} materias - Listado de materias disponibles
   * @param {Array[string]} colores - Listado de colores disponibles
   * @param {number} maxCreditos - Número máximo de creditos
   */
  constructor(colores,maxCreditos){
    this.materias = [];         // Array de Nodos
    this.colorCounter = 0;        // Selector de colores
    this.coloresClases = colores;     // Lista de colores
    this.isColide = false;        // ¿Hay materias cruzadas?
    this.creditosMax = maxCreditos;   // Contador de creditos
    this.creditosCounter = 0      // Limite máximo de creditos
    this.historialBack = []       // Historial deshacer
    this.historialFront = []      // Historial rehacer
  }

  /**
   * Imprime la lista de materias actuales en consola
   */
  _printLista(){
    console.groupCollapsed(this.materias);
    //this.materias.forEach(nodo => console.log(nodo.posiciones))
  }

  /**
  * Devuelve la clase para colorear la materia
  */
  _auxSetColor(){
    this.colorCounter++;
    if (this.colorCounter >= this.coloresClases.length){
      this.colorCounter == 0;
    }
    return this.coloresClases[this.colorCounter];
  }

  /**
   * Agrega materias al Horario
   *
   * @param {Nodo} materiaData - Objeto nodo con la materia y sus posiciones
   */
  agregar(nodo){
    try{
      if ((nodo.creditos + this.creditosCounter) > this.creditosMax){
        throw new Error(
          `Limite de creditos Superados: ` +
          `La materia ${nodo.data.nombre} tiene ${nodo.creditos} ` +
          `Añadirla supera el limite de creditos que es ${this.creditosMax}.`
        );
      }
      nodo.posiciones.forEach(([horaNew, diaNew]) => {
        this.materias.forEach(materia => {
          materia.posiciones.forEach(([horaOld, diaOld]) => {
            if (horaNew === horaOld && diaNew === diaOld) {
              this.isColide = true;
              // Si coincide, lanzamos un Error con detalle
              const nombreNew = nodo.nombre || 'Materia Nueva';
              const nombreOld  = materia.nombre || 'Materia Existente';
              throw new MateriaColisionError(
                `Solapamiento detectado: ` +
                `${nombreNew} en [hora=${horaNew}, día=${diaNew}] ` +
                `coincide con ${nombreOld}.`,
                [nodo,materia]
              )
            }else{
              this.isColide = false;
            }
          });
        });
      });
    }catch(e){
      //throw e;
    }finally{
      if (!this.isColide) {
        this.materias.push(nodo);
        this.creditosCounter += nodo.creditos;
      }
    }
  }

  /**
   * Elimina las materias del Horario
   *
   * @param {number} id - id de la materia a borrar
   */
  eliminar(id){
    this.materias = this.materias.filter(nodo => nodo.id !== id);
  }
}

export default Horario;