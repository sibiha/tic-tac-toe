import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';

function App() {
  const [numberOfRows, setNumberOfRows] = useState(3);
  const [cellArray, setCellArray] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isGameStarted, setIsGameStarted] = useState(false);

  const checkWinner = () => {
    let isWin = false;
    let n = cellArray.length;

    // Check rows & columns
    for (let i = 0; i < n; i++) {
      if (cellArray[i][0] !== "" && cellArray[i].every(c => c === cellArray[i][0])) {
        isWin = true;
      }
      if (cellArray[0][i] !== "" && cellArray.every(c => c[i] === cellArray[0][i])) {
        isWin = true;
      }
    }

    // Check main diagonal
    let mainDiagVal = cellArray[0][0];
    if (mainDiagVal !== "" && cellArray.every((row, i) => row[i] === mainDiagVal)) {
      isWin = true;
    }

    // Check anti-diagonal
    let antiDiagVal = cellArray[0][n - 1];
    if (antiDiagVal !== "" && cellArray.every((row, i) => row[n - 1 - i] === antiDiagVal)) {
      isWin = true;
    }

    // Check if board is full
    let isEmptyCell = false;
    for (let row of cellArray) {
      if (row.includes("")) {
        isEmptyCell = true;
        break;
      }
    }

    if (isWin) {
      alert(`PLAYER ${currentPlayer} WON :)`);
      restartGame();
    }
    else if (!isEmptyCell) {
      alert(`IT'S A DRAW :(`);
      restartGame();
    }
    else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  }

  const play = (rowIndex, colIndex) => {
    if (cellArray[rowIndex][colIndex] !== "")
      return;

    setIsGameStarted(true);

    setCellArray((prevArray) => {
      return prevArray.map((row, rIdx) =>
        row.map((col, cIdx) => (rIdx === rowIndex && cIdx === colIndex ? currentPlayer : col))
      );
    });
  }

  const handleNumberOfRowsChange = (plusOrMinus) => {
    setNumberOfRows(prev => plusOrMinus === "plus" ? (prev + 1) : (prev - 1));
  }

  const restartGame = () => {
    setCellArray(Array(numberOfRows).fill(null).map(() => Array(numberOfRows).fill("")));
    setCurrentPlayer("X");
    setIsGameStarted(false);
  }

  useEffect(() => {
    restartGame();
  }, [numberOfRows])

  useEffect(() => {
    if (isGameStarted)
      checkWinner();
  }, [cellArray])

  return (
    <>
      <div class="d-flex justify-content-center align-items-center full-height">
        <div class="text-center p-5 border rounded shadow">
          <h2>TIC TAC TOE</h2>
          <button onClick={() => handleNumberOfRowsChange("minus")} disabled={numberOfRows <= 3}>-</button>
          <input type='number' value={numberOfRows} style={{ width: '40px', marginLeft: '20px', marginRight: '20px' }}></input>
          <button onClick={() => handleNumberOfRowsChange("plus")}>+</button>
          <p>---------------------------------------------------------</p>
          <p>Current Player : {currentPlayer}</p>
          <Container className='tic-tac-toe'>
            {cellArray.map((row, rowIndex) => {
              return (
                <Row>
                  {row.map((col, colIndex) => {
                    return (
                      <Col onClick={() => play(rowIndex, colIndex)}>{col}</Col>
                    );
                  })}
                </Row>
              );
            })}
          </Container>
          <button className="btn btn-secondary mt-3" onClick={() => restartGame()}>Restart Game</button>
        </div>
      </div>
    </>
  );
}

export default App;
