import React from "react";

const HorarioItem = ({ 
  materia,
  curso
})=>{
  return (
    <article>
      <span>{materia}</span>
      <span>{curso}</span>
    </article>
  );
}

export { HorarioItem };