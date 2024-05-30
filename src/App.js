import { RouterProvider } from "react-router-dom";
import router from './router'
import { useState, createContext } from "react";
import { createContext } from 'react';

export const Context = createContext();

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <Context.Provider value={[isLoggedIn, setLoggedIn]}>
      <RouterProvider router={router}/>
    </Context.Provider>
  );
}

export default App;
