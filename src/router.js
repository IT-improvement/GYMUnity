import { createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import Main from './components/module/Main';
import Calender from './components/calender/Calender';
import Diary from './components/diary/diary';
import Diet from './components/diet/diet';
import Body from './components/module/Body';
import CreateFoodForm from './components/diet/createFoodForm';
import CreateFoodCategoryForm from './components/diet/createFoodCategoryForm';

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
            paht: '/user',
            element: <Root />,
            children: [
                {
                    path: '/calender',
                    element: <Calender />,
                },
                {
                    path: '/diary',
                    element: <Diary />,
                },
            ],
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
    ],
    {
        basename: '/gymunity/v1',
    }
);

export default router;
