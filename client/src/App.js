import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import { CircularProgress, CssBaseline } from '@mui/material';
import { ctx } from './store/context';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { ThemeProvider } from './styles/theme-context';
import { useTheme } from './styles/theme-context';

const App = observer(() => {
  const { user } = useContext(ctx);
  const { theme, toggleTheme } = useTheme(); // Використовуємо контекст теми для доступу до поточної теми та функції переключення

  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await user.checkAuth();
        } catch (error) {
          console.error('Authentication error:', error);
          localStorage.removeItem('token');
          user.setIsAuth(false);
        }
      }
    };

    authenticateUser();
  }, [user]);

  if (user._isLoading) {
    return (
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider value={{ theme, toggleTheme }}>
      <BrowserRouter>
        <CssBaseline />
        <NavBar toggleTheme={toggleTheme} />
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
});

export default App;
