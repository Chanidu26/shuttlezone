//import logo from './logo.svg';
import './App.css';

//import Passwordresetc from './Pages/Passwordresetc';
//import Passwordreset from './Pages/Passwordreset';
//import Signup from './Pages/Signup';
//import Login from './Pages/Login';
import Login from './Pages/Log';

/*import {
  createBrowserRouter,
  
  
} from "react-router-dom";
/*
const Layout = ()=>{
  return(
    <>
      <Nav/>
      
    </>
  );
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      
      {
        path: "/passowrdreset",
        element: <Passwordreset/>
      },
    ]
  },

  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/login",
    element: <Login/>
  },
]);*/
const App=() =>{
  return (
    <div >
      <Login/>
    </div>
  );
}

export default App;
