// src/App.jsx
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ToastProvider } from './hooks/useToast.jsx';
import { router } from './routes/index.jsx';

function ErrorBoundary({ children }) {
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>
          {' '}
          <ErrorBoundary>
            <RouterProvider router={router} />
          </ErrorBoundary>
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
