import Square from "./Square";
import calculateWinner from '../untils/calculateWinner'

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const result = calculateWinner(squares);
    if (result.winner || result.isDraw || squares[i]) {
      return;
    }
    
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares, i);
  }

  const result = calculateWinner(squares);
  const winner = result.winner;
  const winningLine = result.winningLine;
  const isDraw = result.isDraw;
  
  let status;
  let statusClassName = "status";
  
  if (winner) {
    status = 'Winner: ' + winner;
    statusClassName += " winner";
  } else if (isDraw) {
    status = 'Draw! No one wins.';
    statusClassName += " draw";
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const rowSquares = [];
      for (let col = 0; col < 3; col++) {
        const index = row * 3 + col;
        const isWinning = winningLine ? winningLine.includes(index) : false;
        
        rowSquares.push(
          <Square
            key={index}
            value={squares[index]}
            onSquareClick={() => handleClick(index)}
            isWinning={isWinning}
          />
        );
      }
      board.push(
        <div key={row} className="board-row">
          {rowSquares}
        </div>
      );
    }
    return board;
  };

  return (
    <>
      <div className={statusClassName}>{status}</div>
      {renderBoard()}
    </>
  );
}

export default Board