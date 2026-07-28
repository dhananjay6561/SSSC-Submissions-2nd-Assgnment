import '../styles/App.css';
import {createBrowserRouter,RouterProvider, Route,Router } from 'react-router-dom'


/**Import components */
import Main from './main';
import Quiz from './quiz';
import Result from './result';
import { CheckUserExist } from '../helper/helper';



const router= createBrowserRouter([
  {
    path: '/',
    element: <Main></Main>
  }
  ,{
    path: '/quiz',
    element:<CheckUserExist> <Quiz></Quiz>  </CheckUserExist> 
  }
  ,{
    path: '/result',
    element: <Result></Result>
  }
])


function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
