import React from "react";

const HorarioHeader = ({ titulo, autor })=>{
  return (
    <header>
      <h1>{titulo}</h1>
      <span>por {autor}</span>
    </header>
  );
}

export { HorarioHeader };