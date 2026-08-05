import React from "react";

import {
  DIAS,
  HORAS,
  NOMBRES_DIAS,
  cellKey,
} from "../../constants/horarios";
import { HorarioItem } from "../HorarioItem";

const HorarioTable = ({ conflictos, onQuitar })=>{
  return (
    <div className="tabla-scroll">
    <table className="tabla-horario">
      <thead>
        <tr>
          <th className="celda-hora">Hora</th>
          {DIAS.map((dia) => (
            <th key={dia}>{NOMBRES_DIAS[dia]}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {HORAS.map((hora) => (
          <tr key={hora}>
            <th className="celda-hora">{hora}:00</th>
            {DIAS.map((dia) => {
              const clave = cellKey(dia, hora);
              const celdas = conflictos.get(clave) ?? [];
              const enConflicto = celdas.length > 1;
              return (
                <td key={clave} className={`celda-horario${enConflicto ? " conflicto" : ""}`}>
                  {celdas.map((materia) => (
                    <HorarioItem
                      key={materia.id}
                      materia={materia.nombre}
                      curso={materia.grupo}
                      conflicto={enConflicto}
                      onQuitar={()=>onQuitar(materia.id)}
                    />
                  ))}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

export { HorarioTable };
