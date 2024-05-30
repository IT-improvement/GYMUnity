import {createBrowserRouter,} from "react-router-dom";
import Root from "./components/Root";
import Main from "./components/module/Main";
import DiaryMain from "./components/diary/diaryMain";
import CalenderMain from "./components/calender/CalenderMain";
import JoinForm from "./components/user/JoinForm";
import LoginForm from "./components/user/LoginForm";
import MyPage from "./components/user/MyPage";
import UpdateUserForm from "./components/user/UpdateUserForm";
import LeaveForm from "./components/user/LeaveForm";

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
            },
            {
                path: "/user/join",
                element: <JoinForm />
            },
            {
                path: "/user/login",
                element: <LoginForm />
            },
            {
                path: "/user/mypage",
                element: <MyPage />
            },
            {
                path: "/user/update",
                element: <UpdateUserForm />
            },
            {
                path: "/user/leave",
                element: <LeaveForm />
            }
        ]
    }
],{
    basename: "/gymunity"
});

export default router;
