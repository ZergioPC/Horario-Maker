import React from "react";

const HorarioTabs = ({ tabs, activoId, onActivar, onCerrar, onCrear })=>{
  return (
    <nav className="tabs-horarios" role="tablist" aria-label="Horarios abiertos">
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
    </nav>
  );
}

export { HorarioTabs };
