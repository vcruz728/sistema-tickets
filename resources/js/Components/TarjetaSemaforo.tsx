import React from 'react';

interface Props {
  categoria: 'amarillo' | 'naranja' | 'verde' | 'rojo';
  total: number;
  onClick: () => void;
  activa: boolean;
}

const estilos = {
  amarillo: 'bg-yellow-300 text-yellow-900',
  naranja: 'bg-orange-400 text-orange-900',
  verde: 'bg-green-300 text-green-900',
  rojo: 'bg-red-400 text-red-900',
};

const TarjetaSemaforo: React.FC<Props> = ({ categoria, total, onClick, activa }) => {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer text-center p-4 rounded 
        transition-all duration-200 ease-in-out transform
        ${estilos[categoria]} 
        ${activa ? 'shadow-lg scale-105 ring-2 ring-white/70 ring-offset-2' : 'opacity-80'}
      `}
    >
      <h2 className="font-semibold text-md">
        {{
          amarillo: 'Sin respuesta (en tiempo)',
          naranja: 'Sin respuesta (fuera de tiempo)',
          verde: 'Respondido en tiempo',
          rojo: 'Respondido fuera de tiempo',
        }[categoria]}
      </h2>

      <p className="text-2xl">{total}</p>
    </div>
  );
};

export default TarjetaSemaforo;
