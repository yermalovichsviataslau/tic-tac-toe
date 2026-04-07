import { useState } from "react";
import Board from "./Board";

function Game() {
 const [history, setHistory] = useState([{
    squares: Array(9).fill(null),
    location: null
  }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function handlePlay(nextSquares, clickedIndex) {
    const row = Math.floor(clickedIndex / 3) + 1;
    const col = (clickedIndex % 3) + 1;
    const location = `(${row}, ${col})`;
    
    const nextHistory = [
      ...history.slice(0, currentMove + 1),
      { squares: nextSquares, location }
    ];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  let moves = history.map((step, move) => {
    let description;
    const location = step.location;
    
    if (move === currentMove) {
      description = `You are at move #${move} ${location ? `(${location})` : ''}`;
      return (
        <li key={move}>
          <span>{description}</span>
        </li>
      );
    }
    
    if (move > 0) {
      description = `Go to move №${move} ${location ? `(${location})` : ''}`;
    } else {
      description = 'Go to game start';
    }
    
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  if (!isAscending) {
    moves = moves.reverse();
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board 
          xIsNext={xIsNext} 
          squares={currentSquares} 
          onPlay={handlePlay} 
        />
      </div>
      <div className="game-info">
        <div className="sort-button">
          <button onClick={toggleSortOrder}>
            Sort {isAscending ? '↓' : '↑'}
          </button>
        </div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game