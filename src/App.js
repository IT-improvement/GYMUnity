import { RouterProvider } from 'react-router-dom';
import router from './router';
import { createContext } from 'react';

export const Context = createContext();

function App() {
    return <RouterProvider router={router} />;
}

export default App;
