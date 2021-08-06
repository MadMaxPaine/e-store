import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DeviceStore from './store/DeviceStore';
import UserStore from './store/UserStore';

export const ctx = createContext(null);
ReactDOM.render(
  <React.StrictMode>
    <ctx.Provider value={{
      user: new UserStore(),
      device: new DeviceStore()
    }}>
      <App />
    </ctx.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

