import React from "react";

import { HorarioModal } from "../HorarioModal";

const HorarioAbout = ({ abierto, onCerrar })=>{
  return (
    <HorarioModal
      abierto={abierto}
      onCerrar={onCerrar}
      titulo="Acerca de"
    >
      <div className="about-descripcion">
        <h1>Horario Maker</h1>
        <p>Hecho por Sergio Palacios para facilitar la organización de horarios de la universidad, ya que a esta le vale madres el bienestar de sus estudiantes.</p>
        <ul>
          <li>
            <a 
              href="https://github.com/ZergioPC/Horario-Maker"
              target="_blank"
            >Repositorio del proyecto</a>
            </li>
          <li>
            <a 
              href="https://instagram.com/zergiopalacios"
              target="_blank"
            >Instagram</a>
            </li>
        </ul>
        {/* Agrega aquí un párrafo de descripción y enlaces del proyecto */}
      </div>
    </HorarioModal>
  );
}

export { HorarioAbout };
