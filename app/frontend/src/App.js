import './App.css';
import Logout from './Logout';
import Login from './Login'
import Landing from './Landing';
import {Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/Landing" element={<Landing/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path='/Logout' element={<Logout/>}/>
      </Routes>
      {/* <Login></Login> */}
       {/* <Logout/> */}
    </div>
  );
}

export default App;