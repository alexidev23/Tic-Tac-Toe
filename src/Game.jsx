import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { TURNS } from './constants.js'
import { checkWinner, checkEndGame } from './logic/board.js'
import { WinnerModal } from './components/WinnerModal.jsx'
import { resetGameStorage, saveGameToStorage } from './logic/storage/index.js'

export default function GameBoard () {
  // Construccion de nuestro tablero
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turno')
    return turnFromStorage ?? TURNS.X
  })
  // null no hay ganador, false hay empate
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    resetGameStorage()
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

    // Guardamos la partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // Revisamos si hay ganador
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // Verificamos si hubo un empate
    }
  }

  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Empezar de nuevo</button>
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

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}
