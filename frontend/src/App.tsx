import { BrowserRouter } from 'react-router-dom';
import AppRoutes from '@/routes';
import { ToastProvider } from './context/ToastContext';
import { CookiesProvider } from 'react-cookie';

const App = () => {
  return (
    <CookiesProvider>
    <ToastProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ToastProvider>
    </CookiesProvider>
  );
};

export default App;