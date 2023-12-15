import { WINNER_COMBOS } from '../constants'

// Creamos un metodo para saber quien es el ganador
export const checkWinner = (boardToCheck) => {
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

export const checkEndGame = (newBoard) => {
  // Revisamos si hay un empate
  // si no hay espacios vacios
  // en el tablero
  return newBoard.every((square) => square !== null)
}
