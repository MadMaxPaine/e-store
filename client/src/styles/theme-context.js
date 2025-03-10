import React, { createContext, useContext, useState } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

// Створюємо контекст для теми
const ThemeContext = createContext();

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

// Оновлюємо ThemeProvider для коректного використання forwardRef
export const ThemeProvider = React.forwardRef(({ children }, ref) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Передаємо ref до MuiThemeProvider, щоб він підтримував реф */}
      <MuiThemeProvider theme={theme === 'dark' ? darkTheme : lightTheme} ref={ref}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
});

// Хук для доступу до контексту теми
export const useTheme = () => useContext(ThemeContext);
