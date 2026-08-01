const DIAS = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA'];

const NOMBRES_DIAS = {
  LU: 'Lunes',
  MA: 'Martes',
  MI: 'Miércoles',
  JU: 'Jueves',
  VI: 'Viernes',
  SA: 'Sábado',
};

const HORAS = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

const cellKey = (dia, hora) => `${dia}-${hora}`;

const parseCellKey = (clave) => {
  const [dia, hora] = clave.split('-');
  return { dia, hora: Number(hora) };
};

export { DIAS, NOMBRES_DIAS, HORAS, cellKey, parseCellKey };
