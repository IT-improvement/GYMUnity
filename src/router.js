import { createBrowserRouter, } from "react-router-dom";
import DiaryMain from "./components/diary/diaryMain";
import Root from './components/Root';
import Main from './components/module/Main';
import Diet from './components/diet/diet';
import Body from './components/module/Body';
import CreateFoodForm from './components/diet/createFoodForm';
import CreateFoodCategoryForm from './components/diet/createFoodCategoryForm';
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
import DiaryDetail from "./components/diary/diaryDetail";
import Diary from "./components/diary/diary";
import Routine from "./components/routine/Routine";

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
			path:"/diary",
			element: <Root/>,
			children:[
				{
					path:"detail/:date",
					element: <Body children ={<DiaryDetail/>}/>
				},{
					path:"",
					element: <Body children ={<Diary/>}/>
				},{
				},
			]
		},
		{
			path:"/routine",
			element:<Root/>,
			children:[
				{
					path:"",
					element: <Body children ={<Routine/>}/>,
				}
			]
		},
		{
			path: "/user",
			element : <Root/>,
			children: [
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
            }
        ]
    }
],
	{
		basename: "/gymunity/v1"
	}
);
export default router;
