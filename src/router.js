import {createBrowserRouter,} from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import Calender from "./components/calender/Calender";
import Diary from "./components/diary/diary";
import FeedList from "./components/feed/feedList";
import FeedDetail from "./components/feed/feedDetail";

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
            },{
                path:"/diary",
                element:<Diary/>
            }
        ]
    }
    ,{
        paht: "/feed",
        element : <Root/>,
        children: [
            {
                path:"/feed",
                element:<FeedList/>
            },
            {
                path:"/feed/:feedIndex",
                element:<FeedDetail/>
            }
        ]
    }
],{
    basename: "/gymunity/v1"
});

export default router;
