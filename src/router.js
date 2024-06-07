import { createBrowserRouter } from "react-router-dom";
import DiaryMain from "./components/diary/diaryMain";
import Root from "./components/Root";
import Main from "./components/module/Main";
import Body from "./components/module/Body";
import CreateFoodCategoryForm from "./components/diet/createFoodCategoryForm";
import FriendSection from "./components/friend/FriendSection";
import SearchSection from "./components/search/SearchSection";
import ExerciseList from "./components/exercise/ExerciseList";
import ExerciseCreate from "./components/exercise/ExerciseCreate";
import ExerciseDetail from "./components/exercise/ExerciseDetail";
import ExerciseUpdate from "./components/exercise/ExerciseUpdate";
import FeedDetail from "./components/feed/feedDetail";
import JoinForm from "./components/user/JoinForm";
import LoginForm from "./components/user/LoginForm";
import MyPage from "./components/user/MyPage";
import UpdateUserForm from "./components/user/UpdateUserForm";
import LeaveForm from "./components/user/LeaveForm";
import UserProfile from "./components/user/UserProfile";
import FeedCreate from "./components/feed/feedCreate";
import FeedUpdate from "./components/feed/feedUpdate";
import ViewFoodListForm from "./components/diet/viewFoodListForm";
import UpdateFoodCategoryForm from "./components/diet/UpdateFoodCategoryForm";
import DiaryDetail from "./components/diary/diaryDetail";
import Diary from "./components/diary/diary";
import Routine from "./components/routine/Routine";
import FeedList from "./components/feed/feedList";
import DiaryWrite from "./components/diary/diaryWrite";
import CreateFood from './components/diet/CreateFood';
import EditFood from './components/diet/EditFood';
import RoutineDiet from "./components/diet/RoutineDiet";
import ViewFoodDetailForm from "./components/diet/ViewFoodDetailForm";
import EditFoodCategory from "./components/diet/EditFoodCategory";
import DiaryDelete from "./components/diary/diaryDelete";
import NotFound from "./components/NotFound";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Root />,
            children: [
                {
                    path: '',
                    element: <Body children={<Main />}/>,
                },
                // Add other nested routes here as needed
            ],
            errorElement: (
                <>
                    <h4>오류입니다~</h4>
                </>
            ),
        },
        {
            path: '/diary',
            element: <Root />,
            children: [
                {
                    path: 'detail/:date',
                    element: <Body children={<DiaryDetail />} />,
                },
                {
                    path: '',
                    element: <Body children={<Diary />} />,
                },
                {
                    path: 'write',
                    element: <Body children={<DiaryWrite />} />,
                },
                {
                    path: '/delete',
                    element: <Body children={<DiaryDelete />} />,
                },
            ],
        },
        {
            path: '/routine',
            element: <Root />,
            children: [
                {
                    path: '',
                    element: <Body children={<Routine />} />,
                },
            ],
        },
        {
            path: '/user',
            element: <Root />,
            children: [
                {
                    path: 'join',
                    element: <Body children={<JoinForm />} />,
                },
                {
                    path: 'login',
                    element: <Body children={<LoginForm />} />,
                },
                {
                    path: 'mypage',
                    element: <Body children={<MyPage />} />,
                },
                {
                    path: 'update',
                    element: <Body children={<UpdateUserForm />} />,
                },
                {
                    path: 'leave',
                    element: <Body children={<LeaveForm />} />,
                },
                {
                    path: ':code',
                    element: <Body children={<UserProfile />} />,
                },
            ],
        },
        {
            path: '/search',
            element: <Root />,
            children: [
                {
                    path: '',
                    element: <Body children={<SearchSection />} />,
                },
            ],
        },
        {
            path: '/friends',
            element: <Root />,
            children: [
                {
                    path: '',
                    element: <Body children={<FriendSection />} />,
                },
            ],
        },
        {
            path: '/exercises',
            element: <Root />,
            children: [
                {
                    path: '',
                    element: <Body children={<ExerciseList />} />,
                },
                {
                    path: 'create',
                    element: <Body children={<ExerciseCreate />} />,
                },
                {
                    path: ':index',
                    element: <Body children={<ExerciseDetail />} />,
                },
                {
                    path: 'update/:index',
                    element: <Body children={<ExerciseUpdate />} />,
                },
            ],
        },
        {
            path: "/diet",
            element: <Root />,
            children: [
                {
                    path: "createFood",
                    element: <Body children={<CreateFood />} />,
                },
                {
                    path: "createFoodCategory",
                    element: <Body children={<CreateFoodCategoryForm />} />,
                },
                {
                    path: "foodList",
                    element: <Body children={<ViewFoodListForm />} />,
                },
                {
                    path: "updateFoodCategory",
                    element: <Body children={<UpdateFoodCategoryForm />} />,
                },
                {
                    path: "editFood/:foodIndex",
                    element: <Body children={<EditFood />} />,
                },
                {
                    path: "viewFoodDetail/:foodIndex",
                    element: <Body children={<ViewFoodDetailForm />} />,
                },
                {
                    path: "editFoodCategory/:foodCategoryIndex",
                    element: <Body children={<EditFoodCategory />} />,
                },
            ],
        },
        {
            path: "/routineDiet",
            element: <Root />,
            children: [
                {
                    path: "",
                    element: <Body children={<RoutineDiet />} />,
                },
            ],
        },
        {
            path: '/feed',
            element: <Root />,
            children: [
                {
                    path: '',
                    element: <Body children={<FeedList />} />,
                },
                {
                    path: ':feedIndex',
                    element: <FeedDetail />,
                },
                {
                    path: 'diary',
                    element: <DiaryMain />,
                },
                {
                    path: 'feedCreate',
                    element: <FeedCreate />,
                },
                {
                    path: ':feedIndex/feedUpdate',
                    element: <FeedUpdate />,
                },
            ],
        },
        {
            path: '*', // This will catch all undefined routes
            element: <Body children={<NotFound />}/>, // Show the NotFound component
        }
    ],
    {
        basename: "/gymunity",
    }
);

export default router;
