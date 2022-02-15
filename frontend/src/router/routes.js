import Tasks from '../pages/Tasks';
import TaskPage from '../pages/TaskPage';
export const privateRoutes = [
    {path: '/', element: <Tasks/>, exact: true},
    {path: '/tasks/:id', element: <TaskPage/>, exact: true},
]