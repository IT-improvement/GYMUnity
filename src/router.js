import {createBrowserRouter,} from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import Calender from "./components/module/Calender";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        children: [
            {
                path:"",
                element:<Main/>
            }
        ],
        errorElement:
            <>
                <h4>오류입니다~</h4>
            </>
    },{
        paht: "/user",
        element : <Root/>,
        children: [
            {
                path:"/calender",
                element:<Calender/>
            }
        ]
    }
],{
    basename: "/gymunity"
});

export default router;
