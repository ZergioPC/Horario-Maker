import React, { useRef, useState } from "react";

const HorarioAside = ({ children, abierto, onAbrir, onCerrar })=>{
  const [arrastrando, setArrastrando] = useState(false);
  const [desplazamiento, setDesplazamiento] = useState(0);
  const arrastre = useRef(null);

  const iniciarArrastre = (evento)=>{
    arrastre.current = { inicio: evento.clientY };
    setArrastrando(true);
    evento.currentTarget.setPointerCapture?.(evento.pointerId);
  }

  const moverArrastre = (evento)=>{
    if (!arrastre.current) return;
    setDesplazamiento(evento.clientY - arrastre.current.inicio);
  }

  const terminarArrastre = (evento)=>{
    if (!arrastre.current) return;
    const delta = evento.clientY - arrastre.current.inicio;
    arrastre.current = null;
    setArrastrando(false);
    setDesplazamiento(0);
    if (delta < -80) onAbrir();
    else if (delta > 80) onCerrar();
    else if (abierto) onCerrar();
    else onAbrir();
  }

  return (
    <>
      <button
        type="button"
        className={`aside-toggle${abierto ? " oculto" : ""}`}
        onPointerDown={iniciarArrastre}
        onPointerMove={moverArrastre}
        onPointerUp={terminarArrastre}
        onPointerCancel={terminarArrastre}
        aria-label="Mostrar lista de materias"
      >
        Materias ▲
      </button>

      <aside
        className={`aside-horario${abierto ? " abierto" : ""}${arrastrando ? " arrastrando" : ""}`}
        style={arrastrando ? { transform: `translateY(calc(${abierto ? "0%" : "100%"} + ${desplazamiento}px))` } : undefined}
      >
        <div
          className="aside-manija"
          onPointerDown={iniciarArrastre}
          onPointerMove={moverArrastre}
          onPointerUp={terminarArrastre}
          onPointerCancel={terminarArrastre}
        >
          <span className="manija-linea" aria-hidden="true" />
          <button
            type="button"
            className="aside-cerrar"
            onClick={onCerrar}
            aria-label="Cerrar panel"
          >✕</button>
        </div>
        <div className="aside-contenido">{children}</div>
        <div className="aside-fade" aria-hidden="true" />
      </aside>
    </>
  );
}

export { HorarioAside };
