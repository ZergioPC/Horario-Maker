import React from "react";

const HorarioHeader = ({ titulo, autor, onAbout, onAjustes })=>{
  return (
    <header>
      <div className="header-titulo">
        <h1>{titulo}</h1>
        <span>por {autor}</span>
      </div>
      <div className="header-botones">
        <button
          type="button"
          className="header-icono"
          onClick={onAbout}
          aria-label="Acerca de este proyecto"
        >?</button>
        <button
          type="button"
          className="header-icono"
          onClick={onAjustes}
          aria-label="Ajustes"
        >⚙</button>
      </div>
    </header>
  );
}

export { HorarioHeader };