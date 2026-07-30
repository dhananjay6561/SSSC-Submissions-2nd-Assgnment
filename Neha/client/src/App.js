
import "./style/App.css";

import { createBrowserRouter, RouterProvider} from 'react-router-dom';


// import main components
import Main from'./components/Main';
import Quiz from'./components/Quiz';
import Result from'./components/Result';

// react routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>
  },
  {
    path: '/Quiz',
    element: <Quiz></Quiz>
  },
  {
    path: '/result',
    element: <Result></Result>
  },
])
function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
