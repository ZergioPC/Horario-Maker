import React from "react";
import { HorarioItem } from "../HorarioItem";

const HorarioTable = ({ items })=>{
  return (
    <table>
      <thead>
        <tr>
          <th>Hora</th>
          <th>Lunes</th>
          <th>Martes</th>
          <th>Miercoles</th>
          <th>Jueves</th>
          <th>Viernes</th>
          <th>Sabado</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            {items[0]}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export { HorarioTable };