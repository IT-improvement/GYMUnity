import { RouterProvider } from "react-router-dom";
import router from './router'
import { useState, createContext, useEffect } from "react";
import { createContext } from 'react';
import { useToast } from '@chakra-ui/react'
import Context from "./Context";
export const Context = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(window.sessionStorage.getItem("userCode") ? true : false);
  const [userCode, setUserCode] = useState();
  const toast = useToast();

  const showToast = () => {
    toast({
      title: `${isLoggedIn ? "로그인" : "로그아웃"} 성공`,
      status: `${isLoggedIn ? "success" : "info"}`,
      duration: 1500,
      isClosable: true,
      position: "top",
    });
  };

  useEffect(() => {
    showToast();

    if (isLoggedIn) {
      window.sessionStorage.setItem("userCode", "1003");
      setUserCode(1003);
    }
    else {
      window.sessionStorage.removeItem("userCode");
      setUserCode();
    }
  }, [isLoggedIn]);

  return (
    <Context.Provider value={{isLoggedIn, setIsLoggedIn, userCode}}>
      <RouterProvider router={router}/>
    </Context.Provider>
  );
}

export default App;
