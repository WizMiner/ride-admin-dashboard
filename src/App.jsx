// src/App.jsx
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./hooks/useTheme.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { router } from "./routes/index.jsx";

function ErrorBoundary({ children }) {
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ErrorBoundary>
          <RouterProvider router={router} />
        </ErrorBoundary>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
