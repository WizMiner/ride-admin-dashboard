import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme.jsx';
import { router } from './routes/index.jsx';

function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default App
