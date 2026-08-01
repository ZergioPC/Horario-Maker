import React, { useEffect } from "react";

const HorarioModal = ({ abierto, onCerrar, children })=>{
  useEffect(() => {
    if (!abierto) return;
    const manejarTecla = (evento) => {
      if (evento.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  return (
    <div
      className="modal-fondo"
      onClick={(evento)=>{
        if (evento.target === evento.currentTarget) onCerrar();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label="Nueva materia">
        <header className="modal-cabecera">
          <h2>Nueva materia</h2>
          <button
            type="button"
            className="modal-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar"
          >✕</button>
        </header>
        <div className="modal-contenido">{children}</div>
      </div>
    </div>
  );
}

export { HorarioModal };
