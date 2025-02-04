import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { BrowserRouter } from 'react-router-dom';
import { CircularProgress, CssBaseline } from '@mui/material';
import { ctx } from '.';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { ThemeProvider } from './styles/theme-context'; // Імпортуємо ThemeProvider
import { useTheme } from './styles/theme-context'; // Імпортуємо useTheme

const App = observer(() => {
  const { user } = useContext(ctx);
  const { theme, toggleTheme } = useTheme(); // Використовуємо контекст теми для доступу до поточної теми та функції переключення

  useEffect(() => {
    if (localStorage.getItem('token')) {
      user.checkAuth();
    }
  }, [user]);

  if (user._isLoading) {
    return <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%' }} />;
  }

  return (
    <ThemeProvider value={{ theme, toggleTheme }}> {/* Передаємо theme та toggleTheme в ThemeProvider */}
      <BrowserRouter>
        <CssBaseline /> {/* Додаємо базові стилі для коректного відображення тем */}
        <NavBar toggleTheme={toggleTheme} /> {/* Передаємо функцію для зміни теми в NavBar */}
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
});

export default App;
