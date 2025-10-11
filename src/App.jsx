// src/App.jsx
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { SocketProvider } from './contexts/SocketContext.jsx';
import { ToastProvider } from './hooks/useToast.jsx';
import { router } from './routes/index.jsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SocketProvider>
          {' '}
          <ToastProvider>
            <RouterProvider router={router} />
          </ToastProvider>
        </SocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
