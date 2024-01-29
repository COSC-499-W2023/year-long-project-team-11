import './App.css';
import Logout from './Logout';
import Login from './Login'
import Landing from './Landing';
import { Routes, Route } from "react-router-dom";
import CreateAccount from './CreateAccount';
import Prompt from './Prompt';
import Tutorial from './Tutorial';
import UserProfile from './UserProfile';
import SavedContent from "./SavedContent"; 

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/SignUp' element={<CreateAccount />} />
        <Route path='/Prompt' element={<Prompt />} />
        <Route path='/Tutorial' element={<Tutorial />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/SavedContent' element={<SavedContent/>} />
      </Routes>
    </div>
  );
}

export default App;