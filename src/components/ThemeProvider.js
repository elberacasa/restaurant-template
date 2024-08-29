import React from 'react';
import { restaurantConfig } from '../config';

export const ThemeContext = React.createContext();

export function ThemeProvider({ children }) {
  return (
    <ThemeContext.Provider value={restaurantConfig}>
      {children}
    </ThemeContext.Provider>
  );
}