"use client";
import React, { createContext, useContext } from "react";

// Context untuk user
const UserContext = createContext(null);

export const UserProvider = ({ value, children }) => (
  <UserContext.Provider value={value}>{children}</UserContext.Provider>
);

// Hook untuk mendapatkan data user
export const useUser = () => useContext(UserContext);
