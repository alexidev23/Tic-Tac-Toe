import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import GameBoard from './Game'

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/game',
    element: <GameBoard />
  }
])

export default Router
