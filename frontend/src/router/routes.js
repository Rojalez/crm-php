import Tasks from '../pages/Tasks';
import TaskPage from '../pages/TaskPage';
import Profile from '../pages/Profile';
export const privateRoutes = [
    {path: '/', element: <Tasks />, exact: true},
    {path: '/tasks/:id', element: <TaskPage/>, exact: true},
    {path: '/profile', element: <Profile/>, exact: true},

]