import React from "react";

import { NOMBRES_DIAS } from "../../constants/horarios";

const resumenHoras = (horas) =>
  horas.map(({ dia, hora }) => `${NOMBRES_DIAS[dia]} ${hora}:00`).join(", ");

const HorarioList = ({ materias, idsEnTablero, onToggle, onEliminar })=>{
  return (
    <ul className="lista-materias">
      {materias.map((materia) => {
        const enTablero = idsEnTablero.includes(materia.id);
        return (
          <li key={materia.id}>
            <div className="fila-materia">
              <button
                type="button"
                className={`item-materia${enTablero ? " en-tablero" : ""}`}
                onClick={()=>onToggle(materia.id)}
                disabled={enTablero}
                title={enTablero ? "Ya está en el tablero" : "Añadir al tablero"}
              >
                <span className="item-nombre">{materia.nombre}</span>
                <span className="item-grupo">{materia.grupo}</span>
                <span className="item-horas">{resumenHoras(materia.horas)}</span>
              </button>
              <button
                type="button"
                className="item-borrar"
                onClick={()=>onEliminar(materia.id)}
                aria-label={`Eliminar ${materia.nombre}`}
              >✕</button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export { HorarioList };
