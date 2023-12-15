import { useState } from 'react'
import './App.css'

// Turnos para cada jugador
const TURNS = {
  X: 'X',
  O: 'O'
}

const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App () {
  // Construccion de nuestro tablero
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  // null no hay ganador, false hay empate
  const [winner, setWinner] = useState(null)

  // Creamos un metodo para saber quien es el ganador
  const checkWinner = (boardToCheck) => {
    // Comprobamos lascombinaciones ganadores para saber
    // si X u O gano
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo // Recuperamos las posiciones
      if (
        boardToCheck[a] && // Vreificamos si hay algo en la posicion
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
    }
    // Si no hay ganador
    return null
  }

  const updateBoard = (index) => {
    // Esta funcion hace que no se sobraescriba el turno
    if (board[index] || winner) return

    // Actualizacion del tabkero
    const newBoard = [...board] // Creamos una copia del array original
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    }
  }

  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <section className='game'>
        {board.map((_, index) => {
          return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )
        })}
      </section>
    </main>
  )
}

export default App
