import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;