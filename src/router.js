import {createBrowserRouter,} from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import DiaryMain from "./components/diary/diaryMain";
import CalenderMain from "./components/calender/CalenderMain";

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
        path: "/user",
        element : <Root/>,
        children: [
            {
                path:"calender",
                element:<CalenderMain/>
            },{
                path:"diary",
                element:<DiaryMain/>
            }
        ]
    }
],{
    basename: "/gymunity"
});

export default router;
