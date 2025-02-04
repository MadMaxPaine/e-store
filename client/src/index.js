import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';
import { ThemeProvider } from './styles/theme-context';
export const ctx = React.createContext(null); 
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider> 
      <ctx.Provider value={{
        user: new UserStore(),
        device: new DeviceStore()
      }}>
        <App />
      </ctx.Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);