import Materia from "./Materia.js";

class Nodo{
  /**
   * Clase que gestiona la Materia y sus distintas posiciones en el horario, garantizando la uniformidad entre materias.
   *
   * @param {Number} id - ID unico que referencia a la materia de forma global.
   * @param {Materia} data - Objeto Materia con los datos de la misma.
   * @param {Array[Array[2]]} posicion - Array de las coordenadas [Hora , Dia] de cada hora de clase de la materia.
   * @param {String} colorClase - String de la clase que da color a la materia de forma global.
   */
  constructor(id, creditos, data, posicion, colorClase){
    this.id = id;
    this.creditos = creditos;
    this.data = data;
    this.posiciones = posicion;
    this.color = colorClase;
  }
}

export default Nodo;