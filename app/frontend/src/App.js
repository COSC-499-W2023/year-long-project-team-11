import './App.css';
import Logout from './Logout';
import Login from './Login'
import Landing from './Landing';
import { Routes, Route } from "react-router-dom";
import CreateAccount from './CreateAccount';
import UserProfile from './UserProfile';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/SignUp' element={<CreateAccount />} />
        <Route path='/UserProfile' element={<UserProfile />} />
      </Routes>
      {/* <Login></Login> */}
      {/* <Logout/> */}
    </div>
  );
}

export default App;