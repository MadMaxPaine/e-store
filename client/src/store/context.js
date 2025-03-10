import React from "react";
import DeviceStore from "./DeviceStore";
import UserStore from "./UserStore";
import BasketStore from "./BasketStore";

export const ctx = React.createContext(null);

export const StoreProvider = ({ children }) => {
  return (
    <ctx.Provider value={{
      user: new UserStore(),
      device: new DeviceStore(),
      basket: new BasketStore()
    }}>
      {children}
    </ctx.Provider>
  );
};
