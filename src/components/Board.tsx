import React from 'react';
import type { Board as BoardType } from '../types/othello';
import Cell from './Cell';

type Props = {
  board: BoardType;
  onCellClick: (x: number, y: number) => void;
  validMoves: [number, number][];
};

const Board: React.FC<Props> = ({ board, onCellClick, validMoves }) => {
  return (
    <div className="p-16 bg-green-800 rounded-3xl shadow-2xl">
      <div className="grid grid-cols-8 gap-0 w-max mx-auto">
        {board.map((row, y) =>
          row.map((disc, x) => (
            <Cell
              key={`${x}-${y}`}
              x={x}
              y={y}
              disc={disc}
              isValidMove={validMoves.some(([vx, vy]) => vx === x && vy === y)}
              onClick={() => onCellClick(x, y)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Board;
