import React, { useState } from "react";

import {
  DIAS,
  HORAS,
  NOMBRES_DIAS,
  cellKey,
  parseCellKey,
} from "../../constants/horarios";
import { validateMateria } from "../../utils/horarios";

const HorarioFormMat = ({ onCrearMateria })=>{
  const [nombre, setNombre] = useState("");
  const [grupo, setGrupo] = useState("");
  const [seleccionadas, setSeleccionadas] = useState(() => new Set());
  const [errores, setErrores] = useState({});

  const handleToggle = (clave)=>{
    setSeleccionadas((prev) => {
      const next = new Set(prev);
      if (next.has(clave)) next.delete(clave);
      else next.add(clave);
      return next;
    });
  }

  const handleSubmit = (evento)=>{
    evento.preventDefault();
    const horas = [...seleccionadas]
      .map(parseCellKey)
      .sort((a, b) => DIAS.indexOf(a.dia) - DIAS.indexOf(b.dia) || a.hora - b.hora);
    const errs = validateMateria({ nombre, grupo, horas });
    setErrores(errs);
    if (Object.keys(errs).length > 0) return;
    onCrearMateria({ nombre: nombre.trim(), grupo: grupo.trim(), horas });
    setNombre("");
    setGrupo("");
    setSeleccionadas(new Set());
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="campo">
        <label>
          <span>Materia</span>
          <input
            type="text"
            value={nombre}
            onChange={(e)=>setNombre(e.target.value)}
          />
        </label>
        {errores.nombre && <span className="error">{errores.nombre}</span>}
      </div>

      <div className="campo">
        <label>
          <span>Grupo</span>
          <input
            type="text"
            value={grupo}
            onChange={(e)=>setGrupo(e.target.value)}
          />
        </label>
        {errores.grupo && <span className="error">{errores.grupo}</span>}
      </div>

      <fieldset>
        <legend>Horas</legend>
        <div className="matriz-scroll">
          <table className="matriz">
          <thead>
            <tr>
              <th>Hora</th>
              {DIAS.map((dia) => (
                <th key={dia}>{NOMBRES_DIAS[dia]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {HORAS.map((hora) => (
              <tr key={hora}>
                <th>{hora}:00</th>
                {DIAS.map((dia) => {
                  const clave = cellKey(dia, hora);
                  return (
                    <td key={clave}>
                      <label className="casilla">
                        <input
                          type="checkbox"
                          checked={seleccionadas.has(clave)}
                          onChange={()=>handleToggle(clave)}
                        />
                      </label>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        {errores.horas && <span className="error">{errores.horas}</span>}
      </fieldset>

      <button type="submit">Guardar materia</button>
    </form>
  );
}

export { HorarioFormMat };
