import { useMemo, useState } from 'react';

import { getConflicts } from '../utils/horarios';

const useHorarios = (iniciales = []) => {
  const [materias, setMaterias] = useState(iniciales);
  const [idsEnTablero, setIdsEnTablero] = useState([]);

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
    setIdsEnTablero((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const quitarDelTablero = (id) => {
    setIdsEnTablero((prev) => prev.filter((pid) => pid !== id));
  };

  const conflictos = useMemo(
    () => getConflicts(materias, idsEnTablero),
    [materias, idsEnTablero]
  );

  return {
    materias,
    idsEnTablero,
    conflictos,
    crearMateria,
    toggleEnTablero,
    quitarDelTablero,
  };
};

export { useHorarios };
