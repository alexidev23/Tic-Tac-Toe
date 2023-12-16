import { Link } from 'react-router-dom'
import TicTacToe from '../public/ticTacToe.svg'

function App () {
  return (
    <main className='home'>
      <h1>TIC TAC TOE</h1>
      <div className='imagen'>
        <img src={TicTacToe} alt='TicTacToe' height='100%' width='100%' />
      </div>
      <div className='boton'>
        <Link to='/game' className='boton_jugar'>1 VS 1</Link>
      </div>
    </main>
  )
}

export default App
