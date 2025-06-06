import Nodo from "./Nodo.js";

/**
 * Clase que controla globalmente la logica del Horario (Creacion, dibujado, anexión de
 * materias, etc) 
 */
class Horario{
    /**
     * Crear la instancia del horario
     *
     * @param {JSON} materias - Listado de materias disponibles
     * @param {Array[string]} colores - Listado de colores disponibles
     */
    constructor(colores){
        this.materias = [];     // Array de Nodos
        this.colorCounter = 0;
        this.coloresClases = colores;
        this.isColide = false;
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
            nodo.posiciones.forEach(([horaNew, diaNew]) => {
                this.materias.forEach(materia => {
                    materia.posiciones.forEach(([horaOld, diaOld]) => {
                        if (horaNew === horaOld && diaNew === diaOld) {
                            this.isColide = true;
                            // Si coincide, lanzamos un Error con detalle
                            const nombreNew = nodo.nombre || 'Materia Nueva';
                            const nombreOld  = materia.nombre || 'Materia Existente';
                            throw new Error(
                                `Solapamiento detectado: ` +
                                `${nombreNew} en [hora=${horaNew}, día=${diaNew}] ` +
                                `coincide con ${nombreOld}.`
                            );
                        }
                    });
                });
            });
        }catch(e){
            console.error(e.message);
        }finally{
            if (!this.isColide) {
                this.materias.push(nodo);
            }
        }
    }

    /**
     * Elimina las materias del Horario
     *
     * @param {Array[Array[2]]} posicionList - Array de las coordenadas [Hora , Dia] de cada hora de clase de la materia
     * @param {Object} materiaData - Objeto Diccionario con los datos de la materia
     */
    eliminar(id){
        this.materias = this.materias.filter(nodo => nodo.id !== id);
    }

    /**
     * Dibuja la tabla en el DOM
     * 
    dibujarTabla() {
        this.$tabla.innerHTML = "";
        this.horarioMatriz.forEach( hora => {
            const fila = document.createElement("tr");
            hora.forEach( dia => {
                const celda = document.createElement("td");
                celda.textContent = "uwu";
                fila.appendChild(celda);
            });
            this.$tabla.appendChild(fila);
        });
    }
    */
}

export default Horario;