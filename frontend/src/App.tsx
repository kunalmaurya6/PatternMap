import { BrowserRouter } from 'react-router-dom'
import Routes from '../routes'
import { ToastProvider } from './context/ToastContext'

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </ToastProvider>
  )
}

export default App