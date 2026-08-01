import React, { useRef } from "react";

const HorarioTabs = ({ tabs, activoId, onActivar, onCerrar, onCrear })=>{
  const scrollRef = useRef(null);

  const desplazar = (direccion) => {
    const contenedor = scrollRef.current;
    if (!contenedor) return;
    const tab = contenedor.querySelector(".tab-horario");
    const paso = tab ? tab.getBoundingClientRect().width + 6 : 200;
    contenedor.scrollBy({ left: direccion * paso, behavior: "smooth" });
  };

  return (
    <nav className="tabs-horarios" role="tablist" aria-label="Horarios abiertos">
      <button
        type="button"
        className="tab-flecha"
        onClick={()=>desplazar(-1)}
        aria-label="Ver pestañas anteriores"
      >‹</button>
      <div className="tabs-scroll" ref={scrollRef}>
        {tabs.map((tab) => {
          const activa = tab.id === activoId;
          return (
            <div
              key={tab.id}
              role="tab"
              aria-selected={activa}
              className={`tab-horario${activa ? " activa" : ""}`}
            >
              <button
                type="button"
                className="tab-nombre"
                onClick={()=>onActivar(tab.id)}
              >
                {tab.nombre}
              </button>
              <button
                type="button"
                className="tab-cerrar"
                onClick={()=>onCerrar(tab.id)}
                aria-label={`Cerrar ${tab.nombre}`}
                disabled={tabs.length <= 1}
              >✕</button>
            </div>
          );
        })}
        <button
          type="button"
          className="tab-nueva"
          onClick={onCrear}
          aria-label="Nuevo horario"
        >+</button>
      </div>
      <button
        type="button"
        className="tab-flecha"
        onClick={()=>desplazar(1)}
        aria-label="Ver siguientes pestañas"
      >›</button>
    </nav>
  );
}

export { HorarioTabs };
