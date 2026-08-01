import React, { useState } from "react";

import { HorarioModal } from "../HorarioModal";

const FormNuevoTab = ({ onCreate })=>{
  const [nombre, setNombre] = useState("");

  const handleSubmit = (evento)=>{
    evento.preventDefault();
    onCreate(nombre);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="campo">
        <label>
          <span>Nombre del horario <i>(opcional)</i></span>
          <input
            type="text"
            autoFocus
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
            placeholder="Ej. Primer semestre"
          />
        </label>
      </div>
      <button type="submit">Crear horario</button>
    </form>
  );
}

const HorarioModalNuevoTab = ({ abierto, onCerrar, onCreate })=>{
  return (
    <HorarioModal
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Nuevo horario"
    >
      <FormNuevoTab onCreate={onCreate} />
    </HorarioModal>
  );
}

export { HorarioModalNuevoTab };
