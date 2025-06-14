import React from 'react';
import type { Disc } from '../types/othello';

type Props = {
  x: number;
  y: number;
  disc: Disc;
  isValidMove: boolean;
  onClick: () => void;
};

const Cell: React.FC<Props> = ({ disc, isValidMove, onClick }) => {
  return (
    <div
      className={`w-40 aspect-square flex items-center justify-center bg-green-700 cursor-pointer hover:bg-green-600 relative border border-black ${
        isValidMove && !disc ? 'after:content-[\"\"] after:absolute after:w-12 after:h-12 after:bg-black/30 after:rounded-full' : ''
      }`}
      onClick={onClick}
    >
      {disc && (
        <div
          className={`w-40 h-40 rounded-full shadow-2xl flex items-center justify-center ${
            disc === 'black'
              ? 'bg-black'
              : 'bg-white'
          }`}
        >
          <span className={`text-6xl font-bold select-none ${disc === 'black' ? 'text-white' : 'text-black'}`}>
            {disc === 'black' ? '●' : '○'}
          </span>
        </div>
      )}
    </div>
  );
};

export default Cell;
