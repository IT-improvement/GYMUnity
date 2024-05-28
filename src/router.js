import {createBrowserRouter,} from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import Calender from "./components/calender/Calender";
import Diary from "./components/diary/diary";
import FriendListContainer from "./components/friend/FriendListContainer";
import Body from "./components/module/Body";
import FriendRequestListContainer from "./components/friend/FriendRequestList";
import SearchContainer from "./components/search/SearchContainer";
import ExerciseListContainer from "./components/search/ExerciseList";
import ExerciseDetail from "./components/exercise/ExerciseDetail";

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
                path:"user/calender",
                element:<Calender/>
            },{
                path:"user/diary",
                element:<Diary/>
            }
        ]
    },
    {
        path: "/search",
        element : <Root/>,
        children: [
            {
                path:"/search",
                element: <Body children={<SearchContainer/>} />
            },
        ]
    },
    {
        path: "/friends",
        element : <Root/>,
        children: [
            {
                path:"/friends",
                element: <Body children={<FriendListContainer/>} />
            },
            {
                path:"/friends/requests",
                element: <Body children={<FriendRequestListContainer/>} />
            },
        ]
    },
    {
        path: "/exercises",
        element : <Root/>,
        children: [
            {
                path:"/exercises",
                element: <Body children={<ExerciseListContainer/>} />
            },
            {
                path:"/exercises/:index",
                element: <Body children={<ExerciseDetail/>} />
            },
        ]
    }
],{
    basename: "/gymunity/v1"
});

export default router;
