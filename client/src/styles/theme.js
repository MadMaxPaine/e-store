import { createTheme } from "@mui/material/styles";

// Світла тема
export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2", // Синій
    },
    secondary: {
      main: "#9c27b0", // Фіолетовий
    },
    background: {
      default: "#fafafa", // Світлий фон
      paper: "#ffffff",   // Фон паперу
    },
    text: {
      primary: "#000000", // Темний текст
      secondary: "#757575", // Легкий текст
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Округлені кнопки
          padding: "10px 20px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1976d2", // Колір AppBar
        },
      },
    },
  },
});

// Темна тема
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9", // Світлий синій для темної теми
    },
    secondary: {
      main: "#ff4081", // Рожевий
    },
    background: {
      default: "#121212", // Темний фон
      paper: "#1e1e1e",   // Темний фон паперу
    },
    text: {
      primary: "#ffffff", // Білий текст
      secondary: "#bdbdbd", // Світло-сірий текст
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Округлені кнопки
          padding: "10px 20px",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1e1e1e", // Темний колір AppBar
        },
      },
    },
  },
});
