import Header from "./Components/Header";
import Dashboard from "./pages/Dashboard";
import Signup from "./pages/Signup";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';


import 'react-toastify/dist/ReactToastify.css';
const App=()=>
{
  return(
    <>
  
    <ToastContainer></ToastContainer>
    <Router>
      <Routes>
        <Route path="/" element={<Signup></Signup>}></Route>
        <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </Router>
   
    </>
  )

}
export default App;
