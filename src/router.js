import { createBrowserRouter, } from "react-router-dom";
import DiaryMain from "./components/diary/diaryMain";
import CalenderMain from "./components/calender/CalenderMain";
import Root from './components/Root';
import Main from './components/module/Main';
import Calender from './components/calender/Calender';
import Diet from './components/diet/diet';
import Body from './components/module/Body';
import CreateFoodForm from './components/diet/createFoodForm';
import CreateFoodCategoryForm from './components/diet/createFoodCategoryForm';
import Diary from "./components/diary/diary";
import FriendSection from "./components/friend/FriendSection";
import SearchSection from "./components/search/SearchSection";
import ExerciseList from "./components/search/ExerciseList";
import ExerciseDetail from "./components/exercise/ExerciseDetail";
import ExerciseEdit from "./components/exercise/ExerciseEdit";
import FeedDetail from "./components/feed/feedDetail";
import JoinForm from "./components/user/JoinForm";
import LoginForm from "./components/user/LoginForm";
import MyPage from "./components/user/MyPage";
import UpdateUserForm from "./components/user/UpdateUserForm";
import LeaveForm from "./components/user/LeaveForm";
import FeedList from "./components/feed/feedList";
import LogoutForm from "./components/user/LogoutForm";
import UserProfile from "./components/user/UserProfile";
import FeedCreate from "./components/feed/feedCreate";
import FeedDelete from "./components/feed/feedDelete";
import FeedUpdate from "./components/feed/feedupdate";

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: <Root />,
			children: [
				{
					path: '',
					element: <Main />,
				},
			],
			errorElement: (
				<>
					<h4>오류입니다~</h4>
				</>
			),
		},
		{
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
                element: <Body children={<JoinForm />} />
            },
            {
                path: "/user/login",
				element: <Body children={<LoginForm />} />
            },
            {
                path: "/user/mypage",
				element: <Body children={<MyPage />} />
            },
            {
                path: "/user/update",
				element: <Body children={<UpdateUserForm />} />
            },
			{
                path: "/user/logout",
				element: <Body children={<LogoutForm />} />
            },
            {
                path: "/user/leave",
				element: <Body children={<LeaveForm />} />
            },
			{
                path: "/user/:code",
				element: <Body children={<UserProfile />} />
            }
        ]
		},
		{
			path: "/search",
			element: <Root />,
			children: [
				{
					path: "/search",
					element: <Body children={<SearchSection />} />
				},
			]
		},
		{
			path: "/friends",
			element: <Root />,
			children: [
				{
					path: "/friends",
					element: <Body children={<FriendSection />} />
				},
			]
		},
		{
			path: "/exercises",
			element: <Root />,
			children: [
				{
					path: "/exercises",
					element: <Body children={<ExerciseList />} />
				},
				{
					path: "/exercises/:index",
					element: <Body children={<ExerciseDetail />} />
				},
				{
					path: "/exercises/edit/:index",
					element: <Body children={<ExerciseEdit />} />
				},
			]
		},
		{
			path: '/diet',
			element: <Root />,
			children: [
				{
					path: '/diet',
					element: <Body children={<Diet />} />,
				},
				{
					path: '/diet/createFood',
					element: <Body children={<CreateFoodForm />} />,
				},
				{
					path: '/diet/createFoodCategory',
					element: <Body children={<CreateFoodCategoryForm />} />,
				},
			],
		},
		{
        path: "/feed",
        element : <Root/>,
        children: [
            {
                path:"/feed",
                element:<FeedList/>
            },
            {
                path:"/feed/:feedIndex",
                element:<FeedDetail/>
            },{
                path:"diary",
                element:<DiaryMain/>
            },{
                path:"/feed/feedCreate",
                element:<FeedCreate/>
            },{
                path:"/feed/:feedIndex/feedUpdate",
                element:<FeedUpdate/>
            },{
                path:"/feed/:feedIndex/feedDelete",
                element:<FeedDelete/>
            }
        ]
    }
],
	{
		basename: "/gymunity/v1"
	}
);
export default router;
