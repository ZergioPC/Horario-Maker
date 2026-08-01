import { cellKey } from '../constants/horarios';

const tieneHorasDuplicadas = (horas) => {
  const claves = new Set();
  for (const { dia, hora } of horas) {
    const clave = cellKey(dia, hora);
    if (claves.has(clave)) return true;
    claves.add(clave);
  }
  return false;
};

const validateMateria = ({ nombre, grupo, horas }) => {
  const errores = {};
  if (!nombre || !nombre.trim()) errores.nombre = 'El nombre es obligatorio';
  if (!grupo || !grupo.trim()) errores.grupo = 'El grupo es obligatorio';
  if (!Array.isArray(horas) || horas.length === 0) {
    errores.horas = 'Debes elegir al menos una hora';
  } else if (tieneHorasDuplicadas(horas)) {
    errores.horas = 'Una materia no puede repetir el mismo día y hora';
  }
  return errores;
};

const getMateriasEnTablero = (materias, idsEnTablero) =>
  idsEnTablero
    .map((id) => materias.find((materia) => materia.id === id))
    .filter(Boolean);

const getConflicts = (materias, idsEnTablero) => {
  const enTablero = getMateriasEnTablero(materias, idsEnTablero);
  const porCelda = new Map();
  for (const materia of enTablero) {
    for (const { dia, hora } of materia.horas) {
      const clave = cellKey(dia, hora);
      const actual = porCelda.get(clave) ?? [];
      actual.push(materia);
      porCelda.set(clave, actual);
    }
  }
  return porCelda;
};

export { tieneHorasDuplicadas, validateMateria, getMateriasEnTablero, getConflicts };
