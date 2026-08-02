import { useEffect, useState } from 'react';

const resolverInicial = (valorInicial) =>
  typeof valorInicial === 'function' ? valorInicial() : valorInicial;

const useLocalStorageState = (clave, valorInicial, transformar) => {
  const [valor, setValor] = useState(() => {
    try {
      const crudo = window.localStorage.getItem(clave);
      if (crudo !== null) {
        const parseado = JSON.parse(crudo);
        return transformar ? transformar(parseado) : parseado;
      }
    } catch {
      // fallback al valor inicial
    }
    return resolverInicial(valorInicial);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // almacenamiento no disponible o lleno
    }
  }, [clave, valor]);

  return [valor, setValor];
};

export { useLocalStorageState };
