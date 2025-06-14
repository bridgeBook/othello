import type { Board, Disc } from '../types/othello';

const SIZE = 8;

// 初期盤面を作成
export function createInitialBoard(): Board {
    const board: Board = Array.from({ length: SIZE }, () =>
        Array.from({ length: SIZE }, () => null)
    );

    board[3][3] = 'white';
    board[3][4] = 'black';
    board[4][3] = 'black';
    board[4][4] = 'white';

    return board;
}

// 8方向
const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
];

// 石を挟める方向を返す
function getFlippableDirections(
    board: Board,
    x: number,
    y: number,
    disc: Disc
): number[][] {
    if (board[y][x] !== null || disc === null) return [];

    const opponent: Disc = disc === 'black' ? 'white' : 'black';
    const flippable: number[][] = [];

    for (const [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;
        let hasOpponent = false;

        while (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
            if (board[ny][nx] === opponent) {
                hasOpponent = true;
            } else if (board[ny][nx] === disc) {
                if (hasOpponent) flippable.push([dx, dy]);
                break;
            } else {
                break;
            }
            nx += dx;
            ny += dy;
        }
    }

    return flippable;
}

// 合法手を取得
export function getValidMoves(board: Board, disc: Disc): [number, number][] {
    const moves: [number, number][] = [];

    for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
            const directions = getFlippableDirections(board, x, y, disc);
            if (directions.length > 0) {
                moves.push([x, y]);
            }
        }
    }

    return moves;
}

// 指定位置に置いて盤面を更新
export function applyMove(board: Board, x: number, y: number, disc: Disc): Board {
    const newBoard: Board = board.map(row => [...row]);
    const directions = getFlippableDirections(board, x, y, disc);
    newBoard[y][x] = disc;

    for (const [dx, dy] of directions) {
        let nx = x + dx;
        let ny = y + dy;
        while (board[ny][nx] !== disc) {
            newBoard[ny][nx] = disc;
            nx += dx;
            ny += dy;
        }
    }

    return newBoard;
}

// 手番が合法手を持つかどうか
export function hasAnyValidMove(board: Board, disc: Disc): boolean {
    return getValidMoves(board, disc).length > 0;
}
