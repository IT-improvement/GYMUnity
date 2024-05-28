import { RouterProvider } from 'react-router-dom';
import router from './router';
import { createContext, useState } from 'react';

export const Context = createContext();

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <Context.Provider value={[isLoggedIn, setIsLoggedIn]}>
            .
            <RouterProvider router={router} />
        </Context.Provider>
    );
}

export default App;
