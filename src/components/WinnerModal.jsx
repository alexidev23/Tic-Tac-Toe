import { Square } from './Square'

// eslint-disable-next-line react/prop-types
export function WinnerModal ({ winner, resetGame }) {
  if (winner === null) return null
  const winnerText = winner === false ? 'EMPATE' : 'GANO:'
  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winnerText}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>

        <footer>
          <button className='restart' onClick={resetGame}>
            Reiniciar
          </button>
        </footer>
      </div>
    </section>
  )
}
