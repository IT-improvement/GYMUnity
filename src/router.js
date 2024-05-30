import {createBrowserRouter,} from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import Body from "./components/module/Body";
import Calender from "./components/calender/Calender";
import Diary from "./components/diary/diary";

import FriendSection from "./components/friend/FriendSection";

import SearchSection from "./components/search/SearchSection";

import ExerciseList from "./components/search/ExerciseList";
import ExerciseDetail from "./components/exercise/ExerciseDetail";
import ExerciseEdit from "./components/exercise/ExerciseEdit";

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
                element: <Body children={<SearchSection />} />
            },
        ]
    },
    {
        path: "/friends",
        element : <Root/>,
        children: [
            {
                path:"/friends",
                element: <Body children={<FriendSection />} />
            },
        ]
    },
    {
        path: "/exercises",
        element : <Root/>,
        children: [
            {
                path:"/exercises",
                element: <Body children={<ExerciseList />} />
            },
            {
                path:"/exercises/:index",
                element: <Body children={<ExerciseDetail />} />
            },
            {
                path:"/exercises/edit/:index",
                element: <Body children={<ExerciseEdit />} />
            },
        ]
    }
],{
    basename: "/gymunity/v1"
});

export default router;
