import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import type { Disc } from './types/othello';
import {
  createInitialBoard,
  getValidMoves,
  applyMove,
  hasAnyValidMove,
} from './utils/othelloLogic';

const App: React.FC = () => {
  const [board, setBoard] = useState(createInitialBoard());
  const [turn, setTurn] = useState<Disc>('black');
  const [gameOver, setGameOver] = useState(false);
  const [validMoves, setValidMoves] = useState<[number, number][]>([]);
  const [scores, setScores] = useState({ black: 2, white: 2 });

  useEffect(() => {
    const moves = getValidMoves(board, turn);
    setValidMoves(moves);
  }, [board, turn]);

  useEffect(() => {
    // スコアの計算
    const blackCount = board.flat().filter(disc => disc === 'black').length;
    const whiteCount = board.flat().filter(disc => disc === 'white').length;
    setScores({ black: blackCount, white: whiteCount });
  }, [board]);

  const handleCellClick = (x: number, y: number) => {
    if (gameOver) return;
    
    const validMoves = getValidMoves(board, turn);
    if (!validMoves.some(([vx, vy]) => vx === x && vy === y)) return;

    const newBoard = applyMove(board, x, y, turn);
    const nextTurn: Disc = turn === 'black' ? 'white' : 'black';

    if (!hasAnyValidMove(newBoard, nextTurn)) {
      if (!hasAnyValidMove(newBoard, turn)) {
        setGameOver(true);
      } else {
        alert(`${nextTurn} はパスされます`);
        setTurn(turn); // 同じプレイヤーの手番を継続
      }
    } else {
      setTurn(nextTurn);
    }

    setBoard(newBoard);
  };

  const restartGame = () => {
    setBoard(createInitialBoard());
    setTurn('black');
    setGameOver(false);
    setScores({ black: 2, white: 2 });
  };

  const getWinner = () => {
    if (scores.black > scores.white) return '黒の勝ち';
    if (scores.white > scores.black) return '白の勝ち';
    return '引き分け';
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">オセロゲーム</h1>
        <div className="mb-4 text-center">
          <p className="mb-2">
            現在のターン:{' '}
            <span className={turn === 'black' ? 'text-black' : 'text-gray-600'}>
              {turn === 'black' ? '黒' : '白'}
            </span>
          </p>
          <p className="mb-2">
            スコア - 黒: {scores.black} 白: {scores.white}
          </p>
        </div>
        <Board 
          board={board} 
          onCellClick={handleCellClick} 
          validMoves={validMoves}
        />
        {gameOver && (
          <div className="mt-4 text-center">
            <p className="text-xl font-bold">ゲーム終了！</p>
            <p className="text-lg">{getWinner()}</p>
          </div>
        )}
        <button
          onClick={restartGame}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          リスタート
        </button>
      </div>
    </div>
  );
};

export default App;
