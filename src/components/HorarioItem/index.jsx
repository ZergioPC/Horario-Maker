import React from "react";

const HorarioItem = ({
  materia,
  curso,
  conflicto = false,
  onQuitar
})=>{
  return (
    <article className={`item-horario${conflicto ? " conflicto" : ""}`}>
      <div className="item-texto">
        <span>{materia}</span>
        <span>{curso}</span>
      </div>
      {onQuitar && (
        <button
          type="button"
          className="item-quitar"
          onClick={onQuitar}
          aria-label={`Quitar ${materia}`}
        >✕</button>
      )}
    </article>
  );
}

export { HorarioItem };
