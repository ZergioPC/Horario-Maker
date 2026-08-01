import { useMemo, useState } from 'react';

import { getConflicts } from '../utils/horarios';

const useHorariosTabs = (materiasIniciales = []) => {
  const [materias, setMaterias] = useState(materiasIniciales);
  const [tabs, setTabs] = useState(() => [
    { id: crypto.randomUUID(), nombre: 'Horario 1', idsEnTablero: [] },
  ]);
  const [tabActivoId, setTabActivoId] = useState(() => tabs[0].id);

  const tabActivo = tabs.find((tab) => tab.id === tabActivoId) ?? tabs[0];

  const actualizarTab = (id, fn) => {
    setTabs((prev) => prev.map((tab) => (tab.id === id ? fn(tab) : tab)));
  };

  const crearTab = (nombre) => {
    const tab = {
      id: crypto.randomUUID(),
      nombre: nombre.trim() || `Horario ${tabs.length + 1}`,
      idsEnTablero: [],
    };
    setTabs((prev) => [...prev, tab]);
    setTabActivoId(tab.id);
  };

  const cerrarTab = (id) => {
    if (tabs.length <= 1) {
      alert ("Debe haber un horario disponible")
      return;
    }

    const indice = tabs.findIndex((tab) => tab.id === id);
    
    if (!confirm("Desea borrar " + tabs[indice].nombre + "?")) return;
    console.log(tabs[indice]);
    
    if (indice === -1) return;
    const proximos = tabs.filter((tab) => tab.id !== id);
    setTabs(proximos);
    if (tabActivoId === id) {
      const siguiente = proximos[Math.min(indice, proximos.length - 1)];
      setTabActivoId(siguiente.id);
    }
  };

  const activarTab = (id) => setTabActivoId(id);

  const crearMateria = ({ nombre, grupo, horas }) => {
    const materia = {
      id: crypto.randomUUID(),
      nombre,
      grupo,
      horas,
    };
    setMaterias((prev) => [...prev, materia]);
  };

  const toggleEnTablero = (id) => {
    actualizarTab(tabActivo.id, (tab) => ({
      ...tab,
      idsEnTablero: tab.idsEnTablero.includes(id)
        ? tab.idsEnTablero
        : [...tab.idsEnTablero, id],
    }));
  };

  const eliminarMateria = (id) => {
    const indice = materias.findIndex((tab) => tab.id === id);
    if (!confirm(
      "¿Eliminar "+ materias[indice].nombre +"-"+ materias[indice].grupo +"?"
    )) return;

    setMaterias((prev) => prev.filter((materia) => materia.id !== id));
    setTabs((prev) =>
      prev.map((tab) => ({
        ...tab,
        idsEnTablero: tab.idsEnTablero.filter((pid) => pid !== id),
      }))
    );
  };

  const quitarDelTablero = (id) => {
    actualizarTab(tabActivo.id, (tab) => ({
      ...tab,
      idsEnTablero: tab.idsEnTablero.filter((pid) => pid !== id),
    }));
  };

  const conflictos = useMemo(
    () => getConflicts(materias, tabActivo.idsEnTablero),
    [materias, tabActivo]
  );

  return {
    materias,
    tabs,
    tabActivoId,
    conflictos,
    crearTab,
    cerrarTab,
    activarTab,
    crearMateria,
    eliminarMateria,
    toggleEnTablero,
    quitarDelTablero,
  };
};

export { useHorariosTabs };
