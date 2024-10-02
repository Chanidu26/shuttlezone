//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
//import Passwordresetc from './Pages/Passwordresetc';
//import Passwordreset from './Pages/Passwordreset';
import Signup from './Pages/Signup';
//import Login from './Pages/Login';
import Login from './Pages/Log';
import Home from './Pages/Home';
import Landing from './Pages/Landing';

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
    

    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Home" element={<Home />} />
    </Routes>
  
  );
}

export default App;
